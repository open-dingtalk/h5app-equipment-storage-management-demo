<!--
 * @Author: huangyh
 * @Date: 2022-03-10 10:20:56
 * @LastEditors: huangyh
 * @LastEditTime: 2022-03-10 10:39:34
-->
<template>
  <div ref="mainPanel" class="mainPanel">
    <el-tabs v-model="activeName">
      <el-tab-pane label="总仓库" name="1">
        <div :style="{'height': tabHeight +'px'}" v-if="activeName == 1">
          <Tab1 v-if="loaded" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人仓库" name="2">
        <div :style="{'height': tabHeight +'px'}" v-if="activeName == 2">
          <Tab2 v-if="loaded" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Tab1 from "./Tab1.vue";
import Tab2 from "./Tab2.vue";
export default {
  components: {
    Tab1,
    Tab2
  },
  data(){
    return {
      activeName: "1",
      tabHeight: 0,
      loaded: false,
    }
  },
  mounted() {
    this.tabHeight = this.$refs.mainPanel.clientHeight - 40;
    window.onresize = () => {
      return (() => {
        this.tabHeight = this.$refs.mainPanel.clientHeight - 40;
      })();
    };
		this.loaded = true;
  },
  beforeDestroy() {
    window.onresize = null;
  },
}
</script>