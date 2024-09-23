import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['puppy', 'adult', 'senior']),
    size: z.enum(['small', 'medium', 'large', 'extra_large']),
    breed: z.string(),
    energy_level: z.enum(['low', 'medium', 'high', 'very_high']),
    environment: z.enum(['indoor', 'outdoor', 'both', 'farm', 'small_space']),
    org_id: z.string(),
  })
  const {
    name,
    description,
    age,
    size,
    breed,
    energy_level,
    environment,
    org_id,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    description,
    age,
    size,
    breed,
    energy_level,
    environment,
    org_id,
  })

  return reply.status(201).send()
}
