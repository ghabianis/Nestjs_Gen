<template>
  <el-form class="d-flex align-items-center justify-content-center bg-color z-index" ref="formRef">
    <div class="center">
      <div class="d-flex gap">
        <div class="full-input align-items-center justify-content-center flex-direction-column">
          <label>{{ $t("courseTitle") }}</label>

          <el-input
            size="large"
            type="text"
            placeholder="title "
            class="input-background-color"
            v-model="form.title"
          />
        </div>
      </div>

      <div class="d-flex gap mb-30 mt-25">
        <div class="full-input align-items-center justify-content-center flex-direction-column">
          <label>{{ $t("centerName") }}</label>
          <el-input
            size="large"
            type="text"
            placeholder="Nom du Center "
            class="input-background-color"
            v-model="form.centerName"
          />
        </div>
      </div>

      <div class="d-flex gap align-items-center justify-content-center mt-25">
        <div class="input">
          <label>{{ $t("startgingDate") }}</label>
          <el-input size="large" type="date" v-model="form.startDate" />
        </div>

        <div class="input">
          <label>{{ $t("endingDate") }}</label>
          <el-input size="large" type="date" v-model="form.endDate" />
        </div>
      </div>
      <div class="d-flex checkbox align-items-center mt-25">
        <input type="checkbox" v-model="form.isForming" />
        <label>Je travaille actuellement dans ce rôle</label>
      </div>

      <div class="d-flex gap align-items-center justify-content-center mt-25 w-100">
        <div class="input-s">
          <label class="fs-13 mb-11">{{ $t("country") }}</label>
          <el-autocomplete
            value-key="name"
            v-model="form.country"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            clearable
            class="inline-input w-100"
            placeholder="country "
          />
        </div>
      </div>

      <div class="d-flex gap mb-30 mt-25">
        <div class="full-input align-items-center justify-content-center flex-direction-column">
          <label>{{ $t("description") }}</label>
          <el-input size="large" type="text" style="height: 75px;" v-model="form.description" />
        </div>
      </div>
      <template v-if="isEdit">
        <div class="d-flex mb-30 justify-content-space-between align-items-center full-input mt-30">
          <div class>
            <el-button
              class="btn btn-delete"
              style="border: 1px solid red;"
              size="large"
              type="submit"
              @click="deleteData"
            >Supprimer</el-button>
          </div>
          <div class>
            <el-button
              class="btn btn-continue-edit"
              size="large"
              type="submit"
              @click="updateData"
            >Continuer</el-button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="d-flex mb-30 justify-content-space-between align-items-center full-input mt-30">
          <div class>
            <el-button @click="addData" class="btn btn-continue-add" size="large">Continuer</el-button>
          </div>
        </div>
      </template>
    </div>
  </el-form>
</template>
<script lang="ts">
import { t } from "@/core/i18n/translate";
import { useRoute, useRouter } from "vue-router";
import { useCandidateStore } from "@/store/useCandidateModule";
import { storeToRefs } from "pinia";
import { supabase } from "@/core/services/SupabaseClientService";

import { ref, defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
    courseData: { type: Object, required: false },
    index: Number,
  },
  name: "form",
  data() {
    return {
      title: "Ajouter une formation",
    };
  },
  emits: ["close"],
  setup(props, { emit }) {
    const { setCourse, updateCourse, deleteCourse } = useCandidateStore();
    const { candidate, error } = storeToRefs(useCandidateStore());

    const formRef = ref<null | HTMLFormElement>(null);
    const initialState = {
      title: (props.isEdit && props.courseData.title) || "",
      centerName: (props.isEdit && props.courseData.centerName) || "",
      startDate:
        (props.isEdit && props.courseData.startDate.slice(0, 10)) ||
        new Date().toISOString().slice(0, 10),
      endDate:
        (props.isEdit && props.courseData.endDate.slice(0, 10)) ||
        new Date().toISOString().slice(0, 10),
      isForming: (props.isEdit && props.courseData.isForming) || false,
      country: (props.isEdit && props.courseData.country) || "",
      description: (props.isEdit && props.courseData.description) || "",
    };

    const router = useRouter();
    const closePage = () => {
      setTimeout(() => {
        router.push({ path: "/inscription/form-activity" });
      }, 1000);
    };
    let form = reactive({ ...initialState });
    const addData = () => {
      let data = {
        title: form.title,
        centerName: form.centerName,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        isForming: form.isForming,
        country: form.country,
        description: form.description,
      };
      setCourse(data);
      //form = reactive({ ...initialState });
      console.log("added");
      emit("close");
    };
    const querySearch = async (queryString: string, cb: any) => {

      const { data } = queryString ? await supabase.
        from("City").
        select("name").ilike('name', `%${queryString}%`).range(0, 30)
        : await supabase.
          from("City").
          select("name").range(0, 9)
      // call callback function to return suggestions
      cb(data)
    }
    const updateData = () => {
      let data = {
        title: form.title,
        centerName: form.centerName,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        isForming: form.isForming,
        country: form.country,
        description: form.description,
      };
      updateCourse(data, props.index);
      //form = reactive({ ...initialState });
      console.log("updated");
      emit("close");
    };
    const deleteData = () => {
      deleteCourse(props.index)
      console.log("deleted");
      emit("close")
    }

    return {
      t,
      form,
      closePage,
      formRef,
      addData,
      candidate,
      deleteData,
      updateData,
      querySearch
    };
  },
});
</script>
<style lang="scss" scoped>
:deep(.el-dialog__title) {
}
.z-index {
  z-index: 9999;
}
input[type="checkbox"] {
  margin-bottom: 7px;
}
.checkbox {
  width: 313px;
  gap: 8.25px;
}
label {
  margin-bottom: 11px !important;
}

.mb-30 {
  margin-bottom: 30px;
}
.mb-11 {
  margin-bottom: 11px !important;
}
.mt-25 {
  margin-top: 25px !important;
}
.mt-30 {
  margin-top: 30px !important;
}
.mt-100 {
  margin-top: 100px;
}
.mt-30 {
  margin-top: 62px;
}
.justify-content-space-between {
  justify-content: space-between !important;
}
.input {
  height: 75px;
  color: #fff !important;
}
#input-background-color {
  background: #252a4a !important;
}
.input-height {
  height: 50px;
}
.fs-11 {
  font-size: 11px !important;
}
.fs-22 {
  font-size: 22px !important;
}
.input-s {
  width: 147px;
  margin-right: auto;
}
.full-input {
  width: 315px;
  height: 50px;
}
.w-100 {
  width: 313px !important;
}
.textarea {
  height: 75px !important;
}
.btn {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #1d1148;
  font-family: Poppins;
  font-weight: 600;
}
.btn-continue-add {
  background-color: rgba(245, 134, 230, 1);
  width: 316px;
  height: 50px;
  margin-bottom: 30px;
  z-index: 9999;
}
.btn-continue-edit {
  background-color: #f586e6;
  color: #1d1148;
}
.btn-delete {
  background-color: transparent;
  color: #ff1a43;
}

.center {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column !important;
  width: 375px;
}

.gap {
  gap: 20px;
}

.flex-direction-column {
  flex-direction: column !important;
}

.bg-input {
  background-color: rgba(37, 42, 74, 1) !important;
}
@media (max-width: 1200px) {
}
</style>