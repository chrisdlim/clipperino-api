import { UploadClipPort } from "../ports/upload-clip.interface";

export class UploadClipAdapter implements UploadClipPort {
  async uploadClip(): Promise<string> {
    return 'Uploaded clip!';
  }

}