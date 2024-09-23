import { FastifyInstance } from 'fastify'
import { create } from '@/http/controllers/orgs/create'
import { authenticate } from '@/http/controllers/orgs/authenticate'
import { refresh } from '@/http/controllers/orgs/refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/orgs/sessions', authenticate)

  app.post('/orgs/sessions/refresh', refresh)
}
