<style lang="less">
    @import "../../styles/common.less";
    @import "./components/table.less";
    </style>
    <template>
        <div>
            <div>
                <Row>
                    <Col span="24" class="padding-left-6">
                        <Card :style="'height:'+(clientHeight-113)+'px'">
                            <Row>
                                <Input v-model="dataFilter" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                            </Row>
                            <Row class="margin-top-5">
                                <MyTreeGrid 
                                    ref="dataGrid"
                                    :height="clientHeight-180"
                                    size="small"
                                    border 
                                    :columns="columnList" 
                                    :data="filterTree" 
                                    @on-row-click="onRowClick"
                                    
                                    >
                                </MyTreeGrid>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal v-model="bangDingModal" title="部门列表" width="320">
                <div style="height:300px;overflow-y:auto">
                    <Tree  :data="userDeptsTree" @on-select-change="onselectchange"></Tree>
                </div>
                <div slot="footer">
                    <Button type="primary" @click="jiebangDing()">解绑</Button>
                    <Button type="info" @click="saveBangDing()">保存</Button>
                    <Button @click="bangDingModal=false">取消</Button>
                </div>
            </Modal>
        </div>
    </template>    
    <script>
    import MyTreeGrid from "../components/treeGrid/MyTreeGrid.vue";
    import {
      saveDept,
      getDeptById,
      getDepts,
      deleteDeptById
    } from "../../api/system";
    import { isNull, isEmpty } from "../../libs/common";
    export default {
      name: "SystemDept",
      components: {
        MyTreeGrid
      },
      data() {
        var _self = this;
        return {
          bangDingModal: false,
          userDeptsTree: [],
          columnList: [
            {
              title: "序号",
              type: "index",
              maxWidth: 80,
              align: "center",
              key: "id"
            },
            {
              title: "救助系统机构",
              type: "tree",
              align: "left",
              key: "name"
            },
            {
              title: "救助系统机构代码",
              align: "center",
              key: "id"
            },
            // {
            //   title: "部门名称",
            //   align: "center",
            //   key: "deptname"
            // },
            // {
            //   title: "部门代码",
            //   align: "center",
            //   key: "deptId"
            // },
            {
              title: "是否显示",
              align: "center",
              key: "hidden",
              render: (h, params) => { 
                var hidden=params.row.hidden;    
                if(hidden=="0")
                  return [h('Icon', {
                                props: {
                                    type: 'checkmark-round',
                                    size: 'small',
                                    color:'green'
                                }
                            })];
                if(hidden=="1")
                  return [h('Icon', {
                                props: {
                                    type: 'close-round',
                                    size: 'small',
                                    color:'red'
                                }
                            })];
              }
            },
            {
              title: "操作",
              align: "center",
              width:160,
              render: (h, params) => {
                var id = params.row.id;
                var deptId = params.row.deptId;
                var hidden = params.row.hidden;
                var buttons = [];
                // buttons.push(
                //   h(
                //     "Button",
                //     {
                //       props: {
                //         type: "primary",
                //         size: "small",
                //       },
                //       on: {
                //         click: () => {
                //           _self.organid=id;
                //           _self.bangDing();
                //         }
                //       }
                //     },
                //     "绑定"
                //   ));        
                if(hidden=="1"){
                  buttons.push(
                    h(
                      "Button",
                      {
                        props: {
                          type: "success",
                          size: "small",
                        },
                        style: {
                          marginLeft: "10px"
                        },
                        on: {
                          click: () => {
                            _self.xianshi(id);
                          }
                        }
                      },
                      "显示"
                    ));
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
                          marginLeft: "10px"
                        },
                        on: {
                          click: () => {
                            _self.yincang(id);
                          }
                        }
                      },
                      "隐藏"
                    )
                  );
                }
                return h("div", buttons);
              }
            }
          ],
          dataFilter: "",
          dataList: [],
          dataTotal: 0,
          organid: "",
          deptid: "",
          nodes: {},
          deptname:"",
        };
      },
      computed: {
        filterTree() {
          var tree = this.$util.deepCopy(this.dataList);
          return this.$util.diguiTree(tree, this.dataFilter, function(
            node,
            filter
          ) {
            return !isNull(node.name) && node.name.indexOf(filter) >= 0;
          });
        },
        clientHeight() {
          return this.$store.state.app.clientHeight;
        },
        deptTypes() {
          return this.$store.getters.getDictList("zealot_dept_type");
        }
      },
      methods: {
        handleSearch() {
          // var tree=this.$util.deepCopy(this.dataList);
          // return this.$util.diguiTree(tree,this.dataFilter);
        },
        selectedDept(tree, pId){
          if (isNull(tree) || isEmpty(pId))
              return false;
          for (var i = 0; i < tree.length; i++) {
              var node = tree[i];
              if (node["id"] == pId) {
                  node["expand"] = true;
                  node["selected"] = true;
                  return true;
              }
              if (this.selectedDept(node["children"], pId)) {
                  node["expand"] = true;
                  node["selected"] = false;
                  return true;
              }
          }
          return false;
        },
        bangDing() {
          var _self=this;
          _self.$http
          .get("/$admin/depts/custree?includes=10,20,30,45,70,99")
          .then(res => {
            if(res.success){
              _self.userDeptsTree = res.data;
              var tree=_self.$util.deepCopy(_self.userDeptsTree);
              _self.selectedDept(tree,_self.did);
              _self.userDeptsTree=tree;
              _self.bangDingModal = true;
            }
          });
        },
        jiebangDing(){
          var _self=this;
          _self.$http.get("/map/organs/unbind?organid="+_self.organid)
          .then(res=>{
            if(res.success){
              _self.deptid="";
              _self.deptname="";
              _self.$Message.info("操作成功");
              _self.bangDingModal=false;
              _self.loadDataTree(_self.organid);
            }else{
              _self.$Message.info(res.msg);
            }
          });
        },
        xianshi(id){
          var _self=this;
          _self.$http.get("/map/organs/hidden?organid="+id+"&type=0")
          .then(res=>{
            if(res.success){
              _self.deptid="";
              _self.deptname="";
              // _self.loadDataTree(id);
              this.loadDataTree();
              _self.$Message.info("操作成功");
            }else{
              _self.$Message.info(res.msg);
            }
          });
        },
        yincang(id){
          var _self=this;
          _self.$http.get("/map/organs/hidden?organid="+id+"&type=1")
          .then(res=>{
            if(res.success){
              _self.deptid="";
              _self.deptname="";
              // _self.loadDataTree(id);
              this.loadDataTree();
              _self.$Message.info("操作成功");
            }else{
              _self.$Message.info(res.msg);
            }
          });
        },
        //table
        onRowClick(msg) {
          this.organid = msg.id;
          this.did=msg.deptId;
        },
        onRowDBlClick(msg) {
          this.organid = msg.id;
          this.did=msg.deptId;
          this.bangDing();
        },
        onselectchange(msg) {
          this.deptid = msg[0].id;
          this.deptname=msg[0].title;
        },
        saveBangDing() {
          var _self = this;
          _self.$http
            .get(
              "/map/organs/bind?organid=" +
                _self.organid +
                "&deptid=" +
                _self.deptid
            )
            .then(function(result) {
              if (result.success) {
                _self.bangDingModal = false;
                _self.$Message.info("操作成功");
                var id=_self.organid;
                _self.loadDataTree(id);
              } else {
                _self.$Message.info("操作失败");
              }
            });
        },
        loadDataTree(id) {
          var _self = this;
          var params="/map/organs/tree";
          if(id!=undefined){
            params="/map/organs/tree?organid="+id;
          }
          _self.$http.get(params).then(function(result) {
            if (result.success) {
              _self.dataList = result.data;
            }
          });
        }
      },
      mounted() {
        var _self = this;
        this.loadDataTree();
      }
    };
    </script>
        