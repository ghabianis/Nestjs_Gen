<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="type" prop="type">
      <el-input v-model="form.type" />
    </el-form-item>
    <el-form-item label="title" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="description" prop="description">
      <el-input v-model="form.description" />
    </el-form-item>
    <el-form-item label="event_id" prop="Event">
      <el-select
        v-model="form.event.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="event in events"
          :label="event.id"
          :key="event.id"
          :value="event.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="post_id" prop="Post">
      <el-select
        v-model="form.post.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="post in posts"
          :label="post.id"
          :key="post.id"
          :value="post.id"
        />
      </el-select>
    </el-form-item>
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
    <el-form-item label="story_id" prop="Story">
      <el-select
        v-model="form.story.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="story in stories"
          :label="story.id"
          :key="story.id"
          :value="story.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="video_id" prop="Video">
      <el-select
        v-model="form.video.id"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="video in videos"
          :label="video.id"
          :key="video.id"
          :value="video.id"
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
import { usePublicationStore } from "@/store/usePublicationModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  setup(props) {
    let events = ref([]);
    let posts = ref([]);
    let offers = ref([]);
    let stories = ref([]);
    let videos = ref([]);
    let users = ref([]);
    const { publication, error } = storeToRefs(usePublicationStore());
    const { getPublicationById, createPublication, editPublication } =
      usePublicationStore();
    const route = useRoute();
    const router = useRouter();
    const initialState = {
      type: "",
      title: "",
      description: "",
      event: { id: "" },
      post: { id: "" },
      offer: { id: "" },
      story: { id: "" },
      video: { id: "" },
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
      title: [
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
      publicationsOnCommunities: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      event: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      post: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      offer: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      story: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      video: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      socialinterractions: [
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
        return await editPublication({ data: form, id });
      } else await createPublication(form);
    };

    const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          await handleSubmitForm();
          if (!!error.value) {
            Components.ElMessage.error(error.value?.message);
            console.log(error, "error");
          } else router.push({ name: "list-publication" });
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
    const getCurrentPublication = async (id: string) => {
      if (props.isEdit) {
        await getPublicationById(id);
      }
    };

    const getListOfEvent = () => {
      supabase
        .from("Event")
        .select("*")
        .then(({ data }) => {
          events.value = data;
        });
    };
    const getListOfPost = () => {
      supabase
        .from("Post")
        .select("*")
        .then(({ data }) => {
          posts.value = data;
        });
    };
    const getListOfOffer = () => {
      supabase
        .from("Offer")
        .select("*")
        .then(({ data }) => {
          offers.value = data;
        });
    };
    const getListOfStory = () => {
      supabase
        .from("Story")
        .select("*")
        .then(({ data }) => {
          stories.value = data;
        });
    };
    const getListOfVideo = () => {
      supabase
        .from("Video")
        .select("*")
        .then(({ data }) => {
          videos.value = data;
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
      getListOfEvent();
      getListOfPost();
      getListOfOffer();
      getListOfStory();
      getListOfVideo();
      getListOfUser();
      await getCurrentPublication(id);
      if (!!publication.value && props.isEdit) {
        [
          "type",
          "title",
          "description",
          "publicationsOnCommunities",
          "event",
          "post",
          "offer",
          "story",
          "video",
          "socialinterractions",
          "user",
        ].forEach((item) => {
          form[item] = publication.value[item];
        });
      }
    });
    return {
      onSubmit,
      form,
      resetForm,
      rules,
      ruleFormRef,
      events,
      posts,
      offers,
      stories,
      videos,
      users,
    };
  },
});
</script>
