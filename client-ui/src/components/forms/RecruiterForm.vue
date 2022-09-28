<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
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
import { useRecruiterStore } from "@/store/useRecruiterModule";
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
    let users = ref([]);
    const { recruiter, error } = storeToRefs(useRecruiterStore());
    const { getRecruiterById, createRecruiter, editRecruiter } =
      useRecruiterStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { entreprise: { id: "" } };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      entreprise: [
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
        return await editRecruiter({ data: form, id });
      } else await createRecruiter(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-recruiter" });
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
    const getCurrentRecruiter = async (id: string) => {
      if (props.isEdit) {
        await getRecruiterById(id);
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
      getListOfEntreprise();
      getListOfUser();
      await getCurrentRecruiter(id);
      if (!!recruiter.value && props.isEdit) {
        ["entreprise", "user"].forEach((item) => {
          form[item] = recruiter.value[item];
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
      users,
    };
  },
});
</script>
