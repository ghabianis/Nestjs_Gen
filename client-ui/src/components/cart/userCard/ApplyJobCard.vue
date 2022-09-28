<template>
  <div id="CompanyCardID" class="CompanyCard d-flex flex-column rounded p-5">
    <div @click="dialogVisible = true" class="d-flex flex-nowrap gap-5 cursor">
      <div>
        <img
          src="/png/logos/googleLogo.png"
          class="img rounded"
          alt="company logo"
        />
      </div>
      <div class="">
        <h6 class="job-titlle cursor  text--semiBold">
          {{ jobInfo.title }}
        </h6>
        <h6 class=" text-small--regular">
          At. {{ jobInfo.companyName }}
        </h6>
        <h6 class="applyDate text-small--regular">
          In. {{ jobInfo.applyDate }} .5days ago
        </h6>
        <div class="d-flex flex-row align-items-center gap-2">
          <!-- <el-icon><Suitcase /></el-icon> -->
          <h6 class="state text-small--regular">{{ jobInfo.state }}</h6>
        </div>
      </div>
    </div>
  </div>

  <!-- This Modal for display the job offer -->
  <div>
    <el-dialog custom-class="event-dialog__custom-class" v-model="dialogVisible" title="Job offer">

      <div class="d-flex flex-column gap-6">
        <div>
          <h6 class="job-titlle text--semiBold">Job Title</h6>
          <h6 class=" text-small--regular">{{ jobInfo.title }}</h6>
        </div>

        <div class="link-to-job cursor d-flex flex-row align-items-center ml-1">
          <h6 class="link-text m-0 text--regular">See job description</h6>
          <el-icon><Right /></el-icon>
        </div>

        <div>
          <h6 class="job-titlle text--semiBold">Company Name</h6>
          <h6 class=" cursor text-small--regular">
            {{ jobInfo.companyName }}
          </h6>
        </div>

        <div>
          <h6 class="job-titlle text--semiBold">Date</h6>
          <h6 class=" text-small--regular">{{ jobInfo.applyDate }}</h6>
        </div>

        <div>
          <h6 class="job-titlle text--semiBold">Statue</h6>
          <h6 class="state d-inline text-small--regular">
            {{ jobInfo.state }}
          </h6>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer d-flex flex-wrap justify-content-center gap-4">
          <el-button class="delete-btn" @click="deleteJobApplication">Cancel my application</el-button>
          <el-button
            class="feedback-btn"
            type="primary"
            @click="(dialogVisible = false), (centerDialogVisible = true)"
            >Send feedback
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- End Modal -->


  <!-- This Modal for the feedback -->

  <div>
    <el-dialog  custom-class="job-dialog__custom-class" v-model="centerDialogVisible" title="Feedback">

      <form @submit="sendFeedback" action="">
          <!-- <h6 class="job-titlle text--medium">Lorem ipsum is a placeholder text commonly</h6> -->
          <el-input class="" v-model="textarea" :rows="5" type="textarea" placeholder="Send feedback to the company"/>
      </form>

      <template #footer>
        <span class="dialog-footer d-flex flex-wrap justify-content-center gap-4">
          <el-button class="feedback-btn" :disabled="textarea == ''"  type="primary" @click="sendFeedback" >Send feedback</el-button>
        </span>
      </template>
    </el-dialog>
  </div>


  <!-- End Modal -->
</template>

<script lang="ts">
import { Components } from "@tekab-dev-team/storybook-devfactory";

import { computed, defineComponent, ref } from "vue";
import { ElMessageBox } from "element-plus";
export default defineComponent({
  name: "companyCard",
  components: {},
  props: {
    data: {
      required: true,
      type: String,
    },
  },
  setup(_props) {


    const jobInfo = ref({
      img: "/png/logos/googleLogo.png",
      companyName: "Google",
      applyDate: "27/7/2022",
      title: "UX/UI Designer",
      state: "Pending",
    });
    const isfollowingToggle = () => {};

    const dialogVisible = ref(false);

    //To center the feedback modal
    const centerDialogVisible = ref(false);

    //feedback
    const textarea = ref("");
    //Submit feedback function
    const sendFeedback = async () => {
      try {
        console.log(textarea.value);
        centerDialogVisible.value = false
       if(true)
         console.log()
        //Alert msg
        Components.ElMessage({
            message: "Successfully sent",
            type: "success"
        })

      } catch (error) {
          console.log(error)
        //Alert msg
        Components.ElMessage({
            message: "Failed",
            type: "error",
        })
      }
    };

    //Delete application
    const deleteJobApplication = async () =>{
        try {
        console.log('Delete');
        dialogVisible.value = false
       if(true)
         console.log()
        //Alert msg
        Components.ElMessage({
            message: "Job Successfully cancled",
            type: "success"
        })

      } catch (error) {
          console.log(error)
        //Alert msg
        Components.ElMessage({
            message: "Successfully sent",
            type: "error",
         })
      }
    }

    return {
      jobInfo,
      isfollowingToggle,
      dialogVisible,
      centerDialogVisible,
      textarea,
      sendFeedback,
      deleteJobApplication
    };
  },

});
</script>

<style scoped lang="scss">

  //***Applyed obs card css
  .CompanyCard {
    background-color: $bg-dark-600;
  }
  .img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
  @media (max-width: 375px) {
  .img {
      width: 50px;
      height: 50px;
  }
  }
  .companyTitle .job-titlle {
    color: $text-color-50;
  }

  .applyDate {
    color: $text-color-100;
  }
  .overflow {
    line-height: 1.5em;
    height: 3em;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .state {
    margin: 0px;
    background-color: $white-transparent-11;
    padding: 4px 6px;
    border-radius: 4px;
    color: $warning-300;
  }

  //***Display job details popup

  :deep(.dialog-footer button:first-child) {
    margin-right: 10px;
  }

  :deep(.el-dialog) {
    --el-dialog-bg-color: #181a1f!important;
    --el-dialog-width: 80%;
  //--el-dialog-margin-top: auto;
  }
  //display the modal for the mobile large 425px
  @media (max-width: 500px) {
  :deep(.el-dialog) {
      --el-dialog-width: 96%;
    }
  }

  //display the modal for the tablet large 600px
  @media (min-width: 600px) {
  :deep(.el-dialog) {
      --el-dialog-width: 60%;
    }
  }
  //display the modal for the laptpop 970px
  @media (min-width: 970px) {
  :deep(.el-dialog) {
      --el-dialog-width: 40%;
    }
  }
  :deep(.el-dialog__header) {
    margin-right: 0px;
    box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.1);
  }
  :deep(.el-dialog__title,
  .el-dialog__headerbtn .el-dialog__close) {
    color: $text-color-50;
  }
  :deep(.dialog-footer button:first-child,
  .el-button + .el-button ){
    margin: 0px;
  }
  .delete-btn {
    background-color: #181a1f;
    color: $red-500;
    border-color: $red-500;
  }
  .feedback-btn {
    color: $text-color-250;
  }
  .text-color-50 {
    top: auto;
  }
  .link-to-job,
  .link-text {
    color: $primary-500;
  }
  .cursor{
      cursor:pointer
  }


  //*** send feedback modal css
  :deep(.el-textarea__inner) {
    box-shadow: none;
    margin-top: 6px;
    color: $text-color-50;
  }
  :deep(.el-button--primary, el-button.is-disabled){
    --el-button-disabled-text-color: #000C57;
  }

    //***Alert
</style>
