<template>
   <v-navigation-drawer v-if="jsonData" :value="drawer" app @input="$emit('update:drawer', $event)">
    <v-list>
      <!-- Car list items with proper 3-column layout -->
      <v-list-item
        v-for="(car, index) in jsonData.cars"
        :key="index"
        @click="selectCar(index)"
        :class="{ 'bold-text': selectedCar === index }"
        class="car-list-item"
      >
        <v-row no-gutters class="car-row">
          <!-- Column 1: Checkbox -->
          <v-col cols="2" class="checkbox-col">
            <v-checkbox
              :model-value="selectedCars.includes(index)"
              @click.stop
              @change="toggleCarSelection(index)"
              class="checkbox-align"
            ></v-checkbox>
          </v-col>
          
          <!-- Column 2: Actions -->
          <v-col cols="3" class="actions-col">
            <div class="action-icons">
              <v-icon color="green" class="copyCar" @click.stop="addNewCar(index)">mdi-content-duplicate</v-icon>
              <v-icon color="error" class="deleteCar" @click.stop="confirmDeleteCar(index)">mdi-close</v-icon>
            </div>
          </v-col>
          
          <!-- Column 3: Car Information -->
          <v-col cols="7" class="info-col">
            <div class="car-info">
              <div class="car-title">
                #{{ car.info.raceNumber }} {{ car.info.teamName }}
              </div>
              <div class="car-subtitle">
                <span class="extra-info">{{ getCarModel(car.info.carModelType).model }}</span> - 
                <span class="extra-info">{{ getDriversList(car.drivers) }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-list-item>
      
      <!-- Add new car button - at the bottom with 3-column layout -->
      <v-list-item @click="addNewCar(null)" class="add-new-car-item">
        <v-row no-gutters class="car-row">
          <!-- Column 1: Empty for checkbox alignment -->
          <v-col cols="2" class="checkbox-col"></v-col>
          
          <!-- Column 2: Add icon in actions column -->
          <v-col cols="3" class="actions-col">
            <div class="action-icons">
              <v-icon color="green" class="add-icon">mdi-plus</v-icon>
            </div>
          </v-col>
          
          <!-- Column 3: Text in info column -->
          <v-col cols="7" class="info-col">
            <div class="car-info">
              <div class="car-title">Add a new car</div>
            </div>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>

    <!-- Bottom toolbar for bulk actions -->
    <div v-if="selectedCars.length > 0" class="bulk-action-toolbar">
      <v-btn color="primary" @click="showBulkActions" class="bulk-action-button">
        <v-icon left>mdi-check-all</v-icon>
        {{ selectedCars.length }} selected - Actions
      </v-btn>
    </div>
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

    <v-dialog v-model="bulkActionDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Bulk Actions</v-card-title>
        <v-card-text>
          You have selected {{ selectedCars.length }} car(s). What would you like to do?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="cloneSelectedCars">Clone</v-btn>
          <v-btn color="error" text @click="deleteSelectedCars">Delete</v-btn>
          <v-btn text @click="bulkActionDialog = false">Cancel</v-btn>
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
      selectedCars: [],
      bulkActionDialog: false,
    };
  },
  methods: {
    selectCar(index) {
      this.$emit('select-car', index);
    },
    toggleCarSelection(index) {
      if (this.selectedCars.includes(index)) {
        this.selectedCars = this.selectedCars.filter(i => i !== index);
      } else {
        this.selectedCars.push(index);
      }
    },
    isCarSelected(index) {
      return this.selectedCars.includes(index);
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
    addNewCar(index) {
      this.$emit('add-new-car', index);
    },
    showBulkActions() {
      if (this.selectedCars.length > 0) {
        this.bulkActionDialog = true;
      }
    },
    cloneSelectedCars() {
      this.$emit('bulk-clone-cars', this.selectedCars);
      this.bulkActionDialog = false;
      this.selectedCars = [];
    },
    deleteSelectedCars() {
      this.$emit('bulk-delete-cars', this.selectedCars);
      this.bulkActionDialog = false;
      this.selectedCars = [];
    },
  },
};
</script>

<style scoped>
/* Base styles */
.bold-text {
  font-weight: bold;
  background: #444;
}

.copyCar, .deleteCar {
  cursor: pointer;
}

.navButtons {
  margin-top: 1em;
  margin-left: 1px;
}

/* Car list item container */
.car-list-item, .add-new-car-item {
  padding: 0 !important;
  min-height: 64px;
}

/* Row layout for 3 columns */
.car-row {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

/* Column 1: Checkbox - 20% width */
.checkbox-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}

.checkbox-align {
  margin: 0;
  /* Force vertical centering */
  display: flex;
  align-items: center;
}

.checkbox-align .v-input__slot {
  margin: 0 !important;
}

/* Column 2: Actions - 30% width */
.actions-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}

.action-icons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.action-icons .v-icon {
  font-size: 20px;
}

/* Column 3: Car Information - 50% width */
.info-col {
  display: flex;
  align-items: center;
  padding: 8px 16px;
}

.car-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
}

.car-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
  color: var(--text-primary);
}

.car-subtitle {
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.extra-info {
  font-size: 12px;
}

/* Dark mode compatible colors */
:root {
  --text-primary: rgba(255, 255, 255, 0.87);
  --text-secondary: rgba(255, 255, 255, 0.6);
  --text-disabled: rgba(255, 255, 255, 0.38);
}

/* Bulk action toolbar */
.bulk-action-toolbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px;
  z-index: 10;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.bulk-action-button {
  width: 100%;
  justify-content: flex-start;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .action-icons {
    gap: 8px;
  }
  
  .action-icons .v-icon {
    font-size: 18px;
  }
  
  .add-icon {
    font-size: 18px;
  }
}

@media (max-width: 960px) {
  .car-list-item, .add-new-car-item {
    min-height: 56px;
  }
  
  .car-title,
  .car-subtitle,
  .add-text {
    font-size: 13px;
  }
  
  .action-icons {
    gap: 6px;
  }
}
</style>
