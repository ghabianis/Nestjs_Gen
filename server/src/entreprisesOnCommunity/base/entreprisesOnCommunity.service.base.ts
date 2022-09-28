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
  EntreprisesOnCommunity,
  Entreprise,
  Community,
} from "@prisma/client";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { DbService } from "src/dbService/db.service";

export class EntreprisesOnCommunityServiceBase {
  constructor(protected readonly prisma: DbService) {}

  async count<T extends Prisma.EntreprisesOnCommunityFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntreprisesOnCommunityFindManyArgs>
  ): Promise<number> {
    return this.prisma.entreprisesOnCommunity.count(args);
  }

  async findMany<T extends Prisma.EntreprisesOnCommunityFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntreprisesOnCommunityFindManyArgs>
  ): Promise<PaginatedInterface<EntreprisesOnCommunity>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.entreprisesOnCommunity.findMany(args),
      this.prisma.entreprisesOnCommunity.count(),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.EntreprisesOnCommunityFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntreprisesOnCommunityFindUniqueArgs>
  ): Promise<EntreprisesOnCommunity | null> {
    return this.prisma.entreprisesOnCommunity.findUnique(args);
  }
  async create<T extends Prisma.EntreprisesOnCommunityCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntreprisesOnCommunityCreateArgs>
  ): Promise<EntreprisesOnCommunity> {
    return this.prisma.entreprisesOnCommunity.create<T>(args);
  }
  async update<T extends Prisma.EntreprisesOnCommunityUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntreprisesOnCommunityUpdateArgs>
  ): Promise<EntreprisesOnCommunity> {
    return this.prisma.entreprisesOnCommunity.update<T>(args);
  }
  async delete<T extends Prisma.EntreprisesOnCommunityDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntreprisesOnCommunityDeleteArgs>
  ): Promise<EntreprisesOnCommunity> {
    return this.prisma.entreprisesOnCommunity.delete(args);
  }

  async getEntreprise(parentId: string): Promise<Entreprise | null> {
    return this.prisma.entreprisesOnCommunity
      .findUnique({
        where: { id: parentId },
      })
      .entreprise();
  }

  async getCommunity(parentId: string): Promise<Community | null> {
    return this.prisma.entreprisesOnCommunity
      .findUnique({
        where: { id: parentId },
      })
      .community();
  }
}