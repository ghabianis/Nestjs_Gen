<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
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
    <el-form-item label="community_id" prop="Community">
      <el-select
        v-model="form.community.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="community in communities"
          :label="community.id"
          :key="community.id"
          :value="community.id"
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
import { usePublicationsOnCommunityStore } from "@/store/usePublicationsOnCommunityModule";
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
    let communities = ref([]);
    const { publicationsoncommunity, error } = storeToRefs(
      usePublicationsOnCommunityStore()
    );
    const {
      getPublicationsOnCommunityById,
      createPublicationsOnCommunity,
      editPublicationsOnCommunity,
    } = usePublicationsOnCommunityStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { publication: { id: "" }, community: { id: "" } };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      publication: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      community: [
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
        return await editPublicationsOnCommunity({ data: form, id });
      } else await createPublicationsOnCommunity(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-publicationsoncommunity" });
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
    const getCurrentPublicationsOnCommunity = async (id: string) => {
      if (props.isEdit) {
        await getPublicationsOnCommunityById(id);
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
    const getListOfCommunity = () => {
      supabase
        .from("Community")
        .select("*")
        .then(({ data }) => {
          communities.value = data;
        });
    };

    onMounted(async () => {
      const id = route.params.id as string;
      getListOfPublication();
      getListOfCommunity();
      await getCurrentPublicationsOnCommunity(id);
      if (!!publicationsoncommunity.value && props.isEdit) {
        ["publication", "community"].forEach((item) => {
          form[item] = publicationsoncommunity.value[item];
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
      communities,
    };
  },
});
</script>
