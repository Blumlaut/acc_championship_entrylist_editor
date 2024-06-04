<template>
    <div class="json-editor">
        <h1>ACC Championship Entrylist Editor</h1>
        <input type="file" @change="onFileChange" />
        <button @click="downloadJson">Export</button>
        <div v-if="jsonData" class="editor-container">
            <div class="car-list">
                <h2>Cars</h2>
                <ul>
                    <li v-for="(car, index) in jsonData.cars" :key="index" @click="selectCar(index)" :class="{ 'bold-text': this.selectedCar === index }">
                        {{ car.info.teamName }} - {{ car.info.displayName }} - #{{  car.info.raceNumber }}
                    </li>
                </ul>
            </div>
            <div class="car-details" v-if="selectedCar !== null">
                <h2>Edit Car Info</h2>
                <div v-for="(value, key) in jsonData.cars[selectedCar].info" :key="key" class="input-group">
                    <label :for="key">{{ key }}:</label>
                    <input :id="key" type="text" v-model="jsonData.cars[selectedCar].info[key]" />
                </div>
            </div>
            <div class="driver-details" v-if="selectedCar !== null">
                <h2>Edit Driver Info</h2>
                <div v-for="(driver, dIndex) in jsonData.cars[selectedCar].drivers" :key="dIndex" class="driver-info">
                    <h3>Driver {{ dIndex + 1 }}</h3>
                    <div v-for="(dValue, dKey) in driver.info" :key="dKey" class="input-group">
                        <label :for="dKey">{{ dKey }}:</label>
                        <input :id="dKey" type="text" v-model="driver.info[dKey]" />
                    </div>
                </div>
            </div>
        </div>
        <h3 v-if="jsonData">Raw JSON:</h3>
        <textarea v-if="jsonData" v-model="jsonText" rows="20" cols="100"></textarea>
    </div>
</template>

<script>
export default {
    data() {
        return {
            jsonData: null,
            selectedCar: null,
            jsonText: '',
        };
    },
    watch: {
        jsonData: {
            deep: true,
            handler(newData) {
                this.jsonText = JSON.stringify(newData, null, 2);
            },
        },
    },
    methods: {
        isUTF8(string) {
            for (let i = 0; i < string.length; i++) {
                if (string.charCodeAt(i) > 127) {
                return true;
                }
            }
            return false;
        },
        decodeUTF16LE( binaryStr ) {
            var cp = [];
            for( var i = 0; i < binaryStr.length; i+=2) {
                cp.push( 
                binaryStr.charCodeAt(i) |
                ( binaryStr.charCodeAt(i+1) << 8 )
                );
            }
            return String.fromCharCode.apply( String, cp );
        },
        onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!this.isUTF8(e.target.result)) {
                    e.target.result = this.decodeUTF16LE(e.target.result)
                }
                this.jsonData = JSON.parse(e.target.result);
                this.selectedCar = 0;
                this.jsonText = JSON.stringify(this.jsonData, null, 2);
            };
            reader.readAsText(file);
        },
        selectCar(index) {
            this.selectedCar = index;
        },
        downloadJson() {
            const blob = new Blob([this.jsonText], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'championship_entrylist.json';
            a.click();
            URL.revokeObjectURL(url);
        },
    },
};
</script>

<style scoped>


.json-editor {
    display: flex;
    flex-direction: column;
    align-items: center;
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
}
.driver-details {
    width: 35%;
    padding-left: 20px;
}

.input-group {
    margin-bottom: 10px;
    width:85%;
}


.driver-info {
    margin-top: 20px;
}

.bold-text {
    font-weight: bold;
}
</style>
