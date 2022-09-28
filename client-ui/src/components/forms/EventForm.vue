 <template>
  <el-form class="d-flex p-6 event-form__container" ref="ruleFormRef" :model="event" :rules="rules">
    <div class="d-flex gap-5 w-100 justify-centent-between forms-container">
      <div style="width:40%">
      <el-form-item class="w-100" prop="startDate">
          <div class="w-100">
            <label>{{ $t("event.form.eventStartDate") }}*</label>
            <div class="d-flex align-items-center pe-5 date-picker__container" >
              <el-date-picker
                type="datetime"
                size ="large"
                style="width:100%;"
                v-model="event.startDate"
                format="YYYY/MM/DD hh:mm A"
                ref="datePickerStartRef"
                :placeholder="$t('event.form.eventStartDatePlaceholder')"
                >
                </el-date-picker>
                <el-icon class="date-picker__icon" @click="$refs.datePickerStartRef.focus()"><Calendar/></el-icon>
             </div> 
          </div>
          </el-form-item>
      <el-form-item class="w-100" prop="endDate">
          <div class="w-100">
            <label>{{ $t("event.form.eventEndDate") }}*</label>
            <div class="d-flex align-items-center pe-5 date-picker__container">
              <el-date-picker
                type="datetime"
                size ="large"
                style="width:100%"
                v-model="event.endDate"
                format="YYYY/MM/DD hh:mm A"
                ref="datePickerEndRef"
                :placeholder="$t('event.form.eventEndDatePlaceholder')"
              />
              <el-icon class="date-picker__icon"  @click="$refs.datePickerEndRef.focus()"><Calendar/></el-icon>
             </div>
          </div>
          </el-form-item>
          <el-form-item :prop="!event.eventMode ? 'location' : 'publication' "
          :rules="{required: true, message: `${$t('entityForm.validation.required')}` , trigger: 'change'}"
          >
            <label>{{ $t("event.form.eventMode") }}*</label>
            <el-select class="w-100" 
                       size="large"
                       :placeholder=" $t('event.form.eventModePlaceholder')"
                       v-model="event.eventMode"
                       required
                        >
              <el-option
                value="On-site"
                label="On-site"
              />
             <el-option
                value="Remote"
                label="Remote"
              />
             <el-option
                value="Hybrid"
                label="Hybrid"
              /> 
            </el-select>
        </el-form-item>
        <el-form-item v-if="event.eventMode && ['Hybrid','On-site'].includes(event.eventMode)" prop="location">
            <label>{{ $t("event.form.location") }}*</label>
            <el-input
              size="large"
              type="text"
              :placeholder="$t('event.form.locationPlaceholder')"
              v-model="event.location"
              required
            />
        </el-form-item>
        <el-form-item v-if="event.eventMode && ['Hybrid','Remote'].includes(event.eventMode)" prop="link">
            <label>{{ $t("event.form.link") }}*</label>
            <el-input
              size="large"
              type="text"
              :placeholder="$t('event.form.linkPlaceholder')"
              v-model="event.link"
              required
            />
        </el-form-item>
        <el-form-item class="w-100">
          <label class="w-100">{{ $t("event.form.speakers") }}</label>
          <div class="w-100">
             <InputTagVue @change="handleSpeakerAdd" @delete="handleSpeakerDelete" :tags="event.speakers" :btnText="$t('event.form.speakersButton') "/> </div>    
        </el-form-item>
      </div>
      <div class="pt-5" style="width:60%;">
         <el-form-item class="w-100">
        <el-upload drag class="w-100">
          <el-icon style="font-size:68px;color:#A8ABB2;"><upload-filled /></el-icon>
          <div class="upload__text">
            Drop file/Video here or <span class="upload__text-click">click to upload</span>
          </div>
        </el-upload>
      </el-form-item>
        <el-form-item prop='publication.title'>
          <label>{{ $t("event.form.title") }}*</label>
          <el-input
            size="large"
            type="text"
            :placeholder="$t('event.form.titlePlaceholder')"
            v-model="event.publication.title"
            required
          />
        </el-form-item>
        <el-form-item prop="publication.publicationsOnCommunities" >
          <label>{{ $t("event.form.activityField") }}</label>
            <el-select class="w-100" 
                       size="large"
                       name="communities"
                       id="communities"
                       :placeholder=" $t('event.form.activityFieldPlaceholder') "
                       multiple 
                       filterable
                       required
                       v-model="event.publication.publicationsOnCommunities"
                       
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
          <label class="w-100">{{ $t("event.form.description") }}</label>
          <CkEditorVue v-model="event.publication.description"/>
        </el-form-item>
        <el-form-item prop='publication.description'>
          <span class="w-100 mt-5 d-flex justify-content-end">
            <el-button class="cancel-btn" @click="discardVisible=true">{{ $t('event.form.cancel') }}</el-button>
            <el-button class="share-btn"  :class="{'valid-btn':formValid}"  @click="onSubmit(ruleFormRef)">{{isEdit ? $t('event.form.update') : $t('event.form.confirm')}}</el-button
            >
          </span>
        </el-form-item>
       </div>  
    </div>
   <DiscardDraftVue
    :title="isEdit ? $t('event.form.discardDraft.update.title') : $t('event.form.discardDraft.create.title')"
    :message="isEdit ?  $t('event.form.discardDraft.update.message') : $t('event.form.discardDraft.create.message')"
    :discardText="isEdit ? $t('event.form.discardDraft.update.discard') : $t('event.form.discardDraft.create.discard')" 
    :cancelText="isEdit ? $t('event.form.discardDraft.update.goBack') :  $t('event.form.discardDraft.create.goBack')"
    v-if="discardVisible" @discard="handleDiscard" @close="discardVisible=false" />
  
  </el-form>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue'
