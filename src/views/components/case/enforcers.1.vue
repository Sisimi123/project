<template>
  <transition>
    <div>
      <div v-for="(data, index) in person" :key="data.uuid">
          <Row>
              <Col span="12">
                  <FormItem label="执法人:">
                    <Input v-model="data.name" @on-blur="callBack()">
                      <span slot="append"  @click="handlePersonSearch(index)" >选择</span>
                    </Input>
                    <!-- <AutoComplete
                      v-model="data.name"
                      icon="ios-search"
                      :clearable="clearable"
                      @on-search="handleSearch"
                      @on-change="onChange"
                      @on-select="value => {selectChange(value,index)}"
                      @on-blur="callBack()"
                      placeholder="请输入执法人">
                      <div class="demo-auto-complete-item">
                        <Option v-for="option in options" :label="option.name" :value="option.name" :key="option.yycert">
                            <span class="demo-auto-complete-title">{{ option.name }}</span>
                            <span class="demo-auto-complete-count">执法号：{{ option.yycert }}</span>
                        </Option>
                      </div>
                    </AutoComplete>  -->
                  </FormItem>
              </Col>
              <!-- <Col span="1">
                <Button icon="ios-search" @click="handlePersonSearch(index)"></Button>
              </Col> -->
              <Col span="10">
                  <FormItem label="执法号:">
                      <Input v-model="data.yycert" @on-blur="callBack()"></Input>
                  </FormItem> 
              </Col>
              <Col span="2" >
                  <!-- <div style="" v-if="(index+1) == person.length">
                      <Button @click="deleteInfo(index)" :size="size" type="error" >删除</Button>
                      <Button @click="add()" :size="size" type="info" >增加</Button>
                  </div>
                  <div style="" v-else> -->
                      &nbsp;&nbsp;
                      <Button @click="deleteInfo(index)" :size="size" type="error" >删除</Button>
                  <!-- </div> -->
              </Col>
          </Row>
      </div>

      <Modal class="vertical-center-modal" :width="700" v-model="selectPeople" title="人员列表">
        <Row>
          <Col span="24">
            
            <Row>
              <div>
                <span>查询条件：</span>
                <Input v-model="query.wheres.name" @on-keydown.enter="personSearch" style="width:30%" placeholder="请输入执法人..."></Input>
                <Input v-model="query.wheres.yycert" @on-keydown.enter="personSearch" style="width:30%" placeholder="请输入执法号..."></Input>
                <Button  @click="personSearch" type="info" icon="ios-search" shape="circle">搜索</Button>
              </div>
            </Row>
            <Row >
              <div style="margin-top:10px">
                <Table :columns="columnsPeople" :data="selectPeopleList" border :height="300"></Table>
              </div>
            </Row>
            <Row>
              <div class="bottom">
                  <Page show-total :total="totalNum" show-sizer 
                placement=top @on-page-size-change="pageSizeChange" :page-size="query.size" 
                :current="query.page" @on-change="changePage" ></Page>
              </div>
          </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  </transition>
