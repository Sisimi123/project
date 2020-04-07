<template>
  <transition>
    <div>
      <Row>
          <Col span="12">
              <FormItem label="执法人:" prop="lawMan2">
                <Input v-model="secord.lawMan2">
                  <span slot="append"  @click="selectEnforcers(secord)">选择</span>
                </Input>
              </FormItem>
          </Col>
          <Col span="9">
              <FormItem label="执法号:" prop="lawMan2Num">
                  <Input v-model="secord.lawMan2Num" ></Input>
              </FormItem> 
          </Col>
          <Col span="3" >
            <ButtonGroup>
              <Button @click="addItem()"  type="primary" style="margin-left:5px;">增加</Button>
            </ButtonGroup>
          </Col>
      </Row>
      <div v-for="(item, index) in enforcers" :key="'key_'+item.id">
          <Row>
              <Col span="12">
                  <FormItem label="执法人:">
                    <Input v-model="item['lawMan2']">
                      <span slot="append"  @click="selectEnforcers(item)">选择</span>
                    </Input>
                  </FormItem>
              </Col>
              <Col span="9">
                  <FormItem label="执法号:">
                      <Input v-model="item['lawMan2Num']" ></Input>
                  </FormItem> 
              </Col>
              <Col span="3" >
                <ButtonGroup>
                  <Button @click="addItem(index)"  type="primary" style="margin-left:5px;">增加</Button>
                  <Button @click="deleteItem(index)"  type="error" >删除</Button>
                </ButtonGroup>
              </Col>
          </Row>
      </div>
    <enforcersModal v-model="show"  @changeEnforcers="changeEnforcers" ></enforcersModal>
    </div>
  </transition>
</template>
<script>
import enforcersModal from '@/views/components/case/enforcersModal.vue';
import { isEmpty } from '../../../libs/common';
export default {
  name: "enforcers",
  components:{
    enforcersModal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "small"
    },
    index: {
      type: Number,
      default: 1
    },
    clearable:{
      type: Boolean,
      default: false
    },
    dataList: Array,
    toplimit: {
      type: String,
      default: "5"
    }
  },
  data() {
    return {
      show:false,
      secord:{},
      curItem:undefined,
      enforcers:[
        {}
      ]
    };
  },
  methods: {
    selectEnforcers(curItem){
      this.curItem=curItem;
      this.show=true;
    },
    changeEnforcers(item){
      // console.log(item);
      // this.enforcers.splice(this.curItem,1,item);
      this.curItem.lawMan2Id=item.id;
      this.curItem.lawMan2=item.name;
      this.curItem.lawMan2Num=item.code;
    },
    addItem(index){
      if(isEmpty(index))
        index=this.enforcers.length-1;
      this.enforcers.splice(index+1,0,{});
    },
    deleteItem(index){
      this.enforcers.splice(index,1);
    }
  },
  mounted() {
 
  }
};
</script>


