<template>
      <div class="offer-card">
          <div class="w-100  offer-card__header">
            <img src="/png/icons/offer-card-pic.png" class=" w-100 h-100 offer-card__header-img"/>
          </div>          
          <div class="p-6 pb-4 offer-card__body">
              <div class="d-flex justify-content-between">
                <div class="fs-4 offer-card__title">{{offer.title}}</div>
                <div class="d-flex align-items-center">
                  <div class="fs-9 offer-card__disable-offer">{{offer.isactive ? "Disable" : "Activate"}} the offer</div>
                  <el-switch :model-value="offer.isactive" style="--el-switch-on-color:#F586E6; --el-switch-off-color: #000" @change="disableOfferVisible=true"/>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center ps-4 pe-4 pt-1 pb-1 mb-4 offer-card__attendees" @click="handleAttendeesClick">{{offer.attendees}} Attendees</div>
              <div class="gap-3 offer-card__feedback-container">  
                <FeedbackCard title="Vues" icon="View" background="#00D998" :value="offer.views"/>
                <FeedbackCard title="J'aime" svg="/svg/icons/like.svg" background="#FF6262" :value="offer.likes"/>
                <FeedbackCard title="Commentaire" icon="ChatDotSquare" background="#F586E6" :value="offer.comments"/>
                <FeedbackCard title="Partages" icon="Share" background="#0AB6FF" :value="offer.shares"/>
            </div>
        </div>
        <div class="mt-4 mb-4 ms-6 me-5 d-flex justify-content-between offer-card__footer">
          <div class="d-flex align-items-center">
             <inline-svg class="offer-card__footer-date-icon" src="/svg/icons/time.svg"></inline-svg>
             <span class="ms-2 fs-9 offer-card__footer-date">{{createdAt}}</span>
          </div>
          <div class="horizantal-list__more-icon">
            <CardDropdown @edit="handleEdit" @share="handleShare" @delete="deleteOfferVisible=true" @duplicate="handleDuplicate" />
          </div>
        </div>
        <DiscardDraftVue 
            :title="$t('offer.card.deleteDialog.title')"
            :message="$t('offer.card.deleteDialog.message')"
            :discardText="$t('offer.card.deleteDialog.discard')" 
            :cancelText="$t('offer.card.deleteDialog.goBack')"
            v-if="deleteOfferVisible"
            @discard="handleDelete"
            @close="deleteOfferVisible=false" />
        <DiscardDraftVue 
            :title="offer.isactive ? $t('offer.card.disableDialog.title') : $t('offer.card.activateDialog.title')"
            :message="offer.isactive ? $t('offer.card.disableDialog.message') : $t('offer.card.activateDialog.message')"
            :discardText="offer.isactive ? $t('offer.card.disableDialog.discard') : $t('offer.card.activateDialog.discard')" 
            :cancelText="offer.isactive ? $t('offer.card.disableDialog.goBack') : $t('offer.card.activateDialog.goBack')"
            cancelBtnStyle="danger"
            discardBtnStyle="success"
            v-if="disableOfferVisible"
            @discard="handleToggle"
            @close="disableOfferVisible=false" />
      </div>
</template>
<script lang="ts">
import { getCreatedDate } from "@/core/helpers/date";
import { useOfferStore } from "@/store/useOfferModule";
import { defineComponent, computed, PropType, ref } from "vue";
import FeedbackCard from "./FeedbackCard.vue";
import CardDropdown from "@/components/shared/CardDropdown/CardDropdown.vue";
import { IOfferView } from "@/store/useOfferModule";
import { useRouter } from "vue-router";
import { usePublicationStore } from '@/store/usePublicationModule';
import { Components } from "@tekab-dev-team/storybook-devfactory";
import DiscardDraftVue from '../shared/DiscardDraft/DiscardDraft.vue';
import { storeToRefs } from "pinia";
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global

