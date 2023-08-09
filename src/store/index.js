// store/csvStore.js
import { defineStore } from 'pinia';

export const useChartStore = defineStore({
  id: 'chart',

  state: () => ({
    data: []
  }),

  actions: {
    setData(data) {
      this.data = data;
    }
  }
});