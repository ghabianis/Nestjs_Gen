<template>
  <el-form
    class="d-flex align-items-center justify-content-center  mt-16 "
     ref="formRef"
    :model="targetData"
    :rules="rules"

  >

    <div class="d-flex align-items-center justify-content-center flex-column w-100 mw-375px p-3 ">

      <div class="d-flex align-items-center justify-content-center flex-column w-100 z-index-0">
        <img  src="/svg/inscription/logo.svg" />
        <p style="font-size: 11px;">Merci de remplir le formulaire d’inscription</p>
        <div>
          <img class="vector" src="/svg/inscription/plus.svg" @click="$refs.file_input_ref.click()" />
          <el-avatar shape="square" :size="84"  :src="targetData.imageSrc" />

          <input type="file" accept="image/png, image/jpeg" style="display:none" @change="handleFileChange" ref="file_input_ref" />
        </div>
      </div>

      <div class="d-flex gap-5 align-items-center justify-content-center w-100 mb-4  mt-4">
        <div class="w-50">
          <el-form-item prop="firstName">
            <label>{{ $t("firstName") }}</label>
            <el-input size="large" type="text" v-model="targetData.firstName" />
          </el-form-item>
        </div>
        <div class="w-50">
          <el-form-item prop="lastName">
            <label>{{ $t("lastName") }}</label>
            <el-input size="large" type="text" v-model="targetData.lastName" prop="lastName" />
          </el-form-item>
        </div>
      </div>
      <div class="d-flex gap-5  mb-8  align-items-center justify-content-center w-100 mb-4">
        <div class="w-50">
          <el-form-item prop="languages">
            <label>{{ $t("language") }}</label>
            <el-select     size="large" name="language" id="language" v-model="targetData.languages">
              <el-option value="English">English</el-option>
              <el-option value="Francais">Francais</el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="w-50">
          <el-form-item prop="sex">
            <label>{{ $t("gender") }}</label>
            <el-select      size="large" name="sex" id="sex" v-model="targetData.sex">
              <el-option value="Homme" selected>Homme</el-option>
              <el-option value="Femme">Femme</el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="d-flex gap-5 w-100 mb-4">
        <div class="w-100 z-index-5">
          <el-form-item prop="email">
            <label>{{ $t("email") }}</label>
            <el-input disabled size="large" type="email" v-model="targetData.email" />
          </el-form-item>
        </div>
      </div>
      <div class="d-flex gap-5  w-100 mb-4">
        <div class="w-100   z-index-5 align-items-center justify-content-center flex-column">
          <el-form-item prop="phone">
            <label>{{ $t("phone") }}</label>
            <el-input size="large" type="text" v-model="targetData.phone" />
          </el-form-item>
        </div>
      </div>

      <div class="d-flex gap-5   w-100 mb-4 align-items-center justify-content-center">
        <div class="w-100 z-index-5" width="100%;">
          <el-form-item prop="activityField">
            <label>{{ $t("activityField") }}</label>
            <el-select
              size="large"
              name="communities"
              id="communities"
              style="display: block;width: 100%; 'white-space: nowrap"
              v-model="targetData.activityField"
              filterable 
            >
              <el-option
                :value="community.name"
                selected
                v-for="community in communities.data"
                :key="community.name"
                :label="community.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="d-flex gap-5  w-100 mb-4 ">
        <div class="w-100   z-index-5">
          <el-form-item prop="wantedPost">
            <label>{{ $t("wantedPost") }}</label>
            <!-- <el-input size="large" type="text" v-model="form.wantedPost" /> -->

            <el-select
              size="large"
              name="jobs"
              id="jobs"
              v-model="targetData.wantedPost"

              style="display: block;width: 100%; 'white-space: nowrap"
              filterable 
            >
              <el-option
                :value="job.name"
                selected
                v-for="job in jobs.data"
                :key="job.name"
                :label="job.name"
              ></el-option>
            </el-select>            
          </el-form-item>
        </div>
      </div>
      <div class="d-flex gap-5  w-100 mb-4 ">
        <div class="z-index-5 w-100">
          <el-form-item>
            <el-button size="large" class="w-100 btn btn-continue" @click="submit">Continuer</el-button>
          </el-form-item>
        </div>
      </div>

    </div>
  </el-form>
</template>
<script lang="ts">
import { ElLoading } from 'element-plus'

import { t } from "@/core/i18n/translate";
import { useRoute, useRouter } from "vue-router";

import { ref, defineComponent, reactive, onMounted } from "vue";
import { supabase } from "@/core/services/SupabaseClientService";
import { uploadFile } from "@/core/helpers/uploadFile";
import { useAuthStore } from "@/store/useAuth";
import { useCandidateStore } from "@/store/useCandidateModule";

