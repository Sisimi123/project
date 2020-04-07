<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <data-table ref="test" 
      :url="'/check/skdb/getPageNew'" :params="query" :columns="columns" 
      @on-select-change="selectTreeChange"
      >
      <div slot="search">
          <!-- label-width 长度根据实际情况自行调整 -->
          <Form :label-width="80" @submit.native.prevent>
            <Row>
              <Col span="6">
                  <Form-item label="船名:">
                    <Input v-model="query.shipName" icon="ios-search" placeholder="请输入..."></Input>
                  </Form-item>
              </Col>

              <div class="btn-wrap">
                <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                <Button @click="handleReset()"  >重置</Button>
              </div>

              <span style="float:right;">
                  <Button @click="viewCount2" type="warning">统计</Button>
                  <Button @click="viewCount" type="success">四库汇总</Button>
              </span>
            </span>
          </Row>
          </Form>
      </div>
  </data-table>

  <Modal v-model="status.skhcModal" class="vertical-center-modal detail"  title="四库核查"  width="860" >
   	 <Form ref="skhc"  :model="skhc" :label-width="100">
        <Row>
            <Col span="12">
                <Form-item label="渔船名：" >
                    <Input v-model="skhc.shipname"  placeholder="请输入渔船名" readonly></Input> 
                </Form-item>
            </Col>
        </Row>
        <Row>

            <Col span="8">
                <Form-item :label="'船检'+dateYear.near3+''" :label-width="90">
                    <Radio-group v-model="skhc.cjNear3"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
            <Col span="8">
                <Form-item :label="'船检'+dateYear.near2+''" :label-width="90">
                    <Radio-group v-model="skhc.cjNear2"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
            <Col span="8">
                <Form-item :label="'船检'+dateYear.near1+''" :label-width="90">
                    <Radio-group v-model="skhc.cjNear1"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <Form-item :label="'年审'+dateYear.near3+''" :label-width="90">
                    <Radio-group v-model="skhc.nsNear3"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
            <Col span="8">
                <Form-item :label="'年审'+dateYear.near2+''" :label-width="90">
                    <Radio-group v-model="skhc.nsNear2"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
            <Col span="8">
                <Form-item :label="'年审'+dateYear.near1+''" :label-width="90">
                    <Radio-group v-model="skhc.nsNear1"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <Form-item :label="'油补'+dateYear.near3+''" :label-width="90">
                    <Radio-group v-model="skhc.ubNear3"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
            <Col span="8">
                <Form-item :label="'油补'+dateYear.near2+''" :label-width="90">
                    <Radio-group v-model="skhc.ubNear2"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
            <Col span="8">
                <Form-item :label="'油补'+dateYear.near1+''" :label-width="90">
                    <Radio-group v-model="skhc.ubNear1"  type="button">
                        <Radio label="有" ></Radio>
                        <Radio label="无" ></Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        </Row>
        <Row>
	        <table class="zcl_ls_table2" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<th></th>
					<th>渔政指挥系统</th>
					<th>渔船检验</th>
					<th>救助系统</th>
					<th>年审</th>
					<th>油补系统</th>
				</tr>
				<tr v-for="item in skhc.fields"  :data-light-switch="item.status" :key="item.id">
			      	<td >{{item.fieldname}}</td>
			       	<td >
			       		<template v-if="item.yzvalue != null">
				            {{item.yzvalue}}
				        </template>
				        <template v-else>
				            <Icon type="md-close" color="red" size="small"></Icon>
				        </template>
			       	</td>
			       	<td>
			       		<template v-if="item.cjvalue != null">
					       	{{item.cjvalue}}
				        </template>
				        <template v-else>
				            <Icon type="md-close" color="red" size="small"></Icon>
				        </template>
			       	</td>
			       	<td>
			       		<template v-if="item.jzvalue != null">
					       	{{item.jzvalue}}
				        </template>
				        <template v-else>
				            <Icon type="md-close" color="red" size="small"></Icon>
				        </template>
			       	</td>
			       	<td>
			       		<template v-if="item.nsvalue != null">
					       	{{item.nsvalue}}
				        </template>
				        <template v-else>
				            <Icon type="md-close" color="red" size="small"></Icon>
				        </template>
			       	</td>
			       	<td >
			       		<template v-if="item.ubvalue != null">
					       	{{item.ubvalue}}
				        </template>
				        <template v-else>
				            <Icon type="md-close" color="red" size="small"></Icon>
				        </template>
			       	</td>
				</tr>
			</table>
		   <div class="note2" >
			 	<span style="margin-right:10px;">备注:</span><Icon type="md-close" color="red" size="small"></Icon>
			 	表示此系统没有渔船,空白表示有渔船但没数据
		   </div>
        </Row>
        <Row v-show="skhc.realShip!='0'" style="margin-top:10px;">
        	 <Col span="8">
                <Form-item label="船检证书：" :label-width="80">
                    <Radio-group v-model="skhc.cj"  type="button">
                        <Radio label="有效" >有效</Radio>
                        <Radio label="过期" >过期</Radio>
                        <Radio label="不存在" >不存在</Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        	 <Col span="8">
                <Form-item label="捕捞证书：" :label-width="80">
                    <Radio-group v-model="skhc.bl"  type="button">
                        <Radio label="有效" >有效</Radio>
                        <Radio label="过期" >过期</Radio>
                        <Radio label="不存在" >不存在</Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        	 <Col span="8">
                <Form-item label="所有权证书：" :label-width="90">
                    <Radio-group v-model="skhc.syq"  type="button">
                        <Radio label="有效" >有效</Radio>
                        <Radio label="过期" >过期</Radio>
                        <Radio label="不存在" >不存在</Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        </Row>
     </Form>
     <div slot="footer">
     		<i-Button  @click="status.skhcModal=false">关闭</i-Button>
     </div>
  </Modal>

  <Modal v-model="status.itemModal" width="860" title="查看">
    <div class="note3">{{eachLine.shipname}}</div>
    <i-table border :columns="modalColumns" :data="eachLine.itemList" ></i-table>
    <div class="note">
      <span style="margin-right:10px;margin-left:10px;">备注:</span><Icon type="md-close" color="red" size="small"></Icon>
      表示此系统没有渔船,空表示有渔船但没数据
    </div>
    <div slot="footer">
        <i-Button  @click="status.itemModal=false">关闭</i-Button>
    </div>
  </Modal>

  <skdbCount 
  v-model="status.showCount" 
  okText="确定"
  @on-ok="handleDefault()"
  cancelText="返回"
  @on-cancel="handleDefault()"
  ></skdbCount>

  <skdbCount2 
  v-model="status.showCount2" 
  :title="currNode.title"
  :area="currNode"
  okText="确定"
  @on-ok="handleDefault()"
  cancelText="返回"
  @on-cancel="handleDefault()"
  ></skdbCount2>
