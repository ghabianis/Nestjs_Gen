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
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsDate,
  IsOptional,
  IsInt,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Job } from "../../job/base/Job";
import { Chat } from "../../chat/base/Chat";
import { ContractsOnCandidate } from "../../contractsOnCandidate/base/ContractsOnCandidate";
import { CandidatesOnChatroom } from "../../candidatesOnChatroom/base/CandidatesOnChatroom";
import { FollowEntreprise } from "../../followEntreprise/base/FollowEntreprise";
import { Experience } from "../../experience/base/Experience";
import { Course } from "../../course/base/Course";
import { User } from "../../user/base/User";
@ObjectType()
class Candidate {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  @IsOptional()
  updatedAt?: Date | null;



  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  activityField!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  wantedPost!: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  experiencesYears!: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  languages!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  tags!: string | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  maxSalary!: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  minSalary!: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  personalCv!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  mediaLink!: string | null;

  @ApiProperty({
    required: false,
    type: () => Job,
  })
  @ValidateNested()
  @Type(() => Job)
  @IsOptional()
  job?: Job | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  userId!: string | null;

  @ApiProperty({
    required: false,
    type: () => [Chat],
  })
  @ValidateNested()
  @Type(() => Chat)
  @IsOptional()
  chats?: Array<Chat>;

  @ApiProperty({
    required: false,
    type: () => [ContractsOnCandidate],
  })
  @ValidateNested()
  @Type(() => ContractsOnCandidate)
  @IsOptional()
  contractsOnCandidates?: Array<ContractsOnCandidate>;

  @ApiProperty({
    required: false,
    type: () => [CandidatesOnChatroom],
  })
  @ValidateNested()
  @Type(() => CandidatesOnChatroom)
  @IsOptional()
  candidatesOnChatrooms?: Array<CandidatesOnChatroom>;

  @ApiProperty({
    required: false,
    type: () => [FollowEntreprise],
  })
  @ValidateNested()
  @Type(() => FollowEntreprise)
  @IsOptional()
  followEntreprises?: Array<FollowEntreprise>;

  @ApiProperty({
    required: false,
    type: () => [Experience],
  })
  @ValidateNested()
  @Type(() => Experience)
  @IsOptional()
  experiences?: Array<Experience>;

  @ApiProperty({
    required: false,
    type: () => [Course],
  })
  @ValidateNested()
  @Type(() => Course)
  @IsOptional()
  courses?: Array<Course>;

  @ApiProperty({
    required: true,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  user?: User;
}
export { Candidate };
