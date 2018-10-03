/**
 * Module to initialize all app dependencies
 * See /libs/service_locator.js for more information
 * about Dependency Injection
 *
 */

const config = require('./config')();
const serviceLocator = require('../libs/service-locator');

serviceLocator.register('logger', () => require('../libs/logger').create(config.application_logging)); // eslint-disable-line global-require
serviceLocator.register('mongoose', () => require('mongoose')); // eslint-disable-line global-require
serviceLocator.register('videoModel', () => require('../models/video-model')); // eslint-disable-line global-require

serviceLocator.register('videoService', () => {
  const videoModel = serviceLocator.get('videoModel');
  const VideoService = require('../services/video-service'); // eslint-disable-line global-require
  return new VideoService(videoModel);
});

serviceLocator.register('videoController', () => {
  const videoService = serviceLocator.get('videoService');
  const VideoController = require('../controllers/video-controller'); // eslint-disable-line global-require
  return new VideoController(videoService);
});

module.exports = serviceLocator;
