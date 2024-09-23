import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '@/utils/tests/make-org'
import { makePet } from '@/utils/tests/make-pet'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { prisma } from '@/lib/prisma'

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet e2e', async () => {
    const org = makeOrg()

    const { org: createdOrg } = await makeCreateOrgUseCase().execute(org)

    const pet = await prisma.pet.create({
      data: makePet({ org_id: createdOrg.id }),
    })

    const response = await request(app.server)
      .get(`/orgs/pets/${pet.id}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })
})
