<!--
 * @Author: huangyh
 * @Date: 2022-03-10 14:33:41
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-23 15:14:36
-->
<template>
  <div ref="mainPanel" class="mainPanel">
    <div ref="searchPanel" class="searchPanel">
      <el-form ref="searchForm" :inline="true" size="small" :model="searchForm">
        <el-form-item>
          <el-radio-group v-model="approveState" size="mini" @change="search">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">待审批</el-radio-button>
            <el-radio-button label="2">已通过</el-radio-button>
            <el-radio-button label="3">已拒绝</el-radio-button>
            <el-radio-button label="4">已取消</el-radio-button>
            <el-radio-button label="5">审批中</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="申领单号：" prop="id">
          <el-input v-model="searchForm.id" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tablePanel" :style="{ height: tableHeight + 'px' }">
      <el-table :data="dataList" style="width: 100%" height="100%" class="tableGrow">
        <el-table-column label="操作" min-width="120" fixed>
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.state != 1" @click="initiatorApply(scope.row)">发起审批</el-button>
            <!-- <el-button type="text" v-if="scope.row.state == 1" @click="refuseApply(scope.row)">拒绝</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="id" label="申领单号" show-overflow-tooltip min-width="240">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleDetail(scope.row)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="warehouse" show-overflow-tooltip label="申领仓库" min-width="140" />
        <el-table-column prop="type" show-overflow-tooltip label="操作类别" min-width="140">
          <template slot-scope="scope">{{ stockType[scope.row.type] }}</template>
        </el-table-column>
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
    <!-- <el-dialog title="申领备件" width="70%" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
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
              @blur="if(scope.row.apply > scope.row.normal) scope.row.apply=scope.row.normal;if(scope.row.apply < 1) scope.row.apply=1;"
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
    </el-dialog>-->
    <el-dialog title="查看" width="60%" :visible.sync="dialogFormCheck" :modal-append-to-body="false">
      <el-table :data="currentRow.parts" height="300px" ref="mStock" class="tableGrow">
        <el-table-column prop="name" label="备件名称" show-overflow-tooltip min-width="140" />
        <el-table-column prop="apply" :label="stockType[currentRow.type] + '数量'" min-width="160" />
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
        3: "已拒绝",
        4: "已取消",
        5: "审批中"
      },
      stockType: {
        1: "申领",
        2: "入库",
        3: "出库",
      },
      approveState: "0",
      dialogFormVisible: false,
      dialogFormCheck: false,
      currentRow: {},
      allStockListTemp: [],
    };
  },
  computed: {
    ...mapGetters([
      "classify",
      "allStockList",
      "mimeStockList",
      "allStockInList",
      "allStockOutList",
      "applyingList",
      "process_code",
      "userInfo",
      "process_instance_id",
      "corpId",
    ]),
  },
  created() {
    console.log("AutoConsole: allStockInList", this.allStockInList);
    console.log("AutoConsole: allStockOutList", this.allStockOutList);
    console.log("AutoConsole: applyingList", this.applyingList);
    this.allStockListTemp = [
      ...this.allStockInList,
      ...this.allStockOutList,
      ...this.applyingList,
    ].sort((a, b) => {
      return new Date(b.createTime) - new Date(a.createTime);
    });
    this.getList();
    this.isExistTemplate();
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
      let searchData = this.allStockListTemp.filter((i) =>
        i.id.includes(this.searchForm.id)
      );
      if (this.approveState != 0) {
        searchData = searchData.filter((i) => i.state == this.approveState);
      }
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
    // 发起审批
    initiatorApply(row) {
      this.currentRow = row;
      this.$http
        .post("/biz/createInstance", {
          title: "备件申领",
          url:
            location.origin + "/#/spareParts/approve/detail?stockId=" + row.id,
          originatorUserId: this.userInfo.userId,
          processCode: this.process_code,
          //只传一个数组对象
          formComponentValues: [
            {
              name: "是否同意",
              value: row.type == 1 ? "申领审批" : "出入库审批",
            },
          ],
        })
        .then((res) => {
          if (res.success) {
            this.$store.commit(
              "demo/SET_PROCESSINSTANCEID",
              res.data.process_instance_id
            );
            this.chooseApplyer();
          }
        });
    },
    chooseApplyer() {
      let self = this;
      if (this.$dd) {
        try {
          this.$dd.ready(function () {
            console.log("DDJSAPI初始化完成");
            self.$dd.biz.contact.choose({
              multiple: false, //是否多选：true多选 false单选； 默认true
              users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
              corpId: self.corpId, //企业id
              max: 1, //人数限制，当multiple为true才生效，可选范围1-1500
              onSuccess: function (data) {
                console.log("AutoConsole: chooseApplyer -> data", data);
                self.$http
                  .post("/biz/createTodoItem", {
                    processInstanceId: self.process_instance_id,
                    activityId: "",
                    //只传一个数组对象
                    tasks: [
                      {
                        userId: data.map((v) => v.emplId).join(","),
                        url:
                          location.origin +
                          "/#/spareParts/approve/detail?stockId=" +
                          self.currentRow.id,
                      },
                    ],
                  })
                  .then((res) => {
                    if (res.success) {
                      self.updateData();
                    }
                  });
              },
              onFail: function (err) {
                console.log(err);
              },
            });
          });
        } catch (e) {
          console.log(e);
        } finally {
        }
      }
    },
    updateData() {
      this.$store.commit("demo/UPDATE_STOCKLISTSTATE", {
        type: this.currentRow.type,
        state: 5,
        id: this.currentRow.id,
      });
      this.allStockListTemp = [
        ...this.allStockInList,
        ...this.allStockOutList,
        ...this.applyingList,
      ].sort((a, b) => {
        return new Date(b.createTime) - new Date(a.createTime);
      });
      this.search();
    },
    isExistTemplate() {
      this.$http
        .get("/biz/getTemplateCode", {
          params: {
            name: "备件申领审批",
          },
        })
        .then((res) => {
          if (res.success) {
            this.$store.commit("demo/SET_PROCESSCODE", res.data.process_code);
          } else {
            this.createTemplate();
          }
        });
    },
    createTemplate() {
      this.$http
        .post("/biz/createOrUpdateApprovalTemplate", {
          name: "备件申领审批",
          //只传一个数组对象
          props: [
            {
              id: "TextField-J78F0563",
              label: "是否同意",
              required: true,
            },
          ],
        })
        .then((res) => {
          if (res.success) {
            this.$store.commit("demo/SET_PROCESSCODE", res.data.process_code);
          }
        });
    },
    agreeApply(row) {
      this.$confirm("确认同意该操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let stockNames = [];
          if (row.type == 1) {
            for (let item of row.parts) {
              let allStockIndex = this.allStockList.findIndex(
                (i) => i.id == item.id
              );
              let mimeStockIndex = this.mimeStockList.findIndex(
                (i) => i.id == item.id
              );
              if (this.allStockList[allStockIndex].normal < item.apply) {
                stockNames.push(this.allStockList[allStockIndex].name);
              } else {
                this.$store.commit("demo/UPDATE_ALLSTOCKLIST_NORMAL", {
                  id: this.allStockList[allStockIndex].id,
                  normal: this.allStockList[allStockIndex].normal - item.apply,
                });
                this.$store.commit("demo/UPDATE_ALLSTOCKLIST_MIMESTOCKNUM", {
                  id: this.allStockList[allStockIndex].id,
                  apply: item.apply,
                });
                if (mimeStockIndex != -1) {
                  this.$store.commit("demo/UPDATE_MIMESTOCKLIST_NORMAL", {
                    id: this.mimeStockList[mimeStockIndex].id,
                    normal:
                      Number(this.mimeStockList[mimeStockIndex].normal) +
                      Number(item.apply),
                  });
                } else {
                  let data = JSON.parse(
                    JSON.stringify(this.allStockList[allStockIndex])
                  );
                  data["normal"] = item.apply;
                  this.$store.commit("demo/ADD_MIMESTOCKLIST", data);
                }
              }
            }
          } else if (row.type == 2) {
            for (let item of row.parts) {
              let allStockIndex = this.allStockList.findIndex(
                (i) => i.id == item.id
              );
              this.$store.commit("demo/UPDATE_ALLSTOCKLIST_NORMAL", {
                id: this.allStockList[allStockIndex].id,
                normal:
                  Number(this.allStockList[allStockIndex].normal) +
                  Number(item.apply),
              });
            }
          } else {
            for (let item of row.parts) {
              let allStockIndex = this.allStockList.findIndex(
                (i) => i.id == item.id
              );
              if (this.allStockList[allStockIndex].normal < item.apply) {
                stockNames.push(this.allStockList[allStockIndex].name);
              } else {
                this.$store.commit("demo/UPDATE_ALLSTOCKLIST_NORMAL", {
                  id: this.allStockList[allStockIndex].id,
                  normal: this.allStockList[allStockIndex].normal - item.apply,
                });
              }
            }
          }
          this.$store.commit("demo/UPDATE_STOCKLISTSTATE", {
            id: row.id,
            type: row.type,
            state: 2,
          });
          if (stockNames.length > 0) {
            this.$message.error(
              stockNames.toString() + " 库存不足，操作失败！"
            );
          }
          this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    refuseApply(row) {
      this.$confirm("确认拒绝该操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.commit("demo/UPDATE_STOCKLISTSTATE", {
            id: row.id,
            type: row.type,
            state: 3,
          });
          this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
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
