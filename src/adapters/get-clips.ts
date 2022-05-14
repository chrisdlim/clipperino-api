import { GetClipsPort } from "../ports/get-clips.interface";

export class GetClips implements GetClipsPort {
  async getClips(): Promise<any> {
    return [];
  }
}