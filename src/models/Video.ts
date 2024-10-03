// models/Video.ts

import { getNetworkSpeed } from '../helpers/helpers';

export class Video {
  private id: number;
  private url: string;
  private image: string;
  private videoFile: string;
  private duration: number;
  private user: any;

  constructor(videoData: any) {
    this.id = videoData.id;
    this.url = videoData.url;
    this.image = videoData.image;
    this.duration = videoData.duration;
    this.user = videoData.user;

    // Call the method to select the best video file
    this.videoFile = this.selectVideoFile(videoData.video_files);
  }

  // Method to select the appropriate video file based on network speed
  private selectVideoFile(videoFiles: any[]): string {
    const networkSpeed = getNetworkSpeed(); // You can retrieve network speed here

    const selectedVideo = videoFiles.find((file: any) => {
      if (networkSpeed === '4g') return file.quality === 'uhd' || file.quality === 'hd';
      if (networkSpeed === '3g') return file.quality === 'hd' || file.quality === 'sd';
      return file.quality === 'sd';
    }) || videoFiles.reduce((prev: any, current: any) => prev.height > current.height ? prev : current);

    return selectedVideo.link;
  }

  // Getters
  public getId(): number {
    return this.id;
  }

  public getUrl(): string {
    return this.url;
  }

  public getImage(): string {
    return this.image;
  }

  public getVideoFile(): string {
    return this.videoFile;
  }

  public getDuration(): number {
    return this.duration;
  }

  public getUser(): any {
    return this.user;
  }

  // Setters (optional)
  public setId(id: number): void {
    this.id = id;
  }

  public setUrl(url: string): void {
    this.url = url;
  }

  public setImage(image: string): void {
    this.image = image;
  }

  public setVideoFile(videoFile: string): void {
    this.videoFile = videoFile;
  }

  public setDuration(duration: number): void {
    this.duration = duration;
  }

  public setUser(user: any): void {
    this.user = user;
  }
}
