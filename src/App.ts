import express, { Application } from 'express'
import cors from 'cors'
import userRoute from './app/users/user.route'
import { logger } from './shared/logger'
const app: Application = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
// application route
app.use('/api/', userRoute)

app.listen(3000, () => {
  logger.info('Application listening on port 3000!')
})
export default app
