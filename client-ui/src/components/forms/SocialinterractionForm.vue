<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="type" prop="type">
      <el-input v-model="form.type" />
    </el-form-item>
    <el-form-item label="publication_id" prop="Publication">
      <el-select
        v-model="form.publication.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="publication in publications"
          :label="publication.id"
          :key="publication.id"
          :value="publication.id"
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
import { useSocialinterractionStore } from "@/store/useSocialinterractionModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let publications = ref([]);
    let users = ref([]);
    const { socialinterraction, error } = storeToRefs(
      useSocialinterractionStore()
    );
    const {
      getSocialinterractionById,
      createSocialinterraction,
      editSocialinterraction,
    } = useSocialinterractionStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = {
      type: "",
      publication: { id: "" },
    };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      type: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      publication: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      user: [
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
        return await editSocialinterraction({ data: form, id });
      } else await createSocialinterraction(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-socialinterraction" });
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
    const getCurrentSocialinterraction = async (id: string) => {
      if (props.isEdit) {
        await getSocialinterractionById(id);
      }
    };

    const getListOfPublication = () => {
      supabase
        .from("Publication")
        .select("*")
        .then(({ data }) => {
          publications.value = data;
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
      getListOfPublication();
      getListOfUser();
      await getCurrentSocialinterraction(id);
      if (!!socialinterraction.value && props.isEdit) {
        ["type", "publication", "user"].forEach((item) => {
          form[item] = socialinterraction.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      publications,
      users,
    };
  },
});
</script>
