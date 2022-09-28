<template>
  <el-form ref="formRef" class="d-flex video-form__container" :rules="rules" :model="video" >
    <div class="m-6  video-form">
        <el-form-item class="w-100" prop="publication.title">
            <label class="w-100">{{$t('video.form.video')}}</label>
        </el-form-item>
        <div class="mt-4 video__container flex-column">
            <span class="video-icon"><inline-svg src="/svg/video/playVideo.svg"/></span>
            <p>{{$t('video.form.addVideo')}}</p>
        </div>
    </div>

     <div class="m-6 aside-form flex-1">
        <el-form-item prop="category.id">
                  <label>{{$t('video.form.type')}}</label>
                  <el-select class="w-100" 
                            size="large"
                            filterable 
                            v-model="video.category.id"
                            :placeholder="$t('video.form.typePlaceholder')"
                              >
                    <el-option  v-for="category in categoryList.data"
                      :value="category.id"
                      :key="category.id"
                      :label="category.label"></el-option>
                  </el-select>

        </el-form-item>
        <el-form-item prop="publication.publicationsOnCommunities">
                <label> {{$t("video.form.activityField")}} </label>
                  <el-select class="w-100" 
                            size="large"
                            name="communities"
                            id="communities"
                            :placeholder=" $t('video.form.activityFieldPlaceholder') "
                            multiple 
                            filterable 
                            v-model="video.publication.publicationsOnCommunities"
                              >
                        
                    <el-option
                      v-for="community in communities.data"
                      :value="community.id"
                      :key="community.id"
                      :label="community.name"
                    ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item prop='publication.description'>
                <label class="w-100">{{ $t("video.form.description")}} </label>
                <CkEditorVue v-model="video.publication.description" />
              </el-form-item>
              <el-form-item>
                <span class="w-100 mt-5 d-flex justify-content-end">
                  <el-button class="cancel-btn" @click="discardVisible=true">{{$t('video.form.cancel')}}</el-button>
                  <el-button class="share-btn" :class="{'valid-btn':formValid}" :disabled="isLoading.form" @click="onSubmit(formRef)">{{isEdit ? $t('video.form.update') : $t('video.form.confirm')}}</el-button
                  >
                </span>
              </el-form-item>
     </div>
   <DiscardDraftVue
    :title="isEdit ? $t('video.form.discardDraft.update.title') : $t('video.form.discardDraft.create.title')"
    :message="isEdit ?  $t('video.form.discardDraft.update.message') : $t('video.form.discardDraft.create.message')"
    :discardText="isEdit ? $t('video.form.discardDraft.update.discard') : $t('video.form.discardDraft.create.discard')" 
    :cancelText="isEdit ? $t('video.form.discardDraft.update.goBack') :  $t('video.form.discardDraft.create.goBack')"
    v-if="discardVisible" @discard="handleDiscard" @close="discardVisible=false" />

  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted , watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { supabase } from "@/core/services/SupabaseClientService";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import UploadVideo from "@/components/JobOfferPath/UploadVideo.vue";
import DiscardDraftVue from '../shared/DiscardDraft/DiscardDraft.vue';
import { useAuthStore } from "@/store/useAuth";
import CkEditorVue from "../CkEditor/CkEditor.vue";
import { useVideoStore } from "@/store/useVideoModule";
import { useCategoryStore } from "@/store/useCategoryModule";
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global


