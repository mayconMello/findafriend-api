import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '@/utils/tests/make-org'
import { makePet } from '@/utils/tests/make-pet'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { prisma } from '@/lib/prisma'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find pets by city e2e', async () => {
    const { org } = await makeCreateOrgUseCase().execute(makeOrg())

    await prisma.pet.create({
      data: makePet({ org_id: org.id }),
    })

    await prisma.pet.create({
      data: makePet({ org_id: org.id }),
    })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city })
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to find pets by city and size e2e', async () => {
    const { org } = await makeCreateOrgUseCase().execute(makeOrg())

    await prisma.pet.create({
      data: makePet({ org_id: org.id, size: 'small' }),
    })

    await prisma.pet.create({
      data: makePet({ org_id: org.id, size: 'medium' }),
    })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, size: 'small' })
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to find pets by city and environment e2e', async () => {
    const { org } = await makeCreateOrgUseCase().execute(makeOrg())

    await prisma.pet.create({
      data: makePet({ org_id: org.id, environment: 'indoor' }),
    })

    await prisma.pet.create({
      data: makePet({ org_id: org.id, environment: 'both' }),
    })

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, environment: 'indoor' })
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
