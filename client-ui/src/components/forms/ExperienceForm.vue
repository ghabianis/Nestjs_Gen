<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="occupiedPosition" prop="occupiedPosition">
      <el-input v-model="form.occupiedPosition" />
    </el-form-item>
    <el-form-item label="companyName" prop="companyName">
      <el-input v-model="form.companyName" />
    </el-form-item>
    <el-form-item label="startDate" prop="startDate">
      <el-date-picker
        v-model="form.startDate"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="endDate" prop="endDate">
      <el-date-picker
        v-model="form.endDate"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </el-form-item>

    <el-form-item label="isWorking" prop="isWorking">
      <el-switch v-model="form.isWorking" />
    </el-form-item>
    <el-form-item label="country" prop="country">
      <el-input v-model="form.country" />
    </el-form-item>
    <el-form-item label="description" prop="description">
      <el-input v-model="form.description" />
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
import { useExperienceStore } from "@/store/useExperienceModule";
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
    const { experience, error } = storeToRefs(useExperienceStore());
    const {
      getExperienceById,
      createExperience,
      editExperience,
    } = useExperienceStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = {
      occupiedPosition: "",
      companyName: "",
      startDate: "2022-07-07T12:10:00.639Z",
      endDate: "2022-07-07T12:10:00.639Z",
      isWorking: false,
      country: "",
      description: "",
      candidate: { id: "" },
    };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      occupiedPosition: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      companyName: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      startDate: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      endDate: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      isWorking: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      country: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      description: [
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
        return await editExperience({ data: form, id });
      } else await createExperience(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-experience" });
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
    const getCurrentExperience = async (id: string) => {
      if (props.isEdit) {
        await getExperienceById(id);
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

    onMounted(async () => {
      const id = route.params.id as string;
      getListOfCandidate();
      await getCurrentExperience(id);
      if (!!experience.value && props.isEdit) {
        [
          "occupiedPosition",
          "companyName",
          "startDate",
          "endDate",
          "isWorking",
          "country",
          "description",
          "candidate",
        ].forEach((item) => {
          form[item] = experience.value[item];
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
    };
  },
});
</script>
