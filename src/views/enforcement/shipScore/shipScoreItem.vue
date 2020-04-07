<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import '../styles/child.less';
</style>
<template>
<div>
    <Row>
        <Col span="5">
            <div style="padding-right:10px">
                <Card>
                    <p slot="title">
                        <Icon type="ios-home"></Icon>
                        记分条例
                    </p>

                    <div>
                        <Input v-model="treeSearch" icon="ios-search" size="small" placeholder="请输入..."></Input>
                    </div>
                    <div :style="'overflow:auto;height:'+ treeHeight +'px'">
                        <Tree :data="filterTree" @on-select-change="selectNode"></Tree>
                    </div>
                </Card>
            </div>
        </Col>
        <Col span="19">
            <Card>
                <div id="law_content" :style="'height:'+(WrapHeight)+'px;overflow:auto'" >
                    <template v-for = "selectNode in selectNodes">
                        <li class="lawContent" v-if="selectNode.content" v-html="selectNode.content" :key="'content_'+selectNode.id"></li>
                        <li class="lawFirstTitle" v-else v-html="selectNode.title" :key="'title_'+selectNode.id"></li>

                        <template v-for = "node in selectNode.children">
                            <li class="lawContent" v-if="node.content" style="text-indent: 2em; font-color:#000000; font-family:宋体;" v-html="'('+node.sort+') '+node.content" :key="'content_'+node.id"></li>
                            <li class="lawTitle" v-else v-html="node.title" :key="'title_'+node.id"></li>
                            <template v-for = "item in node.children">
                                <li class="lawContent" v-if="item.content" v-html="'('+item.sort+') '+item.content" :key="'title_'+item.id"></li>
                                <li class="lawLastTitle" v-else v-html="item.title" :key="'title_'+item.id"></li>
                            </template>	
                        </template> 
                    </template>
                </div>
            </Card>
        </Col>
    </Row>
</div>

</template>
<script>
export default {
    name:"shipScoreItem",
    data(){
        return {
            treeQuery:{
                key:"getScoreItemTree"
            },
            treeSearch:"",
            selectNodes:[],
            treeList: [],
        }
    },
    computed:{
        // filterTree() {
        //     var tree = this.$util.deepCopy(this.treeList);
        //     return this.$util.diguiTree(tree, this.treeSearch);
        // },
        filterTree(){
            var _self=this
            var json=JSON.stringify(this.treeList);
            var tree=JSON.parse(json);
            return this.$util.diguiTree(tree,this.treeSearch,function(node,search){
                if(!_self.$util.isNull(node.content) && node.content.indexOf(search) >= 0){
                    if(!_self.$util.isEmpty(_self.treeSearch))
                        node.content = node.content.replace(new RegExp(_self.treeSearch,'g'),"<span style='background:yellow'>"+_self.treeSearch+"</span>");
                    return true;
                }
                return (_self.$util.isNull(node.title) && node.title.indexOf(search) >= 0)
            });
        },
        treeHeight() {
            return this.$store.state.app.treeHeight - (this.useZtree ? 10 : 34);
        },
        WrapHeight() {
            return this.$store.state.app.orginalSinglePage != 0
            ? this.$store.state.app.orginalSinglePage  - 32 - 16
            : this.$store.state.app.orginalFlexWrap - 32 - 16;
        },
    },
    methods: {

        selectNode(nodes){
            if(nodes.length==0){
                return;
            };
            var _self=this;
            _self.selectNodes = nodes;
        },
        getTree(){
            this.$http.get("/enforces/shipscoreitem/tree",{
                params:{
                    query:JSON.stringify(this.treeQuery)
                }
            })
            .then(result =>{
                if(result.success){
                    var tree=result.data;
                    this.treeList=tree;
                    this.selectNodes=tree;
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    mounted(){
        var page = document.getElementsByClassName("single-page-con");
        var wrap = document.getElementsByClassName("flex-wrap");
        var search = document.getElementsByClassName("search-wrap");
        var bottom = document.getElementsByClassName("bottom-wrap");
        if (search.length > 0)
            this.$store.commit("setSearchHeight", search[0].clientHeight);
        if (bottom.length > 0)
            this.$store.commit("setBottomHeight", bottom[0].clientHeight);
        if (page.length > 0) {
            this.$store.commit("setPageHeight", page[0].clientHeight);
        } else if (wrap.length > 0) {
            this.$store.commit("setWrapHeight", wrap[0].clientHeight);
        } else {
            console.log("error");
        }
        this.getTree();         
    }
  
};
</script>

<style scoped>
	.lawContent{
		text-indent: 2em; 
		color:#000000; 
		font-family:Microsoft YaHei;
	}
	
	.lawTitle{
		font-weight:bold; 
		color:#000000; 
		/*font-family:宋体; */
		font-size:18px;
	}

	.lawFirstTitle{
		text-align: center; 
		font-weight:bolder;
		color:#000000; 
		/*font-family:宋体; */
		font-size:18px;
	}

	.lawLastTitle{
		/*font-family:宋体; */
		font-size:15px;
	}
	#h_gad_right label{
	  width:30px;
	  height:30px;
	  line-height:30px;
	  padding-left:10px;
	}
	.h_gad{
		color:#000000 !important;
		font-family:Microsoft YaHei !important;
	}
	li{  
         list-style-type:none;  
    }  
    .searchHead{
        position: absolute;
        width: 100%;
        padding:8px;
        z-index: 1000;
        background-color: #FFF;
    }
</style>

