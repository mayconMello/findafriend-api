import { CreatePetUseCase } from '@/use-cases/create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(new PrismaPetsRepository())
}
