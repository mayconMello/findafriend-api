import { FindPetsUseCase } from '@/use-cases/find-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFindPetsUseCase() {
  return new FindPetsUseCase(new PrismaPetsRepository())
}
