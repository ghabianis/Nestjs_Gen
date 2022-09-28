<template>
    <div class="w-100 offer-path__container">
      <el-form-item>
        <label >{{ $t('offer.form.offerMode')}}</label>
         <el-select class="w-100" size="large" :placeholder="$t('offer.form.offerModePlaceholder')" 
                   v-model="publication.offer.offerMode">
            <el-option
              value="On-site"
              label="On-site"
            />                   
            <el-option
              value="Remote"
              label="Remote"
            />                                             
            <el-option
              value="Hybrid"
              label="Hybrid"
            />                 
         </el-select>
      </el-form-item>    
      <el-form-item class="col" prop="offer.place"><label >{{ $t('offer.form.place')}}</label> <el-input type="text" required size="large" :placeholder="$t('offer.form.placePlaceholder')" v-model="publication.offer.place"></el-input></el-form-item>
      <div class="row">
        <el-form-item class="col">
          <label >{{ $t('offer.form.experienceLevel')}}</label>
          <el-select class="w-100" size="large" :placeholder="$t('offer.form.experienceLevelPlaceholder')"
                    v-model="publication.offer.experienceLevel">
              <el-option
                value="Internship"
                label="Internship"
              />                 

              <el-option
                value="Entry level"
                label="Entry level"
              />                   
              <el-option
                value="Associate"
                label="Associate"
              />
              <el-option
                value="Mid-senior level"
                label="Mid-senior level"
              />                   
              <el-option
                value="Director"
                label="Director"
              />                   
              <el-option
                value="Executive"
                label="Executive"
              />                                      
          </el-select>
        </el-form-item>
        <el-form-item class="col" prop="offer.contract.id" required> 
          <label >{{ $t('offer.form.contract')}}</label>
          <el-select required v-if="publication && publication.offer.contract " style="width: 100%" size="large" :placeholder="$t('offer.form.contractPlaceholder')" v-model="publication.offer.contract.id">
            <el-option v-for="contract in contracts.data"
                  :value="contract.id"
                  selected
                  :key="contract.id"
                  :label="contract.name"
                >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item class="col" prop="offer.renumeration">
          <label for="">{{ $t('offer.form.renumeration')}}</label> <el-input required type="text" size="large" :placeholder="$t('offer.form.renumerationPlaceholder')" v-model="publication.offer.renumeration"></el-input>
        </el-form-item>
        <el-form-item class="col">
          <label for="">{{ $t('offer.form.candidateMaxNumber')}}</label> <el-input type="number" min="1" size="large" :placeholder="$t('offer.form.candidateMaxNumberPlaceholder')" v-model.number="publication.offer.candidateMaxNumber"></el-input>
        </el-form-item>
      </div>
  </div>
</template>

<script lang="ts">
import { usePublicationStore } from '@/store/usePublicationModule'
import { defineComponent , ref, onMounted,watch} from 'vue'
import { storeToRefs } from "pinia";
import { supabase } from '@/core/services/SupabaseClientService';
import { t } from "@/core/i18n/translate";

export default defineComponent({
  setup() {
    const {publication, error} = storeToRefs(usePublicationStore())
    const contracts = ref([])
    onMounted( async()=> {
      contracts.value = await supabase
      .from("Contract")
      .select();
      console.log(contracts.value); 
     if (contracts.value.error ) {
        console.log(contracts.value.error);
     }
   })


    return {publication , contracts}
  },
})
</script>

<style lang="scss" scoped>
.form-container {
  padding: 0 10px;
}
:deep(.el-input__inner) {
  background: #3B3D46;
}
  label{
      margin: 7px 0 5px 0;
    }
:deep(.el-input) {
  margin-bottom: 3px ;
}
</style>


