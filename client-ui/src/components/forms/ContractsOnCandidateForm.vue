<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
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
import { useContractsOnCandidateStore } from "@/store/useContractsOnCandidateModule";
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
    let contracts = ref([]);
    const { contractsoncandidate, error } = storeToRefs(
      useContractsOnCandidateStore()
    );
    const {
      getContractsOnCandidateById,
      createContractsOnCandidate,
      editContractsOnCandidate,
    } = useContractsOnCandidateStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { candidate: { id: "" }, contract: { id: "" } };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      candidate: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      contract: [
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
        return await editContractsOnCandidate({ data: form, id });
      } else await createContractsOnCandidate(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-contractsoncandidate" });
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
    const getCurrentContractsOnCandidate = async (id: string) => {
      if (props.isEdit) {
        await getContractsOnCandidateById(id);
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
    const getListOfContract = () => {
      supabase
        .from("Contract")
        .select("*")
        .then(({ data }) => {
          contracts.value = data;
        });
    };

    onMounted(async () => {
      const id = route.params.id as string;
      getListOfCandidate();
      getListOfContract();
      await getCurrentContractsOnCandidate(id);
      if (!!contractsoncandidate.value && props.isEdit) {
        ["candidate", "contract"].forEach((item) => {
          form[item] = contractsoncandidate.value[item];
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
      contracts,
    };
  },
});
</script>
