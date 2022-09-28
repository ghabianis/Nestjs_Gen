<template>
    <div class="d-flex gap-5">
        <div class="entreprise-profile__header">
            <CompanyProfileHeader/>
        </div>
        <div class="entreprise-profile__aside">
            <CompanyProfileAside/>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import CompanyProfileHeader from '@/components/shared/CompanyProfilHeader/CompanyProfileHeader.vue'
import CompanyProfileAside from '@/components/shared/CompanyProfileAside/CompanyProfileAside.vue'
import { useRoute } from 'vue-router'
import { useEntrepriseStore } from '@/store/useEntrepriseModule'
import { storeToRefs } from 'pinia'
export default defineComponent({
    components:{CompanyProfileHeader , CompanyProfileAside},
    setup() {
        const route = useRoute()
        const id = route.params.id as string
        const {getEntrepriseById} = useEntrepriseStore()
        onMounted(async ()=>{
            await getEntrepriseById(id)
        })
    },
})
</script>
<style lang="scss" scoped>
.entreprise-profile__header {
    width:64%;
}
.entreprise-profile__aside {
      width: 35%;
  @media screen and (max-width: 820px) {
    display:none
  }
}
@media (max-width:1000px){
    .entreprise-profile__aside {
        display:none;
    }
    .entreprise-profile__header{
        width:100%;
    }
}
</style>
