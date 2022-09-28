<template>
    <div class="w-100 entreprise-header__container">
        <div>
            <div class="w-100">
                <img class="w-100 entreprise-header__image" :src="entreprise?.coverImage"/>
            </div>
            <div class="d-flex justify-content-between p-4 entreprise-header__header">
                <div class="d-flex gap-5 entreprise-header__header-media">
                    <div class="entreprise-header__profile-img">
                        <img :src="entreprise?.image" class="w-100" />
                    </div>
                    <div>
                      <LiveSmallWindow/>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-center">
                  <span>{{entreprise?._count.followEntreprises}}</span>
                  <span class="placeholder-color entreprise-header__subs">{{$t('entrepriseProfile.header.subs')}}</span>
                </div>
            </div>
            <div class="p-4 pb-14 entreprise-header__body">
                <span class="fw-bolder fs-1 entreprise-header__name">{{entreprise?.name}}</span>
                <div class="mt-2">
                    <span>{{entreprise?.presentationContent}}</span> 
                </div>
                <div>
                    <span class="placeholder-color">{{entreprise?.departement}}</span>
                </div>
                 <div>
                    <span>Email: <span class="placeholder-color">{{entreprise?.email}} </span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center py-5 pb-13 entreprise-header__footer ">
                    <div class="d-flex align-items-center">
                        <el-button class="me-5 p-6 entreprise-header__followed-btn" v-if="isFollowing" @click="handleUnfollow">
                            <el-icon class="me-2"><Check/></el-icon>  {{$t("entrepriseProfile.header.following")}}
                        </el-button>
                        <el-button class="me-5 p-6 entreprise-header__follow-btn" v-else @click="handleFollow">
                            <el-icon class="me-2"><Plus/></el-icon>  {{$t("entrepriseProfile.header.follow")}}
                        </el-button>
                        <div class="me-5 entreprise-header__message-icon">
                            <inline-svg src="/svg/message.svg"></inline-svg>
                        </div>
                        <a :href="entreprise?.websiteLink">
                            <span class="me-2 entreprise-header__website">{{$t('entrepriseProfile.header.website')}}</span>
                            <inline-svg src="/svg/arrows/arrow-right-up.svg"></inline-svg> 
                        </a>
                    </div>
                    <div class="d-flex align-items-center">
                        <Connections width="22" :connections="['/png/avatarProfileTest.png','/png/avatarProfileTest.png','/png/avatarProfileTest.png','/png/avatarProfileTest.png','/png/avatarProfileTest.png']"/>
                        <span class="ms-3">200 Connection work here</span>
                    </div>
                </div>


            </div>
            <div>
                <el-tabs >
                    <el-tab-pane>
                    <template #label>
                        <div>
                            <inline-svg src="/svg/entrepriseHeader/post.svg" />
                            <span class="ms-2">{{$t('entrepriseProfile.header.tabs.post')}}</span>
                        </div>
                    </template>
                    Contenu RH
                    </el-tab-pane>
                    <el-tab-pane >
                        <template #label>
                            <div >
                                <inline-svg src="/svg/entrepriseHeader/post.svg" />
                                <span class="ms-2">{{$t('entrepriseProfile.header.tabs.story')}}</span>
                            </div>
                        </template>
                        Story
                    </el-tab-pane>
                    <el-tab-pane >
                        <template #label>
                            <div >
                                <inline-svg src="/svg/entrepriseHeader/event.svg" />
                                <span class="ms-2">{{$t('entrepriseProfile.header.tabs.event')}}</span>
                            </div>
                        </template>
                    <EntrepriseEvent/>
                    </el-tab-pane>
                    <el-tab-pane>
                        <template #label>
                            <div>
                                <inline-svg src="/svg/entrepriseHeader/offer.svg" />
                                <span class="ms-2">{{$t('entrepriseProfile.header.tabs.offer')}}</span>
                            </div>
                        </template>
                        <EntrepriseOfferList />
                    </el-tab-pane>
                    <el-tab-pane>
                        <template #label>
                            <div>
                                <inline-svg src="/svg/entrepriseAside/message.svg" />
                                <span class="ms-2">{{$t('entrepriseProfile.aside.exchange')}}</span>
                            </div>
                        </template>
                        Espace d'echange
                    </el-tab-pane>
                    <el-tab-pane>
                        <template #label>
                            <div>
                                <inline-svg src="/svg/people.svg" />
                                <span class="ms-2">{{$t('entrepriseProfile.aside.community')}}</span>
                            </div>
                        </template>
                        Community
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import LiveSmallWindow from '@/components/shared/LiveSmallWindow/LiveSmallWindow.vue'
import Connections from '../Connections/Connections.vue'
import { useEntrepriseStore } from '@/store/useEntrepriseModule'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/useAuth'
import EntrepriseOfferList from '../EntrepriseOfferList/EntrepriseOfferList.vue'
import EntrepriseEvent from '../EntrepriseEvent/EntrepriseEvent.vue'
export default defineComponent({
    components:{ LiveSmallWindow, Connections, EntrepriseOfferList, EntrepriseEvent },   
    setup() {
        const {currentUser} = storeToRefs(useAuthStore())        
        const {entreprise} = storeToRefs(useEntrepriseStore())
        const {followEntreprise, unFollowEntreprise} = useEntrepriseStore()
        const handleFollow = async () => {
            entreprise.value?.id && await followEntreprise({
                data:{entreprise: {id: entreprise.value?.id}},userId:currentUser.value.id
            })
        }
        const handleUnfollow = async () => {
            entreprise.value?.id && await unFollowEntreprise(entreprise.value?.followEntreprises[0].id)
        }
        const isFollowing = computed(()=> {

          return  entreprise?.value?.followEntreprises?.some((follower) => follower.candidate?.userId === currentUser.value.id)
        })
        
        return{entreprise, isFollowing,handleFollow,handleUnfollow} 
    },
})
</script>

