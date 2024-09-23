import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { makeOrg } from '@/utils/tests/make-org'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    const org = makeOrg()
    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/orgs/sessions').send({
      email: org.email,
      password: org.password,
    })

    const cookies = authResponse.headers['set-cookie']

    const response = await request(app.server)
      .post('/orgs/sessions/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
