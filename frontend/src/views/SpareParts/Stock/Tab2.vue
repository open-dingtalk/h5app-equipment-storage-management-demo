<!--
 * @Author: huangyh
 * @Date: 2022-03-10 10:37:17
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-10 14:17:15
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
    </div>
    <div class="tablePanel" :style="{ height: tableHeight + 'px' }">
      <el-table :data="dataList" style="width: 100%" height="100%" class="tableGrow">
        <el-table-column prop="name" label="备件名称" show-overflow-tooltip min-width="180">
        </el-table-column>
        <el-table-column prop="id" show-overflow-tooltip label="备件编号" min-width="180" />
        <el-table-column prop="state" show-overflow-tooltip label="所属类别" min-width="140">
          <template slot-scope="scope">{{ classify[scope.row.classify] }}</template>
        </el-table-column>
        <el-table-column prop="normal" show-overflow-tooltip label="正品数量" min-width="140" />
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
    }
  },
   computed: {
    ...mapGetters(["classify", "mimeStockList"]),
  },
  created() {
    console.log("AutoConsole: classify", this.classify);
    console.log("AutoConsole: mimeStockList", this.mimeStockList);
    this.getList();
  },
  mounted() {
    this.tableHeight =
      this.$refs.tabPanel.clientHeight -
      this.$refs.searchPanel.clientHeight -
      90;
    window.onresize = () => {
      return (() => {
        this.tableHeight =
          this.$refs.tabPanel.clientHeight -
          this.$refs.searchPanel.clientHeight -
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
      let searchData = this.mimeStockList.filter((i) =>
        i.name.includes(this.searchForm.name)
      );
      this.dataList = this.paging(
        searchData,
        this.pageInfo.pageNum,
        this.pageInfo.pageSize
      );
      this.total = searchData.length;
    },
  }
}
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
</style>