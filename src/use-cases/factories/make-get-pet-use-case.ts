import { GetPetUseCase } from '@/use-cases/get-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetUseCase() {
  return new GetPetUseCase(new PrismaPetsRepository())
}
