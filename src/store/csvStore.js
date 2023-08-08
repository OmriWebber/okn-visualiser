// csvStore.js

import { defineStore } from 'pinia';

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    csvData: []
  }),
  actions: {
    setCsvData(data) {
      this.csvData = data;
    }
  }
});