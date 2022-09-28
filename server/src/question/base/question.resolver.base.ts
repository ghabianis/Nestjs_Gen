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
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { CreateQuestionArgs } from "./CreateQuestionArgs";
import { UpdateQuestionArgs } from "./UpdateQuestionArgs";
import { DeleteQuestionArgs } from "./DeleteQuestionArgs";
import { QuestionFindManyArgs } from "./QuestionFindManyArgs";
import { QuestionFindUniqueArgs } from "./QuestionFindUniqueArgs";
import { Question } from "./Question";
import { QuestionType } from "../../questionType/base/QuestionType";
import { Offer } from "../../offer/base/Offer";
import { Video } from "../../video/base/Video";
import { QuestionService } from "../question.service";

@graphql.Resolver(() => Question)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class QuestionResolverBase {
  constructor(
    protected readonly service: QuestionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "read",
    possession: "any",
  })
  async _questionsMeta(
    @graphql.Args() args: QuestionFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Question])
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "read",
    possession: "any",
  })
  async questions(
    @graphql.Args() args: QuestionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<Question>> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Question",
    });
    const results = await this.service.findMany(args);
    const result = results.paginatedResult.map((result: Question) =>
      permission.filter(result)
    );
    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @graphql.Query(() => Question, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "read",
    possession: "own",
  })
  async question(
    @graphql.Args() args: QuestionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Question | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Question",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Question)
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "create",
    possession: "any",
  })
  async createQuestion(
    @graphql.Args() args: CreateQuestionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Question> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Question",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Question"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        questionType: args.data.questionType
          ? {
              connect: args.data.questionType,
            }
          : undefined,

        offer: args.data.offer
          ? {
              connect: args.data.offer,
            }
          : undefined,

        video: args.data.video
          ? {
              connect: args.data.video,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Question)
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "update",
    possession: "any",
  })
  async updateQuestion(
    @graphql.Args() args: UpdateQuestionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Question | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Question",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Question"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          questionType: args.data.questionType
            ? {
                connect: args.data.questionType,
              }
            : undefined,

          offer: args.data.offer
            ? {
                connect: args.data.offer,
              }
            : undefined,

          video: args.data.video
            ? {
                connect: args.data.video,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Question)
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "delete",
    possession: "any",
  })
  async deleteQuestion(
    @graphql.Args() args: DeleteQuestionArgs
  ): Promise<Question | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => QuestionType, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "read",
    possession: "any",
  })
  async questionType(
    @graphql.Parent() parent: Question,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<QuestionType | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "QuestionType",
    });
    const result = await this.service.getQuestionType(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Offer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "read",
    possession: "any",
  })
  async offer(
    @graphql.Parent() parent: Question,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Offer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Offer",
    });
    const result = await this.service.getOffer(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Video, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Question",
    action: "read",
    possession: "any",
  })
  async video(
    @graphql.Parent() parent: Question,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Video | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Video",
    });
    const result = await this.service.getVideo(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
