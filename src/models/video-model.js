const sequence = require('mongoose-sequence');
const serviceLocator = require('../libs/service-locator');

const mongoose = serviceLocator.get('mongoose');
const autoIncrement = sequence(mongoose);

const videoSchema = new mongoose.Schema({
  description: {
    type: 'String',
    required: true,
  },
  url: {
    type: 'String',
    required: true,
  },
});

videoSchema.plugin(autoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Videos', videoSchema);
