<template>
    <el-card shadow="never" class="card w-100 mt-5 event-list__container" :body-style="{padding:'0'}">
      <div class="header__wrapper p-9">
        <div class="text-color">
          {{ $t("entityList.pagination.display") }}
          {{ pagination.total._count?._all }}
          {{ $t("entityList.pagination.items") }}
        </div>
        <div class="d-flex flex-column flex-sm-row align-items-center">
          <Pagination
            :itemsPerPage="pagination.take"
            :set-items-per-page="setItemsPerPage"
            :page="Math.floor(pagination.skip / pagination.take) + 1"
            :current-page-change="currentPageChange"
            :total="pagination.total._count?._all"
            :pages-array="[3, 6, 9, 12]"
          />
        </div>
      </div>
      <div class="py-6 px-9  justify-content-center gap-5 event-list__card-container">
        <div v-for="event in eventList"  :key="event.id" >
            <EventCard :event="event"  @edit="handleEdit"/>
        </div>
      </div>  

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
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { storeToRefs } from "pinia";
import { useEventStore } from "@/store/useEventModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import EventFormVue from "@/components/forms/EventForm.vue";
import EventCard from "@/components/cart/EventCard.vue";
import { setModal } from "@/core/helpers/config";

const ConfirmModal = defineAsyncComponent(
  () => import("@/components/modals/ConfirmModal.vue")
);

export default defineComponent({
  name: "eventList",
  components: { Pagination, ConfirmModal, EventFormVue, EventCard },
  setup() {
    const entityPluralName = "events";
    const fieldsName = ref([
      "location",
      "file",
      "link",
      "startDate",
      "publication",
    ]);
    const { eventList, pagination, isLoading } = storeToRefs(useEventStore());
    const { fetchEvents, getEventById, resetEvent } = useEventStore();
    const updatedEvent = ref('')
    const setItemsPerPage = async (event: any) => {
      await fetchEvents({
        skip: 0,
        take: parseInt(event.target.value),
      });
    };
    const currentPageChange = async (val: number) => {
      await fetchEvents({
        skip: (val - 1) * pagination.value.take,
        take: pagination.value.take,
      });
    };
    onMounted(async () => {
      setCurrentPageBreadcrumbs(entityPluralName, []);
      await fetchEvents({
        skip: 0,
        take: 3,
      });
    });
    const handleEdit = async (eventId : string) => {
      await getEventById(eventId)
       setModal("eventEdit" , { id : eventId})
    }
  
    return {
      pagination,
      setItemsPerPage,
      currentPageChange,
      eventList,
      updatedEvent,
      handleEdit,
      resetEvent
    };
  },
});
</script>

<style scoped lang="scss">
.event-list__container{
  box-shadow: 0px 0px 2px $shadow-card-color;
  border-radius: 10px;
}

.header__wrapper {
  border-bottom: solid 1px $bd-card-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
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
.event-list__card-container {
  display: grid;
  grid-template-columns : repeat(auto-fill,minmax(350px,1fr));
  @media (max-width: 768px) {
      grid-template-columns: repeat(1,1fr);
  }
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
</style>
<style lang="scss">

div[id^='el-popper-container-'] {
  z-index:9999!important;
}

</style>