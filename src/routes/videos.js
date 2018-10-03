/**
 * This method register routes for video endpoint
 * Injects server (express) and service locator with
 * all dependencies (if needed)
 * @param {object} server
 * @param {object} serviceLocator
 */
module.exports.register = (server, serviceLocator) => {
  const VIDEO_ROUTE = '/videos';
  const VIDEO_BY_ID_ROUTE = '/:id([0-9]+)'; // only numbers allowed
  const router = server.Router();
  const videoController = serviceLocator.get('videoController');

  // all videos
  router.get(VIDEO_ROUTE, videoController.getAll);
  // video by id
  router.get(`${VIDEO_ROUTE}${VIDEO_BY_ID_ROUTE}`, videoController.getById);
  // post a new video
  router.post(VIDEO_ROUTE, videoController.post);

  return router;
};
