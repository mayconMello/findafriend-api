import { FastifyInstance } from 'fastify'
import { create } from '@/http/controllers/pets/create'
import { findPets } from '@/http/controllers/pets/find-pets'
import { getPet } from '@/http/controllers/pets/get-pet'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJwt] }, create)

  app.get('/orgs/pets', findPets)

  app.get('/orgs/pets/:id', getPet)
}
