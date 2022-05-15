import S3 from 'aws-sdk/clients/s3';
import { S3ServiceInterface } from './interfaces/s3.service.interface';
import { v4 as uuid } from 'uuid';

export class S3Service implements S3ServiceInterface {
  private s3Client: S3;
  constructor() {
    this.s3Client = new S3({
      endpoint: 'http://localhost:4566',
      s3ForcePathStyle: true,
    })
  }

  async getObjectsByBucket(bucketName: string) {
    return this.s3Client.listObjectsV2({ Bucket: bucketName }).promise().then(res => res.Contents || []);
  }
  async uploadObjectToBucket(bucketName: string, filename: string, data: Buffer|string): Promise<string> {
    const key = `${uuid()}-${filename}`;
    await this.s3Client.upload({ Bucket: bucketName, Key: key, Body: data}).promise();
    // await this.s3Client.putObject({ Bucket: bucketName, Key: key, Body: data }).promise();
    return key;
  }
}