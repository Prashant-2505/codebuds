// models/user.js

import mongoose from 'mongoose';



const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'customer',
  },
});

// Check if the model already exists before defining it
const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', UserSchema);

export default UserModel;
