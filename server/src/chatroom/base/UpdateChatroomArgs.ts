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
import { ChatroomWhereUniqueInput } from "./ChatroomWhereUniqueInput";
import { ChatroomUpdateInput } from "./ChatroomUpdateInput";

@ArgsType()
class UpdateChatroomArgs {
  @Field(() => ChatroomWhereUniqueInput, { nullable: false })
  where!: ChatroomWhereUniqueInput;
  @Field(() => ChatroomUpdateInput, { nullable: false })
  data!: ChatroomUpdateInput;
}

export { UpdateChatroomArgs };