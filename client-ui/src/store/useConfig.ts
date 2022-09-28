/* static file*/
import objectPath from "object-path";
import { defineStore } from "pinia";
import layoutConfig from "@/core/config/DefaultLayoutConfig";

import merge from "deepmerge";

import LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

interface StoreInfo {
  config: LayoutConfigTypes;
  initial: LayoutConfigTypes;
}
export interface ModalOption {
  closeable?: boolean;
  isClose?: boolean;
}

interface Modal {
  type: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  payload: any;
  options?: ModalOption;
}

interface ModalInfo {
  modalState: Modal;
}

interface Breadcrumb {
  title: string;
  pageBreadcrumbPath: Array<string>;
  icon: string;
}
interface Toolbar {
  title: string;
  subtitle?: string;
  image?: string;
}

interface StoreInfo {
  breadcrumbs: Breadcrumb;
}

export const useConfigStore = defineStore("config-module", {
  state: () => ({
    config: layoutConfig,
    initial: layoutConfig,
    modalState: { type: "", payload: {}, options: {} },
    breadcrumbs: {} as Breadcrumb,
    toolbars: {} as Toolbar,
  }),
  getters: {
    /**
     * Get config from layout config
     * @returns {function(path, defaultValue): *}
     */
    layoutConfig: (state) => (path: any, defaultValue: any) =>
      objectPath.get(state.config, path, defaultValue),
    getModalState: (state): Modal => {
      return state.modalState;
    },
    /**
     * Get breadcrumb object for current page
     * @returns object
     */
    getBreadcrumbs: (state): Breadcrumb => {
      return state.breadcrumbs;
    },

    /**
     * Get Toolbar object for current page
     * @returns object
     */
    getToolbars: (state): Toolbar => {
      return state.toolbars;
    },

    /**
     * Get breadcrumb array for current page
     * @returns object
     */
    pageBreadcrumbPath: (state): Array<string> => {
      return state.breadcrumbs.pageBreadcrumbPath;
    },

    /**
     * Get current page title
     * @returns string
     */
    pageTitle: (state): string => {
      return state.breadcrumbs.title || state.toolbars.title;
    },
    /**
     * Get current page subtitle
     * @returns string
     */
    pageSubTitle: (state): string => {
      return state.toolbars.subtitle!;
    },
    /**
     * Get current page toolbar icon
     * @returns string
     */
    icon: (state): string => {
      return state.breadcrumbs.icon;
    },
    /**
     * Get current page toolbar image
     * @returns string
     */
    image: (state): string => {
      return state.toolbars.image!;
    },
  },
  actions: {
    setLayoutConfig(payload: any): void {
      this.config = {...this.config,...payload};
    },
    resetLayoutConfig() {
      this.config = Object.assign({}, this.initial);
    },
    overrideLayoutConfig(): void {
      this.config = this.initial = Object.assign(
        {},
        this.initial,
        JSON.parse(window.localStorage.getItem("config") || "{}")
      );
    },
    overridePageLayoutConfig(payload: any): void {
      this.config = merge(this.config, payload);
    },

    fetchModal(payload: any) {
      this.modalState = payload;
    },
    setBreadcrumbs(payload: any) {
      this.toolbars = {};
      this.breadcrumbs = {...this.breadcrumbs,...payload};
    },
    setToolbars(payload: any) {
      this.breadcrumbs = {}
      this.toolbars = payload;
    },
  },
});
