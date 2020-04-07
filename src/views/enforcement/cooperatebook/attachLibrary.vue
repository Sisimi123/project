<style scoped>

</style>

<template>
    <div>
        <data-table 
        ref="test" 
        :withTree="false" 
        :autoInitTable="false"
        :useZtree="false"
        :treeTitle="'部门'"
        :url="'/standingbook/attachs/list'" 
        :params="query" 
        :columns="columns"
        >
        <div slot="search">
            <Form :label-width="52" @submit.native.prevent>
                <Row>
                    <Col span="4" style="margin-left: 10px;">
                        <Form-item label="渔船名:">
                            <Input v-model="query.wheres.shipName_like"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="4" style="margin-left: 10px;">
                        <Form-item label="上传者:">
                            <Input v-model="query.wheres.creatorName_like"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="4" style="margin-left: 10px;">
                        <Form-item label="人名:">
                            <Input v-model="query.wheres.name_like"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="4" style="margin-left: 10px;">
                        <Form-item label="模块:">
                            <!-- <Input v-model="query.wheres.modelId"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input> -->
                            <Select v-model="query.wheres.modelId">
                                <Option v-for="item in defaultModelId" :value="item.value" :key="item.value">{{ item.title }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <div class="btn-wrap">
                        <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                        <Button @click="handleReset()"  >重置</Button>
                    </div>
                </Row>
            </Form>
        </div>
    </data-table>
    <pic v-model="showPic" :img="showPicPathWithBase"></pic>
    </div>
</template>

<script>
import pic from '@/views/components/pic/pic.vue';
export default {
    name: 'attachLibrary',
    components:{
        pic
    },
    data () {
        return {
            query: {
                // deptId: '',
                page: 1,
                size: 10,
                wheres : {
                    modelId: '',
                    shipName_like: '',
                    creatorName_like: '',
                    name_like: ''
                }
            },
            showPic:false,
            showPicId:"",
            columns: [
                {
                    title:'序号',
                    type: 'index',
                    maxWidth:80,
                    align: 'center',
                },
                {
                    title:'渔船名',
                    align:'center',
                    key:'shipName'
                },
                {
                    title:'船东',
                    align:'center',
                    key:'owner'
                },
                {
                    title:'船员',
                    align:'center',
                    key:'name'
                },
                 {
                    title:'上传者',
                    align:'center',
                    key:'creatorName'
                },
                {
                    title:'模块名',
                    align:'center',
                    key:'modelId',
                    render: (h,params) => {
                        var str = ''
                        for (let i = 0; i < this.defaultModelId.length; i++) {
                            if (params.row.modelId == this.defaultModelId[i].value) {
                                str = this.defaultModelId[i].title
                                break
                            }
                        }
                        return h('span',str)
                    }
                },
                {
                    title:'上传时间',
                    align:'center',
                    key:'createTime'
                },
                 {
                    title:'操作',
                    align:'center',
                    width:255,
                    render: (h,params) => {
                        var _self = this;
                        var row=params.row;
                        return h('div', [
                            h('Button', 
                            {
                                props: {
                                    type: "info",
                                    size: "small"
                                },
                                style: {

                                },
                                on: {
                                    click:()=> {
                                        _self.showFile(row);
                                    }
                                }
                            }, '查看'),
                            h('Button', 
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                         _self.deleteFile(row.attachmentId);
                                    }
                                }
                            }, '删除'),
                        ])
                    }
                }
            ],
        }
    },
    methods: {
        initSearch () {
            this.$refs.test.initSearch();
        },
        handleReset() {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = "";
            }
            this.initSearch();
        },
        deleteFile(id){
            let _self = this;
            _self.$Modal.confirm({
                title:"提示",
                content:"确定要删除当前附件吗？",
                onOk:function(){
                    this.$http.delete("/standingbook/attachs/"+id).then(result =>{
                        if(result.success){
                            _self.$Message.info("删除成功");
                            _self.initSearch();
                        }else{
                            _self.$Message.info(result.msg);
                        }
                    });
                   
                }
            });
        },
        isPic(item){
            var name=item.type;
            if (name=="jpg" || name=="bmp" || name=="png" || name=="jpeg" || name=="tiff" || name=="gif") {
                return true
            } else {
                return false
            }
            // var index=name.lastIndexOf(".");
            // var suffix=index>0?name.substring(index):"";
            // return suffix!='' && (".bmp,.jpg,.png,.jpeg,.tiff,.gif".indexOf(suffix.toLowerCase())>=0)
        },
        showFile:function(item){
            if(this.isPic(item)){
                this.showPicId=item.attachmentId;
                this.showPic=true;
            }else{
                window.open(this.$basePath+"/$admin/attachs/stream/"+item.attachmentId);
            }
        },
    },
    mounted () {
        this.initSearch();
    },
    computed: {
        showPicPathWithBase(){
            return this.$basePath+"/$admin/attachs/stream/"+this.showPicId;
        },
        defaultModelId () {
            var dicTypes = this.$store.getters.getDictList('attachLib_id');
            // console.log(dicTypes)
            // var workType = [];
            // dicTypes.forEach(element => {
            //     workType.push({
            //         title: element.title,
            //         value: element.title
            //     });
            // });
            // workType.push({
            //     title: '辅助船',
            //     value: '辅助船'
            // });
            return dicTypes;
        }
    }
}
</script>


