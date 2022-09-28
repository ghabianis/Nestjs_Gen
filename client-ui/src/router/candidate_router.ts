export const candidate_router =  {
    path: "/candidate",
    name: "candidate",
    meta: {
      requiresAuth: true,
      roles: ["admin", "candidate"],
    },
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "@/views/inscription/candidateLayout.vue"
      ),
    children: [
      {
        path: "",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            name: "home-candidate",
            path: "/",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(/* webpackChunkName: "HomePage" */ "@/views/Home.vue"),
          },
        ],
      },
      {
        path: "communityposts/:id",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/candidateLayout.vue"
          ),
        children: [
          {
            path: "",
            name: "home-community-posts",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(/* webpackChunkName: "home-community-posts" */ "@/views/communityPosts/communityPosts.vue"),
          },
        ],
      },
      {
        path: "entreprises",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/candidateLayout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-entreprise",
            component: () =>
              import(
                /* webpackChunkName: "list-entreprise" */ "@/views/main/entreprise/EntrepriseList.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-entreprise",
            component: () =>
              import(
                /* webpackChunkName: "detail-entreprise" */ "@/views/main/entreprise/candidate/EntrepriseProfile.vue"
              ),
          },
        ],
      },
      {
        path: "/followentreprises",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-followentreprise",
            component: () =>
              import(
                /* webpackChunkName: "list-followEntreprise" */ "@/views/main/followEntreprise/FollowEntrepriseList.vue"
              ),
          },
          {
            path: "create",
            name: "create-followentreprise",
            component: () =>
              import(
                /* webpackChunkName: "create-followEntreprise" */ "@/views/main/followEntreprise/FollowEntrepriseCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-followentreprise",
            component: () =>
              import(
                /* webpackChunkName: "edit-followEntreprise" */ "@/views/main/followEntreprise/FollowEntrepriseEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-followentreprise",
            component: () =>
              import(
                /* webpackChunkName: "detail-followEntreprise" */ "@/views/main/followEntreprise/FollowEntrepriseDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/entreprisesoncommunities",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-entreprisesoncommunity",
            component: () =>
              import(
                /* webpackChunkName: "list-entreprisesOnCommunity" */ "@/views/main/entreprisesOnCommunity/EntreprisesOnCommunityList.vue"
              ),
          },
          {
            path: "create",
            name: "create-entreprisesoncommunity",
            component: () =>
              import(
                /* webpackChunkName: "create-entreprisesOnCommunity" */ "@/views/main/entreprisesOnCommunity/EntreprisesOnCommunityCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-entreprisesoncommunity",
            component: () =>
              import(
                /* webpackChunkName: "edit-entreprisesOnCommunity" */ "@/views/main/entreprisesOnCommunity/EntreprisesOnCommunityEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-entreprisesoncommunity",
            component: () =>
              import(
                /* webpackChunkName: "detail-entreprisesOnCommunity" */ "@/views/main/entreprisesOnCommunity/EntreprisesOnCommunityDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/socialinterractions",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-socialinterraction",
            component: () =>
              import(
                /* webpackChunkName: "list-socialinterraction" */ "@/views/main/socialinterraction/SocialinterractionList.vue"
              ),
          },
          {
            path: "create",
            name: "create-socialinterraction",
            component: () =>
              import(
                /* webpackChunkName: "create-socialinterraction" */ "@/views/main/socialinterraction/SocialinterractionCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-socialinterraction",
            component: () =>
              import(
                /* webpackChunkName: "edit-socialinterraction" */ "@/views/main/socialinterraction/SocialinterractionEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-socialinterraction",
            component: () =>
              import(
                /* webpackChunkName: "detail-socialinterraction" */ "@/views/main/socialinterraction/SocialinterractionDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/skills",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-skill",
            component: () =>
              import(
                /* webpackChunkName: "list-skill" */ "@/views/main/skill/SkillList.vue"
              ),
          },
          {
            path: "create",
            name: "create-skill",
            component: () =>
              import(
                /* webpackChunkName: "create-skill" */ "@/views/main/skill/SkillCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-skill",
            component: () =>
              import(
                /* webpackChunkName: "edit-skill" */ "@/views/main/skill/SkillEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-skill",
            component: () =>
              import(
                /* webpackChunkName: "detail-skill" */ "@/views/main/skill/SkillDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/questions",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-question",
            component: () =>
              import(
                /* webpackChunkName: "list-question" */ "@/views/main/question/QuestionList.vue"
              ),
          },
          {
            path: "create",
            name: "create-question",
            component: () =>
              import(
                /* webpackChunkName: "create-question" */ "@/views/main/question/QuestionCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-question",
            component: () =>
              import(
                /* webpackChunkName: "edit-question" */ "@/views/main/question/QuestionEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-question",
            component: () =>
              import(
                /* webpackChunkName: "detail-question" */ "@/views/main/question/QuestionDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/questiontypes",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-questiontype",
            component: () =>
              import(
                /* webpackChunkName: "list-questionType" */ "@/views/main/questionType/QuestionTypeList.vue"
              ),
          },
          {
            path: "create",
            name: "create-questiontype",
            component: () =>
              import(
                /* webpackChunkName: "create-questionType" */ "@/views/main/questionType/QuestionTypeCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-questiontype",
            component: () =>
              import(
                /* webpackChunkName: "edit-questionType" */ "@/views/main/questionType/QuestionTypeEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-questiontype",
            component: () =>
              import(
                /* webpackChunkName: "detail-questionType" */ "@/views/main/questionType/QuestionTypeDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/feedbacks",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-feedback",
            component: () =>
              import(
                /* webpackChunkName: "list-feedback" */ "@/views/main/feedback/FeedbackList.vue"
              ),
          },
          {
            path: "create",
            name: "create-feedback",
            component: () =>
              import(
                /* webpackChunkName: "create-feedback" */ "@/views/main/feedback/FeedbackCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-feedback",
            component: () =>
              import(
                /* webpackChunkName: "edit-feedback" */ "@/views/main/feedback/FeedbackEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-feedback",
            component: () =>
              import(
                /* webpackChunkName: "detail-feedback" */ "@/views/main/feedback/FeedbackDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/comments",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-comment",
            component: () =>
              import(
                /* webpackChunkName: "list-comment" */ "@/views/main/comment/CommentList.vue"
              ),
          },
          {
            path: "create",
            name: "create-comment",
            component: () =>
              import(
                /* webpackChunkName: "create-comment" */ "@/views/main/comment/CommentCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-comment",
            component: () =>
              import(
                /* webpackChunkName: "edit-comment" */ "@/views/main/comment/CommentEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-comment",
            component: () =>
              import(
                /* webpackChunkName: "detail-comment" */ "@/views/main/comment/CommentDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/usersskills",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-usersskill",
            component: () =>
              import(
                /* webpackChunkName: "list-usersSkill" */ "@/views/main/usersSkill/UsersSkillList.vue"
              ),
          },
          {
            path: "create",
            name: "create-usersskill",
            component: () =>
              import(
                /* webpackChunkName: "create-usersSkill" */ "@/views/main/usersSkill/UsersSkillCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-usersskill",
            component: () =>
              import(
                /* webpackChunkName: "edit-usersSkill" */ "@/views/main/usersSkill/UsersSkillEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-usersskill",
            component: () =>
              import(
                /* webpackChunkName: "detail-usersSkill" */ "@/views/main/usersSkill/UsersSkillDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/usersoncommunities",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-usersoncommunity",
            component: () =>
              import(
                /* webpackChunkName: "list-usersOnCommunity" */ "@/views/main/usersOnCommunity/UsersOnCommunityList.vue"
              ),
          },
          {
            path: "create",
            name: "create-usersoncommunity",
            component: () =>
              import(
                /* webpackChunkName: "create-usersOnCommunity" */ "@/views/main/usersOnCommunity/UsersOnCommunityCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-usersoncommunity",
            component: () =>
              import(
                /* webpackChunkName: "edit-usersOnCommunity" */ "@/views/main/usersOnCommunity/UsersOnCommunityEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-usersoncommunity",
            component: () =>
              import(
                /* webpackChunkName: "detail-usersOnCommunity" */ "@/views/main/usersOnCommunity/UsersOnCommunityDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/candidatesonchatrooms",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-candidatesonchatroom",
            component: () =>
              import(
                /* webpackChunkName: "list-candidatesOnChatroom" */ "@/views/main/candidatesOnChatroom/CandidatesOnChatroomList.vue"
              ),
          },
          {
            path: "create",
            name: "create-candidatesonchatroom",
            component: () =>
              import(
                /* webpackChunkName: "create-candidatesOnChatroom" */ "@/views/main/candidatesOnChatroom/CandidatesOnChatroomCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-candidatesonchatroom",
            component: () =>
              import(
                /* webpackChunkName: "edit-candidatesOnChatroom" */ "@/views/main/candidatesOnChatroom/CandidatesOnChatroomEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-candidatesonchatroom",
            component: () =>
              import(
                /* webpackChunkName: "detail-candidatesOnChatroom" */ "@/views/main/candidatesOnChatroom/CandidatesOnChatroomDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/usersonentreprises",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-usersonentreprise",
            component: () =>
              import(
                /* webpackChunkName: "list-usersOnEntreprise" */ "@/views/main/usersOnEntreprise/UsersOnEntrepriseList.vue"
              ),
          },
          {
            path: "create",
            name: "create-usersonentreprise",
            component: () =>
              import(
                /* webpackChunkName: "create-usersOnEntreprise" */ "@/views/main/usersOnEntreprise/UsersOnEntrepriseCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-usersonentreprise",
            component: () =>
              import(
                /* webpackChunkName: "edit-usersOnEntreprise" */ "@/views/main/usersOnEntreprise/UsersOnEntrepriseEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-usersonentreprise",
            component: () =>
              import(
                /* webpackChunkName: "detail-usersOnEntreprise" */ "@/views/main/usersOnEntreprise/UsersOnEntrepriseDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/jobs",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "list-job",
            component: () =>
              import(
                /* webpackChunkName: "list-job" */ "@/views/main/job/JobList.vue"
              ),
          },
          {
            path: "create",
            name: "create-job",
            component: () =>
              import(
                /* webpackChunkName: "create-job" */ "@/views/main/job/JobCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-job",
            component: () =>
              import(
                /* webpackChunkName: "edit-job" */ "@/views/main/job/JobEdit.vue"
              ),
          },
          {
            path: ":id",
            name: "detail-job",
            component: () =>
              import(
                /* webpackChunkName: "detail-job" */ "@/views/main/job/JobDetail.vue"
              ),
          },
        ],
      },
      // {
      //   path: "/communityposts",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/candidateLayout.vue"
      //     ),
      //   children: [
      //     {
      //       name: "home-community-posts",
      //       path: "",
      //       meta: {
      //         requiresAuth: true,
      //       },
      //       component: () =>
      //         import(/* webpackChunkName: "home-community-posts" */ "@/views/communityPosts/communityPosts.vue"),
      //     },
      //   ],
      // },
      // {
      //   path: "candidates",
      //   name: "candidates",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "sign_in" */ "@/views/inscription/candidate.vue"
      //     ),

      //   children: [
      //     // {
      //     //   path: "",
      //     //   name: "list-recruiter",
      //     //   meta: {
      //     //     requiresAuth: false,
      //     //   },
      //     //   component: () =>
      //     //     import(
      //     //       /* webpackChunkName: "list-recruiter" */ "@/views/main/recruiter/RecruiterList.vue"
      //     //     ),
      //     // },
      //     {
      //       path: "create",
      //       name: "create",
      //       meta: {
      //         requiresAuth: true,
      //       },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "create-recruiter" */ "@/views/main/recruiter/RecruiterCreate.vue"
      //         ),
      //     },
      //     {
      //       path: "edit/:id",
      //       name: "edit",
      //       meta: {
      //         requiresAuth: true,
      //       },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "edit-recruiter" */ "@/views/main/recruiter/RecruiterEdit.vue"
      //         ),
      //     },
      //     {
      //       path: ":id",
      //       name: "",
      //       meta: {
      //         requiresAuth: true,
      //       },
      //       component: () =>
      //         import(
      //           /* webpackChunkName: "detail-recruiter" */ "@/views/main/recruiter/RecruiterDetail.vue"
      //         ),
      //     },
      //   ],
      // },
    ],
  }