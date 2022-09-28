<template>
<div>
  <el-card
    style="
      border: none;
      outline: none;
      box-shadow: 0px 0px 2px #6a7199;
      border-radius: 10px;
      width: 400px;
    "
    shadow="never"
    :body-style="{
      padding: '0px',
      borderRadius: '0px',
      minHeight: '325px',
      display: 'flex',
    }"
  >
    <div class="image__wrapper">
      <div class="description">
        <div class="text-left fw-bolder fs-6 text-white mb-3">{{story.title}}</div>
        <p class="text-left fs-13 text-white mb-3">
        {{story.description}}
        </p>
      </div>
      <video :src="story.mediaLink" class="image-responsive" />
    </div>
    <div class="card__body">
                <FeedbackCard :title="$t('story.storyCard.title.views')" icon="View" background="#00D998" :value="story.views" class="w-100px m-auto"/>
                <FeedbackCard :title="$t('story.storyCard.title.likes')" svg="/svg/icons/like.svg" background="#FF6262" :value="story.likes" class="w-100px m-auto"/>
                <FeedbackCard :title="$t('story.storyCard.title.comments')" icon="ChatDotSquare" background="#F586E6" :value="story.comments" class="w-100px m-auto"/>

      <div
        class="
          card__time
          d-flex
          justify-content-between
          align-items-center
          px-4
          w-100
        "
      >

          <div class="m-4 mt-4 d-flex justify-content-between offer-card__footer w-100">
          <div class="d-flex align-items-center">
             <inline-svg class="offer-card__footer-date-icon" src="/svg/icons/time.svg"></inline-svg>
             <span class="ms-2 fs-9 offer-card__footer-date " style="color:#fff;">26 juillet 1995</span>
          </div>
          <div class="horizantal-list__more-icon">
            <!-- <el-dropdown trigger="click" popper-class="offer-card__footer-dropdown">
              <inline-svg src="/svg/icons/more.svg" class="align-self-end more-icon">{{story.createdAt}}</inline-svg>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="$emit('handle-edit')"><inline-svg src="/svg/icons/edit.svg"/><span class="ms-2">Modifier</span></el-dropdown-item>
                      <el-dropdown-item @click="deleteStoryVisible=true"><inline-svg src="/svg/icons/delete-icon.svg"/><span class="ms-2"> Supprimer</span></el-dropdown-item>
                      <el-dropdown-item @click="handleShare"><inline-svg src="/svg/icons/share.svg"/><span class="ms-2">Partager</span></el-dropdown-item>
                    </el-dropdown-menu>
                  </template>                    
            </el-dropdown> -->
            <CardDropdown :duplicate="false" @share="handleShare" @edit="$emit('handle-edit')" @delete="deleteStoryVisible=true"></CardDropdown>
          </div>
        </div>
      </div>
    </div>
  </el-card>
  <DiscardDraftVue 
            :title="$t('story.storyCard.deleteDialog.title')"
            :message="$t('story.storyCard.deleteDialog.message')"
            :discardText="$t('story.storyCard.deleteDialog.discard')" 
            :cancelText="$t('story.storyCard.deleteDialog.goBack')"
            v-if="deleteStoryVisible"
            @discard="handleDelete"
            @close="deleteStoryVisible=false" />
  </div>
</template>

<script lang="ts" >
import { getCreatedDate } from "@/core/helpers/date";
import FeedbackCard from "./FeedbackCard.vue";
import { defineComponent, computed, ref } from "vue";
import StoryEdit from "@/views/main/story/StoryEdit.vue";
import {useStoryStore} from "@/store/useStoryModule.ts"
import DiscardDraftVue from "../shared/DiscardDraft/DiscardDraft.vue";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import i18n from "@/core/i18n/i18n";
import CardDropdown from "../shared/CardDropdown/CardDropdown.vue";
let isEdit = ref(false);

export default defineComponent({
  name: "StoryCard",
  
  props:{
    story : {
        required : true,
        type: Object
    }
  },
  components: { FeedbackCard, StoryEdit, DiscardDraftVue, CardDropdown },

  setup(props){
    const { t } = i18n.global;
    const deleteStoryVisible = ref(false)
    const {deletePublication, fetchStories} = useStoryStore()  
      const handleDuplicate = () => {
      console.log("duplicated");
    }
    const handleDelete = async () => {
      const { error } = await deletePublication(props.story.publicationId, {type:'story'})
      if(!error){
        Components.ElMessage.success(t("story.successMessages.delete"))
      }
      return await fetchStories()
    }
    const handleShare = () => {
      console.log("shared");
    }
    const createdAt = computed(()=>{
        
        return getCreatedDate(props.story.createdAt)

    })
    return { handleDuplicate, handleDelete, handleShare , createdAt, isEdit, deleteStoryVisible }
  }
  })

</script>
 
<style lang="scss" scoped>
:deep(.el-card__body){
  background: $bg-dark-600;
}
.el-dropdown-menu{
  background-color: $bg-dark-500;
  padding:10px;
  border-color:black;
}
:deep(.el-dropdown-menu__item){
 color: $text-color-50;
 
}
:deep(.el-dropdown-menu__item:hover){
  background-color: $white-transparent-11;
  border-radius: 6px;
  color: $text-color-50;
} 
:deep(.el-dropdown-menu__item:hover){
  background-color: $white-transparent-11;
  border-radius: 6px;
  color: $text-color-50;
} 
.image__wrapper {
  position: relative;
  width: 55%;
  .description {
    position: absolute;
    //padding: 0 1%;
    line-height: 1.2;
    width: 100%;
    left: 0;
    bottom: 0;
    padding-top: 5%;
    padding-left: 5%;
    background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 67%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.05) 90%, rgba(0,0,0,0) 100%);
  }
}
.image-responsive {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: 100%;
  display: block;
}
.card__body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 45%;
  padding: 7% 0 0% 0;
  @media screen and (max-width: 1200px) {
    padding: 6% 0 0% 0;
  }
  .stats__items {
    align-self: center;
    .stats__item {
      background: $light-bloom;
      height: 70px;
      min-width: 150px;
      border-radius: 6px;
      padding: 7% 15%;
      font-size: 12px;
      color: $white;

      margin-bottom: 10px;
      @media screen and (max-width: 1200px) {
        margin-inline: auto;
      }
      @media screen and (max-width: 350px) {
        width: 100%;
      }
      .icon__wrapper {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        border-radius: 3px;
        margin-right: 8px;
        cursor: pointer;
        box-shadow: 0px 3px 12px 2px #44d60059;
        box-shadow: 0px 1px 4px 0px #44d60040;
      }
    }
  }
  
  .card__time {
    border-top: solid 1px $bd-card-color;
    height: 50px;
    time {
      font-size: 10px;
      color: $white;
      margin-left: 10px;
    }
  }
}

.icon__wrapper_primary {
  background: $info-color;
}
.icon__wrapper_danger {
  background: $error-color;
}
.icon__wrapper_success {
  background: $success-color;
}
.horizantal-list__more-icon:hover {
  cursor: pointer;
}
.more-icon{
  margin:5px
}
</style>
