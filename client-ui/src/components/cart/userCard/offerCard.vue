<template>
    <div class="pt-2 mb-2 entreprise__offer-card">
        <div class="mt-4 mx-3 d-flex justify-content-between">
            <div class="d-flex align-items-start gap-2 flex-grow-1 flex-shrink-1" style="flex-basis:0;">
                <img :src="entreprise?.image" class="entreprise__offer-card-profile-img"/>
                <div class="d-flex flex-column">
                    <span class="d-flex flex-wrap">{{offer?.title}}</span>
                    <span>{{entreprise?.name}}</span>
                    <span>{{offer.place}}, {{$t('date.ago')}} {{createdSince}}</span>
                </div>
            </div>
            <div>
                <el-button size="large" class="me-3 entreprise__offer-card__description-btn fs-6"><span class="entreprise__offer-card__description-icon"> <inline-svg src="/svg/description.svg"></inline-svg> </span> <span  class="ms-2">description</span></el-button>
                <el-dropdown trigger="click" popper-class="offer-card__footer-dropdown">
                <div class="d-flex justify-content-center align-items-center entreprise__offer-card__dropdown-icon"><inline-svg src="/svg/icons/more.svg"></inline-svg></div> 
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item ><inline-svg src="/svg/icons/delete-icon.svg"/><span class="ms-2">Save</span></el-dropdown-item>
                            <el-dropdown-item ><inline-svg src="/svg/icons/share.svg"/><span class="ms-2">Copy link</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </template>                    
                </el-dropdown>
            </div>
        </div>
        <div class="my-8 mx-3 d-flex flex-column">
            <div :class="[seeMore ? 'entreprise__offer-card__description-more' : 'entreprise__offer-card__description-less']" v-html="offer?.description"></div>
            <div class="mt-2 align-self-end see-more" @click="seeMore=!seeMore">
                <span v-if="seeMore">{{$t('entrepriseProfile.offer.card.seeLess')}}</span> 
                <span v-else>{{$t('entrepriseProfile.offer.card.seeMore')}}</span>
            </div>
        </div>
        <div class="d-flex justify-content-center entreprise__offer-card__media">
            <img src="/png/offercardtestimg.png">
        </div>
        <div class="d-flex py-6 ps-5 entreprise__offer-card__social">
            <span> {{offer.likes}} {{$t("entrepriseProfile.offer.card.likes")}}</span>
            <span> {{offer.comments}} {{$t("entrepriseProfile.offer.card.comments")}}</span>
            <span> {{offer.shares}} {{$t("entrepriseProfile.offer.card.shares")}}</span>
        </div>
        <div class="d-flex justify-content-between py-4 px-2 entreprise__offer-card__interraction">
            <div class="d-flex justify-content-between entreprise__offer-card__interraction-container">
                <div class="d-flex align-items-center cursor-pointer" @click="handleDislikeClick" v-if="offer?.isLike">
                    <inline-svg src="/svg/icons/candidate/liked.svg"></inline-svg>
                    <span class="ms-2 entreprise__offer-card__interraction-text"> {{$t("entrepriseProfile.offer.card.likes")}}</span>
                </div>
                <div class="d-flex align-items-center cursor-pointer" v-else @click="handleLikeClick">
                    <inline-svg src="/svg/icons/candidate/like.svg"></inline-svg>
                    <span class="ms-2 entreprise__offer-card__interraction-text"> {{$t("entrepriseProfile.offer.card.likes")}}</span>
                </div>
                <div class="d-flex align-items-center">
                    <inline-svg src="/svg/icons/candidate/comment.svg"></inline-svg>
                    <span class="ms-2 entreprise__offer-card__interraction-text"> {{$t("entrepriseProfile.offer.card.comment")}}</span>
                </div>
                <div class="d-flex align-items-center">
                    <inline-svg src="/svg/icons/candidate/share.svg" ></inline-svg>
                    <span class="ms-2 entreprise__offer-card__interraction-text"> {{$t("entrepriseProfile.offer.card.share")}}</span>
                </div>
            </div>
            <div class="d-flex align-items-center entreprise__offer-card__interraction-send">
                    <inline-svg src="/svg/icons/candidate/send.svg"></inline-svg>
                    <span class="ms-2 me-3 entreprise__offer-card__interraction-text"> {{$t("entrepriseProfile.offer.card.send")}}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { useEntrepriseStore } from '@/store/useEntrepriseModule'
import { storeToRefs } from 'pinia'
import { defineComponent, ref, PropType, computed} from 'vue'
import { useOfferStore } from '@/store/useOfferModule'
import { IOfferView } from "@/store/useOfferModule";
import { useAuthStore } from '@/store/useAuth';
import { dateSince } from "@/core/helpers/date";
import { t } from "@/core/i18n/translate";
export default defineComponent({
    props:{
        offer : {
            required : true,
            type: Object as PropType <IOfferView>
        },
    },
    setup(props) {
        const seeMore = ref(false)
        const {entreprise} = storeToRefs(useEntrepriseStore())
        const {currentUser} = storeToRefs(useAuthStore())
        const {likeOffer, dislikeOffer} = useOfferStore()
        const handleLikeClick = async () => {
           await likeOffer({
            publication:{id:props.offer.publicationId},
            user:{
                id: currentUser.value.id
            },
            type:'like',           
           })
        }
        const handleDislikeClick = async () => {
           await dislikeOffer(props.offer.isLike)
        }
        const createdSince = computed(() => {
            return dateSince(props.offer.createdAt)
        })
        return {seeMore, entreprise,handleLikeClick, handleDislikeClick, createdSince}
    },
})
</script>

<style lang="scss" scoped>
    .entreprise__offer-card {
        background:$bg-dark-600;
        border-radius: 6px;
        &-profile-img{
            width: 50px;
            height: 50px;
        }
        &__description-btn {
            color: $primary-500;
            background: $white-transparent-11;
            border: none;
             @media (max-width: 360px){
                font-size: 10px!important;
            } 
            @media (max-width: 400px){
                padding: 9px 9px!important;
            }
            @media (max-width: 360px){
                padding: 5px 5px!important;
            }
        }
        &__media {
          background:#DAD8BC ;  
        }
        &__dropdown-icon {
            background: $white-transparent-11 ;
            width: 36px;
            height: 40px;
            border-radius: 5px;
            @media (max-width: 500px){
                width: 32px;
                height: 40px;  
            }
            @media (max-width: 400px){
                width: fit-content;
                height: 40px;  
                background: transparent;
            }
        }
        &__social {
            background:$bg-dark-600;
            gap:10%;
        }
        &__interraction {
            background: rgba( $white, 0.05);
            border-end-end-radius: 6px;
            border-end-start-radius: 6px;    
        
        }
        &__interraction-text {
            @media (max-width:380px){
                display: none;
            }
        }
        &__description-less {
        color: $text-color-50;
        height: 35px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 18px;
        @supports (-webkit-line-clamp: 2) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: initial;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
         }
        }
        &__description-more {
            min-height: 35px;
            line-height: 18px;
        }
        &__interraction-container{
            width: 72%;
            @media (max-width: 350px){
                justify-content: space-around;
                width: 70%;
            }

        }
        &__description-icon{
            @media (max-width:400px) {
                display: none;
            }
        }
    }
    .see-more:hover{
        cursor:pointer;
    }
    


</style>