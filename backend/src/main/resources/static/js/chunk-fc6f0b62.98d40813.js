(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc6f0b62"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"34a4":function(t,e,a){"use strict";a("9f2a")},"4a72":function(t,e,a){},"690d":function(t,e,a){"use strict";a("4a72")},"841c":function(t,e,a){"use strict";var l=a("c65b"),o=a("d784"),i=a("825a"),n=a("1d80"),r=a("129f"),s=a("577e"),c=a("dc4a"),p=a("14c3");o("search",(function(t,e,a){return[function(e){var a=n(this),o=void 0==e?void 0:c(e,t);return o?l(o,e,a):new RegExp(e)[t](s(a))},function(t){var l=i(this),o=s(t),n=a(e,l,o);if(n.done)return n.value;var c=l.lastIndex;r(c,0)||(l.lastIndex=0);var u=p(l,o);return r(l.lastIndex,c)||(l.lastIndex=c),null===u?-1:u.index}]}))},"9f2a":function(t,e,a){},b84f:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"mainPanel",staticClass:"mainPanel"},[a("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"备件入库",name:"1"}},[1==t.activeName?a("div",{style:{height:t.tabHeight+"px"}},[t.loaded?a("Tab1"):t._e()],1):t._e()]),a("el-tab-pane",{attrs:{label:"备件出库",name:"2"}},[2==t.activeName?a("div",{style:{height:t.tabHeight+"px"}},[t.loaded?a("Tab2"):t._e()],1):t._e()])],1)],1)},o=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"mainPanel",staticClass:"mainPanel"},[a("div",{ref:"searchPanel",staticClass:"searchPanel"},[a("el-form",{ref:"searchForm",attrs:{inline:!0,size:"small",model:t.searchForm}},[a("el-form-item",{attrs:{label:"申领单号：",prop:"id"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.searchForm.id,callback:function(e){t.$set(t.searchForm,"id",e)},expression:"searchForm.id"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.search}},[t._v("查询")]),a("el-button",{attrs:{size:"mini"},on:{click:t.resetForm}},[t._v("重置")])],1)],1),a("el-form",{ref:"bynForm",attrs:{inline:!0,size:"small"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.stockIn}},[t._v("入库")])],1)],1)],1),a("div",{staticClass:"tablePanel",style:{height:t.tableHeight+"px"}},[a("el-table",{staticClass:"tableGrow",staticStyle:{width:"100%"},attrs:{data:t.dataList,height:"100%"}},[a("el-table-column",{attrs:{label:"操作","min-width":"80",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.state?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.cancelApply(e.row)}}},[t._v("取消入库")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"id",label:"申领单号","show-overflow-tooltip":"","min-width":"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.handleDetail(e.row)}}},[t._v(t._s(e.row.id))])]}}])}),a("el-table-column",{attrs:{prop:"warehouse","show-overflow-tooltip":"",label:"申领仓库","min-width":"140"}}),a("el-table-column",{attrs:{prop:"count",label:"备件总数","min-width":"140"}}),a("el-table-column",{attrs:{prop:"state","show-overflow-tooltip":"",label:"状态","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.stockState[e.row.state]))]}}])}),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间","min-width":"160"}}),a("el-table-column",{attrs:{prop:"remark","show-overflow-tooltip":"",label:"备注","min-width":"200"}})],1)],1),a("div",{staticClass:"pagePanel"},[a("el-pagination",{attrs:{background:"","current-page":t.pageInfo.pageNum,"page-sizes":[10,20,30,40],"page-size":t.pageInfo.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){return t.$set(t.pageInfo,"pageNum",e)},"update:current-page":function(e){return t.$set(t.pageInfo,"pageNum",e)},"update:pageSize":function(e){return t.$set(t.pageInfo,"pageSize",e)},"update:page-size":function(e){return t.$set(t.pageInfo,"pageSize",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"备件入库",width:"70%",visible:t.dialogFormVisible,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-table",{staticClass:"tableGrow",attrs:{data:t.applyTabList,height:"200"}},[a("el-table-column",{attrs:{prop:"name",label:"备件名称","show-overflow-tooltip":"","min-width":"140"}}),a("el-table-column",{attrs:{prop:"normal",label:"备件数量","min-width":"160"}}),a("el-table-column",{attrs:{prop:"classify","show-overflow-tooltip":"",label:"备件类别","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.classify[e.row.classify]))]}}])}),a("el-table-column",{attrs:{prop:"apply",label:"入库数量","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{staticStyle:{width:"100%"},attrs:{type:"number",min:1,max:9999,placeholder:"请输入",clearable:""},on:{blur:function(t){""==e.row.apply&&(e.row.apply=1),e.row.apply>9999&&(e.row.apply=9999),e.row.apply<1&&(e.row.apply=1)}},model:{value:e.row.apply,callback:function(a){t.$set(e.row,"apply",t._n(a))},expression:"scope.row.apply"}})]}}])})],1),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"text"},on:{click:t.addStock}},[t._v("添加备件")])],1),a("el-form",{ref:"applyForm",attrs:{"label-width":"80px",size:"small",model:t.applyForm}},[a("el-form-item",{attrs:{label:"备注：",prop:"warning"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea",row:5,placeholder:"请输入",clearable:""},model:{value:t.applyForm.remark,callback:function(e){t.$set(t.applyForm,"remark",e)},expression:"applyForm.remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.confirmApply}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"选择备件",width:"60%",visible:t.dialogFormStock,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogFormStock=e}}},[a("el-table",{ref:"mStock",staticClass:"tableGrow",attrs:{data:t.allStockListTemp,"row-key":"id",height:"300px"},on:{select:t.selectiontable}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{prop:"name",label:"备件名称","show-overflow-tooltip":"","min-width":"140"}}),a("el-table-column",{attrs:{prop:"normal",label:"备件数量","min-width":"160"}}),a("el-table-column",{attrs:{prop:"classify","show-overflow-tooltip":"",label:"备件类别","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.classify[e.row.classify]))]}}])})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogFormStock=!1}}},[t._v("取 消")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.confirmStock}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"查看",width:"60%",visible:t.dialogFormCheck,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogFormCheck=e}}},[a("el-table",{ref:"mStock",staticClass:"tableGrow",attrs:{data:t.currentRow.parts,height:"300px"}},[a("el-table-column",{attrs:{prop:"name",label:"备件名称","show-overflow-tooltip":"","min-width":"140"}}),a("el-table-column",{attrs:{prop:"apply",label:"入库数量","min-width":"160"}}),a("el-table-column",{attrs:{prop:"classify","show-overflow-tooltip":"",label:"备件类别","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.classify[e.row.classify]))]}}])})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.dialogFormCheck=!1}}},[t._v("确 定")])],1)],1)],1)},n=[],r=a("b85c"),s=a("5530"),c=(a("ac1f"),a("841c"),a("4de4"),a("caad"),a("2532"),a("5319"),a("d3b7"),a("25f0"),a("2f62")),p=a("0cd6"),u=a.n(p),m=a("ed08"),f={components:{},filters:{},data:function(){return{pageInfo:{pageNum:1,pageSize:10},total:0,dataList:[],tableHeight:0,searchForm:{id:""},stockState:{1:"待审批",2:"已通过",3:"已拒绝",4:"已取消"},applyForm:{remark:""},dialogFormVisible:!1,applyTabList:[],dialogFormStock:!1,selection:[],dialogFormCheck:!1,currentRow:{},allStockListTemp:[]}},computed:Object(s["a"])({},Object(c["b"])(["classify","allStockList","allStockInList"])),created:function(){console.log("AutoConsole: allStockInList",this.allStockInList),this.getList()},mounted:function(){var t=this;this.tableHeight=this.$refs.mainPanel.clientHeight-this.$refs.searchPanel.clientHeight-90,window.onresize=function(){return function(){t.tableHeight=t.$refs.mainPanel.clientHeight-t.$refs.searchPanel.clientHeight-90}()},this.allStockListTemp=JSON.parse(JSON.stringify(this.allStockList));var e,a=Object(r["a"])(this.allStockListTemp);try{for(a.s();!(e=a.n()).done;){var l=e.value;l["apply"]=1}}catch(o){a.e(o)}finally{a.f()}},beforeDestroy:function(){window.onresize=null},methods:{paging:function(t,e,a){if(!t)return[];var l=u.a.drop(t,a*(e-1)),o=u.a.take(l,a);return o},handleSizeChange:function(t){this.pageInfo.pageNum=1,this.getList()},handleCurrentChange:function(t){this.pageInfo.pageNum=t,this.getList()},search:function(){this.pageInfo.pageNum=1,this.getList()},resetForm:function(){this.$refs.searchForm.resetFields(),this.search()},getList:function(){var t=this,e=this.allStockInList.filter((function(e){return e.id.includes(t.searchForm.id)}));this.dataList=this.paging(e,this.pageInfo.pageNum,this.pageInfo.pageSize),this.total=e.length},handleDetail:function(t){this.currentRow=t,this.dialogFormCheck=!0},stockIn:function(){this.applyTabList=[],this.selection=[],this.dialogFormVisible=!0},confirmApply:function(){if(0==this.applyTabList.length)return this.$message.warning("请选择备件！"),!1;var t={id:this.generateUUID(),createTime:Object(m["b"])(new Date),warehouse:"总仓库",count:this.applyTabList.length,state:1,remark:this.applyForm.remark,parts:this.applyTabList,type:2};this.$store.commit("demo/ADD_ALLSTOCKINLIST",t),this.search(),this.dialogFormVisible=!1},addStock:function(){var t=this;this.dialogFormStock=!0,this.$nextTick((function(){var e,a=Object(r["a"])(t.allStockListTemp);try{var l=function(){var a=e.value,l=t.applyTabList.filter((function(t){return t.id==a.id}));l.length>0?(a["apply"]=l[0]["apply"],t.$refs.mStock.toggleRowSelection(a,!0)):a["apply"]=1};for(a.s();!(e=a.n()).done;)l()}catch(o){a.e(o)}finally{a.f()}}))},selectable:function(t,e){return t.normal>0},selectiontable:function(t,e){this.selection=t},confirmStock:function(){this.applyTabList=JSON.parse(JSON.stringify(this.selection)),this.dialogFormStock=!1},generateUUID:function(){var t=(new Date).getTime();window.performance&&"function"===typeof window.performance.now&&(t+=performance.now());var e="xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(function(e){var a=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?a:3&a|8).toString(16)}));return e},cancelApply:function(t){var e=this;this.$confirm("是否确认取消入库?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$store.commit("demo/DEL_ALLSTOCKINLIST",t),e.search()})).catch((function(){e.$message({type:"info",message:"已取消"})}))}}},d=f,h=(a("690d"),a("2877")),b=Object(h["a"])(d,i,n,!1,null,"3e0f236c",null),g=b.exports,w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"mainPanel",staticClass:"mainPanel"},[a("div",{ref:"searchPanel",staticClass:"searchPanel"},[a("el-form",{ref:"searchForm",attrs:{inline:!0,size:"small",model:t.searchForm}},[a("el-form-item",{attrs:{label:"申领单号：",prop:"id"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:t.searchForm.id,callback:function(e){t.$set(t.searchForm,"id",e)},expression:"searchForm.id"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.search}},[t._v("查询")]),a("el-button",{attrs:{size:"mini"},on:{click:t.resetForm}},[t._v("重置")])],1)],1),a("el-form",{ref:"bynForm",attrs:{inline:!0,size:"small"}},[a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.apply}},[t._v("出库")])],1)],1)],1),a("div",{staticClass:"tablePanel",style:{height:t.tableHeight+"px"}},[a("el-table",{staticClass:"tableGrow",staticStyle:{width:"100%"},attrs:{data:t.dataList,height:"100%"}},[a("el-table-column",{attrs:{label:"操作","min-width":"80",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.state?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.cancelApply(e.row)}}},[t._v("取消出库")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"id",label:"申领单号","show-overflow-tooltip":"","min-width":"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-link",{attrs:{type:"primary"},on:{click:function(a){return t.handleDetail(e.row)}}},[t._v(t._s(e.row.id))])]}}])}),a("el-table-column",{attrs:{prop:"warehouse","show-overflow-tooltip":"",label:"申领仓库","min-width":"140"}}),a("el-table-column",{attrs:{prop:"count",label:"备件总数","min-width":"140"}}),a("el-table-column",{attrs:{prop:"state","show-overflow-tooltip":"",label:"状态","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.stockState[e.row.state]))]}}])}),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间","min-width":"160"}}),a("el-table-column",{attrs:{prop:"remark","show-overflow-tooltip":"",label:"备注","min-width":"200"}})],1)],1),a("div",{staticClass:"pagePanel"},[a("el-pagination",{attrs:{background:"","current-page":t.pageInfo.pageNum,"page-sizes":[10,20,30,40],"page-size":t.pageInfo.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"update:currentPage":function(e){return t.$set(t.pageInfo,"pageNum",e)},"update:current-page":function(e){return t.$set(t.pageInfo,"pageNum",e)},"update:pageSize":function(e){return t.$set(t.pageInfo,"pageSize",e)},"update:page-size":function(e){return t.$set(t.pageInfo,"pageSize",e)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"备件出库",width:"70%",visible:t.dialogFormVisible,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-table",{staticClass:"tableGrow",attrs:{data:t.applyTabList,height:"200"}},[a("el-table-column",{attrs:{prop:"name",label:"备件名称","show-overflow-tooltip":"","min-width":"140"}}),a("el-table-column",{attrs:{prop:"normal",label:"备件数量","min-width":"160"}}),a("el-table-column",{attrs:{prop:"classify","show-overflow-tooltip":"",label:"备件类别","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.classify[e.row.classify]))]}}])}),a("el-table-column",{attrs:{prop:"apply",label:"出库数量","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{staticStyle:{width:"100%"},attrs:{type:"number",min:1,max:e.row.normal,placeholder:"请输入",clearable:""},on:{blur:function(t){""==e.row.apply&&(e.row.apply=1),e.row.apply>e.row.normal&&(e.row.apply=e.row.normal),e.row.apply<1&&(e.row.apply=1)}},model:{value:e.row.apply,callback:function(a){t.$set(e.row,"apply",t._n(a))},expression:"scope.row.apply"}})]}}])})],1),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"text"},on:{click:t.addStock}},[t._v("添加备件")])],1),a("el-form",{ref:"applyForm",attrs:{"label-width":"80px",size:"small",model:t.applyForm}},[a("el-form-item",{attrs:{label:"备注：",prop:"warning"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea",row:5,placeholder:"请输入",clearable:""},model:{value:t.applyForm.remark,callback:function(e){t.$set(t.applyForm,"remark",e)},expression:"applyForm.remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.confirmApply}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"选择备件",width:"60%",visible:t.dialogFormStock,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogFormStock=e}}},[a("el-table",{ref:"mStock",staticClass:"tableGrow",attrs:{data:t.allStockListTemp,"row-key":"id",height:"300px"},on:{select:t.selectiontable}},[a("el-table-column",{attrs:{type:"selection",width:"55",selectable:t.selectable}}),a("el-table-column",{attrs:{prop:"name",label:"备件名称","show-overflow-tooltip":"","min-width":"140"}}),a("el-table-column",{attrs:{prop:"normal",label:"备件数量","min-width":"160"}}),a("el-table-column",{attrs:{prop:"classify","show-overflow-tooltip":"",label:"备件类别","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.classify[e.row.classify]))]}}])})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogFormStock=!1}}},[t._v("取 消")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.confirmStock}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"查看",width:"60%",visible:t.dialogFormCheck,"modal-append-to-body":!1},on:{"update:visible":function(e){t.dialogFormCheck=e}}},[a("el-table",{ref:"mStock",staticClass:"tableGrow",attrs:{data:t.currentRow.parts,height:"300px"}},[a("el-table-column",{attrs:{prop:"name",label:"备件名称","show-overflow-tooltip":"","min-width":"140"}}),a("el-table-column",{attrs:{prop:"apply",label:"出库数量","min-width":"160"}}),a("el-table-column",{attrs:{prop:"classify","show-overflow-tooltip":"",label:"备件类别","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.classify[e.row.classify]))]}}])})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.dialogFormCheck=!1}}},[t._v("确 定")])],1)],1)],1)},y=[],v={components:{},filters:{},data:function(){return{pageInfo:{pageNum:1,pageSize:10},total:0,dataList:[],tableHeight:0,searchForm:{id:""},stockState:{1:"待审批",2:"已通过",3:"已拒绝",4:"已取消"},applyForm:{remark:""},dialogFormVisible:!1,applyTabList:[],dialogFormStock:!1,selection:[],dialogFormCheck:!1,currentRow:{},allStockListTemp:[]}},computed:Object(s["a"])({},Object(c["b"])(["classify","allStockList","allStockOutList"])),created:function(){console.log("AutoConsole: allStockOutList",this.allStockOutList),this.getList()},mounted:function(){var t=this;this.tableHeight=this.$refs.mainPanel.clientHeight-this.$refs.searchPanel.clientHeight-90,window.onresize=function(){return function(){t.tableHeight=t.$refs.mainPanel.clientHeight-t.$refs.searchPanel.clientHeight-90}()},this.allStockListTemp=JSON.parse(JSON.stringify(this.allStockList));var e,a=Object(r["a"])(this.allStockListTemp);try{for(a.s();!(e=a.n()).done;){var l=e.value;l["apply"]=1}}catch(o){a.e(o)}finally{a.f()}},beforeDestroy:function(){window.onresize=null},methods:{paging:function(t,e,a){if(!t)return[];var l=u.a.drop(t,a*(e-1)),o=u.a.take(l,a);return o},handleSizeChange:function(t){this.pageInfo.pageNum=1,this.getList()},handleCurrentChange:function(t){this.pageInfo.pageNum=t,this.getList()},search:function(){this.pageInfo.pageNum=1,this.getList()},resetForm:function(){this.$refs.searchForm.resetFields(),this.search()},getList:function(){var t=this,e=this.allStockOutList.filter((function(e){return e.id.includes(t.searchForm.id)}));this.dataList=this.paging(e,this.pageInfo.pageNum,this.pageInfo.pageSize),this.total=e.length},handleDetail:function(t){this.currentRow=t,this.dialogFormCheck=!0},apply:function(){this.applyTabList=[],this.selection=[],this.dialogFormVisible=!0},confirmApply:function(){if(0==this.applyTabList.length)return this.$message.warning("请选择备件！"),!1;var t={id:this.generateUUID(),createTime:Object(m["b"])(new Date),warehouse:"总仓库",count:this.applyTabList.length,state:1,remark:this.applyForm.remark,parts:this.applyTabList,type:3};this.$store.commit("demo/ADD_ALLSTOCKOUTLIST",t),this.search(),this.dialogFormVisible=!1},addStock:function(){var t=this;this.dialogFormStock=!0,this.$nextTick((function(){var e,a=Object(r["a"])(t.allStockListTemp);try{var l=function(){var a=e.value,l=t.applyTabList.filter((function(t){return t.id==a.id}));l.length>0?(a["apply"]=l[0]["apply"],t.$refs.mStock.toggleRowSelection(a,!0)):a["apply"]=1};for(a.s();!(e=a.n()).done;)l()}catch(o){a.e(o)}finally{a.f()}}))},selectable:function(t,e){return t.normal>0},selectiontable:function(t,e){this.selection=t},confirmStock:function(){this.applyTabList=JSON.parse(JSON.stringify(this.selection)),this.dialogFormStock=!1},generateUUID:function(){var t=(new Date).getTime();window.performance&&"function"===typeof window.performance.now&&(t+=performance.now());var e="xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(function(e){var a=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?a:3&a|8).toString(16)}));return e},cancelApply:function(t){var e=this;this.$confirm("是否确认取消出库?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$store.commit("demo/DEL_ALLSTOCKOUTLIST",t),e.search()})).catch((function(){e.$message({type:"info",message:"已取消"})}))}}},k=v,x=(a("34a4"),Object(h["a"])(k,w,y,!1,null,"1db853a0",null)),S=x.exports,F={components:{Tab1:g,Tab2:S},data:function(){return{activeName:"1",tabHeight:0,loaded:!1}},mounted:function(){var t=this;this.tabHeight=this.$refs.mainPanel.clientHeight-40,window.onresize=function(){return function(){t.tabHeight=t.$refs.mainPanel.clientHeight-40}()},this.loaded=!0},beforeDestroy:function(){window.onresize=null}},_=F,L=Object(h["a"])(_,l,o,!1,null,null,null);e["default"]=L.exports}}]);
//# sourceMappingURL=chunk-fc6f0b62.98d40813.js.map