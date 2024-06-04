(function(){"use strict";var n={6304:function(n,e,t){var o=t(5130),r=t(6768);const a={id:"app"};function i(n,e,t,o,i,l){const s=(0,r.g2)("JsonEditor");return(0,r.uX)(),(0,r.CE)("div",a,[(0,r.bF)(s)])}var l=t(4232);const s=n=>((0,r.Qi)("data-v-62720458"),n=n(),(0,r.jt)(),n),u={class:"json-editor"},c=s((()=>(0,r.Lk)("h1",null,"ACC Championship Entrylist Editor",-1))),d={key:0,class:"editor-container"},f={class:"car-list"},p=s((()=>(0,r.Lk)("h2",null,"Cars",-1))),v=["onClick"],h={key:0,class:"car-details"},C=s((()=>(0,r.Lk)("h2",null,"Edit Car Info",-1))),k=s((()=>(0,r.Lk)("a",null,"Import from car.json: ",-1))),j=["for"],y=["id","onUpdate:modelValue"],E={key:1,class:"driver-details"},b=s((()=>(0,r.Lk)("h2",null,"Edit Driver Info",-1))),m=["for"],g=["id","onUpdate:modelValue"],L={key:1};function w(n,e,t,a,i,s){return(0,r.uX)(),(0,r.CE)("div",u,[c,(0,r.Lk)("input",{type:"file",onChange:e[0]||(e[0]=(...n)=>s.onFileChange&&s.onFileChange(...n))},null,32),(0,r.Lk)("button",{onClick:e[1]||(e[1]=(...n)=>s.downloadJson&&s.downloadJson(...n))},"Export"),i.jsonData?((0,r.uX)(),(0,r.CE)("div",d,[(0,r.Lk)("div",f,[p,(0,r.Lk)("ul",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.jsonData.cars,((n,e)=>((0,r.uX)(),(0,r.CE)("li",{key:e,onClick:n=>s.selectCar(e),class:(0,l.C4)({"bold-text":this.selectedCar===e})},(0,l.v_)(n.info.teamName)+" - "+(0,l.v_)(n.info.displayName)+" - #"+(0,l.v_)(n.info.raceNumber),11,v)))),128))])]),null!==i.selectedCar?((0,r.uX)(),(0,r.CE)("div",h,[C,k,(0,r.Lk)("input",{type:"file",onChange:e[2]||(e[2]=(...n)=>s.onCarFile&&s.onCarFile(...n))},null,32),((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.jsonData.cars[i.selectedCar].info,((n,e)=>((0,r.uX)(),(0,r.CE)("div",{key:e,class:"input-group"},[(0,r.Lk)("label",{for:e},(0,l.v_)(e)+":",9,j),(0,r.bo)((0,r.Lk)("input",{id:e,type:"text","onUpdate:modelValue":n=>i.jsonData.cars[i.selectedCar].info[e]=n},null,8,y),[[o.Jo,i.jsonData.cars[i.selectedCar].info[e]]])])))),128))])):(0,r.Q3)("",!0),null!==i.selectedCar?((0,r.uX)(),(0,r.CE)("div",E,[b,((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.jsonData.cars[i.selectedCar].drivers,((n,e)=>((0,r.uX)(),(0,r.CE)("div",{key:e,class:"driver-info"},[(0,r.Lk)("h3",null,"Driver "+(0,l.v_)(e+1),1),((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(n.info,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:t,class:"input-group"},[(0,r.Lk)("label",{for:t},(0,l.v_)(t)+":",9,m),(0,r.bo)((0,r.Lk)("input",{id:t,type:"text","onUpdate:modelValue":e=>n.info[t]=e},null,8,g),[[o.Jo,n.info[t]]])])))),128))])))),128))])):(0,r.Q3)("",!0)])):(0,r.Q3)("",!0),i.jsonData?((0,r.uX)(),(0,r.CE)("h3",L,"Raw JSON:")):(0,r.Q3)("",!0),i.jsonData?(0,r.bo)(((0,r.uX)(),(0,r.CE)("textarea",{key:2,"onUpdate:modelValue":e[3]||(e[3]=n=>i.jsonText=n),rows:"20",cols:"100"},null,512)),[[o.Jo,i.jsonText]]):(0,r.Q3)("",!0)])}t(4603),t(7566),t(8721);var x={data(){return{jsonData:null,selectedCar:null,jsonText:""}},watch:{jsonData:{deep:!0,handler(n){this.jsonText=JSON.stringify(n,null,2)}}},methods:{onFileChange(n){const e=n.target.files[0],t=new FileReader;t.onload=n=>{var e=n.target.result;console.log(e),this.jsonData=JSON.parse(e),this.selectedCar=0,this.jsonText=JSON.stringify(this.jsonData,null,2)},t.readAsText(e,"UTF-16LE")},onCarFile(n){const e=n.target.files[0],t=new FileReader;t.onload=n=>{var e=n.target.result,t=JSON.parse(e);for(const o in t)this.jsonData.cars[this.selectedCar][o]=t[o]},t.readAsText(e,"UTF-16LE")},selectCar(n){this.selectedCar=n},downloadJson(){const n=new Blob([this.jsonText],{type:"application/json"}),e=URL.createObjectURL(n),t=document.createElement("a");t.href=e,t.download="championship_entrylist.json",t.click(),URL.revokeObjectURL(e)}}},O=t(1241);const _=(0,O.A)(x,[["render",w],["__scopeId","data-v-62720458"]]);var F=_,D={components:{JsonEditor:F}};const X=(0,O.A)(D,[["render",i]]);var J=X;(0,o.Ef)(J).mount("#app")}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={exports:{}};return n[o].call(a.exports,a,a.exports,t),a.exports}t.m=n,function(){var n=[];t.O=function(e,o,r,a){if(!o){var i=1/0;for(c=0;c<n.length;c++){o=n[c][0],r=n[c][1],a=n[c][2];for(var l=!0,s=0;s<o.length;s++)(!1&a||i>=a)&&Object.keys(t.O).every((function(n){return t.O[n](o[s])}))?o.splice(s--,1):(l=!1,a<i&&(i=a));if(l){n.splice(c--,1);var u=r();void 0!==u&&(e=u)}}return e}a=a||0;for(var c=n.length;c>0&&n[c-1][2]>a;c--)n[c]=n[c-1];n[c]=[o,r,a]}}(),function(){t.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return t.d(e,{a:e}),e}}(),function(){t.d=function(n,e){for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)}}(),function(){var n={524:0};t.O.j=function(e){return 0===n[e]};var e=function(e,o){var r,a,i=o[0],l=o[1],s=o[2],u=0;if(i.some((function(e){return 0!==n[e]}))){for(r in l)t.o(l,r)&&(t.m[r]=l[r]);if(s)var c=s(t)}for(e&&e(o);u<i.length;u++)a=i[u],t.o(n,a)&&n[a]&&n[a][0](),n[a]=0;return t.O(c)},o=self["webpackChunkacc_championship_entrylist_editor"]=self["webpackChunkacc_championship_entrylist_editor"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=t.O(void 0,[504],(function(){return t(6304)}));o=t.O(o)})();
//# sourceMappingURL=app.61dcbcaa.js.map