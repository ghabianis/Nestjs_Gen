<template>
  <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
    <div class="row m-3 container">
      <div class="col-4 position-relative upload_container" style="height: 400px">
        <!--             <video v-if="form.mediaLink autoplay controls>
              <source :src="form.mediaLink.url" type="video/mp4"/>
        </video>-->
        <el-upload
          accept="video/*"
          :auto-upload="false"
          action
          drag
          show-file-list="false"
          @change="handleMediaChange"
        >
          <div
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: rgba(255, 255, 255, 0.5);
            "
          >
            <img
              src="/svg/story/upload.svg"
              width="45"
              height="45"
              class="mb-2"
            />
            <p v-if="!form.mediaLink">Ajouter vidéo</p>
            <div v-if="form.mediaLink">video exist</div>
          </div>
        </el-upload>
      </div>
      <div class="col-8 align-self-end pe-0 story_data">
        <el-form-item prop="title">
          <label>{{ $t("story.form.title") }}</label>
          <el-input
            v-model="form.title"
            :placeholder="$t('story.form.title')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="publicationsOnCommunities">
          <label>{{ $t("story.form.activityField") }}</label>
          <el-select
            multiple
            size="large"
            name="communities"
            id="communities"
            style="display: block;width: 100%; 'white-space: nowrap"
            v-model="form.publicationsOnCommunities"
            filterable
            value-key="id"
            :placeholder="$t('story.form.activityFieldPlaceholder')"
          >
            <el-option
              selected
              v-for="community in communities.data"
              :id="community.id"
              :key="community.name"
              :label="community.name"
              :value="community.id"
              >{{ community.name }}</el-option
            >
          </el-select>
        </el-form-item>
        <div class="d-flex justify-content-end btn_container" style="margin-top: 90px">
          <el-button
            type="primary"
            plain
            size="large"
            @click="dialogVisible = true"
            >{{ $t("story.form.cancel") }}</el-button
          >
          <el-button type="primary" size="large" @click="onSubmit(formRef)">
            {{
              isEdit
                ? $t("story.form.confirm.update")
                : $t("story.form.confirm.create")
            }}
          </el-button>
        </div>
      </div>
      <el-dialog
        v-model="dialogVisible"
        :title="$t('story.discardDraft.title')"
        width="25%"
        top="35vh"
        :show-close="false"
        custom-class="discard-card"
      >
        <span>{{ $t("story.discardDraft.message") }}</span>
        <template #footer>
          <span>
            <el-button
              type="primary"
              plain
              size="large"
              @click="dialogVisible = false"
              >{{ $t("story.discardDraft.goBack") }}</el-button
            >
            <el-button
              type="primary"
              size="large"
              @click="
                resetForm(formRef),
                  (dialogVisible = false),
                  $emit('close-modal')
              "
              >{{ $t("story.discardDraft.discard") }}</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { supabase } from "@/core/services/SupabaseClientService";
