<template>
<div>
  <div class="mx-auto mt-5  w-100">
    <el-card shadow="never" class="list-card card m-0">
      <div class="header__wrapper p-9">
        <div class="text-color fs-4">
          {{ $t("entityList.pagination.display") }}
          {{ pagination.total._count?._all }}
          {{ $t("story.list.paginationItemName") }}
        </div>
        <div class="d-flex flex-column flex-sm-row align-items-center ">
          <Pagination
            :itemsPerPage="pagination.take"
            :set-items-per-page="setItemsPerPage"
            :page="Math.floor(pagination.skip / pagination.take) + 1"
            :current-page-change="currentPageChange"
            :total="pagination.total._count?._all"
            :pages-array="[3, 6, 9, 12]"
            class="fs-6"
          />
        </div>
      </div>
      <div class="py-6 story-list__card-container">
      <!-- <div class="d-flex mt-6 mb-6 justify-content-center flex-wrap gap-8"> -->
        <template v-for="(story) in storyList" :key="story.publicationId" style="width:fit-content">
          <StoryCard :story="story" @handle-edit="handleEdit(story.publicationId)"/>
        </template>
      <!-- </div> -->
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { storeToRefs } from "pinia";
import { useStoryStore } from "@/store/useStoryModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import StoryCard from "../../../components/cart/StoryCard.vue"
import DisplayMode from "@/components/shared/DisplayMode/DisplayMode.vue";
import { setModal } from "@/core/helpers/config";
import { Components } from "@tekab-dev-team/storybook-devfactory";

import { t } from "@/core/i18n/translate";

const ConfirmModal = defineAsyncComponent(
  () => import("@/components/modals/ConfirmModal.vue")
);
export default defineComponent({
  name: "storyList",
  components: { Pagination, ConfirmModal ,StoryCard ,DisplayMode},
  setup() {
    const entityPluralName = t("story.list.entityPluralName") ;
    const icon = "Plus" ;
    const fieldsName = ref(["publication"]);
    const isOpenModal = ref(false);
    const modalId = ref<string | null>(null);
    const { storyList, pagination, isLoading } = storeToRefs(useStoryStore());
    console.log(storyList)
    const { fetchStories, deleteStory } = useStoryStore();

    const isEdit = ref(false);

    const handleRemoveEntity = async (id: string) => {
      await deleteStory(id);
    };
    const handleOpenConfirmModal = (id: string) => {
      isOpenModal.value = true;
      modalId.value = id;
    };
    const setItemsPerPage = async (event: any) => {
      await fetchStories({
        skip: 0,
        take: parseInt(event.target.value),
      });
    };
    const currentPageChange = async (val: number) => {
      await fetchStories({
        skip: (val - 1) * pagination.value.take,
        take: pagination.value.take,
      });
    };
    const handleEdit = (id: string) => {
      setModal("storyEdit" , { id : id})
    }
    onMounted(async () => {
      setCurrentPageBreadcrumbs(entityPluralName, [],icon);
      await fetchStories({
        skip: 0,
        take: 3,
      });
    });
    
    return {
      fieldsName,
      handleRemoveEntity,
      handleOpenConfirmModal,
      entityPluralName,
      storyList,
      pagination,
      setItemsPerPage,
      currentPageChange,
      isOpenModal,
      modalId,
      isLoading,
      handleEdit,
      isEdit
    };
  },
});
</script>

<style scoped lang="scss">
.story-list__card-container {
  display: grid;
  gap:25px;
  justify-content:center;
  grid-template-columns: minmax(400px, max-content) repeat(auto-fill, 400px);
}
@media (max-width: 1024px) {
  .story-list__card-container {
      grid-template-columns: repeat(auto-fill, 400px);
  }

}

.list-card  {
    box-shadow: 0px 0px 2px $shadow-card-color;
    border: $white-transparent-11;
}
.list-card:deep(.el-card__body)  {
  padding-top: 0% !important;
  padding-bottom: 0% !important;
}

.header__wrapper {
  border-bottom: solid 1px $bd-card-color;
  display: flex;
  width:100% !important;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
  height: 76px;

  div {
    font-size: 0.875rem;
  }
  @media screen and (max-width: 768px,) {
    flex-direction: column;
    height: auto;
    row-gap: 10px;
    padding-block: 10px;
    justify-content: unset;
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
