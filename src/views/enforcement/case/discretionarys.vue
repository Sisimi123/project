<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
<div>
    <Row>
        <Col span="5">
            <div style="padding-right:10px">
                <Card>
                    <p slot="title">
                        <Icon type="ios-home"></Icon>
                        自由裁量
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
            <Card  >
                <!-- <div id="discretionary_content" :style="'height:'+(clientHeight-160)+'px;padding:5px;overflow:auto'"> -->
                <div id="law_content" :style="'height:'+(WrapHeight)+'px;overflow:auto'" >
                    <div v-show="selectNodes.illegalAct!=null">
                        <!-- <div class="headtitles">{{selectNodes.illegalAct}}</div> -->
                        <table class="discretiontable">
                            <tr>
                                <td class="serial_number">序号</td>
                                <td class="figure">{{selectNodes.num}}</td>
                                <td class="serial_number">权力清单编号</td>
                                <td colspan="2" class="figure">{{selectNodes.rightsnum}}</td>
                            </tr>
                            <tr>
                                <td>违法行为</td>
                                <td colspan="4"> {{selectNodes.illegalAct}}</td>
                            </tr>
                            <tr>
                                <td>违反条款</td>
                                <td colspan="4"><!-- 表示违法条款 -->
                                    {{ selectNodes.illegalClause}}
                                </td>
                            </tr>
                            <tr>
                                <td>处罚依据</td>
                                <td colspan="4"><!-- 处罚依据 -->
                                {{selectNodes.punishAccording}}
                                </td>
                            </tr>
                            <tr>
                                <td>处罚内容</td>
                                <td colspan="4" class="writing_system">
                                {{selectNodes.cfcontent}}
                                </td>
                            </tr>
                            <tr>
                                <td>裁量阶次</td>
                                <td colspan="4" class="paddingbox">
                                <table>
                                <tr>
                                <template v-for = "dicLevel in selectNodes.discretionaryLadder">
                                    <td v-if="dicLevel.ladderType == 0" :key="dicLevel.id">
                                        较轻                              		   
                                    </td>
                                    <td v-if="dicLevel.ladderType == 1" :key="dicLevel.id">
                                        一般                              		   
                                    </td>
                                    <td v-if="dicLevel.ladderType == 2" :key="dicLevel.id">
                                        严重                              		   
                                    </td>
                                    <td v-if="dicLevel.ladderType == 3" :key="dicLevel.id">
                                        特别严重                              		   
                                    </td>
                                </template>
                                </tr>
                                </table>
                                </td>
                            </tr>
                            <tr>
                                <td>裁量种类和罚款幅度</td>
                                <td colspan="4" class="paddingbox">
                                    <table>
                                        <tr>
                                            <template v-for = "dicLevel in selectNodes.discretionaryLadder">
                                                <td :key="dicLevel.id">
                                                    {{dicLevel.discretionaryContent}}                          		   
                                                </td>
                                            </template> 
                                        </tr>
                                        
                                        <tr v-if="selectNodes.discretionaryLadder && selectNodes.discretionaryLadder[0].computationalFormula">
                                            <td v-for = "dicLevel in selectNodes.discretionaryLadder" :key="dicLevel.id">
                                                {{dicLevel.computationalFormula}}                           		   
                                            </td>
                                        </tr>
                                        <tr v-else>
                                            <td colspan="4">
                                                {{selectNodes.powerLadderDescription}}                          		   
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>裁量判断事项</td>
                                <td colspan="4" class="writing_system">
                                    {{selectNodes.judgeItem}}
                                </td>
                            </tr>
                        </table>
                    </div>
                    														
                </div>
            </Card>
        </Col>
    </Row>
</div>

</template>
<script>
export default {
    name:"discretionarys",
    data(){
        return {
            treeQuery:{
                key:"getDiscretionaryTree"
            },
            treeSearch:"",
            selectNodes:{},
            treeList: [],
        }
    },
    computed:{
        filterTree() {
            var tree = this.$util.deepCopy(this.treeList);
            return this.$util.diguiTree(tree, this.treeSearch);
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
            this.selectNodes = nodes[0];
        },
        getTree(){
            var _self=this;
            _self.$http.get("/enforces/discretionary/tree",{
                params:{
                    query:JSON.stringify(_self.treeQuery)
                }
            })
            .then(function(result){
                if(result.success){
                    var tree=result.data;
                    _self.treeList=tree[0]["children"];
                }
            })
            .catch(function (error) {
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

<style  scoped>
	.headtitles{
	  width: 100%;
	  text-align: center;
	  font-size: 20px;
	  margin-top: 30px;
	  font-weight: bold;
	}
	.discretiontable{
		width: 90%;
		margin: 0 auto;
		margin-top: 30px;
		margin-bottom: 30px;
		border-collapse: collapse;
		border-spacing: 0;
	}
	.discretiontable table{
		width: 100% !important;
		/* height: 100% !important; */
		border-collapse: collapse;
		border-spacing:0;
		margin:0;
		padding:0;
		border-width:0px;
		border-style:hidden;
	}
	.discretiontable table td{
		width: 25% !important;
	}
	.discretiontable td{
		border-collapse: collapse;
		border-spacing: 0;
		border: 1px solid black;
		text-align: center;
		padding: 20px 10px;
	}
	.paddingbox{
	  padding: 0px !important;
	}
	.serial_number{
	  width: 15%;
	}
	.figure{
	  width: 35%;
	}
	.writing_system{
	  text-align: center !important;
	}
	.h_gad{
		color:#000000 !important;;
		font-family:Microsoft YaHei !important;
	}
	#h_gad_right label{
	  width:30px;
	  height:30px;
	  line-height:30px;
	  padding-left:15px;
	}

</style>
