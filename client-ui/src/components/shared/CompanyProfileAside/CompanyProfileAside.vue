<template>
  <div
    class="p-5 w-100 compoany-profile-aside__container d-flex flex-column gap-5"
  >
    <div class="compoany-profile-aside__communities">
      <div class="p-3 mb-3 compoany-profile-aside__community">
        <inline-svg src="/svg/people.svg"></inline-svg>
        <span class="ms-2">{{ $t("entrepriseProfile.aside.community") }}</span>
      </div>
      <div class="compoany-profile-aside__communities-list">
        <div
          v-for="userCommunity in usersoncommunityList"
          :key="userCommunity.id"
          class="m-3 mt-0"
        >
          <CommunityCard
            :userCommunity="userCommunity"
            :isSolo="false"
            :isCandidate="true"
          />
        </div>
      </div>
    </div>
    <div class="compoany-profile-aside__communities">
      <div class="p-3 mb-3 compoany-profile-aside__community">
        <inline-svg src="/svg/entrepriseAside/message.svg"></inline-svg>
        <span class="ms-2">{{ $t("entrepriseProfile.aside.exchange") }}</span>
      </div>
      <div class="compoany-profile-aside__communities-list">
        <div
          v-for="(community, index) in [1, 2, 3, 5, 6]"
          :key="index"
          class="m-3 mt-0"
        >
          <ExchangeCard />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import CommunityCard from "@/components/cart/CommunityCard.vue";
import ExchangeCard from "@/components/cart/ExchangeCard.vue";
import { storeToRefs } from "pinia";
import { useUsersOnCommunityStore } from "@/store/useUsersOnCommunityModule";
import { useAuthStore } from "@/store/useAuth";
import { useEntrepriseStore } from "@/store/useEntrepriseModule";
import { t } from "@/core/i18n/translate";
export default defineComponent({
  setup() {
    const { usersoncommunityList } = storeToRefs(useUsersOnCommunityStore());
    const { fetchUsersOnCommunities } = useUsersOnCommunityStore();
    const authStore = useAuthStore();
    console.log(authStore.currentUser.id, "authStore.currentUser.id");
    onMounted(async () => {
      await fetchUsersOnCommunities({
        userId: authStore.currentUser.id,
        pagination: {
          skip: 0,
          take: 4,
        },
      });
    });
    const { entreprise } = storeToRefs(useEntrepriseStore());
    return { entreprise, usersoncommunityList };
  },
  components: { CommunityCard, ExchangeCard },
});
</script>
<style scoped lang="scss">
.compoany-profile-aside__ {
  &container {
    background: $bg-dark-700;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 5px;
  }
  &community {
    background: $bg-dark-600;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px 10px 0px 0px;
    color: $info-300;
  }
  &communities {
    background: #17181c;
    border-radius: 10px;
  }
  &communities-list {
    height: 260px;
    overflow: scroll;
  }
}
</style>

function useUsersOnCommunityStore(): any { throw new Error('Function not
implemented.') }