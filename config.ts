import { config as dotEnvConfig} from "dotenv";

dotEnvConfig();

const config = {
  apiVersion: process.env.AWS_API_VERSION,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCES_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: process.env.AWS_BUCKET_NAME,
}

export default config;
