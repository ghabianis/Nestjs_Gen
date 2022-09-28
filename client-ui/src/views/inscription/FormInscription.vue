<template>
  <el-form class="d-flex align-items-center justify-content-center  mt-16 " 
  >
    <div class="d-flex flex-column justify-content-center align-items-center h-100 mw-375px">
      <div class="form-head mt-100 z-index">
        <img class="logo" src="/svg/inscription/logo.svg" />

      </div>
        <h1 class="mt-4 mtb-4">Formulaire d’inscription </h1>

      <el-dialog
        v-model="createCourseVisible"
        @close="createCourseVisible = false"
        title="Ajouter une formation"
        width="340px"
      >
        <CourseModal @close="createCourseVisible = false" />
        <!-- <createExperience /> -->
      </el-dialog>

      <el-dialog
        v-model="createExperienceVisible"
        title="Ajouter une expérience"
        width="340px"
      >
        <ExperienceModal @close="createExperienceVisible = false" />
      </el-dialog>

        <div class="main w-100">
          <div class="d-flex flex-column w-100 mt-6 mb-6">
            <h3 style="color:#fff;">Formation</h3>
            <div class="d-flex main__header z-index-1">
              <img
                src="/svg/inscription/ajouter.svg"
                class="formation__img z-index"
                @click="createCourseVisible = true"
                style="cursor:pointer;"
              />
              <h6
                @click="createCourseVisible = true"
                class="formation__title z-index-1"
                style="cursor:pointer;"
              >Ajouter une formation</h6>
            </div>
            <div class="d-flex experiences">
              <div v-for="(course, index) in candidate?.courses" class="m-2">
                <Course :courseData="course" :key="index" :index="index" />
              </div>
            </div>
          </div>

          <div class="d-flex flex-column w-100 mt-6 mb-6">
            <h3>Expérience</h3>
            <div class="d-flex main__header z-index-1">
              <img
                src="/svg/inscription/ajouter.svg"
                class="formation__img z-index"
                @click="createExperienceVisible = true"
                style="cursor:pointer;"
              />
              <h6
                @click="createExperienceVisible = true"
                class="formation__title z-index"
                style="cursor:pointer;"
              >Ajouter une Experience</h6>
            </div>
            <div class="d-flex experiences">
              <div v-for="(experience, index) in candidate?.experiences" class="m-2">
                <Experience :experienceData="experience" :key="index" :index="index" />
              </div>
            </div>
          </div>
        </div>
      <div class="d-flex gap-5 mw-375px w-100 mb-3 ">
        <div class="z-index-5 w-100">
          <el-form-item>
            <el-button
              size="large"
              class="btn btn-continue w-100"
              @click="submit"
            >Continuer</el-button>
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>
<script lang="ts">
import { useCandidateStore } from "@/store/useCandidateModule";

import Course from "@/components/inscription/courseItem.vue";
import Experience from "@/components/inscription/experience.vue";
import Video from "./bgVideo.vue";

import ExperienceModal from "@/components/inscription/experienceModal.vue";
import CourseModal from "@/components/inscription/courseModal.vue";

import { storeToRefs } from "pinia";

import { t } from "@/core/i18n/translate";
import { ref, defineComponent, reactive, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";


export default defineComponent({
  name: "activity",
  components: {
    Experience,
    ExperienceModal,
    CourseModal,
    Course,
    Video

  },
  setup() {
    const { candidate, error } = storeToRefs(useCandidateStore());
    const router = useRouter()
    const candidateStore = useCandidateStore()
    const createExperienceVisible = ref(false);
    const createCourseVisible = ref(false);
    const editExperienceVisible = ref(false);
    const editCourseVisible = ref(false);
    const submit = () => {
      const { error } = candidateStore.setExperiencesCourses();
      if (!error)
        router.push({ path: "/inscription/success" });
    }
    return {
      t,
      createExperienceVisible,
      createCourseVisible,
      candidate,
      submit,
    };
  },
});
</script>
<style lang="scss" scoped>
.logo{
  text-align:center;
}
.h-100vh {
  height: 100vh;
}

.main__header {
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn {
  font-weight: 700;
  font-size: 16px;
  color: #1d1148;
}
.btn-continue {
  background-color: rgba(245, 134, 230, 1);
}
:deep(.el-dialog) {
  background: #1e2027 !important;
  margin-top: 0;
}
:deep(.el-dialog__title) {
  color: #fff !important;
  margin: -5px !important;
}
.formation__image {
  display: inline-flex;
  margin: auto 20px;
  width: 33px;
  height: 25.5px;
  padding: -12px;
  padding-right: 12px !important;
}
.formation__title {
  margin-left: 8px;
  margin-top: 3px;
}

.experiences {
  overscroll-behavior-x: contain;
  overflow: auto;
  position: relative;
  width: 110%;
  padding: 15px 0;
}

</style>
