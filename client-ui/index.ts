/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface StringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: "Default" | "Insensitive";
  not?: string;
}

export interface StringNullableFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: "Default" | "Insensitive";
  not?: string;
}

export interface CandidateWhereUniqueInput {
  id: string;
}

export interface RecruiterWhereUniqueInput {
  id: string;
}

export interface UserWhereInput {
  id?: StringFilter;
  firstName?: StringNullableFilter;
  lastName?: StringNullableFilter;
  username?: StringFilter;
  candidate?: CandidateWhereUniqueInput;
  recruiter?: RecruiterWhereUniqueInput;
  email?: StringNullableFilter;
  phone?: StringNullableFilter;
  address?: StringNullableFilter;
}

export interface UserListOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  firstName?: "Asc" | "Desc";
  lastName?: "Asc" | "Desc";
  username?: "Asc" | "Desc";
  password?: "Asc" | "Desc";
  roles?: "Asc" | "Desc";
  candidateId?: "Asc" | "Desc";
  recruiterId?: "Asc" | "Desc";
  email?: "Asc" | "Desc";
  phone?: "Asc" | "Desc";
  address?: "Asc" | "Desc";
  photo?: "Asc" | "Desc";
  wantedPost?: "Asc" | "Desc";
  personalCv?: "Asc" | "Desc";
  mediaLink?: "Asc" | "Desc";
  tags?: "Asc" | "Desc";
  like?: "Asc" | "Desc";
  share?: "Asc" | "Desc";
  view?: "Asc" | "Desc";
  comment?: "Asc" | "Desc";
  total_interactions?: "Asc" | "Desc";
}

export interface UserListDTO {
  userId?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  photo?: string;
  wantedPost?: string;
  tags?: string;
  personalCv?: string;
  mediaLink?: string;
}

export interface Job {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  name?: string;
  candidates?: Candidate[];
}

export interface Comment {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  content?: string;
  user?: User;
}

export interface QuestionType {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  label?: string;
  questions?: Question[];
}

export interface Category {
  label?: string;
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  videos?: Video[];
}

export interface OffersOnCommunity {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  offer?: Offer;
  community?: Community;
}

export interface UsersOnCommunity {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  community?: Community;
  user?: User;
}

export interface EntreprisesOnCommunity {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  entreprise?: Entreprise;
  community?: Community;
}

export interface Community {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  name: string;
  activityField?: string;
  offersOnCommunities?: OffersOnCommunity[];
  publicationsOnCommunities?: PublicationsOnCommunity[];
  usersOnCommunities?: UsersOnCommunity[];
  entreprisesOnCommunities?: EntreprisesOnCommunity[];
}

export interface PublicationsOnCommunity {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  publication?: Publication;
  community?: Community;
}

export interface Event {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  deletedAt?: object;
  location?: string;
  file?: string;
  link?: string;
  startDate?: object;
  endDate?: object;
  speakers?: string;
  publication: Publication;
  eventMode?: string;
}

export interface Post {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  image?: string;
  publication: Publication;
  entreprise?: Entreprise;
}

export interface Story {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  mediaLink?: string;
  publication: Publication;
}

export interface Socialinterraction {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt?: object;
  type?: string;
  publication?: Publication;
  user?: User;
}

export interface Publication {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  type: "story" | "event" | "offer" | "video" | "post";
  title?: string;
  description?: string;
  publicationsOnCommunities?: PublicationsOnCommunity[];
  event?: Event;
  post?: Post;
  offer?: Offer;
  story?: Story;
  video?: Video;
  socialinterractions?: Socialinterraction[];
  user?: User;
}

export interface Video {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  questions?: Question[];
  category?: Category;
  publication: Publication;
  entreprise?: Entreprise;
  url?: string;
  deletedAt?: object;
}

export interface Question {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  title?: string;
  description?: string;
  questionType?: QuestionType;
  offer?: Offer;
  video?: Video;
}

export interface ContractsOnCandidate {
  candidate?: Candidate;
  contract?: Contract;

  /** @format date-time */
  createdAt: string;
  id: string;
  updatedAt?: object;
}

export interface Contract {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  name?: string;
  contractsOnCandidates?: ContractsOnCandidate[];
  offers?: Offer[];
}

export interface Offer {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  place?: string;
  renumeration?: string;
  offerType?: string;
  experienceLevel?: string;
  maxExperience?: number;
  candidateMaxNumber?: object;
  questions?: Question[];
  feedbacks?: Feedback[];
  offersOnCommunities?: OffersOnCommunity[];
  publication: Publication;
  contract?: Contract;
  isActive?: boolean;
  deletedAt?: object;
  offerMode?: object;
}

export interface Feedback {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  contenu?: string;
  statue?: string;
  type?: string;
  offer?: Offer;
  user?: User;
}

export interface UsersOnEntreprise {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  entreprise?: Entreprise;
  user?: User;
}

export interface Skill {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  name?: string;
  usersSkills?: UsersSkill[];
}

export interface UsersSkill {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  skill?: Skill;
  user?: User;
}

export interface User {
  id?: string;

  /** @format date-time */
  createdAt?: string;
  updatedAt?: object;
  firstName?: string;
  lastName?: string;
  username?: string;
  candidateId?: string;
  roles?: string[];
  candidate?: Candidate;
  recruiter?: Recruiter;
  comments?: Comment[];
  feedbacks?: Feedback[];
  publications?: Publication[];
  socialinterractions?: Socialinterraction[];
  usersOnCommunities?: UsersOnCommunity[];
  usersOnEntreprises?: UsersOnEntreprise[];
  usersSkills?: UsersSkill[];
  email?: string;
  phone?: string;
  address?: string;
  sex: "Homme" | "Femme";
  city?: string;
  kmRadius?: string;
}

export interface Recruiter {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  entreprise?: Entreprise;
  user: User;
}

export interface CandidatesOnChatroom {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  chatroom?: Chatroom;
  candidate?: Candidate;
}

export interface Chatroom {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  title?: string;
  startDateTime?: object;
  endDateTime?: object;
  entreprise?: Entreprise;
  candidatesOnChatrooms?: CandidatesOnChatroom[];
}

export interface FollowEntreprise {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  entreprise?: Entreprise;
  candidate?: Candidate;
}

export interface Survey {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  title?: string;
  content?: string;
  entreprise?: Entreprise;
}

export interface Entreprise {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  name?: string;
  owner?: string;
  presentationContent?: string;
  presentationVideolink?: string;
  websiteLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  departement?: string;
  workersNumber?: number;
  email?: string;
  image?: string;
  coverImage?: string;
  recruiters?: Recruiter[];
  chatrooms?: Chatroom[];
  chats?: Chat[];
  followEntreprises?: FollowEntreprise[];
  surveys?: Survey[];
  posts?: Post[];
  videos?: Video[];
  usersOnEntreprises?: UsersOnEntreprise[];
  entreprisesOnCommunities?: EntreprisesOnCommunity[];
}

export interface Message {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  contenu?: string;
  chat?: Chat;
}

export interface Chat {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  candidate?: Candidate;
  entreprise?: Entreprise;
  messages?: Message[];
}

export interface Experience {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  occupiedPosition?: string;
  companyName?: string;
  startDate?: object;
  endDate?: object;
  isWorking?: boolean;
  country?: string;
  description?: string;
  candidate?: Candidate;
}

export interface Course {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt: object;
  title?: string;
  centerName?: string;
  startDate?: object;
  endDate?: object;
  isForming?: boolean;
  country?: string;
  description?: string;
  candidate?: Candidate;
}

export interface Candidate {
  id: string;

  /** @format date-time */
  createdAt: string;
  updatedAt?: object;
  activityField?: string;
  wantedPost?: string;
  experiencesYears?: number;
  languages?: string;
  tags?: string;
  maxSalary?: number;
  minSalary?: number;
  personalCv?: string;
  mediaLink?: string;
  job?: Job;
  userId?: string;
  chats?: Chat[];
  contractsOnCandidates?: ContractsOnCandidate[];
  candidatesOnChatrooms?: CandidatesOnChatroom[];
  followEntreprises?: FollowEntreprise[];
  experiences?: Experience[];
  courses?: Course[];
  user: User;
}

export interface ForbiddenException {
  statusCode: number;
  message: string;
}

export interface NotFoundException {
  statusCode: number;
  message: string;
}

export interface UserWhereUniqueInput {
  id: string;
  candidateId?: string;
}

export interface EventWhereUniqueInput {
  id: string;
}

export interface PostWhereUniqueInput {
  id: string;
}

export interface OfferWhereUniqueInput {
  id: string;
}

export interface StoryWhereUniqueInput {
  id: string;
}

export interface VideoWhereUniqueInput {
  id: string;
}

export interface PublicationWhereUniqueInput {
  id: string;
}

export interface CommunityWhereUniqueInput {
  id: string;
}

export interface EntrepriseWhereUniqueInput {
  id: string;
}

export interface SkillWhereUniqueInput {
  id: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  role: string;
  phone?: string;
}

export interface EmailResetPasswordCredential {
  email: string;
}

export interface ResetPasswordCredential {
  access_token: string;
  password: string;
}

export interface JobWhereUniqueInput {
  id: string;
}

export interface UserCreateInput {
  id?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  roles: string[];
  candidate?: CandidateWhereUniqueInput;
  email?: string;
  phone?: string;
  address?: string;
  sex: "Homme" | "Femme";
  city?: string;
  kmRadius?: string;
  photo?: string;
}

export interface CandidateCreateInput {
  activityField?: string;
  wantedPost?: string;
  experiencesYears?: number;
  candidateLanguage?: string[];
  candidateCommunities?: string[];
  tags?: string;
  maxSalary?: number;
  minSalary?: number;
  contractsOnCandidates?: string[];
  personalCv?: string;
  mediaLink?: string;
  job?: JobWhereUniqueInput;
  user: UserCreateInput;
}

export interface IntNullableFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number;
}

export interface FloatNullableFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number;
}

export interface CandidateWhereInput {
  id?: StringFilter;
  activityField?: StringNullableFilter;
  wantedPost?: StringNullableFilter;
  experiencesYears?: IntNullableFilter;
  languages?: StringNullableFilter;
  tags?: StringNullableFilter;
  maxSalary?: FloatNullableFilter;
  minSalary?: FloatNullableFilter;
  personalCv?: StringNullableFilter;
  mediaLink?: StringNullableFilter;
  job?: JobWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface CandidateOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  activityField?: "Asc" | "Desc";
  wantedPost?: "Asc" | "Desc";
  experiencesYears?: "Asc" | "Desc";
  languages?: "Asc" | "Desc";
  tags?: "Asc" | "Desc";
  maxSalary?: "Asc" | "Desc";
  minSalary?: "Asc" | "Desc";
  personalCv?: "Asc" | "Desc";
  mediaLink?: "Asc" | "Desc";
  jobId?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListCandidateDto {
  paginatedResult: Candidate[];
  totalCount: number;
}

export interface CourseCreateInput {
  title?: string;
  centerName?: string;
  startDate?: object;
  endDate?: object;
  isForming?: boolean;
  country?: string;
  description?: string;
  candidate?: CandidateWhereUniqueInput;
}

export interface ExperienceCreateInput {
  occupiedPosition?: string;
  companyName?: string;
  startDate?: object;
  endDate?: object;
  isWorking?: boolean;
  country?: string;
  description?: string;
  candidate?: CandidateWhereUniqueInput;
}

export interface CandidateUpdateInput {
  activityField?: string;
  job?: JobWhereUniqueInput;
  wantedPost?: string;
  experiencesYears?: number;
  languages?: string;
  tags?: string;
  maxSalary?: number;
  minSalary?: number;
  personalCv?: string;
  mediaLink?: string;
  user?: UserUpdateInput;
  courses?: CourseCreateInput[];
  experiences?: ExperienceCreateInput[];
}

export interface RecruiterUpdateInput {
  entreprise?: EntrepriseWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface JobUpdateInput {
  name?: string;
}

export interface UserUpdateInput {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  roles?: string[];
  email: string;
  phone?: string;
  address?: string;
  sex: "Homme" | "Femme";
  city?: string;
  kmRadius?: string;
  candidate?: CandidateUpdateInput;
  recruiter?: RecruiterUpdateInput;
  job?: JobUpdateInput;
}

export interface ContractWhereUniqueInput {
  id: string;
}

export interface ChatroomWhereUniqueInput {
  id: string;
}

export interface DateTimeNullableFilter {
  /** @format date-time */
  equals?: string;
  in?: string[];
  notIn?: string[];

  /** @format date-time */
  lt?: string;

  /** @format date-time */
  lte?: string;

  /** @format date-time */
  gt?: string;

  /** @format date-time */
  gte?: string;

