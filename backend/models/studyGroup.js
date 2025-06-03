
const mongoose = require('mongoose');

const studyGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: '',
  },

  subject: {
    type: String,
    required: true,
  },

  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },

  tags: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('StudyGroup', studyGroupSchema);
