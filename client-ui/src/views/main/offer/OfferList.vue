<template>
    <el-card shadow="never" class="card w-100 mt-5 offer-list__main-container" :body-style="{padding:'0'}">
      <div class="header__wrapper p-9">
        <div class="text-color">
          {{ $t("entityList.pagination.display") }}
          {{ pagination.total._count?._all }}
          {{ $t("entityList.pagination.items") }}
        </div>
        <div class="d-flex flex-sm-row align-items-center">
          <Pagination
            :itemsPerPage="pagination.take"
            :set-items-per-page="setItemsPerPage"
            :page="Math.floor(pagination.skip / pagination.take) + 1"
            :current-page-change="currentPageChange"
            :total="pagination.total._count?._all"
            :pages-array="[3, 6, 9, 12]"
          />
          <div class="ms-9">
             <DisplayMode :displayVertical="displayVertical"
              @vertical="displayVertical=true"
              @horizantal="displayVertical=false"
               />
          </div>
        </div>
      </div>
      <div class="py-6 px-9 offer-list__card-container" v-if="displayVertical">  
        <template v-for="(offer) in offerList" :key="offer.publicationId">
          <OfferCard :offer="offer" />
       
        </template>
      </div>
      <template v-else>
      <div  class="py-4 px-6 offer-list__horizantal-header">
        <span>Nom d'offert</span>
        <span>Créer le</span>
        <span>Vues</span>
        <span>Réponses</span>
        <span>J'aime</span>
        <span>Partages</span>
      </div>
      <div class="offer-list__horizantal-body py-4 px-6" v-for="(offer) in offerList" :key="offer.publicationId">
        <div class="d-flex align-items-center " style="min-width:0;"><span class="offer-title">{{offer.title}}</span></div>
        <div class="d-flex align-items-center"><inline-svg src="/svg/icons/time.svg" class="me-2"></inline-svg> {{getCreatedDate(offer.createdAt)}}</div>
        <div class="d-flex align-items-center"><el-icon class="me-2"><View/></el-icon>{{offer.views}}</div>
        <div class="d-flex align-items-center"><el-icon class="me-2"><ChatDotSquare/></el-icon>{{offer.comments}}</div>
        <div class="d-flex align-items-center"><inline-svg src="/svg/icons/like.svg" class="me-2"></inline-svg>{{offer.likes}}</div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center"><el-icon class="me-2"><Share/></el-icon>{{offer.shares}}</div>
            <CardDropdown  @edit="handleEdit(offer.publicationId)"
                           @share="handleShare"
                           @delete="handleDelete(offer.publicationId)"
                           @duplicate="handleDuplicate(offer)" />
        </div>
      </div>
      </template>
      <div class="footer__wrapper">
        <Pagination
          :itemsPerPage="pagination.take"
          :set-items-per-page="setItemsPerPage"
          :page="Math.floor(pagination.skip / pagination.take) + 1"
          :current-page-change="currentPageChange"
          :total="pagination.total._count?._all"
          :pages-array="[3, 6, 9, 12]"
        />
      </div>
    </el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent, watch } from "vue";