export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
    payload: {
      type: Object,
      required: false,
    },

  },
  components:{UploadVideo, DiscardDraftVue, CkEditorVue
},
  setup(props,{emit}) {
    const {currentUser} = storeToRefs(useAuthStore())
    const { video, error , isLoading, pagination , currentVideoCategory } = storeToRefs(useVideoStore());
    const { createVideo , editVideo , fetchVideos , resetVideo  } = useVideoStore();
    const route = useRoute();
    const category = route.params.category as string
    const formRef = ref<InstanceType<typeof ElForm>>();
    const discardVisible = ref(false)
    const handleDiscard = () => {
      resetVideo()
      emit('close-modal')
    }
    const formValid = ref(props.isEdit)
    const validateForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
         if (!formEl) return;
        formEl.validate(async (valid:boolean) => {
           formValid.value = valid
           formEl.clearValidate()
            return
        })
        return

    }

      watch(()=>video.value,()=>{ 
        validateForm(formRef.value)
      },{deep:true})

    const handleSubmitForm = async () => {
      const successMsg = props.isEdit ? t("video.popup.update") : t("video.popup.create")
      if (props.isEdit) {
       
       await editVideo(props.payload?.videoId);

      } else { 
        await createVideo({id:currentUser.value.id});
         }
      if(!error.value){
         emit('close-modal')
         if(category){
          await fetchVideos({
            pagination:{
              skip: pagination.value.skip,
              take: pagination.value.take,
            },
            type: category
          })
         }
        Components.ElMessage.success(successMsg)
        setTimeout(()=>resetVideo(),200)
      }
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const communities = ref([])
    const {categoryList} = storeToRefs(useCategoryStore())
    const {fetchCategories} = useCategoryStore()
    onMounted(async () => {
        communities.value = await supabase
        .from("Community")
        .select();
        
        if (communities.error ) {
          console.log(communities.error);
        }
        if (!categoryList.value.length){
          fetchCategories()
        }
      });
     const rules = {
    
      'publication.publicationsOnCommunities': [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
      ],
     'category.id': [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
      ],

    }
    return {
      onSubmit,
      formRef,
      communities,
      video,
      rules,
      discardVisible,
      handleDiscard,
      isLoading,
      formValid,
      categoryList
    };
  },
});
</script>
<style lang="scss" scoped>
.video-form__container {
  label{
    margin-top: 10px  ;
    margin-bottom: 5px  ;

  }
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    .video-form {
      flex:1;
    }
  }
}
  .video__container{
    width :402px;
    height:225px;
    padding:10px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 0.78px dashed rgba(255,255,255,0.3);
    background: $bg-dark-500;
  }
  .options__container{
    width:50%;
  }
  .option {
    width:fit-content;
    background: $bg-dark-500;
    width: 190px;
    height: 30px; 
    padding-left:30%;
    display: flex;
    align-items: center;
    border: 0.5px dashed $bg-dark-400;
    border-radius: 10px;

}
.option-text{
  color: $text-color-100;
  font-weight: 400;
}
.aside-form{
  flex:1;
}
.cancel-btn, .cancel-btn:hover, .cancel-btn:focus{
  background: none;
  color:$primary-500;
  border-color:$primary-500;
}
.share-btn, .share-btn:hover, .share-btn:focus{
  background:$info-500;
  color: $text-color-250;
  border-color: transparent;
}

:deep(.el-input__inner) {
  background: $bg-dark-500;
  color: $text-color-50;
  outline:none!important;
  padding: 12px 20px!important;
  border-radius: 5px;
}
:deep(.el-input__inner::placeholder) {
  color:  $text-color-placeholder;
}
:deep(.el-input) {
  --el-input-border-color:none!important;
  --el-input-hover-border-color:none!important;
  --el-input-focus-border-color:none!important;
  }

  :deep(.ck .ck-editor__main>.ck-editor__editable){
    background: $bg-dark-500;
    height: 100px;
    outline:none;
    color:white!important;
}
.video-icon{
  background:$bg-dark-500;
  border-radius:50%;
}
.valid-btn{
  background: $primary-500;
}
.valid-btn:hover{
  background: $primary-500;
}
form:invalid .share-btn {
  background: $info-500;
}
form:valid .share-btn.valid-btn{
  background: $primary-500;
}

</style>
<style lang="scss">
div[id^='el-popper-container-'] {
  z-index: 9999;
}

</style>