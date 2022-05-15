import { S3ServiceInterface } from "../services/interfaces/s3.service.interface";

export class UploadClip {
  private s3Service: S3ServiceInterface;
  private clipsBucketName: string;
  private filename: string;
  private file: Buffer;
  constructor(
    s3Service: S3ServiceInterface,
    bucketName: string,
    filename: string, file: Buffer
  ) {
    this.s3Service = s3Service;
    this.clipsBucketName = bucketName;
    this.filename = filename;
    this.file = file;
  }
  async handle() {
    return this.s3Service.uploadObjectToBucket(this.clipsBucketName, this.filename, this.file).then(res => ({ id: res }));
  }
}