export default defineComponent({
  name: "offerCard",
  components: { CardDropdown,FeedbackCard, DiscardDraftVue},
  props:{
    offer : {
        required : true,
        type: Object as PropType <IOfferView>
    }
  },
  setup(props){
   const {editOffer} = useOfferStore()   
   const {pagination} = storeToRefs(useOfferStore())
   const deleteOfferVisible = ref(false)
   const disableOfferVisible = ref(false)   
   const handleToggle = async () => {
        const isActive = props.offer.isactive
        const payload = {
          id : props.offer.offerId,
          data: {
            isActive : !isActive
          }
        }
        await editOffer(payload)
        if(isActive){
          await fetchOffers({
           skip: pagination.value.skip,
           take: pagination.value.take,
        })         
      }
        else {
          await fetchDisabledOffers({
           skip: pagination.value.skip,
           take: pagination.value.take,
        })         
        }
    }
    const createdAt = computed(()=>{
        
        return getCreatedDate(props.offer.createdAt)

    })
    const router = useRouter();
    const { fetchOffers, duplicateOffer, fetchDisabledOffers } = useOfferStore();
    const {deletePublication} = usePublicationStore()
    const handleDuplicate = async () => {
        const data = {
            title:props.offer.title,
            type:"offer",
            description:props.offer.description
        }
    
       const {duplicatedId} = await duplicateOffer({id:props.offer.offerId,data})
       if (duplicatedId){
          router.push({ name: "edit-offer", params: { id:  duplicatedId}});
       }
        Components.ElMessage.success(t("offer.popup.duplicate")) 
    }
    const handleEdit = () => {        
      router.push({ name: "edit-offer", params: { id:  props.offer.publicationId}});
    }
    const handleDelete = async () => {
      await deletePublication(props.offer.publicationId, {type:'offer'})
      const isActive = props.offer.isactive 
      if (isActive){
        await fetchOffers({
                          skip: pagination.value.skip,
                          take: pagination.value.take,
                      });     
      }
      else{
        await fetchDisabledOffers({
                          skip: pagination.value.skip,
                          take: pagination.value.take,
                      });     
 
      }
      Components.ElMessage.success(t("offer.popup.delete"))
    }
    const handleShare = () => {
      console.log("shared");
    }
    const handleAttendeesClick = () => {
      router.push({name:'application-kanban',params:{id:props.offer.offerId}})
    }

    return { handleToggle , createdAt, handleDelete,handleDuplicate, handleEdit, handleShare, deleteOfferVisible, disableOfferVisible, handleAttendeesClick}
  }
})
</script>

<style lang="scss" scoped>
.offer-card {
  background: $bg-dark-600;
  border: 1px solid $bg-dark-600;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #6A7199;
}
.offer-card__header {
  background-size: cover;
  height: 240px;

}
.offer-card__header-img {
  object-fit:cover;
  border-start-end-radius: 10px;
  border-start-start-radius: 10px;
}
.offer-card__body{
  border-bottom: 1px solid $white-transparent-11;
}
.offer-card__title{
font-weight:700;
color:$text-color-50;
white-space:nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
.offer-card__attendees{
background: $primary-600;
border-radius: 5px;
color:$text-color-250;
width: fit-content;
}
.offer-card__attendees:hover{
  cursor:pointer;
}
.offer-card__disable-offer{
  color : $text-color-50;
  width: 50px;
}
.offer-card__feedback-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4,minmax(60px,1fr));
  gap:5px;
}
.offer-card__footer {
  font-style: normal;
  font-weight: 400;
  color: $text-color-10;
  }
.offer-card__footer-date-icon {
  background-color: $bg-dark-500;
  border-radius: 50%;
}
.offer-card__footer-more-icon:hover {
  cursor:pointer;
}
.offer-card__footer-date{
  color : $text-color-50;
}
.horizantal-list__more-icon:hover {
  cursor: pointer;
}
</style>
