import { S3 } from "aws-sdk";

import config from "./config";

export default new S3({
    apiVersion: config.apiVersion,
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    },
    params: {
        Bucket: config.bucketName,
    },
})
