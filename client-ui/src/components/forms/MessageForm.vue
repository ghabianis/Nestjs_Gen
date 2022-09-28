<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="contenu" prop="contenu">
      <el-input v-model="form.contenu" />
    </el-form-item>
    <el-form-item label="chat_id" prop="Chat">
      <el-select
        v-model="form.chat.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="chat in chats"
          :label="chat.id"
          :key="chat.id"
          :value="chat.id"
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
import { useMessageStore } from "@/store/useMessageModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let chats = ref([]);
    const { message, error } = storeToRefs(useMessageStore());
    const { getMessageById, createMessage, editMessage } = useMessageStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { contenu: "", chat: { id: "" } };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      contenu: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      chat: [
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
        return await editMessage({ data: form, id });
      } else await createMessage(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-message" });
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
    const getCurrentMessage = async (id: string) => {
      if (props.isEdit) {
        await getMessageById(id);
      }
    };

    const getListOfChat = () => {
      supabase
        .from("Chat")
        .select("*")
        .then(({ data }) => {
          chats.value = data;
        });
    };

    onMounted(async () => {
      const id = route.params.id as string;
      getListOfChat();
      await getCurrentMessage(id);
      if (!!message.value && props.isEdit) {
        ["contenu", "chat"].forEach((item) => {
          form[item] = message.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      chats,
    };
  },
});
</script>