import { storeToRefs } from "pinia";
import { IOfferView, useOfferStore } from "@/store/useOfferModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import { getCreatedDate } from "@/core/helpers/date";
import { useRouter } from "vue-router";
import { usePublicationStore } from '@/store/usePublicationModule';
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global
const ConfirmModal = defineAsyncComponent(
  () => import("@/components/modals/ConfirmModal.vue")
);
import OfferCardVue from "@/components/cart/OfferCard.vue";
import OfferCard from "@/components/cart/OfferCard.vue";
import DisplayMode from "@/components/shared/DisplayMode/DisplayMode.vue";
import CardDropdown from "@/components/shared/CardDropdown/CardDropdown.vue";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { useConfigStore } from "@/store/useConfig";
export default defineComponent({
  name: "offerList",
  components: { Pagination, ConfirmModal, OfferCardVue, OfferCard, DisplayMode, CardDropdown },
  setup() {
    const displayVertical = ref(true)
    const { offerList, pagination, isLoading } = storeToRefs(useOfferStore());
    const { fetchOffers, deleteOffer, duplicateOffer, fetchDisabledOffers } = useOfferStore();
    const {pageTitle } = storeToRefs(useConfigStore());
    const setItemsPerPage = async (event: any) => {
     if(pageTitle.value === t("breadcrumb.active")){
       await fetchOffers({
          skip: 0,
          take: parseInt(event.target.value),
      });     
      }else{
        await fetchDisabledOffers({
          skip: 0,
          take: parseInt(event.target.value), 
       });     
      }
    };
    const currentPageChange = async (val: number) => {

    if(pageTitle.value === t("breadcrumb.active")){
       await fetchOffers({
          skip: (val - 1) * pagination.value.take,
          take: pagination.value.take,
      });     
      }else{
        await fetchDisabledOffers({
          skip: (val - 1) * pagination.value.take,
          take: pagination.value.take,
      });     
      }

    };
    onMounted(async () => {      
      await fetchOffers({
        skip: 0,
        take: 3,
      });      
    });
        const router = useRouter();
    const {deletePublication} = usePublicationStore()

    const handleDuplicate = async (offer: IOfferView) => {
        const data = {
            title:offer.title,
            type:"offer",
            description:offer.description
        }
        await duplicateOffer({id:offer.offerId,data})
        await fetchOffers({
        skip: pagination.value.skip,
        take: pagination.value.take,
      });     
      Components.ElMessage.success("Offer is duplicated successfully")
    }
    const handleEdit = (publicationId: string) => {        
      router.push({ name: "edit-offer", params: { id:  publicationId}});
    }
    const handleDelete = async (publicationId: string) => {
      await deletePublication(publicationId,{type:'offer'})
      await fetchOffers({
                        skip: pagination.value.skip,
                        take: pagination.value.take,
                     });     
       Components.ElMessage.success("Offer is deleted successfully")

    }
    const handleShare = () => {
      console.log("shared");
    }
    watch(pageTitle,async ()=>{
      if(pageTitle.value === t("breadcrumb.active")){
       await fetchOffers({
        skip: pagination.value.skip,
        take: pagination.value.take,
      });     
      }else{
        await fetchDisabledOffers({
        skip: pagination.value.skip,
        take: pagination.value.take,
      });     
      }
    })
    return {
      offerList,
      pagination,
      setItemsPerPage,
      currentPageChange,
      displayVertical,
      getCreatedDate,
      handleDuplicate,
      handleShare,
      handleEdit,
      handleDelete,
    };
  },
});
</script>

<style scoped lang="scss">
.offer-list__main-container {
    box-shadow: 0px 0px 2px #6A7199;
    border: $white-transparent-11;
  }
.header__wrapper {
  border-bottom: solid 1px $bd-card-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;

  div {
    font-size: 0.875rem;
  }

@media screen and (max-width: 768px) {
    flex-direction: column;
    height: auto;
    row-gap: 10px;
    padding-block: 10px;
    justify-content: unset;
  }
}
.offer-list__card-container {
  display: grid;
  gap:25px;
  justify-content:center;
  grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
}
.offer-list__horizantal-header {
  display: grid;
  grid-template-columns: repeat(6,1fr);
  background-color: $bg-dark-500;
  color:$text-color-50;
  font-weight: 500;
  opacity: 0.5;
}
.offer-list__horizantal-body {
  display: grid;
  grid-template-columns: repeat(6,1fr);
  background-color: $bg-dark-600;
  color:$text-color-50;
  font-weight: 700;
  border-bottom: 1px solid $white-transparent-11;
  gap: 15px;

}
.footer__wrapper {
  border-top: solid 1px $bd-card-color;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 20px;
  height: 76px;
  margin-bottom: 0;
}
@media (max-width: 768px) {
  .offer-list__card-container {
      grid-template-columns: repeat(1,1fr);
  }

}
.offer-title {
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}


</style>
