const config = {
  server: {
    port: process.env.SERVER_PORT,
  },
  dbConfigurations: {
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT,
  },
  twillio: {
    TWILLIO_ACCOUNT_SID: process.env.TWILLIO_ACCOUNT_SID,
    TWILLIO_AUTH_TOKEN: process.env.TWILLIO_AUTH_TOKEN,
  },
  auth: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    access_token_algo: process.env.ACCESS_TOKEN_ALGO,
    access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,
  },
  passwordAuth: {
    access_token_secret: process.env.PASSWORD_ACCESS_TOKEN_SECRET,
    access_token_algo: process.env.PASSWORD_ACCESS_TOKEN_ALGO,
    access_token_expiry: process.env.PASSWORD_ACCESS_TOKEN_EXPIRY,
  },
  sendEmail: {
    emailId: process.env.EMAIL_ID,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
  },
  frontend: {
    url: process.env.FRONTEND_LINK,
  },
  aws: {
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_KEY,
    aws_s3_bucket_name: process.env.AWS_BUCKET_NAME,
    aws_s3_templates_bucket_name: process.env.AWS_TEMPLATES_BUCKET_NAME,
    aws_s3_region: process.env.AWS_REGION,
    route53_hosted_zone_id: process.env.AWS_ROUTE53_HOSTED_ZONE_ID,
    cloudfront_distribution_id: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID,
    base_domain: process.env.BASE_DOMAIN,
  },
  bankAlfalah: {
    key_1: process.env.KEY_1,
    key_2: process.env.KEY_2,
    handshake_url: process.env.HANDSHAKE_URL,
    hs_channel_id: process.env.HS_CHANNEL_ID,
    hs_return_url: process.env.HS_RETURN_URL,
    hs_merchant_id: process.env.HS_MERCHANT_ID,
    hs_store_id: process.env.HS_STORE_ID,
    hs_merchant_hash: process.env.HS_MERCHANT_HASH,
    hs_merchant_password: process.env.HS_MERCHANT_PASSWORD,
    hs_merchant_username: process.env.HS_MERCHANT_USERNAME,
    hs_currency: process.env.CURRENCY,
    hs_transaction_type_id: process.env.TRANSACTION_TYPE_ID,
  },
};

module.exports = config;
