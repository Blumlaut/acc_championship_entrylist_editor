<template>
  <v-icon icon="mdi-home" />
  <v-app id="inspire">
    <json-editor-drawer
    :drawer="drawer"
    :jsonData="jsonData"
    :selectedCar="selectedCar"
    :carsArray="carsArray" 
    @update:drawer="drawer = $event"
    @select-car="selectCar"
    @get-car-model="getCarModel"
    @add-new-car="addNewCar"
    @delete-car="deleteCar"
    />
    
    <v-app-bar app>
      <v-toolbar-title>ACC Championship Entrylist Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mdi mdi-download titleBarButton" @click="downloadJson" variant="tonal" v-if="jsonData" color="primary">Save Entry List</v-btn>
      <v-btn class="mdi mdi-upload titleBarButton" @click="loadJson" variant="tonal" v-if="!jsonData" color="primary">Load Entry List</v-btn>
      <input type="file" ref="jsonFileInput" @change="onFileChange" accept="text/json" hidden />
    </v-app-bar>
    
    <v-main>
      <json-editor-main
      :jsonData="jsonData"
      :selectedCar="selectedCar"
      :jsonText="jsonText"
      :carsArray="carsArray"
      :nationalitiesArray="nationalitiesArray"
      :cupcategoriesArray="cupcategoriesArray"
      @load-json="onLoadJson"
      @add-new-driver="addNewDriver"
      @remove-driver="removeDriver"
      @update-json-data="jsonData = $event"
      />
    </v-main>
  </v-app>
</template>

<script>
import JsonEditorDrawer from './components/JsonEditorDrawer.vue';
import JsonEditorMain from './components/JsonEditorMain.vue';
import { cars } from './data/cars.js';
import { nationalities } from './data/nationalities.js';
import { cupcategories } from './data/cupcategories.js';

export default {
  data() {
    return {
      drawer: false,
      jsonData: null,
      selectedCar: null,
      jsonText: '',
      carsArray: [],
      nationalitiesArray: [],
      cupcategoriesArray: [],
    };
  },
  components: {
    JsonEditorDrawer,
    JsonEditorMain,
  },
  created() {
    this.carsArray = Object.values(cars);
    this.nationalitiesArray = Object.values(nationalities);
    this.cupcategoriesArray = Object.values(cupcategories);
  },
  methods: {
    parseIntRecursive(obj) {
      const globs = [/.*Name$/, /^playerID$/];
      const shouldKeepString = (key) => globs.some((glob) => new RegExp(glob).test(key));

      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          obj[key] = this.parseIntRecursive(obj[key], globs);  // Use `this.parseIntRecursive`
        } else if (obj[key] !== "" && !isNaN(Number(obj[key]))) {
          if (shouldKeepString(key)) {
            obj[key] = String(obj[key]);
          } else {
            obj[key] = Number(obj[key]);
          };
        };
      };
      return obj;
    },

    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    loadJson() {
      this.$refs.jsonFileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonstring = e.target.result;
        this.jsonData = JSON.parse(jsonstring);
        this.selectedCar = 0;
        this.jsonText = JSON.stringify(this.jsonData, null, 2);
      };
      reader.readAsText(file, 'UTF-16LE');
    },
    selectCar(index) {
      this.selectedCar = index;
    },
    getCarModel(carModelType) {
      return this.carsArray.find(car => car.id === carModelType) || {};
    },
    onLoadJson(jsonstring) {
      this.jsonData = JSON.parse(jsonstring);
      this.selectedCar = 0;
      this.jsonText = JSON.stringify(this.jsonData, null, 2);
    },
    addNewCar(index) {
      const newCar = JSON.parse(JSON.stringify(this.jsonData.cars[index]));
      this.jsonData.cars.push(newCar);
    },
    deleteCar(index) {
      if (this.selectedCar !== null) {
        this.jsonData.cars.splice(index, 1);
        this.selectedCar = this.jsonData.cars.length > 0 ? 0 : null;
      }
    },
    addNewDriver(carIndex, newDriver) {
      this.jsonData.cars[carIndex].drivers.push(newDriver);
    },
    removeDriver(carIndex, driverIndex) {
      if (driverIndex > 0) {
        this.jsonData.cars[carIndex].drivers.splice(driverIndex, 1);
      }
    },
    downloadJson() {
      this.jsonData = this.parseIntRecursive(this.jsonData)
      this.jsonText = JSON.stringify(this.jsonData, null, 2);
      const byteArray = [];
      byteArray.push(255, 254); // LE BOM
      for (let i = 0; i < this.jsonText.length; ++i) {
        const charCode = this.jsonText.charCodeAt(i);
        byteArray.push(charCode & 0xff);
        byteArray.push(charCode / 256 >>> 0);
      }
      const blob = new Blob([new Uint8Array(byteArray)], { type: 'text/plain;charset=UTF-16LE;' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'championship_entrylist.json';
      link.click();
    },
  },
};
</script>

<style scoped>
.json-editor {
  display: flex;
  flex-direction: column;
}

.editor-container {
  display: flex;
  width: 100%;
  margin-top: 20px;
}

.car-list {
  width: 20%;
  border-right: 1px solid #ccc;
  padding-right: 10px;
}

.car-list ul {
  list-style-type: none;
  padding: 0;
}

.car-list li {
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.car-list li:hover {
  background-color: #f0f0f0;
}

.car-details {
  width: 35%;
  padding-left: 20px;
  margin-left: auto;
  margin-right: auto;
}

.driver-details {
  width: 35%;
  padding-left: 20px;
  margin-left: auto;
  margin-right: auto;
}

.input-group {
  margin-bottom: 10px;
  width: 100%;
}

.driver-info {
  margin-top: 20px;
}

.bold-text {
  font-weight: bold;
}

.extra-info {
  font-size: 12px; /* Adjust the font size as needed */
}

.titleBarButton {
  margin-right: 1em;
}
</style>
