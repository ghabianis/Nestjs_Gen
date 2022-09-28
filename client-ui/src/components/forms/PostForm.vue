<template>
  <el-form ref="ruleFormRef" class="d-flex post-form__container" :rules="rules" :model="post" >
      <div class="m-6 mt-8 flex-1 upload-video">
        <div class="d-flex flex-column align-items-center gap-3 options__container">
          <el-upload class="option" action>
            <inline-svg src="/svg/icons/UploadVideoIcons/uploadIcon.svg" />
            <span class="ms-3 fs-9 option-text" > {{$t("post.form.upload")}}</span>
          </el-upload>
          
          <el-upload class="option" action>
            <inline-svg src="/svg/icons/UploadVideoIcons/cameraIcon.svg" />
            <span class="ms-3 fs-9 option-text">{{ $t("post.form.camera")}}</span>
          </el-upload>
          
          <div class="option ">
            <inline-svg src="/svg/icons/UploadVideoIcons/recentsIcon.svg" />
            <span class="ms-3 fs-9 option-text">{{ $t("post.form.recent")}}</span>
          </div>
       </div>
     </div>
     <div class="m-6 aside-form">
        <el-form-item prop="publication.publicationsOnCommunities">
                <label>{{ $t("post.form.activityField") }}</label>
                  <el-select class="w-100" 
                            size="large"
                            name="communities"
                            id="communities"
                            :placeholder=" $t('post.form.activityFieldPlaceholder') "
                            multiple 
                            filterable 
                            v-model="post.publication.publicationsOnCommunities" 
                              >
                    <el-option
                      v-for="community in communities.data"
                      :value="community.id"
                      :key="community.id"
                      :label="community.name"
                    ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                <label class="w-100">{{ $t("post.form.description") }}</label>
                <CkEditorVue v-model="post.publication.description" />
              </el-form-item>
              <el-form-item>
                <span class="w-100 mt-5 d-flex justify-content-end">
                  <el-button class="cancel-btn" @click="discardVisible=true">{{$t('post.form.cancel')}}</el-button>
                  <el-button class="share-btn" :class="{'valid-btn':formValid}" @click="onSubmit(ruleFormRef)">{{isEdit ? $t('post.form.update') : $t('post.form.confirm')}}</el-button
                  >
                </span>
              </el-form-item>
     </div>
   <DiscardDraftVue 
    :title="isEdit ? $t('event.form.discardDraft.update.title') : $t('event.form.discardDraft.create.title')"
    :message="isEdit ?  $t('event.form.discardDraft.update.message') : $t('event.form.discardDraft.create.message')"
    :discardText="isEdit ? $t('event.form.discardDraft.update.discard') : $t('event.form.discardDraft.create.discard')" 
    :cancelText="isEdit ? $t('event.form.discardDraft.update.goBack') :  $t('event.form.discardDraft.create.goBack')"
    v-if="discardVisible"
    @discard="handleDiscard"
    @close="discardVisible=false" />

  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { supabase } from "@/core/services/SupabaseClientService";
import { usePostStore } from "@/store/usePostModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import UploadVideo from "@/components/JobOfferPath/UploadVideo.vue";
import DiscardDraftVue from '../shared/DiscardDraft/DiscardDraft.vue';
import { useAuthStore } from "@/store/useAuth";
import CkEditorVue from '../CkEditor/CkEditor.vue'; 
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global

export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  components:{UploadVideo, CkEditorVue,DiscardDraftVue
},
  setup(props,{emit}) {
    const {currentUser} = storeToRefs(useAuthStore())
    const { post, error , pagination } = storeToRefs(usePostStore());
    const { getPostById, createPost, editPost , resetPost , fetchPosts } = usePostStore();
    const route = useRoute();
    const router = useRouter();
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const discardVisible = ref(false)
    const handleDiscard = () => {
      resetPost()
      emit('close-modal')
    }

    const handleSubmitForm = async () => {
      const successMsg = props.isEdit ? t("post.popup.update") : t("post.popup.create")
      if (props.isEdit) {
       
       await editPost(post.value.id);
        await fetchPosts({
          skip: pagination.value.skip,
          take: pagination.value.take,
        })

      } else { 
        await createPost({id:currentUser.value.id});
        await fetchPosts({
          skip: pagination.value.skip,
          take: pagination.value.take,
        })
         }
      emit('close-modal')
      Components.ElMessage.success(successMsg)
      setTimeout(()=>resetPost(),1000)
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-post" });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const communities = ref([])

    onMounted(async () => {
        communities.value =await supabase
        .from("Community")
        .select();
        
        if (communities.error ) {
          console.log(communities.error);
        }    
      });

    const formValid = ref(false)
    const validateForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
         if (!formEl) return;
        formEl.validate(async (valid:boolean) => {
        formValid.value = valid
        formEl.clearValidate()
          return
        })
        return
    }
    watch(()=>post.value,()=>{ 
      validateForm(ruleFormRef.value)
    },{deep:true})

     const rules = {
    
      'publication.publicationsOnCommunities': [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
      ],
    }

    return {
      onSubmit,
      ruleFormRef,
      communities,
      post,
      rules,
      discardVisible,
      handleDiscard,
      formValid
    };
  },
});
</script>
<style lang="scss" scoped>
.post-form__container {
  label{
    color:$text-color-50;
    font-weight: 500;
    margin-top: 10px  ;
    margin-bottom: 5px  ;
  }
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
  }
}
  .upload-video{
    width :402px;
    height:225px;
    padding:10px;
    background: $bg-dark-500;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 0.78px dashed rgba(255,255,255,0.3);
    background: rgba($bg-dark-500, 0.3);
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
  background: $info-500;
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