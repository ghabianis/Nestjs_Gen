<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="name" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="owner" prop="owner">
      <el-input v-model="form.owner" />
    </el-form-item>
    <el-form-item label="presentationContent" prop="presentationContent">
      <el-input v-model="form.presentationContent" />
    </el-form-item>
    <el-form-item label="presentationVideolink" prop="presentationVideolink">
      <el-input v-model="form.presentationVideolink" />
    </el-form-item>
    <el-form-item label="websiteLink" prop="websiteLink">
      <el-input v-model="form.websiteLink" />
    </el-form-item>
    <el-form-item label="linkedinLink" prop="linkedinLink">
      <el-input v-model="form.linkedinLink" />
    </el-form-item>
    <el-form-item label="instagramLink" prop="instagramLink">
      <el-input v-model="form.instagramLink" />
    </el-form-item>
    <el-form-item label="departement" prop="departement">
      <el-input v-model="form.departement" />
    </el-form-item>
    <el-form-item label="workersNumber" prop="workersNumber">
      <el-input-number :min="0" :max="100000" v-model="form.workersNumber" />
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
import { useEntrepriseStore } from "@/store/useEntrepriseModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    const { entreprise, error } = storeToRefs(useEntrepriseStore());
    const {
      getEntrepriseById,
      createEntreprise,
      editEntreprise,
    } = useEntrepriseStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = {
      name: "",
      owner: "",
      presentationContent: "",
      presentationVideolink: "",
      websiteLink: "",
      linkedinLink: "",
      instagramLink: "",
      departement: "",
      workersNumber: 0,
    };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      name: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      owner: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      presentationContent: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      presentationVideolink: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      websiteLink: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      linkedinLink: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      instagramLink: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      departement: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      workersNumber: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      recruiters: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      chatrooms: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      chats: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      followEntreprises: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      surveys: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      posts: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      videos: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      usersOnEntreprises: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      entreprisesOnCommunities: [
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
        return await editEntreprise({ data: form, id });
      } else await createEntreprise(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-entreprise" });
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
    const getCurrentEntreprise = async (id: string) => {
      if (props.isEdit) {
        await getEntrepriseById(id);
      }
    };

    onMounted(async () => {
      const id = route.params.id as string;

      await getCurrentEntreprise(id);
      if (!!entreprise.value && props.isEdit) {
        [
          "name",
          "owner",
          "presentationContent",
          "presentationVideolink",
          "websiteLink",
          "linkedinLink",
          "instagramLink",
          "departement",
          "workersNumber",
          "recruiters",
          "chatrooms",
          "chats",
          "followEntreprises",
          "surveys",
          "posts",
          "videos",
          "usersOnEntreprises",
          "entreprisesOnCommunities",
        ].forEach((item) => {
          form[item] = entreprise.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
    };
  },
});
</script>
