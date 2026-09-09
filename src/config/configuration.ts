import { readDockerSecret } from 'src/security/readSecrets';

export default () => ({
  appPort: process.env.PORT || 8081,
  jwtSecret: process.env.JWT_SECRET,
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DBNAME,
    userName: process.env.MONGODB_USERNAME,
    password: readDockerSecret('secretName') || process.env.MONGODB_PASSWORD,
  },
});
