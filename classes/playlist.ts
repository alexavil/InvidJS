/**
 * @class FullPlaylist - Full Playlist Info
 */
export class FullPlaylist {
  title: string;
  author: string;
  description: string;
  videoCount: number;
  videos: Array<any>;
  /**
   *
   * @param {string} title
   * @param {string} author
   * @param {string} description
   * @param {number} videoCount
   * @param {Array} videos
   */
  constructor(
    title: string,
    author: string,
    description: string,
    videoCount: number,
    videos: Array<any>
  ) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.videoCount = videoCount;
    this.videos = videos;
  }
}

/**
 * @class BasicPlaylist - Basic Playlist Info
 */

export class BasicPlaylist {
  title: any;
  videos: any;
  /**
   *
   * @param {string} title
   * @param {Array} videos
   */
  constructor(title: string, videos: Array<any>) {
    this.title = title;
    this.videos = videos;
  }
}