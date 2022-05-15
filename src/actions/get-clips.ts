import { S3ServiceInterface } from "../services/interfaces/s3.service.interface";
import * as S3 from 'aws-sdk/clients/s3';

export class GetClips {
  private s3Service: S3ServiceInterface;
  private clipsBucketName: string;
  constructor(
    s3Service: S3ServiceInterface,
    bucketName: string
  ) {
    this.s3Service = s3Service;
    this.clipsBucketName = bucketName;
  }

  async handle() {
    return await this.getClips();
  }

  async getClips() {
    return this.s3Service.getObjectsByBucket({ bucketName: this.clipsBucketName })
      .then(res => this.formatS3ObjectsToClips(res));
  }

  formatS3ObjectsToClips(s3Objects: S3.ObjectList) {
    return s3Objects.map(({ Key, LastModified, Size }) => ({
      id: Key,
      updatedAt: LastModified,
      size: Size,
    }))
  }
}