<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="title" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="content" prop="content">
      <el-input v-model="form.content" />
    </el-form-item>
    <el-form-item label="entreprise_id" prop="Entreprise">
      <el-select
        v-model="form.entreprise.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="entreprise in entreprises"
          :label="entreprise.id"
          :key="entreprise.id"
          :value="entreprise.id"
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
import { useSurveyStore } from "@/store/useSurveyModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let entreprises = ref([]);
    const { survey, error } = storeToRefs(useSurveyStore());
    const { getSurveyById, createSurvey, editSurvey } = useSurveyStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { title: "", content: "", entreprise: { id: "" } };
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
      content: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      entreprise: [
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
        return await editSurvey({ data: form, id });
      } else await createSurvey(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-survey" });
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
    const getCurrentSurvey = async (id: string) => {
      if (props.isEdit) {
        await getSurveyById(id);
      }
    };

    const getListOfEntreprise = () => {
      supabase
        .from("Entreprise")
        .select("*")
        .then(({ data }) => {
          entreprises.value = data;
        });
    };

    onMounted(async () => {
      const id = route.params.id as string;
      getListOfEntreprise();
      await getCurrentSurvey(id);
      if (!!survey.value && props.isEdit) {
        ["title", "content", "entreprise"].forEach((item) => {
          form[item] = survey.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      entreprises,
    };
  },
});
</script>