interface NewUserData {
    wantedPost:string;
    activityField:string;
    languages: string;
    usersOnCommunity: string;
    firstName: string;
    lastName: string;
    phone: string;
    usersSkills: string;
    sex: string;
    email: string;
    imageSrc: any;
    imageData: any;
}

export default defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
  },
  name: "formulaire",

  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const { setCandidate } = useCandidateStore();
    const communities = ref([])
    const jobs =ref([])

    const router = useRouter();
    const candidateStore = useCandidateStore()
    const authStore = useAuthStore()

    const targetData =  ref<NewUserData>({
      wantedPost: "",
      activityField: "",
      languages: "",
      usersOnCommunity: "",
      firstName: "",
      lastName: "",
      phone: "",
      usersSkills:"",
      sex: "",
      email: "",
      imageSrc: candidateStore.candidate.user.photo,
      imageData: {} as File
    })


    onMounted(async () => {
      await candidateStore.getCandidateByIdUser(authStore.currentUser.id)
      targetData.value.email = candidateStore.candidate.user.email
      targetData.value.wantedPost = candidateStore.candidate.wantedPost
      targetData.value.activityField = candidateStore.candidate.activityField
      targetData.value.languages = candidateStore.candidate.languages
      targetData.value.firstName = candidateStore.candidate.user.firstName
      targetData.value.lastName = candidateStore.candidate.user.lastName
      targetData.value.phone = candidateStore.candidate.user.phone
      targetData.value.usersSkills = candidateStore.candidate.user.usersSkills
      targetData.value.sex = candidateStore.candidate.user.sex
      if (candidateStore.candidate.user.photo != null){
        targetData.value.imageSrc= candidateStore.candidate.user.photo
      };

      communities.value = await supabase
        .from("Community")
        .select();
      if (communities.value.error ) {
        console.log(communities.value.error);
      }
      skills.value = await supabase.
        from("Skill").
        select();
      if (skills.value.error) {
        console.log(skills.error);
      }
        jobs.value = await supabase
        .from("Job")
        .select();
      if (jobs.value.error ) {
        console.log(jobs.value.error);
      }

    })

    const rules = reactive({
      firstName: [
        {
          required: true,
          trigger: "blur",
        },
      ],
      lastName: [
        {
          required: true,
          trigger: "blur",
        },
      ],
      phone: [
        {
          required: false,
          trigger: "blur",
        },
      ],
      wantedPost: [
        {
          required: true,
          trigger: "blur",
        },
      ],
      usersOnCommunity: [
        {
          required: false,
          message: `${t("entityForm.validation.required")}`,
          trigger: "blur"
        },
      ],
      usersSkills: [
        {
          required: true,
          trigger: "blur",
        },
      ],
      languages: [
        {
          required: true,
          trigger: "blur",
        },
      ],
      sex: [
        {
          required: true,
          trigger: "blur",
        },
      ],
      activityField: [
        {
          required: true,
          trigger: "blur",
        },
      ],
    });

  
    const submit = () => {
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
    const addData = async () => {
      if( candidateStore.candidate.user.photo != targetData.value.imageSrc)
      {
        const uploadPhoto = await uploadFile(targetData.value.imageData)
       if(uploadPhoto.url){
        targetData.value.imageSrc = uploadPhoto.url
      }
      }
      
      
      let data = {
        id: candidateStore.candidate.id,
        wantedPost: targetData.value.wantedPost,
        activityField: targetData.value.activityField,
        languages: targetData.value.languages,
        user: {
          usersOnCommunity: targetData.value.usersOnCommunity,
          firstName: targetData.value.firstName,
          lastName: targetData.value.lastName,
          phone: targetData.value.phone,
          usersSkills: targetData.value.usersSkills,
          sex: targetData.value.sex,
          email: targetData.value.email,
          username: targetData.value.email,
          photo: targetData.value.imageSrc,
          roles: ["user"],
          password: "random_init",
        }
      };
      const { error } = await setCandidate(data)
      if (!error)
        router.push({ path: "/inscription/activity" });
    }
    const skills = ref([])

    function handleFileChange(event: any) {
      if (event.target && event.target.files[0]) {
        targetData.value.imageSrc = URL.createObjectURL(event.target.files[0])
        targetData.value.imageData = event.target.files[0]
      }
    }



    return {
      t,
      targetData,
      submit,
      formRef,
      communities,
      jobs,
      skills,
      handleFileChange,
      rules,
    };
  },
});
</script>
<style lang="scss" scoped>
.vector {
    position: relative;
    bottom: 75px;
    left: 95px;
  }
   .btn {
    font-weight: 700;
    font-size: 16px;
    color:#1D1148;
  }
  .btn-continue {
    background-color: rgba(245, 134, 230, 1);
    
    z-index: 9999;
  }
body{
  height:100vh;
}

</style>

