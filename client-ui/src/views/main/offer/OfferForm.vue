<template>
  <el-form class="w-100" :model="publication" :rules="rules" ref="formRef">
    <div class="w-100 h-100 m-3 mt-17">
      <div
        class="
          w-100
          mb-5
          py-6
          px-12
          d-flex
          align-items-center
          justify-content-between
          offer-form__header
        "
      >
        <div class="offer-form__header-text fs-2">{{ headerText }}</div>
        <div class="d-flex flex-row gap-3">
          <el-button
            class="w-50 px-9 offer-form__cancel-btn"
            @click="discardVisible = true"
            >cancel</el-button
          >
          <el-button
            class="w-50 px-7 m-0 offer-form__submit-btn"
            :class="{ 'valid-btn': formValid }"
            @click="onSubmit(formRef)"
            >{{ buttonText }}</el-button
          >
        </div>
      </div>
      <div class="d-flex w-100 gap-5 offer-form__forms-container">
        <div class="offer-form__path-container">
          <OfferPathcomponent :isEdit="isEdit" />
        </div>
        <div class="offer-form__aside-container">
          <OfferAsideForm />
        </div>
      </div>
      <DiscardDraftVue
        :title="
          isEdit
            ? $t('offer.form.discardDraft.update.title')
            : $t('offer.form.discardDraft.create.title')
        "
        :message="
          isEdit
            ? $t('offer.form.discardDraft.update.message')
            : $t('offer.form.discardDraft.create.message')
        "
        :discardText="
          isEdit
            ? $t('offer.form.discardDraft.update.discard')
            : $t('offer.form.discardDraft.create.discard')
        "
        :cancelText="
          isEdit
            ? $t('offer.form.discardDraft.update.goBack')
            : $t('offer.form.discardDraft.create.goBack')
        "
        v-if="discardVisible"
        @discard="handleCancel"
        @close="discardVisible = false"
      />
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import UploadVideo from "@/components/JobOfferPath/UploadVideo.vue";
import OfferPathcomponent from "@/components/JobOfferPath/OfferPathcomponent.vue";
import OfferAsideForm from "@/components/forms/OfferAsideForm.vue";
import { storeToRefs } from "pinia";
import { usePublicationStore } from "@/store/usePublicationModule";
import { useAuthStore } from "@/store/useAuth";
import { useRoute, useRouter } from "vue-router";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import type { ElForm } from "element-plus";
import DiscardDraftVue from "@/components/shared/DiscardDraft/DiscardDraft.vue";
import i18n from "@/core/i18n/i18n";
const { t } = i18n.global;

export default defineComponent({
  name: "offerForm",
  components: {
    UploadVideo,
    OfferPathcomponent,
    OfferAsideForm,
    DiscardDraftVue,
  },
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();
    const route = useRoute();
    const id = route.params.id as string;
    const {
      getPublicationById,
      editPublication,
      createPublication,
      resetPublication,
    } = usePublicationStore();
    const { error, publication } = storeToRefs(usePublicationStore());
    const router = useRouter();
    const { currentUser } = useAuthStore();
    const discardVisible = ref(false);
    onMounted(async () => {
      if (!id) {
        resetPublication();
      } else {
        await getPublicationById(id);
      }
    });

    const handleCancel = () => {
      resetPublication();
      router.push({ name: "offers-list" });
    };
    const handleSubmit = async () => {
      const successMsg = id ? t("offer.popup.update") : t("offer.popup.create");
      if (id) {
        await editPublication(id);
      } else {
        await createPublication({
          type: "offer",
          user: { id: currentUser.id },
        });
      }
      if (!error.value) {
        router.push({ name: "offers-list" });
        Components.ElMessage.success(successMsg);
        resetPublication();
      } else {
        console.log("error api");
      }
    };
    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmit();
          if (error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    const buttonText = computed(() => {
      return id ? "Modifier l'offre" : "Publier l'offre";
    });
    const headerText = computed(() => {
      return id ? "Modifier offre d'emploi" : "Créer nouveau offre d'emploi";
    });
    const isEdit = computed(() => {
      return id ? true : false;
    });
    const count = ref(0);
    const formValid = ref(isEdit.value);
    const validateForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl || (isEdit && count.value === 0)) return;
      formEl.validateField(
        ["offer.contract.id", "publicationsOnCommunities"],
        async (valid: boolean, error) => {
          formValid.value = valid;
          formEl.clearValidate();
          return;
        }
      );
      return;
    };
    const validationForm = computed(() => {
      return {
        publicationsOnCommunities: publication.value.publicationsOnCommunities,
        contract: publication.value.offer.contract,
      };
    });
    watch(
      () => validationForm,
      () => {
        validateForm(formRef.value);
        count.value++;
      },
      { deep: true }
    );

    const rules = {
      "offer.place": [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      "offer.renumeration": [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      "offer.contract.id": [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
      ],
      title: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      publicationsOnCommunities: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
      ],
    };
    return {
      onSubmit,
      buttonText,
      headerText,
      formRef,
      isEdit,
      formValid,
      rules,
      publication,
      handleCancel,
      discardVisible,
    };
  },
});
</script>
<style lang="scss" scoped>
.offer-form__header {
  background-color: $bg-dark-600;
  border-radius: 10px;
  box-shadow: 0px 0px 2px $shadow-card-color;
}
.offer-form__header-text {
  color: $text-color-10;
  font-weight: 600;
}
.offer-form__submit-btn {
  border-radius: 10px;
  color: $text-color-250;
  border: none;
  font-size: 15px;
  background: $info-500;
}
.offer-form__submit-btn:hover {
  color: $text-color-250;
  background: $info-500;
}
.valid-btn {
  background: $primary-500;
}
.valid-btn:hover {
  background: $primary-500;
}
.offer-form__cancel-btn {
  border-radius: 10px;
  background: $info-700;
  color: $text-color-50;
  border: none;
  font-size: 15px;
  margin-left: 12px;
}
.offer-form__path-container {
  width: 58%;
  :deep(.el-input) {
    --el-input-border-color: none;
  }
}
.offer-form__aside-container {
  width: 42%;
  :deep(.el-input) {
    --el-input-border-color: none;
  }
}
@media (max-width: 1100px) {
  .offer-form__forms-container {
    flex-direction: column;
  }
  .offer-form__path-container {
    width: 100%;
  }
  .offer-form__aside-container {
    width: 100%;
  }
}
form:invalid .offer-form__submit-btn {
  background: $info-500;
}

form:valid .offer-form__submit-btn.valid-btn {
  background: $primary-500;
}
</style>
