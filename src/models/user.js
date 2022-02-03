/**
 * Mongoose model User.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minlength: [8, 'The password must be of minimum length 8 characters.'],
    maxlength: [500, 'The password must be of maximum length 500 characters.'],
    required: true
  }
}, {
  timestamps: true
})

// Salts and hashes password before save.
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 * Lookup the user in the database and compare, using a “constant-time” algorithm,
 * the provided password with the hashed one from the database.
 *
 * @param {string} username - The users name.
 * @param {string} password - The users password.
 * @returns {string} - Returns the user.
 *
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password!')
  }
  return user
}

// Create a model using the schema.
export const User = mongoose.model('User', userSchema)
