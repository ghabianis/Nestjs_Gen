<template>
      <div class="entreprise-event-card">
          <div class="w-100  entreprise-event-card_header">
            <img src="/png/eventTestImg.png" class=" w-100 h-100 entreprise-event-card__header-img"/>
          </div>          
          <div class="px-3 entreprise-event-card__body">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fs-2 d-flex justify-content-center align-items-center entreprise-event-card__day">
                    <span> {{eventDay}} </span>
                </div>
                 <div class="me-3">
                  <CardDropdown  />
                 </div>
              </div>
              <div class="entreprise-event-card__content" >
                <div class="d-flex align-items-center">
                  <inline-svg class="entreprise-event-card__date-icon" src="/svg/icons/time.svg"></inline-svg>
                  <span class="ms-2 fs-7 entreprise-event-card__date">{{eventDate}}</span>
                </div>
                <div class="fs-4 pt-2 entreprise-event-card__title " >{{event.title}}</div>
                <div class="d-flex my-2">
                  <img src="/png/entrepriseTestImg.png" class="entreprise-event-card__img me-3"/>
                  <div><span class="fs-7 fw-bold entreprise-event-card__host"> Event by </span> <span class="fs-7 entreprise-event-card__name"> {{entreprise?.name}} </span> </div>
                </div>
                <div class="entreprise-event-card__description" v-html="event.description"></div>
                <div class="d-flex gap-5 my-3 entreprise-event-card__stat">
                  <span>{{event.attendees}} Paticipant</span>
                  <span>{{event.comments}} Comment</span>
                  <span>{{event.shares}} Share</span>
                </div>
                <div class="d-flex justify-content-between my-2">
                
                    <el-button v-if="event.attended" size="large" class="d-flex fw-bolder entreprise-event-card__attended-btn fs-5" @click="handleMissClick">
                      <div class="d-flex align-items-end"> 
                        <inline-svg src="/svg/icons/candidate/attended.svg" ></inline-svg>  
                        <span class="ms-2"> Attended </span>
                      </div>
                    </el-button>
                    <el-button v-else size="large" class="d-flex fw-bolder entreprise-event-card__attend-btn fs-5" @click="handleAttendClick">
                      <div class="d-flex align-items-end"> 
                        <inline-svg src="/svg/icons/candidate/star.svg" ></inline-svg>  
                        <span class="ms-2"> Attend </span>
                      </div>
                    </el-button>
                  <div class="d-flex gap-5 align-items-center">
                    <div class="p-3 cursor-pointer entreprise-event-card__social"> <inline-svg src="/svg/icons/candidate/comment.svg"></inline-svg> </div>
                    <div class="p-3 cursor-pointer entreprise-event-card__social"> <inline-svg src="/svg/icons/candidate/send.svg"></inline-svg> </div>
                    <div class="p-3 cursor-pointer entreprise-event-card__social"> <inline-svg src="/svg/icons/candidate/share.svg"></inline-svg> </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
</template>
<script lang="ts">
import { defineComponent, computed , PropType, ref } from "vue";
import { getEventDate, getEventDay } from "@/core/helpers/date";
import { IEventView, useEventStore } from "@/store/useEventModule";
import { storeToRefs } from "pinia";
import {useEntrepriseStore} from "@/store/useEntrepriseModule"
import {useAuthStore} from "@/store/useAuth"
import CardDropdown from "@/components/shared/CardDropdown/CardDropdown.vue";
export default defineComponent({
  name: "eventCard",
  components: { CardDropdown},
  props:{
    event : {
        required : true,
        type: Object as PropType<IEventView>
    }
  },
  setup(props){
    const {entreprise} = storeToRefs(useEntrepriseStore())
    const {attendEvent, missEvent} = useEventStore()
    const {currentUser} = storeToRefs(useAuthStore())
    const eventDay = computed(()=>{
      return getEventDay(props.event.startDate)
      })
    const eventDate = computed(()=>{
      return getEventDate(props.event.startDate,props.event.endDate)
      })
    const handleAttendClick = async () => {
      await attendEvent({
        publication:{id:props.event.publicationId},
        user:{
            id: currentUser.value.id
        },
        type:'attend',           
      })
      
    }
    const handleMissClick = async () => {
      await missEvent(props.event?.attended)
    }
    return { 
      eventDay,
      eventDate,
      entreprise,
      handleAttendClick,
      handleMissClick
    }
  }
})
</script>

<style lang="scss" scoped>
.entreprise-event-card{
  background: $bg-dark-600;
  border: 1px solid $bg-dark-600;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #6A7199;
  &__header {
    background-size: cover;
    height: 240px;

  }
  &__header-img {
    object-fit:cover;
    border-start-end-radius: 10px;
    border-start-start-radius: 10px;
  }

&__body{
  margin-bottom:-10px;
}
&__day {
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


&__content{
  position:relative;
  bottom:20px;
}
&__date-icon {
  background-color: $bg-dark-500;
  border-radius: 50%;
}
&__more-icon:hover {
  cursor:pointer;
}
&__date{
  color : white;
}
&__title{
  font-weight: 600;
  color:$text-color-50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
&__attendees{
background: $primary-600;
border-radius: 5px;
color:$text-color-250;
width: fit-content;
font-weight: 600;
font-size: 12px;
}
&__attendees:hover{
  cursor:pointer;
}
&__disable-event{
  color : $text-color-50;
  width: 50px;
}
&__feedback-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4,minmax(60px,1fr));
  gap:5px;
}
&__footer {
  color:$white;
  }
&__social{
  background:$white-transparent-11;
  border-radius: 6px;
  @media (max-width:600px) {
    padding: 6px!important;
  }
}
&__attend-btn{
  background: $white-transparent-11;
  border:none;
  color:$info-50;
  @media (max-width:600px){
      padding: 10px 8px!important;
      height: fit-content;

  }
  }
&__attended-btn{
  background: $primary-o-15;
  border:none;
  color:$primary-500;
  @media (max-width:600px){
      padding: 10px 8px!important;
      height: fit-content;

  }
}
&__img{
  width:20px;
  height: 20px;
  border-radius: 2px;
}
&__description {
  color: $text-color-disabled;
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
&__host {
  color: $text-color-10;
}
&__name{
  color: $text-color-100;
}
&__stat{
  color:$text-color-info-200;
}

}




</style>
