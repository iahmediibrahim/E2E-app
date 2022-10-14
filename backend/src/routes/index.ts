import express from 'express'
import PostsRouter from './api/post'

const routes = express.Router()

routes.use('/posts', PostsRouter)
export default routes
