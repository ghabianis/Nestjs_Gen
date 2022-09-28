<template>
    <el-dialog
        v-model="editCourseVisible"
        title="Éditer une formation"
        width="340px"
        height="100vh"
        class="el-dialog"
        bgcolor="#181A20"        
      >
        <CourseModal @close="editCourseVisible = false"
                     :courseData="courseData"
                     :index="index"
                     :isEdit="true" />
    </el-dialog>

    <div class="formation">
        <div class="d-flex mt-20 pad-10">
            <div class="formation__image">
                <img src="/svg/inscription/formation.svg" />
            </div>
            <div>
                <div class="formation__header">
                    <h6 class="formation__header--h6">{{ courseData.title }}</h6>
                    <img
                        src="/svg/inscription/pen.svg"
                        style="cursor:pointer;"
                        @click="editCourseVisible = true"
                    />
                </div>
                <p
                    class="formation__description--p"
                >{{ courseData.centerName }}</p>
                <p
                    class="formation__description--p"
                >{{ courseData.country }} {{ courseData.startDate.slice(0, 10) }} - {{ courseData.endDate.slice(0, 10) }}</p>
                <p class="formation__description--p">{{ courseData.description }}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { t } from "@/core/i18n/translate";
import { ref, defineComponent, reactive } from "vue";
import CourseModal from "@/components/inscription/courseModal.vue";

let failMessage: string | null;

export default defineComponent({

    name: "activity",
    components: {
        CourseModal,
    },
    props: {
        courseData: { type: Object, default: false },
        index:{type: Number}
    },
    setup() {
        const createCourseVisible = ref(false);
        const editCourseVisible = ref(false);
        failMessage = t("messages.loginFailed");
        return {
            editCourseVisible,
            createCourseVisible
        };
    }
});
</script>
<style lang="scss" scoped>
@import "./Card.scss";
</style>
