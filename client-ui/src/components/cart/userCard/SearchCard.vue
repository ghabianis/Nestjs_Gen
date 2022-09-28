<template>
    <div class="py-5 px-3 fs-6 search-card ">
        <span class="">{{title}}</span>
        <span>{{description}} </span>
        <span class="fw-bolder">{{subDescription}}</span>
        <div class="my-3">
            <el-input
            v-model="searchInput"
            :placeholder="placeholder"
            :prefix-icon="Search"
            size="large"
            />
        </div>
        <el-button @click="$emit('handel-input')" class="search-card__btn">Rechercher</el-button>
    </div>
</template>
<script lang="ts">
import { defineComponent ,ref} from 'vue'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from "pinia";
import { useCommunityPosts } from "@/store/useCommunityPosts";


export default defineComponent({
    props:{
        description:{
            required:false,
            type:String
        },
        title:{
            required:false,
            type:String,
        },
        placeholder:{
            required:true,
            type:String
        },
        subDescription:{
            required:false,
            type:String
        },
  
    },
    setup() {
        const { searchInput} = storeToRefs(useCommunityPosts());
      
        return {Search,searchInput}
    },
})
</script>
<style lang="scss" scoped>
   
   .search-card{
        height: fit-content;
        background: $bg-dark-600;
        border-radius: 5px;
    }  
    .search-card__btn{
        background: $primary-500;
        border-radius: 6px;
        border: none;
        color: $text-color-250;
    }
      @media(max-width: 700px) {
            .search-card{
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .search-card__btn{
                width : fit-content;
            }

        }
    
</style>