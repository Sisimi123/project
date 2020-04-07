<style lang="less">
</style>

<template>
    <Modal class="vertical-center-modal" :width="width" v-model="show" :title="title" :scrollable=true :mask-closable="true">
        <div slot="footer" >
          <Button  @click="cancel()">{{cancelText}}</Button>
          <Button type="primary"  @click="ok()">{{okText}}</Button>
        </div>
        <Form :label-width="100" :model="info" ref="info">
          <Row>
            <i-col span="8">
                <Form-item label="渔船名称:" >
                    <Input v-model="info.nametheShip" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="渔船编码:" >
                    <Input v-model="info.fishingCode" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="船舶类型:" >
                    <Input v-model="info.shipType" ></Input>  
                </Form-item>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
                <Form-item label="船舶所有人:" >
                    <Input v-model="info.namevesselOwner" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="所有人电话:" >
                    <Input v-model="info.shipOwnerTelephone" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="渔船所属地区:" >
                    <Input v-model="info.nametheFishingArea" ></Input>  
                </Form-item>
            </i-col>

          </Row>
          <Row>
            <i-col span="24">
                <Form-item label="所有人地址:" >
                    <Input v-model="info.addressshipOwner" ></Input>  
                </Form-item>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
                <Form-item label="型宽:" >
                    <Input v-model="info.typeWidth" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="型深:" >
                    <Input v-model="info.shipDepth" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="主机总功率:" >
                    <Input v-model="info.masterPower" ></Input>  
                </Form-item>
            </i-col>
          </Row>

          

          <Row>
            <i-col span="8">
                <Form-item label="船长:" >
                    <Input v-model="info.typeLength" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="总吨位:" >
                    <Input v-model="info.grossTonnage" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="船体材质:" >
                    <Input v-model="info.hullMaterialA" ></Input>  
                </Form-item>
            </i-col>
          </Row>

          <Row>
            <i-col span="8">
                <Form-item label="核准船长:" >
                    <Input v-model="info.approvedTypeLength" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="核准总吨:" >
                    <Input v-model="info.approvedGrossTonnage" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="8">
                <Form-item label="双控功率:" >
                    <Input v-model="info.dualPowerControl" ></Input>  
                </Form-item>
            </i-col>

          </Row>

          <Row>
            <i-col span="12">
                <Form-item label="船舶呼号识别码:" >
                    <Input v-model="info.shipCallMarkIdenCode" ></Input>  
                </Form-item>
            </i-col>
            <i-col span="12">
                <Form-item label="船网工具指标批准书编号:" >
                    <Input v-model="info.indexShipNetToolsNo" ></Input>  
                </Form-item>
            </i-col>

          </Row>
          
        </Form>
    </Modal>
</template>

<script>
export default {
  name: "modalYcjb",
  props: {
    okText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "返回"
    },
    id: {
      type: String,
      default: ""
    },
    uniqIdenVessInfo: {
      type: String,
      default: ""
    },
    nametheShip: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 500
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
        // uniqIdenVessInfo:"",
        // nametheShip:"",
        info: {},
    };
  },
  methods: {
    search() {
      this.$http
        .get("/checks/shiparchives/get",{
            params:{
                id: this.id,
                uniqIdenVessInfo: this.uniqIdenVessInfo,
                nametheShip: this.nametheShip
            }
        })
        .then(res => {
          console.log(res.data);
          this.info = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ok() {
      this.$emit("handleOk");
    },
    cancel() {
      this.$emit("handleCancel");
    },
    isEmpty(s){
        if (s == undefined || s == null || s == "") {
            return true;
        }
        return false;
    }
  },
  mounted() {
    
  },
  watch: {
    id(id) {
        if (this.isEmpty(id)) {
            return;
        }
        //this.dataid = dataid;
        this.search();
    },
    uniqIdenVessInfo(uniqIdenVessInfo) {
      if (this.isEmpty(uniqIdenVessInfo)) {
        return;
      }
      //this.uniqIdenVessInfo = uniqIdenVessInfo;
      this.search();
    },
    nametheShip(nametheShip) {
      if (this.isEmpty(nametheShip)) {
        return;
      }
      //this.uniqIdenVessInfo = uniqIdenVessInfo;
      this.search();
    }
  },
};
</script>

<style>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ivu-modal {
  top: 40px;
}
</style>
