import express, { Router } from 'express'

import UserRoute from './routes/UserRoute'
import AuthRoute from './routes/AuthRoute'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = Router() // <- EXPRESS.Router
app.use(router)

UserRoute(router) // <- Deve exportar uma função que recebe router
AuthRoute(router)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
