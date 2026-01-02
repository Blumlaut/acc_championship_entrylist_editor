<template>
   <v-navigation-drawer v-if="jsonData" :value="drawer" app @input="$emit('update:drawer', $event)">
    <v-list v-if="jsonData && jsonData.cars && jsonData.cars.length > 0">
      <v-list-item
        v-for="(car, index) in jsonData.cars"
        :key="index"
        @click="selectCar(index)"
        :class="{ 'bold-text': selectedCar === index }"
        @mouseover="setHoveredItem(index)"
        @mouseleave="clearHoveredItem()"
      >
        <v-list-item-content>
          <v-list-item-title>
            #{{ car.info.raceNumber }} {{ car.info.teamName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="extra-info">{{ getCarModel(car.info.carModelType).model }}</span> - 
            <span class="extra-info">{{ getDriversList(car.drivers) }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="copyCar" @click.stop="addNewCar(index)" v-if="hoveredItem === index">
          <v-icon color="green">mdi-plus</v-icon>
        </v-list-item-action>
        <v-list-item-action class="deleteCar" @click.stop="confirmDeleteCar(index)" v-if="hoveredItem === index">
          <v-icon color="error">mdi-close</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item @click="addNewCar(null)">
        <v-list-item-content>
          <v-list-item-title>Add a new car</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon color="green">mdi-plus</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this car?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteCarConfirmed">Yes</v-btn>
          <v-btn text @click="cancelDeleteCar">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawerVisible() {
      return !!(this.jsonData && this.jsonData.cars);
    }
  },
  props: {
    drawer: Boolean,
    jsonData: Object,
    selectedCar: Number,
    carsArray: Array,
  },
  data() {
    return {
      deleteDialog: false,
      carToDeleteIndex: null,
      hoveredItem: null,
      hoveredNewItem: false,
    };
  },
  methods: {
    selectCar(index) {
      this.$emit('select-car', index);
    },
    getCarModel(carModelType) {
      return this.carsArray.find(car => car.id === carModelType) || {};
    },
    getDriversList(drivers) {
      if (!drivers) return '';
      return drivers.map(driver => driver.info.shortName).join(', ');
    },
    confirmDeleteCar(index) {
      this.carToDeleteIndex = index;
      this.deleteDialog = true;
    },
    deleteCarConfirmed() {
      this.$emit('delete-car', this.carToDeleteIndex);
      this.closeDeleteDialog();
    },
    cancelDeleteCar() {
      this.closeDeleteDialog();
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.carToDeleteIndex = null;
    },
    setHoveredItem(index) {
      this.hoveredItem = index;
    },
    clearHoveredItem() {
      this.hoveredItem = null;
    },
    setHoveredNewItem(value) {
      this.hoveredNewItem = value;
    },
    clearHoveredNewItem() {
      this.hoveredNewItem = false;
    },
    addNewCar(index) {
      this.$emit('add-new-car', index);
    },
  },
};
</script>

<style scoped>
.bold-text {
  font-weight: bold;
  background: #444;
}

.extra-info {
  font-size: 12px;
}

.v-list-item {
  margin-left: 0px;
  padding-left: 0px;
  padding-inline: 0px !important;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative; /* Ensure positioning context */
}

.v-list-item-title {
  margin-left: 25px;
}

.v-list-item-subtitle {
  margin-left: 25px;
}

.v-list-item-action {
  position: absolute;
  cursor: pointer;
  display: none; /* Hide by default */
}

.copyCar {
  top:0px
}

.deleteCar {
  bottom:0px;
}

.v-list-item:hover .v-list-item-action,
.v-list-item:hover .v-list-item-add {
  display: block; /* Show when parent (v-list-item or v-list-item-add) is hovered */
}

.navButtons {
  margin-top: 1em;
  margin-left: 1px;
}
</style>
