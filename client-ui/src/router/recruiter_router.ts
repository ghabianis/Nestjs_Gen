export const recruiter_router = {
    path: "/recruiter",
    name: "recruiter",
    meta: {
      requiresAuth: true,
      roles: ["admin", "recruiter"],
    },
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "@/views/inscription/adminLayout.vue"
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
            name: "home-recruiter",
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
        path: "/recruiters",
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
            name: "list-recruiter",
            component: () =>
              import(
                /* webpackChunkName: "list-recruiter" */ "@/views/main/recruiter/RecruiterList.vue"
              ),
          },
          {
            path: "create",
            name: "create-recruiter",
            component: () =>
              import(
                /* webpackChunkName: "create-recruiter" */ "@/views/main/recruiter/RecruiterCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-recruiter",
            component: () =>
              import(
                /* webpackChunkName: "edit-recruiter" */ "@/views/main/recruiter/RecruiterEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-recruiter",
            component: () =>
              import(
                /* webpackChunkName: "detail-recruiter" */ "@/views/main/recruiter/RecruiterDetail.vue"
              ),
          },
        ],
      },
      {
        path: "offers",
        name: "offers",
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
            name: "offers-list",
            meta: {
              requiresAuth: true,
              displayToolbar: true,
              displayBreadcrumb : true
            },
            component: () =>
              import(
                /* webpackChunkName: "list-offer" */ "@/views/main/offer/OfferList.vue"
              ),
          },
          {
            path: "create",
            name: "create-offers",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "create-offer" */ "@/views/main/offer/OfferForm.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-offer",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "edit-offer" */ "@/views/main/offer/OfferForm.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "detail-offer" */ "@/views/main/offer/OfferDetail.vue"
              ),
          },
          {
            path: "applications/:id",
            name: "application-kanban",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "detail-offer" */ "@/views/main/offer/CandidateKanban.vue"
              ),
          },
        ],
      },
      {
        path: "media/posts",
        name: "posts",
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
            name: "list-post",
            meta: {
              requiresAuth: true,
              displayToolbar: true
            },
            component: () =>
              import(
                /* webpackChunkName: "list-post" */ "@/views/main/post/PostList.vue"
              ),
          },
          {
            path: "create",
            name: "create-post",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "create-post" */ "@/views/main/post/PostCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-post",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "edit-post" */ "@/views/main/post/PostEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-post",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "detail-post" */ "@/views/main/post/PostDetail.vue"
              ),
          },
        ],
      },
      {
        path: "media/stories",
        name: "stories",
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
            name: "list-story",
            meta: {
              requiresAuth: true,
              displayToolbar: true
            },
            component: () =>
              import(
                /* webpackChunkName: "list-story" */ "@/views/main/story/StoryList.vue"
              ),
          },
          {
            path: "create",
            name: "create-story",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "create-story" */ "@/views/main/story/StoryCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-story",
            props: { showModal: true },
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "edit-story" */ "@/views/main/story/StoryEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-story",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "detail-story" */ "@/views/main/story/StoryDetail.vue"
              ),
          },
        ],
      },
      {
        path: "media/jobs",
        name: "jobs",
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
            name: "edit",
            component: () =>
              import(
                /* webpackChunkName: "edit-job" */ "@/views/main/job/JobEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "",
            component: () =>
              import(
                /* webpackChunkName: "detail-job" */ "@/views/main/job/JobDetail.vue"
              ),
          },
        ],
      },
      {
        path: "media/videos",
        name: "videos",

        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "categories",
            name: "videos-categories",
            meta: {
              requiresAuth: true,
              displayVideoToolbar:true
            },
            component: () =>
              import(
                /* webpackChunkName: "list-video" */ "@/views/videotheque/videotheque.vue"
                ),
          },
          {
            path: "categories/:category",
            name: "list-video",
            meta: {
              requiresAuth: true,
              displayToolbar: true
            },
            component: () =>
              import(
                /* webpackChunkName: "list-video" */ "@/views/main/video/VideoList.vue"
              ),
          },
          {
            path: "create",
            name: "create-video",
            component: () =>
              import(
                /* webpackChunkName: "create-video" */ "@/views/main/video/VideoCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit",
            component: () =>
              import(
                /* webpackChunkName: "edit-video" */ "@/views/main/video/VideoEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "",
            component: () =>
              import(
                /* webpackChunkName: "detail-video" */ "@/views/main/video/VideoDetail.vue"
              ),
          },
        ],
      },
      {
        path: "media/events",
        name: "events",

        meta: {
          requiresAuth: true,
          displayToolbar: true
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            path: "",
            name: "event-list",
            meta: {
              requiresAuth: true,
              displayToolbar: true
            },
            component: () =>
              import(
                /* webpackChunkName: "list-event" */ "@/views/main/event/EventList.vue"
              ),
          },
          {
            path: "create",
            name: "create-event",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "create-event" */ "@/views/main/event/EventCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-event",
            meta: {
              requiresAuth: true,
              displayToolbar: false
            },
            component: () =>
              import(
                /* webpackChunkName: "edit-event" */ "@/views/main/event/EventEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-event",
            component: () =>
              import(
                /* webpackChunkName: "detail-event" */ "@/views/main/event/EventDetail.vue"
              ),
          },
        ],
      },
      {
        path: "managment",
        name: "managment",
        meta: {
          requiresAuth: true,
          displayToolbar: true

        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout_2.vue"
          ),
        children: [
          {
            name: "",
            path: "",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "HomePage" */ "@/views/main/managment/managment.vue"
              ),
          },
        ],
      },
      {
        path: "statistique",
        name: "statistique",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            name: "",
            path: "",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "HomePage" */ "@/views/main/statistique/Statistique.vue"
              ),
          },
        ],
      },
      {
        path: "community",
        name: "community",
        component: () =>
          import(
            /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
          ),
        children: [
          {
            name: "",
            path: "",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "HomePage" */ "@/components/cart/recruiterCard/AsideCommunityCard.vue"
              ),
          },
          {
            name: "community-id",
            path: ":id",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "HomePage" */ "@/views/main/community/recruiter/communityProfile.vue"
              ),
          },
          
          {
            path: "create",
            name: "create-communities",
            component: () =>
              import(
                /* webpackChunkName: "create-community" */ "@/views/main/community/CommunityCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit",
            component: () =>
              import(
                /* webpackChunkName: "edit-community" */ "@/views/main/community/CommunityEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "",
            component: () =>
              import(
                /* webpackChunkName: "detail-community" */ "@/views/main/community/CommunityDetail.vue"
              ),
          },
        ],
      },
      {
        path: "chats",
        name: "chats",

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
            name: "list-chat",
            component: () =>
              import(
                /* webpackChunkName: "list-chat" */ "@/views/main/chat/ChatList.vue"
              ),
          },
          {
            path: "create",
            name: "create-chat",
            component: () =>
              import(
                /* webpackChunkName: "create-chat" */ "@/views/main/chat/ChatCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-chat",
            component: () =>
              import(
                /* webpackChunkName: "edit-chat" */ "@/views/main/chat/ChatEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-chat",
            component: () =>
              import(
                /* webpackChunkName: "detail-chat" */ "@/views/main/chat/ChatDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/chatrooms",
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
            name: "list-chatroom",
            component: () =>
              import(
                /* webpackChunkName: "list-chatroom" */ "@/views/main/chatroom/ChatroomList.vue"
              ),
          },
          {
            path: "create",
            name: "create-chatroom",
            component: () =>
              import(
                /* webpackChunkName: "create-chatroom" */ "@/views/main/chatroom/ChatroomCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-chatroom",
            component: () =>
              import(
                /* webpackChunkName: "edit-chatroom" */ "@/views/main/chatroom/ChatroomEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-chatroom",
            component: () =>
              import(
                /* webpackChunkName: "detail-chatroom" */ "@/views/main/chatroom/ChatroomDetail.vue"
              ),
          },
        ],
      },
      {
        path: "messages",
        name: "messages",
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
            name: "list-message",
            component: () =>
              import(
                /* webpackChunkName: "list-message" */ "@/views/main/message/MessageList.vue"
              ),
          },
          {
            path: "create",
            name: "create-message",
            component: () =>
              import(
                /* webpackChunkName: "create-message" */ "@/views/main/message/MessageCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-message",
            component: () =>
              import(
                /* webpackChunkName: "edit-message" */ "@/views/main/message/MessageEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-message",
            component: () =>
              import(
                /* webpackChunkName: "detail-message" */ "@/views/main/message/MessageDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/contracts",
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
            name: "list-contract",
            component: () =>
              import(
                /* webpackChunkName: "list-contract" */ "@/views/main/contract/ContractList.vue"
              ),
          },
          {
            path: "create",
            name: "create-contract",
            component: () =>
              import(
                /* webpackChunkName: "create-contract" */ "@/views/main/contract/ContractCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-contract",
            component: () =>
              import(
                /* webpackChunkName: "edit-contract" */ "@/views/main/contract/ContractEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-contract",
            component: () =>
              import(
                /* webpackChunkName: "detail-contract" */ "@/views/main/contract/ContractDetail.vue"
              ),
          },
        ],
      },
      {
        path: "candidates",
        name: "candidates",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "sign_in" */ "@/views/inscription/candidate.vue"
          ),

        children: [
          {
            path: "",
            name: "",
            meta: {
              requiresAuth: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "list-recruiter" */ "@/views/main/recruiter/RecruiterList.vue"
              ),
          },
          {
            path: "create",
            name: "create-recruiter",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "create-recruiter" */ "@/views/main/recruiter/RecruiterCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "edit-recruiter" */ "@/views/main/recruiter/RecruiterEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "",
            meta: {
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "detail-recruiter" */ "@/views/main/recruiter/RecruiterDetail.vue"
              ),
          },
        ],
      },
      {
        path: "/communities",
        name: "/communities",
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
            name: "list-community",
            component: () =>
              import(
                /* webpackChunkName: "list-community" */ "@/views/main/community/recruiter/communityProfile.vue"
              ),
          },
          {
            path: "create",
            name: "create-community",
            component: () =>
              import(
                /* webpackChunkName: "create-community" */ "@/views/main/community/CommunityCreate.vue"
              ),
          },
          {
            path: "edit/:id",
            name: "edit-community",
            component: () =>
              import(
                /* webpackChunkName: "edit-community" */ "@/views/main/community/CommunityEdit.vue"
              ),
          },
          {
            path: "detail/:id",
            name: "detail-community",
            component: () =>
              import(
                /* webpackChunkName: "detail-community" */ "@/views/main/community/CommunityDetail.vue"
              ),
          },
        ],
      }
    ],
  }