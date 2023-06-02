import mongoose from 'mongoose'
import app from './App'
import config from './config/index'
import { logger, errorlogger } from './shared/logger'

async function Connect() {
  try {
    await mongoose.connect(config.mongoURI as string)
    logger.info('Database connection established')
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error(err)
  }
}
Connect()
