<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
  <div>
    <data-table ref="test" 
        :url="'/enforces/shipscoreclear/getPage'" :params="query" :columns="columns" 
        @on-row-dblclick="handleEdit">
        <div slot="search">
            <!-- label-width 长度根据实际情况自行调整 -->
            <Form :label-width="80" @submit.native.prevent>
              <Row>
                <Col span="6">
                    <Form-item label="标题:">
                      <Input v-model="query.title" icon="ios-search" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="申请状态:">
                      <Select @on-change="initSearch()" v-model="query.eventType" placeholder="请选择申请状态">
                        <Option v-for="item in eventType" :value="item.value" :key="item.value">{{ item.title }}</Option>
                      </Select>
                    </Form-item>
                </Col>

                <div class="btn-wrap">
                  <Checkbox v-model="query.myself" true-value="1" false-value="0" @on-change="handleSearch(1)">与我有关</Checkbox>
                  <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                  <Button @click="handleReset()"  >重置</Button>
                </div>

                <div class="func-wrap">
                  <ButtonGroup shape="circle">
                    <Button @click="handleApply()" type="info" icon="ios-add" >消分申请</Button>
                  </ButtonGroup>
                </div>

              </span>
            </Row>
            </Form>
        </div>
    </data-table>
    <applyClear 
    v-model="status.show" 
    okText="确定"
    @on-ok="handleDefault()"
    cancelText="返回"
    @on-cancel="handleDefault()"
    ></applyClear>
 
    <applyClearDetail 
    v-model="status.showDetail" 
    :id="dataId"
    okText="确定"
    @on-ok="handleDefault()"
    cancelText="返回"
    @on-cancel="handleDefault()"
    ></applyClearDetail>
  </div>
</template>
<script>
import applyClear from "./components/applyClear.vue";
import applyClearDetail from "./components/applyClearDetail.vue";

export default {
  name: "shipScoreApplyClear",
  data() {
    return {
      status: {
        aboutMe:true,
        isLoading: true,
        show: false,
        showDetail: false
      },
      canCancel: false,
      dataId: "",
      totalNum: 1,
      height: "450",
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "title",
          title: "标题",
          align: "center",
          width: 150
        },
        {
          key: "submitter",
          title: "提交人",
          align: "center",

        },
        {
          key: "auditor",
          title: "审核人",
          align: "center",

        },
        {
          key: "applyScore",
          title: "申请消分值",
          align: "center",
          width: 120
        },
        {
          key: "eventType",
          title: "状态",
          align: "center",
          render: (h, params) => {    
              var value = this.$store.getters.getDictName("shipscore_eventType",params.row.eventType);
              return h("span",value);
          }
        },
        {
          key: "createTime",
          title: "创建时间",
          align: "center",
          width: 180
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          width: 180,
          render: (h, params) => {
            var flag = params.row.auditorId == this.defaultUserId;
            var flag2 = params.row.eventType == '0';
            var flag3 = params.row.eventType == '0' || params.row.eventType == '1';
            var temp = [];
            temp.push(
              h(
                "Button",
                {
                  props: {
                    type: (flag && flag2) ? 'error' : 'success',
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params.row);
                    }
                  }
                },
                // 申请中 && 创建人
                (flag && flag2) ? '审理':'详情'
              )
            );

            if(this.canCancel && flag3) {
              temp.push(
                h(
                  "Button",
                  {
                    props: {
                      type: 'warning',
                      size: "small"
                    },
                    style: {
                      marginLeft: "5px"
                    },
                    on: {
                      click: () => {
                        this.handleCancel(params.row.id);
                      }
                    }
                  },
                  '撤回'
                )
              );
            }
            return h("div", temp);
          }
        }
      ],
      query: {
        page: 1,
        size: 10,
        title: "",
        eventType:"",
        myself:"1",
        orders: "updateTime desc"
      },
      dataList: [],
      checkAllGroup:"",
    };
  },
  components: {
    applyClear,
    applyClearDetail,
  },
  computed: {
    defaultUserId() {
      return this.$store.state.user.userInfo.userId;
    },
    eventType () {
      return this.$store.getters.getDictList("shipscore_eventType");
    },

  },
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    isEmpty(s) {
      if (s == "" || s == undefined || s == null) {
        return false;
      }
      return true;
    },
    haveCancelRule(){
      this.$http
        .get("/enforces/shipscoreclear/judgeRule")
        .then(res => {
          if(res.success){
            this.canCancel = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCancel(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认撤回吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          var params = new URLSearchParams();
          params.append("id", id);
          this.$http
            .patch("/enforces/shipscoreclear/cancel", params)
            .then(res => {
              this.$Message.info("操作成功");
              this.handleSearch(1);
            })
            .catch(err => {
              console.log(error);
            });
        },
        onCancel: () => {
          console.log("onCancel");
        }
      });
    },
    handleSearch(value) {
      if (value == 1) {
        this.query.page = 1;
      }
      this.$refs.test.handleSearch();
    },
    handleApply() {
      this.status.show = true;
    },
    handleDefault() {
      this.handleSearch();
    },
    handleEdit(index) {
      this.toEdit(index.id);
    },
    toEdit(id) {
      this.dataId = id;
      this.status.showDetail = true;
    },
    handleReset() {
      this.query.title = "";
      this.query.eventType = "";
      this.query.myself = "1";
      this.query.page = 1;
      this.query.size = 10;
      this.handleSearch();
    },
    pageSizeChange(size) {
      this.query.size = size;
      this.handleSearch();
    },
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
    }
  },
  mounted() {
    this.initSearch();
    this.haveCancelRule();
  }
};
</script>

<style scoped>

.ivu-card-bordered {
  border: none !important;
}

</style>
