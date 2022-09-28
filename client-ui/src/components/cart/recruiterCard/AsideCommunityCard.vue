<template>
    <div class="p-5 w-100 compoany-profile-aside__container d-flex flex-column gap-5">
        <div>
            <div class="d-flex mb-3"><span class="header-title">Rooms</span> <span class="header-number">5</span> </div>
            <div> <el-input
            v-model="searchInput"
            placeholder="Search contacts"
            :prefix-icon="Search"
            /></div>
            <div :class="isSolo?'d-flex-card':''"><div  class="mb-4" v-for="userCommunity in usersoncommunityList" :key="userCommunity.id"><CommunityCard :userCommunity="userCommunity" :isSolo="isSolo"/></div></div>
            
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import CommunityCard from '@/components/cart/CommunityCard.vue'
import ExchangeCard from '@/components/cart/ExchangeCard.vue'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import {useUsersOnCommunityStore} from '@/store/useUsersOnCommunityModule'
import { useEntrepriseStore } from '@/store/useEntrepriseModule'
import { t } from "@/core/i18n/translate";
import { useAuthStore } from "@/store/useAuth";
export default defineComponent({
      props: {
    isSolo:{
        type:Boolean,
        default: true
    }
  },
    setup() {
        const { usersoncommunityList} = storeToRefs(useUsersOnCommunityStore());
        const { fetchUsersOnCommunities } = useUsersOnCommunityStore()
         const authStore = useAuthStore()
    console.log(authStore.currentUser.id,"authStore.currentUser.id")
          onMounted(async () => {
      await fetchUsersOnCommunities({userId:authStore.currentUser.id,pagination: {
                    skip:0,
                    take: 4
                }})
                console.log(usersoncommunityList?.value,"usersoncommunityListusersoncommunityListusersoncommunityListusersoncommunityList");
                
    });
        const {entreprise} = storeToRefs(useEntrepriseStore())
        return {entreprise,Search,usersoncommunityList}
    },
    components: { CommunityCard, ExchangeCard }
})
</script>
<style scoped lang="scss">
:deep(.el-input){
background: #3B3D46;
border-radius: 6px;
height: 36px ;
margin-bottom: 35px;
}
 :deep(.el-input__inner){
        padding-left: 35px!important;
        height: 36px
    }
 .header-title{

font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
display: flex;
align-items: center;
color: #FFFFFF;

 }
 .d-flex-card{
    @media screen and (min-width: 600px) {
        display: flex;
        justify-content: space-around;
    }
 }
 .header-number{

    background: rgba(236, 251, 230, 0.1);
border-radius: 3px;
width: 25px;
height: 26px;
padding: 3px 8px;
margin-left: 4px;
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
display: flex;
align-items: center;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 3px 8px;
color: #50CD89
 }
    .compoany-profile-aside__{
        &container{
            background: $bg-dark-700;
            border: 1px solid rgba(255, 255, 255, 0.11);
            border-radius: 5px;
        }
        &community{
            background: $bg-dark-600;
            box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
            border-radius: 10px 10px 0px 0px;
            color:$info-300;
        }
        &communities {
            background: #17181C;
            border-radius: 10px;
        }
        &communities-list{
            height: 260px;
            overflow: scroll;
            
        }
    }
</style>
