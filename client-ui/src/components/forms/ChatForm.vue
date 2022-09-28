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
import { useChatStore } from "@/store/useChatModule";
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
    let entreprises = ref([]);
    const { chat, error } = storeToRefs(useChatStore());
    const { getChatById, createChat, editChat } = useChatStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { candidate: { id: "" }, entreprise: { id: "" } };
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
      entreprise: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      messages: [
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
        return await editChat({ data: form, id });
      } else await createChat(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-chat" });
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
    const getCurrentChat = async (id: string) => {
      if (props.isEdit) {
        await getChatById(id);
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
      getListOfCandidate();
      getListOfEntreprise();
      await getCurrentChat(id);
      if (!!chat.value && props.isEdit) {
        ["candidate", "entreprise", "messages"].forEach((item) => {
          form[item] = chat.value[item];
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
      entreprises,
    };
  },
});
</script>
