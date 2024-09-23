import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    owner: z.string(),
    name: z.string(),
    whatsapp: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    neighborhood: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const {
    owner,
    name,
    whatsapp,
    email,
    password,
    cep,
    address,
    city,
    state,
    neighborhood,
    latitude,
    longitude,
  } = createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  await createOrgUseCase.execute({
    owner,
    name,
    whatsapp,
    email,
    password,
    cep,
    address,
    city,
    state,
    neighborhood,
    latitude,
    longitude,
  })
  return reply.status(201).send()
}