import { supabase } from "@/core/services/SupabaseClientService";
import { storeToRefs } from "pinia";
import { useEventStore } from '@/store/useEventModule';
import InputTagVue from '../shared/InputTag/InputTag.vue'; 
import DiscardDraftVue from '../shared/DiscardDraft/DiscardDraft.vue';
import CkEditorVue from '../CkEditor/CkEditor.vue'; 
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { useAuthStore } from "@/store/useAuth";
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global

enum EventMode {
  Hybrid = "Hybrid",
  Remote = "Remote",
  OnSite = "On-site" 
}
export default defineComponent({
      components: {
      InputTagVue,
      DiscardDraftVue,
      CkEditorVue
  },
  props:{
    eventId : {
      type:String,
      required:false
    },
    isEdit:{
      required:true,
      type:Boolean
    }
  },

  setup(props,{emit}) {
      const {currentUser} = useAuthStore()
      const ruleFormRef = ref<InstanceType<typeof ElForm>>();
      const {  createEvent, setEvent, resetEvent, removeEventSpeaker, getEventById, fetchEvents, editEvent } = useEventStore();
      const { addEventSpeaker } = useEventStore();
      const communities = ref([])
      const {event, error} = storeToRefs(useEventStore())
      const discardVisible = ref(false)
      onMounted( async()=> {
        communities.value = await supabase
        .from("Community")
        .select();
        
        if (communities.value.error ) {
          console.log(communities.value.error);
        }
      })
      const handleSpeakerAdd = (speaker:string)=> {
        addEventSpeaker(speaker)
      }
     const handleSubmitForm = async () => {
      const successMsg = props.isEdit ? t("event.popup.update") : t("event.popup.create")
      if(props.isEdit){
        await editEvent(event.value.id)

        await fetchEvents({
          skip: 0,
          take: 3,
      });
      }else{
      await createEvent({id:currentUser.id})
      await fetchEvents({
        skip: 0,
        take: 3,
      });
      }
      emit('close-modal')
      Components.ElMessage.success(successMsg)
      resetEvent()
    }

      const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const handleDiscard = () => {
      resetEvent()
      emit('close-modal')
    }
    const handleSpeakerDelete = (tag: string) => {
      removeEventSpeaker(tag)
    }
    
    const checkStartDate = (rule: any, value: any, callback: any) => {
        if (event.value.endDate && (value) > (event.value.endDate)) {
          callback(new Error('Date début non valide'))
        } else {
            if(ruleFormRef && ruleFormRef.value){
              ruleFormRef.value.clearValidate(['endDate','startDate'])
              }
          callback()
        }
  }

    const checkEndDate = (rule: any, value: any, callback: any) => {
        if (event.value.startDate && (value) < (event.value.startDate)) {
          callback(new Error('Date fin non valide'))
        } else {
            if(ruleFormRef && ruleFormRef.value){
              ruleFormRef.value.clearValidate(['endDate','startDate'])
              }
          callback()
        }
  }
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
      
    watch(()=>event.value,()=>{ 
        validateForm(ruleFormRef.value)
      },{deep:true})


    const rules = {
      startDate: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
      {
         validator: checkStartDate, 
         trigger: 'change'
       }

      ],
      endDate: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
       {
         validator: checkEndDate, 
         trigger: 'change'
       }

      ],
      location: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      link: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      'publication.title': [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      'publication.publicationsOnCommunities': [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
      ]      
    }
  return {communities, event,handleSpeakerAdd, rules, onSubmit,ruleFormRef, discardVisible, handleSpeakerDelete, handleDiscard, formValid }
  },
})
</script>
<style scoped lang="scss">
.el-form-item {
  label{
    color:$text-color-50;
    font-weight: 500;
    margin-top: 10px  ;
    margin-bottom: 5px  ;
  }
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
.valid-btn{
  background: $primary-500;
}
.valid-btn:hover{
  background: $primary-500;
}
:deep(.el-input__inner) {
  background: $bg-dark-500;
  color: $text-color-50;
  outline:none!important;
  border:none!important;
  padding: 12px 10px!important;
  border-radius: 5px;
}
:deep(.el-input__inner::placeholder) {
  color:  $text-color-placeholder;
}
.event-form__container .el-input{
  --el-input-border-color:none;
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
:deep(.el-picker-panel){
  background:rgb(80, 47, 47)!important;
}
.date-picker__icon{
  font-size:24px;
  padding:5px; 
  background:$white-transparent-11;
  color:white;
}
.date-picker__icon:hover{
  cursor: pointer;
}

.date-picker__container{
  background: $bg-dark-500;
  border-radius: 5px;

}
form:invalid .share-btn {
  background: $info-500;
}
form:valid .share-btn.valid-btn{
  background: $primary-500;
}

</style>
<style lang="scss">
.el-date-picker__header{
  color:white!important;
}
.el-picker-panel__body {
  background: $bg-dark-600!important;
  color:white;
}
.el-picker-panel__footer{
  background: $bg-dark-600!important;
  color:white;
}
.el-picker__popper{
  border:none!important;
  border-radius: 20px!important;
}
.el-picker-panel__icon-btn{
  color:white!important;
}
.el-date-picker__header-label{
  color: white!important;
}
.el-time-panel__footer .cancel {
  color:$bg-dark-400;
  
}
.current .el-date-table-cell__text {
  color: $text-color-250!important;;
}
.el-date-picker__editor-wrap .el-input{
  --el-input-border-color:none;
  .el-input__inner {
    background: $bg-dark-600;
  }
}
.el-time-panel{
  background: $bg-dark-600!important;
}
.el-time-spinner__item{
  color:white!important;
}
.el-time-spinner__item + .is-active{
  color: $white-50!important;
}
.el-time-spinner__item:hover{
  background:transparent!important;
}
.event-form__container .el-input {
  --el-input-border-color:none!important;
  --el-input-hover-border-color:none!important;
  --el-input-focus-border-color:none!important;
  }
.event-form__container .el-input__prefix{
  display: none!important;
}

</style>