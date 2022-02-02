/**
 * Module for the UsersController.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class UsersController {
  /**
   * Displays a list of snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    res.render('users/login')
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register (req, res) {
    res.render('users/register')
  }

  /**
   * Creates a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async registerUser (req, res) {
    console.log(req.body)
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })

      await user.save()

      req.session.flash = { type: 'success', text: 'The user was created successfully.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./register')
    }
  }

  // /**
  // * Returns a HTML form for updating a snippet.
  // *
  // * @param {object} req - Express request object.
  // * @param {object} res - Express response object.
  // */
  // async update (req, res) {
  //   try {
  //     const user = await Users.findById(req.params.id)

  //     res.render('users/update', { viewData: user.toObject() })
  //   } catch (error) {
  //     req.session.flash = { type: 'danger', text: error.message }
  //     res.redirect('..')
  //   }
  // }

  // /**
  // * Updates a specific snippet.
  // *
  // * @param {object} req - Express request object.
  // * @param {object} res - Express response object.
  // */
  // async updatePost (req, res) {
  //   try {
  //     const user = await User.findById(req.params.id)

  //     if (user) {
  //       user.username = req.body.username
  //       user.password = req.body.password

  //       await user.save()

  //       req.session.flash = { type: 'success', text: 'The user was updated successfully.' }
  //     } else {
  //       req.session.flash = {
  //         type: 'danger',
  //         text: 'The user you attempted to update was removed by another user after you got the original values.'
  //       }
  //     }
  //     res.redirect('..')
  //   } catch (error) {
  //     req.session.flash = { type: 'danger', text: error.message }
  //     res.redirect('./update')
  //   }
  // }

  // /**
  // * Returns a HTML form for deleting a snippet.
  // *
  // * @param {object} req - Express request object.
  // * @param {object} res - Express response object.
  // */
  // async delete (req, res) {
  //   try {
  //     const user = await User.findById(req.params.id)

  //     res.render('users/delete', { viewData: user.toObject() })
  //   } catch (error) {
  //     req.session.flash = { type: 'danger', text: error.message }
  //     res.redirect('..')
  //   }
  // }

  // /**
  // * Deletes the specified snippet.
  // *
  // * @param {object} req - Express request object.
  // * @param {object} res - Express response object.
  // */
  // async deletePost (req, res) {
  //   try {
  //     await User.findByIdAndDelete(req.body.id)

  //     req.session.flash = { type: 'success', text: 'The user was deleted successfully.' }
  //     res.redirect('..')
  //   } catch (error) {
  //     req.session.flash = { type: 'danger', text: error.message }
  //     res.redirect('./delete')
  //   }
  // }
}