import { useStoryStore } from "@/store/useStoryModule";
import type { FormRules, FormInstance } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import i18n from "@/core/i18n/i18n";
interface NewStoryData {
  mediaLink: any;
  id: string;
  title: string;
  publicationsOnCommunities: any;
}
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
    payload: {
      type: Object,
      required: false,
    },
  },
  components: { Components },
  emits: ["close-modal"],
  setup(props, { emit }) {
    let dialogVisible = ref(false);
    let publications = ref([]);
    const { publication } = storeToRefs(useStoryStore());
    const {
      createPublication,
      editPublication,
      fetchStories,
      getPublicationById,
    } = useStoryStore();
    const { t } = i18n.global;
    const initialState = {
      mediaLink: null,
      id: "",
      title: "",
      publicationsOnCommunities: [],
    };
    let form = ref<NewStoryData>({ ...initialState });
    const formRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
      title: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      publicationsOnCommunities: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
    });

    const handleSubmitForm = async () => {
      if (props.isEdit) {
        const id = props.payload?.id as string;
        let publicationData = {
          type: "story",
          title: form.value.title,
          publicationsOnCommunities: form.value.publicationsOnCommunities,
          story: {
            mediaLink: form.value.mediaLink?.url
              ? form.value.mediaLink.url
              : undefined,
          },
        };
        const { error } = await editPublication(id, publicationData);
        if (!error) {
          emit("close-modal");
          Components.ElMessage.success(t("story.successMessages.update"));
          return await fetchStories();
        }
      } else {
        console.log(
          "form.value.publicationsOnCommunities ,",
          form.value.publicationsOnCommunities
        );
        let data = {
          title: form.value.title,
          publicationsOnCommunities: form.value.publicationsOnCommunities,
          type: "story",
          offer: null,
          story: {
            mediaLink: form.value.mediaLink?.url
              ? form.value.mediaLink.url
              : undefined,
          },
        };
        const { error } = await createPublication(data);
        if (!error) {
          emit("close-modal");
          Components.ElMessage.success(t("story.successMessages.create"));
          return await fetchStories();
        }
      }
    };

    const onSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      console.log("formEl", formEl);
      formEl.validate(async (valid: any) => {
        console.log("valid", valid);
        if (valid) {
          try {
            await handleSubmitForm();
          } catch (error) {
            Components.ElMessage.error(error);
            console.log(error, "error");
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      Object.assign(form.value, initialState);
      formEl.resetFields();
    };
    const getCurrentStory = async (id: string) => {
      if (props.isEdit) {
        await getPublicationById(id);
      }
    };

    const getListOfPublication = () => {
      supabase
        .from("Publication")
        .select("*")
        .then(({ data }) => {
          publications.value = data;
        });
    };

    const communities = ref([]);
    onMounted(async () => {
      if (props.isEdit) {
        let id = props.payload?.id as string;
        await getCurrentStory(id);
      }
      if (!!publication.value && props.isEdit) {
        form.value.mediaLink = publication.value.story.mediaLink;
        form.value.title = publication.value.title;
        form.value.publicationsOnCommunities =
          publication.value.publicationsOnCommunities;
      }

      communities.value = await supabase.from("Community").select();
      if (communities.value.error) {
        console.log(communities.value.error);
      }
    });
    const handleMediaChange = (event: any) => {
      form.value.mediaLink = event.raw;
      form.value.mediaLink.url = URL.createObjectURL(event.raw);
      console.log("mediaLink ", form.value.mediaLink);
    };
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      formRef,
      publications,
      communities,
      handleMediaChange,
      dialogVisible,
    };
  },
});
</script>
<style lang="scss" scoped>
:deep(.el-upload-dragger) {
  height: 100%;
  background-color: #ffffff10;
  width: 100%;
  position: absolute;
  transform: translate(46%, 46%);
}
:deep(.el-upload-list__item) {
  visibility: hidden;
}
:deep(.el-form-item__content) {
  color: white;
  margin-left: 10px !important;
}
:deep(.el-button--primary.is-plain) {
  --el-button-bg-color: transparent;
  --el-button-hover-text-color: var(--el-color-primary);
  --el-button-hover-bg-color: #f586e60d;
  //--el-button-hover-text-color: #000c57;
}
:deep(.el-input__inner) {
  box-shadow: 0 0 0 1px transparent;
  height: 40px;
}
:deep(.el-input) {
  margin: 1% 0%;
}
:deep(.el-dialog) {
  background: $bg-dark-600;
  --el-dialog-border-radius: 10px;
}
:deep(.el-dialog__title),
:deep(.el-dialog__body) {
  color: white;
  word-break: break-word;
}
:deep(.el-dialog__header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.13);
  padding-bottom: var(--el-dialog-padding-primary);
  margin-right: 0;
}
:deep(.el-dialog__footer) {
  border-top: 1px solid rgba(255, 255, 255, 0.13);
  padding-top: var(--el-dialog-padding-primary);
}
.el-button--primary:not(.is-plain) {
  --el-button-text-color: #000c57;
  --el-button-hover-text-color: #000c57;
}
@media screen and (max-width: 1024px) {
  :deep(.el-dialog) {
    width: 35% !important;
  }
}
.container{
  padding: 10px !important;
  margin: 0 !important;
}
@media screen and (max-width: 768px) {
  :deep(.el-dialog) {
    width: 40% !important;
  }
  .upload_container{
    width: 100%;
    height: 200px !important;
  }
  .story_data{
    width:100%;
    padding-left: 0%;
  }
  :deep(.el-form-item__content){
    margin-left: 0% !important;
  }
  :deep(.el-upload-dragger) {
  transform: translate(48%, 42%);
  }
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    margin: 0% !important;
    gap: 1.5rem;
  }
  .btn_container{
    margin-top: 50px !important;
  }
}
</style>
