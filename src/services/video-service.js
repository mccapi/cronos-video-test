/**
 * this class envelopes necessary methods to get videos
 *
 * Constructor injects a video model to perform the resquests
 * see https://mongoosejs.com/docs/guide.html for more information
 */
class VideoService {
  constructor(Videos) {
    this.Videos = Videos;
  }

  async getAll() {
    return this.Videos.find();
  }

  async getById(id) {
    return this.Videos.find({ id });
  }

  async post(videos) {
    return this.Videos.create(videos);
  }
}

module.exports = VideoService;