  /** @format date-time */
  not?: string;
}

export interface BooleanNullableFilter {
  equals?: boolean;
  not?: boolean;
}

export interface RecruiterCreateInput {
  entreprise?: EntrepriseWhereUniqueInput;
  user: UserWhereUniqueInput;
}

export interface RecruiterWhereInput {
  id?: StringFilter;
  entreprise?: EntrepriseWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface RecruiterOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListRecruiterDto {
  paginatedResult: Recruiter[];
  totalCount: number;
}

export interface EntrepriseCreateInput {
  name?: string;
  owner?: string;
  presentationContent?: string;
  presentationVideolink?: string;
  websiteLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  departement?: string;
  workersNumber?: number;
  email?: string;
  image?: string;
  coverImage?: string;
}

export interface EntrepriseWhereInput {
  id?: StringFilter;
  name?: StringNullableFilter;
  owner?: StringNullableFilter;
  presentationContent?: StringNullableFilter;
  presentationVideolink?: StringNullableFilter;
  websiteLink?: StringNullableFilter;
  linkedinLink?: StringNullableFilter;
  instagramLink?: StringNullableFilter;
  departement?: StringNullableFilter;
  workersNumber?: IntNullableFilter;
}

export interface EntrepriseOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  name?: "Asc" | "Desc";
  owner?: "Asc" | "Desc";
  presentationContent?: "Asc" | "Desc";
  presentationVideolink?: "Asc" | "Desc";
  websiteLink?: "Asc" | "Desc";
  linkedinLink?: "Asc" | "Desc";
  instagramLink?: "Asc" | "Desc";
  departement?: "Asc" | "Desc";
  workersNumber?: "Asc" | "Desc";
}

export interface GetListEntrepriseDto {
  paginatedResult: Entreprise[];
  totalCount: number;
}

export interface EntrepriseUpdateInput {
  name?: string;
  owner?: string;
  presentationContent?: string;
  presentationVideolink?: string;
  websiteLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  departement?: string;
  workersNumber?: number;
  email?: string;
  image?: string;
  coverImage?: string;
}

export interface CategoryWhereUniqueInput {
  id: string;
}

export interface ChatroomCreateInput {
  title?: string;
  startDateTime?: object;
  endDateTime?: object;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface ChatroomWhereInput {
  id?: StringFilter;
  title?: StringNullableFilter;
  startDateTime?: DateTimeNullableFilter;
  endDateTime?: DateTimeNullableFilter;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface ChatroomOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  title?: "Asc" | "Desc";
  startDateTime?: "Asc" | "Desc";
  endDateTime?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
}

export interface GetListChatroomDto {
  paginatedResult: Chatroom[];
  totalCount: number;
}

export interface ChatroomUpdateInput {
  title?: string;
  startDateTime?: object;
  endDateTime?: object;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface ChatCreateInput {
  candidate?: CandidateWhereUniqueInput;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface ChatWhereInput {
  id?: StringFilter;
  candidate?: CandidateWhereUniqueInput;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface ChatOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  candidateId?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
}

export interface GetListChatDto {
  paginatedResult: Chat[];
  totalCount: number;
}

export interface ChatUpdateInput {
  candidate?: CandidateWhereUniqueInput;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface ChatWhereUniqueInput {
  id: string;
}

export interface MessageCreateInput {
  contenu?: string;
  chat?: ChatWhereUniqueInput;
}

export interface MessageWhereInput {
  id?: StringFilter;
  contenu?: StringNullableFilter;
  chat?: ChatWhereUniqueInput;
}

export interface MessageOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  contenu?: "Asc" | "Desc";
  chatId?: "Asc" | "Desc";
}

export interface GetListMessageDto {
  paginatedResult: Message[];
  totalCount: number;
}

export interface MessageUpdateInput {
  contenu?: string;
  chat?: ChatWhereUniqueInput;
}

export interface CandidatesOnChatroomCreateInput {
  chatroom?: ChatroomWhereUniqueInput;
  candidate?: CandidateWhereUniqueInput;
}

export interface CandidatesOnChatroomWhereInput {
  id?: StringFilter;
  chatroom?: ChatroomWhereUniqueInput;
  candidate?: CandidateWhereUniqueInput;
}

export interface CandidatesOnChatroomOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  chatroomId?: "Asc" | "Desc";
  candidateId?: "Asc" | "Desc";
}

export interface GetListCandidatesOnChatroomDto {
  paginatedResult: CandidatesOnChatroom[];
  totalCount: number;
}

export interface CandidatesOnChatroomUpdateInput {
  chatroom?: ChatroomWhereUniqueInput;
  candidate?: CandidateWhereUniqueInput;
}

export interface FeedbackWhereInput {
  id?: StringFilter;
  contenu?: StringNullableFilter;
  statue?: StringNullableFilter;
  type?: StringNullableFilter;
  offerid?: string;
  user?: UserWhereUniqueInput;
}

export interface FeedbackOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  contenu?: "Asc" | "Desc";
  statue?: "Asc" | "Desc";
  type?: "Asc" | "Desc";
  offerId?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListFeedbackDto {
  paginatedResult: Feedback[];
  totalCount: number;
}

export interface FollowEntrepriseCreateInput {
  entreprise?: EntrepriseWhereUniqueInput;
  candidate?: CandidateWhereUniqueInput;
}

export interface FollowEntrepriseWhereInput {
  id?: StringFilter;
  entreprise?: EntrepriseWhereUniqueInput;
  candidate?: CandidateWhereUniqueInput;
}

export interface FollowEntrepriseOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
  candidateId?: "Asc" | "Desc";
}

export interface GetListFollowEntrepriseDto {
  paginatedResult: FollowEntreprise[];
  totalCount: number;
}

export interface FollowEntrepriseUpdateInput {
  entreprise?: EntrepriseWhereUniqueInput;
  candidate?: CandidateWhereUniqueInput;
}

export interface SurveyCreateInput {
  title?: string;
  content?: string;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface SurveyWhereInput {
  id?: StringFilter;
  title?: StringNullableFilter;
  content?: StringNullableFilter;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface SurveyOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  title?: "Asc" | "Desc";
  content?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
}

export interface GetListSurveyDto {
  paginatedResult: Survey[];
  totalCount: number;
}

export interface SurveyUpdateInput {
  title?: string;
  content?: string;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface ExperienceWhereInput {
  id?: StringFilter;
  occupiedPosition?: StringNullableFilter;
  companyName?: StringNullableFilter;
  startDate?: DateTimeNullableFilter;
  endDate?: DateTimeNullableFilter;
  isWorking?: BooleanNullableFilter;
  country?: StringNullableFilter;
  description?: StringNullableFilter;
  candidate?: CandidateWhereUniqueInput;
}

export interface ExperienceOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  occupiedPosition?: "Asc" | "Desc";
  companyName?: "Asc" | "Desc";
  startDate?: "Asc" | "Desc";
  endDate?: "Asc" | "Desc";
  isWorking?: "Asc" | "Desc";
  country?: "Asc" | "Desc";
  description?: "Asc" | "Desc";
  candidateId?: "Asc" | "Desc";
}

export interface GetListExperienceDto {
  paginatedResult: Experience[];
  totalCount: number;
}

export interface ExperienceUpdateInput {
  occupiedPosition?: string;
  companyName?: string;
  startDate?: object;
  endDate?: object;
  isWorking?: boolean;
  country?: string;
  description?: string;
  candidate?: CandidateWhereUniqueInput;
}

export interface CourseWhereInput {
  id?: StringFilter;
  title?: StringNullableFilter;
  centerName?: StringNullableFilter;
  startDate?: DateTimeNullableFilter;
  endDate?: DateTimeNullableFilter;
  isForming?: BooleanNullableFilter;
  country?: StringNullableFilter;
  description?: StringNullableFilter;
  candidate?: CandidateWhereUniqueInput;
}

export interface CourseOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  title?: "Asc" | "Desc";
  centerName?: "Asc" | "Desc";
  startDate?: "Asc" | "Desc";
  endDate?: "Asc" | "Desc";
  isForming?: "Asc" | "Desc";
  country?: "Asc" | "Desc";
  description?: "Asc" | "Desc";
  candidateId?: "Asc" | "Desc";
}

export interface GetListCourseDto {
  paginatedResult: Course[];
  totalCount: number;
}

export interface CourseUpdateInput {
  title?: string;
  centerName?: string;
  startDate?: object;
  endDate?: object;
  isForming?: boolean;
  country?: string;
  description?: string;
  candidate?: CandidateWhereUniqueInput;
}

export interface ContractCreateInput {
  name?: string;
}

export interface ContractWhereInput {
  id?: StringFilter;
  name?: StringNullableFilter;
}

export interface ContractOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  name?: "Asc" | "Desc";
}

export interface GetListContractDto {
  paginatedResult: Contract[];
  totalCount: number;
}

export interface ContractUpdateInput {
  name?: string;
}

export interface BooleanFilter {
  equals?: boolean;
  not?: boolean;
}

export interface SkillCreateInput {
  name?: string;
}

export interface SkillWhereInput {
  id?: StringFilter;
  name?: StringNullableFilter;
}

export interface SkillOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  name?: "Asc" | "Desc";
}

export interface GetListSkillDto {
  paginatedResult: Skill[];
  totalCount: number;
}

export interface SkillUpdateInput {
  name?: string;
}

export interface QuestionTypeWhereUniqueInput {
  id: string;
}

export interface QuestionCreateInput {
  title?: string;
  description?: string;
  questionType?: QuestionTypeWhereUniqueInput;
  offer?: OfferWhereUniqueInput;
  video?: VideoCreateInput;
}

export interface OfferCreateInput {
  place?: string;
  renumeration?: string;
  offerType?: string;
  experienceLevel?: string;
  maxExperience?: number;
  candidateMaxNumber?: object;
  publication: PublicationWhereUniqueInput;
  contract?: ContractWhereUniqueInput;
  isActive?: boolean;
  offersOnCommunities?: string[];
  questions?: QuestionCreateInput[];
  offerMode?: object;
}

export interface StoryCreateInput {
  mediaLink?: string;
  publication: PublicationWhereUniqueInput;
}

export interface PublicationCreateInput {
  type: "story" | "event" | "offer" | "video" | "post";
  title?: string;
  description?: string;
  event?: EventWhereUniqueInput;
  post?: PostWhereUniqueInput;
  offer?: OfferCreateInput;
  story?: StoryCreateInput;
  video?: VideoWhereUniqueInput;
  user?: UserWhereUniqueInput;
  publicationsOnCommunities?: string[];
}

export interface VideoCreateInput {
  id?: string;
  category?: CategoryWhereUniqueInput;
  publication?: PublicationCreateInput;
  entreprise?: EntrepriseWhereUniqueInput;
  url?: string;
}

export interface QuestionWhereInput {
  id?: StringFilter;
  title?: StringNullableFilter;
  description?: StringNullableFilter;
  questionType?: QuestionTypeWhereUniqueInput;
  offer?: OfferWhereUniqueInput;
  video?: VideoWhereUniqueInput;
}

export interface QuestionOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  title?: "Asc" | "Desc";
  description?: "Asc" | "Desc";
  questionTypeId?: "Asc" | "Desc";
  offerId?: "Asc" | "Desc";
  videoId?: "Asc" | "Desc";
}

export interface GetListQuestionDto {
  paginatedResult: Question[];
  totalCount: number;
}

export interface QuestionUpdateInput {
  id?: string;
  title?: string;
  description?: string;
  questionType?: QuestionTypeWhereUniqueInput;
  offer?: OfferWhereUniqueInput;
  video?: VideoUpdateInput;
}

export interface OfferUpdateInput {
  id?: string;
  place?: string;
  renumeration?: string;
  offerType?: string;
  experienceLevel?: string;
  maxExperience?: number;
  candidateMaxNumber?: object;
  publication?: PublicationWhereUniqueInput;
  contract?: ContractWhereUniqueInput;
  isActive?: boolean;
  offersOnCommunities?: string[];
  questions?: QuestionUpdateInput[];
  offerMode?: object;
}

export interface StoryUpdateInput {
  id?: string;
  mediaLink?: string;
  publication?: PublicationWhereUniqueInput;
}

export interface PublicationUpdateInput {
  id?: string;
  type: "story" | "event" | "offer" | "video" | "post";
  title?: string;
  description?: string;
  event?: EventWhereUniqueInput;
  post?: PostWhereUniqueInput;
  offer?: OfferUpdateInput;
  story?: StoryUpdateInput;
  video?: VideoWhereUniqueInput;
  user?: UserWhereUniqueInput;
  publicationsOnCommunities?: string[];

  /** @format date-time */
  deletedAt?: string;
}

export interface VideoUpdateInput {
  id?: string;
  category?: CategoryWhereUniqueInput;
  publication?: PublicationUpdateInput;
  entreprise?: EntrepriseWhereUniqueInput;
  url?: string;
}

export interface QuestionTypeCreateInput {
  label?: string;
}

export interface QuestionTypeWhereInput {
  id?: StringFilter;
  label?: StringNullableFilter;
}

export interface QuestionTypeOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  label?: "Asc" | "Desc";
}

export interface GetListQuestionTypeDto {
  paginatedResult: QuestionType[];
  totalCount: number;
}

export interface QuestionTypeUpdateInput {
  label?: string;
}

export interface FeedbackCreateInput {
  contenu?: string;
  statue?: string;
  type?: string;
  offer?: OfferWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface FeedbackUpdateInput {
  contenu?: string;
  statue?: string;
  type?: string;
  offer?: OfferWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface CommentCreateInput {
  content?: string;
  user?: UserWhereUniqueInput;
}

export interface CommentWhereInput {
  id?: StringFilter;
  content?: StringNullableFilter;
  user?: UserWhereUniqueInput;
}

export interface CommentOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  content?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListCommentDto {
  paginatedResult: Comment[];
  totalCount: number;
}

export interface CommentUpdateInput {
  content?: string;
  user?: UserWhereUniqueInput;
}

export interface CommunityPostsWhereUniqueInput {
  communityId: string;
}

export interface CommunityPosts {
  id: string;

  /** @format date-time */
  createdAt: string;
  deletedAt?: object;
  username: string;
  title?: string;
  communityName?: string;
  entrepriseName?: string;
  candidatName?: string;
  description?: string;
  likes: number;
  shares: number;
  comments: number;
  views: number;
  followers: number;
  isLike: number;
  publicationId?: string;
  userId?: string;
  entrepriseId?: string;
  candidateId?: string;
  communityId?: string;
}

export interface ListCommunityPosts {
  paginatedResult: CommunityPosts[];
  totalCount: number;
}

export interface CommunityCreateInput {
  name: string;
  activityField?: string;
}

export interface CommunityWhereInput {
  id?: StringFilter;
  name?: StringFilter;
  activityField?: StringNullableFilter;
}

export interface CommunityOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  name?: "Asc" | "Desc";
  activityField?: "Asc" | "Desc";
}

export interface GetListCommunityDto {
  paginatedResult: Community[];
  totalCount: number;
}

export interface CommunityUpdateInput {
  name?: string;
  activityField?: string;
}

export interface OffersOnCommunityCreateInput {
  offer?: OfferWhereUniqueInput;
  community?: CommunityWhereUniqueInput;
}

export interface OffersOnCommunityWhereInput {
  id?: StringFilter;
  offer?: OfferWhereUniqueInput;
  community?: CommunityWhereUniqueInput;
}

export interface OffersOnCommunityOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  offerId?: "Asc" | "Desc";
  communityId?: "Asc" | "Desc";
}

export interface GetListOffersOnCommunityDto {
  paginatedResult: OffersOnCommunity[];
  totalCount: number;
}

export interface OffersOnCommunityUpdateInput {
  offer?: OfferWhereUniqueInput;
  community?: CommunityWhereUniqueInput;

  /** @format date-time */
  deletedAt?: string;
}

export interface PublicationWhereInput {
  id?: StringFilter;
  title?: StringNullableFilter;
  description?: StringNullableFilter;
  event?: EventWhereUniqueInput;
  post?: PostWhereUniqueInput;
  offer?: OfferWhereUniqueInput;
  story?: StoryWhereUniqueInput;
  video?: VideoWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface PublicationOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  type?: "Asc" | "Desc";
  title?: "Asc" | "Desc";
  description?: "Asc" | "Desc";
  eventId?: "Asc" | "Desc";
  postId?: "Asc" | "Desc";
  offerId?: "Asc" | "Desc";
  storyId?: "Asc" | "Desc";
  videoId?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListPublicationDto {
  paginatedResult: Publication[];
  totalCount: number;
}

export interface PublicationsOnCommunityCreateInput {
  publication?: PublicationWhereUniqueInput;
  community?: CommunityWhereUniqueInput;
}

export interface PublicationsOnCommunityWhereInput {
  id?: StringFilter;
  publication?: PublicationWhereUniqueInput;
  community?: CommunityWhereUniqueInput;
}

export interface PublicationsOnCommunityOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  publicationId?: "Asc" | "Desc";
  communityId?: "Asc" | "Desc";
}

export interface GetListPublicationsOnCommunityDto {
  paginatedResult: PublicationsOnCommunity[];
  totalCount: number;
}

export interface PublicationsOnCommunityUpdateInput {
  publication?: PublicationWhereUniqueInput;
  community?: CommunityWhereUniqueInput;
}

export interface SocialinterractionWhereInput {
  id?: StringFilter;
  type?: StringNullableFilter;
  publication?: PublicationWhereUniqueInput;
  user?: UserWhereUniqueInput;
  isactive?: boolean;
  label?: string;
  entrepriseId?: string;
  createdAt?: StringFilter;
  offerId?: string;
}

export interface SocialinterractionOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  type?: "Asc" | "Desc";
  publicationId?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListSocialinterractionDto {
  paginatedResult: Socialinterraction[];
  totalCount: number;
}

export interface EventCreateInput {
  location?: string;
  file?: string;
  link?: string;
  startDate?: object;
  endDate?: object;
  speakers?: string[];
  publication: PublicationCreateInput;
  eventMode?: string;
}

export interface EventWhereInput {
  id?: StringFilter;
  location?: StringNullableFilter;
  file?: StringNullableFilter;
  link?: StringNullableFilter;
  startDate?: DateTimeNullableFilter;
  publication?: PublicationWhereUniqueInput;
}

export interface EventOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  location?: "Asc" | "Desc";
  file?: "Asc" | "Desc";
  link?: "Asc" | "Desc";
  startDate?: "Asc" | "Desc";
  publicationId?: "Asc" | "Desc";
}

export interface GetListEventDto {
  paginatedResult: Event[];
  totalCount: number;
}

export interface EventUpdateInput {
  location?: string;
  file?: string;
  link?: string;
  startDate?: object;
  publication?: PublicationUpdateInput;
  endDate?: object;
  speakers?: string[];
  deletedAt?: object;
  eventMode?: string;
}

