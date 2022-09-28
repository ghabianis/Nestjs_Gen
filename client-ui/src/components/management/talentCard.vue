<template>
  <div
    class="card d-flex flex-column justify-content-center align-items-center rounded px-4 pt-2"
    style="width:320px"
  >
    <div
      class="d-flex gap-5 align-items-start justify-content-between border-bottom w-100"
    >
      <div class="d-flex gap-5 w-100 align-items-center">
        <div>
          <img
            v-if="imageData"
            class="w-45px h-45px rounded-circle"
            :src="imageData"
          />
        </div>
        <div class="infos d-flex flex-column mt-6">
          <p
            v-if="userName"
            class="info__username text-capitalize"
            @click="$emit('displayDrawer')"
          >
            {{ userName ? userName : "User Name" }}
          </p>
          <p v-if="wantedPost" class="text-capitalize">{{ wantedPost }}</p>
          <p v-if="email">{{ email }}</p>
        </div>
      </div>
      <img class="mt-4" v-if="isFollower" src="/svg/talent/star.svg" />
    </div>
    
    <div class="d-flex border-bottom py-2 w-100">
      <div class="d-flex justify-content-between infos w-100">
        <Item
          src="/svg/talent/watch-cv.svg"
          :p="$t('talentManagement.card.watchCv')"
          @click="mediaLinkVisible = true"
          style="cursor: pointer;"
        ></Item>

        <div class="video_cv_container" >
          <el-dialog
            :show-close="false"
            destroy-on-close
            v-model="mediaLinkVisible"
            width="55%"
            @close="mediaLinkVisible = false"
          >
            <iframe :src="mediaLink" width="100%" height="500px" style="border-radius: 10px"></iframe>
            <!-- <video controls style="width:100%; border-radius: 10px" height="500">
                        <source type="video/mp4" :src="mediaLink"/></video> -->
          </el-dialog>
        </div>
        <Item
          src="/svg/talent/read-cv.svg"
          :p="$t('talentManagement.card.readCv')"
          @click="personalCvVisible = true"
          style="cursor: pointer;"
        ></Item>
        <div class="text_cv_container">
          <el-dialog
            v-model="personalCvVisible"
            width="30%"
            @close="personalCvVisible = false"
          >
            <iframe
              :src="personalCv + '#toolbar=0'"
              width="100%"
              height="680px"
              style="border-radius: 10px"
            ></iframe>
          </el-dialog>
        </div>

        <Item style="cursor: pointer;" src="/svg/talent/contact.svg" :p="$t('talentManagement.card.contact')"></Item>
      </div>
    </div>
    <div class="d-flex gap-20 footer py-2">
      <Item src="/svg/talent/transfer.svg" :p="shares"></Item>
      <Item src="/svg/talent/comment.svg" :p="comments"></Item>
      <Item src="/svg/talent/like.svg" :p="likes"></Item>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Item from "./Item.vue";
import Bar from "./Toolbar.vue";
export default defineComponent({
  props: {
    imageData: {
      type: String,
      default: "https://source.unsplash.com/user/c_v_r",
    },
    userName: { type: String, default: "User Name" },
    firstName: { type: String, default: "user" },
    lastName: { type: String, default: "user" },
    wantedPost: { type: String, default: "front end developer" },
    phone: { type: String, default: "24252525" },
    email: { type: String, default: "user.example@gmail.com" },
    personalCv: {
      type: String,
      default: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
    },
    mediaLink: { type: String, default: "test" },
    shares: { type: String, default: "33" },
    comments: { type: String, default: "50" },
    likes: { type: String, default: "500" },
    drawer: { type: Boolean, default: "false" },
    isFollower: { type: Boolean },
  },
  components: {
    Item,
    Bar,
  },
  setup() {
    const personalCvVisible = ref(false);
    const mediaLinkVisible = ref(false);
    return { personalCvVisible, mediaLinkVisible };
  },
});
</script>

<style lang="scss" scoped>
.card {
  background-color: $bg-dark-600 !important;
  border: 1px solid #6a7199;
}
.infos {
  font-size: 12px;
  line-height: 12px;
  color: $text-color-info-200;
}
.info__username {
  color: #ffffff;
  font-size: 16px;
  line-height: 12px;
  font-weight: 600;
  cursor: pointer;
}

.footer {
  color: #6e759f;
}
.border-bottom {
  border-bottom: 5px solid #6a7199;
}
:deep(.el-dialog__body) {
  padding: 0;
}
:deep(.el-dialog) {
  border-radius: 10px;
  background: transparent;
}

.text_cv_container {
  :deep(.el-dialog__header) {
    padding: 0;
    background-color: #000000cc;
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 30px;
  }
  :deep(.el-dialog__headerbtn) {
    top: 5px;
    width: 24px;
    height: 24px;
    z-index: 2;
  }
  :deep(.el-dialog__headerbtn .el-dialog__close) {
    color: #ffffff;
  }
}
.video_cv_container {
  :deep(.el-dialog__header) {
    padding: 0;
  }
}
</style>