</div>
</template> 

<script>
import pic from "../../components/pic/pic.vue";
import skdbCount from "./components/skdbCount.vue";
import skdbCount2 from "./components/skdbCount2.vue";

export default {
  name: "skdb",
  components: {
    pic,
    skdbCount,
    skdbCount2
  },
  data() {
    return {
      status: {
        isLoading: true,
        itemModal: false,
        skhcModal: false,
        showCount: false,
        showCount2: false
      },
      treeQuery: {
        includes: "30,44,45,70,99",
        type: 1
      },
      query: {
        page: 1,
        size: 10,
        shipName:"",
        orders: "updateTime desc"
      },
      // columns: [
      //   {
      //     title: "序号",
      //     type: "index",
      //     width: 80,
      //     fixed: 'left',
      //     align: "center"
      //   },
      //   {
      //     title: "渔船名",
      //     key: "shipname",
      //     align: "center",
      //     fixed: 'left',
      //     width: 160,
      //   },
      //   {
      //     title: "船东",
      //     key: "cd",
      //     width: 140,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.realColor(params.row.cd)
      //           },
      //           on: {
      //             click: () => {
      //               this.showEachVal(params.row.id, "船东");
      //             }
      //           }
      //         },
      //         this.realValue(params.row.cd)
      //       );
      //     }
      //   },
      //   {
      //     title: "型宽",
      //     key: "xk",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.realColor(params.row.xk)
      //           },
      //           on: {
      //             click: () => {
      //               this.showEachVal(params.row.id, "型宽");
      //             }
      //           }
      //         },
      //         this.realValue(params.row.xk)
      //       );
      //     }
      //   },
      //   {
      //     title: "船长",
      //     key: "cc",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.realColor(params.row.cc)
      //           },
      //           on: {
      //             click: () => {
      //               this.showEachVal(params.row.id, "船长");
      //             }
      //           }
      //         },
      //         this.realValue(params.row.cc)
      //       );
      //     }
      //   },
      //   {
      //     title: "作业方式",
      //     key: "zyfs",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.realColor(params.row.zyfs)
      //           },
      //           on: {
      //             click: () => {
      //               this.showEachVal(params.row.id, "作业方式");
      //             }
      //           }
      //         },
      //         this.realValue(params.row.zyfs)
      //       );
      //     }
      //   },
      //   {
      //     title: "主机功率",
      //     key: "zjgl",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.realColor(params.row.zjgl)
      //           },
      //           on: {
      //             click: () => {
      //               this.showEachVal(params.row.id, "主机功率");
      //             }
      //           }
      //         },
      //         this.realValue(params.row.zjgl)
      //       );
      //     }
      //   },
      //   {
      //     title: "联系电话",
      //     key: "lxfs",
      //     width: 160,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.realColor(params.row.lxfs)
      //           },
      //           on: {
      //             click: () => {
      //               this.showEachVal(params.row.id, "联系电话");
      //             }
      //           }
      //         },
      //         this.realValue(params.row.lxfs)
      //       );
      //     }
      //   },
      //   {
      //     title: "AIS",
      //     key: "mmsi",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       if(this.isEmpty(params.row.mmsi)){
      //         return h(
      //           "Icon",
      //           {
      //             props: {
      //               type: "close-round",
      //               color: "red",
      //               size: "small"
      //             },
      //           },
      //           params.row.mmsi
      //         );
      //       }else{
      //         return h("span",params.row.mmsi);
      //       }
      //     }
      //   },
      //   {
      //     title: "船检(一年前)",
      //     key: "cjNear1",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.cjNear1)
      //           },
      //         },
      //         this.haveValue(params.row.cjNear1)
      //       );
      //     }
      //   },
      //   {
      //     title: "船检(二年前)",
      //     key: "cjNear2",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.cjNear2)
      //           },
      //         },
      //         this.haveValue(params.row.cjNear2)
      //       );
      //     }
      //   },
      //   {
      //     title: "船检(三年前)",
      //     key: "cjNear3",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.cjNear3)
      //           },
      //         },
      //         this.haveValue(params.row.cjNear3)
      //       );
      //     }
      //   },
      //   {
      //     title: "油补(一年前)",
      //     key: "ubNear1",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.ubNear1)
      //           },
      //         },
      //         this.haveValue(params.row.ubNear1)
      //       );
      //     }
      //   },
      //   {
      //     title: "油补(二年前)",
      //     key: "ubNear2",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.ubNear2)
      //           },
      //         },
      //         this.haveValue(params.row.ubNear2)
      //       );
      //     }
      //   },
      //   {
      //     title: "油补(三年前)",
      //     key: "ubNear3",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.ubNear3)
      //           },
      //         },
      //         this.haveValue(params.row.ubNear3)
      //       );
      //     }
      //   },
      //   {
      //     title: "年审(一年前)",
      //     key: "nsNear1",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.nsNear1)
      //           },
      //         },
      //         this.haveValue(params.row.nsNear1)
      //       );
      //     }
      //   },
      //   {
      //     title: "年审(二年前)",
      //     key: "nsNear2",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.nsNear2)
      //           },
      //         },
      //         this.haveValue(params.row.nsNear2)
      //       );
      //     }
      //   },
      //   {
      //     title: "年审(三年前)",
      //     key: "nsNear3",
      //     width: 120,
      //     align: "center",
      //     render: (h, params) => {
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             type: this.color(params.row.nsNear3)
      //           },

      //         },
      //         this.haveValue(params.row.nsNear3)
      //       );
      //     }
      //   },
      //   {
      //     title: "操作",
      //     key: "id",
      //     align: "center",
      //     fixed: 'right',
      //     width: 120,
      //     render: (h, params) => {
      //       var temp = [];
      //       temp.push(
      //         h(
      //           "Button",
      //           {
      //             props: {
      //               type: "info",
      //               size: "small"
      //             },
      //             style: {
      //               marginRight: "5px"
      //             },
      //             on: {
      //               click: () => {
      //                 this.showDetails(params.row);
      //               }
      //             }
      //           },
      //           "详情"
      //         )
      //       );

      //       return h("div", temp);
      //     }
      //   },
      // ],
      modalColumns: [
        {
          title: "名称",
          key: "fieldname",
          align: "center"
        },
        {
          title: "渔政指挥系统",
          key: "yzvalue",
          align: "center",
          render: (h, params) => {
            return this.showTd(h, params.row.yzvalue);
          }
        },
        {
          title: "渔船检验",
          key: "cjvalue",
          align: "center",
          render: (h, params) => {
            return this.showTd(h, params.row.cjvalue);
          }
        },
        {
          title: "救助系统",
          key: "jzvalue",
          align: "center",
          render: (h, params) => {
            return this.showTd(h, params.row.jzvalue);
          }
        },
        {
          title: "年审",
          key: "nsvalue",
          align: "center",
          render: (h, params) => {
            return this.showTd(h, params.row.nsvalue);
          }
        },
        {
          title: "油补系统",
          key: "ubvalue",
          align: "center",
          render: (h, params) => {
            return this.showTd(h, params.row.ubvalue);
          }
        }
      ],
      skhc: {
        fields: []
      },
      eachLine: {
        itemList: [],
        shipname: ""
      },
      dateYear:{
        current:"",
        near1:"",
        near2:"",
        near3:"",
      },
      currNode:{},
    };
  },

  computed: {
    currentYear(){
      return new Date().getFullYear();
    },
    columns(){
      console.log("test");
      return [
        {
          title: "序号",
          type: "index",
          width: 80,
          fixed: 'left',
          align: "center"
        },
        {
          title: "渔船名",
          key: "shipname",
          align: "center",
          fixed: 'left',
          width: 160,
        },
        {
          title: "船东",
          key: "cd",
          width: 140,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.realColor(params.row.cd)
                },
                on: {
                  click: () => {
                    this.showEachVal(params.row.id, "船东");
                  }
                }
              },
              this.realValue(params.row.cd)
            );
          }
        },
        {
          title: "型宽",
          key: "xk",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.realColor(params.row.xk)
                },
                on: {
                  click: () => {
                    this.showEachVal(params.row.id, "型宽");
                  }
                }
              },
              this.realValue(params.row.xk)
            );
          }
        },
        {
          title: "船长",
          key: "cc",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.realColor(params.row.cc)
                },
                on: {
                  click: () => {
                    this.showEachVal(params.row.id, "船长");
                  }
                }
              },
              this.realValue(params.row.cc)
            );
          }
        },
        {
          title: "作业方式",
          key: "zyfs",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.realColor(params.row.zyfs)
                },
                on: {
                  click: () => {
                    this.showEachVal(params.row.id, "作业方式");
                  }
                }
              },
              this.realValue(params.row.zyfs)
            );
          }
        },
        {
          title: "主机功率",
          key: "zjgl",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.realColor(params.row.zjgl)
                },
                on: {
                  click: () => {
                    this.showEachVal(params.row.id, "主机功率");
                  }
                }
              },
              this.realValue(params.row.zjgl)
            );
          }
        },
        {
          title: "联系电话",
          key: "lxfs",
          width: 160,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.realColor(params.row.lxfs)
                },
                on: {
                  click: () => {
                    this.showEachVal(params.row.id, "联系电话");
                  }
                }
              },
              this.realValue(params.row.lxfs)
            );
          }
        },
        {
          title: "AIS",
          key: "mmsi",
          width: 120,
          align: "center",
          render: (h, params) => {
            if(this.isEmpty(params.row.mmsi)){
              return h(
                "Icon",
                {
                  props: {
                    type: "close-round",
                    color: "red",
                    size: "small"
                  },
                },
                params.row.mmsi
              );
            }else{
              return h("span",params.row.mmsi);
            }
          }
        },
        {
          title: "船检" + (this.currentYear -1),
          key: "cjNear1",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.cjNear1)
                },
              },
              this.haveValue(params.row.cjNear1)
            );
          }
        },
        {
          title: "船检" + (this.currentYear -2),
          key: "cjNear2",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.cjNear2)
                },
              },
              this.haveValue(params.row.cjNear2)
            );
          }
        },
        {
          title: "船检" + (this.currentYear -3),
          key: "cjNear3",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.cjNear3)
                },
              },
              this.haveValue(params.row.cjNear3)
            );
          }
        },
        {
          title: "油补"+ (this.currentYear -1),
          key: "ubNear1",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.ubNear1)
                },
              },
              this.haveValue(params.row.ubNear1)
            );
          }
        },
        {
          title: "油补" + (this.currentYear -2),
          key: "ubNear2",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.ubNear2)
                },
              },
              this.haveValue(params.row.ubNear2)
            );
          }
        },
        {
          title: "油补" + (this.currentYear -3),
          key: "ubNear3",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.ubNear3)
                },
              },
              this.haveValue(params.row.ubNear3)
            );
          }
        },
        {
          title: "年审" + (this.currentYear -1),
          key: "nsNear1",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.nsNear1)
                },
              },
              this.haveValue(params.row.nsNear1)
            );
          }
        },
        {
          title: "年审" + (this.currentYear -2),
          key: "nsNear2",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.nsNear2)
                },
              },
              this.haveValue(params.row.nsNear2)
            );
          }
        },
        {
          title: "年审" + (this.currentYear -3),
          key: "nsNear3",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: this.color(params.row.nsNear3)
                },

              },
              this.haveValue(params.row.nsNear3)
            );
          }
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          fixed: 'right',
          width: 120,
          render: (h, params) => {
            var temp = [];
            temp.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.initSearch();
                      this.showDetails(params.row);
                    }
                  }
                },
                "详情"
              )
            );

            return h("div", temp);
          }
        },
      ];
    }
  },
  mounted() {
    let now = new Date().getFullYear();
    this.dateYear.current = now;
    this.dateYear.near1 = now - 1;
    this.dateYear.near2 = now - 2;
    this.dateYear.near3 = now - 3;
    
  },
  // 方法.事件
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    isEmpty(s) {
      if (s == "" || s == undefined || s == null) {
        return true;
      }
      return false;
    },
    viewCount() {
      this.status.showCount = true;
    },
    viewCount2() {
      this.status.showCount2 = true;
    },
    showTd(h, value) {
      if (value == null) {
        return [
          h("Icon", {
            props: {
              type: "md-close",
              size: "small",
              color: "red"
            }
          })
        ];
      } else {
        return h("span", value);
      }
    },

    realValue(value) {
      if (this.isEmpty(value) || value == "无数据") {
        return "无数据";
      } else if (value == "不相符") {
        return "不符";
      } else {
        return value;
      }
    },
    realColor(value) {
      if (this.isEmpty(value) || value == "无数据") {
        return "warning";
      } else if (value == "不相符") {
        return "error";
      } else if(/\)$/.test(value)){
        return "text";
      } else {
        return "success";
      }
    },
    color(value){
      if(value =="有"){
        return "success";
      } else {
        return "error";
      }

    },
    haveValue(value){
      if (value =="有"){
        return value;
      }else{
        return "无";
      }
    },
    showDetails(item) {
      if (this.isEmpty(item)) {
        return;
      }
      this.$http
        .get("/check/skdb/fetchSubfields", {
          params: {
            id: item.id
          }
        })
        .then(res => {
          this.skhc = item;
          this.skhc.fields = res.data;
          this.status.skhcModal = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    showEachVal(id, name) {
      if (this.isEmpty(id)) {
        return;
      }

      this.eachLine.itemList = [];
      this.eachLine.shipname = "";
      this.$http
        .get("/check/skdb/fetchSubfields", {
          params: {
            id: id,
            fieldname: name
          }
        })
        .then(res => {
          this.eachLine.itemList.push(res.data);
          this.eachLine.shipname = res.shipname;
          this.status.itemModal = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSearch(value) {
      if (value == 1) {
        this.query.page = 1;
      }
      this.$refs.test.handleSearch();
    },
    selectTreeChange(nodes) {
      this.currNode = nodes[0];
      this.query.areaPath = this.currNode.path;
      this.initSearch();
    },
    // 查询重置
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.query.shipName = "";
      (this.query.page = 1), (this.query.size = 10), this.handleSearch();
    },

    // 页面条数选择
    pageSizeChange(size) {
      this.query.size = size;
      this.handleSearch();
    },
    // 分页查询
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
    },
    handleDefault() {}
  }
};
</script>

<style scoped>
.detail .ivu-form-item{
    margin-bottom: 10px !important;
}

.note {
  height: 48px;
  line-height: 48px;
  border: 1px solid #e9eaec;
  border-top: none;
  text-align: center;
}
.note2,
.note3 {
  height: 35px;
  line-height: 35px;
  border: 1px solid #e9eaec;
  border-top: none;
  text-align: center;
}
.note3 {
  height: 35px;
  border: 1px solid #e9eaec;
  font-weight: 700;
  border-bottom: none;
  background: #f8f8f9;
}

.zcl_ls_table,
.zcl_ls_table2 {
  width: 100%;
  font-size: 12px;
  text-align: center;
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  margin_bottom: 10px;
}
.zcl_ls_table th,
.zcl_ls_table2 th {
  height: 30px;
  background-color: #f8f8f9;
}
.zcl_ls_table2 td {
  height: 35px;
  width: 139px;
  text-align: center;
}

.zcl_ls_table th,
.zcl_ls_table td,
.zcl_ls_table2 th,
.zcl_ls_table2 td {
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  /* 			padding-left: 10px; */
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
