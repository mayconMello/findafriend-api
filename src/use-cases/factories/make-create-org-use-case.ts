import { CreateOrgUseCase } from '@/use-cases/create-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreateOrgUseCase() {
  return new CreateOrgUseCase(new PrismaOrgsRepository())
}
