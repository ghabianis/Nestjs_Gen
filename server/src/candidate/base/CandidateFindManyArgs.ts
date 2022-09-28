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
import { CandidateWhereInput } from "./CandidateWhereInput";
import { Type } from "class-transformer";
import { CandidateOrderByInput } from "./CandidateOrderByInput";

@ArgsType()
class CandidateFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CandidateWhereInput,
  })
  @Field(() => CandidateWhereInput, { nullable: true })
  @Type(() => CandidateWhereInput)
  where?: CandidateWhereInput;

  @ApiProperty({
    required: false,
    type: CandidateOrderByInput,
  })
  @Field(() => CandidateOrderByInput, { nullable: true })
  @Type(() => CandidateOrderByInput)
  orderBy?: CandidateOrderByInput;

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

export { CandidateFindManyArgs };
