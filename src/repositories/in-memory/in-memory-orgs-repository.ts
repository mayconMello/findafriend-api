import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      id: randomUUID(),
    }
    this.items.push(org)
    return org
  }

  async finbByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((org) => org.email === email) ?? null

    return org
  }
}
