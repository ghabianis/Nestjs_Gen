<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="title" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="description" prop="description">
      <el-input v-model="form.description" />
    </el-form-item>
    <el-form-item label="questionType_id" prop="QuestionType">
      <el-select
        v-model="form.questionType.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="questiontype in questiontypes"
          :label="questiontype.id"
          :key="questiontype.id"
          :value="questiontype.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="offer_id" prop="Offer">
      <el-select
        v-model="form.offer.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="offer in offers"
          :label="offer.id"
          :key="offer.id"
          :value="offer.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="video_id" prop="Video">
      <el-select
        v-model="form.video.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="video in videos"
          :label="video.id"
          :key="video.id"
          :value="video.id"
        />
      </el-select>
    </el-form-item>
    <div class="d-flex justify-content-end">
      <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
      <el-button type="primary" @click="onSubmit(ruleFormRef)"
        >Create</el-button
      >
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { supabase } from "@/core/services/SupabaseClientService";
import { useQuestionStore } from "@/store/useQuestionModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let questiontypes = ref([]);
    let offers = ref([]);
    let videos = ref([]);
    const { question, error } = storeToRefs(useQuestionStore());
    const { getQuestionById, createQuestion, editQuestion } =
      useQuestionStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = {
      title: "",
      description: "",
      questionType: { id: "" },
      offer: { id: "" },
      video: { id: "" },
    };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      title: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      description: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      questionType: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      offer: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      video: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
    });

    const handleSubmitForm = async () => {
      if (props.isEdit) {
        const id = route?.params?.id as string;
        return await editQuestion({ data: form, id });
      } else await createQuestion(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-question" });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      Object.assign(form, initialState);
      formEl.resetFields();
    };
    const getCurrentQuestion = async (id: string) => {
      if (props.isEdit) {
        await getQuestionById(id);
      }
    };

    const getListOfQuestionType = () => {
      supabase
        .from("QuestionType")
        .select("*")
        .then(({ data }) => {
          questiontypes.value = data;
        });
    };
    const getListOfOffer = () => {
      supabase
        .from("Offer")
        .select("*")
        .then(({ data }) => {
          offers.value = data;
        });
    };
    const getListOfVideo = () => {
      supabase
        .from("Video")
        .select("*")
        .then(({ data }) => {
          videos.value = data;
        });
    };

    onMounted(async () => {
      const id = route.params.id as string;
      getListOfQuestionType();
      getListOfOffer();
      getListOfVideo();
      await getCurrentQuestion(id);
      if (!!question.value && props.isEdit) {
        ["title", "description", "questionType", "offer", "video"].forEach(
          (item) => {
            form[item] = question.value[item];
          }
        );
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      questiontypes,
      offers,
      videos,
    };
  },
});
</script>
