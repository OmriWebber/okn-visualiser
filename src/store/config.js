import { useManipStore } from '@/store/manip'
import { defineStore } from 'pinia';

const manipStore = useManipStore();


export const useConfigStore = defineStore({
    id: 'config',
    state: () => ({
      minYValue: 0,
      maxYValue: 0,
      Amplitude: 0,
      Ramping: 0,
    }),
  
    actions: {
        updateMinY(value) {
            this.minYValue = value;
        },
        updateMaxY(value) {
            this.maxYValue = value;
        },
        updateAmplitude(value) {
            this.Amplitude = value;
        },
        updateRamping(value) {
            this.Ramping = value;
        },
        reset() {
            this.minYValue = manipStore.defaultConfig.minYValue;
            this.maxYValue = manipStore.defaultConfig.maxYValue;
            this.Amplitude = manipStore.defaultConfig.Amplitude;
            this.Ramping = manipStore.defaultConfig.Ramping;
        },
        apply() {
            const updatedData = manipStore.originalData.map(item => {
                const t = item.t;
                const y = item.y;
                const newY = y + this.Amplitude * Math.sin(this.Ramping * y);
                console.log(y, newY);
                return {...item, t, y: newY};
            });
            console.log(updatedData)
            manipStore.setData(updatedData);
        }
    }
  });