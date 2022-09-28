<template>
  <div class="mx-auto mt-5 w-100">
    <el-card shadow="never" class="list-card card">
      <!-- begin card header -->
      <template #header>
        <div class="row m-5 header-top">
          <div>
            <el-button
              type="primary"
              size="large"
              :class="{ 'is-active': displayAllUsers }"
              @click="getUsers()"
              >{{ $t("talentManagement.header.button.allUsers") }}</el-button
            >
            <el-button
              type="primary"
              size="large"
              :class="{ 'is-active': displayMyAudience }"
              @click="getAudience()"
              >{{ $t("talentManagement.header.button.myAudience") }}</el-button
            >
          </div>
        </div>
        <div class="row mx-5">
          <div class="header__wrapper">
            <div class="col-5 d-flex align-items-center">
              <div class="toolbar-input__container">
                <inline-svg src="/svg/icons/search.svg"></inline-svg>
                <input
                  type="search"
                  v-model="search"
                  :placeholder="
                    $t('talentManagement.header.search.placeholder')
                  "
                  class="toolbar-input"
                />
              </div>
            </div>
            <div class="d-flex flex-column flex-sm-row align-items-center">
              <Pagination
                :itemsPerPage="pagination.take"
                :set-items-per-page="setItemsPerPage"
                :page="Math.floor(pagination.skip / pagination.take) + 1"
                :current-page-change="currentPageChange"
                :total="pagination.total?._count?._all"
                :pages-array="[3, 6, 9, 12]"
              />

              <div class="ms-9">
                <DisplayMode
                  :displayVertical="displayVertical"
                  @vertical="displayVertical = true"
                  @horizantal="displayVertical = false"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- end card header -->
      <!-- begin card body-->
      <div class="mt-6 mb-6">
        <!-- begin card body ALL USERS -->
        <div class="talent-list__card-container" v-if="displayVertical && displayAllUsers">
        <template          
          v-for="user in filteredList"
          :key="user.id"
        >
          <talentCard
            :userName="user.username"
            :email="user.email"
            :personalCv="user.personalCv"
            :mediaLink="user.mediaLink"
            :wantedPost="user.wantedPost"
            :shares="user.share"
            :comments="user.comment"
            :likes="user.like"
            @displayDrawer="displayDrawer(user.userId)"
          ></talentCard>
        </template>
        </div>
        <el-table
          v-if="displayAllUsers && !displayVertical"
          :data="filteredList"
          :row-style="{ background: '$primary' }"
        >
          <el-table-column
            v-for="fieldName in fieldsName"
            :key="fieldName"
            :prop="fieldName"
            :label="fieldName.charAt(0).toUpperCase() + fieldName.slice(1)"
          />
        </el-table>
        
        <!-- end card body ALL USERS -->

        <!-- begin card body MY AUDIENCE -->
        <div class="talent-list__card-container" v-if="displayMyAudience && displayVertical">
        
          <template
          v-for="user in filteredAudienceList"
          :key="user.id"
        >
          <talentCard
            isFollower
            :mediaLinkVisible=true
            :userName="user.username"
            :email="user.email"
            :shares="user.share"
            :comments="user.comment"
            :likes="user.like"
            :personalCv="user.personalCv"
            :mediaLink="user.mediaLink"
            :wantedPost="user.wantedPost"            
            @displayDrawer="displayDrawer(user.userId)"
          ></talentCard>
        </template>
        </div>
        <template v-if="displayMyAudience && !displayVertical">
          <el-table
          :data="filteredAudienceList"
          :row-style="{ background: '$primary' }"
        >
          <el-table-column
            v-for="fieldName in fieldsName"
            :key="fieldName"
            :prop="fieldName"
            :label="fieldName.charAt(0).toUpperCase() + fieldName.slice(1)"
          />
        </el-table>
        </template>
        <!-- end card body MY AUDIENCE -->
      </div>
      <!-- end card body-->
    </el-card>
  <profileDrawer 
    :firstName="user?.firstName"
    :lastName="user?.lastName"
    :wantedPost="user?.candidate?.wantedPost"
    :address="user?.address"
    :photo="user?.photo"
    bio="description ..."
    :personalCv="user?.candidate?.personalCv"
    :mediaLink="user?.candidate?.mediaLink"
    :showDrawer="drawer" 
    @close="drawer=false" 
    :destroyOnClose="true"
    >
  </profileDrawer>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
} from "vue";
import { setCurrentPageToolbar } from "@/core/helpers/config";
import { useUserStore } from "@/store/useUserModule";
import { storeToRefs } from "pinia";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import DisplayMode from "@/components/shared/DisplayMode/DisplayMode.vue";
import talentCard from "@/components/management/talentCard.vue";
import profileDrawer from "@/components/management/profileDrawer.vue";
export default defineComponent({
  name: "Management",
  components: { Pagination, DisplayMode, talentCard, profileDrawer },
  setup() {
    const { userList, user , pagination} = storeToRefs(useUserStore());
    const { fetchUsers, getUserById, fetchAudience } = useUserStore();
    const displayVertical = ref(true);
    const displayMyAudience = ref(false);
    const displayAllUsers = ref(true);
    const search = ref("");
    const drawer = ref(false);
    const fieldsName = ref(["email", "username", "wantedPost", "like", "comment", "share"]);

    onMounted(async () => {
      setCurrentPageToolbar(
        "Talent Management",
        undefined,
        "/png/talentManagement/_likes.png"
      );
      await fetchUsers({
        skip: 0,
        take: 4,
      });
    });
    const setItemsPerPage = async (event: any) => {
      await fetchUsers({
        skip: 0,
        take: parseInt(event.target.value),
      });
    };
    const currentPageChange = async (val: number) => {
      await fetchUsers({
        skip: (val - 1) * pagination.value.take,
        take: pagination.value.take,
      });
    };

    const filteredList = computed(() => {
      if (search.value) {
        return userList.value.filter((user) => {
          return user?.tags
            ?.toLowerCase()
            .includes(search?.value?.toLowerCase());
        });
      } else {
        return userList.value;
      }
    });

    const getAudience = async() => {
      displayMyAudience.value = true;
       displayAllUsers.value = !displayMyAudience.value;
      await fetchAudience({
        skip: 0,
        take: 4,
      })
    }

    const getUsers = async() => {
      displayAllUsers.value = true;
       displayMyAudience.value = !displayAllUsers.value;
      await fetchUsers({
        skip: 0,
        take: 4,
      })
    }

    const filteredAudienceList = computed(() => {
      if (search.value) {
        return userList.value.filter((user) => {
          return user?.tags
            ?.toLowerCase()
            .includes(search?.value?.toLowerCase());
        });
      } else {
        return userList.value;
      }
    });
    const displayDrawer = async (id:string) => {
      
      drawer.value = true;
      await getUserById(id)
      
    }

    return {
      currentPageChange,
      setItemsPerPage,
      pagination,
      displayVertical,
      displayMyAudience,
      displayAllUsers,
      search,
      filteredList,
      filteredAudienceList,
      fieldsName,
      drawer,
      getAudience,
      getUserById,
      user,
      displayDrawer,
      getUsers
    };
  },
});
</script>
<style scoped lang="scss">
.talent-list__card-container {
  display: grid;
  gap:25px;
  justify-content:center;
  grid-template-columns: minmax(320px, max-content) repeat(auto-fill, 320px);
}
@media (max-width: 1024px) {
  .talent-list__card-container {
      grid-template-columns: repeat(auto-fill, 320px);
  }
}
.list-card:deep(.el-card__body) {
  background: linear-gradient(
    125.1deg,
    rgba(255, 255, 255, 0.09) -3.96%,
    rgba(255, 255, 255, 0.07) 118.2%
  );
  box-shadow: inset 0px 5px 2px rgba(0, 0, 0, 0.04);
}
.list-card:deep(.el-card__header) {
  border-bottom: none;
}
.header__wrapper {
  display: flex;
  width: 100% !important;
  justify-content: space-between;
  height: 76px;

  div {
    font-size: 0.875rem;
  }
  @media screen and (max-width: 1024px,) {
    .toolbar-input__container{
      width: 90% !important;
    }
  }
  @media screen and (max-width: 768px,) {
    flex-direction: column;
    height: auto;
    row-gap: 10px;
    padding-block: 10px;
    justify-content: unset;
  }
    .toolbar-input__container{
      width: 100%;
    }
}
.toolbar-input {
  background: $bg-dark-500;
  border: none;
  border-radius: 8px;
  outline: none;
  color: $text-color-100;
  font-weight: 500px;
  height: 100%;
  width: 100%;
  font-weight: 500;
  font-size: 13px;
}
.toolbar-input__container {
  width: 100%;
  height: 42px;
  display: flex;
  background: $bg-dark-500;
  padding: 12px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
}

.header-top {
  :deep(.el-button) {
    color: $text-color-info-200;
    font-size: var(--el-font-size-medium);
    font-weight: 600;
    font-style: normal;
    font-family: "Poppins";
    border-color: transparent;
    background-color: transparent;
  }
  .el-button.is-active {
    color: $text-color-250;
    border-color: var(--el-color-primary);
    background-color: var(--el-color-primary);
    outline: none;
  }
}
:deep(.el-drawer){
  background-color: $bg-dark-700;
  color:white
}
</style>
