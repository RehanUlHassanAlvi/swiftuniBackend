const queries = require("./queries");
const { query } = require("../../../utils/db");
const { ACMClient, RequestCertificateCommand, DescribeCertificateCommand } = require('@aws-sdk/client-acm');
const { Route53Client, ChangeResourceRecordSetsCommand } = require('@aws-sdk/client-route-53');
const { CloudFrontClient, UpdateDistributionCommand, GetDistributionConfigCommand, GetDistributionCommand } = require('@aws-sdk/client-cloudfront');

const config = require('../../../conf/config');

async function createSubdomain(portalName) {
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

  if (!config.aws.aws_access_key_id || !config.aws.aws_secret_access_key) {
    throw new Error('AWS credentials are missing or invalid');
  }

  console.log('AWS Config validation:', {
    hasAccessKey: !!config.aws.aws_access_key_id,
    hasSecretKey: !!config.aws.aws_secret_access_key,
    region: awsConfig.region
  });

  try {
    const cloudfrontClient = new CloudFrontClient(awsConfig);

    // Fetch the CloudFront distribution config to get the domain name
    const getDistributionConfigCommand = new GetDistributionConfigCommand({
      Id: config.aws.cloudfront_distribution_id
    });
    const { DistributionConfig, ETag } = await cloudfrontClient.send(getDistributionConfigCommand);

    // Get the CloudFront domain name from the distribution
    const command = new GetDistributionCommand({ Id: config.aws.cloudfront_distribution_id });
    const response = await cloudfrontClient.send(command);

    const cloudfrontDomainName = DistributionConfig;

    // Use this domain name instead of constructing it
    const cloudfrontDomain = response.Distribution.DomainName;
    console.log('CloudFront Domain Name:', cloudfrontDomain);


    const fullSubdomain = `${portalName}.${config.aws.base_domain}`;
    // const CLOUDFRONT_HOSTED_ZONE_ID = config.aws.cloudfront_hosted_zone_id;

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

    return {
      success: true,
      subdomain: fullSubdomain,
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

module.exports.getPortal = async () => {
  try {
    const { rows } = await query(queries.getPortal());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Portals:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Portals available",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.getPortalConfiguration = async (values) => {
  try {
    const { rows } = await query(queries.getPortalConfiguration(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Portal Configurations:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Portal Configurations available",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.getPortalAdmins = async (req, values) => {
  try {
    const { rows } = await query(queries.getPortalAdmins(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Portal Admins:",
        response: rows.filter((row) => {
          return row.Id != req.session.adminID;
        }),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Portal's Admin available",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.addPortal = async (values) => {
  try {
    if (values[4] === "app" ||
      values[4] === "staging" ||
      values[4] === "adm1n-sup3r-z1211a23r" ||
      values[4] === "adminstaging"
    ) {
      const error_object = {
        responseCode: 500,
        message: "Portal already exists",
        response: "",
      };
      return error_object;
    }
    const { rows } = await query(queries.addPortal(), values);
    if (Object.keys(rows).length > 0) {
      // Create subdomain after successful portal creation
      const portalName = values[4]; // Assuming first value is portal name
      const subdomainResult = await createSubdomain(portalName);
      console.log(subdomainResult);
      const result_object = {
        responseCode: 200,
        message: "Portal added successfully",
        portalID: rows[0].add_portal,
        subdomain: subdomainResult.success ? subdomainResult.subdomain : null,
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Portal",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Portal already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.updatePortal = async (values) => {
  try {
    const { rows } = await query(queries.updatePortal(), values);
    if (rows[0].update_portal) {
      const result_object = {
        responseCode: 200,
        message: "Portal updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Portal",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Portal already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.updatePortalConfiguration = async (values) => {
  try {
    const { rows } = await query(queries.updatePortalConfiguration(), values);
    if (rows[0].update_portal_configuration) {
      const result_object = {
        responseCode: 200,
        message: "Portal updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Portal",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Portal already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.updatePortalInfo = async (values) => {
  try {
    const { rows } = await query(queries.updatePortalInfo(), values);
    if (rows[0].update_portal_info) {
      const result_object = {
        responseCode: 200,
        message: "Portal Info updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Portal Info",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Portal already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.deletePortal = async (values) => {
  try {
    if (values[1] === "app" ||
      values[1] === "staging" ||
      values[1] === "adm1n-sup3r-z1211a23r" ||
      values[1] === "adminstaging"
    ) {
      const error_object = {
        responseCode: 500,
        message: "Portal already exists",
        response: "",
      };
      return error_object;
    }
    // First get the portal details to know the subdomain name
    const { rows: portalDetails } = await query(queries.getPortalById(), [values[0]]);
    if (!portalDetails.length) {
      throw new Error('Portal not found');
    }

    const portalName = portalDetails[0].PortalName;
    const awsConfig = {
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.aws.aws_access_key_id,
        secretAccessKey: config.aws.aws_secret_access_key
      }
    };

    // Remove from CloudFront
    const cloudfrontClient = new CloudFrontClient(awsConfig);
    const getDistributionConfigCommand = new GetDistributionConfigCommand({
      Id: config.aws.cloudfront_distribution_id
    });
    const { DistributionConfig, ETag } = await cloudfrontClient.send(getDistributionConfigCommand);

    // Remove the alias from the distribution
    const updatedAliases = DistributionConfig.Aliases.Items.filter(
      alias => alias !== `${portalName}.swiftuni.com`
    );

    const updateDistributionParams = {
      Id: config.aws.cloudfront_distribution_id,
      IfMatch: ETag,
      DistributionConfig: {
        ...DistributionConfig,
        Aliases: {
          Quantity: updatedAliases.length,
          Items: updatedAliases
        }
      }
    };

    await cloudfrontClient.send(new UpdateDistributionCommand(updateDistributionParams));

    // Remove from Route53
    const route53Client = new Route53Client(awsConfig);
    const fullSubdomain = `${portalName}.${config.aws.base_domain}`;

    // Get the CloudFront domain name from the distribution
    const command = new GetDistributionCommand({ Id: config.aws.cloudfront_distribution_id });
    const response = await cloudfrontClient.send(command);
    const cloudfrontDomain = response.Distribution.DomainName;

    // Delete CNAME record
    const deleteCnameParams = {
      HostedZoneId: config.aws.route53_hosted_zone_id,
      ChangeBatch: {
        Changes: [{
          Action: 'DELETE',
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

    await route53Client.send(new ChangeResourceRecordSetsCommand(deleteCnameParams));

    // Delete the portal from database
    const { rows } = await query(queries.deletePortal(), values);
    if (rows[0].delete_portal) {
      const result_object = {
        responseCode: 200,
        message: "Portal and associated DNS records deleted successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      throw new Error("Something went wrong while deleting Portal");
    }
  } catch (error) {
    console.error('Delete portal error:', error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.getPortalMetrics = async (portal_id) => {
  try {
    const { rows } = await query(queries.getPortalMetrics(), portal_id);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Portal Metrics",
        response: rows[0].get_portal_metrics,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while fetching Portal Metrics",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};
