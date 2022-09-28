<template>
  <div class="offer-asside__container">
      <el-form-item class="row mb-0">
        <el-upload drag class="col">
    <el-icon style="font-size:68px;color:#A8ABB2;"><upload-filled /></el-icon>
          <div class="upload__text">
            Drop file/Video here or <span class="upload__text-click">click to upload</span>
          </div>
        <template #tip>
          <span class="fs-7 upload__tip">files size less than 500mb</span>
        </template>
        </el-upload>
      </el-form-item>
        <el-form-item prop="title">
            <label>{{ $t("offer.form.title") }}</label>
            <el-input size="large" required maxLength="40" type="text" :placeholder="$t('offer.form.titlePlaceholder')" v-model="publication.title"/>
          </el-form-item>
          <el-form-item class="w-100" prop="publicationsOnCommunities" >
            <label class="w-100">{{ $t("offer.form.activityField") }}</label>
            <el-select class="w-100" 
                       size="large"
                       name="communities"
                       id="communities"
                       v-model="publication.publicationsOnCommunities"
                       :placeholder="$t('offer.form.activityFieldPlaceholder')"
                       multiple
                       required 
                       filterable >
              <el-option
                v-for="community in communities.data"
                :value="community.id"
                :key="community.id"
                :label="community.name"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="w-100">
          <label class="w-100">{{ $t("offer.form.description") }}</label>
          <CkEditorVue v-model="publication.description"/>
        </el-form-item>

  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch} from 'vue'
import { usePublicationStore } from "@/store/usePublicationModule";
import { storeToRefs } from "pinia";
import { supabase } from "@/core/services/SupabaseClientService";
import { t } from "@/core/i18n/translate";
import CkEditorVue from '../CkEditor/CkEditor.vue'; 
export default defineComponent({
    name: 'OfferAsideForm',
      props: {
    rules : Object,
  },
    components: {
      CkEditorVue
  },
    
    setup() {
      const {publication, error} = storeToRefs(usePublicationStore())     
      const communities = ref([])
      onMounted( async()=> {
        communities.value = await supabase
        .from("Community")
        .select();
        console.log(communities.value);
        
        if (communities.value.error ) {
          console.log(communities.value.error);
        }
      })
    return {publication , communities, }
    },
})
</script>
<style lang="scss" scoped>
  .offer-asside__container{
    background:$bg-dark-600;
    box-shadow: 0px 0px 2px $shadow-card-color;
    border-radius: 10px;
    animation: tabs-anim 1s ease 0s 1 normal forwards;
    padding : 20px;
      :deep(.el-input__inner) {
        background-color: $bg-dark-500;
        color: $text-color-50;
        border-radius: 5px;
      }
      label{
            margin: 7px 0 5px 0;
          }
      :deep(.el-input) {
        margin-bottom: 3px ;
      }
  }
  :deep(.el-upload-dragger) {
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $bg-dark-400;
    height: fit-content;

  }
  :deep(.el-upload) {
    width:100%;
  }

  .upload__text {
    color:$text-color-100;
  }
  .upload__text-click {
    color: $primary-500;
  }
  .upload__tip {
    color:$text-color-100;
  }
  @keyframes tabs-anim {
  0% {
    animation-timing-function: ease-in;
    transform: translateY(0px);
  }

  40% {
    animation-timing-function: ease-in;
    transform: translateY(2px);
  }
  25%,
  55%,
  75%,
  87%,
  98% {
    animation-timing-function: ease-out;
    transform: translateY(4px);
  }

  100% {
    animation-timing-function: ease-out;
    transform: translateY(4px);
  }
}
</style>
