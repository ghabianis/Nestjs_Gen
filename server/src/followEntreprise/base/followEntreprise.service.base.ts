/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  FollowEntreprise,
  Entreprise,
  Candidate,
} from "@prisma/client";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { DbService } from "src/dbService/db.service";

export class FollowEntrepriseServiceBase {
  constructor(protected readonly prisma: DbService) {}

  async count<T extends Prisma.FollowEntrepriseFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FollowEntrepriseFindManyArgs>
  ): Promise<number> {
    return this.prisma.followEntreprise.count(args);
  }

  async findMany<T extends Prisma.FollowEntrepriseFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FollowEntrepriseFindManyArgs>
  ): Promise<PaginatedInterface<FollowEntreprise>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.followEntreprise.findMany(args),
      this.prisma.followEntreprise.count(),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.FollowEntrepriseFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.FollowEntrepriseFindUniqueArgs>
  ): Promise<FollowEntreprise | null> {
    return this.prisma.followEntreprise.findUnique(args);
  }
  async create<T extends Prisma.FollowEntrepriseCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FollowEntrepriseCreateArgs>
  ): Promise<FollowEntreprise> {
    return this.prisma.followEntreprise.create<T>(args);
  }
  async update<T extends Prisma.FollowEntrepriseUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FollowEntrepriseUpdateArgs>
  ): Promise<FollowEntreprise> {
    return this.prisma.followEntreprise.update<T>(args);
  }
  async delete<T extends Prisma.FollowEntrepriseDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.FollowEntrepriseDeleteArgs>
  ): Promise<FollowEntreprise> {
    return this.prisma.followEntreprise.delete(args);
  }

  async getEntreprise(parentId: string): Promise<Entreprise | null> {
    return this.prisma.followEntreprise
      .findUnique({
        where: { id: parentId },
      })
      .entreprise();
  }

  async getCandidate(parentId: string): Promise<Candidate | null> {
    return this.prisma.followEntreprise
      .findUnique({
        where: { id: parentId },
      })
      .candidate();
  }
}
