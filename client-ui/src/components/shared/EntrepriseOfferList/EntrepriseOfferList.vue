<template>
    <div class="d-flex gap-5 entreprise-offer-list__container">
        <div class="entreprise-offer-list__search-card">
            <SearchCard
                :description="`${entreprise?.name} a ${pagination.total?._count?._all} offres d'emploi `"
                subDescription="Trouvez celui qui vous convient."
                placeholder= "titre du poste ou mot clé"
            />
        </div>

        <div class="d-flex flex-column gap-3 entreprise__offer-list">
            <InfinityScroll @bottom="handleBottom">
                <OfferCard v-for="offer in offerList" :offer="offer" :key="offer.offerId"/>
            </InfinityScroll>
        </div>
    </div>
   
</template>
<script lang="ts">
import { useOfferStore } from '@/store/useOfferModule'
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import OfferCard from '@/components/cart/userCard/offerCard.vue'
import { useEntrepriseStore } from '@/store/useEntrepriseModule'
import { useRoute } from 'vue-router'
import SearchCard from '@/components/cart/userCard/SearchCard.vue'
import InfinityScroll from '@/components/shared/InfinityScroll/InfinityScroll.vue'

export default defineComponent({
    components: { OfferCard,SearchCard,InfinityScroll },
    setup() {
        const { fetchCandidateOffer } = useOfferStore();
        const { offerList, pagination , isLoading} = storeToRefs(useOfferStore());
        const {entreprise} = storeToRefs(useEntrepriseStore())
        const route = useRoute()
        const id = route.params.id as string
        onMounted(async () => {
            await fetchCandidateOffer({
                pagination: {
                    take: 3,
                    skip: 0
                }, 
                entreprise:id
            });
        });
        const handleBottom = async () => {
          if(!isLoading.value && offerList.value.length < pagination.value?.total?._count?._all){
            await fetchCandidateOffer({
                pagination: {
                    take: 3,
                    skip: pagination.value.skip + 3
                }, 
                entreprise:id
            });
          }       
        }
        return { offerList, pagination, entreprise, handleBottom};
    },
})
</script>
<style lang="scss" scoped>
    .entreprise-offer-list__search-card{
        width: 30%;
        height: fit-content;
        background: $bg-dark-600;
        border-radius: 5px;

    } 
    .entreprise__offer-list{
        width: 70%;
        border-radius: 5px;

    }
    :deep(.el-input input){
        padding-left: 35px!important;
        --el-input-border-color:none;
        background: $white-transparent-11;
        border-radius: 6px;
    }

        @media(max-width: 700px) {
            .entreprise-offer-list__container{
                display: flex;
                flex-direction: column;
            }
            .entreprise-offer-list__search-card{
                width:100%;
            }
            .entreprise__offer-list{
                width:100%;
            }
            
        }
    
</style>
