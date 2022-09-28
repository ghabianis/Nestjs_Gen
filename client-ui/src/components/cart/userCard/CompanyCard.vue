<template>

  <div id="CompanyCardID" class="CompanyCard d-flex flex-column  rounded p-5">

    <div class=" d-flex justify-content-between">
      <div class="companyHreder d-flex flex-nowrap ">
        <div>
          <img src="/png/logos/googleLogo.png" class="companyImg  rounded" alt="...">
        </div>
        <div class="">
          <h6 class="companyName text--semiBold">{{companyInfo.name}}</h6>
          <h6 class=" companyFollowers text-small--regular">{{companyInfo.followersNb}} Followers</h6>
        </div>
      </div>
      <div class="btns-section d-flex align-items-center flex-wrap gap-2 justify-content-end ">
        <div class="job-section d-flex flex-row align-items-center ml-1">
            <el-icon><Suitcase /></el-icon>
            <h6 class="openJobs text-small--regular">{{companyInfo.openJobs}}Jobs</h6>
        </div>
        <button @click="isfollowingToggle" id="follow-button" class="el-button text-small--regular">{{companyInfo.isFollow ? "Following" : "+ follow"}}</button>

      </div>
    
    </div>

    <div>
      <h6 class=" companyTitle text-small--medium">{{companyInfo.title}}</h6>
      <h6 class=" companyBio text-small--regular overflow">{{companyInfo.bio}}</h6>
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
          type: String
      }
    },
    setup(props) {
   
      const follow= ref(false);
      
      const companyInfo = ref({
        img: "/png/logos/googleLogo.png",
        name : "Google",
        followersNb : "51M",
        title : "IT Services and IT Consolting",
        bio : "Our mission is to organize the world ’suseful. universally and Our mission is to organize the world ’suseful. universally and Our mission is to organize the world",
        openJobs : "5",
        isFollow: false
      });

      const isfollowingToggle =() =>{
        companyInfo.value.isFollow = !companyInfo.value.isFollow;
      };

      return {
        companyInfo,
        isfollowingToggle,
        follow
      };

    },

    methods: {

    }

  });

</script>

<style scoped lang="scss">
  .CompanyCard{
    background-color: $bg-dark-600;
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
  .overflow {
    line-height: 1.5em; 
    height: 3em; 
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
  @media (max-width: 320px) {
    .btns-section{
        flex-direction: column-reverse;
    }
  }

</style>