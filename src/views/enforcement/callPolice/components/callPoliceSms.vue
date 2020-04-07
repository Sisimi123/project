<template>
  <div>
    <Modal v-model="modal" :title="title">
      <Form ref="info" :model="info">
        <FormItem :label-width="labelWidth" v-for="(v,k,i) in info.template" :key="i" :label="template[k] + '：'">
          <Input
            style="width:100%"
            v-model="info.template[k]"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
        </FormItem>
      </Form>
      <Checkbox v-model="info.sendOwner" :true-value="1" :false-value="0">是否发送给船东</Checkbox>
      <div slot="footer">
        <Button @click="cancel('info')">取消</Button>
        <Button type="primary" @click="ok('info')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    template: {
      type: Object,
      default() {
        return {
        };
      }
    },
    templateObj: {
      type: Object,
      default() {
        return {};
      }
    },
    labelWidth:{
        type:Number,
        default:50
    }
  },
  data() {
    return {
      modal: false,
      info: {
        sendOwner: 0,
        template: {},
        type: ''
      }
    };
  },
  methods: {
    getData() {
      this.info.template = this.templateObj;
      this.info.type = this.type;
      this.$http.get(`/check/alarmSMSTemplate/type/${this.type}`).then(res => {
        if (res.success) {
          console.log(res, "res");
          if (res.data) {
            res.data.template = JSON.parse(res.data.template);
            console.log(res.data, "data");
            this.info = res.data;
          }
        } else {
          this.$Message.error("请求失败！");
        }
      });
    },
    ok() {
      for (let i in this.info.template) {
          if(!this.info.template[i]){
              this.$Message.error(this.template[i]+'不能为空！')
              return
          }
      }
      let info = JSON.parse(JSON.stringify(this.info));
      info.template = JSON.stringify(info.template);
      this.$http.post("/check/alarmSMSTemplate/save", info).then(res => {
        if (res.success) {
          this.modal = false;
          this.$Message.info("操作成功");
        } else {
          this.$Message.error("操作失败");
        }
      });
    },
    cancel() {
      this.modal = false;
    },
    ooo(v) {
      console.log(v);
    }
  },
  watch: {
    modal(val) {
      if (val) {
        this.getData();
      }
    }
  }
};
</script>

<style>
</style>