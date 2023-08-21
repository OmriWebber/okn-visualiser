// store/index.js
import { defineStore } from 'pinia';

export const useVisualStore = defineStore({
  id: 'visual',

  state: () => ({
    data: [],
    focusedPoint: {x: 0, y: 0},
  }),

  actions: {
    setData(data) {
      this.data = data;
    },
    setFocusedPoint(point) {
      this.focusedPoint = point;
    },
    clearData() {
      this.data = [];
      this.focusedPoint = {x: 0, y: 0};
    }
  },
  getters: {
    getFocusedPoint() {
      return this.focusedPoint;
    },
    getData() {
      return this.data;
    }
  }
});

export const useManipStore = defineStore({
  id: 'manip',

  state: () => ({
    data: [],
    focusedPoint: {x: 0, y: 0},
  }),

  actions: {
    setData(data) {
      this.data = data;
    },
    setFocusedPoint(point) {
      this.focusedPoint = point;
    },
    clearData() {
      this.data = [];
      this.focusedPoint = {x: 0, y: 0};
    }
  },
  getters: {
    getFocusedPoint() {
      return this.focusedPoint;
    },
    getData() {
      return this.data;
    }
  }
});