</template>
<script>
export default {
  name: "enforcers",
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
      lessimit: 1,
      loading:true,
      options:[],
      peopleList: [],
      nameArray:[],
      person: [],
      dataTest:[
        {
          title:"执法人",
        }
      ],
      selectIndex:"",
      selectPeople:false,
      initiator:"",
      query: {
        page: 1,
        size: 10,
        wheres: {
          name: "",
          yycert:"",
        },
      },
      
      selectPeopleList:[],
      totalNum:1,
      columnsPeople:[
        {
          title:'序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          key: 'name',
          title: '执法人',
          align: 'center'
        },
        {
          key: 'yycert',
          title: '编号',
        },
        {
            title: "选择",
            key: "uuid",
            align: "center",
            width:100,
            render: (h, params) => {
            return h(
                "Button",
                {
                    props: {
                        type: "success",
                        size: "small"
                    },
                    on: {
                        click: () => {
                            this.savePerson(params.row);
                        }
                    }
                },
                "确认"
            );
        }}
      ]
    };
  },
  methods: {
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    handleSearch (query) {
      this.options = this.peopleList.filter(item => item.name.indexOf(query) > -1);
    },
    
    // findPerson(index) {
    //   if (this.isEmpty(this.person[index].uuid)) {
    //     this.person[index].yycert = "";
    //     this.$emit("on-change", this.person);
    //     return;
    //   }
    //   var data = this.person[index];
    //   console.log("----------------------");
    //   console.log(data);
    //   this.peopleList.forEach(element => {
    //     if (element.uuid == data.uuid) {
    //       this.person[index].yycert = element.yycert;
    //       this.person[index].name = element.name;
    //       this.$emit("on-change", this.person);
    //       return;
    //     }
    //   });
    // },
    onChange(value){
      this.$emit("on-change", this.person);
    },
    selectChange(value,number){
      // console.log(value);
      // console.log(number);
      // for (let index = 0; index < this.peopleList.length; index++) {
      //   const element = this.peopleList[index];

      //   if(element.uuid == this.person[number].name){
      //     console.log("enter mater");
      //     this.person[number].name = element.name;
      //     this.person[number].yycert = element.yycert;
      //     this.person[number].uuid = element.uuid;
      //     break;
      //   }
      // }

      //this.$emit("on-change", this.person);

    },
    add() {
      if (this.person.length >= this.toplimit) {
        this.$Message.error("人员已达到上限");
        return;
      }
      var data = {
        name: "",
        yycert: ""
      };
      this.person.push(data);
    },
    deleteInfo(index) {
      // if (this.person.length == 1) {
      //   this.$Message.error("必须存在一条数据");
      //   return;
      // }
      this.person.splice(index, 1);
      this.callBack();
    },
    createList() {
      this.$http
        .get("/enforces/enforcers/getList")
        .then(res => {
          if (res.success && !this.isEmpty(res.data)) {
            this.options = this.peopleList = res.data;
            this.$emit("select-data", this.peopleList);
          } else {
            this.$Message.error("暂无人员数据");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    callBack(){
      // 是否需要空校验，不合法校验过滤后返回
      console.log("-----------------");
      this.$emit("on-change", this.person);
    },
    pageSizeChange(size) {
      this.query.size = size;
      //this.handleSearch();
    },
    changePage(page) {
      this.query.page = page;
      this.personSearch();
    },
    parentPersonSearch(){
      this.initiator = "parent";
      this.query.wheres.name="";
      this.personSearch();
    },
    personSearch(){

      this.$http
        .get("/enforces/enforcers/page",{
          params: {
            name:this.query.wheres.name,
            yycert: this.query.wheres.yycert,
            page:this.query.page,
            size:this.query.size,
          }
        })
        .then(res => {
          if (res.success && !this.isEmpty(res.data)) {
            this.selectPeopleList = res.data.data;
            this.totalNum = res.data.total;
            this.selectPeople = true;
          } else {
            console.log(".");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handlePersonSearch(index){
      this.selectIndex = index;
      this.initiator = "";
      this.query.wheres.name="";
      this.personSearch();
    },
    savePerson(element){
      if(this.initiator == "parent"){
        this.$emit("person", element);
        this.selectPeople =false;
        return;
      }
      this.person[this.selectIndex] = element;
      this.selectPeople =false;
      this.callBack();
    },
  },
  mounted() {
    this.createList();
    this.person = this.dataList;
  },
  watch: {

  }
};
</script>
<style  scoped>
.demo-auto-complete-item{
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
    max-height: 200px;
    overflow: auto;
}
.demo-auto-complete-group{
    font-size: 12px;
    padding: 4px 6px;
}
.demo-auto-complete-group span{
    color: #666;
    font-weight: bold;
}
.demo-auto-complete-group a{
    float: right;
}
.demo-auto-complete-count{
    float: right;
    color: #999;
}
.demo-auto-complete-more{
    display: block;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
    font-size: 12px;
}
.bottom {
  padding-top: 10px;
  overflow: hidden;
}
.ivu-page {
    float: right;
}
</style>

