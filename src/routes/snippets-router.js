/**
 * Snippets routes.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'
import { AuthorizeController } from '../controllers/authorize-controller.js'
import csurf from 'csurf'

export const router = express.Router()

const controller = new SnippetsController()
const authorizeController = new AuthorizeController()

// Map HTTP verbs and route paths to controller action methods.

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', csurf(), (req, res, next) => authorizeController.checkUser(req, res, next), (req, res, next) => controller.create(req, res, next))
router.post('/create', (req, res, next) => authorizeController.checkUser(req, res, next), (req, res, next) => controller.createPost(req, res, next))

router.get('/:id/update', csurf(), (req, res, next) => authorizeController.checkUser(req, res, next), (req, res, next) => authorizeController.checkSnippetOwner(req, res, next), (req, res, next) => controller.update(req, res, next))
router.post('/:id/update', (req, res, next) => authorizeController.checkUser(req, res, next), (req, res, next) => authorizeController.checkSnippetOwner(req, res, next), (req, res, next) => controller.updatePost(req, res, next))

router.get('/:id/delete', csurf(), (req, res, next) => authorizeController.checkUser(req, res, next), (req, res, next) => authorizeController.checkSnippetOwner(req, res, next), (req, res, next) => controller.delete(req, res, next))
router.post('/:id/delete', (req, res, next) => authorizeController.checkUser(req, res, next), (req, res, next) => authorizeController.checkSnippetOwner(req, res, next), (req, res, next) => controller.deletePost(req, res, next))
