<template>
  <div class="card_container">
    <div class="card_header">
      <div class="left_content">
        <img class="profile_img" src="/png/user_profile_img.png" />
        <div class="post_info">
          <span class="username">{{
            post.candidateId
              ? `${post.firstName} ${post.lastName}`
              : post.entrepriseName
          }}</span>
          <span v-if="post.candidateId === null">{{ post.followers }}</span>
          <span>{{ dateSince(post.createdAt) }}</span>
        </div>
      </div>

      <div class="right_content">
        <el-button
          class="el-button text--regular"
          v-if="post.isfollower"
          @click="unFollowCommunity"
        >
          <el-icon class="me-2"><Check /></el-icon>
          {{ $t("entrepriseProfile.header.following") }}
        </el-button>
        <button
          class="el-button text--regular"
          v-else
          @click="follwingCommunity"
        >
          <el-icon class="me-2"><Plus /></el-icon>
          {{ $t("entrepriseProfile.header.follow") }}
        </button>
        <div class="post_actions">
          <div class="horizantal-list__more-icon">
            <CardDropdown
              :isSaved="isSaved"
              @save="handleSave"
              @copyLink="handleCopyLink"
            />
          </div>
        </div>
      </div>
    </div>
    <p class="margin-left">
      {{ post.description }}
    </p>

    <img class="w-100" src="/png/post_image.png" />
    <div class="post_stats">
      <span>{{ post.likes }} jaime</span>
      <span>{{ post.comments }} commentaire</span>
      <span>{{ post.shares }} partager</span>
    </div>
    <div class="card_ui">
      <div class="left_ui">
        <img v-if="!post.islike" class="post_img" src="/svg/icons/like.svg" @click="handleLikeClick"/>
        
        <img
        @click="handleDislikeClick"
          v-if="post?.islike"
          class="post_img"
          src="/svg/icons/candidate/liked.svg"
        />
        <span @click="post?.islike?handleDislikeClick():handleLikeClick()">jaime</span>
        <img class="post_img" src="/svg/communityPosts/comments_icon.svg" />
        <span>commentaire</span>
        <img class="post_img" src="/svg/communityPosts/share_icone.svg" />
        <span>partager</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, PropType, computed } from "vue";
import { deletePost, likePost } from "../functions/api";
import { storeToRefs } from "pinia";
import CardDropdown from "@/components/shared/sharedUser/CardsDropdown/DropdownPost.vue";
import { useToast } from "vue-toastification";
import { dateSince } from "@/core/helpers/date";
import { useAuthStore } from "@/store/useAuth";
import { CommunityPosts } from "../../..";
import { useRoute } from "vue-router";
const { followEntreprise, unFollowEntreprise } = useEntrepriseStore();
import { useEntrepriseStore } from "@/store/useEntrepriseModule";
import { useFollowEntrepriseStore } from "@/store/useFollowEntrepriseModule";
import { useCommunityPosts } from "@/store/useCommunityPosts";

export default defineComponent({
  components: { CardDropdown },

  name: "CommunityPostCard",
  props: {
    post: Object as PropType<CommunityPosts>,
  },
  setup(props, { emit }) {
    const authStore = useAuthStore();
    console.log(authStore.currentUser.id, "authStore.currentUser.id");
    const { followerPost } = useCommunityPosts();
    const route = useRoute();
    const id = route.params.id as string;
    const { likePost,dislikePost } = useCommunityPosts();

    const { entreprise } = storeToRefs(useEntrepriseStore());
    const componentKey = ref(props?.post?.followentrepriseId !== null);
    const forceRerender = () => {
      // incrementing componentKey constant
      componentKey = !componentKey.value;
    };
    const { createFollowEntreprise, deleteFollowEntreprise } =
      useFollowEntrepriseStore();
    console.log(props.post, "propsprops");
    const { followentrepriseList } = storeToRefs(useFollowEntrepriseStore());
    const follwingCommunity = async () => {
      /* todo @omar merci de corriger creation @omar */

      await createFollowEntreprise({
        entreprise: { id: `${props?.post?.entrepriseId}` },
      });

      followerPost(props?.post?.entrepriseId, false);
    };
    const unFollowCommunity = async () => {
      console.log(props?.post?.followentrepriseId,"props?.post?.followentrepriseId");
      
      await deleteFollowEntreprise(`${props?.post?.followentrepriseId}`);
      
      console.log(props.post,"props.post");
      
      followerPost(props?.post?.entrepriseId, true);
    };

        const handleLikeClick = async () => {
      await likePost({
        publication: { id: props?.post?.publicationId },
        user: {
          id: authStore.currentUser.id,
        },
        type: "like",
      });
    };
    const handleDislikeClick = async () => {
     
      await dislikePost(props?.post?.socialinterractionId);
    };

    return { entreprise, follwingCommunity, unFollowCommunity, dateSince,handleDislikeClick,handleLikeClick };
  },
});
</script>

