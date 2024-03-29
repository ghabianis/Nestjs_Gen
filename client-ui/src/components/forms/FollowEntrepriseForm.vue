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
import { useFollowEntrepriseStore } from "@/store/useFollowEntrepriseModule";
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
    let candidates = ref([]);
    const { followentreprise, error } = storeToRefs(useFollowEntrepriseStore());
    const {
      getFollowEntrepriseById,
      createFollowEntreprise,
      editFollowEntreprise,
    } = useFollowEntrepriseStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { entreprise: { id: "" }, candidate: { id: "" } };
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
      candidate: [
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
        return await editFollowEntreprise({ data: form, id });
      } else await createFollowEntreprise(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-followentreprise" });
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
    const getCurrentFollowEntreprise = async (id: string) => {
      if (props.isEdit) {
        await getFollowEntrepriseById(id);
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
    const getListOfCandidate = () => {
      supabase
        .from("Candidate")
        .select("*")
        .then(({ data }) => {
          candidates.value = data;
        });
    };

    onMounted(async () => {
      const id = route.params.id as string;
      getListOfEntreprise();
      getListOfCandidate();
      await getCurrentFollowEntreprise(id);
      if (!!followentreprise.value && props.isEdit) {
        ["entreprise", "candidate"].forEach((item) => {
          form[item] = followentreprise.value[item];
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
      candidates,
    };
  },
});
</script>
