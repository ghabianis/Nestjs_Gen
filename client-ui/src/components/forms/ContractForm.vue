<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="name" prop="name">
      <el-input v-model="form.name" />
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
import { useContractStore } from "@/store/useContractModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    const { contract, error } = storeToRefs(useContractStore());
    const {
      getContractById,
      createContract,
      editContract,
    } = useContractStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { name: "" };
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
      contractsOnCandidates: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      offers: [
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
        return await editContract({ data: form, id });
      } else await createContract(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-contract" });
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
    const getCurrentContract = async (id: string) => {
      if (props.isEdit) {
        await getContractById(id);
      }
    };

    onMounted(async () => {
      const id = route.params.id as string;

      await getCurrentContract(id);
      if (!!contract.value && props.isEdit) {
        ["name", "contractsOnCandidates", "offers"].forEach((item) => {
          form[item] = contract.value[item];
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
