<template>
  <div class="mx-auto mt-5 ms-4 me-4">
    <el-card shadow="never" class="card">
      <div class="header__wrapper">
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
      <el-table
        :data="followentrepriseList"
        :row-style="{ background: '$primary' }"
        v-loading="isLoading"
      >
        <el-table-column :prop="'id'" :label="'id'">
          <template #default="scope">
            <router-link
              :to="`/${entityPluralName}/${
                followentrepriseList[scope.$index].id
              }`"
              >{{ followentrepriseList[scope.$index].id }}</router-link
            >
          </template>
        </el-table-column>
        <el-table-column
          v-for="fieldName in fieldsName"
          :key="fieldName"
          :prop="fieldName"
          :label="fieldName.charAt(0).toUpperCase() + fieldName.slice(1)"
        />
        <el-table-column prop="actions" align="right" width="150">
          <template #default="scope">
            <router-link
              :to="`/${entityPluralName}/edit/${
                followentrepriseList[scope.$index].id
              }`"
              :underline="false"
              type="primary"
              class="me-3"
            >
              <el-button icon="Edit" circle plain link type="success" />
            </router-link>

            <el-button
              @click="
                () =>
                  handleOpenConfirmModal(followentrepriseList[scope.$index]?.id)
              "
              icon="Delete"
              circle
              plain
              type="danger"
            />
            <ConfirmModal
              :title="$t('confirmModal.deleteTitle')"
              :isOpenModal="
                isOpenModal && modalId === followentrepriseList[scope.$index].id
              "
              @close-confirm-modal="
                isOpenModal = false;
                modalId = null;
              "
              @approve-confirm-modal="
                () => handleRemoveEntity(followentrepriseList[scope.$index]?.id)
              "
            >
              <span>{{ $t("confirmModal.deleteContent") }} </span>
            </ConfirmModal>
          </template>
        </el-table-column>
      </el-table>

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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { storeToRefs } from "pinia";
import { useFollowEntrepriseStore } from "@/store/useFollowEntrepriseModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
const ConfirmModal = defineAsyncComponent(
  () => import("@/components/modals/ConfirmModal.vue")
);
export default defineComponent({
  name: "followentrepriseList",
  components: { Pagination, ConfirmModal },
  setup() {
    const entityPluralName = "followentreprises";
    const fieldsName = ref(["entreprise", "candidate"]);
    const isOpenModal = ref(false);
    const modalId = ref<string | null>(null);
    const { followentrepriseList, pagination, isLoading } = storeToRefs(
      useFollowEntrepriseStore()
    );
    const {
      fetchFollowEntreprises,
      deleteFollowEntreprise,
    } = useFollowEntrepriseStore();

    const handleRemoveEntity = async (id: string) => {
      await deleteFollowEntreprise(id);
    };
    const handleOpenConfirmModal = (id: string) => {
      isOpenModal.value = true;
      modalId.value = id;
    };
    const setItemsPerPage = async (event: any) => {
      await fetchFollowEntreprises({
        skip: 0,
        take: parseInt(event.target.value),
      });
    };
    const currentPageChange = async (val: number) => {
      await fetchFollowEntreprises({
        skip: (val - 1) * pagination.value.take,
        take: pagination.value.take,
      });
    };
    onMounted(async () => {
      setCurrentPageBreadcrumbs(entityPluralName, []);
      await fetchFollowEntreprises({
        skip: 0,
        take: 3,
      });
    });
    return {
      fieldsName,
      handleRemoveEntity,
      handleOpenConfirmModal,
      entityPluralName,
      followentrepriseList,
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
