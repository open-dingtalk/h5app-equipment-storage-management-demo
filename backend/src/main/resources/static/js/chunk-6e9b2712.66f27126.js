(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e9b2712"],{"0fb3":function(t,e,i){},6009:function(t,e,i){"use strict";i("0fb3")},"7f61":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mainPanel"},[i("div",{staticClass:"detailLeft"},[i("div",{staticClass:"orderInfoP2"},[i("div",{staticClass:"orderInfoP2Item"},[i("div",{staticClass:"itemT"},[t._v("设备名称：")]),i("div",{staticClass:"itemC line1"},[t._v(t._s(t.device.name))])]),i("div",{staticClass:"orderInfoP2Item"},[i("div",{staticClass:"itemT"},[t._v("机型：")]),i("div",{staticClass:"itemC line1"},[t._v(t._s(t.device.type))])]),i("div",{staticClass:"orderInfoP2Item"},[i("div",{staticClass:"itemT"},[t._v("联系人：")]),i("div",{staticClass:"itemC line1"},[t._v(t._s(t.device.contacts))])]),i("div",{staticClass:"orderInfoP2Item"},[i("div",{staticClass:"itemT"},[t._v("设备编号：")]),i("div",{staticClass:"itemC line1"},[t._v(t._s(t.device.id))])]),i("div",{staticClass:"orderInfoP2Item"},[i("div",{staticClass:"itemT"},[t._v("设备位置：")]),i("div",{staticClass:"itemC line1"},[t._v(t._s(t.device.position))])]),i("div",{staticClass:"orderInfoP2Item"},[i("div",{staticClass:"itemT"},[t._v("设备状态：")]),i("div",{staticClass:"itemC line1"},[t._v(t._s(t.deviceState[t.device.state]))])]),i("div",{staticClass:"orderInfoP2Item"},[i("div",{staticClass:"itemT"},[t._v("设备图片：")]),i("div",{staticClass:"itemC"},t._l(t.device.imgs,(function(t,e){return i("el-image",{key:e,staticStyle:{width:"50px",height:"50px","margin-right":"5px"},attrs:{src:t,"preview-src-list":[t]}})})),1)])])]),i("div",{ref:"detailRight",staticClass:"detailRight"},[i("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"设备维护日志",name:"1"}},[i("div",{staticClass:"stepBox",style:{height:t.tabPaneH+"px"}},[i("el-table",{staticClass:"tableGrow",staticStyle:{width:"100%"},attrs:{data:t.logList,height:"100%"}},[i("el-table-column",{attrs:{prop:"name",label:"设备名称","show-overflow-tooltip":"","min-width":"200"}}),i("el-table-column",{attrs:{prop:"type",label:"机型","min-width":"140"}}),i("el-table-column",{attrs:{prop:"id","show-overflow-tooltip":"",label:"设备编号","min-width":"200"}}),i("el-table-column",{attrs:{"show-overflow-tooltip":"",label:"维修状态","min-width":"140"}},[[t._v("维修中")]],2),i("el-table-column",{attrs:{prop:"position","show-overflow-tooltip":"",label:"设备位置","min-width":"200"}})],1)],1)])],1)],1)])},a=[],l=i("b85c"),o=i("5530"),d=(i("4de4"),i("2f62")),c={data:function(){return{id:"",device:{},activeName:"1",tabPaneH:0,deviceState:{1:"正常",2:"检修中",3:"异常"},logList:[],serviceList:[{title:"开始服务",date:"2022-01-04 15:03:04",add:"福建省厦门市思明区观日路54号",person:"",result:""},{title:"维修进度",date:"2022-01-04 16:03:04",add:"",person:"[王五]，进度填写人[马六]",result:"修为完成"},{title:"服务完成",date:"2022-01-04 17:03:04",add:"福建省厦门市思明区观日路54号",person:"",result:""}]}},computed:Object(o["a"])({},Object(d["b"])(["deviceLogObj","deviceList"])),created:function(){var t=this;this.id=this.$route.params.id,this.device=this.deviceList.filter((function(e){return e.id==t.id}))[0],console.log("AutoConsole: created -> this.device",this.device);var e=this.deviceLogObj[this.id];if(console.log("AutoConsole: created -> arr",e),e.length){var i,s=Object(l["a"])(e);try{for(s.s();!(i=s.n()).done;){var a=i.value;this.logList.push(a.data)}}catch(o){s.e(o)}finally{s.f()}}},mounted:function(){this.tabPaneH=this.$refs.detailRight.clientHeight-40},methods:{}},n=c,r=(i("6009"),i("2877")),v=Object(r["a"])(n,s,a,!1,null,"a9ee380e",null);e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-6e9b2712.66f27126.js.map