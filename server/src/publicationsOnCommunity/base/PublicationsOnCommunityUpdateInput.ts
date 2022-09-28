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
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PublicationWhereUniqueInput } from "../../publication/base/PublicationWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { CommunityWhereUniqueInput } from "../../community/base/CommunityWhereUniqueInput";
@InputType()
class PublicationsOnCommunityUpdateInput {
  @ApiProperty({
    required: false,
    type: () => PublicationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PublicationWhereUniqueInput)
  @IsOptional()
  @Field(() => PublicationWhereUniqueInput, {
    nullable: true,
  })
  publication?: PublicationWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => CommunityWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CommunityWhereUniqueInput)
  @IsOptional()
  @Field(() => CommunityWhereUniqueInput, {
    nullable: true,
  })
  community?: CommunityWhereUniqueInput | null;
}
export { PublicationsOnCommunityUpdateInput };
