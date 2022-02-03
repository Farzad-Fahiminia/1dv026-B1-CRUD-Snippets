/**
 * Module for the SnippetsController.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
export class AuthorizeController {
  /**
   * Checks users authorization.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async checkUser (req, res, next) {
    try {
      console.log('Hej hej Authorize controller')
      if (req.session.username) {
        next()
      } else {
        throw new Error('404')
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Checks users authorization.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async checkSnippetOwner (req, res, next) {
    try {
      const result = await Snippet.findById(req.params.id).exec()
      if (req.session.username === result.author) {
        console.log('Lilla LISA')
        next()
      } else {
        throw new Error('404')
      }
    } catch (error) {
      next(error)
    }
  }
}
