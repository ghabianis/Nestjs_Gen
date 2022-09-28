<template>
  <div class="d-flex gap-5">
    <div class="community-posts-profile-left__aside">
      <div class="community-posts-profile__header">
        <CommunityProfileHeader />
      </div>
      <div class="community-posts-body__container d-flex gap-4">
        <div class="search-card">
          <SearchCard
            @handel-input="handelInput"
            description="Trouvez le poste que vous cherchez !"
            placeholder=" post titre ou mot clé"
          />
        </div>
        <div class="community-posts-card col-8">
          <InfinityScroll @bottom="handleBottom">
            <CommunityPostCard
              v-for="post in postList"
              :key="post.publicationId"
              :post="post"
              @handel-follower="handelFollower"
            />
          </InfinityScroll>
        </div>
      </div>
    </div>

    <div class="community-posts-profile__aside">
      <CompanyProfileAside />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { CommunityPosts } from "../../../index";
import InfinityScroll from "@/components/shared/InfinityScroll/InfinityScroll.vue";
import CommunityProfileHeader from "@/components/shared/CommunityProfileHeader/CommunityProfileHeader.vue";
import CompanyProfileAside from "@/components/shared/CompanyProfileAside/CompanyProfileAside.vue";
import SearchCard from "@/components/cart/userCard/SearchCard.vue";
import PostModal from "@/components/modals/PostModal.vue";
import CommunityPostCard from "@/components/cart/CommunityPostCard.vue";
import { useCategoryStore } from "@/store/useCategoryModule";
import { useRouter } from "vue-router";
import { useVideoStore } from "@/store/useVideoModule";
import { useRoute } from "vue-router";
import { Category } from "index";
import { useCommunityPosts } from "@/store/useCommunityPosts";
import { useAuthStore } from "@/store/useAuth";
export default defineComponent({
  name: "communityPostsList",
  components: {
    CommunityProfileHeader,
    CompanyProfileAside,
    PostModal,
    CommunityPostCard,
    SearchCard,
    InfinityScroll,
  },

  setup() {
    const authStore = useAuthStore();
    console.log(authStore.currentUser.id, "authStore.currentUser.id");
    const route = useRoute();
    const id = route.params.id as string;
    const { getPost } = useCommunityPosts();
    const { postList, isLoading, pagination, paginationEnd, searchInput } =
      storeToRefs(useCommunityPosts());
    console.log("sdsdsdsdsdsdsdsd");

    // const {setCurrentVideoCategory} = useVideoStore()
    const handleBottom = async () => {
      console.log("pagination");
      console.log(!paginationEnd.value, "!isLoading.value && !paginationEnd");
      if (!isLoading.value && !paginationEnd.value) {
        console.log("pagination...");
        // 00fc4f2c-28b5-4386-ab47-52e3d5d765b3
        await getPost({
          communityId: id,
          pagination: {
            to: pagination.value.to + pagination.value.take + 1,
            from: pagination.value.to + pagination.value.take,
          },
          inputChange: false,
        });
      }
    };
    const handelInput = async () => {
      await getPost({
        communityId: id,
        pagination: {
          to: 1,
          from: 0,
        },
        inputChange: true,
      });
    };




    onMounted(async () => {
      await getPost({
        communityId: id,
        pagination: {
          to: 1,
          from: 0,
        },
        inputChange: false,
      }),
        console.log(postList, "postList");
    });

    return {
      postList,
      handleBottom,
      searchInput,
      handelInput,

    };
  },
});
</script>

<style scoped lang="scss">
.search-card {
  position: sticky;
  top: 79px;
  @media screen and (max-width: 681px) {
    flex: 0 0 auto;
    width: 100%;
  }
}
.community-posts-body__container {
  position: relative;
  top: 155px;
  @media screen and (max-width: 681px) {
    flex-wrap: wrap;
  }
}
.community-posts-card {
  @media screen and (max-width: 681px) {
    flex: 0 0 auto;
    width: 100%;
  }
}
.community-posts-profile__header {
  width: 100%;
}
.community-posts-profile__aside {
  width: 35%;
  @media screen and (max-width: 820px) {
    display: none;
  }
}
.community-posts-profile-left__aside {
  width: 64%;
  @media screen and (max-width: 820px) {
    width: 100%;
  }
}
.videoitems__container {
  @media screen and (max-width: 1024px) {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center !important;
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 300px);
    justify-content: center !important;
  }
}
@media (max-width: 768px) {
  .community-posts-profile__aside {
    display: none;
  }
  .community-posts-profile__header {
    width: 100%;
  }
  /* .community-posts-profile-left__aside {
    width: 64%;
  } */
}
</style>