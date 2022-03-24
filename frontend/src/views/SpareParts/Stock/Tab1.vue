<!--
 * @Author: huangyh
 * @Date: 2022-03-10 10:37:17
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-14 14:49:14
-->
<template>
  <div ref="tabPanel" class="tabPanel">
    <div ref="searchPanel" class="searchPanel">
      <el-form ref="searchForm" :inline="true" size="small" :model="searchForm">
        <el-form-item label="备件名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-button size="mini" @click="resetData">还原所有数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="statisPanel" ref="statisPanel">
      <div class="statisItem">
        <p>{{ goodsNum }}</p>
        <p>商品总数</p>
      </div>
      <div class="statisItem">
        <p>{{ warningNum }}</p>
        <p>预警商品树</p>
      </div>
      <div class="statisItem">
        <p>{{ allStockList.length }}</p>
        <p>库存总数</p>
      </div>
      <div class="statisItem">
        <p>{{ normalNum }}</p>
        <p>正品总数</p>
      </div>
      <div class="statisItem">
        <p>{{ wasteNum }}</p>
        <p>废品总数</p>
      </div>
      <div class="statisItem">
        <p>{{ applyingNum }}</p>
        <p>申领中备件数</p>
      </div>
    </div>
    <div class="tablePanel" :style="{ height: tableHeight + 'px' }">
      <el-table :data="dataList" style="width: 100%" height="100%" class="tableGrow">
        <el-table-column label="操作" min-width="80" fixed>
          <template slot-scope="scope">
            <el-button type="text" @click="setWarning(scope.row)">设置预警</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="备件名称" show-overflow-tooltip min-width="180">
          <template slot-scope="scope">
            <span :class="scope.row.normal <= scope.row.warning ?'warning':''">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" show-overflow-tooltip label="备件编号" min-width="180" />
        <el-table-column prop="classify" show-overflow-tooltip label="所属类别" min-width="140">
          <template slot-scope="scope">{{ classify[scope.row.classify] }}</template>
        </el-table-column>
        <el-table-column prop="warehouse" label="备件仓库" min-width="140" />
        <el-table-column prop="normal" show-overflow-tooltip label="正品数量" min-width="140" >
          <template slot-scope="scope">
            <span :class="scope.row.normal <= scope.row.warning ?'warning':''">{{ scope.row.normal }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="waste" show-overflow-tooltip label="废品数量" min-width="140" />
        <el-table-column prop="warning" show-overflow-tooltip label="预警数量" min-width="140" />
        <el-table-column prop="unit" show-overflow-tooltip label="备件单位" min-width="140" />
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
    <el-dialog title="设置预警" width="30%" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form ref="warnForm" :inline="true" size="small" :model="warnForm">
        <el-row type="flex" align="middle">
          <el-col :span="20" :offset="2">
            <el-form-item label="预警数量" prop="warning">
              <el-input type="number" style="width:100%;" :min="0" v-model.number="warnForm.warning" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import array from "lodash/array";
import { parseTime } from "@/utils/index";
export default {
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
        name: "",
      },
      warnForm: {
        warning: 0,
      },
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapGetters(["classify", "allStockList", "applyingList"]),
    goodsNum() {
      let sum = 0;
      for (let item of this.allStockList) {
        sum += item.normal + item.waste;
      }
      return sum;
    },
    warningNum() {
      let count = 0;
      for (let item of this.allStockList) {
        if (item.normal <= item.warning) {
          count++;
        }
      }
      return count;
    },
    normalNum() {
      let sum = 0;
      for (let item of this.allStockList) {
        sum += item.normal;
      }
      return sum;
    },
    wasteNum() {
      let sum = 0;
      for (let item of this.allStockList) {
        sum += item.waste;
      }
      return sum;
    },
    applyingNum() {
      let sum = 0;
      for (let item of this.applyingList) {
        if (item.state == 1) {
          for (let part of item.parts) sum += part.apply;
        }
      }
      return sum;
    },
  },
  created() {
    console.log("AutoConsole: classify", this.classify);
    console.log("AutoConsole: allStockList", this.allStockList);
    console.log("AutoConsole: applyingList", this.applyingList);
    this.getList();
  },
  mounted() {
    this.tableHeight =
      this.$refs.tabPanel.clientHeight -
      this.$refs.searchPanel.clientHeight -
      this.$refs.statisPanel.clientHeight -
      90;
    window.onresize = () => {
      return (() => {
        this.tableHeight =
          this.$refs.tabPanel.clientHeight -
          this.$refs.searchPanel.clientHeight -
          this.$refs.statisPanel.clientHeight -
          90;
      })();
    };
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
      let searchData = this.allStockList.filter((i) =>
        i.name.includes(this.searchForm.name)
      );
      this.dataList = this.paging(
        searchData,
        this.pageInfo.pageNum,
        this.pageInfo.pageSize
      );
      this.total = searchData.length;
    },
    setWarning(row) {
      this.warnForm.warning = row.warning;
      this.warnForm.id = row.id;
      this.dialogFormVisible = true;
    },
    confirm() {
      this.$store.commit("demo/UPDATE_WARNING", this.warnForm);
      this.dialogFormVisible = false;
      this.search();
    },
    resetData() {
      this.$confirm("是否确认还原所有数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.clear();
          location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.tabPanel {
  height: 100%;
}
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
.statisPanel {
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  margin: 3px 0;
  background-color: #e6f3ff;
  .statisItem {
    p {
      line-height: 20px;
      text-align: center;
    }
  }
}
.warning {
  color: red;
}
</style>