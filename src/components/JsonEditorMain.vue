<template>
  <div class="json-editor">
    <div v-if="jsonData" class="editor-container">
      <v-row>
        <v-col v-if="selectedCar !== null" cols="6">
          <div class="car-details">
            <h2>Car Info </h2>
            <v-btn class="mdi mdi-upload" variant="tonal" @click="carjsonUpload" style="margin-right:5px; margin-bottom: 5px;">Import from car.json</v-btn>
            <input ref="carjsonUpload" type="file" @change="onCarFile" accept="text/json" hidden/>
            <div v-for="(value, key) in jsonData.cars[selectedCar].info" :key="key" class="input-group">
              <v-text-field
                v-if="key !== 'carModelType' && key !== 'nationality' && key !== 'competitorNationality' && key !== 'cupCategory' && key !== 'raceNumber'"
                :label="key"
                v-model="jsonData.cars[selectedCar].info[key]"  q
              />
              <v-text-field
                v-else-if="key === 'raceNumber'"
                :label="key"
                v-model="jsonData.cars[selectedCar].info[key]"
                :error-messages="!validateFieldUniqueness(selectedCar, key) ? ['Race number must be unique.'] : []"
              />
              <v-autocomplete
                v-else-if="key === 'carModelType'"
                :label="key"
                :items="carsArray.map(car => ({ title: car.model, value: car.id }))"
                v-model="jsonData.cars[selectedCar].info[key]"
              />
              <v-autocomplete
                v-else-if="key === 'nationality'"
                :label="key"
                :items="nationalitiesArray.map(nationality => ({ title: nationality.country, value: nationality.id }))"
                v-model="syncedNationality"
              />
              <v-autocomplete
                v-else-if="key === 'cupCategory'"
                :label="key"
                :items="cupcategoriesArray.map(category => ({ title: category.category, value: category.id }))"
                v-model="jsonData.cars[selectedCar].info[key]"
              />
            </div>
          </div>
        </v-col>
        <v-col v-if="selectedCar !== null" cols="6">
          <div class="driver-details">
            <h2>Driver Info</h2>
            <div v-for="(driver, dIndex) in jsonData.cars[selectedCar].drivers" :key="dIndex" class="driver-info">
              <h3>Driver {{ dIndex + 1 }} - {{ driver.info.firstName +" "+ driver.info.lastName }}</h3>
              <v-btn v-if="dIndex == 0" @click="addNewDriver(selectedCar, jsonData.cars[selectedCar].drivers[dIndex])" style="margin-right:5px; margin-bottom: 5px;" variant="tonal" class="mdi mdi-plus">Copy Driver</v-btn>
              <v-btn v-if="dIndex > 0" @click="removeDriver(selectedCar, dIndex)" style="margin-right:5px; margin-bottom: 5px;" color="error">Remove Driver</v-btn>
              <div v-for="(dValue, dKey) in driver.info" :key="dKey" class="input-group">
                <v-text-field
                  v-if="dKey !== 'nationality' && dKey !== 'driverCategory'"
                  :label="dKey"
                  v-model="driver.info[dKey]"
                />
                <v-autocomplete
                  v-else-if="dKey == 'driverCategory'"
                  :label="dKey"
                  :items="cupcategoriesArray.map(category => ({ title: category.category, value: category.id }))"
                  v-model="driver.info[dKey]"
                />
                <v-autocomplete
                  v-else
                  :label="dKey"
                  :items="nationalitiesArray.map(nationality => ({ title: nationality.country, value: nationality.id }))"
                  v-model="driver.info[dKey]"
                />
              </div>
              <v-divider :thickness="3" class="pa-4"/>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    jsonData: Object,
    selectedCar: Number,
    jsonText: String,
    carsArray: Array,
    nationalitiesArray: Array,
    cupcategoriesArray: Array
  },
  computed: {
    syncedNationality: {
      get() {
        return this.jsonData.cars[this.selectedCar].info['nationality'];
      },
      set(value) {
        this.jsonData.cars[this.selectedCar].info['nationality'] = value;
        this.jsonData.cars[this.selectedCar].info['competitorNationality'] = value;
        this.$emit('update-json-data', this.jsonData);
      }
    },
  },
  methods: {
    validateFieldUniqueness(carIndex, key) {
      const currentValue = this.jsonData.cars[carIndex].info[key];

      // Check if the current value matches any other car's value for the same key
      const isUnique = this.jsonData.cars.every((car, index) => {
        return index === carIndex || car.info[key] != currentValue;
      });

      return isUnique;
    },
    carjsonUpload() {
      this.$refs.carjsonUpload.click();
    },
    exportJson() {
      this.$emit('download-json');
    },
    selectCar(index) {
      this.$emit('update:selectedCar', index);
    },
    addNewDriver(carIndex, driver) {
      this.$emit('add-new-driver', carIndex, driver);
    },
    removeDriver(carIndex, driverIndex) {
      this.$emit('remove-driver', carIndex, driverIndex);
    },
    onCarFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonstring = e.target.result;
        const newCarData = JSON.parse(jsonstring);
        Object.assign(this.jsonData.cars[this.selectedCar].info, newCarData);
        this.$emit('update-json-data', this.jsonData);
      };
      reader.readAsText(file, "UTF-16LE");
    },
    getDriversList(drivers) {
      if (!drivers) return '';
      return drivers.map(driver => driver.info.shortName).join(', ');
    },
    getCarModel(carModelType) {
      return this.carsArray.find(car => car.id === carModelType) || {};
    },
  }
};
</script>

<style scoped>

.json-editor {
  margin-top: -0.5em;
  margin-left: 2em;
  margin-right: 2em;
  margin-bottom: 2em;
}
.bold-text {
  font-weight: bold;
}

.extra-info {
  font-size: 12px; /* Adjust the font size as needed */
}

</style>
