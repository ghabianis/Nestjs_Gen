import { useAuthStore } from "@/store/useAuth";
const {currentUser} = useAuthStore()
const DocMenuConfig =  currentUser.role === "recruiter_role" ? [
  {
    pages: [
      {
        heading: "Home",
        route: "/",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
   
    pages: [
      {
        heading: "Offre d'emplois",
    route: "/recruiter/offers",
      },
    ],
  },
  {
    heading: "Media Room",
    route: "/recruiter/media",
    pages: [
      {
        heading: "Contenu RH",
        route: "/recruiter/media/posts",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
      {
        heading: "Stories",
        route: "/recruiter/media/stories",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
      {
        heading: "Vidéothèque",
        route: "/recruiter/media/videos/categories",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
      {
        heading: "évènements",
        route: "/recruiter/media/events",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
      {
        heading: "Espace d'échanges",
        route: "/recruiter/media/events",
        svgIcon: "svg/icons/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
    ],
  },
  {
    pages: [
      {
        heading: "Talent Managment",
        route: "/recruiter/managment",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
    pages: [
      {
        heading: "My Community ",
        route: "/recruiter/community",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },

  {
    pages: [
      {
        heading: "Statistiques",
        route: "/recruiter/statistique",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },

  // {
  //   heading: "chats",
  //   route: "/chats",
  //   pages: [
  //     {
  //       heading: "All chats",
  //       route: "/chats",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create chats",
  //       route: "/chats/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "messages",
  //   route: "/messages",
  //   pages: [
  //     {
  //       heading: "All messages",
  //       route: "/messages",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create messages",
  //       route: "/messages/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "candidatesonchatrooms",
  //   route: "/candidatesonchatrooms",
  //   pages: [
  //     {
  //       heading: "All candidatesonchatrooms",
  //       route: "/candidatesonchatrooms",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create candidatesonchatrooms",
  //       route: "/candidatesonchatrooms/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "followentreprises",
  //   route: "/followentreprises",
  //   pages: [
  //     {
  //       heading: "All followentreprises",
  //       route: "/followentreprises",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create followentreprises",
  //       route: "/followentreprises/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "surveys",
  //   route: "/surveys",
  //   pages: [
  //     {
  //       heading: "All surveys",
  //       route: "/surveys",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create surveys",
  //       route: "/surveys/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "experiences",
  //   route: "/experiences",
  //   pages: [
  //     {
  //       heading: "All experiences",
  //       route: "/experiences",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create experiences",
  //       route: "/experiences/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "courses",
  //   route: "/courses",
  //   pages: [
  //     {
  //       heading: "All courses",
  //       route: "/courses",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create courses",
  //       route: "/courses/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "contracts",
  //   route: "/contracts",
  //   pages: [
  //     {
  //       heading: "All contracts",
  //       route: "/contracts",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create contracts",
  //       route: "/contracts/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "skills",
  //   route: "/skills",
  //   pages: [
  //     {
  //       heading: "All skills",
  //       route: "/skills",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create skills",
  //       route: "/skills/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "questions",
  //   route: "/questions",
  //   pages: [
  //     {
  //       heading: "All questions",
  //       route: "/questions",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create questions",
  //       route: "/questions/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "questiontypes",
  //   route: "/questiontypes",
  //   pages: [
  //     {
  //       heading: "All questiontypes",
  //       route: "/questiontypes",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create questiontypes",
  //       route: "/questiontypes/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "feedbacks",
  //   route: "/feedbacks",
  //   pages: [
  //     {
  //       heading: "All feedbacks",
  //       route: "/feedbacks",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create feedbacks",
  //       route: "/feedbacks/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "comments",
  //   route: "/comments",
  //   pages: [
  //     {
  //       heading: "All comments",
  //       route: "/comments",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create comments",
  //       route: "/comments/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "communities",
  //   route: "/communities",
  //   pages: [
  //     {
  //       heading: "All communities",
  //       route: "/communities",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create communities",
  //       route: "/communities/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "offersoncommunities",
  //   route: "/offersoncommunities",
  //   pages: [
  //     {
  //       heading: "All offersoncommunities",
  //       route: "/offersoncommunities",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create offersoncommunities",
  //       route: "/offersoncommunities/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "publications",
  //   route: "/publications",
  //   pages: [
  //     {
  //       heading: "All publications",
  //       route: "/publications",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create publications",
  //       route: "/publications/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "publicationsoncommunities",
  //   route: "/publicationsoncommunities",
  //   pages: [
  //     {
  //       heading: "All publicationsoncommunities",
  //       route: "/publicationsoncommunities",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create publicationsoncommunities",
  //       route: "/publicationsoncommunities/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "events",
  //   route: "/events",
  //   pages: [
  //     {
  //       heading: "All events",
  //       route: "/events",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create events",
  //       route: "/events/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "posts",
  //   route: "/posts",
  //   pages: [
  //     {
  //       heading: "All posts",
  //       route: "/posts",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create posts",
  //       route: "/posts/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "offers",
  //   route: "/offers",
  //   pages: [
  //     {
  //       heading: "All offers",
  //       route: "/offers",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create offers",
  //       route: "/offers/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "stories",
  //   route: "/stories",
  //   pages: [
  //     {
  //       heading: "All stories",
  //       route: "/stories",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create stories",
  //       route: "/stories/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "videos",
  //   route: "/videos",
  //   pages: [
  //     {
  //       heading: "All videos",
  //       route: "/videos",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create videos",
  //       route: "/videos/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "categories",
  //   route: "/categories",
  //   pages: [
  //     {
  //       heading: "All categories",
  //       route: "/categories",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create categories",
  //       route: "/categories/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "jobs",
  //   route: "/jobs",
  //   pages: [
  //     {
  //       heading: "All jobs",
  //       route: "/jobs",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create jobs",
  //       route: "/jobs/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "socialinterractions",
  //   route: "/socialinterractions",
  //   pages: [
  //     {
  //       heading: "All socialinterractions",
  //       route: "/socialinterractions",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create socialinterractions",
  //       route: "/socialinterractions/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "usersskills",
  //   route: "/usersskills",
  //   pages: [
  //     {
  //       heading: "All usersskills",
  //       route: "/usersskills",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create usersskills",
  //       route: "/usersskills/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "usersoncommunities",
  //   route: "/usersoncommunities",
  //   pages: [
  //     {
  //       heading: "All usersoncommunities",
  //       route: "/usersoncommunities",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create usersoncommunities",
  //       route: "/usersoncommunities/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "usersonentreprises",
  //   route: "/usersonentreprises",
  //   pages: [
  //     {
  //       heading: "All usersonentreprises",
  //       route: "/usersonentreprises",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create usersonentreprises",
  //       route: "/usersonentreprises/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "entreprisesoncommunities",
  //   route: "/entreprisesoncommunities",
  //   pages: [
  //     {
  //       heading: "All entreprisesoncommunities",
  //       route: "/entreprisesoncommunities",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create entreprisesoncommunities",
  //       route: "/entreprisesoncommunities/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },
  // {
  //   heading: "contractsoncandidates",
  //   route: "/contractsoncandidates",
  //   pages: [
  //     {
  //       heading: "All contractsoncandidates",
  //       route: "/contractsoncandidates",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //     {
  //       heading: "create contractsoncandidates",
  //       route: "/contractsoncandidates/create",
  //       svgIcon: "svg/icons/gen014.svg",
  //       fontIcon: "bi-calendar3-event",
  //     },
  //   ],
  // },

  // {
  //   sectionTitle: "authentication",
  //   svgIcon: "svg/icons//teh004.svg",
  //   fontIcon: "bi-sticky",
  //   sub: [
  //     {
  //       sectionTitle: "basicFlow",
  //       sub: [
  //         {
  //           heading: "signIn",
  //           route: "/auth/sign-in",
  //         },
  //         {
  //           heading: "signUp",
  //           route: "/auth/sign-up",
  //         },
  //         {
  //           heading: "passwordReset",
  //           route: "/auth/password-reset",
  //         },
  //         {
  //           heading: "emailResetPassword",
  //           route: "/auth/email-reset-password",
  //         },
  //         {
  //           heading: "msgResetPassword",
  //           route: "/auth/msg-reset-password",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "error404",
  //       route: "/404",
  //     },
  //   ],
  // },
  // {
  //   pages: [],
  // },
]
 : 
[
  {
    pages: [
      {
        heading: "Home",
        route: "/",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
   
    pages: [
      {
        heading: "Content",
        route: "/candidate/content",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
   
    pages: [
      {
        heading: "Jobs",
        route: "/candidate/jobs",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
   
    pages: [
      {
        heading: "Companies",
        route: "/candidate/entreprises",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
   
    pages: [
      {
        heading: "Events",
        route: "/candidate/events",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
   
    pages: [
      {
        heading: "Messages",
        route: "/candidate/messages",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
   
    pages: [
      {
        heading: "Notifications",
        route: "/candidate/notifacations",
        svgIcon: "svg/icons/art002.svg",
        fontIcon: "bi-app-indicator",
      },
    ],
  },

]
;
export default DocMenuConfig;