<style scoped lang="scss">
.entreprise-header {
    &__container{
        border-radius: 5px;

    }
    &__header {
       background: $bg-dark-700;
       border: 1px solid rgba(255, 255, 255, 0.11);
       border-top: none;
    }
    &__image {
        width:100%;
    }
    &__subs{
        @media(max-width:310px){
            font-size: 9px;
        }
        z-index:999;
    }
    &__header-media{
        position: relative;
        bottom: 70px;
        display: flex;
        align-items: flex-start;
        
    }
    &__profile-img {
        width:96px;
        height:96px;
        @media (max-width:600px){
            width: 85px;
            height: 81px;
        }
    }
    &__body{
        position: relative;
        bottom: 115px;
        margin-bottom:-186px;
        background: $bg-dark-700;
        border: 1px solid rgba(255, 255, 255, 0.11);
        border-top: none;
        border-radius: 5px;
    }
    &__name {
        color:$text-color-10;
    }
    &__description {
        color:$text-color-10;
    }
    &__message-icon {
        width: fit-content;
        border-radius:50%;
        padding: 8px;
        background:$primary-500;
        box-shadow: 0px 0px 33px rgba(203, 101, 189, 0.3);

    }
    &__follow-btn {
        color: $primary-500;
        background:transparent;
        border-color: $primary-500;
    }
    &__website {
        color: $primary-500;
    }
    &__footer {
        @media (max-width:600px){
            display: flex;
            flex-direction: column;
            gap: 20px;
            justify-content: start!important;
            align-items: start!important;
        }
    } 
    &__followed-btn {
        color: #1D1148;
        background:$primary-500;
        border:none;
    } 
 }
:deep(.el-tabs__nav-prev) {
    display: none;
}
:deep(.el-tabs__nav-next) {
    display: none;
}
:deep(.el-tabs__nav-wrap.is-scrollable) {
    padding:0px;
}
:deep(.el-tabs__nav-scroll){
    overflow: scroll;
}
:deep(.el-tabs__nav-scroll)::-webkit-scrollbar {
    display: none;
}
:deep(.el-tabs__nav-wrap):after {
     content:none!important;
     display: none!important;
}
:deep(.el-tabs__active-bar){
    display: none;
}
:deep(.el-tabs__item.is-active){
    color:$info-300;
    background: $white-transparent-11;
    border-radius: 5px;
}
:deep(.el-tabs__item){
    color:$info-300;
    padding: 0 20px!important;

}
:deep(.el-tabs__header){
    margin: 0px;
}
.placeholder-color  {
    color: $text-color-placeholder
}

:deep(.el-tabs__nav-scroll){
    width:100%;
    padding: 15px 20px;
    background: rgba($white, 0.02);
    box-shadow: inset 0px 0px 4.59193px rgba($white, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 5px;
    margin-bottom: 10px;
}
:deep(.el-tabs__item) ~ #tab-4 {
        display:none;
    }
    :deep(.el-tabs__item) ~ #tab-5 {
        display:none;
    }
@media (max-width:1000px){
    :deep(.el-tabs__item) ~ #tab-4 {
        display:inline-flex;
    }
    :deep(.el-tabs__item) ~ #tab-5 {
        display:inline-flex;
    } 
}


</style>