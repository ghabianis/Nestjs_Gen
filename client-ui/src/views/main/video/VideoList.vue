<template>
  <div>
    <div class="mx-auto">
      <el-card shadow="never" class="card w-100 mt-5 video-list__container" :body-style="{padding:'0'}">
        <div class="header__wrapper">
          <div class="text-color d-flex align-items-center">
            <div class="py-3 px-4 ms-3 me-10 header__arrow-icon" @click="handleReturnClick"><inline-svg src="/svg/arrows/arrow-left.svg"></inline-svg></div>
            <div class="fw-bolder fs-4 me-10 header__category-title">{{categoryName}}</div>
            <div class="d-flex align-items-center" > 
              {{ $t("entityList.pagination.display") }} 
               : {{ pagination.total._count?._all }} 
               {{ $t("entityList.pagination.items") }}
            
            </div>

            
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
         <div class="py-6 px-9 justify-content-center gap-5 video-list__card-container">
            <VideoCard v-for="video in videoList" :key="video.videoId" :video="video"  />
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
import { defineComponent, onMounted, ref, defineAsyncComponent, computed } from "vue";
import { storeToRefs } from "pinia";
import { useVideoStore } from "@/store/useVideoModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import { t } from "@/core/i18n/translate"
import VideoCard from "@/components/cart/VideoCard.vue"
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "videoList",
  components: { Pagination,VideoCard },
  setup() {
    const { videoList, pagination, isLoading , currentVideoCategory} = storeToRefs(useVideoStore());
    const { fetchVideos } = useVideoStore();
    const route = useRoute()
    const router = useRouter()
    const category = route.params.category as string
    const setItemsPerPage = async (event: any) => {
      await fetchVideos({
        pagination:{
          skip: 0,
          take: parseInt(event.target.value),
        },
        type: category || ''

      });
    };
    const currentPageChange = async (val: number) => {
      await fetchVideos({
        pagination:{
          skip: (val - 1) * pagination.value.take,
          take: pagination.value.take,
        },
        type: category || ''
      });
    };
    onMounted( async() => {

        await fetchVideos({
          pagination:{
            skip: 0,
            take: 3
          },
          type: category || ''
        });
        if(!currentVideoCategory.value){
          router.push({name:"404"})
        }
    })
    const handleReturnClick = () => {
      router.push({name:"videos-categories"})
    }
    const categoryName = computed(()=> {
      return currentVideoCategory.value && currentVideoCategory.value.label || ""
    })
    return {
      pagination,
      setItemsPerPage,
      currentPageChange,
      videoList,
      handleReturnClick,
      isLoading,
      categoryName
    };
  },
});
</script>

<style scoped lang="scss">

.video-list__container{
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
  .header__arrow-icon {
    background: $primary-500;
    border-radius: 5px;
    &:hover{
      cursor: pointer;
    }
      @media screen and (max-width: 800px) {
      margin-right: 10px!important;
    }
  }
  .header__category-title{
    color:$text-color-50;
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
  @media screen and (max-width: 800px) {
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
.video-list__card-container {
  display: grid;
  grid-template-columns : repeat(auto-fill,minmax(350px,1fr));
  @media (max-width: 768px) {
      grid-template-columns: repeat(1,1fr);
  }
}

</style>