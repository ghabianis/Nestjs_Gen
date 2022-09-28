<template>
  <div class="mx-auto mt-5 ms-4 me-4 p-abs  ">
    <el-card shadow="never" class="card b-radius-16">
      <div class="header__wrapper container">
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
            :pages-array="[5, 10, 15, 20]"
          />
        </div>
      </div>
      <!-- <el-table
        :data="candidateList"
        :row-style="{ background: '$primary' }"
        v-loading="isLoading"
      >
        <el-table-column :prop="'id'" :label="'id'">
          <template #default="scope">
            <router-link
              :to="`/${entityPluralName}/${candidateList[scope.$index].id}`"
              >{{ candidateList[scope.$index].id }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column
          v-for="fieldName in fieldsName"
          :key="fieldName"
          :prop="fieldName"
          :label="fieldName.charAt(0).toUpperCase() + fieldName.slice(1)"
        />
        

        <el-table-column prop="actions" align="right" width="50">
          <template #default="scope">
            <router-link
              :to="`/${entityPluralName}/edit/${
                candidateList[scope.$index].id
              }`"
              :underline="false"
              type="primary"
              class="me-3"
            >
              <el-button icon="Edit" circle plain link type="success" />
            </router-link>

            <el-button
              @click="
                () => handleOpenConfirmModal(candidateList[scope.$index]?.id)
              "
              icon="Delete"
              circle
              plain
              type="danger"
            />
            <ConfirmModal
              :title="$t('confirmModal.deleteTitle')"
              :isOpenModal="
                isOpenModal && modalId === candidateList[scope.$index].id
              "
              @close-confirm-modal="
                isOpenModal = true;
                modalId = null;
              "
              @approve-confirm-modal="
                () => handleRemoveEntity(candidateList[scope.$index]?.id)
              "
            >
              <span>{{ $t("confirmModal.deleteContent") }} </span>
            </ConfirmModal>
          </template>
        </el-table-column>
      </el-table> -->
     <div class="flex direction-coulum">
       <div class="flex gap mb-20">
        <div class="flex cart" >
          
            <div class="bg-img center-end">
              <div class="flex-end">
                
                <h2>Ktari Ayman</h2>
                <p >lorem  lorem  lorem  loremloremloremloremloremloremloremloremloremlorems                  </p>
              </div>
            </div >
            <div class="socials flex direction-coulum">
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
            </div>
      </div>
      <div class="flex cart m-auto" >
          
            <div class="bg-img center-end">
              <div class="flex-end">
                
                <h2>Ktari Ayman</h2>
                <p >lorem  lorem  lorem  loremloremloremloremloremloremloremloremloremlorems                  </p>
              </div>
            </div >
            <div class="socials flex direction-coulum">
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
            </div>
      </div>
      <div class="flex cart" >
          
            <div class="bg-img center-end">
              <div class="flex-end">
                
                <h2>Ktari Ayman</h2>
                <p >lorem  lorem  lorem  loremloremloremloremloremloremloremloremloremlorems                  </p>
              </div>
            </div >
            <div class="socials flex direction-coulum">
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
            </div>
      </div>
      </div>
       <div class="flex gap mb-20">
        <div class="flex cart" >
          
            <div class="bg-img center-end">
              <div class="flex-end">
                
                <h2>Ktari Ayman</h2>
                <p >lorem  lorem  lorem  loremloremloremloremloremloremloremloremloremlorems                  </p>
              </div>
            </div >
            <div class="socials flex direction-coulum">
              <div class="mini-box">
                <h4>vues</h4>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h4>J'aime</h4>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h4>Message</h4>
                <p>255</p>
              </div>
            </div>
      </div>
      <div class="flex cart m-auto" >
          
            <div class="bg-img center-end">
              <div class="flex-end">
                
                <h2>Ktari Ayman</h2>
                <p >lorem  lorem  lorem  loremloremloremloremloremloremloremloremloremlorems                  </p>
              </div>
            </div >
            <div class="socials flex direction-coulum">
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
            </div>
      </div>
      <div class="flex cart" >
          
            <div class="bg-img center-end">
              <div class="flex-end">
                
                <h2>Ktari Ayman</h2>
                <p >lorem  lorem  lorem  loremloremloremloremloremloremloremloremloremlorems                  </p>
              </div>
            </div >
            <div class="socials flex direction-coulum">
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <div class="mini-box">
                <h1>vues</h1>
                <p>255</p>
              </div>
              <p>25 Octobre 2021</p>
            </div>
      </div>
      </div>
     </div>
      
      
      <div class="footer__wrapper">
        <Pagination
          :itemsPerPage="pagination.take"
          :set-items-per-page="setItemsPerPage"
          :page="Math.floor(pagination.skip / pagination.take) + 1"
          :current-page-change="currentPageChange"
          :total="pagination.total._count?._all"
          :pages-array="[5, 10, 15, 20]"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import cartStory from "@comonents/cart/cartStory.vue"

import { defineComponent, onMounted, ref, defineAsyncComponent } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { storeToRefs } from "pinia";
import { useCandidateStore } from "@/store/useCandidateModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
const ConfirmModal = defineAsyncComponent(
  () => import("@/components/modals/ConfirmModal.vue")
);
export default defineComponent({
  name: "listStory",
  components: { Pagination, ConfirmModal },
  setup() {
    const entityPluralName = "candidates";
    const fieldsName = ref([
      "Story",
    
    
      
    
    ]);
    const isOpenModal = ref(false);
    const modalId = ref<string | null>(null);
    const { candidateList, pagination, isLoading } = storeToRefs(
      useCandidateStore()
    );
    const { fetchCandidates, deleteCandidate } = useCandidateStore();

    const handleRemoveEntity = async (id: string) => {
      await deleteCandidate(id);
    };
    const handleOpenConfirmModal = (id: string) => {
      isOpenModal.value = true;
      modalId.value = id;
    };
    const setItemsPerPage = async (event: any) => {
      await fetchCandidates({
        skip: 0,
        take: parseInt(event.target.value),
      });
    };
    const currentPageChange = async (val: number) => {
      await fetchCandidates({
        skip: (val - 1) * pagination.value.take,
        take: pagination.value.take,
      });
    };
    onMounted(async () => {
      setCurrentPageBreadcrumbs(entityPluralName, []);
      await fetchCandidates({
        skip: 0,
        take: 5,
      });
    });
    return {
      fieldsName,
      handleRemoveEntity,
      handleOpenConfirmModal,
      entityPluralName,
      candidateList,
      pagination,
      setItemsPerPage,
      currentPageChange,
      isOpenModal,
      modalId,
      isLoading,
    };
  },
});
</script>

<style scoped lang="scss">
.mb-20{
  margin: 20px;
}
.flex-end{
      display: flex;
    flex-direction: column;
    align-items: CE;
    JUSTIFY-CONTENT: FLEX-END;
    HEIGHT: INHERIT;
    /* flex: 1; */
}
.p-abs{
  position: absolute !important;
}
.b-radius-16{
      border-radius: 16px !important;
}
.gap{
  gap:20px;
}
.center-end{
  text-align: center;
  margin-bottom:0;
}
.cart{
  // margin-top: 1250px;;
  width: 395px;
  height: 381px;
  border:1px solid red;
  margin: 0;
  padding: 0;
  border-radius: 20px;
}
.direction-coulum {
  flex-direction: column;
}
.mini-box{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #444;
  width: 104px;;
  height: 75.43px;
  border-radius: 11.43px;
  margin-bottom: 28px;;
}
.socials {
  flex: 1;
  display: flex;
  gap: 10px;;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.header__wrapper {
  border-bottom: solid 1px $bd-card-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
  height: 76px;
  margin-top: 40px;
  width :1400px !important;;

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

.footer__wrapper {
  border-top: solid 1px $bd-card-color;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 20px;
  height: 76px;
  margin-bottom: 0;
}
.flex{
  display:flex;
}
.bg-img{
  background:url("/png/icons/story-pic.png") center center no-repeat  ;
  border:1px solid blue;
  margin:0;
  padding:0;
  border: none;
  width:50%;
  background-repeat: no-repeat;
  height: 100%;;
  position:relative;
  border-radius: 20px;
  background-color: rgba(17, 22, 51, 1);
}
.img{
  width: 50%;
  height: 100%;
}
</style>
