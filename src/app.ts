import fastify from 'fastify'
import { orgsRoutes } from '@/http/controllers/orgs/routes'
import { petsRoutes } from '@/http/controllers/pets/routes'
import { env } from '@/env'
import { ZodError } from 'zod'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'prd') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
