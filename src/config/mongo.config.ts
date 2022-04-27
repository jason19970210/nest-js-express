import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => {

  const dbUsername = process.env.MONGO_USERNAME;
  const dbPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
  const dbHost = process.env.MONGO_HOST;
  const dbPort = process.env.MONGO_PORT;
  const uri = process.env.MONGO_URI || `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}`;
  return { uri };
});
