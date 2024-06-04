<template>
    <div class="json-editor">
        <h1>ACC Championship Entrylist Editor</h1>
        <input type="file" @change="onFileChange" />
        <button @click="downloadJson">Export</button>
        <div v-if="jsonData" class="editor-container">
            <div class="car-list">
                <h2>Cars</h2>
                <button @click="addNewCar">Add Car</button>
                <ul>
                    <li v-for="(car, index) in jsonData.cars" :key="index" @click="selectCar(index)" :class="{ 'bold-text': this.selectedCar === index }">
                        {{ car.info.teamName }} - {{ car.info.displayName }} - #{{  car.info.raceNumber }}
                    </li>
                </ul>
            </div>
            <div class="car-details" v-if="selectedCar !== null">
                <h2>Edit Car Info</h2>
                <a>Import from car.json:  </a><input type="file" @change="onCarFile" />
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
        downloadUtf16(str, filename) {
            
            // ref: https://stackoverflow.com/q/6226189
            var charCode, byteArray = [];
            
            // BE BOM
            //byteArray.push(254, 255);
            
            // LE BOM
            byteArray.push(255, 254);
            
            for (var i = 0; i < str.length; ++i) {
                
                charCode = str.charCodeAt(i);
                
                // BE Bytes
                //byteArray.push((charCode & 0xFF00) >>> 8);
                //byteArray.push(charCode & 0xFF);
                
                // LE Bytes
                byteArray.push(charCode & 0xff);
                byteArray.push(charCode / 256 >>> 0);
            }
            
            var blob = new Blob([new Uint8Array(byteArray)], {type:'text/plain;charset=UTF-16LE;'});
            var blobUrl = URL.createObjectURL(blob);
            
            // ref: https://stackoverflow.com/a/18197511
            var link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            
            if (document.createEvent) {
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                link.dispatchEvent(event);
            } else {
                link.click();
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                var jsonstring = e.target.result
                console.log(jsonstring)
                this.jsonData = JSON.parse(jsonstring);
                this.selectedCar = 0;
                this.jsonText = JSON.stringify(this.jsonData, null, 2);
            };
            reader.readAsText(file, "UTF-16LE");
        },
        onCarFile(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                var jsonstring = e.target.result
                var newCarData = JSON.parse(jsonstring);
                for (const prop in newCarData) {
                    this.jsonData.cars[this.selectedCar][prop] = newCarData[prop];
                }
            };
            reader.readAsText(file, "UTF-16LE");
        },
        selectCar(index) {
            this.selectedCar = index;
        },
        addNewCar() {
            // copy this.jsonData.cars[this.selectedCar] to end of array
            this.jsonData.cars = [...this.jsonData.cars, this.jsonData.cars[this.selectedCar]]
            
        },
        downloadJson() {
            this.downloadUtf16(this.jsonText, "championship_entrylist.json")
        }
        
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
