export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.SERVER_PORT || 3000,
});
