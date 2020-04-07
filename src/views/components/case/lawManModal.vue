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
                  </FormItem>
              </Col>
              <Col span="10">
                  <FormItem label="执法号:">
                      <Input v-model="data.yycert" @on-blur="callBack()"></Input>
                  </FormItem> 
              </Col>
              <Col span="2" >
                      &nbsp;&nbsp;
                      <Button @click="deleteInfo(index)" :size="size" type="error" >删除</Button>
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
          </Col>
        </Row>
      </Modal>
    </div>
  </transition>
</template>
<script>
export default {
  name: "lawManModal",
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
    
    onChange(value){
      this.$emit("on-change", this.person);
    },
    selectChange(value,number){
 

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

