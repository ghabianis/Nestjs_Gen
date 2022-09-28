<template>
    <div class="mt-6 d-flex justify-content-between flex-wrap gap-5 w-100 videoitems__container" >
        <VideoItem v-for="category in categoryList.data" 
                  :key="category.id" :src="category.image"
                  :description="category.label" 
                  @click="handleCategoryClick(category)"/>          
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import VideoItem from "@/views/videotheque/videoItem.vue";
import { useCategoryStore } from "@/store/useCategoryModule";
import { useRouter } from "vue-router";
import { useVideoStore } from "@/store/useVideoModule";
import { Category } from "index";

export default defineComponent({
  name: "videoList",
  components: { VideoItem },
  setup() {
    const {fetchCategories } = useCategoryStore();
    const {categoryList } = storeToRefs(useCategoryStore())
    const {setCurrentVideoCategory} = useVideoStore()
    onMounted( async() => {
      await fetchCategories()
    })
    const router = useRouter()
    const handleCategoryClick = async (category: Category) => {
      setCurrentVideoCategory(category)
      router.push({name:'list-video',params:{category:category.label}})
    }
    return {
      categoryList,
      handleCategoryClick
    };
  },
});
</script>

<style scoped lang="scss">
.videoitems__container{
  @media screen and (max-width: 1024px) {
    display: grid!important;
    grid-template-columns: repeat(2,1fr);
    justify-content: center!important;
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1,300px);
    justify-content: center!important;
  }
  
}
</style>