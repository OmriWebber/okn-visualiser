import { defineStore } from 'pinia';

export const useManipStore = defineStore({
    id: 'manip',
  
    state: () => ({
      data: [],
      originalData: [],
      defaultConfig: {
        minYValue: 0,
        maxYValue: 0,
        Amplitude: 0,
        Ramping: 0,
      },
      focusedPoint: {x: 0, y: 0},
    }),
  
    actions: {
        setData(data) {
          this.data = data;
          if (this.originalData.length === 0) {
            // Save original data
            this.originalData = data;

            // Default Config Values
            this.defaultConfig.minYValue = Math.min(...data.map(item => item.x));
            this.defaultConfig.maxYValue = Math.max(...data.map(item => item.x));
            this.defaultConfig.Amplitude = 20;
            this.defaultConfig.Ramping = 0.05;

            console.log(this.defaultConfig)
          }
        },
        setFocusedPoint(point) {
          this.focusedPoint = point;
        },
        setDefaultConfig(config) {
          this.defaultConfig = config;
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
      },
      getDefaultConfig() {
        return this.defaultConfig;
      }
    }
  });