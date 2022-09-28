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
import { CategoryWhereUniqueInput } from "../../category/base/CategoryWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { PublicationWhereUniqueInput } from "../../publication/base/PublicationWhereUniqueInput";
import { EntrepriseWhereUniqueInput } from "../../entreprise/base/EntrepriseWhereUniqueInput";
import { PublicationCreateInput } from "src/publication/base/PublicationCreateInput";
@InputType()
class VideoCreateInput {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @Type(() => String)
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;

  @ApiProperty({
    required: false,
    type: () => CategoryWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CategoryWhereUniqueInput)
  @IsOptional()
  @Field(() => CategoryWhereUniqueInput, {
    nullable: true,
  })
  category?: CategoryWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => PublicationCreateInput,
  })
  @ValidateNested()
  @Type(() => PublicationCreateInput)
  @Field(() => PublicationCreateInput, {nullable:true})
  publication?: PublicationCreateInput | null;

  @ApiProperty({
    required: false,
    type: () => EntrepriseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => EntrepriseWhereUniqueInput)
  @IsOptional()
  @Field(() => EntrepriseWhereUniqueInput, {
    nullable: true,
  })
  entreprise?: EntrepriseWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @Type(() => String)
  @IsString()
  url?: string ;

}
export { VideoCreateInput };