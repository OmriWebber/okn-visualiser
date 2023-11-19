import { defineStore } from 'pinia';

export const useManipStore = defineStore({
    id: 'manip',
  
    state: () => ({
      data: [],
      maxXValue: 0,
      focusedPoint: {x: 0, y: 0},
    }),
  
    actions: {
        updateMaxXValue(value) {
            this.maxXValue = value;
            this.data = this.data.map((point) => {
              if (point > value / 100) {
                return { ... point, x: value / 100 };
              } else {
                return { ... point, x: value / 100 };
              }
            });
        },
        setData(data) {
          this.data = data;
          this.maxXValue = data[data.length - 1].x * 100;
          console.log(this.maxXValue)
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