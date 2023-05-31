import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoute from './app/users/user.route'
const app: Application = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
// application route
app.use('/api/', userRoute)
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully')
})

app.listen(3000, () => {
  console.log('Application listening on port 3000!')
})
export default app
