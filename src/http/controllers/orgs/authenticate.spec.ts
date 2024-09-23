import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from '@/utils/tests/make-org'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate an org', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const response = await request(app.server).post('/orgs/sessions').send({
      email: org.email,
      password: org.password,
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
