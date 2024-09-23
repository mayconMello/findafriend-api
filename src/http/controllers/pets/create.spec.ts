import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '@/utils/tests/make-org'
import { makePet } from '@/utils/tests/make-pet'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
    const org = makeOrg()

    const { org: createdOrg } = await makeCreateOrgUseCase().execute(org)

    const authResponse = await request(app.server)
      .post('/orgs/sessions')
      .send({ email: org.email, password: org.password })

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: createdOrg.id }))

    expect(response.status).toBe(201)
  })
})
