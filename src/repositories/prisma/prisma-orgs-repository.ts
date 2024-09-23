import { OrgsRepository } from '@/repositories/orgs-repository'
import { Prisma, Org } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data })

    return org
  }

  async finbByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findFirst({ where: { email } })
    return org
  }
}
