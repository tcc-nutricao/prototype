import fs from 'fs'
import path from 'path'
import { Router, Express } from 'express'

type RouteLoader = (router: Router) => void

export const loadRoutes = (router: Router, directoryPath: string): void => {
  const directory = path.resolve(directoryPath)
  const filelist = fs.readdirSync(directory)

  filelist.forEach((file) => {
    const fullPath = path.join(directory, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      loadRoutes(router, fullPath)
    } else if (stat.isFile() && file.endsWith('.ts')) { // Ajuste para ts
      const routesModule = require(fullPath)
      const routes: RouteLoader = routesModule.default || routesModule
      if (typeof routes === 'function') {
        routes(router)
      }
    }
  })
}

export const startRoutes = (app: Express, routesPath = './src/routes'): void => {
  const router = Router()
  app.use(router)

  loadRoutes(router, routesPath)

  router.route('/ping').all((req, res) => {
    res.status(200).send('Pong')
  })

  router.route('/').all((req, res) => {
    res.sendStatus(204)
  })

  router.route('*').all((req, res) => {
    res.status(404).send('Erro, rota não encontrada.')
  })
}
