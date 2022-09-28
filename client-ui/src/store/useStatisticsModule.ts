  import { defineStore } from "pinia";
  import service from "@/service";
  
  export const useStatisticsStore = defineStore("statistics-store", {
    state: () => {
      return {
        statsList: {
          labels: [],
          datasets: [{
            data:[],
            color:[]
          }]
        } ,
        offerAppliesStatsList: {
          labels: [{
            labels:[],
            allLabels:[]
          }],
          datasets: [{
            data:[],
            color:[]
          }]
        } ,
        isLoading: false,
        error: null as Object | any,
      };
    },  
    actions: {

      async GetRetcheeDataStatesPerYear(
        startDate: string,
        mediaType: string,
      ) {
        this.isLoading = true;
        try {
          const { data } =
            await service.api.socialinterractionControllerGetRetcheeDataStatesPerYear(
              {
                "where[creation_year][equals]": new Date(startDate).getFullYear(),
                "where[publication_type][equals]": mediaType,
              }
            );
          this.statsList = data;
          console.log(data)
          this.error = null;
        } catch (err: any) {
          this.statsList = {};
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async GetRetcheeDataStatesPerMonth(
        startDate: string,
        dateType: string,
        mediaType: string,
      ) {
        this.isLoading = true;
        try {
          let endDate = calculateEndDate(dateType, new Date(startDate))
          const { data } =
            await service.api.socialinterractionControllerGetRetcheeDataStatesPerMonth(
              {
                "where[createdAt][gte]": new Date(startDate).toISOString(),
                "where[createdAt][lte]": endDate,
                "where[publication_type][equals]": mediaType,
              }
            );
          this.statsList = data;
          console.log(data)
          this.error = null;
        } catch (err: any) {
          this.statsList = {};
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async GetRetcheeDataStatesPerWeek(
        startDate: string,
        dateType: string,
        mediaType: string,
      ) {
        this.isLoading = true;
        try {
          let endDate = calculateEndDate(dateType, new Date(startDate))
          const { data } =
            await service.api.socialinterractionControllerGetRetcheeDataStatesPerWeek(
              {
                "where[createdAt][gte]": new Date(startDate).toISOString(),
                "where[createdAt][lte]": endDate,
                "where[publication_type][equals]": mediaType,
              }
            );
          this.statsList = data;
          console.log(data)
          this.error = null;
        } catch (err: any) {
          this.statsList = {};
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async GetRetcheeDataStatesPerDay(
        startDate: string,
        dateType: string,
        mediaType: string,
      ) {
        this.isLoading = true;
        try {
          let endDate = calculateEndDate(dateType, new Date(startDate))
          const { data } =
            await service.api.socialinterractionControllerGetRetcheeDataStatesPerDay(
              {
                "where[createdAt][gte]": new Date(startDate).toISOString(),
                "where[createdAt][lte]": endDate,
                "where[publication_type][equals]": mediaType,
              }
            );
          this.statsList = data;
          console.log(data)
          this.error = null;
        } catch (err: any) {
          this.statsList = {};
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async GetOfferFeedbackStatsPerYear(
        startDate: string,
      ) {
        this.isLoading = true;
        try {
          const { data } =
            await service.api.feedbackControllerGetOfferFeedbackStatsPerYear(
              {
                "where[creation_year][equals]": new Date(startDate).getFullYear(),
              }
            );
          this.offerAppliesStatsList = data;
          console.log(data)
          this.error = null;
        } catch (err: any) {
          this.offerAppliesStatsList = {};
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async GetOfferFeedbackStatsPerMonth(
        startDate: string,
        dateType: string,
      ) {
        this.isLoading = true;
        try {
          let endDate = calculateEndDate(dateType, new Date(startDate))
          const { data } =
            await service.api.feedbackControllerGetOfferFeedbackStatsPerMonth(
              {
                "where[createdAt][gte]": new Date(startDate).toISOString(),
                "where[createdAt][lte]": endDate,
              }
            );
          this.offerAppliesStatsList = data;
          console.log(data)
          this.error = null;
        } catch (err: any) {
          this.offerAppliesStatsList = {};
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async GetOfferFeedbackStatsPerWeek(
        startDate: string,
        dateType: string,
      ) {
        this.isLoading = true;
        try {
          let endDate = calculateEndDate(dateType, new Date(startDate))
          const { data } =
            await service.api.feedbackControllerGetOfferFeedbackStatsPerWeek(
              {
                "where[createdAt][gte]": new Date(startDate).toISOString(),
                "where[createdAt][lte]": endDate,
              }
            );
          this.offerAppliesStatsList = data;
          console.log(data)
          this.error = null;
        } catch (err: any) {
          this.offerAppliesStatsList = {};
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async GetOfferFeedbackStatsPerDay(
        startDate: string,
        dateType: string,
      ) {
        this.isLoading = true;
        try {
          let endDate = calculateEndDate(dateType, new Date(startDate))
          const { data } =
            await service.api.feedbackControllerGetOfferFeedbackStatsPerDay(
              {
                "where[createdAt][gte]": new Date(startDate).toISOString(),
                "where[createdAt][lte]": endDate,
              }
            );
          this.offerAppliesStatsList = data;
          console.log(data)
          this.error = null;
        } catch (err: any) {
          this.offerAppliesStatsList = {};
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
    },
  });
  function fixHourDifference (date: Date){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(date?.valueOf() - tzoffset)).toISOString();
  }
  function calculateEndDate(type: string, currentDate: Date) {
    let endDate = new Date()
    let res : string = ''
    switch (type) {
      case "year": {
        endDate = new Date(currentDate.getFullYear(), 11, 31);
        endDate = new Date(endDate?.setDate(endDate?.getDate() + 1))
        res = fixHourDifference(endDate)
        break;
      }
      case "month": {
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        endDate = new Date(endDate?.setDate(endDate?.getDate() + 1))
        res = fixHourDifference(endDate)
        break;
      }
      case "week": {
        endDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        res = endDate.toISOString()
        break;
      }
      case "day": {
        endDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        res = endDate.toISOString()
        break;
      }
      default: {
        console.log("type non valid");
        break;
      }
    }
    return res
  }
  
  