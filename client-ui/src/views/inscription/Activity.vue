<template>
  <el-form
    class="d-flex align-items-center justify-content-center mt-16"
    ref="formRef"
    :model="targetData"
    :rules="rules"
  >
    <div class="d-flex flex-column align-items-center">
      <div
        class="d-flex align-items-center justify-content-center flex-column w-100 mw-375px p-3 z-index-1"
      >
        <div class="d-flex align-items-center justify-content-center flex-column w-100 z-index-5">
          <img class="logo" src="/svg/inscription/logo.svg" />
          <h1 class="mt-4 mtb-4">Activité recherchée</h1>
        </div>

        <div class="d-flex gap-5 align-items-center justify-content-center w-100 mb-4 mt-4">
          <div class="w-50">
            <el-form-item prop="city">
              <label class="mb-5">{{ $t("city") }}</label>

              <el-autocomplete
                value-key="name"
                v-model="targetData.city"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                clearable
                class="inline-input w-100"
                placeholder="City "
              />
            </el-form-item>
          </div>
          <div class="w-50">
            <el-form-item prop="kmRadius">
              <label class="mb-5">{{ $t("kmRadius") }}</label>
              <el-select v-model="targetData.kmRadius">
                <el-option value="10km">10km</el-option>
                <el-option value="20km">20km</el-option>
                <el-option value="30km">30km</el-option>
                <el-option value="40km">40km</el-option>
                <el-option value="50km">50km</el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="d-flex w-100">
          <div class="mb-3 d-flex flex-column w-100">
            <label class="mt-5">{{ $t("salary") }}</label>
            <div class="slider-demo-block d-flex flex-column">
              <el-slider range show-stops :max="10000" v-model="targetData.salary" />
              <div class="d-flex justify-content-between w-100">
                <p>{{ targetData.salary[0] }}</p>
                <p style="text-align: end">{{ targetData.salary[1] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex mb-30 align-items-center justify-content-center w-100 mw-375px p-3">
        <div class="w-100">
          <el-form-item prop="contractsOnCandidates">
            <label class="mb-5">{{ $t("contract") }}</label>
            <el-select
              style="display: block; width: 100%"
              name="contracts"
              id="contracts"
              v-model="targetData.contractsOnCandidates"
              value-key="id"
              multiple
            >
              <el-option
                v-for="item in contracts.data"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="d-flex gap flex-column w-100 mw-375px p-3">
        <div class="full-input d-flex">
          <el-form-item prop="personal_cv">
            <div @click="$refs.cv_file_ref.click()">
              <img class="vector-top" src="/svg/inscription/vector-top.svg" />
              <label>{{ $t("uploadYourResume") }}</label>
            </div>
          </el-form-item>
        </div>
        <input
          style="display:none;"
          type="file"
          ref="cv_file_ref"
          @change="handleCvChange"
          accept="application/pdf"
        />

        <div
          v-if="targetData.personalCv"
          @click="personalCvVisible = true"
          style="margin-bottom:20px; color:#f586e6; cursor:pointer;"
        >{{ targetData.personalCv.name ? targetData.personalCv.name : targetData.personalCv }}</div>

        <el-dialog
          v-model="personalCvVisible"
          title=""
          width="90%"
          class="el-dialog"
          @close="personalCvVisible = false"
        >
          <iframe
            :src="targetData.personalCv.url ? targetData.personalCv.url : urlImageKIt + targetData.personalCv"
            width="100%"
            height="400px"
          ></iframe>
        </el-dialog>
      </div>

      <div class="d-flex align-items-center justify-content-center w-100 mw-375px">
        <div class="w-50">
          <label>{{ $t("uploadYourvideo") }}</label>
        </div>
        <div class="d-flex justify-content-center align-items-center upload flex-column">
          <el-upload
            :style="{
              background: targetData.mediaLink ? 'url(' + (targetData.mediaLink.url || urlImageKIt + targetData.mediaLink) + '/ik-thumbnail.jpg?tr=w-175,so-5,h-125,c-at_max)' : '', backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }"
            drag
            multiple
            accept="video/*"
            :auto-upload="false"
            action
            @change="handleMediaChange"
            show-file-list
          >
            <div style="background: none; border: none; margin-top: 35px">
              <img src="/svg/inscription/upload.svg" />
              <p v-if="!targetData.mediaLink">Ajouter vidéo</p>
              <div v-if="targetData.mediaLink">video exist</div>
            </div>
            <template #tip></template>
          </el-upload>
          <div
            v-if="targetData.mediaLink"
            @click="videoVisible = true"
            style="color:#f586e6; cursor:pointer;"
          >{{ targetData.mediaLink.name ? targetData.mediaLink.name : targetData.mediaLink }}</div>
        </div>
        <template v-if="videoVisible">
          <el-dialog
            v-model="videoVisible"
            width="90%"
            height="50vh"
            class="el-dialog"
            @close="videoVisible = false"
          >
            <video id="background-video" autoplay controller>
              <source
                :src="targetData.mediaLink.url ? targetData.mediaLink.url : urlImageKIt + targetData.mediaLink"
                type="video/mp4"
              />
              <!-- <source :src="form.mediaLink[0]" type="video/mp4"> -->
            </video>
          </el-dialog>
        </template>
      </div>
      <div class="gap-5 mt-4 d-flex align-items-center justify-content-center w-100 mw-375px p-3">
        <div class="z-index-0 w-100">
          <el-form-item>
            <el-button size="large" class="w-100 btn btn-continue" @click="submit">Continuer</el-button>
          </el-form-item>
        </div>
      </div>

      <el-upload
        v-model:file-list="fileList"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  </el-form>
</template>
<script lang="ts">
import { ElLoading } from 'element-plus'
import { t } from "@/core/i18n/translate";
import { useAuthStore } from "@/store/useAuth";
import { ref, defineComponent, reactive, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/core/services/SupabaseClientService";
import { useCandidateStore } from "@/store/useCandidateModule";
import { uploadFile } from "@/core/helpers/uploadFile";
import { countries } from "@/core/helpers/country";
import { Plus } from '@element-plus/icons-vue'

interface NewUserData {
  minSalary: number;
  maxSalary: number;
  //contract: string[];
  contractsOnCandidates: any[];
  personalCv: any;
  mediaLink: any;
  kmRadius: string;
  city: string;
  salary: any;
}

export default defineComponent({
  name: "activity",
  setup() {
    const urlImageKIt = import.meta.env.VITE_IMAGE_KIT_ENDPOINT + '/';
    const formRef = ref<null | HTMLFormElement>(null);
    const router = useRouter();
    const candidateStore = useCandidateStore();

    const isAuthorised = ref(false);

    const authStore = useAuthStore();
    const { setActivity } = useCandidateStore();
    const targetData = ref<NewUserData>({
      maxSalary: 0,
      minSalary: 0,
      contractsOnCandidates: [],
      personalCv: "",
      mediaLink: "",
      kmRadius: "",
      city: "",
      salary: "",
    });

    let contracts = ref([]);
    onBeforeMount(() => {
      if (!candidateStore.candidate.id) {
        router.push({ path: "/inscription/formulaire" });
      } else {
        isAuthorised.value = true;
      }
    });
    let videoExist = ref(false)
    const videoVisible = ref(false)
    const personalCvVisible = ref(false)


    onMounted(async () => {
      targetData.value.minSalary = candidateStore.candidate.minSalary;
      targetData.value.maxSalary = candidateStore.candidate.maxSalary;
      targetData.value.personalCv = candidateStore.candidate.personalCv;
      targetData.value.mediaLink = candidateStore.candidate.mediaLink;
      targetData.value.contractsOnCandidates = candidateStore.candidate.contractsOnCandidates;
      targetData.value.kmRadius = candidateStore.candidate.user.kmRadius;
      targetData.value.city = candidateStore.candidate.user.city;
      targetData.value.salary = [
        candidateStore.candidate.minSalary,
        candidateStore.candidate.maxSalary,
      ];

      contracts.value = await supabase
        .from("Contract")
        .select();
      if (contracts.value.error) {
        console.log(contracts.value.error);
      }
    });
    const rules = reactive({
      city: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      kmRadius: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      minSalary: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      maxSalary: [
        {
          required: true,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      ContractsOnCandidate: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur",
        },
      ],
      personalCv: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "change",
        },
      ],
    });

    const addData = async () => {

      console.log("candidateStore.candidate.personalCv", candidateStore.candidate.personalCv)
      console.log("candidateStore.candidate.mediaLink", candidateStore.candidate.mediaLink)
      console.log("targetData.value.personalCv", targetData.value.personalCv)
      console.log("targetData.value.mediaLink", targetData.value.mediaLink)

      console.log("Activity addData contractsOnCandidates ", targetData.value.contractsOnCandidates,)
      if(candidateStore.candidate.personalCv !==  targetData.value.personalCv)
      {
      const cv = await uploadFile(targetData.value.personalCv);
      if (cv.name) {
        targetData.value.personalCv = cv.name;
      }
      }
      if(candidateStore.candidate.mediaLink !==  targetData.value.mediaLink  )
      {
        const cvMedia = await uploadFile(targetData.value.mediaLink);
        if (cvMedia.name) {
        targetData.value.mediaLink = cvMedia.name;
        }
      }
     
      let data = {
        id: candidateStore.candidate.id,
        minSalary: targetData.value.salary[0],
        maxSalary: targetData.value.salary[1],
        contractsOnCandidates: targetData.value.contractsOnCandidates,
        //contract: { id: form.contract },
        personalCv: targetData.value.personalCv.name ? targetData.value.personalCv.name :targetData.value.personalCv,
        mediaLink: targetData.value.mediaLink.name ? targetData.value.mediaLink.name : targetData.value.mediaLink,
        user: {
          city: targetData.value.city,
          kmRadius: targetData.value.kmRadius,
        },
      };
      let { error } = await setActivity(data);
      if (!error) {
        router.push({ path: "/inscription/form-activity" });
      }
    };

    const submit = () => {
      console.log("Activity formRef", formRef.value);

      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: any) => {
        if (valid) {
          const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          //if (Object.keys(creator.survey.PersonelDataContent).length === 0) {
          await addData();

          loading.close()
          //}
        }
      });
    };


    const handleCvChange = async (event: any) => {
      targetData.value.personalCv = event.target.files[0];
      targetData.value.personalCv.url = URL.createObjectURL(event.target.files[0]);
    };

    const handleMediaChange = (event: any) => {
      targetData.value.mediaLink = event.raw;
      targetData.value.mediaLink.url = URL.createObjectURL(event.raw);
    };
    const querySearch = async (queryString: string, cb: any) => {
      const { data } = queryString
        ? await supabase
          .from("City")
          .select("name")
          .ilike("name", `%${queryString}%`)
          .range(0, 30)
        : await supabase.from("City").select("name").range(0, 9);
      // call callback function to return suggestions
      cb(data);
    };

    if (targetData.mediaLink) videoExist = ref(true);
    return {
      t,
      handleCvChange,
      handleMediaChange,
      rules,
      submit,
      formRef,
      candidateStore,
      contracts,
      countries,
      querySearch,
      targetData,
      videoVisible,
      personalCvVisible,
      urlImageKIt
    };
  },
});
</script>
<style lang="scss" scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
  width: 100%;
}
:deep(.el-upload-dragger) {
  width: 175px;
  background: rgba(22, 22, 22, 0.1) !important;
  height: 129px;
  border-radius: 10px;
}
.videoBg {
  background: url("/mp4/videobackground.mp4") !important;
}
:deep(.el-slider__bar) {
  background: rgb(245, 134, 230);
}
.btn {
  font-weight: 700;
  font-size: 16px;
  color: #1d1148;
}
.btn-continue {
  background-color: rgba(245, 134, 230, 1);
  z-index: 9999;
}
a.el-upload-list__item-name {
  color: rgba(245, 134, 230, 1) !important;
}
:deep(.el-upload-list__item-name) {
  color: #f586e6;
  cursor: pointer;
  display: none;
}
:deep(.el-upload-list) {
  display: none;
}
#background-video {
  height: 60vh;
  width: 100%;
}
</style>