export interface PostCreateInput {
  image?: string;
  publication: PublicationCreateInput;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface PostWhereInput {
  id?: StringFilter;
  image?: StringNullableFilter;
  publication?: PublicationWhereUniqueInput;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface PostOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  image?: "Asc" | "Desc";
  publicationId?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
}

export interface GetListPostDto {
  paginatedResult: Post[];
  totalCount: number;
}

export interface PostUpdateInput {
  image?: string;
  publication?: PublicationUpdateInput;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface OfferWhereInput {
  id?: StringFilter;
  place?: StringNullableFilter;
  renumeration?: StringNullableFilter;
  offerType?: StringNullableFilter;
  maxExperience?: IntNullableFilter;
  candidateMaxNumber?: IntNullableFilter;
  publication?: PublicationWhereUniqueInput;
  contract?: ContractWhereUniqueInput;
  isActive?: BooleanFilter;
}

export interface OfferOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  place?: "Asc" | "Desc";
  renumeration?: "Asc" | "Desc";
  offerType?: "Asc" | "Desc";
  maxExperience?: "Asc" | "Desc";
  candidateMaxNumber?: "Asc" | "Desc";
  publicationId?: "Asc" | "Desc";
  contractId?: "Asc" | "Desc";
}

export interface GetListOfferDto {
  paginatedResult: Offer[];
  totalCount: number;
}

export interface StoryWhereInput {
  id?: StringFilter;
  mediaLink?: StringFilter;
  publication?: PublicationWhereUniqueInput;
}

export interface StoryOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  mediaLink?: "Asc" | "Desc";
  publicationId?: "Asc" | "Desc";
}

export interface GetListStoryDto {
  paginatedResult: Story[];
  totalCount: number;
}

export interface VideoWhereInput {
  id?: StringFilter;
  category?: CategoryWhereUniqueInput;
  publication?: PublicationWhereUniqueInput;
  entreprise?: EntrepriseWhereUniqueInput;
}

export interface VideoOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  categoryId?: "Asc" | "Desc";
  publicationId?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
}

export interface GetListVideoDto {
  paginatedResult: Video[];
  totalCount: number;
}

export interface CategoryCreateInput {
  label?: string;
}

export interface CategoryWhereInput {
  label?: StringNullableFilter;
  id?: StringFilter;
}

export interface CategoryOrderByInput {
  label?: "Asc" | "Desc";
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
}

export interface GetListCategoryDto {
  paginatedResult: Category[];
  totalCount: number;
}

export interface CategoryUpdateInput {
  label?: string;
}

export interface JobCreateInput {
  name?: string;
}

export interface JobWhereInput {
  id?: StringFilter;
  name?: StringNullableFilter;
}

export interface JobOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  name?: "Asc" | "Desc";
}

export interface GetListJobDto {
  paginatedResult: Job[];
  totalCount: number;
}

