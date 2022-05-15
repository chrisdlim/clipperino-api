import S3 from 'aws-sdk/clients/s3';

export interface S3ServiceInterface {
  getObjectsByBucket(bucketName: string): Promise<S3.ObjectList>;
  uploadObjectToBucket(bucketName: string, filename: string, data: Buffer|string): Promise<string>;
}