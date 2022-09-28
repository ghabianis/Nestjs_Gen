<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="firstName" prop="firstName">
      <el-input v-model="form.firstName" />
    </el-form-item>
    <el-form-item label="lastName" prop="lastName">
      <el-input v-model="form.lastName" />
    </el-form-item>
    <el-form-item label="username" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="roles" prop="roles">
      <el-input v-model="form.roles" />
    </el-form-item>
    <el-form-item label="email" prop="email">
      <el-input v-model="form.email" type="email" />
    </el-form-item>
    <el-form-item label="phone" prop="phone">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="address" prop="address">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="candidate_id" prop="Candidate">
      <el-select
        v-model="form.candidate.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="candidate in candidates"
          :label="candidate.id"
          :key="candidate.id"
          :value="candidate.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="recruiter_id" prop="Recruiter">
      <el-select
        v-model="form.recruiter.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="recruiter in recruiters"
          :label="recruiter.id"
          :key="recruiter.id"
          :value="recruiter.id"
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
import { useUserStore } from "@/store/useUserModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let candidates = ref([]);
    let recruiters = ref([]);
    const { user, error } = storeToRefs(useUserStore());
    const { getUserById, createUser, editUser } = useUserStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = {
      firstName: "",
      lastName: "",
      username: "",
      roles: "",
      email: "",
      phone: "",
      address: "",
      candidate: { id: "" },
      recruiter: { id: "" },
    };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      firstName: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      lastName: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      username: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      roles: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      candidate: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      recruiter: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      comments: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      feedbacks: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      publications: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      socialinterractions: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      usersOnCommunities: [
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
      usersSkills: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      email: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      phone: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      address: [
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
        return await editUser({ data: form, id });
      } else await createUser(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-user" });
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
    const getCurrentUser = async (id: string) => {
      if (props.isEdit) {
        await getUserById(id);
      }
    };

    const getListOfCandidate = () => {
      supabase
        .from("Candidate")
        .select("*")
        .then(({ data }) => {
          candidates.value = data;
        });
    };
    const getListOfRecruiter = () => {
      supabase
        .from("Recruiter")
        .select("*")
        .then(({ data }) => {
          recruiters.value = data;
        });
    };

    onMounted(async () => {
      const id = route.params.id as string;
      getListOfCandidate();
      getListOfRecruiter();
      await getCurrentUser(id);
      if (!!user.value && props.isEdit) {
        [
          "firstName",
          "lastName",
          "username",
          "password",
          "roles",
          "candidate",
          "recruiter",
          "comments",
          "feedbacks",
          "publications",
          "socialinterractions",
          "usersOnCommunities",
          "usersOnEntreprises",
          "usersSkills",
          "email",
          "phone",
          "address",
        ].forEach((item) => {
          form[item] = user.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      candidates,
      recruiters,
    };
  },
});
</script>
