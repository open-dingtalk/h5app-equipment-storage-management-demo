<!--
 * @Author: huangyh
 * @Date: 2022-03-10 14:33:41
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-23 10:47:45
-->
<template>
  <div ref="mainPanel" class="mainPanel">
    <div ref="searchPanel" class="searchPanel">
      <el-form ref="searchForm" :inline="true" size="small" :model="searchForm">
        <el-form-item label="申领单号：" prop="id">
          <el-input v-model="searchForm.id" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="bynForm" :inline="true" size="small">
        <el-form-item>
          <el-button type="primary" size="mini" @click="apply">申领</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tablePanel" :style="{ height: tableHeight + 'px' }">
      <el-table :data="dataList" style="width: 100%" height="100%" class="tableGrow">
        <el-table-column label="操作" min-width="80" fixed>
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.state == 1" @click="cancelApply(scope.row)">取消申领</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="申领单号" show-overflow-tooltip min-width="240">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDetail(scope.row)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="warehouse" show-overflow-tooltip label="申领仓库" min-width="140" />
        <el-table-column prop="count" label="备件总数" min-width="140" />
        <el-table-column prop="state" show-overflow-tooltip label="状态" min-width="140">
          <template slot-scope="scope">{{ stockState[scope.row.state] }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="160" />
        <el-table-column prop="remark" show-overflow-tooltip label="备注" min-width="200" />
      </el-table>
    </div>
    <div class="pagePanel">
      <el-pagination
        background
        :current-page.sync="pageInfo.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="申领备件" width="70%" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-table :data="applyTabList" height="200" class="tableGrow">
        <el-table-column prop="name" label="备件名称" show-overflow-tooltip min-width="140"></el-table-column>
        <el-table-column prop="normal" label="备件数量" min-width="160" />
        <el-table-column prop="classify" show-overflow-tooltip label="备件类别" min-width="140">
          <template slot-scope="scope">{{ classify[scope.row.classify] }}</template>
        </el-table-column>
        <el-table-column prop="mimeStockNum" label="个仓数量" min-width="140" />
        <el-table-column prop="apply" label="申领数量" min-width="140">
          <template slot-scope="scope">
            <el-input
              type="number"
              style="width:100%;"
              :min="1"
              :max="scope.row.normal"
              @blur="if(scope.row.apply == '')scope.row.apply = 1;if(scope.row.apply > scope.row.normal) scope.row.apply=scope.row.normal;if(scope.row.apply < 1) scope.row.apply=1;"
              v-model.number="scope.row.apply"
              placeholder="请输入"
              clearable
            />
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-button type="text" @click="addStock">添加备件</el-button>
      </div>
      <el-form ref="applyForm" label-width="80px" size="small" :model="applyForm">
        <el-form-item label="备注：" prop="warning">
          <el-input type="textarea" style="width:100%;" :row="5" v-model="applyForm.remark" placeholder="请输入" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmApply">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择备件" width="60%" v-if="dialogFormStock" :visible.sync="dialogFormStock" :modal-append-to-body="false">
      <el-table :data="allStockListTemp" row-key="id" height="300px" ref="mStock" class="tableGrow" @select="selectiontable">
        <el-table-column type="selection" width="55" :selectable="selectable" />
        <el-table-column prop="name" label="备件名称" show-overflow-tooltip min-width="140" />
        <el-table-column prop="normal" label="备件数量" min-width="160" />
        <el-table-column prop="classify" show-overflow-tooltip label="备件类别" min-width="140">
          <template slot-scope="scope">{{ classify[scope.row.classify] }}</template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormStock = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmStock">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" width="60%" :visible.sync="dialogFormCheck" :modal-append-to-body="false">
      <el-table :data="currentRow.parts" height="300px" ref="mStock" class="tableGrow">
        <el-table-column prop="name" label="备件名称" show-overflow-tooltip min-width="140" />
        <el-table-column prop="apply" label="申领数量" min-width="160" />
        <el-table-column prop="classify" show-overflow-tooltip label="备件类别" min-width="140">
          <template slot-scope="scope">{{ classify[scope.row.classify] }}</template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogFormCheck = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import array from "lodash/array";
import { parseTime } from "@/utils/index";
export default {
  components: {},
  filters: {},
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      dataList: [],
      tableHeight: 0,
      searchForm: {
        id: "",
      },
      stockState: {
        1: "待审批",
        2: "已通过",
        3: '已拒绝',
        4: '已取消'
      },
      applyForm: {
        remark: "",
      },
      dialogFormVisible: false,
      applyTabList: [],
      dialogFormStock: false,
      selection: [],
      dialogFormCheck: false,
      currentRow: {},
      allStockListTemp: []
    };
  },
  computed: {
    ...mapGetters(["classify", "allStockList", "applyingList"]),
  },
  created() {
    console.log("AutoConsole: applyingList", this.applyingList);
    this.getList();
  },
  mounted() {
    this.tableHeight =
      this.$refs.mainPanel.clientHeight -
      this.$refs.searchPanel.clientHeight -
      90;
    window.onresize = () => {
      return (() => {
        this.tableHeight =
          this.$refs.mainPanel.clientHeight -
          this.$refs.searchPanel.clientHeight -
          90;
      })();
    };
    this.allStockListTemp = JSON.parse(JSON.stringify(this.allStockList))
    for(let item of this.allStockListTemp){
      item['apply'] = 1;
    }
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    paging(list, pageIndex, pageSize) {
      if (!list) return [];
      const skipList = array.drop(list, pageSize * (pageIndex - 1));
      const pageData = array.take(skipList, pageSize);
      return pageData;
    },
    handleSizeChange(size) {
      this.pageInfo.pageNum = 1;
      this.getList();
    },
    handleCurrentChange(index) {
      this.pageInfo.pageNum = index;
      this.getList();
    },
    search() {
      this.pageInfo.pageNum = 1;
      this.getList();
    },
    resetForm() {
      this.$refs.searchForm.resetFields();
      this.search();
    },
    getList() {
      let searchData = this.applyingList.filter((i) =>
        i.id.includes(this.searchForm.id)
      );
      this.dataList = this.paging(
        searchData,
        this.pageInfo.pageNum,
        this.pageInfo.pageSize
      );
      this.total = searchData.length;
    },
    handleDetail(item) {
      this.currentRow = item;
      this.dialogFormCheck = true;
    },
    apply() {
      this.applyTabList = [];
      this.selection = [];
      this.dialogFormVisible = true;
    },
    confirmApply() {
      if(this.applyTabList.length == 0){
        this.$message.warning('请选择备件！');
        return false;
      }
      let temp = {
        id: this.generateUUID(),
        createTime: parseTime(new Date()),
        warehouse: '个人仓库',
        count: this.applyTabList.length,
        state: 1, // 1待审批，2已通过，3审批中
        remark: this.applyForm.remark,
        parts: this.applyTabList,
        type: 1 // 1个人，2总仓库入库，3总仓库出库
      }
      this.$store.commit('demo/ADD_APPLYINGLIST', temp);
      this.search();
      this.dialogFormVisible = false;
    },
    addStock() {
      this.dialogFormStock = true;
      this.$nextTick(() => {
        for (let row of this.allStockListTemp) {
          let data = this.applyTabList.filter((i) => i.id == row.id);
          if (data.length > 0) {
            row['apply'] = data[0]['apply'];
            this.$refs.mStock.toggleRowSelection(row, true);
          }else {
            row['apply'] = 1
          }
        }
      });
    },
    selectable(row, index) {
      return row.normal > 0;
    },
    selectiontable(selection, row) {
      this.selection = selection;
    },
    confirmStock() {
      this.applyTabList = JSON.parse(JSON.stringify(this.selection));
      this.dialogFormStock = false;
    },
    generateUUID() {
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
      }
      var uuid = "xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    cancelApply(row) {
      this.$confirm("是否确认取消申领?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.commit('demo/DEL_APPLYINGLIST',row);
          this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.btnsPanel {
  margin-bottom: 10px;
}
.previewBox {
  display: flex;
  & > div {
    height: 600px;
  }
  .previewBoxLeft {
    flex-grow: 1;
    padding: 20px;
    .previewBoxLeftTop {
      border-bottom: 1px solid #e5e5e5;
      padding: 0 0 20px 0;
      .previewBoxLeftTopTitle {
        font-size: 26px;
        font-weight: bold;
        line-height: 38px;
      }
      .previewBoxLeftTopNum {
        font-size: 18px;
        line-height: 38px;
      }
      .previewBoxLeftTopBtns {
        text-align: right;
        padding-right: 20px;
      }
    }
    .previewBoxLeftBom {
      padding: 20px 0 0 0;
    }
  }
  .previewBoxRight {
    flex-grow: 2;
    overflow: auto;
    .previewBoxRightHtml {
      width: 100%;
    }
  }
}
</style>
