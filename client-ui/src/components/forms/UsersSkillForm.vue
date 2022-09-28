<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="skill_id" prop="Skill">
      <el-select
        v-model="form.skill.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="skill in skills"
          :label="skill.id"
          :key="skill.id"
          :value="skill.id"
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
import { useUsersSkillStore } from "@/store/useUsersSkillModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let skills = ref([]);
    let users = ref([]);
    const { usersskill, error } = storeToRefs(useUsersSkillStore());
    const { getUsersSkillById, createUsersSkill, editUsersSkill } =
      useUsersSkillStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { skill: { id: "" } };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      skill: [
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
        return await editUsersSkill({ data: form, id });
      } else await createUsersSkill(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-usersskill" });
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
    const getCurrentUsersSkill = async (id: string) => {
      if (props.isEdit) {
        await getUsersSkillById(id);
      }
    };

    const getListOfSkill = () => {
      supabase
        .from("Skill")
        .select("*")
        .then(({ data }) => {
          skills.value = data;
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
      getListOfSkill();
      getListOfUser();
      await getCurrentUsersSkill(id);
      if (!!usersskill.value && props.isEdit) {
        ["skill", "user"].forEach((item) => {
          form[item] = usersskill.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      skills,
      users,
    };
  },
});
</script>
