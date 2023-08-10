// store/csvStore.js
import { defineStore } from 'pinia';

export const useChartStore = defineStore({
  id: 'chart',

  state: () => ({
    data: [],
    focusedPoint: null,
  }),

  actions: {
    setData(data) {
      this.data = data;
    },
    setFocusedPoint(point) {
      this.focusedPoint = point;

    }
  }
});