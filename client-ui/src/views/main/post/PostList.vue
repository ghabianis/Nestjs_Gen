<template>
  <div class="mx-auto">
    <el-card shadow="never" class="card w-100 mt-5 post-list__container" :body-style="{padding:'0'}">
      <div class="p-9 header__wrapper">
        <div class="text-color">
          {{ $t("entityList.pagination.display") }}
          {{ pagination.total._count?._all }}
          {{ $t("entityList.pagination.items") }}
        </div>
        <div class="d-flex flex-column flex-sm-row align-items-center">
          <Pagination
            :itemsPerPage="pagination.take"
            :set-items-per-page="setItemsPerPage"
            :page="Math.floor(pagination.skip / pagination.take) + 1"
            :current-page-change="currentPageChange"
            :total="pagination.total._count?._all"
            :pages-array="[3, 6, 9, 12]"
          />
        </div>
      </div>
      <div class="py-6 px-9 justify-content-center gap-5 post-list__card-container">
            <PostCard  v-for="post in postList" :key="post.postid" :post="post"  @edit="handleEdit"/>
      </div>  
      <div class="footer__wrapper">
        <Pagination
          :itemsPerPage="pagination.take"
          :set-items-per-page="setItemsPerPage"
          :page="Math.floor(pagination.skip / pagination.take) + 1"
          :current-page-change="currentPageChange"
          :total="pagination.total._count?._all"
          :pages-array="[3, 6, 9, 12]"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent, watch } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { storeToRefs } from "pinia";
import { usePostStore } from "@/store/usePostModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import PostFormVue from "@/components/forms/PostForm.vue";
const ConfirmModal = defineAsyncComponent(
  () => import("@/components/modals/ConfirmModal.vue")
);
import PostCard from "@/components/cart/PostCard.vue";
import { setModal } from "@/core/helpers/config";
export default defineComponent({
  name: "postList",
  components: { Pagination, ConfirmModal, PostFormVue, PostCard},
  setup() {
    const entityPluralName = "posts";
    const { postList, pagination, isLoading } = storeToRefs(usePostStore());
    const { fetchPosts, getPostById , resetPost} = usePostStore();
    const setItemsPerPage = async (event: any) => {
      await fetchPosts({
        skip: 0,
        take: parseInt(event.target.value),
      });
    };
    const currentPageChange = async (val: number) => {
      await fetchPosts({
        skip: (val - 1) * pagination.value.take,
        take: pagination.value.take,
      });
    };
    onMounted(async () => {
      setCurrentPageBreadcrumbs(entityPluralName, []);
      await fetchPosts({
        skip: 0,
        take: 3,
      });
    });
    const handleEdit = async (postId : string) => {
      await getPostById(postId)
      setModal("PostEdit")
    }

    return {
      pagination,
      setItemsPerPage,
      currentPageChange,
      postList,
      handleEdit
    };
  },
});
</script>

<style scoped lang="scss">
.post-list__container{
    box-shadow: 0px 0px 2px $shadow-card-color;
    border-radius: 10px;

}
.header__wrapper {
  border-bottom: solid 1px $bd-card-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
  height: 76px;

  div {
    font-size: 0.875rem;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
    row-gap: 10px;
    padding-block: 10px;
    justify-content: unset;
  }
}
:deep(.post-dialog__custom-class){
  background:$bg-dark-600!important;
  border-radius:10px;
  width:70%;
  max-width: 1100px;
    @media (max-width: 800px) {
      width:90%;
  }
}

.post-list__card-container {
  display: grid;
  grid-template-columns : repeat(auto-fill,minmax(350px,1fr));
  @media (max-width: 768px) {
      grid-template-columns: repeat(1,1fr);
  }
}

.footer__wrapper {
  border-top: solid 1px $bd-card-color;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 20px;
  height: 76px;
  margin-bottom: 0;
}
</style>
