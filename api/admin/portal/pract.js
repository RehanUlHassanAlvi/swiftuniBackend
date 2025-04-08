async function createSubdomain(portalName) {
    // Validate inputs
    if (!portalName) {
        throw new Error('Portal name is required');
    }

    if (!config.aws.base_domain) {
        throw new Error('Base domain configuration is missing');
    }

    if (!config.aws.route53_hosted_zone_id) {
        throw new Error('Route53 hosted zone ID is missing');
    }

    const awsConfig = {
        region: 'us-east-1',
        credentials: {
            accessKeyId: config.aws.aws_access_key_id,
            secretAccessKey: config.aws.aws_secret_access_key
        }
    };

    // Add credential validation
    if (!config.aws.aws_access_key_id || !config.aws.aws_secret_access_key) {
        throw new Error('AWS credentials are missing or invalid');
    }

    console.log('AWS Config validation:', {
        hasAccessKey: !!config.aws.aws_access_key_id,
        hasSecretKey: !!config.aws.aws_secret_access_key,
        region: awsConfig.region
    });

    // const route53Client = new Route53Client(awsConfig);
    // const acmClient = new ACMClient(awsConfig);

    // const fullSubdomain = `${portalName}.${config.aws.base_domain}`;
    // const CLOUDFRONT_HOSTED_ZONE_ID = config.aws.cloudfront_hosted_zone_id;
    // const cloudfrontDomain = `${config.aws.cloudfront_distribution_id}.cloudfront.net.`;

    // console.log('Creating subdomain with following parameters:', {
    //   fullSubdomain,
    //   hostedZoneId: config.aws.route53_hosted_zone_id,
    //   cloudfrontDomain
    // });

    try {
        //   // Request ACM Certificate
        //   console.log('Requesting ACM certificate for:', fullSubdomain);
        //   let certResponse;
        //   try {
        //     certResponse = await acmClient.send(new RequestCertificateCommand({
        //       DomainName: fullSubdomain,
        //       ValidationMethod: 'DNS',
        //       SubjectAlternativeNames: [fullSubdomain]
        //     }));
        //     console.log('Certificate response:', certResponse);

        //     // Add this new section to handle DNS validation
        //     console.log('Waiting for certificate validation records...');
        //     const describeCertificateCommand = new DescribeCertificateCommand({
        //       CertificateArn: certResponse.CertificateArn
        //     });

        //     // Wait for validation records to be available
        //     let validationRecords;
        //     for (let i = 0; i < 10; i++) {
        //       const certDetails = await acmClient.send(describeCertificateCommand);
        //       validationRecords = certDetails.Certificate?.DomainValidationOptions?.[0]?.ResourceRecord;
        //       if (validationRecords) break;
        //       await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
        //     }

        //     if (!validationRecords) {
        //       throw new Error('Failed to get certificate validation records');
        //     }

        //     // Add validation records to Route 53
        //     const validationParams = {
        //       HostedZoneId: config.aws.route53_hosted_zone_id,
        //       ChangeBatch: {
        //         Changes: [{
        //           Action: 'UPSERT',
        //           ResourceRecordSet: {
        //             Name: validationRecords.Name,
        //             Type: validationRecords.Type,
        //             TTL: 300,
        //             ResourceRecords: [{
        //               Value: validationRecords.Value
        //             }]
        //           }
        //         }]
        //       }
        //     };

        //     console.log('Adding certificate validation record to Route 53:', JSON.stringify(validationParams, null, 2));
        //     await route53Client.send(new ChangeResourceRecordSetsCommand(validationParams));

        //   } catch (certError) {
        //     console.error('ACM Certificate request failed:', {
        //       message: certError.message,
        //       code: certError.code,
        //       requestId: certError.$metadata?.requestId,
        //       stack: certError.stack
        //     });
        //     throw new Error(`Failed to request ACM certificate: ${certError.message}`);
        //   }

        // Wait for certificate status to be issued
        // console.log('Waiting for certificate to be issued...');
        // let certificateIssued = false;
        // for (let i = 0; i < 60; i++) { // Check every 2 seconds for up to 2 minutes
        //   const certDetails = await acmClient.send(describeCertificateCommand);
        //   if (certDetails.Certificate.Status === 'ISSUED') {
        //     certificateIssued = true;
        //     break;
        //   }
        //   await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
        // }

        // if (!certificateIssued) {
        //   throw new Error('Certificate was not issued within the expected time');
        // }

        // Add an alias in CloudFront distribution

        const fullSubdomain = `${portalName}.${config.aws.base_domain}`;
        const CLOUDFRONT_HOSTED_ZONE_ID = config.aws.cloudfront_hosted_zone_id;
        const cloudfrontDomain = `${config.aws.cloudfront_distribution_id}.cloudfront.net.`;

        const cloudfrontClient = new CloudFrontClient(awsConfig);

        // Fetch the current distribution configuration
        const getDistributionConfigCommand = new GetDistributionConfigCommand({
            Id: config.aws.cloudfront_distribution_id
        });
        const { DistributionConfig, ETag } = await cloudfrontClient.send(getDistributionConfigCommand);

        // Extract the CloudFront domain name
        // const cloudfrontDomain = DistributionConfig.DomainName;

        // Update the distribution configuration with the new alias
        const updateDistributionParams = {
            Id: config.aws.cloudfront_distribution_id,
            IfMatch: ETag,
            DistributionConfig: {
                ...DistributionConfig,
                Aliases: {
                    Quantity: DistributionConfig.Aliases.Quantity + 1,
                    Items: [...DistributionConfig.Aliases.Items, `${portalName}.swiftuni.com`]
                }
            }
        };

        console.log('Updating CloudFront distribution with alias:', `${portalName}.swiftuni.com`);
        await cloudfrontClient.send(new UpdateDistributionCommand(updateDistributionParams));

        // Add CNAME record in Route 53
        const route53Client = new Route53Client(awsConfig);
        const cnameParams = {
            HostedZoneId: config.aws.route53_hosted_zone_id,
            ChangeBatch: {
                Changes: [{
                    Action: 'UPSERT',
                    ResourceRecordSet: {
                        Name: `${portalName}.swiftuni.com`,
                        Type: 'CNAME',
                        TTL: 300,
                        ResourceRecords: [{
                            Value: cloudfrontDomain
                        }]
                    }
                }]
            }
        };

        console.log('Adding CNAME record to Route 53:', JSON.stringify(cnameParams, null, 2));
        await route53Client.send(new ChangeResourceRecordSetsCommand(cnameParams));

        // Prepare Route 53 record change
        const params = {
            HostedZoneId: config.aws.route53_hosted_zone_id,
            ChangeBatch: {
                Comment: `Creating alias record for ${fullSubdomain}`,
                Changes: [
                    {
                        Action: 'CREATE',
                        ResourceRecordSet: {
                            Name: fullSubdomain,
                            Type: 'A',
                            AliasTarget: {
                                HostedZoneId: config.aws.cloudfront_hosted_zone_id,
                                DNSName: cloudfrontDomain,
                                EvaluateTargetHealth: false
                            }
                        }
                    }
                ]
            }
        };

        console.log('Route 53 change parameters:', JSON.stringify(params, null, 2));

        // Create Route 53 Record
        // const route53Response = await route53Client.send(
        //   new ChangeResourceRecordSetsCommand(params)
        // );

        return {
            success: true,
            subdomain: fullSubdomain,
            // certificateArn: certResponse.CertificateArn,
            // route53ChangeInfo: route53Response.ChangeInfo
        };
    }
    catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            code: error.code,
            requestId: error.$metadata?.requestId,
            stack: error.stack
        });

        return {
            success: false,
            error: error.message
        };
    }
}