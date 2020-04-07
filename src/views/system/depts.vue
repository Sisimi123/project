<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
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
                                expandUrl="/$admin/depts/node">
                            </MyTreeGrid>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>

        <Modal v-model="dataModal" :title="modelTitle" :mask-closable=false width="720">
            <Form ref="dataInfo" :model="dataInfo"  :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="部门名称:" prop="name">
                            <Input v-model="dataInfo.name" placeholder="请输入部门名称..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="部门全称:" prop="fullname">
                            <Input v-model="dataInfo.fullname" placeholder="请输入部门全称..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="部门类型:" prop="type">
                            <Select v-model="dataInfo.type">
                                <Option v-for="item in deptTypes" :value="item.value" :key="item.value">{{item.title}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="通讯录展示:" >
                            <RadioGroup v-model="dataInfo.contact" type="button">
                                <Radio label="1">是</Radio>
                                <Radio label="0">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="负责人:" prop="head">
                            <Input v-model="dataInfo.head" placeholder="请输入负责人..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话:" prop="phone">
                            <Input v-model="dataInfo.phone" placeholder="请输入联系电话..."></Input>
                        </FormItem>
                    </Col>
                     <Col span="12">
                        <FormItem label="排序:" prop="sort">
                            <InputNumber v-model="dataInfo.sort" placeholder="请输入排序..." style="width:100%"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="内陆/沿海:" prop="areaType">
                            <RadioGroup v-model="dataInfo.areaType" type="button">
                                <Radio label="0">沿海</Radio>
                                <Radio label="1">内陆</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="联系地址:" prop="address">
                            <Input v-model="dataInfo.address" placeholder="请输入联系地址..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="备注:" prop="note">
                            <Input v-model="dataInfo.note" placeholder="请输入备注..."></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            </Row>
            <div slot="footer">
                <Button @click="dataModal=false">取消</Button>
                <Button type="primary" @click="saveDataInfo()" style="margin-right: 8px">保存</Button>
            </div>
        </Modal>
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
import MyTreeGrid from '../components/treeGrid/MyTreeGrid.vue';
import {saveDept,getDeptById,getDepts,deleteDeptById} from '../../api/system';
import {isNull,isEmpty} from '../../libs/common'
export default {
    name: 'SystemDept',
    components: {
        MyTreeGrid
    },
    data () {
        var _self=this;
        return {
            clickdeptid:"",
            did:"",
            clickOrganid:"",
            bangDingModal: false,
            userDeptsTree: [],
            columnList: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 70,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '部门名称',
                    type: 'tree',
                    //width: 400,
                    align: 'left',
                    key: 'name'
                },
                // {
                //     title: '部门编号',
                //     width: 200,
                //     align: 'center',
                //     key: 'division'
                // },
                {
                    title: '部门全称',
                    //width: 200,
                    align: 'center',
                    key: 'fullname'
                },
                {
                    title: '联系电话',
                    //width: 150,
                    align: 'center',
                    key: 'phone'
                },
                {
                    title: '联系地址',
                    align: 'center',
                    key: 'address'
                },
                {
                    title: '排序',
                    //width: 200,
                    align: 'center',
                    key: 'sort'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 250,
                    align: 'center',
                    render: (h, params) => {
                        var id=params.row.id;
                        var buttons=[];
                        buttons.push(h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.newDataInfo(params);
                                    }
                                }
                            }, '新增'));
                        buttons.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.editDataInfo(params);
                                    }
                                }
                            }, '修改'));

                        buttons.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.removeDataInfo(params);
                                    }
                                }
                            }, '删除'))
                        buttons.push(h("Button",{
                                props: {
                                    type: "primary",
                                    size: "small",
                                },
                                on: {
                                    click: () => {
                                    _self.clickdeptid=id;
                                    _self.bangDing();
                                    }
                                }
                                },
                                "绑定"
                            )); 

                        return h('div', buttons);
                    }
                }
            ],
            dataFilter:"",
            dataList: [],
            dataTotal:0,
            ruleValidate: {
                name: [
                    { required: true, message: '部门名称不能为空！', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '部门类型不能为空', trigger: 'blur' }
                ],
                division: [
                    { required: true, message: '部门编码不能为空！', trigger: 'blur' },
                ],
            },
            dataModal:false,
            dataInfo:{
            },
        };
    },
    computed:{
        readOnly(){
            return !isEmpty(this.dataInfo.id);
        },
        modelTitle(){
            return isEmpty(this.dataInfo.id)?"新增部门":"编辑部门";
        },
        filterTree(){
            var tree=this.$util.deepCopy(this.dataList);
            return this.$util.diguiTree(tree,this.dataFilter,function(node,filter){
                return !isNull(node.name) && node.name.indexOf(filter) >= 0;
            });
        },
        clientHeight(){
            return this.$store.state.app.clientHeight;
        },
        deptTypes(){
            return this.$store.getters.getDictList("zealot_dept_type");
        }
    },
    methods: {
        jiebangDing(){
            console.log(this.clickdeptid);
            var _self=this;
          _self.$http.get("/map/organs/unbind?deptid="+_self.clickdeptid)
          .then(res=>{
            if(res.success){
              _self.deptid="";
              _self.deptname="";
              _self.$Message.info("操作成功");
              _self.bangDingModal=false;
            //   _self.loadDataTree(_self.organid);
              _self.loadDataTree();
            }else{
              _self.$Message.info(res.msg);
            }
          });
        },
        saveBangDing(){
            console.log(this.clickdeptid,this.clickOrganid);
            var _self = this;
            if(this.clickOrganid == ""){
                _self.$Message.info("请先选择机构");
                return;
            }
             _self.$http
            .get(
              "/map/organs/bind?organid=" +
                _self.clickOrganid +
                "&deptid=" +
                _self.clickdeptid
            )
            .then(function(result) {
              if (result.success) {
                _self.bangDingModal = false;
                _self.$Message.info("操作成功");
                // var id=_self.organid;
                // _self.loadDataTree(id);
                _self.loadDataTree();
              } else {
                _self.$Message.info(res.msg);
              }
            });
        },
        onRowClick(msg) {
          this.did=msg.organid;
        },
        onselectchange(msg) {
            console.log(msg)
        //   this.deptid = msg[0].id;
          this.clickOrganid=msg[0].id;
        // 
        },
        bangDing() {
          var _self=this;
          _self.clickOrganid="";
          _self.$http
          .get("/map/organs/tree")
          .then(res => {
            if(res.success){
              _self.userDeptsTree = res.data;
              var tree=_self.$util.deepCopy(_self.userDeptsTree);
              _self.selectedDept(tree,_self.did);
              if(_self.did){
                   _self.clickOrganid= _self.did
              }
              _self.userDeptsTree=tree;
              _self.bangDingModal = true;
            }
          });
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
        handleSearch(){
            // var tree=this.$util.deepCopy(this.dataList);
            // return this.$util.diguiTree(tree,this.dataFilter);
        },
        newDataInfo(params){
            var _self=this;
            _self.handleReset("dataInfo");
            _self.dataInfo={
                parentId:params.row.id,
                status:'1',
                contact:'1',
            };
            _self.dataModal=true;
        },
        editDataInfo(params){         
            var _self = this;
            _self.handleReset("dataInfo");
            getDeptById(params.row.id)
            .then(function(result){
                if(result.success){
                    _self.dataInfo=result.data;
                    _self.dataModal=true;
                }
            });
        },
        saveDataInfo(params){
            var _self = this;
            _self.$util.validateForm(_self,"dataInfo",function(){
                saveDept({_model:_self.dataInfo})
                .then(function(result){
                    if(result.success){
                        _self.dataModal=false;
                        _self.loadDataTree();
                    }
                    _self.$Message.info(result.msg);
                });
            });
        },
        removeDataInfo(params){
            var _self=this;
            _self.$util.delConfirm(_self,function(){
                deleteDeptById(params.row.id)
                .then(function(result){
                    if(result.success){
                        _self.loadDataTree();
                    }
                    _self.$Message.info(result.msg);
                });
            });
        },
        loadDataList(){
            var _self=this;
        },
        loadDataTree(){
            var _self=this;
            var path = _self.$store.state.user.userInfo.dept.path;
            console.log(path,"path");
            getDepts({
                key:"getDeptTreeGrid",
                orders:"sort asc",
                wheres:{
                    pathlike: path
                }
            }).then(function(result){
                if(result.success){
                    console.log(result,"result");
                    _self.dataList=result.data;
                }
            });
        },
        // loadDataTree(){
        //     var _self=this;
        //     _self.$http.get("/$admin/depts/custree"+"?includes=5,30"
        //     // getDepts({
        //     //     key:"getDeptTreeGrid",
        //     //     orders:"sort asc"
        //     // }
        //     ).then(function(result){
        //         console.log(result,"result");
        //         if(result.success){
        //             _self.dataList=result.data;
        //         }
        //     });
        // },

        handleReset(name){
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        var _self=this;
        this.loadDataTree();
    }
};
</script>
