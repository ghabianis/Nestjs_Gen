<template>
  <div class="modal_parent">
    <el-dialog v-model="isShow" title="Create a post" width="40%">
      <div class="w-100 h-100" @dragover.prevent @drop="onDrop">
        <textarea
          class="text-area__inner"
          v-model="post.publication.description"
          placeholder="what do you want to talk about"
        ></textarea>
      </div>

      <template #footer>
        <template v-if="dataImage.preview">
          <img :src="dataImage.preview" class="mb-3" />
        </template>
        <div class="bar_footer">
          <div class="input-post-footer">
            <label for="my-file"
              ><img src="/svg/communityPosts/photo_icon.svg" />
              <span>Photo</span></label
            >
            <input
              type="file"
              accept="image/*"
              @change="previewImage"
              class="form-control-file"
              hidden
              id="my-file"
            />

            <img src="/svg/communityPosts/video_icon.svg" />
            <span>Video</span>
            <img src="/svg/communityPosts/file_icon.svg" />
            <span>File</span>
          </div>

          <el-button
            @click="handleSubmitForm"
            :disabled="post.publication.description.length === 0"
            >post</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/store/useAuth";

import { defineComponent, onUpdated, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/store/usePostModule";
import { useCommunityPosts } from "@/store/useCommunityPosts";
import { useRoute } from "vue-router";
import { supabase } from "@/core/services/SupabaseClientService";
import service from "@/service";

export default defineComponent({
  props: {
    isShow: Boolean,
  },
  setup(props, { emit }) {
    const { post, error, pagination } = storeToRefs(usePostStore());
    const dataImage = ref({
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
    });
    const { getPostById, createPost, editPost, resetPost, fetchPosts } =
      usePostStore();
    const { currentUser } = storeToRefs(useAuthStore());
    const route = useRoute();
    const { getPost } = useCommunityPosts();
    const id = route.params.id as string;
    const onDrop = (event: any) => {
      event.stopPropagation();
      event.preventDefault();
      console.log("ffffffffffffffffff");

      var input = event.dataTransfer;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          dataImage.value.preview = e.target.result;
        };
        dataImage.value.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    };
    const previewImage = (event: any) => {
      console.log("ggggggggggggggggggg");

      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          dataImage.value.preview = e.target.result;
        };
        dataImage.value.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    };
    const handleSubmitForm = async () => {
      post.value.publication.publicationsOnCommunities = [id];
      console.log(emit("close-modal"), "emit('close-modal')");

      console.log(currentUser.value.id, "currentUser.value.id");

      await createPost({ id: currentUser.value.id });
      await getPost({
        communityId: id,
        pagination: {
          to: 1,
          from: 0,
        },
        inputChange: true,
        addPost: true,
      });
      post.value.publication.description = "";
    };

    return {
      post,
      handleSubmitForm,
      previewImage,
      dataImage,
      onDrop,
    };
  },
});
</script>
<style lang="scss" scoped>
.input-post-footer {
  align-self: center;
  flex-wrap: wrap;
  display: flex;
  align-items: center;

  span {
    font-size: 12px;
    color: #e9ecef;
    margin-right: 30px;
    cursor: pointer;
  }
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    cursor: pointer;
  }
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.modal_parent {
  :deep(.el-dialog) {
    background: #1e2027;
    border-radius: 10px;
    min-width: 480px;
  }

  :deep(.el-dialog__footer) {
    display: flex;
    margin-top: 10px;
    padding-top: 20px;
    flex-direction: column;
    justify-content: space-between;
    border-top: 1px solid hsla(0, 0%, 100%, 0.13);
  }
  :deep(.el-dialog__header) {
    position: relative;
    border-radius: 10px 10px 0 0;
    padding: 18px;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.13);
    margin-right: 0px;
    .el-dialog__title {
      font-weight: 500;
      font-size: 16px;
      color: #f6f8fb;
    }
  }
  :deep(.el-dialog__body) {
    padding: 0px;
    height: 109px;
  }
  :deep(.el-form .el-input) {
    height: 109px;
  }
  .bar_footer {
    display: flex;

    justify-content: space-between;
  }
  :deep(.el-button) {
    background: #575a64;
    color: #cccedd;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    &:hover {
      filter: brightness(0.8);
      background: #575a64;
      color: #cccedd;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      border-color: #dcdfe6;
    }
    &:disabled {
      color: #fff;
      background-color: #c8c9cc;
      border-color: #c8c9cc;
      cursor: not-allowed;
      &:hover {
        color: #fff;
        background-color: #c8c9cc;
        border-color: #c8c9cc;
        cursor: not-allowed;
        transition: none;
        filter: none;
      }
    }
  }

  .text-area__inner {
    outline: none;
    resize: none;
    height: 100%;
    overflow: hidden;
    padding: 11px;
    box-shadow: none;
    border: none;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    border-style: hidden;
    font-weight: 400;
    font-size: 14px;
    color: #b5b5c3;
    outline: none;
    width: 100%;
    background: #1e2027;
  }
}
</style>