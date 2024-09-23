import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateOrgUseCase() {
  return new AuthenticateOrgUseCase(new PrismaOrgsRepository())
}
