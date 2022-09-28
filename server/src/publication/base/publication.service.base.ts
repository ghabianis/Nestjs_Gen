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
  Publication,
  PublicationsOnCommunity,
  Socialinterraction,
  Event,
  Post,
  Offer,
  Story,
  Video,
  User,
} from "@prisma/client";

import { PaginatedInterface } from "../../util/PaginatedInterface";
import { DbService } from "src/dbService/db.service";

export class PublicationServiceBase {
  constructor(protected readonly prisma: DbService) {}

  async count<T extends Prisma.PublicationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PublicationFindManyArgs>
  ): Promise<number> {
    return this.prisma.publication.count(args);
  }

  async findMany<T extends Prisma.PublicationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PublicationFindManyArgs>
  ): Promise<PaginatedInterface<Publication>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.publication.findMany(args),
      this.prisma.publication.count(),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.PublicationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PublicationFindUniqueArgs>
  ): Promise<Publication | null> {
    return this.prisma.publication.findUnique(args);
  }
  async create<T extends Prisma.PublicationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PublicationCreateArgs>
  ): Promise<Publication> {
    return this.prisma.publication.create<T>(args);
  }
  async update<T extends Prisma.PublicationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PublicationUpdateArgs>
  ): Promise<Publication> {
    return this.prisma.publication.update<T>(args);
  }
  async delete<T extends Prisma.PublicationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PublicationUpdateArgs>
  ): Promise<Publication> {
    return this.prisma.publication.update(args);
  }

  async findPublicationsOnCommunities(
    parentId: string,
    args: Prisma.PublicationsOnCommunityFindManyArgs
  ): Promise<PublicationsOnCommunity[]> {
    return this.prisma.publication
      .findUnique({
        where: { id: parentId },
      })
      .publicationsOnCommunities(args);
  }

  async findSocialinterractions(
    parentId: string,
    args: Prisma.SocialinterractionFindManyArgs
  ): Promise<Socialinterraction[]> {
    return this.prisma.publication
      .findUnique({
        where: { id: parentId },
      })
      .socialinterractions(args);
  }

  async getEvent(parentId: string): Promise<Event | null> {
    return this.prisma.publication
      .findUnique({
        where: { id: parentId },
      })
      .event();
  }

  async getPost(parentId: string): Promise<Post | null> {
    return this.prisma.publication
      .findUnique({
        where: { id: parentId },
      })
      .post();
  }

  async getOffer(parentId: string): Promise<Offer | null> {
    return this.prisma.publication
      .findUnique({
        where: { id: parentId },
      })
      .offer();
  }

  async getStory(parentId: string): Promise<Story | null> {
    return this.prisma.publication
      .findUnique({
        where: { id: parentId },
      })
      .story();
  }

  async getVideo(parentId: string): Promise<Video | null> {
    return this.prisma.publication
      .findUnique({
        where: { id: parentId },
      })
      .video();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.publication
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}