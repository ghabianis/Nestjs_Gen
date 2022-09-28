<template>

  <div id="topCompanyCardID" class="topCompanyCard d-flex flex-column  rounded p-5">

    <div class=" d-flex justify-content-between">
      <div class="companyHreder d-flex">
        <div>
          <img src="/png/logos/googleLogo.png" class="companyImg  rounded" alt="...">
        </div>
        <div class="">
          <h6 class="companyName text--semiBold">{{companyInfo.name}}</h6>
          <h6 class=" companyFollowers text-small--regular">{{companyInfo.followersNb}} Followers</h6>
        </div>
      </div>
      <button @click="isfollowingToggle" id="follow-button" class="el-button text-small--regular">{{companyInfo.isFollow ? "Following" : "+ follow"}}</button>
    
    </div>

    <div>
      <h6 class=" companyTitle text-small--medium">{{companyInfo.title}}</h6>
      <h6 class=" companyBio text-small--regular overflowL">{{companyInfo.bio}}</h6>
    </div>

    <div class="job-section d-flex flex-row align-items-center">
      <el-icon><Suitcase /></el-icon>
      <h6 class="openJobs text-small--regular">{{companyInfo.openJobs}}Jobs</h6>
    </div>

  </div>


</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";

  export default defineComponent({

    name: "companyCard",
    components: {},
    props:{
      data : {
          required : true,
          type: String,
      }
    },
    setup(props) {
   
      const follow= ref(false);

      const companyInfo = ref({
        img: "/png/logos/googleLogo.png",
        name : "Google",
        followersNb : "51M",
        title : "IT Services and IT Consolting",
        bio : "Our mission is to organize the world ’suseful. universally and Our mission is to organize the world ’suseful. universally",
        openJobs : "5",
        isFollow: false
      });

      //follow toggle
      const isfollowingToggle =() =>{
        companyInfo.value.isFollow = !companyInfo.value.isFollow;
        console.log(companyInfo.value.isFollow);
      };

      return {
        companyInfo,
        isfollowingToggle,
        follow,
        
      };

    },

  });

</script>

<style scoped lang="scss">
  .topCompanyCard{
    width: 260px;
    background-color: $bg-dark-600;
  }
  #topCompanyCardID:hover{
    background-color: $bg-dark-500;
    gap: 1px;
  }
  .companyImg{
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
  .companyHreder{
    gap: 8px;
    cursor: pointer;
  }
  .companyTitle .companyName, .openJob{
    color: $text-color-50;
  }
  .companyFollowers, .companyBio{
    color: $text-color-100;
  }
  .overflowL{
  line-height: 2em;
  height: 4em;
  text-overflow: ellipsis;
  overflow: hidden;
  }

  .openJobs{
    margin: 0px;
  }
  .job-section{
    gap: 4px;
  }
  .el-button {
    border: none;
    background-color: $primary-o-15;
    color: $primary-500;
    --el-button-bg-color: rgba(245, 134, 230, 0.15);
    --el-button-hover-bg-color: rgba(245, 134, 230, 0.20);
    --el-button-active-bg-color: rgba(245, 134, 230, 0.25); 
  }

</style>