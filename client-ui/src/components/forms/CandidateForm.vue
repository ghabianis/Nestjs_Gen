<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="activityField" prop="activityField">
      <el-input v-model="form.activityField" />
    </el-form-item>
    <el-form-item label="wantedPost" prop="wantedPost">
      <el-input v-model="form.wantedPost" />
    </el-form-item>
    <el-form-item label="experiencesYears" prop="experiencesYears">
      <el-input-number :min="0" :max="100000" v-model="form.experiencesYears" />
    </el-form-item>
    <el-form-item label="languages" prop="languages">
      <el-input v-model="form.languages" />
    </el-form-item>
    <el-form-item label="tags" prop="tags">
      <el-input v-model="form.tags" />
    </el-form-item>
    <el-form-item label="maxSalary" prop="maxSalary">
      <el-input-number :min="0" :max="100000" v-model="form.maxSalary" />
    </el-form-item>
    <el-form-item label="minSalary" prop="minSalary">
      <el-input-number :min="0" :max="100000" v-model="form.minSalary" />
    </el-form-item>
    <el-form-item label="personalCv" prop="personalCv">
      <el-input v-model="form.personalCv" />
    </el-form-item>
    <el-form-item label="mediaLink" prop="mediaLink">
      <el-input v-model="form.mediaLink" />
    </el-form-item>
    <el-form-item label="contract_id" prop="Contract">
      <el-select
        v-model="form.contract.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="contract in contracts"
          :label="contract.id"
          :key="contract.id"
          :value="contract.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="job_id" prop="Job">
      <el-select
        v-model="form.job.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="job in jobs"
          :label="job.id"
          :key="job.id"
          :value="job.id"
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
import { useCandidateStore } from "@/store/useCandidateModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let contracts = ref([]);
    let jobs = ref([]);
    let users = ref([]);
    const { candidate, error } = storeToRefs(useCandidateStore());
    const { getCandidateById, createCandidate, editCandidate } =
      useCandidateStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = {
      activityField: "",
      wantedPost: "",
      experiencesYears: 0,
      languages: "",
      tags: "",
      maxSalary: 0,
      minSalary: 0,
      personalCv: "",
      mediaLink: "",
      contract: { id: "" },
      job: { id: "" },
    };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      activityField: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      wantedPost: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      experiencesYears: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      languages: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      tags: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      maxSalary: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      minSalary: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      personalCv: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      mediaLink: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      contractsOnCandidates: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      job: [
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
      candidatesOnChatrooms: [
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
      experiences: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      courses: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      user: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
    });

    const handleSubmitForm = async () => {
      if (props.isEdit) {
        const id = route?.params?.id as string;
        return await editCandidate({ data: form, id });
      } else await createCandidate(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-candidate" });
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
    const getCurrentCandidate = async (id: string) => {
      if (props.isEdit) {
        await getCandidateById(id);
      }
    };

/*     const getListOfContract = () => {
      supabase
        .from("Contract")
        .select("*")
        .then(({ data }) => {
          contracts.value = data;
        });
    }; */
    const getListOfJob = () => {
      supabase
        .from("Job")
        .select("*")
        .then(({ data }) => {
          jobs.value = data;
        });
    };
    const getListOfUser = () => {
      supabase
        .from("User")
        .select("*")
        .then(({ data }) => {
          users.value = data;
        });
    };

    onMounted(async () => {
      const id = route.params.id as string;
      //getListOfContract();
      getListOfJob();
      getListOfUser();
      await getCurrentCandidate(id);
      if (!!candidate.value && props.isEdit) {
        [
          "activityField",
          "wantedPost",
          "experiencesYears",
          "languages",
          "tags",
          "maxSalary",
          "minSalary",
          "personalCv",
          "mediaLink",
          "contractsOnCandidates",
          "job",
          "chats",
          "candidatesOnChatrooms",
          "followEntreprises",
          "experiences",
          "courses",
          "user",
        ].forEach((item) => {
          form[item] = candidate.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      contracts,
      jobs,
      users,
    };
  },
});
</script>
