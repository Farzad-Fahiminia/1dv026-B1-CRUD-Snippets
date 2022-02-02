/**
 * Snippets routes.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { UsersController } from '../controllers/users-controller.js'

export const router = express.Router()

const controller = new UsersController()

// Map HTTP verbs and route paths to controller action methods.

router.get('/login', (req, res, next) => controller.index(req, res, next))

router.get('/register', (req, res, next) => controller.register(req, res, next))
router.post('/register', (req, res, next) => {
  console.log('ÄR JAG INNE I RÄTT?')
  controller.registerUser(req, res, next)})
