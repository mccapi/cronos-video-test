/**
 * Controller to manage video router.
 * This class injects the video service
 */
class VideoController {
  constructor(videoService) {
    this.videoService = videoService;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.post = this.post.bind(this);
  }

  /** This method calls the video service and retrieve all videos
   * from the database
   * @param {object} req - request object
   * @param {object} res - response object
   */
  async getAll(req, res) {
    const videos = await this.videoService.getAll();
    if (videos.length === 0) return res.send(404);
    return res.json(videos);
  }

  async getById(req, res) {
    const video = await this.videoService.getById(req.params.id);
    if (video.length === 0) return res.send(404);
    return res.json(video);
  }

  async post(req, res) {
    const video = await this.videoService.post(req.body);
    return res.json(video);
  }
}

module.exports = VideoController;
