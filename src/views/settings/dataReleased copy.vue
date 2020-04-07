<style lang="less">
// @import "../../../styles/commonStyle.less";
@import '../../styles/common.less';
</style>
<template>
<div>
  <data-table ref="test" 
    :url="'/clientDataSync/page'" :params="query" :columns="columns" :autoInitTable="false"
    @on-selection-change="selectChange">
    <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <!-- <Col span="4">
                <Form-item label="类型:">
                    <RadioGroup v-model="query.type" type="button" @on-change="radioChange">
                        <Radio label="client">客户端</Radio>
                        <Radio label="server">服务端</Radio>
                    </RadioGroup>
                </Form-item>
            </Col> -->
            <Col span="4">
                <Form-item label="全类名:">
                  <Input v-model="query.wheres.tableName_like" placeholder="请输入..."></Input>
                </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
              <Button @click="handleReset()"  >重置</Button>
            </div>
          </span>
        </Row>
        </Form>
    </div>
  </data-table>
</div>
</template> 

<script>
export default {
  components: {
  },
  data() {
    return {
       model:false,
       columns:[
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "类名",
          key: "className",
          align: "center"
        },
        {
          title: "表名",
          key: "tableName",
          align: "center",
        },
        {
          title: "全类名",
          key: "fullClassNmae",
          align: "center",
        },
        {
          title: "更新时间",
          key: "updateTime",
          align: "center",
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
        },
        {
          title: "是否开启",
          key: "open",
          align: "center",
          width: 80,
          render: (h, params) => {
             let isOpen = params.row.open
             switch(isOpen){
                 case 0:
                    isOpen = "关闭 "
                    break;
                 case 1:
                    isOpen = "开启"
                    break;   
             }
             return h("span",isOpen)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 180,
          render: (h, params) => {
            let isOpen = params.row.open
            let buttons = []
            if(isOpen == 0){
             buttons.push(
               h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.openBtn(params.row);
                      }
                    }
                  },
                  "开启"
                ),
              );
            }else{
             buttons.push(
               h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.closeBtn(params.row);
                      }
                    }
                  },
                  "关闭"
                ),
              );
            }
            return h("div", buttons);
          }
        }
       ],
       // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          tableName_like: "",
        },
      //   orders: "updateTime desc"
      },
      resetQuery:{
          id:""
      }
    };
  },
  computed: {
   //  getFormItem() {
   //    return JSON.parse(JSON.stringify(formLeft)); //深拷贝
   //  },
   //  defaultUserName() {
   //    return this.$store.state.user.userInfo.name;
   //  },
  },
  // 方法.事件
  methods: {
     initSearch() {
      this.$refs.test.initSearch();
    },
     handleReset(){
        this.query.wheres.search = ""
        this.$refs.test.initSearch();
     },
     selectChange(){
        
     },
     radioChange(value){
         this.initSearch()
     },
     openBtn(row){
        let url
        let open = 1
        this.$Modal.confirm({
            title: "操作确认",
            content: "<p>确定要开启同步配置吗？</p>",
            onOk: () => {
                if(this.query.type == "client"){
                    url = "/datasync/setting/client"
                    this.sendHttp(row,url,open)
                }else{
                    url = "/datasync/setting/server"
                    this.sendHttp(row,url,open)
                }
        },
        onCancel: () => {}
      });
     },
     closeBtn(row){
        let url
        let open = 0
        this.$Modal.confirm({
            title: "操作确认",
            content: "<p>确定要关闭同步配置吗？</p>",
            onOk: () => {
                if(this.query.type == "client"){
                    url = "/datasync/setting/client"
                    this.sendHttp(row,url,open)
                }else{
                    url = "/datasync/setting/server"
                    this.sendHttp(row,url,open)
                }
        },
        onCancel: () => {}
      });
     },
     sendHttp(row,url,open){
        this.$http.post(url+`?id=${row.id}&&open=${open}`)
            // 返回值
            .then(res => {
            if(res.success){
                this.$Message.info("操作成功");
                this.initSearch()
            }
            })
        .catch(error => {
            this.$Message.info("操作失败");
        });
     }
  },
  mounted() {
   //   if (!this.isEmpty(this.$route.query)) {
   //      this.initQuery();
   //  } else {
   //      this.initSearch();
   //  }
   this.initSearch()
  },
};
</script>

<style scoped>
body,
th,
td {
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}

table.regisbg {
  border-collapse: collapse;
  margin-bottom: 10px;
}

table.regisbg th,
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}

.text-left {
  text-align: left !important;
  text-indent: 2px;
}

th.none-line,
td.none-line {
  border: none;
}

textarea {
  outline: none;
  border: none;
  width: 100%;
  resize: none;
}

input[type="checkbox" i] {
  margin: 0px !important;
}
input {
  outline: none;
  border: 0px;
  width: 65px;
  text-indent: 2px;
}
input.return_sj {
  width: 156px;
}
input.sl {
  width: 59px;
}

input.qm {
  width: 35%;
}
.mid-whole-width {
  width: 80%;
}
.whole-width {
  width: 100%;
}

caption {
  font-size: 25px;
  font-weight: 700;
}

.checkbox_cl {
  width: 15px !important;
  height: 15px !important;
  margin: 0 auto;
}

/*  以上是表格 */

.searColumn {
  padding: 10px 20px 10px 20px;
}
.fk-box {
  border: 1px solid #cccccc;
  padding-bottom: 20px;
}
label.pos {
  display: inline-block;
  width: 108px;
  height: 30px;
  line-height: 30px;
}

label.pos2 {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

label.pos3 {
  display: inline-block;
  width: 88px;
  height: 30px;
  line-height: 30px;
}

.selec {
  width: 120px;
}

.selec2 {
  width: 85px;
}

.both-white-padding {
  margin: 0 20px;
}

th.ivu-table-column-left div.ivu-table-cell {
  display: none;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.el-input {
  font-size: 12px;
  border: none;
  out-line: none;
  color: #000;
}
.el-input__inner {
  height: 32px;
  border: none;
  outline-style: none;
}
.text-required {
  display: inline-block;
  color: red;
}
.fk-box1 {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 20px;
}
.fk-title {
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  background: #f8f8f9;
}
.fk-content {
  /* 				height:45px; */
  /* 				line-height:45px; */
  /* 				text-indent:20px; */
  margin: 10px 0px;
}
.fk-lyr {
  font-weight: bold;
  text-indent: 20px;
  float: left;
  /* 				width%; */
}
.fk-text {
  float: left;
  width: 90%;
}

.fk-time {
  background: #ece9e9;
  text-align: right;
  padding-right: 40px;
}
.fk-img {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 130px;
  height: 120px;
}
p.mark {
  font-size: 12px;
  margin: 0 auto;
}
input:disabled {
  border: none;
  background-color: #fff;
  color: #aca899;
}

/* upload 样式 */
.demo-upload-list,
.qm-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.qm-upload-list {
  width: 200px;
  height: 200px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
