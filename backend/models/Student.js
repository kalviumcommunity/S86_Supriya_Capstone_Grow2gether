const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  profilePicture: {
    type: String,
    default: '', 
  },

  skills: {
    type: [String], 
    default: [],
  },
  projects: {
    type: [String], 
    default: [],
  },

  oneLineStatus: {
    type: String,
    maxlength: 100,
    default: '', 
  },
  mood: {
    type: String,
    enum: ['😊', '😐', '😴', '😔', '😡', '🤯', '😁'],
    default: '😊',
  },
  miniGoal: {
    type: String,
    maxlength: 150,
    default: '', 
  },

  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'StudyGroup',
    default: [],
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Student', studentSchema);
