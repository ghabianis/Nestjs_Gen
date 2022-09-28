<template>
    <div class="ExchangeCard d-flex flex-column gap-5 rounded p-5">
        <h6>{{ExchangeSpaceData.title}}</h6>

        <div class="job-section d-flex flex-row gap-2 align-items-center">
            <el-icon :size="20"><Timer /></el-icon>
            <h6 class="openJobs mb-0 text-small--regular">{{ExchangeSpaceData.date}}. {{ExchangeSpaceData.hourStart}} - {{ExchangeSpaceData.hourEnd}}</h6>
        </div>

        <div class="d-flex justify-content-between">
           <ul class="usersList">
            <li v-for="user in ExchangeSpaceData.attendees.slice(0, 5)" >
                <img class="userImg" v-bind:src="user.img" alt="">
            </li>

            <span>+{{ExchangeSpaceData.attendees.length}}</span>
           </ul>
            <button 
                v-bind:class="{'attend-btn': !ExchangeSpaceData.isAttend, 'attended-btn': ExchangeSpaceData.isAttend}"
                v-on:click ="ExchangeSpaceData.isAttend = !ExchangeSpaceData.isAttend"
                class=" d-flex align-items-center gap-1 text-small--semiBold">
                <div class="d-flex align-items-center gap-1" v-if="ExchangeSpaceData.isAttend"><el-icon><Select /></el-icon>Attended </div> 
                <div class="d-flex align-items-center gap-1" v-else><el-icon><ChatSquare /></el-icon> Attend</div>
            </button>
        </div>
    </div>
</template>

<script  lang="ts">

    import { defineComponent, ref } from "vue";
    export default defineComponent({
        name: "companyCard",
        components: {},
        props: {
            data: {
                required: true,
                type: String,
            },
        },
        setup(_props) {

            const ExchangeSpaceData = ref({
            title: "Daily Design Meeting",
            date: "25 JUIN 2022",
            hourStart: "9pm",
            hourEnd: "10pm",
            attendees: [{"uid":"1", "name":'Slah', "img":"/jpg/userImage/1.jpg"}, {"uid":"1", "name":'Slah', "img":"/jpg/userImage/2.jpg"}, {"uid":"1", "name":'Slah', "img":"/jpg/userImage/1653050860799.jpg"}, {"uid":"1", "name":'Slah', "img":"/jpg/userImage/1.jpg"}, {"uid":"1", "name":'Slah', "img":"/jpg/userImage/3.jpg"}, {"uid":"1", "name":'Slah', "img":"/jpg/userImage/2.jpg"}],
            isAttend: false,
            });

            const isAttendedToggle =() =>{
                ExchangeSpaceData.value.isAttend = !ExchangeSpaceData.value.isAttend;
                console.log(ExchangeSpaceData.value.isAttend);
            }

            return {
                ExchangeSpaceData,
                isAttendedToggle
            };
        },

        methods: {}

    });

</script>

<style scoped lang="scss">
    .ExchangeCard{
        background-color: $bg-dark-600;
    }
    .attend-btn{
        padding: 6px 10px;
        border: 1px solid #40A46E;
        border-radius: 4px;
        background-color: $bg-dark-600;
        color: #40A46E;
    }
    .attend-btn:hover{
        background-color: hsla(148, 44%, 45%, 0.157);
    }
    .attended-btn{
        padding: 6px 10px;
        background-color: $success-500;
        border-radius: 4px;
        color: $text-color-250;  
        border: 1px solid $success-500;
    }

    ///////////////
    
    .usersList{
    display: flex;
    align-items: center;
    list-style-type: none;
    line-height: 0;

    }
    .userImg{
        size: 30px;
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 100%;
        border: 2px solid #1C213D;
        margin-left: -12px;
    }
    ul{
        padding-left: 14px;
        margin: 0px;
    }
    
    /////////
</style>