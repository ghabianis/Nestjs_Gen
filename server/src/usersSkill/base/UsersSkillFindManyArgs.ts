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
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UsersSkillWhereInput } from "./UsersSkillWhereInput";
import { Type } from "class-transformer";
import { UsersSkillOrderByInput } from "./UsersSkillOrderByInput";

@ArgsType()
class UsersSkillFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => UsersSkillWhereInput,
  })
  @Field(() => UsersSkillWhereInput, { nullable: true })
  @Type(() => UsersSkillWhereInput)
  where?: UsersSkillWhereInput;

  @ApiProperty({
    required: false,
    type: UsersSkillOrderByInput,
  })
  @Field(() => UsersSkillOrderByInput, { nullable: true })
  @Type(() => UsersSkillOrderByInput)
  orderBy?: UsersSkillOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { UsersSkillFindManyArgs };
