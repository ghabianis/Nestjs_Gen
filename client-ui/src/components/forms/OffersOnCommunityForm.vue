<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="offer_id" prop="Offer">
      <el-select
        v-model="form.offer.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="offer in offers"
          :label="offer.id"
          :key="offer.id"
          :value="offer.id"
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
import { useOffersOnCommunityStore } from "@/store/useOffersOnCommunityModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let offers = ref([]);
    let communities = ref([]);
    const { offersoncommunity, error } = storeToRefs(
      useOffersOnCommunityStore()
    );
    const {
      getOffersOnCommunityById,
      createOffersOnCommunity,
      editOffersOnCommunity,
    } = useOffersOnCommunityStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = { offer: { id: "" }, community: { id: "" } };
    const form = reactive({ ...initialState });
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const rules = reactive({
      offer: [
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
        return await editOffersOnCommunity({ data: form, id });
      } else await createOffersOnCommunity(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-offersoncommunity" });
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
    const getCurrentOffersOnCommunity = async (id: string) => {
      if (props.isEdit) {
        await getOffersOnCommunityById(id);
      }
    };

    const getListOfOffer = () => {
      supabase
        .from("Offer")
        .select("*")
        .then(({ data }) => {
          offers.value = data;
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
      getListOfOffer();
      getListOfCommunity();
      await getCurrentOffersOnCommunity(id);
      if (!!offersoncommunity.value && props.isEdit) {
        ["offer", "community"].forEach((item) => {
          form[item] = offersoncommunity.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      offers,
      communities,
    };
  },
});
</script>