<style lang="scss" scoped>
$color_1: #f6f8fb;
$color_2: #cccedd;
.post-card__footer-dropdown {
  border-radius: 20px !important;
  border: 0 !important;
}
.el-button {
    border: none;
    background-color: none;
    color: $primary-500;
    --el-button-bg-color: none;
    --el-button-hover-bg-color: none
    --el-button-active-bg-color: none;
    }

.horizantal-list__more-icon:hover {
    cursor: pointer;
    }
.username{
  font-family: 'Poppins' !important;
font-style: normal !important;
font-weight: 500 !important;
font-size: 14px !important;
line-height: 21px !important;
color: #F6F8FB !important;

}
.margin-left{
  margin-left: 10px;
}
.card_container {
  height: fit-content;
  background-color: #1e2027;
  border-radius: 5px;
  margin-bottom: 40px;
}
.dropdown-icon {
  background: $white-transparent-11;
  width: 36px;
  height: 40px;
  border-radius: 5px;
  @media (max-width: 500px) {
    width: 32px;
    height: 40px;
  }
  @media (max-width: 400px) {
    width: fit-content;
    height: 40px;
    background: transparent;
  }
}
.card_header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
}
.left_content {
  display: flex;
  img {
    width: 52px;
    height: 52px;
    border-radius: 5px;
    margin-right: 10px;
    object-fit: cover;
  }
  .post_info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-weight: 600;
      font-size: 14px;
      color: $color_1;
    }
    span {
      font-weight: 400;
      font-size: 12px;
      color: $color_2;
    }
  }
}
.right_content {
  display: flex;
  align-items: center;
  img {
    margin-right: 7px;
  }
  span {
    font-weight: 400;
    font-size: 14px;
    color: #f586e6;
    margin-right: 20px;
    cursor: pointer;
  }
  .post_actions {
    position: relative;
    img {
      cursor: pointer;
    }
    .menu {
      position: absolute;
      width: 120px;
      padding: 15px;
      border-radius: 10px;
      background-color: #282a33;
      transition: all 0.4s;
      top: 40px;
      visibility: hidden;
      opacity: 0;
      right: -100px;
      z-index: 100;
      span {
        color: #c7135b;
        font-weight: 500;
        cursor: pointer;
        display: inline-block;
        width: 100%;
      }
    }
  }
}
.post_desc {
  font-weight: 400;
  font-size: 12px;
  color: $color_1;
  padding: 10px;
  width: 527px;
  max-height: 65px;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#show {
  max-height: 100% !important;
  text-overflow: unset;
  display: unset;
}
.see_more {
  font-weight: 400;
  font-size: 12px;
  color: $color_2;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  display: block;
  float: right;
}
.post_img {
  width: 100%;
  object-fit: cover;
  .test {
    fill: #f586e6 !important;
  }
}
.post_stats {
  padding: 10px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  span {
    font-weight: 400;
    font-size: 12px;
    color: $color_1;
    margin-right: 18px;
  }
}
.card_ui {
  height: 41px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 500;
    font-size: 12px;
    color: $color_1;
    margin-right: 25px;
  }
  img {
    margin-right: 5px;
  }
  .left_ui,
  .right_ui {
    display: flex;
    align-items: center;
    span,
    img {
      cursor: pointer;
    }
  }
}
</style>

function useAuthStore() { throw new Error("Function not implemented."); }
function useAuthStore() { throw new Error("Function not implemented."); }