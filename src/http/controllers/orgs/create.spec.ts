import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

import { app } from '@/app'
import { makeOrg } from '@/utils/tests/make-org'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new org', async () => {
    const response = await request(app.server).post('/orgs').send(makeOrg())

    expect(response.status).toBe(201)
  })
})
