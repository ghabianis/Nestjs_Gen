<template>
    <div class="d-flex gap-5 entreprise-event-list__container">
        <div class="entreprise-event-list__search-card">
            <SearchCard
            description="Trouvez l'événement que vous cherchez !"
            placeholder= "Titre de l'événement ou mot clé"
            />
        </div>
        <div class="entreprise-event-list__list" >
            <InfinityScroll @bottom="handleBottom">
                <div class="d-flex flex-column gap-3 w-100">
                    <EventCard v-for="event in eventList" :event="event" :key="event.eventId"/>
                 </div>
            </InfinityScroll>
        </div>
    </div>
   
</template>
<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, ref } from 'vue'
import { useEntrepriseStore } from '@/store/useEntrepriseModule'
import { useRoute } from 'vue-router'
import SearchCard from '@/components/cart/userCard/SearchCard.vue'
import InfinityScroll from '@/components/shared/InfinityScroll/InfinityScroll.vue'
import { IEventView, useEventStore } from "@/store/useEventModule";
import EventCard from '@/components/cart/userCard/EventCard.vue'
export default defineComponent({
    components: { EventCard ,SearchCard,InfinityScroll},
    setup() {
        const {fetchEntrepriseEvents} = useEventStore()
        const {eventList, isLoading, pagination} = storeToRefs(useEventStore())
        const {entreprise} = storeToRefs(useEntrepriseStore())
        const route = useRoute()
        const id = route.params.id as string
        onMounted(async () => {
            await fetchEntrepriseEvents({
                pagination: {
                    take: 3,
                    skip: 0
                }, 
                entreprise:id
            });

        });
        const handleBottom = async () => {
             if(!isLoading.value && eventList.value.length < pagination.value?.total?._count?._all){
              await fetchEntrepriseEvents({
                pagination: {
                    take: 3,
                    skip: pagination.value.skip + 3
                }, 
                entreprise:id
            });
         }       
        }
        return { eventList, pagination, entreprise, handleBottom};
    },
})
</script>
<style lang="scss" scoped>
    .entreprise-event-list__list{
        width: 70%;
        border-radius: 5px;
    }
    :deep(.el-input input){
        padding-left: 35px!important;
        --el-input-border-color:none;
        background: $white-transparent-11;
        border-radius: 6px;
    }
    .entreprise-event-list__search-card {
        width: 30%;
        height: fit-content;
        background: $bg-dark-600;
        border-radius: 5px;
    }

    @media(max-width: 700px) {
        .entreprise-event-list {
        
            &__container { 
                display: flex;
                flex-direction: column;
            }
            &__list {
                width:100%;
            }
            &__search-card {
                width:100%;
            }
        }
    }
    
</style>
