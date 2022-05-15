import { S3ServiceInterface } from "../services/interfaces/s3.service.interface";

export class GetClips {
  private s3Service: S3ServiceInterface;
  private clipsBucketName: string;
  constructor(s3Service: S3ServiceInterface, bucketName: string) {
    this.s3Service = s3Service;
    this.clipsBucketName = bucketName;
  }

  async handle() {
    return await this.getClips();
  }

  async getClips() {
    return this.s3Service.getObjectsByBucket(this.clipsBucketName);
  }
}