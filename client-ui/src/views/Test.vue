<template>

  <CompanyCard data=""/>
  <br>
  <ApplyJobCard data=""/>
  <br>
  <TopCompanyCard data=""/>
  <br>
  <ExchangeSpaceCard data=""/>
  <br>
  <PostCard data=""/>
  <br>
  <Story />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApplyJobCard from "@/components/cart/userCard/ApplyJobCard.vue";
import CompanyCard from "@/components/cart/userCard/CompanyCard.vue";
import TopCompanyCard from "@/components/cart/userCard/TopCompanyCard.vue";
import ExchangeSpaceCard from "@/components/cart/userCard/ExchangeSpaceCard.vue";
import PostCard from "@/components/cart/userCard/PostCard.vue";
import Story from "@/components/story/Story.vue";

export default defineComponent({
  name: "test",
  components: { 
    CompanyCard,
    ApplyJobCard,
    TopCompanyCard,
    ExchangeSpaceCard,
    PostCard,
    Story
   },

  setup() {},
});
</script>