export interface SocialinterractionCreateInput {
  type?: string;
  publication?: PublicationWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface SocialinterractionUpdateInput {
  type?: string;
  publication?: PublicationWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersSkillCreateInput {
  skill?: SkillWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersSkillWhereInput {
  id?: StringFilter;
  skill?: SkillWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersSkillOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  skillId?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListUsersSkillDto {
  paginatedResult: UsersSkill[];
  totalCount: number;
}

export interface UsersSkillUpdateInput {
  skill?: SkillWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersOnCommunityCreateInput {
  community?: CommunityWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersOnCommunityWhereInput {
  id?: StringFilter;
  community?: CommunityWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersOnCommunityOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  communityId?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListUsersOnCommunityDto {
  paginatedResult: UsersOnCommunity[];
  totalCount: number;
}

export interface UsersOnCommunityUpdateInput {
  community?: CommunityWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersOnEntrepriseCreateInput {
  entreprise?: EntrepriseWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersOnEntrepriseWhereInput {
  id?: StringFilter;
  entreprise?: EntrepriseWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface UsersOnEntrepriseOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
  userId?: "Asc" | "Desc";
}

export interface GetListUsersOnEntrepriseDto {
  paginatedResult: UsersOnEntreprise[];
  totalCount: number;
}

export interface UsersOnEntrepriseUpdateInput {
  entreprise?: EntrepriseWhereUniqueInput;
  user?: UserWhereUniqueInput;
}

export interface EntreprisesOnCommunityCreateInput {
  entreprise?: EntrepriseWhereUniqueInput;
  community?: CommunityWhereUniqueInput;
}

export interface EntreprisesOnCommunityWhereInput {
  id?: StringFilter;
  entreprise?: EntrepriseWhereUniqueInput;
  community?: CommunityWhereUniqueInput;
}

export interface EntreprisesOnCommunityOrderByInput {
  id?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
  entrepriseId?: "Asc" | "Desc";
  communityId?: "Asc" | "Desc";
}

export interface GetListEntreprisesOnCommunityDto {
  paginatedResult: EntreprisesOnCommunity[];
  totalCount: number;
}

export interface EntreprisesOnCommunityUpdateInput {
  entreprise?: EntrepriseWhereUniqueInput;
  community?: CommunityWhereUniqueInput;
}

export interface ContractsOnCandidateCreateInput {
  candidate?: CandidateWhereUniqueInput;
  contract?: ContractWhereUniqueInput;
}

export interface ContractsOnCandidateWhereInput {
  candidate?: CandidateWhereUniqueInput;
  contract?: ContractWhereUniqueInput;
  id?: StringFilter;
}

export interface ContractsOnCandidateOrderByInput {
  candidateId?: "Asc" | "Desc";
  contractId?: "Asc" | "Desc";
  createdAt?: "Asc" | "Desc";
  id?: "Asc" | "Desc";
  updatedAt?: "Asc" | "Desc";
}

export interface GetListContractsOnCandidateDto {
  paginatedResult: ContractsOnCandidate[];
  totalCount: number;
}

export interface ContractsOnCandidateUpdateInput {
  candidate?: CandidateWhereUniqueInput;
  contract?: ContractWhereUniqueInput;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/nest";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  public setBaseApiParams = (data: RequestParams) => {
    this.baseApiParams = this.mergeRequestParams(data);
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Retchee DB
 * @version kqteapup
 * @baseUrl /nest
 * @contact
 *
 * Retchee DB (13)
 *
 * ## Congratulations! Your application is ready.
 *
 *     Please note that all endpoints are secured with JWT Bearer authentication.Use the authentification service of supabase to authenticate.
 *     (https://supabase.com/docs/gotrue/server/about#put-user)
 *     Learn more in [our docs](https://docs.amplication.com)
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags users
     * @name UserControllerGetAudienceList
     * @request GET:/api/users/audienceList
     * @secure
     */
    userControllerGetAudienceList: (
      query?: { where?: UserWhereInput; orderBy?: UserListOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<UserListDTO, void>({
        path: `/api/users/audienceList`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerGetUserList
     * @request GET:/api/users/userList
     * @secure
     */
    userControllerGetUserList: (
      query?: { where?: UserWhereInput; orderBy?: UserListOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<UserListDTO, void>({
        path: `/api/users/userList`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindOne
     * @request GET:/api/users/{id}
     * @secure
     */
    userControllerFindOne: (id: string, candidateId?: string, params: RequestParams = {}) =>
      this.request<User, ForbiddenException | NotFoundException>({
        path: `/api/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindManyComments
     * @request GET:/api/users/{id}/comments
     * @secure
     */
    userControllerFindManyComments: (
      id: string,
      candidateId?: string,
      query?: { id?: StringFilter; content?: StringNullableFilter; user?: UserWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/comments`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreateComments
     * @request POST:/api/users/{id}/comments
     * @secure
     */
    userControllerCreateComments: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdateComments
     * @request PATCH:/api/users/{id}/comments
     * @secure
     */
    userControllerUpdateComments: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/comments`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerDeleteComments
     * @request DELETE:/api/users/{id}/comments
     * @secure
     */
    userControllerDeleteComments: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/comments`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindManyFeedbacks
     * @request GET:/api/users/{id}/feedbacks
     * @secure
     */
    userControllerFindManyFeedbacks: (
      id: string,
      candidateId?: string,
      query?: {
        id?: StringFilter;
        contenu?: StringNullableFilter;
        statue?: StringNullableFilter;
        type?: StringNullableFilter;
        offerid?: string;
        user?: UserWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/feedbacks`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreateFeedbacks
     * @request POST:/api/users/{id}/feedbacks
     * @secure
     */
    userControllerCreateFeedbacks: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/feedbacks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdateFeedbacks
     * @request PATCH:/api/users/{id}/feedbacks
     * @secure
     */
    userControllerUpdateFeedbacks: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/feedbacks`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerDeleteFeedbacks
     * @request DELETE:/api/users/{id}/feedbacks
     * @secure
     */
    userControllerDeleteFeedbacks: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/feedbacks`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreatePublications
     * @request GET:/api/users/{id}/publications
     * @secure
     */
    userControllerCreatePublications: (
      id: string,
      data: string[],
      candidateId?: string,
      query?: {
        id?: StringFilter;
        title?: StringNullableFilter;
        description?: StringNullableFilter;
        event?: EventWhereUniqueInput;
        post?: PostWhereUniqueInput;
        offer?: OfferWhereUniqueInput;
        story?: StoryWhereUniqueInput;
        video?: VideoWhereUniqueInput;
        user?: UserWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/publications`,
        method: "GET",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdatePublications
     * @request PATCH:/api/users/{id}/publications
     * @secure
     */
    userControllerUpdatePublications: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/publications`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerDeletePublications
     * @request DELETE:/api/users/{id}/publications
     * @secure
     */
    userControllerDeletePublications: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/publications`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindManySocialinterractions
     * @request GET:/api/users/{id}/socialinterractions
     * @secure
     */
    userControllerFindManySocialinterractions: (
      id: string,
      candidateId?: string,
      query?: {
        id?: StringFilter;
        type?: StringNullableFilter;
        publication?: PublicationWhereUniqueInput;
        user?: UserWhereUniqueInput;
        isactive?: boolean;
        label?: string;
        entrepriseId?: string;
        createdAt?: StringFilter;
        offerId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/socialinterractions`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreateSocialinterractions
     * @request POST:/api/users/{id}/socialinterractions
     * @secure
     */
    userControllerCreateSocialinterractions: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/socialinterractions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdateSocialinterractions
     * @request PATCH:/api/users/{id}/socialinterractions
     * @secure
     */
    userControllerUpdateSocialinterractions: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/socialinterractions`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerDeleteSocialinterractions
     * @request DELETE:/api/users/{id}/socialinterractions
     * @secure
     */
    userControllerDeleteSocialinterractions: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/socialinterractions`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindManyUsersOnCommunities
     * @request GET:/api/users/{id}/usersOnCommunities
     * @secure
     */
    userControllerFindManyUsersOnCommunities: (
      id: string,
      candidateId?: string,
      query?: { id?: StringFilter; community?: CommunityWhereUniqueInput; user?: UserWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersOnCommunities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreateUsersOnCommunities
     * @request POST:/api/users/{id}/usersOnCommunities
     * @secure
     */
    userControllerCreateUsersOnCommunities: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersOnCommunities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdateUsersOnCommunities
     * @request PATCH:/api/users/{id}/usersOnCommunities
     * @secure
     */
    userControllerUpdateUsersOnCommunities: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersOnCommunities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerDeleteUsersOnCommunities
     * @request DELETE:/api/users/{id}/usersOnCommunities
     * @secure
     */
    userControllerDeleteUsersOnCommunities: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersOnCommunities`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindManyUsersOnEntreprises
     * @request GET:/api/users/{id}/usersOnEntreprises
     * @secure
     */
    userControllerFindManyUsersOnEntreprises: (
      id: string,
      candidateId?: string,
      query?: { id?: StringFilter; entreprise?: EntrepriseWhereUniqueInput; user?: UserWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersOnEntreprises`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreateUsersOnEntreprises
     * @request POST:/api/users/{id}/usersOnEntreprises
     * @secure
     */
    userControllerCreateUsersOnEntreprises: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersOnEntreprises`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdateUsersOnEntreprises
     * @request PATCH:/api/users/{id}/usersOnEntreprises
     * @secure
     */
    userControllerUpdateUsersOnEntreprises: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersOnEntreprises`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerDeleteUsersOnEntreprises
     * @request DELETE:/api/users/{id}/usersOnEntreprises
     * @secure
     */
    userControllerDeleteUsersOnEntreprises: (
      id: string,
      data: string[],
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersOnEntreprises`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindManyUsersSkills
     * @request GET:/api/users/{id}/usersSkills
     * @secure
     */
    userControllerFindManyUsersSkills: (
      id: string,
      candidateId?: string,
      query?: { id?: StringFilter; skill?: SkillWhereUniqueInput; user?: UserWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersSkills`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreateUsersSkills
     * @request POST:/api/users/{id}/usersSkills
     * @secure
     */
    userControllerCreateUsersSkills: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersSkills`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdateUsersSkills
     * @request PATCH:/api/users/{id}/usersSkills
     * @secure
     */
    userControllerUpdateUsersSkills: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersSkills`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerDeleteUsersSkills
     * @request DELETE:/api/users/{id}/usersSkills
     * @secure
     */
    userControllerDeleteUsersSkills: (id: string, data: string[], candidateId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/${id}/usersSkills`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignUp
     * @request POST:/api/sign_up
     */
    authControllerSignUp: (data: UserCredentials, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sign_up`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSendEmailResetPassword
     * @request POST:/api/send_email_reset_password
     */
    authControllerSendEmailResetPassword: (data: EmailResetPasswordCredential, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/send_email_reset_password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerResetPassword
     * @request POST:/api/reset_password
     */
    authControllerResetPassword: (data: ResetPasswordCredential, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/reset_password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerCreateUser
     * @request POST:/api/inscription/step1/{id}/{candidateId}
     */
    authControllerCreateUser: (
      id: string,
      data: CandidateCreateInput,
      candidateId?: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/inscription/step1/${id}/${candidateId}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerGetCandidateLanguage
     * @request GET:/api/candidates/language
     * @secure
     */
    candidateControllerGetCandidateLanguage: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/language`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerCreate
     * @request POST:/api/candidates
     * @secure
     */
    candidateControllerCreate: (data: CandidateCreateInput, params: RequestParams = {}) =>
      this.request<Candidate, ForbiddenException>({
        path: `/api/candidates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerFindMany
     * @request GET:/api/candidates
     * @secure
     */
    candidateControllerFindMany: (
      query?: { where?: CandidateWhereInput; orderBy?: CandidateOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListCandidateDto, void>({
        path: `/api/candidates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerFindOne
     * @request GET:/api/candidates/{id}
     * @secure
     */
    candidateControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Candidate, ForbiddenException | NotFoundException>({
        path: `/api/candidates/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerUpdate
     * @request PATCH:/api/candidates/{id}
     * @secure
     */
    candidateControllerUpdate: (id: string, data: CandidateUpdateInput, params: RequestParams = {}) =>
      this.request<Candidate, ForbiddenException | NotFoundException>({
        path: `/api/candidates/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerDelete
     * @request DELETE:/api/candidates/{id}
     * @secure
     */
    candidateControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Candidate, ForbiddenException | NotFoundException>({
        path: `/api/candidates/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerFindManyChats
     * @request GET:/api/candidates/{id}/chats
     * @secure
     */
    candidateControllerFindManyChats: (
      id: string,
      query?: { id?: StringFilter; candidate?: CandidateWhereUniqueInput; entreprise?: EntrepriseWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/chats`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerCreateChats
     * @request POST:/api/candidates/{id}/chats
     * @secure
     */
    candidateControllerCreateChats: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/chats`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerUpdateChats
     * @request PATCH:/api/candidates/{id}/chats
     * @secure
     */
    candidateControllerUpdateChats: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/chats`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerDeleteChats
     * @request DELETE:/api/candidates/{id}/chats
     * @secure
     */
    candidateControllerDeleteChats: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/chats`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerFindManyContractsOnCandidates
     * @request GET:/api/candidates/{id}/contractsOnCandidates
     * @secure
     */
    candidateControllerFindManyContractsOnCandidates: (
      id: string,
      query?: { candidate?: CandidateWhereUniqueInput; contract?: ContractWhereUniqueInput; id?: StringFilter },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/contractsOnCandidates`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerCreateContractsOnCandidates
     * @request POST:/api/candidates/{id}/contractsOnCandidates
     * @secure
     */
    candidateControllerCreateContractsOnCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/contractsOnCandidates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerUpdateContractsOnCandidates
     * @request PATCH:/api/candidates/{id}/contractsOnCandidates
     * @secure
     */
    candidateControllerUpdateContractsOnCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/contractsOnCandidates`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerDeleteContractsOnCandidates
     * @request DELETE:/api/candidates/{id}/contractsOnCandidates
     * @secure
     */
    candidateControllerDeleteContractsOnCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/contractsOnCandidates`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerFindManyCandidatesOnChatrooms
     * @request GET:/api/candidates/{id}/candidatesOnChatrooms
     * @secure
     */
    candidateControllerFindManyCandidatesOnChatrooms: (
      id: string,
      query?: { id?: StringFilter; chatroom?: ChatroomWhereUniqueInput; candidate?: CandidateWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/candidatesOnChatrooms`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerCreateCandidatesOnChatrooms
     * @request POST:/api/candidates/{id}/candidatesOnChatrooms
     * @secure
     */
    candidateControllerCreateCandidatesOnChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/candidatesOnChatrooms`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerUpdateCandidatesOnChatrooms
     * @request PATCH:/api/candidates/{id}/candidatesOnChatrooms
     * @secure
     */
    candidateControllerUpdateCandidatesOnChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/candidatesOnChatrooms`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerDeleteCandidatesOnChatrooms
     * @request DELETE:/api/candidates/{id}/candidatesOnChatrooms
     * @secure
     */
    candidateControllerDeleteCandidatesOnChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/candidatesOnChatrooms`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerFindManyFollowEntreprises
     * @request GET:/api/candidates/{id}/followEntreprises
     * @secure
     */
    candidateControllerFindManyFollowEntreprises: (
      id: string,
      query?: { id?: StringFilter; entreprise?: EntrepriseWhereUniqueInput; candidate?: CandidateWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/followEntreprises`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerCreateFollowEntreprises
     * @request POST:/api/candidates/{id}/followEntreprises
     * @secure
     */
    candidateControllerCreateFollowEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/followEntreprises`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerUpdateFollowEntreprises
     * @request PATCH:/api/candidates/{id}/followEntreprises
     * @secure
     */
    candidateControllerUpdateFollowEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/followEntreprises`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerDeleteFollowEntreprises
     * @request DELETE:/api/candidates/{id}/followEntreprises
     * @secure
     */
    candidateControllerDeleteFollowEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/followEntreprises`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerFindManyExperiences
     * @request GET:/api/candidates/{id}/experiences
     * @secure
     */
    candidateControllerFindManyExperiences: (
      id: string,
      query?: {
        id?: StringFilter;
        occupiedPosition?: StringNullableFilter;
        companyName?: StringNullableFilter;
        startDate?: DateTimeNullableFilter;
        endDate?: DateTimeNullableFilter;
        isWorking?: BooleanNullableFilter;
        country?: StringNullableFilter;
        description?: StringNullableFilter;
        candidate?: CandidateWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/experiences`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerCreateExperiences
     * @request POST:/api/candidates/{id}/experiences
     * @secure
     */
    candidateControllerCreateExperiences: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/experiences`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerUpdateExperiences
     * @request PATCH:/api/candidates/{id}/experiences
     * @secure
     */
    candidateControllerUpdateExperiences: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/experiences`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerDeleteExperiences
     * @request DELETE:/api/candidates/{id}/experiences
     * @secure
     */
    candidateControllerDeleteExperiences: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/experiences`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerFindManyCourses
     * @request GET:/api/candidates/{id}/courses
     * @secure
     */
    candidateControllerFindManyCourses: (
      id: string,
      query?: {
        id?: StringFilter;
        title?: StringNullableFilter;
        centerName?: StringNullableFilter;
        startDate?: DateTimeNullableFilter;
        endDate?: DateTimeNullableFilter;
        isForming?: BooleanNullableFilter;
        country?: StringNullableFilter;
        description?: StringNullableFilter;
        candidate?: CandidateWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/courses`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerCreateCourses
     * @request POST:/api/candidates/{id}/courses
     * @secure
     */
    candidateControllerCreateCourses: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/courses`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerUpdateCourses
     * @request PATCH:/api/candidates/{id}/courses
     * @secure
     */
    candidateControllerUpdateCourses: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/courses`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates
     * @name CandidateControllerDeleteCourses
     * @request DELETE:/api/candidates/{id}/courses
     * @secure
     */
    candidateControllerDeleteCourses: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/candidates/${id}/courses`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags recruiters
     * @name RecruiterControllerSignUp
     * @request POST:/api/recruiters/create_recruiter
     * @secure
     */
    recruiterControllerSignUp: (data: UserCredentials, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/recruiters/create_recruiter`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags recruiters
     * @name RecruiterControllerSendMail
     * @request POST:/api/recruiters/send_mail
     * @secure
     */
    recruiterControllerSendMail: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/recruiters/send_mail`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags recruiters
     * @name RecruiterControllerUpdateUserPassword
     * @request PUT:/api/recruiters/updateUserPassword
     * @secure
     */
    recruiterControllerUpdateUserPassword: (
      query: { password: string; token: string; email: string },
      params: RequestParams = {},
    ) =>
      this.request<User, void>({
        path: `/api/recruiters/updateUserPassword`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recruiters
     * @name RecruiterControllerCreate
     * @request POST:/api/recruiters
     * @secure
     */
    recruiterControllerCreate: (data: RecruiterCreateInput, params: RequestParams = {}) =>
      this.request<Recruiter, ForbiddenException>({
        path: `/api/recruiters`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recruiters
     * @name RecruiterControllerFindMany
     * @request GET:/api/recruiters
     * @secure
     */
    recruiterControllerFindMany: (
      query?: { where?: RecruiterWhereInput; orderBy?: RecruiterOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListRecruiterDto, void>({
        path: `/api/recruiters`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recruiters
     * @name RecruiterControllerFindOne
     * @request GET:/api/recruiters/{id}
     * @secure
     */
    recruiterControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Recruiter, ForbiddenException | NotFoundException>({
        path: `/api/recruiters/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recruiters
     * @name RecruiterControllerUpdate
     * @request PATCH:/api/recruiters/{id}
     * @secure
     */
    recruiterControllerUpdate: (id: string, data: RecruiterUpdateInput, params: RequestParams = {}) =>
      this.request<Recruiter, ForbiddenException | NotFoundException>({
        path: `/api/recruiters/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recruiters
     * @name RecruiterControllerDelete
     * @request DELETE:/api/recruiters/{id}
     * @secure
     */
    recruiterControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Recruiter, ForbiddenException | NotFoundException>({
        path: `/api/recruiters/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerEntrepriseMoreThen10LikesList
     * @request GET:/api/entreprises/entrepriseMoreThen10LikesList/{id}
     * @secure
     */
    entrepriseControllerEntrepriseMoreThen10LikesList: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/entrepriseMoreThen10LikesList/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreate
     * @request POST:/api/entreprises
     * @secure
     */
    entrepriseControllerCreate: (data: EntrepriseCreateInput, params: RequestParams = {}) =>
      this.request<Entreprise, ForbiddenException>({
        path: `/api/entreprises`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindMany
     * @request GET:/api/entreprises
     * @secure
     */
    entrepriseControllerFindMany: (
      query?: { where?: EntrepriseWhereInput; orderBy?: EntrepriseOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListEntrepriseDto, void>({
        path: `/api/entreprises`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindOne
     * @request GET:/api/entreprises/{id}
     * @secure
     */
    entrepriseControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Entreprise, ForbiddenException | NotFoundException>({
        path: `/api/entreprises/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdate
     * @request PATCH:/api/entreprises/{id}
     * @secure
     */
    entrepriseControllerUpdate: (id: string, data: EntrepriseUpdateInput, params: RequestParams = {}) =>
      this.request<Entreprise, ForbiddenException | NotFoundException>({
        path: `/api/entreprises/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDelete
     * @request DELETE:/api/entreprises/{id}
     * @secure
     */
    entrepriseControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Entreprise, ForbiddenException | NotFoundException>({
        path: `/api/entreprises/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManyRecruiters
     * @request GET:/api/entreprises/{id}/recruiters
     * @secure
     */
    entrepriseControllerFindManyRecruiters: (
      id: string,
      query?: { id?: StringFilter; entreprise?: EntrepriseWhereUniqueInput; user?: UserWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/recruiters`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreateRecruiters
     * @request POST:/api/entreprises/{id}/recruiters
     * @secure
     */
    entrepriseControllerCreateRecruiters: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/recruiters`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdateRecruiters
     * @request PATCH:/api/entreprises/{id}/recruiters
     * @secure
     */
    entrepriseControllerUpdateRecruiters: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/recruiters`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeleteRecruiters
     * @request DELETE:/api/entreprises/{id}/recruiters
     * @secure
     */
    entrepriseControllerDeleteRecruiters: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/recruiters`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManyChatrooms
     * @request GET:/api/entreprises/{id}/chatrooms
     * @secure
     */
    entrepriseControllerFindManyChatrooms: (
      id: string,
      query?: {
        id?: StringFilter;
        title?: StringNullableFilter;
        startDateTime?: DateTimeNullableFilter;
        endDateTime?: DateTimeNullableFilter;
        entreprise?: EntrepriseWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/chatrooms`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreateChatrooms
     * @request POST:/api/entreprises/{id}/chatrooms
     * @secure
     */
    entrepriseControllerCreateChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/chatrooms`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdateChatrooms
     * @request PATCH:/api/entreprises/{id}/chatrooms
     * @secure
     */
    entrepriseControllerUpdateChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/chatrooms`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeleteChatrooms
     * @request DELETE:/api/entreprises/{id}/chatrooms
     * @secure
     */
    entrepriseControllerDeleteChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/chatrooms`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManyChats
     * @request GET:/api/entreprises/{id}/chats
     * @secure
     */
    entrepriseControllerFindManyChats: (
      id: string,
      query?: { id?: StringFilter; candidate?: CandidateWhereUniqueInput; entreprise?: EntrepriseWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/chats`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreateChats
     * @request POST:/api/entreprises/{id}/chats
     * @secure
     */
    entrepriseControllerCreateChats: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/chats`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdateChats
     * @request PATCH:/api/entreprises/{id}/chats
     * @secure
     */
    entrepriseControllerUpdateChats: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/chats`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeleteChats
     * @request DELETE:/api/entreprises/{id}/chats
     * @secure
     */
    entrepriseControllerDeleteChats: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/chats`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManyFollowEntreprises
     * @request GET:/api/entreprises/{id}/followEntreprises
     * @secure
     */
    entrepriseControllerFindManyFollowEntreprises: (
      id: string,
      query?: { id?: StringFilter; entreprise?: EntrepriseWhereUniqueInput; candidate?: CandidateWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/followEntreprises`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreateFollowEntreprises
     * @request POST:/api/entreprises/{id}/followEntreprises
     * @secure
     */
    entrepriseControllerCreateFollowEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/followEntreprises`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdateFollowEntreprises
     * @request PATCH:/api/entreprises/{id}/followEntreprises
     * @secure
     */
    entrepriseControllerUpdateFollowEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/followEntreprises`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeleteFollowEntreprises
     * @request DELETE:/api/entreprises/{id}/followEntreprises
     * @secure
     */
    entrepriseControllerDeleteFollowEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/followEntreprises`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManySurveys
     * @request GET:/api/entreprises/{id}/surveys
     * @secure
     */
    entrepriseControllerFindManySurveys: (
      id: string,
      query?: {
        id?: StringFilter;
        title?: StringNullableFilter;
        content?: StringNullableFilter;
        entreprise?: EntrepriseWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/surveys`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreateSurveys
     * @request POST:/api/entreprises/{id}/surveys
     * @secure
     */
    entrepriseControllerCreateSurveys: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/surveys`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdateSurveys
     * @request PATCH:/api/entreprises/{id}/surveys
     * @secure
     */
    entrepriseControllerUpdateSurveys: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/surveys`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeleteSurveys
     * @request DELETE:/api/entreprises/{id}/surveys
     * @secure
     */
    entrepriseControllerDeleteSurveys: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/surveys`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManyPosts
     * @request GET:/api/entreprises/{id}/posts
     * @secure
     */
    entrepriseControllerFindManyPosts: (
      id: string,
      query?: {
        id?: StringFilter;
        image?: StringNullableFilter;
        publication?: PublicationWhereUniqueInput;
        entreprise?: EntrepriseWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/posts`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreatePosts
     * @request POST:/api/entreprises/{id}/posts
     * @secure
     */
    entrepriseControllerCreatePosts: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/posts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdatePosts
     * @request PATCH:/api/entreprises/{id}/posts
     * @secure
     */
    entrepriseControllerUpdatePosts: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/posts`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeletePosts
     * @request DELETE:/api/entreprises/{id}/posts
     * @secure
     */
    entrepriseControllerDeletePosts: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/posts`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManyVideos
     * @request GET:/api/entreprises/{id}/videos
     * @secure
     */
    entrepriseControllerFindManyVideos: (
      id: string,
      query?: {
        id?: StringFilter;
        category?: CategoryWhereUniqueInput;
        publication?: PublicationWhereUniqueInput;
        entreprise?: EntrepriseWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/videos`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreateVideos
     * @request POST:/api/entreprises/{id}/videos
     * @secure
     */
    entrepriseControllerCreateVideos: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/videos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdateVideos
     * @request PATCH:/api/entreprises/{id}/videos
     * @secure
     */
    entrepriseControllerUpdateVideos: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/videos`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeleteVideos
     * @request DELETE:/api/entreprises/{id}/videos
     * @secure
     */
    entrepriseControllerDeleteVideos: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/videos`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManyUsersOnEntreprises
     * @request GET:/api/entreprises/{id}/usersOnEntreprises
     * @secure
     */
    entrepriseControllerFindManyUsersOnEntreprises: (
      id: string,
      query?: { id?: StringFilter; entreprise?: EntrepriseWhereUniqueInput; user?: UserWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/usersOnEntreprises`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreateUsersOnEntreprises
     * @request POST:/api/entreprises/{id}/usersOnEntreprises
     * @secure
     */
    entrepriseControllerCreateUsersOnEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/usersOnEntreprises`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdateUsersOnEntreprises
     * @request PATCH:/api/entreprises/{id}/usersOnEntreprises
     * @secure
     */
    entrepriseControllerUpdateUsersOnEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/usersOnEntreprises`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeleteUsersOnEntreprises
     * @request DELETE:/api/entreprises/{id}/usersOnEntreprises
     * @secure
     */
    entrepriseControllerDeleteUsersOnEntreprises: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/usersOnEntreprises`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerFindManyEntreprisesOnCommunities
     * @request GET:/api/entreprises/{id}/entreprisesOnCommunities
     * @secure
     */
    entrepriseControllerFindManyEntreprisesOnCommunities: (
      id: string,
      query?: { id?: StringFilter; entreprise?: EntrepriseWhereUniqueInput; community?: CommunityWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/entreprisesOnCommunities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerCreateEntreprisesOnCommunities
     * @request POST:/api/entreprises/{id}/entreprisesOnCommunities
     * @secure
     */
    entrepriseControllerCreateEntreprisesOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/entreprisesOnCommunities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerUpdateEntreprisesOnCommunities
     * @request PATCH:/api/entreprises/{id}/entreprisesOnCommunities
     * @secure
     */
    entrepriseControllerUpdateEntreprisesOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/entreprisesOnCommunities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises
     * @name EntrepriseControllerDeleteEntreprisesOnCommunities
     * @request DELETE:/api/entreprises/{id}/entreprisesOnCommunities
     * @secure
     */
    entrepriseControllerDeleteEntreprisesOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/entreprises/${id}/entreprisesOnCommunities`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerCreate
     * @request POST:/api/chatrooms
     * @secure
     */
    chatroomControllerCreate: (data: ChatroomCreateInput, params: RequestParams = {}) =>
      this.request<Chatroom, ForbiddenException>({
        path: `/api/chatrooms`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerFindMany
     * @request GET:/api/chatrooms
     * @secure
     */
    chatroomControllerFindMany: (
      query?: { where?: ChatroomWhereInput; orderBy?: ChatroomOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListChatroomDto, void>({
        path: `/api/chatrooms`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerFindOne
     * @request GET:/api/chatrooms/{id}
     * @secure
     */
    chatroomControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Chatroom, ForbiddenException | NotFoundException>({
        path: `/api/chatrooms/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerUpdate
     * @request PATCH:/api/chatrooms/{id}
     * @secure
     */
    chatroomControllerUpdate: (id: string, data: ChatroomUpdateInput, params: RequestParams = {}) =>
      this.request<Chatroom, ForbiddenException | NotFoundException>({
        path: `/api/chatrooms/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerDelete
     * @request DELETE:/api/chatrooms/{id}
     * @secure
     */
    chatroomControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Chatroom, ForbiddenException | NotFoundException>({
        path: `/api/chatrooms/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerFindManyCandidatesOnChatrooms
     * @request GET:/api/chatrooms/{id}/candidatesOnChatrooms
     * @secure
     */
    chatroomControllerFindManyCandidatesOnChatrooms: (
      id: string,
      query?: { id?: StringFilter; chatroom?: ChatroomWhereUniqueInput; candidate?: CandidateWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/chatrooms/${id}/candidatesOnChatrooms`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerCreateCandidatesOnChatrooms
     * @request POST:/api/chatrooms/{id}/candidatesOnChatrooms
     * @secure
     */
    chatroomControllerCreateCandidatesOnChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/chatrooms/${id}/candidatesOnChatrooms`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerUpdateCandidatesOnChatrooms
     * @request PATCH:/api/chatrooms/{id}/candidatesOnChatrooms
     * @secure
     */
    chatroomControllerUpdateCandidatesOnChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/chatrooms/${id}/candidatesOnChatrooms`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chatrooms
     * @name ChatroomControllerDeleteCandidatesOnChatrooms
     * @request DELETE:/api/chatrooms/{id}/candidatesOnChatrooms
     * @secure
     */
    chatroomControllerDeleteCandidatesOnChatrooms: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/chatrooms/${id}/candidatesOnChatrooms`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerCreate
     * @request POST:/api/chats
     * @secure
     */
    chatControllerCreate: (data: ChatCreateInput, params: RequestParams = {}) =>
      this.request<Chat, ForbiddenException>({
        path: `/api/chats`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerFindMany
     * @request GET:/api/chats
     * @secure
     */
    chatControllerFindMany: (
      query?: { where?: ChatWhereInput; orderBy?: ChatOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListChatDto, void>({
        path: `/api/chats`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerFindOne
     * @request GET:/api/chats/{id}
     * @secure
     */
    chatControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Chat, ForbiddenException | NotFoundException>({
        path: `/api/chats/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerUpdate
     * @request PATCH:/api/chats/{id}
     * @secure
     */
    chatControllerUpdate: (id: string, data: ChatUpdateInput, params: RequestParams = {}) =>
      this.request<Chat, ForbiddenException | NotFoundException>({
        path: `/api/chats/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerDelete
     * @request DELETE:/api/chats/{id}
     * @secure
     */
    chatControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Chat, ForbiddenException | NotFoundException>({
        path: `/api/chats/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerFindManyMessages
     * @request GET:/api/chats/{id}/messages
     * @secure
     */
    chatControllerFindManyMessages: (
      id: string,
      query?: { id?: StringFilter; contenu?: StringNullableFilter; chat?: ChatWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/chats/${id}/messages`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerCreateMessages
     * @request POST:/api/chats/{id}/messages
     * @secure
     */
    chatControllerCreateMessages: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/chats/${id}/messages`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerUpdateMessages
     * @request PATCH:/api/chats/{id}/messages
     * @secure
     */
    chatControllerUpdateMessages: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/chats/${id}/messages`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags chats
     * @name ChatControllerDeleteMessages
     * @request DELETE:/api/chats/{id}/messages
     * @secure
     */
    chatControllerDeleteMessages: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/chats/${id}/messages`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags messages
     * @name MessageControllerCreate
     * @request POST:/api/messages
     * @secure
     */
    messageControllerCreate: (data: MessageCreateInput, params: RequestParams = {}) =>
      this.request<Message, ForbiddenException>({
        path: `/api/messages`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags messages
     * @name MessageControllerFindMany
     * @request GET:/api/messages
     * @secure
     */
    messageControllerFindMany: (
      query?: { where?: MessageWhereInput; orderBy?: MessageOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListMessageDto, void>({
        path: `/api/messages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags messages
     * @name MessageControllerFindOne
     * @request GET:/api/messages/{id}
     * @secure
     */
    messageControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Message, ForbiddenException | NotFoundException>({
        path: `/api/messages/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags messages
     * @name MessageControllerUpdate
     * @request PATCH:/api/messages/{id}
     * @secure
     */
    messageControllerUpdate: (id: string, data: MessageUpdateInput, params: RequestParams = {}) =>
      this.request<Message, ForbiddenException | NotFoundException>({
        path: `/api/messages/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags messages
     * @name MessageControllerDelete
     * @request DELETE:/api/messages/{id}
     * @secure
     */
    messageControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Message, ForbiddenException | NotFoundException>({
        path: `/api/messages/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates-on-chatrooms
     * @name CandidatesOnChatroomControllerCreate
     * @request POST:/api/candidates-on-chatrooms
     * @secure
     */
    candidatesOnChatroomControllerCreate: (data: CandidatesOnChatroomCreateInput, params: RequestParams = {}) =>
      this.request<CandidatesOnChatroom, ForbiddenException>({
        path: `/api/candidates-on-chatrooms`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates-on-chatrooms
     * @name CandidatesOnChatroomControllerFindMany
     * @request GET:/api/candidates-on-chatrooms
     * @secure
     */
    candidatesOnChatroomControllerFindMany: (
      query?: {
        where?: CandidatesOnChatroomWhereInput;
        orderBy?: CandidatesOnChatroomOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListCandidatesOnChatroomDto, void>({
        path: `/api/candidates-on-chatrooms`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates-on-chatrooms
     * @name CandidatesOnChatroomControllerFindOne
     * @request GET:/api/candidates-on-chatrooms/{id}
     * @secure
     */
    candidatesOnChatroomControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<CandidatesOnChatroom, ForbiddenException | NotFoundException>({
        path: `/api/candidates-on-chatrooms/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates-on-chatrooms
     * @name CandidatesOnChatroomControllerUpdate
     * @request PATCH:/api/candidates-on-chatrooms/{id}
     * @secure
     */
    candidatesOnChatroomControllerUpdate: (
      id: string,
      data: CandidatesOnChatroomUpdateInput,
      params: RequestParams = {},
    ) =>
      this.request<CandidatesOnChatroom, ForbiddenException | NotFoundException>({
        path: `/api/candidates-on-chatrooms/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags candidates-on-chatrooms
     * @name CandidatesOnChatroomControllerDelete
     * @request DELETE:/api/candidates-on-chatrooms/{id}
     * @secure
     */
    candidatesOnChatroomControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<CandidatesOnChatroom, ForbiddenException | NotFoundException>({
        path: `/api/candidates-on-chatrooms/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags follow-entreprises
     * @name FollowEntrepriseControllerGetStoriesMediaData
     * @request GET:/api/follow-entreprises/board/statistics/enterprise
     * @secure
     */
    followEntrepriseControllerGetStoriesMediaData: (
      query?: { where?: FeedbackWhereInput; orderBy?: FeedbackOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListFeedbackDto, void>({
        path: `/api/follow-entreprises/board/statistics/enterprise`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags follow-entreprises
     * @name FollowEntrepriseControllerCreate
     * @request POST:/api/follow-entreprises
     * @secure
     */
    followEntrepriseControllerCreate: (data: FollowEntrepriseCreateInput, params: RequestParams = {}) =>
      this.request<FollowEntreprise, ForbiddenException>({
        path: `/api/follow-entreprises`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags follow-entreprises
     * @name FollowEntrepriseControllerFindMany
     * @request GET:/api/follow-entreprises
     * @secure
     */
    followEntrepriseControllerFindMany: (
      query?: {
        where?: FollowEntrepriseWhereInput;
        orderBy?: FollowEntrepriseOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListFollowEntrepriseDto, void>({
        path: `/api/follow-entreprises`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags follow-entreprises
     * @name FollowEntrepriseControllerFindOne
     * @request GET:/api/follow-entreprises/{id}
     * @secure
     */
    followEntrepriseControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FollowEntreprise, ForbiddenException | NotFoundException>({
        path: `/api/follow-entreprises/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags follow-entreprises
     * @name FollowEntrepriseControllerUpdate
     * @request PATCH:/api/follow-entreprises/{id}
     * @secure
     */
    followEntrepriseControllerUpdate: (id: string, data: FollowEntrepriseUpdateInput, params: RequestParams = {}) =>
      this.request<FollowEntreprise, ForbiddenException | NotFoundException>({
        path: `/api/follow-entreprises/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags follow-entreprises
     * @name FollowEntrepriseControllerDelete
     * @request DELETE:/api/follow-entreprises/{id}
     * @secure
     */
    followEntrepriseControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<FollowEntreprise, ForbiddenException | NotFoundException>({
        path: `/api/follow-entreprises/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags surveys
     * @name SurveyControllerCreate
     * @request POST:/api/surveys
     * @secure
     */
    surveyControllerCreate: (data: SurveyCreateInput, params: RequestParams = {}) =>
      this.request<Survey, ForbiddenException>({
        path: `/api/surveys`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags surveys
     * @name SurveyControllerFindMany
     * @request GET:/api/surveys
     * @secure
     */
    surveyControllerFindMany: (
      query?: { where?: SurveyWhereInput; orderBy?: SurveyOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListSurveyDto, void>({
        path: `/api/surveys`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags surveys
     * @name SurveyControllerFindOne
     * @request GET:/api/surveys/{id}
     * @secure
     */
    surveyControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Survey, ForbiddenException | NotFoundException>({
        path: `/api/surveys/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags surveys
     * @name SurveyControllerUpdate
     * @request PATCH:/api/surveys/{id}
     * @secure
     */
    surveyControllerUpdate: (id: string, data: SurveyUpdateInput, params: RequestParams = {}) =>
      this.request<Survey, ForbiddenException | NotFoundException>({
        path: `/api/surveys/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags surveys
     * @name SurveyControllerDelete
     * @request DELETE:/api/surveys/{id}
     * @secure
     */
    surveyControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Survey, ForbiddenException | NotFoundException>({
        path: `/api/surveys/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags experiences
     * @name ExperienceControllerCreate
     * @request POST:/api/experiences
     * @secure
     */
    experienceControllerCreate: (data: ExperienceCreateInput, params: RequestParams = {}) =>
      this.request<Experience, ForbiddenException>({
        path: `/api/experiences`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags experiences
     * @name ExperienceControllerFindMany
     * @request GET:/api/experiences
     * @secure
     */
    experienceControllerFindMany: (
      query?: { where?: ExperienceWhereInput; orderBy?: ExperienceOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListExperienceDto, void>({
        path: `/api/experiences`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags experiences
     * @name ExperienceControllerFindOne
     * @request GET:/api/experiences/{id}
     * @secure
     */
    experienceControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Experience, ForbiddenException | NotFoundException>({
        path: `/api/experiences/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags experiences
     * @name ExperienceControllerUpdate
     * @request PATCH:/api/experiences/{id}
     * @secure
     */
    experienceControllerUpdate: (id: string, data: ExperienceUpdateInput, params: RequestParams = {}) =>
      this.request<Experience, ForbiddenException | NotFoundException>({
        path: `/api/experiences/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags experiences
     * @name ExperienceControllerDelete
     * @request DELETE:/api/experiences/{id}
     * @secure
     */
    experienceControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Experience, ForbiddenException | NotFoundException>({
        path: `/api/experiences/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerCreate
     * @request POST:/api/courses
     * @secure
     */
    courseControllerCreate: (data: CourseCreateInput, params: RequestParams = {}) =>
      this.request<Course, ForbiddenException>({
        path: `/api/courses`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerFindMany
     * @request GET:/api/courses
     * @secure
     */
    courseControllerFindMany: (
      query?: { where?: CourseWhereInput; orderBy?: CourseOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListCourseDto, void>({
        path: `/api/courses`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerFindOne
     * @request GET:/api/courses/{id}
     * @secure
     */
    courseControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Course, ForbiddenException | NotFoundException>({
        path: `/api/courses/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerUpdate
     * @request PATCH:/api/courses/{id}
     * @secure
     */
    courseControllerUpdate: (id: string, data: CourseUpdateInput, params: RequestParams = {}) =>
      this.request<Course, ForbiddenException | NotFoundException>({
        path: `/api/courses/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CourseControllerDelete
     * @request DELETE:/api/courses/{id}
     * @secure
     */
    courseControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Course, ForbiddenException | NotFoundException>({
        path: `/api/courses/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerCreate
     * @request POST:/api/contracts
     * @secure
     */
    contractControllerCreate: (data: ContractCreateInput, params: RequestParams = {}) =>
      this.request<Contract, ForbiddenException>({
        path: `/api/contracts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerFindMany
     * @request GET:/api/contracts
     * @secure
     */
    contractControllerFindMany: (
      query?: { where?: ContractWhereInput; orderBy?: ContractOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListContractDto, void>({
        path: `/api/contracts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerFindOne
     * @request GET:/api/contracts/{id}
     * @secure
     */
    contractControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Contract, ForbiddenException | NotFoundException>({
        path: `/api/contracts/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerUpdate
     * @request PATCH:/api/contracts/{id}
     * @secure
     */
    contractControllerUpdate: (id: string, data: ContractUpdateInput, params: RequestParams = {}) =>
      this.request<Contract, ForbiddenException | NotFoundException>({
        path: `/api/contracts/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerDelete
     * @request DELETE:/api/contracts/{id}
     * @secure
     */
    contractControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Contract, ForbiddenException | NotFoundException>({
        path: `/api/contracts/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerFindManyContractsOnCandidates
     * @request GET:/api/contracts/{id}/contractsOnCandidates
     * @secure
     */
    contractControllerFindManyContractsOnCandidates: (
      id: string,
      query?: { candidate?: CandidateWhereUniqueInput; contract?: ContractWhereUniqueInput; id?: StringFilter },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/contracts/${id}/contractsOnCandidates`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerCreateContractsOnCandidates
     * @request POST:/api/contracts/{id}/contractsOnCandidates
     * @secure
     */
    contractControllerCreateContractsOnCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contracts/${id}/contractsOnCandidates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerUpdateContractsOnCandidates
     * @request PATCH:/api/contracts/{id}/contractsOnCandidates
     * @secure
     */
    contractControllerUpdateContractsOnCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contracts/${id}/contractsOnCandidates`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerDeleteContractsOnCandidates
     * @request DELETE:/api/contracts/{id}/contractsOnCandidates
     * @secure
     */
    contractControllerDeleteContractsOnCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contracts/${id}/contractsOnCandidates`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerFindManyOffers
     * @request GET:/api/contracts/{id}/offers
     * @secure
     */
    contractControllerFindManyOffers: (
      id: string,
      query?: {
        id?: StringFilter;
        place?: StringNullableFilter;
        renumeration?: StringNullableFilter;
        offerType?: StringNullableFilter;
        maxExperience?: IntNullableFilter;
        candidateMaxNumber?: IntNullableFilter;
        publication?: PublicationWhereUniqueInput;
        contract?: ContractWhereUniqueInput;
        isActive?: BooleanFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/contracts/${id}/offers`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerCreateOffers
     * @request POST:/api/contracts/{id}/offers
     * @secure
     */
    contractControllerCreateOffers: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contracts/${id}/offers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerUpdateOffers
     * @request PATCH:/api/contracts/{id}/offers
     * @secure
     */
    contractControllerUpdateOffers: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contracts/${id}/offers`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts
     * @name ContractControllerDeleteOffers
     * @request DELETE:/api/contracts/{id}/offers
     * @secure
     */
    contractControllerDeleteOffers: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contracts/${id}/offers`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerCreate
     * @request POST:/api/skills
     * @secure
     */
    skillControllerCreate: (data: SkillCreateInput, params: RequestParams = {}) =>
      this.request<Skill, ForbiddenException>({
        path: `/api/skills`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerFindMany
     * @request GET:/api/skills
     * @secure
     */
    skillControllerFindMany: (
      query?: { where?: SkillWhereInput; orderBy?: SkillOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListSkillDto, void>({
        path: `/api/skills`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerFindOne
     * @request GET:/api/skills/{id}
     * @secure
     */
    skillControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Skill, ForbiddenException | NotFoundException>({
        path: `/api/skills/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerUpdate
     * @request PATCH:/api/skills/{id}
     * @secure
     */
    skillControllerUpdate: (id: string, data: SkillUpdateInput, params: RequestParams = {}) =>
      this.request<Skill, ForbiddenException | NotFoundException>({
        path: `/api/skills/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerDelete
     * @request DELETE:/api/skills/{id}
     * @secure
     */
    skillControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Skill, ForbiddenException | NotFoundException>({
        path: `/api/skills/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerFindManyUsersSkills
     * @request GET:/api/skills/{id}/usersSkills
     * @secure
     */
    skillControllerFindManyUsersSkills: (
      id: string,
      query?: { id?: StringFilter; skill?: SkillWhereUniqueInput; user?: UserWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/skills/${id}/usersSkills`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerCreateUsersSkills
     * @request POST:/api/skills/{id}/usersSkills
     * @secure
     */
    skillControllerCreateUsersSkills: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/skills/${id}/usersSkills`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerUpdateUsersSkills
     * @request PATCH:/api/skills/{id}/usersSkills
     * @secure
     */
    skillControllerUpdateUsersSkills: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/skills/${id}/usersSkills`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags skills
     * @name SkillControllerDeleteUsersSkills
     * @request DELETE:/api/skills/{id}/usersSkills
     * @secure
     */
    skillControllerDeleteUsersSkills: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/skills/${id}/usersSkills`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags questions
     * @name QuestionControllerCreate
     * @request POST:/api/questions
     * @secure
     */
    questionControllerCreate: (data: QuestionCreateInput, params: RequestParams = {}) =>
      this.request<Question, ForbiddenException>({
        path: `/api/questions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags questions
     * @name QuestionControllerFindMany
     * @request GET:/api/questions
     * @secure
     */
    questionControllerFindMany: (
      query?: { where?: QuestionWhereInput; orderBy?: QuestionOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListQuestionDto, void>({
        path: `/api/questions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags questions
     * @name QuestionControllerFindOne
     * @request GET:/api/questions/{id}
     * @secure
     */
    questionControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Question, ForbiddenException | NotFoundException>({
        path: `/api/questions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags questions
     * @name QuestionControllerUpdate
     * @request PATCH:/api/questions/{id}
     * @secure
     */
    questionControllerUpdate: (id: string, data: QuestionUpdateInput, params: RequestParams = {}) =>
      this.request<Question, ForbiddenException | NotFoundException>({
        path: `/api/questions/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags questions
     * @name QuestionControllerDelete
     * @request DELETE:/api/questions/{id}
     * @secure
     */
    questionControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Question, ForbiddenException | NotFoundException>({
        path: `/api/questions/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerCreate
     * @request POST:/api/question-types
     * @secure
     */
    questionTypeControllerCreate: (data: QuestionTypeCreateInput, params: RequestParams = {}) =>
      this.request<QuestionType, ForbiddenException>({
        path: `/api/question-types`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerFindMany
     * @request GET:/api/question-types
     * @secure
     */
    questionTypeControllerFindMany: (
      query?: { where?: QuestionTypeWhereInput; orderBy?: QuestionTypeOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListQuestionTypeDto, void>({
        path: `/api/question-types`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerFindOne
     * @request GET:/api/question-types/{id}
     * @secure
     */
    questionTypeControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<QuestionType, ForbiddenException | NotFoundException>({
        path: `/api/question-types/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerUpdate
     * @request PATCH:/api/question-types/{id}
     * @secure
     */
    questionTypeControllerUpdate: (id: string, data: QuestionTypeUpdateInput, params: RequestParams = {}) =>
      this.request<QuestionType, ForbiddenException | NotFoundException>({
        path: `/api/question-types/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerDelete
     * @request DELETE:/api/question-types/{id}
     * @secure
     */
    questionTypeControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<QuestionType, ForbiddenException | NotFoundException>({
        path: `/api/question-types/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerFindManyQuestions
     * @request GET:/api/question-types/{id}/questions
     * @secure
     */
    questionTypeControllerFindManyQuestions: (
      id: string,
      query?: {
        id?: StringFilter;
        title?: StringNullableFilter;
        description?: StringNullableFilter;
        questionType?: QuestionTypeWhereUniqueInput;
        offer?: OfferWhereUniqueInput;
        video?: VideoWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/question-types/${id}/questions`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerCreateQuestions
     * @request POST:/api/question-types/{id}/questions
     * @secure
     */
    questionTypeControllerCreateQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/question-types/${id}/questions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerUpdateQuestions
     * @request PATCH:/api/question-types/{id}/questions
     * @secure
     */
    questionTypeControllerUpdateQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/question-types/${id}/questions`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-types
     * @name QuestionTypeControllerDeleteQuestions
     * @request DELETE:/api/question-types/{id}/questions
     * @secure
     */
    questionTypeControllerDeleteQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/question-types/${id}/questions`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags feedbacks
     * @name FeedbackControllerGetStoriesMediaData
     * @request GET:/api/feedbacks/applyed/candidates
     * @secure
     */
    feedbackControllerGetStoriesMediaData: (
      query?: { where?: FeedbackWhereInput; orderBy?: FeedbackOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListFeedbackDto, void>({
        path: `/api/feedbacks/applyed/candidates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags feedbacks
     * @name FeedbackControllerCreate
     * @request POST:/api/feedbacks
     * @secure
     */
    feedbackControllerCreate: (data: FeedbackCreateInput, params: RequestParams = {}) =>
      this.request<Feedback, ForbiddenException>({
        path: `/api/feedbacks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags feedbacks
     * @name FeedbackControllerFindMany
     * @request GET:/api/feedbacks
     * @secure
     */
    feedbackControllerFindMany: (
      query?: { where?: FeedbackWhereInput; orderBy?: FeedbackOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListFeedbackDto, void>({
        path: `/api/feedbacks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags feedbacks
     * @name FeedbackControllerFindOne
     * @request GET:/api/feedbacks/{id}
     * @secure
     */
    feedbackControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Feedback, ForbiddenException | NotFoundException>({
        path: `/api/feedbacks/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags feedbacks
     * @name FeedbackControllerUpdate
     * @request PATCH:/api/feedbacks/{id}
     * @secure
     */
    feedbackControllerUpdate: (id: string, data: FeedbackUpdateInput, params: RequestParams = {}) =>
      this.request<Feedback, ForbiddenException | NotFoundException>({
        path: `/api/feedbacks/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags feedbacks
     * @name FeedbackControllerDelete
     * @request DELETE:/api/feedbacks/{id}
     * @secure
     */
    feedbackControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Feedback, ForbiddenException | NotFoundException>({
        path: `/api/feedbacks/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CommentControllerCreate
     * @request POST:/api/comments
     * @secure
     */
    commentControllerCreate: (data: CommentCreateInput, params: RequestParams = {}) =>
      this.request<Comment, ForbiddenException>({
        path: `/api/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CommentControllerFindMany
     * @request GET:/api/comments
     * @secure
     */
    commentControllerFindMany: (
      query?: { where?: CommentWhereInput; orderBy?: CommentOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListCommentDto, void>({
        path: `/api/comments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CommentControllerFindOne
     * @request GET:/api/comments/{id}
     * @secure
     */
    commentControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Comment, ForbiddenException | NotFoundException>({
        path: `/api/comments/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CommentControllerUpdate
     * @request PATCH:/api/comments/{id}
     * @secure
     */
    commentControllerUpdate: (id: string, data: CommentUpdateInput, params: RequestParams = {}) =>
      this.request<Comment, ForbiddenException | NotFoundException>({
        path: `/api/comments/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CommentControllerDelete
     * @request DELETE:/api/comments/{id}
     * @secure
     */
    commentControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Comment, ForbiddenException | NotFoundException>({
        path: `/api/comments/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerGetCommunityPosts
     * @request GET:/api/communities/GetCommunityPosts
     * @secure
     */
    communityControllerGetCommunityPosts: (
      query?: { where?: CommunityPostsWhereUniqueInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<ListCommunityPosts, void>({
        path: `/api/communities/GetCommunityPosts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerCreate
     * @request POST:/api/communities
     * @secure
     */
    communityControllerCreate: (data: CommunityCreateInput, params: RequestParams = {}) =>
      this.request<Community, ForbiddenException>({
        path: `/api/communities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerFindMany
     * @request GET:/api/communities
     * @secure
     */
    communityControllerFindMany: (
      query?: { where?: CommunityWhereInput; orderBy?: CommunityOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListCommunityDto, void>({
        path: `/api/communities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerFindOne
     * @request GET:/api/communities/{id}
     * @secure
     */
    communityControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Community, ForbiddenException | NotFoundException>({
        path: `/api/communities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerUpdate
     * @request PATCH:/api/communities/{id}
     * @secure
     */
    communityControllerUpdate: (id: string, data: CommunityUpdateInput, params: RequestParams = {}) =>
      this.request<Community, ForbiddenException | NotFoundException>({
        path: `/api/communities/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerDelete
     * @request DELETE:/api/communities/{id}
     * @secure
     */
    communityControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Community, ForbiddenException | NotFoundException>({
        path: `/api/communities/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerFindManyOffersOnCommunities
     * @request GET:/api/communities/{id}/offersOnCommunities
     * @secure
     */
    communityControllerFindManyOffersOnCommunities: (
      id: string,
      query?: { id?: StringFilter; offer?: OfferWhereUniqueInput; community?: CommunityWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/communities/${id}/offersOnCommunities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerCreateOffersOnCommunities
     * @request POST:/api/communities/{id}/offersOnCommunities
     * @secure
     */
    communityControllerCreateOffersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/offersOnCommunities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerUpdateOffersOnCommunities
     * @request PATCH:/api/communities/{id}/offersOnCommunities
     * @secure
     */
    communityControllerUpdateOffersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/offersOnCommunities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerDeleteOffersOnCommunities
     * @request DELETE:/api/communities/{id}/offersOnCommunities
     * @secure
     */
    communityControllerDeleteOffersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/offersOnCommunities`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerFindManyPublicationsOnCommunities
     * @request GET:/api/communities/{id}/publicationsOnCommunities
     * @secure
     */
    communityControllerFindManyPublicationsOnCommunities: (
      id: string,
      query?: { id?: StringFilter; publication?: PublicationWhereUniqueInput; community?: CommunityWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/communities/${id}/publicationsOnCommunities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerCreatePublicationsOnCommunities
     * @request POST:/api/communities/{id}/publicationsOnCommunities
     * @secure
     */
    communityControllerCreatePublicationsOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/publicationsOnCommunities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerUpdatePublicationsOnCommunities
     * @request PATCH:/api/communities/{id}/publicationsOnCommunities
     * @secure
     */
    communityControllerUpdatePublicationsOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/publicationsOnCommunities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerDeletePublicationsOnCommunities
     * @request DELETE:/api/communities/{id}/publicationsOnCommunities
     * @secure
     */
    communityControllerDeletePublicationsOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/publicationsOnCommunities`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerFindManyUsersOnCommunities
     * @request GET:/api/communities/{id}/usersOnCommunities
     * @secure
     */
    communityControllerFindManyUsersOnCommunities: (
      id: string,
      query?: { id?: StringFilter; community?: CommunityWhereUniqueInput; user?: UserWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/communities/${id}/usersOnCommunities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerCreateUsersOnCommunities
     * @request POST:/api/communities/{id}/usersOnCommunities
     * @secure
     */
    communityControllerCreateUsersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/usersOnCommunities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerUpdateUsersOnCommunities
     * @request PATCH:/api/communities/{id}/usersOnCommunities
     * @secure
     */
    communityControllerUpdateUsersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/usersOnCommunities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerDeleteUsersOnCommunities
     * @request DELETE:/api/communities/{id}/usersOnCommunities
     * @secure
     */
    communityControllerDeleteUsersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/usersOnCommunities`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerFindManyEntreprisesOnCommunities
     * @request GET:/api/communities/{id}/entreprisesOnCommunities
     * @secure
     */
    communityControllerFindManyEntreprisesOnCommunities: (
      id: string,
      query?: { id?: StringFilter; entreprise?: EntrepriseWhereUniqueInput; community?: CommunityWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/communities/${id}/entreprisesOnCommunities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerCreateEntreprisesOnCommunities
     * @request POST:/api/communities/{id}/entreprisesOnCommunities
     * @secure
     */
    communityControllerCreateEntreprisesOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/entreprisesOnCommunities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerUpdateEntreprisesOnCommunities
     * @request PATCH:/api/communities/{id}/entreprisesOnCommunities
     * @secure
     */
    communityControllerUpdateEntreprisesOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/entreprisesOnCommunities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags communities
     * @name CommunityControllerDeleteEntreprisesOnCommunities
     * @request DELETE:/api/communities/{id}/entreprisesOnCommunities
     * @secure
     */
    communityControllerDeleteEntreprisesOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/communities/${id}/entreprisesOnCommunities`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers-on-communities
     * @name OffersOnCommunityControllerCreate
     * @request POST:/api/offers-on-communities
     * @secure
     */
    offersOnCommunityControllerCreate: (data: OffersOnCommunityCreateInput, params: RequestParams = {}) =>
      this.request<OffersOnCommunity, ForbiddenException>({
        path: `/api/offers-on-communities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers-on-communities
     * @name OffersOnCommunityControllerFindMany
     * @request GET:/api/offers-on-communities
     * @secure
     */
    offersOnCommunityControllerFindMany: (
      query?: {
        where?: OffersOnCommunityWhereInput;
        orderBy?: OffersOnCommunityOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListOffersOnCommunityDto, void>({
        path: `/api/offers-on-communities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers-on-communities
     * @name OffersOnCommunityControllerFindOne
     * @request GET:/api/offers-on-communities/{id}
     * @secure
     */
    offersOnCommunityControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<OffersOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/offers-on-communities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers-on-communities
     * @name OffersOnCommunityControllerUpdate
     * @request PATCH:/api/offers-on-communities/{id}
     * @secure
     */
    offersOnCommunityControllerUpdate: (id: string, data: OffersOnCommunityUpdateInput, params: RequestParams = {}) =>
      this.request<OffersOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/offers-on-communities/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers-on-communities
     * @name OffersOnCommunityControllerDelete
     * @request DELETE:/api/offers-on-communities/{id}
     * @secure
     */
    offersOnCommunityControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<OffersOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/offers-on-communities/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerCreate
     * @request POST:/api/publications
     * @secure
     */
    publicationControllerCreate: (data: PublicationCreateInput, params: RequestParams = {}) =>
      this.request<Publication, ForbiddenException>({
        path: `/api/publications`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerFindMany
     * @request GET:/api/publications
     * @secure
     */
    publicationControllerFindMany: (
      query?: { where?: PublicationWhereInput; orderBy?: PublicationOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListPublicationDto, void>({
        path: `/api/publications`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerFindOne
     * @request GET:/api/publications/{id}
     * @secure
     */
    publicationControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Publication, ForbiddenException | NotFoundException>({
        path: `/api/publications/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerUpdate
     * @request PATCH:/api/publications/{id}
     * @secure
     */
    publicationControllerUpdate: (id: string, data: PublicationUpdateInput, params: RequestParams = {}) =>
      this.request<Publication, ForbiddenException | NotFoundException>({
        path: `/api/publications/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerDelete
     * @request DELETE:/api/publications/{id}
     * @secure
     */
    publicationControllerDelete: (id: string, data: PublicationUpdateInput, params: RequestParams = {}) =>
      this.request<Publication, ForbiddenException | NotFoundException>({
        path: `/api/publications/${id}`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerFindManyPublicationsOnCommunities
     * @request GET:/api/publications/{id}/publicationsOnCommunities
     * @secure
     */
    publicationControllerFindManyPublicationsOnCommunities: (
      id: string,
      query?: { id?: StringFilter; publication?: PublicationWhereUniqueInput; community?: CommunityWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/publications/${id}/publicationsOnCommunities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerCreatePublicationsOnCommunities
     * @request POST:/api/publications/{id}/publicationsOnCommunities
     * @secure
     */
    publicationControllerCreatePublicationsOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/publications/${id}/publicationsOnCommunities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerUpdatePublicationsOnCommunities
     * @request PATCH:/api/publications/{id}/publicationsOnCommunities
     * @secure
     */
    publicationControllerUpdatePublicationsOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/publications/${id}/publicationsOnCommunities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerDeletePublicationsOnCommunities
     * @request DELETE:/api/publications/{id}/publicationsOnCommunities
     * @secure
     */
    publicationControllerDeletePublicationsOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/publications/${id}/publicationsOnCommunities`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerFindManySocialinterractions
     * @request GET:/api/publications/{id}/socialinterractions
     * @secure
     */
    publicationControllerFindManySocialinterractions: (
      id: string,
      query?: {
        id?: StringFilter;
        type?: StringNullableFilter;
        publication?: PublicationWhereUniqueInput;
        user?: UserWhereUniqueInput;
        isactive?: boolean;
        label?: string;
        entrepriseId?: string;
        createdAt?: StringFilter;
        offerId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/publications/${id}/socialinterractions`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerCreateSocialinterractions
     * @request POST:/api/publications/{id}/socialinterractions
     * @secure
     */
    publicationControllerCreateSocialinterractions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/publications/${id}/socialinterractions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerUpdateSocialinterractions
     * @request PATCH:/api/publications/{id}/socialinterractions
     * @secure
     */
    publicationControllerUpdateSocialinterractions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/publications/${id}/socialinterractions`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications
     * @name PublicationControllerDeleteSocialinterractions
     * @request DELETE:/api/publications/{id}/socialinterractions
     * @secure
     */
    publicationControllerDeleteSocialinterractions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/publications/${id}/socialinterractions`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications-on-communities
     * @name PublicationsOnCommunityControllerCreate
     * @request POST:/api/publications-on-communities
     * @secure
     */
    publicationsOnCommunityControllerCreate: (data: PublicationsOnCommunityCreateInput, params: RequestParams = {}) =>
      this.request<PublicationsOnCommunity, ForbiddenException>({
        path: `/api/publications-on-communities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications-on-communities
     * @name PublicationsOnCommunityControllerFindMany
     * @request GET:/api/publications-on-communities
     * @secure
     */
    publicationsOnCommunityControllerFindMany: (
      query?: {
        where?: PublicationsOnCommunityWhereInput;
        orderBy?: PublicationsOnCommunityOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListPublicationsOnCommunityDto, void>({
        path: `/api/publications-on-communities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications-on-communities
     * @name PublicationsOnCommunityControllerFindOne
     * @request GET:/api/publications-on-communities/{id}
     * @secure
     */
    publicationsOnCommunityControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<PublicationsOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/publications-on-communities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications-on-communities
     * @name PublicationsOnCommunityControllerUpdate
     * @request PATCH:/api/publications-on-communities/{id}
     * @secure
     */
    publicationsOnCommunityControllerUpdate: (
      id: string,
      data: PublicationsOnCommunityUpdateInput,
      params: RequestParams = {},
    ) =>
      this.request<PublicationsOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/publications-on-communities/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags publications-on-communities
     * @name PublicationsOnCommunityControllerDelete
     * @request DELETE:/api/publications-on-communities/{id}
     * @secure
     */
    publicationsOnCommunityControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<PublicationsOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/publications-on-communities/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventControllerCandidateCommunityView
     * @request GET:/api/events/events/upcoming
     * @secure
     */
    eventControllerCandidateCommunityView: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/events/events/upcoming`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventControllerGetVideosMediaInterraction
     * @request GET:/api/events/SubscribedEvents/Notification
     * @secure
     */
    eventControllerGetVideosMediaInterraction: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/events/SubscribedEvents/Notification`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventControllerCreate
     * @request POST:/api/events
     * @secure
     */
    eventControllerCreate: (data: EventCreateInput, params: RequestParams = {}) =>
      this.request<Event, ForbiddenException>({
        path: `/api/events`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventControllerFindMany
     * @request GET:/api/events
     * @secure
     */
    eventControllerFindMany: (
      query?: { where?: EventWhereInput; orderBy?: EventOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListEventDto, void>({
        path: `/api/events`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventControllerFindOne
     * @request GET:/api/events/{id}
     * @secure
     */
    eventControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Event, ForbiddenException | NotFoundException>({
        path: `/api/events/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventControllerUpdate
     * @request PATCH:/api/events/{id}
     * @secure
     */
    eventControllerUpdate: (id: string, data: EventUpdateInput, params: RequestParams = {}) =>
      this.request<Event, ForbiddenException | NotFoundException>({
        path: `/api/events/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventControllerDelete
     * @request DELETE:/api/events/{id}
     * @secure
     */
    eventControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Event, ForbiddenException | NotFoundException>({
        path: `/api/events/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name PostControllerCreate
     * @request POST:/api/posts
     * @secure
     */
    postControllerCreate: (data: PostCreateInput, params: RequestParams = {}) =>
      this.request<Post, ForbiddenException>({
        path: `/api/posts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name PostControllerFindMany
     * @request GET:/api/posts
     * @secure
     */
    postControllerFindMany: (
      query?: { where?: PostWhereInput; orderBy?: PostOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListPostDto, void>({
        path: `/api/posts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name PostControllerFindOne
     * @request GET:/api/posts/{id}
     * @secure
     */
    postControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Post, ForbiddenException | NotFoundException>({
        path: `/api/posts/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name PostControllerUpdate
     * @request PATCH:/api/posts/{id}
     * @secure
     */
    postControllerUpdate: (id: string, data: PostUpdateInput, params: RequestParams = {}) =>
      this.request<Post, ForbiddenException | NotFoundException>({
        path: `/api/posts/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags posts
     * @name PostControllerDelete
     * @request DELETE:/api/posts/{id}
     * @secure
     */
    postControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Post, ForbiddenException | NotFoundException>({
        path: `/api/posts/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerApplyedOffersNotification
     * @request GET:/api/offers/EnrolledOffers/Notification
     * @secure
     */
    offerControllerApplyedOffersNotification: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/offers/EnrolledOffers/Notification`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerCreate
     * @request POST:/api/offers
     * @secure
     */
    offerControllerCreate: (data: OfferCreateInput, params: RequestParams = {}) =>
      this.request<Offer, ForbiddenException>({
        path: `/api/offers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerFindMany
     * @request GET:/api/offers
     * @secure
     */
    offerControllerFindMany: (
      query?: { where?: OfferWhereInput; orderBy?: OfferOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListOfferDto, void>({
        path: `/api/offers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerFindOne
     * @request GET:/api/offers/{id}
     * @secure
     */
    offerControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Offer, ForbiddenException | NotFoundException>({
        path: `/api/offers/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerUpdate
     * @request PATCH:/api/offers/{id}
     * @secure
     */
    offerControllerUpdate: (id: string, data: OfferUpdateInput, params: RequestParams = {}) =>
      this.request<Offer, ForbiddenException | NotFoundException>({
        path: `/api/offers/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerDelete
     * @request DELETE:/api/offers/{id}
     * @secure
     */
    offerControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Offer, ForbiddenException | NotFoundException>({
        path: `/api/offers/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerFindManyQuestions
     * @request GET:/api/offers/{id}/questions
     * @secure
     */
    offerControllerFindManyQuestions: (
      id: string,
      query?: {
        id?: StringFilter;
        title?: StringNullableFilter;
        description?: StringNullableFilter;
        questionType?: QuestionTypeWhereUniqueInput;
        offer?: OfferWhereUniqueInput;
        video?: VideoWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/offers/${id}/questions`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerCreateQuestions
     * @request POST:/api/offers/{id}/questions
     * @secure
     */
    offerControllerCreateQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/questions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerUpdateQuestions
     * @request PATCH:/api/offers/{id}/questions
     * @secure
     */
    offerControllerUpdateQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/questions`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerDeleteQuestions
     * @request DELETE:/api/offers/{id}/questions
     * @secure
     */
    offerControllerDeleteQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/questions`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerFindManyFeedbacks
     * @request GET:/api/offers/{id}/feedbacks
     * @secure
     */
    offerControllerFindManyFeedbacks: (
      id: string,
      query?: {
        id?: StringFilter;
        contenu?: StringNullableFilter;
        statue?: StringNullableFilter;
        type?: StringNullableFilter;
        offerid?: string;
        user?: UserWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/offers/${id}/feedbacks`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerCreateFeedbacks
     * @request POST:/api/offers/{id}/feedbacks
     * @secure
     */
    offerControllerCreateFeedbacks: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/feedbacks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerUpdateFeedbacks
     * @request PATCH:/api/offers/{id}/feedbacks
     * @secure
     */
    offerControllerUpdateFeedbacks: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/feedbacks`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerDeleteFeedbacks
     * @request DELETE:/api/offers/{id}/feedbacks
     * @secure
     */
    offerControllerDeleteFeedbacks: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/feedbacks`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerFindManyOffersOnCommunities
     * @request GET:/api/offers/{id}/offersOnCommunities
     * @secure
     */
    offerControllerFindManyOffersOnCommunities: (
      id: string,
      query?: { id?: StringFilter; offer?: OfferWhereUniqueInput; community?: CommunityWhereUniqueInput },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/offers/${id}/offersOnCommunities`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerCreateOffersOnCommunities
     * @request POST:/api/offers/{id}/offersOnCommunities
     * @secure
     */
    offerControllerCreateOffersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/offersOnCommunities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerUpdateOffersOnCommunities
     * @request PATCH:/api/offers/{id}/offersOnCommunities
     * @secure
     */
    offerControllerUpdateOffersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/offersOnCommunities`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerDeleteOffersOnCommunities
     * @request DELETE:/api/offers/{id}/offersOnCommunities
     * @secure
     */
    offerControllerDeleteOffersOnCommunities: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/offers/${id}/offersOnCommunities`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OfferControllerDuplicateOffer
     * @request POST:/api/offers/duplicate/{id}
     * @secure
     */
    offerControllerDuplicateOffer: (id: string, data: PublicationCreateInput, params: RequestParams = {}) =>
      this.request<Offer, ForbiddenException>({
        path: `/api/offers/duplicate/${id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stories
     * @name StoryControllerCreate
     * @request POST:/api/stories
     * @secure
     */
    storyControllerCreate: (data: StoryCreateInput, params: RequestParams = {}) =>
      this.request<Story, ForbiddenException>({
        path: `/api/stories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stories
     * @name StoryControllerFindMany
     * @request GET:/api/stories
     * @secure
     */
    storyControllerFindMany: (
      query?: { where?: StoryWhereInput; orderBy?: StoryOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListStoryDto, void>({
        path: `/api/stories`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stories
     * @name StoryControllerFindOne
     * @request GET:/api/stories/{id}
     * @secure
     */
    storyControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Story, ForbiddenException | NotFoundException>({
        path: `/api/stories/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stories
     * @name StoryControllerUpdate
     * @request PATCH:/api/stories/{id}
     * @secure
     */
    storyControllerUpdate: (id: string, data: StoryUpdateInput, params: RequestParams = {}) =>
      this.request<Story, ForbiddenException | NotFoundException>({
        path: `/api/stories/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stories
     * @name StoryControllerDelete
     * @request DELETE:/api/stories/{id}
     * @secure
     */
    storyControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Story, ForbiddenException | NotFoundException>({
        path: `/api/stories/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerCloudFlareUploadVideo
     * @request POST:/api/videos/upload
     * @secure
     */
    videoControllerCloudFlareUploadVideo: (data: { file?: File }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/videos/upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerCreate
     * @request POST:/api/videos
     * @secure
     */
    videoControllerCreate: (data: VideoCreateInput, params: RequestParams = {}) =>
      this.request<Video, ForbiddenException>({
        path: `/api/videos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerFindMany
     * @request GET:/api/videos
     * @secure
     */
    videoControllerFindMany: (
      query?: { where?: VideoWhereInput; orderBy?: VideoOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListVideoDto, void>({
        path: `/api/videos`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerFindOne
     * @request GET:/api/videos/{id}
     * @secure
     */
    videoControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Video, ForbiddenException | NotFoundException>({
        path: `/api/videos/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerUpdate
     * @request PATCH:/api/videos/{id}
     * @secure
     */
    videoControllerUpdate: (id: string, data: VideoUpdateInput, params: RequestParams = {}) =>
      this.request<Video, ForbiddenException | NotFoundException>({
        path: `/api/videos/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerDelete
     * @request DELETE:/api/videos/{id}
     * @secure
     */
    videoControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Video, ForbiddenException | NotFoundException>({
        path: `/api/videos/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerFindManyQuestions
     * @request GET:/api/videos/{id}/questions
     * @secure
     */
    videoControllerFindManyQuestions: (
      id: string,
      query?: {
        id?: StringFilter;
        title?: StringNullableFilter;
        description?: StringNullableFilter;
        questionType?: QuestionTypeWhereUniqueInput;
        offer?: OfferWhereUniqueInput;
        video?: VideoWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/videos/${id}/questions`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerCreateQuestions
     * @request POST:/api/videos/{id}/questions
     * @secure
     */
    videoControllerCreateQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/videos/${id}/questions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerUpdateQuestions
     * @request PATCH:/api/videos/{id}/questions
     * @secure
     */
    videoControllerUpdateQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/videos/${id}/questions`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags videos
     * @name VideoControllerDeleteQuestions
     * @request DELETE:/api/videos/{id}/questions
     * @secure
     */
    videoControllerDeleteQuestions: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/videos/${id}/questions`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerCreate
     * @request POST:/api/categories
     * @secure
     */
    categoryControllerCreate: (data: CategoryCreateInput, params: RequestParams = {}) =>
      this.request<Category, ForbiddenException>({
        path: `/api/categories`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerFindMany
     * @request GET:/api/categories
     * @secure
     */
    categoryControllerFindMany: (
      query?: { where?: CategoryWhereInput; orderBy?: CategoryOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListCategoryDto, void>({
        path: `/api/categories`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerFindOne
     * @request GET:/api/categories/{id}
     * @secure
     */
    categoryControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Category, ForbiddenException | NotFoundException>({
        path: `/api/categories/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerUpdate
     * @request PATCH:/api/categories/{id}
     * @secure
     */
    categoryControllerUpdate: (id: string, data: CategoryUpdateInput, params: RequestParams = {}) =>
      this.request<Category, ForbiddenException | NotFoundException>({
        path: `/api/categories/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerDelete
     * @request DELETE:/api/categories/{id}
     * @secure
     */
    categoryControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Category, ForbiddenException | NotFoundException>({
        path: `/api/categories/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerFindManyVideos
     * @request GET:/api/categories/{id}/videos
     * @secure
     */
    categoryControllerFindManyVideos: (
      id: string,
      query?: {
        id?: StringFilter;
        category?: CategoryWhereUniqueInput;
        publication?: PublicationWhereUniqueInput;
        entreprise?: EntrepriseWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/categories/${id}/videos`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerCreateVideos
     * @request POST:/api/categories/{id}/videos
     * @secure
     */
    categoryControllerCreateVideos: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/categories/${id}/videos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerUpdateVideos
     * @request PATCH:/api/categories/{id}/videos
     * @secure
     */
    categoryControllerUpdateVideos: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/categories/${id}/videos`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CategoryControllerDeleteVideos
     * @request DELETE:/api/categories/{id}/videos
     * @secure
     */
    categoryControllerDeleteVideos: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/categories/${id}/videos`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerCreate
     * @request POST:/api/jobs
     * @secure
     */
    jobControllerCreate: (data: JobCreateInput, params: RequestParams = {}) =>
      this.request<Job, ForbiddenException>({
        path: `/api/jobs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerFindMany
     * @request GET:/api/jobs
     * @secure
     */
    jobControllerFindMany: (
      query?: { where?: JobWhereInput; orderBy?: JobOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListJobDto, void>({
        path: `/api/jobs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerFindOne
     * @request GET:/api/jobs/{id}
     * @secure
     */
    jobControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Job, ForbiddenException | NotFoundException>({
        path: `/api/jobs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerUpdate
     * @request PATCH:/api/jobs/{id}
     * @secure
     */
    jobControllerUpdate: (id: string, data: JobUpdateInput, params: RequestParams = {}) =>
      this.request<Job, ForbiddenException | NotFoundException>({
        path: `/api/jobs/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerDelete
     * @request DELETE:/api/jobs/{id}
     * @secure
     */
    jobControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Job, ForbiddenException | NotFoundException>({
        path: `/api/jobs/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerFindManyCandidates
     * @request GET:/api/jobs/{id}/candidates
     * @secure
     */
    jobControllerFindManyCandidates: (
      id: string,
      query?: {
        id?: StringFilter;
        activityField?: StringNullableFilter;
        wantedPost?: StringNullableFilter;
        experiencesYears?: IntNullableFilter;
        languages?: StringNullableFilter;
        tags?: StringNullableFilter;
        maxSalary?: FloatNullableFilter;
        minSalary?: FloatNullableFilter;
        personalCv?: StringNullableFilter;
        mediaLink?: StringNullableFilter;
        job?: JobWhereUniqueInput;
        user?: UserWhereUniqueInput;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/jobs/${id}/candidates`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerCreateCandidates
     * @request POST:/api/jobs/{id}/candidates
     * @secure
     */
    jobControllerCreateCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/jobs/${id}/candidates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerUpdateCandidates
     * @request PATCH:/api/jobs/{id}/candidates
     * @secure
     */
    jobControllerUpdateCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/jobs/${id}/candidates`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags jobs
     * @name JobControllerDeleteCandidates
     * @request DELETE:/api/jobs/{id}/candidates
     * @secure
     */
    jobControllerDeleteCandidates: (id: string, data: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/jobs/${id}/candidates`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetStoriesMediaData
     * @request GET:/api/socialinterractions/Stories/GetData
     * @secure
     */
    socialinterractionControllerGetStoriesMediaData: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/Stories/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetPostsMediaInterraction
     * @request GET:/api/socialinterractions/Posts/GetData
     * @secure
     */
    socialinterractionControllerGetPostsMediaInterraction: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/Posts/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetVideosMediaInterraction
     * @request GET:/api/socialinterractions/Videos/GetData
     * @secure
     */
    socialinterractionControllerGetVideosMediaInterraction: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/Videos/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetEventsMediaData
     * @request GET:/api/socialinterractions/Event/GetData
     * @secure
     */
    socialinterractionControllerGetEventsMediaData: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/Event/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerOffersView
     * @request GET:/api/socialinterractions/Offers/GetData
     * @secure
     */
    socialinterractionControllerOffersView: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/Offers/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetRetcheeDataStatesPerMonth
     * @request GET:/api/socialinterractions/RetcheeStates/PerMonth/GetData
     * @secure
     */
    socialinterractionControllerGetRetcheeDataStatesPerMonth: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/RetcheeStates/PerMonth/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetRetcheeDataStatesPerYear
     * @request GET:/api/socialinterractions/RetcheeStates/PerYear/GetData
     * @secure
     */
    socialinterractionControllerGetRetcheeDataStatesPerYear: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/RetcheeStates/PerYear/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetRetcheeDataStatesPerDay
     * @request GET:/api/socialinterractions/RetcheeStates/PerDay/GetData
     * @secure
     */
    socialinterractionControllerGetRetcheeDataStatesPerDay: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/RetcheeStates/PerDay/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetRetcheeDataStatesPerWeek
     * @request GET:/api/socialinterractions/RetcheeStates/PerWeek/GetData
     * @secure
     */
    socialinterractionControllerGetRetcheeDataStatesPerWeek: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/RetcheeStates/PerWeek/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerGetUserLikes
     * @request GET:/api/socialinterractions/GetUserLikesView/GetData
     * @secure
     */
    socialinterractionControllerGetUserLikes: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/GetUserLikesView/GetData`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerSocialinterractionNotification
     * @request GET:/api/socialinterractions/Notifications
     * @secure
     */
    socialinterractionControllerSocialinterractionNotification: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions/Notifications`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerSocialinterractionOnPublications
     * @request GET:/api/socialinterractions/publication/{id}
     * @secure
     */
    socialinterractionControllerSocialinterractionOnPublications: (id: string, params: RequestParams = {}) =>
      this.request<Socialinterraction, ForbiddenException | NotFoundException>({
        path: `/api/socialinterractions/publication/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerSocialinterractionStoriesVideosEventsLisForEachCandidate
     * @request GET:/api/socialinterractions/publication/Events/{id}
     * @secure
     */
    socialinterractionControllerSocialinterractionStoriesVideosEventsLisForEachCandidate: (
      id: string,
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Socialinterraction, ForbiddenException | NotFoundException>({
        path: `/api/socialinterractions/publication/Events/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerSocialinterractionStories
     * @request GET:/api/socialinterractions/publication/Stories/{id}
     * @secure
     */
    socialinterractionControllerSocialinterractionStories: (
      id: string,
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Socialinterraction, ForbiddenException | NotFoundException>({
        path: `/api/socialinterractions/publication/Stories/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerSocialinterractionVideos
     * @request GET:/api/socialinterractions/publication/videos/{id}
     * @secure
     */
    socialinterractionControllerSocialinterractionVideos: (
      id: string,
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Socialinterraction, ForbiddenException | NotFoundException>({
        path: `/api/socialinterractions/publication/videos/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerCreate
     * @request POST:/api/socialinterractions
     * @secure
     */
    socialinterractionControllerCreate: (data: SocialinterractionCreateInput, params: RequestParams = {}) =>
      this.request<Socialinterraction, ForbiddenException>({
        path: `/api/socialinterractions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerFindMany
     * @request GET:/api/socialinterractions
     * @secure
     */
    socialinterractionControllerFindMany: (
      query?: {
        where?: SocialinterractionWhereInput;
        orderBy?: SocialinterractionOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListSocialinterractionDto, void>({
        path: `/api/socialinterractions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerFindOne
     * @request GET:/api/socialinterractions/{id}
     * @secure
     */
    socialinterractionControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Socialinterraction, ForbiddenException | NotFoundException>({
        path: `/api/socialinterractions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerUpdate
     * @request PATCH:/api/socialinterractions/{id}
     * @secure
     */
    socialinterractionControllerUpdate: (id: string, data: SocialinterractionUpdateInput, params: RequestParams = {}) =>
      this.request<Socialinterraction, ForbiddenException | NotFoundException>({
        path: `/api/socialinterractions/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags socialinterractions
     * @name SocialinterractionControllerDelete
     * @request DELETE:/api/socialinterractions/{id}
     * @secure
     */
    socialinterractionControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<Socialinterraction, ForbiddenException | NotFoundException>({
        path: `/api/socialinterractions/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-skills
     * @name UsersSkillControllerCreate
     * @request POST:/api/users-skills
     * @secure
     */
    usersSkillControllerCreate: (data: UsersSkillCreateInput, params: RequestParams = {}) =>
      this.request<UsersSkill, ForbiddenException>({
        path: `/api/users-skills`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-skills
     * @name UsersSkillControllerFindMany
     * @request GET:/api/users-skills
     * @secure
     */
    usersSkillControllerFindMany: (
      query?: { where?: UsersSkillWhereInput; orderBy?: UsersSkillOrderByInput; skip?: number; take?: number },
      params: RequestParams = {},
    ) =>
      this.request<GetListUsersSkillDto, void>({
        path: `/api/users-skills`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-skills
     * @name UsersSkillControllerFindOne
     * @request GET:/api/users-skills/{id}
     * @secure
     */
    usersSkillControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UsersSkill, ForbiddenException | NotFoundException>({
        path: `/api/users-skills/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-skills
     * @name UsersSkillControllerUpdate
     * @request PATCH:/api/users-skills/{id}
     * @secure
     */
    usersSkillControllerUpdate: (id: string, data: UsersSkillUpdateInput, params: RequestParams = {}) =>
      this.request<UsersSkill, ForbiddenException | NotFoundException>({
        path: `/api/users-skills/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-skills
     * @name UsersSkillControllerDelete
     * @request DELETE:/api/users-skills/{id}
     * @secure
     */
    usersSkillControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<UsersSkill, ForbiddenException | NotFoundException>({
        path: `/api/users-skills/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-communities
     * @name UsersOnCommunityControllerAllPostsOnCommunityWithLikedPosts
     * @request GET:/api/users-on-communities/communityPostsWithLikedPosts/{id}
     * @secure
     */
    usersOnCommunityControllerAllPostsOnCommunityWithLikedPosts: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users-on-communities/communityPostsWithLikedPosts/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-communities
     * @name UsersOnCommunityControllerCreate
     * @request POST:/api/users-on-communities
     * @secure
     */
    usersOnCommunityControllerCreate: (data: UsersOnCommunityCreateInput, params: RequestParams = {}) =>
      this.request<UsersOnCommunity, ForbiddenException>({
        path: `/api/users-on-communities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-communities
     * @name UsersOnCommunityControllerFindMany
     * @request GET:/api/users-on-communities
     * @secure
     */
    usersOnCommunityControllerFindMany: (
      query?: {
        where?: UsersOnCommunityWhereInput;
        orderBy?: UsersOnCommunityOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListUsersOnCommunityDto, void>({
        path: `/api/users-on-communities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-communities
     * @name UsersOnCommunityControllerFindOne
     * @request GET:/api/users-on-communities/{id}
     * @secure
     */
    usersOnCommunityControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UsersOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/users-on-communities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-communities
     * @name UsersOnCommunityControllerUpdate
     * @request PATCH:/api/users-on-communities/{id}
     * @secure
     */
    usersOnCommunityControllerUpdate: (id: string, data: UsersOnCommunityUpdateInput, params: RequestParams = {}) =>
      this.request<UsersOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/users-on-communities/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-communities
     * @name UsersOnCommunityControllerDelete
     * @request DELETE:/api/users-on-communities/{id}
     * @secure
     */
    usersOnCommunityControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<UsersOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/users-on-communities/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-entreprises
     * @name UsersOnEntrepriseControllerCreate
     * @request POST:/api/users-on-entreprises
     * @secure
     */
    usersOnEntrepriseControllerCreate: (data: UsersOnEntrepriseCreateInput, params: RequestParams = {}) =>
      this.request<UsersOnEntreprise, ForbiddenException>({
        path: `/api/users-on-entreprises`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-entreprises
     * @name UsersOnEntrepriseControllerFindMany
     * @request GET:/api/users-on-entreprises
     * @secure
     */
    usersOnEntrepriseControllerFindMany: (
      query?: {
        where?: UsersOnEntrepriseWhereInput;
        orderBy?: UsersOnEntrepriseOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListUsersOnEntrepriseDto, void>({
        path: `/api/users-on-entreprises`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-entreprises
     * @name UsersOnEntrepriseControllerFindOne
     * @request GET:/api/users-on-entreprises/{id}
     * @secure
     */
    usersOnEntrepriseControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UsersOnEntreprise, ForbiddenException | NotFoundException>({
        path: `/api/users-on-entreprises/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-entreprises
     * @name UsersOnEntrepriseControllerUpdate
     * @request PATCH:/api/users-on-entreprises/{id}
     * @secure
     */
    usersOnEntrepriseControllerUpdate: (id: string, data: UsersOnEntrepriseUpdateInput, params: RequestParams = {}) =>
      this.request<UsersOnEntreprise, ForbiddenException | NotFoundException>({
        path: `/api/users-on-entreprises/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-on-entreprises
     * @name UsersOnEntrepriseControllerDelete
     * @request DELETE:/api/users-on-entreprises/{id}
     * @secure
     */
    usersOnEntrepriseControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<UsersOnEntreprise, ForbiddenException | NotFoundException>({
        path: `/api/users-on-entreprises/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises-on-communities
     * @name EntreprisesOnCommunityControllerCreate
     * @request POST:/api/entreprises-on-communities
     * @secure
     */
    entreprisesOnCommunityControllerCreate: (data: EntreprisesOnCommunityCreateInput, params: RequestParams = {}) =>
      this.request<EntreprisesOnCommunity, ForbiddenException>({
        path: `/api/entreprises-on-communities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises-on-communities
     * @name EntreprisesOnCommunityControllerFindMany
     * @request GET:/api/entreprises-on-communities
     * @secure
     */
    entreprisesOnCommunityControllerFindMany: (
      query?: {
        where?: EntreprisesOnCommunityWhereInput;
        orderBy?: EntreprisesOnCommunityOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListEntreprisesOnCommunityDto, void>({
        path: `/api/entreprises-on-communities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises-on-communities
     * @name EntreprisesOnCommunityControllerFindOne
     * @request GET:/api/entreprises-on-communities/{id}
     * @secure
     */
    entreprisesOnCommunityControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<EntreprisesOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/entreprises-on-communities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises-on-communities
     * @name EntreprisesOnCommunityControllerUpdate
     * @request PATCH:/api/entreprises-on-communities/{id}
     * @secure
     */
    entreprisesOnCommunityControllerUpdate: (
      id: string,
      data: EntreprisesOnCommunityUpdateInput,
      params: RequestParams = {},
    ) =>
      this.request<EntreprisesOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/entreprises-on-communities/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags entreprises-on-communities
     * @name EntreprisesOnCommunityControllerDelete
     * @request DELETE:/api/entreprises-on-communities/{id}
     * @secure
     */
    entreprisesOnCommunityControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<EntreprisesOnCommunity, ForbiddenException | NotFoundException>({
        path: `/api/entreprises-on-communities/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts-on-candidates
     * @name ContractsOnCandidateControllerCreate
     * @request POST:/api/contracts-on-candidates
     * @secure
     */
    contractsOnCandidateControllerCreate: (data: ContractsOnCandidateCreateInput, params: RequestParams = {}) =>
      this.request<ContractsOnCandidate, ForbiddenException>({
        path: `/api/contracts-on-candidates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts-on-candidates
     * @name ContractsOnCandidateControllerFindMany
     * @request GET:/api/contracts-on-candidates
     * @secure
     */
    contractsOnCandidateControllerFindMany: (
      query?: {
        where?: ContractsOnCandidateWhereInput;
        orderBy?: ContractsOnCandidateOrderByInput;
        skip?: number;
        take?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetListContractsOnCandidateDto, void>({
        path: `/api/contracts-on-candidates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts-on-candidates
     * @name ContractsOnCandidateControllerFindOne
     * @request GET:/api/contracts-on-candidates/{id}
     * @secure
     */
    contractsOnCandidateControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<ContractsOnCandidate, ForbiddenException | NotFoundException>({
        path: `/api/contracts-on-candidates/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts-on-candidates
     * @name ContractsOnCandidateControllerUpdate
     * @request PATCH:/api/contracts-on-candidates/{id}
     * @secure
     */
    contractsOnCandidateControllerUpdate: (
      id: string,
      data: ContractsOnCandidateUpdateInput,
      params: RequestParams = {},
    ) =>
      this.request<ContractsOnCandidate, ForbiddenException | NotFoundException>({
        path: `/api/contracts-on-candidates/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags contracts-on-candidates
     * @name ContractsOnCandidateControllerDelete
     * @request DELETE:/api/contracts-on-candidates/{id}
     * @secure
     */
    contractsOnCandidateControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<ContractsOnCandidate, ForbiddenException | NotFoundException>({
        path: `/api/contracts-on-candidates/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name HealthControllerHealthLive
     * @request GET:/api/_health/live
     */
    healthControllerHealthLive: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/_health/live`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name HealthControllerHealthReady
     * @request GET:/api/_health/ready
     */
    healthControllerHealthReady: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/_health/ready`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags image-kit
     * @name ImageKitControllerGetImageKitAuth
     * @request GET:/api/image-kit
     */
    imageKitControllerGetImageKitAuth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/image-kit`,
        method: "GET",
        ...params,
      }),
  };
}
