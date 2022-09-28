import {
  CandidateUpdateInput,
  CandidateCreateInput,
  Candidate,
  Course,
  Experience,
  ContractsOnCandidate,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
import { Components } from "@tekab-dev-team/storybook-devfactory";

export const useCandidateStore = defineStore("candidate-store", {
  state: () => {
    return {
      candidateList: [] as Array<Candidate>,
      isLoading: false,
      error: null as Object | any,
      candidate: {
        id:null,
        wantedPost: "",
        experiences: [],
        courses: [],
        contractsOnCandidates: [],
        languages: "",
        maxSalary: 2000,
        minSalary: 0,
        personalCv: "",
        user: {
          usersOnCommunity: [],
          firstName: "",
          city: "",
          kmRadius: "",
          lastName: "",
          phone: "",
          usersSkills: [],
          gender: "",
          email: "",
          sex: "",
          photo: "/svg/inscription/pdp.svg",
        },
      },
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async setActivity(payload: Candidate) {
      console.log("setActivity");
      try {
        this.candidate.user = payload.user = {
          ...this.candidate.user,
          ...payload.user,
        };
        this.candidate = { ...this.candidate, ...payload };

        const { data } = await service.api.authControllerCreateUser(
          this.candidate.user.id,
          this.candidate,
          this.candidate.id,
          {
            format: "json",
          }
        );
        payload.id = this.candidate.id;
      } catch (err: any) {
        console.log("code error: ", err);
        this.error = err.error;
        console.log("code error: " + this.error);
      }
      return { error: this.error };
    },

    async getContractByName(name: string) {
      return await service.api.contractControllerFindMany(
        {
          "where[name][equals]":`${name}`
        },
      );
    },

    async setCandidate(payload: CandidateCreateInput) {
      this.isLoading = true;
      try {
        this.candidate.user = payload.user = {
          ...this.candidate.user,
          ...payload.user,
        };
        this.candidate = { ...this.candidate, ...payload };
        const { data } = await service.api.authControllerCreateUser(
          this.candidate.user.id,
          payload,
          this.candidate.id,{format:"json"}
        );
        console.log(data);
        this.candidate.id = data.candidate.id;
        this.error = null;
      } catch (err: any) {
        console.log("code error: ", err);
        this.error = err.error;
        console.log("code error: " + this.error);
        Components.ElMessage({
          message: this.error?.msg || "contactez admin",
          type: "error",
        });
      } finally {
        this.isLoading = false;
      }
      return { error: this.error };
    },

    async createCandidate(payload: CandidateCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.candidateControllerCreate(payload);
        this.candidateList = [...this.candidateList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchCandidates(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.candidateControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.candidateList = data.paginatedResult;

        this.candidateList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object" && value) {
              element[key] = Object.values(value);
            }
          }
        });
        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.skip,
          take: payload.take,
        };
        this.error = null;
      } catch (err: any) {
        this.candidateList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },

    async editCandidate(payload: { data: CandidateUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.candidateControllerUpdate(
          payload.id,
          payload.data
        );
        this.candidateList = this.candidateList.map((item) =>
          item.id === payload.id ? { ...item, ...data } : item
        );
        this.error = null;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },

    async getCandidateById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.candidateControllerFindOne(payload);
        this.candidate = data;
        this.error = null;
      } catch (err: any) {
        this.candidate = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },

    async getCandidateByIdUser(id: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.candidateControllerFindMany(
          {
            "where[user][id]": id,
            skip: 0,
            take: 1,
          },
          {
            format: "json",
          }
        );
        this.candidate = data?.paginatedResult?.[0];
        if(data?.paginatedResult?.[0].contractsOnCandidates)
        {
        const contracts: any = []
        data?.paginatedResult?.[0].contractsOnCandidates.forEach(element=>{
          contracts.push(element?.contract?.id)
        })
        this.candidate.contractsOnCandidates = contracts
      }
        console.log(this.candidate);
      } catch (err: any) {
        this.error = err.error;
      } finally {
      }
    },

    async deleteCandidate(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.candidateControllerDelete(payload);
        this.candidateList = this.candidateList.filter(
          (candidate) => candidate.id !== data.id
        );
        this.pagination.total--;
        this.isLoading = false;
        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },

    async setContractOnCandidate(payload: ContractsOnCandidate) {
      //console.log("course", payload);
      //payload.candidateId.id = this.candidate.id;
      //console.log("course", payload);
      try {
        const { data, error } =
          await service.api.contractsOnCandidateControllerCreate(payload);
        console.log("setContractOnCandidate data", data);
        if (this.candidate && this.candidate.ContractsOnCandidates) {
          this.candidate.ContractsOnCandidates.push(data);
        } else if (this.candidate && this.candidate !== null) {
          this.candidate.ContractsOnCandidates = [data];
        } else {
          this.candidate = {
            ContractsOnCandidates: [data],
          };
        }
        console.log(this.candidate);
        this.error = error;
      } catch (err: any) {
        console.error("Error Update  contract", err.error);
        this.error = err.error;
      }
      return { error: this.error };
    },

    async setCourse(payload: Course) {
      //console.log("course", payload);
      payload.candidateId = this.candidate.id;
      //console.log("course", payload);
      try {
        const { data, error } = await service.api.courseControllerCreate(
          payload
        );
        //console.log("setCourse data", data);
        if (this.candidate && this.candidate.courses) {
          this.candidate.courses.push(data);
        } else if (this.candidate && this.candidate !== null) {
          this.candidate.courses = [data];
        } else {
          this.candidate = {
            courses: [data],
          };
        }
        console.log(this.candidate);
        this.error = error;
      } catch (err: any) {
        console.error("Error Update  course", err.error);
        this.error = err.error;
      }
      return { error: this.error };
    },

    async updateCourse(payload: Course, index: number) {
      //.log("update course payload ", payload);
      try {
        const { data, error } = await service.api.courseControllerUpdate(
          this.candidate.courses[index].id,
          payload
        );
        //console.log("updateCourse data", data);
        this.candidate.courses[index] = data;
        this.error = error;
      } catch (err: any) {
        console.error("Error Update  course", err.error);
        this.error = err.error;
      }
      return { error: this.error };
    },

    async deleteCourse(index: number) {
      try {
        const error = await service.api.courseControllerDelete(
          this.candidate.courses[index].id
        );
        this.candidate.courses.splice(index, 1);
        this.error = error;
      } catch (err: any) {
        console.error("Error Update  course", err.error);
        this.error = err.error;
      }
      return { error: this.error };
    },

    async setExperience(payload: Experience) {
      payload.candidateId = this.candidate.id;
      try {
        const { data, error } = await service.api.experienceControllerCreate(
          payload
        );
        if (this.candidate && this.candidate.experiences) {
          this.candidate.experiences.push(data);
        } else if (this.candidate && this.candidate !== null) {
          this.candidate.experiences = [data];
        } else {
          this.candidate = {
            experiences: [data],
          };
        }
        console.log(this.candidate);
        this.error = error;
      } catch (err: any) {
        console.error("Error Update experience", err.error);
        this.error = err.error;
      }
      return { error: this.error };
    },

    async updateExperience(payload: Experience, index: number) {
      try {
        const { data, error } = await service.api.experienceControllerUpdate(
          this.candidate.experiences[index].id,
          payload
        );
        this.candidate.experiences[index] = data;
        this.error = error;
      } catch (err: any) {
        console.error("Error Update  experience", err.error);
        this.error = err.error;
      }
      return { error: this.error };
    },

    async deleteExperience(index: number) {
      try {
        const error = await service.api.experienceControllerDelete(
          this.candidate.experiences[index].id
        );
        this.candidate.experiences.splice(index, 1);
        this.error = error;
      } catch (err: any) {
        console.error("Error Update  experience", err.error);
        this.error = err.error;
      }
      return { error: this.error };
    },

    async setExperiencesCourses() {
      /*       console.log({
        courses: this.candidate.courses,
        experiences: this.candidate.experiences,
      });
      this.isLoading = true;
      try {
        const { data, error } = await service.api.candidateControllerUpdate(
          this.candidate.id,
          {
            courses: this.candidate.courses,
            experiences: this.candidate.experiences,
          },
          {
            format: "json",
          }
        );
        console.log(data, error);

        this.error = null;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      } */
      return { error: this.error };
    },
  },
});
