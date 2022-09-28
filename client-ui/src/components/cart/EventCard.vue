<template>
      <div class="event-card">
          <div class="w-100  event-card__header">
            <img :src="event.file" class=" w-100 h-100 event-card__header-img"/>
          </div>          
          <div class="px-6 event-card__body">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fs-2 d-flex justify-content-center align-items-center event-card__day">
                    <span> {{eventDay}} </span>
                </div>
                <CardDropdown  @edit="handleEdit"
                                @share="handleShare"
                                @delete="deleteEventVisible = true"
                                @duplicate="handleDuplicate" />

              </div>
              <div class="event-card__content" >
                <div class="d-flex align-items-center">
                  <inline-svg class="event-card__date-icon" src="/svg/icons/time.svg"></inline-svg>
                  <span class="ms-2 fs-7 event-card__date">{{eventDate}}</span>
                </div>
                <div class="fs-4 pt-2 event-card__title " >{{event.title}} </div>
                <div class="d-flex justify-content-center align-items-center mb-3 mt-3 py-2 px-4 event-card__attendees">{{event.attendees}} Attendees</div>
                <div class="gap-3 event-card__feedback-container">  
                  <FeedbackCard title="Vues" icon="View" background="#00D998" :value="event.views"/>
                  <FeedbackCard title="J'aime" svg="/svg/icons/like.svg" background="#FF6262" :value="event.likes"/>
                  <FeedbackCard title="Commentaire" icon="ChatDotSquare" background="#F586E6" :value="event.comments"/>
                  <FeedbackCard title="Partages" icon="Share" background="#0AB6FF" :value="event.shares"/>
              </div>
            </div>
          </div>
          <DiscardDraftVue 
            :title="$t('event.card.deleteDialog.title')"
            :message="$t('event.card.deleteDialog.message')"
            :discardText="$t('event.card.deleteDialog.discard')" 
            :cancelText="$t('event.card.deleteDialog.goBack')"
            v-if="deleteEventVisible"
            @discard="handleDelete"
            @close="deleteEventVisible=false" />

      </div>
</template>
<script lang="ts">
import { defineComponent, computed , PropType, ref } from "vue";
import FeedbackCard from "./FeedbackCard.vue";
import { getEventDate, getEventDay } from "@/core/helpers/date";
import { IEventView, useEventStore } from "@/store/useEventModule";
import CardDropdown from "../shared/CardDropdown/CardDropdown.vue";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import DiscardDraftVue from '../shared/DiscardDraft/DiscardDraft.vue';
import { storeToRefs } from "pinia";
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global

export default defineComponent({
  name: "eventCard",
  components: { FeedbackCard, CardDropdown, DiscardDraftVue },
  props:{
    event : {
        required : true,
        type: Object as PropType<IEventView>
    }
  },
  setup(props,{emit}){
    const {deleteEvent, fetchEvents} = useEventStore()
    const {pagination} = storeToRefs(useEventStore())
    const deleteEventVisible = ref(false)
    const eventDay = computed(()=>{
      return getEventDay(props.event.startDate)
      })
    const eventDate = computed(()=>{
      return getEventDate(props.event.startDate,props.event.endDate)
      })
    const handleEdit = () => {
      emit('edit',props.event.id)
    }
    const handleDuplicate = () => {

    }

    const handleDelete = async () => {
      await deleteEvent(props.event.id)
      await fetchEvents({
                        skip: pagination.value.skip,
                        take: pagination.value.take,
      });
       Components.ElMessage.success(t("event.popup.delete"))

    }
    const handleShare = () => {
      
    }
    return { 
      eventDay,
      eventDate,
      handleEdit,
      handleDuplicate,
      handleDelete,
      handleShare,
      deleteEventVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.event-card {
  background: $bg-dark-600;
  border: 1px solid $bg-dark-600;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #6A7199;
}
.event-card__header {
  background-size: cover;
  height: 240px;

}
.event-card__header-img {
  object-fit:cover;
  border-start-end-radius: 10px;
  border-start-start-radius: 10px;
}
.event-card__body{
  margin-bottom:-10px;
}
.event-card__day {
    font-weight: 700;
    color:$text-color-250;
    background: white;
    border-radius: 10px;
    width: 60px;
    height: 60px;
    text-align: center;
    position: relative;
    bottom: 30px;
    line-height: 24px;
}


.event-card__content{
  position:relative;
  bottom:20px;
}
.event-card__date-icon {
  background-color: $bg-dark-500;
  border-radius: 50%;
}
.event-card__more-icon:hover {
  cursor:pointer;
}
.event-card__date{
  color : white;
}
.event-card__title{
  font-weight: 600;
  color:$text-color-50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.event-card__attendees{
background: $primary-600;
border-radius: 5px;
color:$text-color-250;
width: fit-content;
font-weight: 600;
font-size: 12px;
}
.event-card__attendees:hover{
  cursor:pointer;
}
.event-card__disable-event{
  color : $text-color-50;
  width: 50px;
}
.event-card__feedback-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4,minmax(60px,1fr));
  gap:5px;
}
.event-card__footer {
  font-style: normal;
  font-weight: 400;
  color: $text-color-10;
  }

@media (max-width: 400px) {
  .offer-card__feedback-container {
      grid-template-columns: repeat(2,1fr);
  }
}


</style>
