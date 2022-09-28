<template>
  <el-form
    class="d-flex align-items-center justify-content-center bg-color"
    ref="formRef"
    :rules="rules"
  >
    <div class="center">
      <div class="d-flex gap">
        <div class="full-input align-items-center justify-content-center flex-direction-column">
          <label>{{ $t("occupiedPosition") }}</label>

          <el-input
            size="large"
            type="text"
            placeholder="Exp: Full stuck developer "
            class="input-background-color"
            v-model="form.occupiedPosition"
          />
        </div>
      </div>

      <div class="d-flex gap mb-30 mt-25">
        <div class="full-input align-items-center justify-content-center flex-direction-column">
          <label>{{ $t("companyName") }}</label>
          <el-input
            size="large"
            type="text"
            placeholder="Nom du société "
            style
            v-model="form.companyName"
          />
        </div>
      </div>

      <div class="d-flex gap align-items-center justify-content-center mt-25">
        <div class="input">
          <label>{{ $t("startgingDate2") }}</label>
          <el-input size="large" type="date" v-model="form.startDate" />
        </div>

        <div class="input">
          <label>{{ $t("endingDate2") }}</label>
          <el-input size="large" type="date" v-model="form.endDate" />
        </div>
      </div>

      <div class="d-flex checkbox align-items-center mt-25">
        <input type="checkbox" v-model="form.isWorking" />
        <label>Je travaille actuellement dans ce rôle</label>
      </div>

      <div class="d-flex gap align-items-center justify-content-center mt-25 w-100">
        <div class="input-s">
          <label class="fs-13 mb-11">{{ $t("country2") }}</label>
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
          <label>{{ $t("description2") }}</label>
          <el-input size="large" type="text" v-model="form.description" />
        </div>
      </div>
      <div class="d-flex mb-30 justify-content-space-between align-items-center full-input mt-30">
        <template v-if="isEdit">
          <div class>
            <el-button
              class="btn btn-delete"
              style="border: 1px solid red;"
              size="large"
              @click="deleteData"
            >Supprimer</el-button>
          </div>
          <div class>
            <el-button class="btn btn-continue-edit" @click="updateData" size="large">Continuer</el-button>
          </div>
        </template>
        <template v-else>
          <div class>
            <el-button @click="addData" class="btn btn-continue-add" size="large">Continuer</el-button>
          </div>
        </template>
      </div>
    </div>
  </el-form>
</template>
<script lang="ts">
import { t } from "@/core/i18n/translate";
import { useRoute, useRouter } from "vue-router";
import { ref, defineComponent, reactive } from "vue";
import { useCandidateStore } from "@/store/useCandidateModule";
import { supabase } from "@/core/services/SupabaseClientService";

export default defineComponent({
  name: "form",
  props: {
    isEdit: { type: Boolean, default: false },
    experienceData: { type: Object, required: false },
    index: Number,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const { setExperience, candidate, updateExperience, deleteExperience } = useCandidateStore()
    const initialState = {
      occupiedPosition: props.isEdit && props.experienceData.occupiedPosition || "",
      companyName: props.isEdit && props.experienceData.companyName || "",
      startDate: props.isEdit && props.experienceData.startDate.slice(0, 10) || new Date().toISOString().slice(0, 10),
      endDate: props.isEdit && props.experienceData.endDate.slice(0, 10) || new Date().toISOString().slice(0, 10),
      isWorking: props.isEdit && props.experienceData.isWorking || false,
      country: props.isEdit && props.experienceData.country || "",
      description: props.isEdit && props.experienceData.description || "",
    };

    let form = reactive({ ...initialState });
    const addData = () => {
      let data = {
        occupiedPosition: form.occupiedPosition,
        companyName: form.companyName,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        isWorking: form.isWorking,
        country: form.country,
        description: form.description,
      }
      //form = reactive({ ...initialState });
      setExperience(data)
      console.log(emit)
      emit("close")
    }
    const updateData = () => {
      let data = {
        occupiedPosition: form.occupiedPosition,
        companyName: form.companyName,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        isWorking: form.isWorking,
        country: form.country,
        description: form.description,
      };
      updateExperience(data, props.index);
      console.log("updated");
      emit("close");
    };
    const deleteData = () => {
      deleteExperience(props.index)
      console.log("deleted");
      emit("close")
    }
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
    return {
      t,
      form,
      // closePage,
      addData,
      formRef,
      updateData,
      deleteData,
      querySearch
    };
  },

});
</script>
<style lang="scss" scoped>
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
.input-background-color {
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
</style>
