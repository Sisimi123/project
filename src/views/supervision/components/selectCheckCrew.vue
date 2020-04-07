<template>
    <Modal 
        v-model="visible" 
        :closable="closable"
        :maskClosable="maskClosable"
        :title="title"
        :width="width"
        :okText="okText"
        :cancelText="cancelText"
        :loading="loading"
        :styles="styles"
        :class="className"
        :footerHide="footerHide"
        :scrollable="scrollable"
        :transitionNames="transitionNames"
        :transfer="transfer"
        @on-ok="ok"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">  
            <Input v-model="discretionary.search" placeholder="请输入关键字"></Input>
            <newZtree :treeData="discretionarys" @checkList="selectTreeChange" :withCard="false" :chkboxType="{ 'Y' : '', 'N' : '' }" ref='tree'></newZtree>
            <!-- <Tree check-strictly :data="discretionarys" ref='tree' show-checkbox @on-check-change="selectDiscretionaryPower" style="height:300px;overflow:auto;" multiple></Tree> -->
            <div slot="footer">
              <Button @click="cancel">取消</Button>
              <Button type="info" @click="submit()">确定</Button>
          </div>
    </Modal>
</template>

<script>
import {isNull, isEmpty} from '@/libs/common.js';
import newZtree from "@/views/components/treeGrid/newZtree"
export default {
  name: "selectCheckCrew",
  components: {
    newZtree
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "选择检查人员"
    },
    width: {
      type: [Number, String],
      default: 520
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    className: {
      type: String
    },
    // for instance
    footerHide: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    transitionNames: {
      type: Array,
      default() {
        return ["ease", "fade"];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    }
   },
  data() {
    return {
        selectNodes: [],
        visible:false,
        discretionary:{
            dataList:[],
            search:""
        },
    };
  },
    computed: {
        discretionarys () {
            var discretionary = this.discretionary.dataList;
            return this.$util.diguiTree(discretionary, this.discretionary.search);
        }
    },
    methods: {
        ok () {
            this.visible = false;
            if (!this.loading) 
                this.$emit("input", this.visible);
            this.$emit("on-ok");
        },
        cancel () {
            this.visible = false;
            this.$emit("input", this.visible);
            this.$emit("on-cancel");
        },
        visibleChange (val) {
            this.visible = val;
            this.$emit('on-visible-change', val);
        },
        diguiFun (data) {
            data.forEach((v, i) => {
                if (v.children) {
                    this.diguiFun(v.children);
                }
                if (v.type != '0') {
                    v['nocheck'] = true;
                }
            });
        },
        loadDiscretionaryPower () {
            var _self = this;
            _self.$http.get('/$admin/users/selectUserList?deptTypes=&deptIds=&roleIds=Enforcer&type=tree')
                .then(res => {
                    if (res.success) {
                        _self.discretionary.dataList = res.data[0].children;
                        console.log(_self.discretionary.dataList)
                        this.diguiFun(_self.discretionary.dataList);
                    }
                }).catch(err => {
                    console.log(err)
                });
        },
        selectTreeChange (v) {
        },
        submit () {
            var _self = this;
            _self.selectNodes = _self.$refs.tree.getCheckedNodes();
            if (_self.selectNodes.length === 0) {
                this.$Message.error("请选择子节点！");
                return;
            }
            this.$emit("selectDiscretionaryPower",_self.selectNodes);
            this.ok();
        },
        selectDiscretionaryPower (nodes) {
        }
    },
    mounted () {
        
    },
    watch: {
        value (val) {
            this.visible = val;
            if (val) {
                this.loadDiscretionaryPower();
            }
        }
    }
};
</script>