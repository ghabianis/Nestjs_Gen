<template>
    <el-dialog
        v-model="editExperienceVisible"
        title="Éditer une expérience"
        width="340px"
        height="100vh"
        class="el-dialog"
        bgcolor="#181A20 "
        @close="editExperienceVisible = false"
    >
        <ExperienceModal   @close="editExperienceVisible = false"
                            :experienceData="experienceData"
                            :index="index"
                            :isEdit="true"/>
    </el-dialog>
    <div class="formation">
        <div class="d-flex mt-20 pad-10">
            <div class="formation__image">
                <img src="/svg/inscription/formation.svg" />
            </div>
            <div>
                <div class="formation__header">
                    <h6 class="formation__header--h6">{{ experienceData.occupiedPosition }}</h6>
                    <img
                        src="/svg/inscription/pen.svg"
                        style="cursor:pointer;"
                        @click="editExperienceVisible = true"
                    />
                </div>
                <p class="formation__description--p">{{ experienceData.companyName }}</p>
                <p
                    class="formation__description--p"
                >{{ experienceData.country }} {{experienceData.startDate.slice(0, 10)}} - {{experienceData.endDate.slice(0, 10) }}</p>
                <p class="formation__description--p">{{ experienceData.description }}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { t } from "@/core/i18n/translate";
import { ref, defineComponent, reactive } from "vue";
import ExperienceModal from "@/components/inscription/experienceModal.vue";

let failMessage: string | null;

export default defineComponent({

    name: "activity",
    components: {
        ExperienceModal
    },
    props: {
        experienceData: { type: Object, default: false },
        index : {type : Number}
    },

    setup(props) {
        const createExperienceVisible = ref(false);
        const editExperienceVisible = ref(false);
        failMessage = t("messages.loginFailed");
        return {
            t,
            editExperienceVisible,
            createExperienceVisible
        };

    },
});
</script>
<style lang="scss" scoped>
@import "./Card.scss";
</style>
