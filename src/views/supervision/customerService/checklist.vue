<template>
    <div>
        <data-table ref="test" :url="url" :params="query" :columns="columns">
            <div slot="search">
                <Form :label-width="100" @submit.native.prevent>
                    <Row>
                        <Col span="4">
                            <Form-item label="主体关键字:">
                                <Input
                                    @keyup.enter="initSearch()"
                                    v-model="query.wheres.legalEntityName"
                                    placeholder="请输入..."
                                />
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="检查日期:">
                                <div style="display:flex;">
                                    <DatePicker type="date" v-model="query.wheres.createTime_begin"></DatePicker>&nbsp;&nbsp;- &nbsp;&nbsp;
                                    <DatePicker
                                        type="date"
                                        v-model="query.wheres.createTime_end"
                                        @on-change="endTimeChange"
                                    ></DatePicker>
                                </div>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="检查对象类型:">
                                <Select placeholder="请选择..." v-model="query.wheres.checkObjectType">
                                    <Option
                                        v-for="item in checkedObjList"
                                        :value="item.value"
                                        :key="item.value"
                                    >{{ item.title }}</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <div class="btn-wrap">
                            <Button @click="initSearch" type="primary" icon="ios-search">搜索</Button>
                            <Button @click="handleReset">重置</Button>
                        </div>
                        <!-- <span style="float:right;margin-bottom:10px">
                            <ButtonGroup>
                                <Button
                                    id="test"
                                    @click="status.checkObjModal = true"
                                    type="info"
                                    icon="ios-add"
                                >新增检查</Button>
                            </ButtonGroup>
                        </span>-->
                    </Row>
                </Form>
            </div>
        </data-table>
        <checkObjModal @isSuccess="getStatus" v-model="status.checkObjModal"></checkObjModal>
    </div>
</template>

<script>
import checkObjModal from "../components/checkObjModal.vue";
import user from "@/store/module/user.js";
export default {
    name: "dailyCheckResEntry",
    components: {
        checkObjModal
    },
    data() {
        return {
            taskid: "",
            status: {
                checkObjModal: false
            },
            info: {},
            columns: [
                {
                    title: "序号",
                    type: "index",
                    align: "center",
                    maxWidth: 80
                },
                {
                    title: "主体名称",
                    key: "legalEntityName",
                    align: "center"
                },
                {
                    title: "检查对象类型",
                    key: "checkObjectType",
                    align: "center",
                    render: (h, params) => {
                        var str = "";
                        this.checkedObjList.forEach((v, i) => {
                            if (v.value === params.row.checkObjectType) {
                                str = v.title;
                            }
                        });
                        return h("span", str);
                    }
                },
                {
                    title: "创建时间",
                    key: "createTime",
                    align: "center"
                },
                {
                    title: "任务状态",
                    key: "taskStatus",
                    align: "center",
                    render: (h, params) => {
                        var str = "";
                        if (params.row.taskStatus === "NOCHECK") {
                            str = "待检查";
                        } else if (params.row.taskStatus === "INCHECK") {
                            str = "检查中";
                        } else if (params.row.taskStatus === "NOFINISH") {
                            str = "未完结";
                        } else if (params.row.taskStatus === "FINISH") {
                            str = "已完结";
                            if (params.row.isCheckNoWhereabouts === "1")
                                str += "(查无下落)";
                        }
                        return h("span", str);
                    }
                },
                {
                    title: "检查部门",
                    key: "deptName",
                    align: "center"
                },
                {
                    title: "检查人员",
                    key: "checkUserNames",
                    align: "center"
                },
                {
                    title: "任务类型",
                    key: "taskType",
                    align: "center",
                    render: (h, params) => {
                        var str = "";
                        if (params.row.taskType === "DAILY") {
                            str = "日常检查";
                        } else if (params.row.taskType === "SPECIAL") {
                            str = "专项检查";
                        } else if (params.row.taskType === "RANDOM") {
                            str = "随机检查";
                        } else if (params.row.taskType === "SAFTY") {
                            str = "安全检查";
                        }
                        return h("span", str);
                    }
                }
            ],
            query: {
                page: 1,
                size: 10,
                wheres: {
                    deptId: "",
                    legalEntityName: "",
                    taskSourceName: "",
                    taskStatus: "",
                    checkObjectType: "",
                    createTime_begin: "",
                    createTime_end: ""
                }
            },
            url: ""
        };
    },
    created() {
        this.url = `/supervision/examineTask/${this.$route.query.url}`;
        this.query.wheres.deptId = this.$route.query.deptId;
    },
    methods: {
        endTimeChange(v) {
            var s = v + " 23:59:59";
            s = s.replace(/-/g, "/");
            this.query.wheres.createTime_end = new Date(s);
        },
        getStatus(v) {
            if (v) {
                this.initSearch();
            }
        },
        initSearch() {
            this.$refs.test.initSearch();
        },
        handleReset() {
            this.query.page = 1;
            this.query.size = 10;
            for (let key in this.query.wheres) {
                this.query.wheres[key] = "";
                this.query.wheres.deptId = this.$route.query.deptId;
            }
            this.initSearch();
        }
    },
    watch: {
        // 路由监听
        "$route.query.url"(val) {
            this.url = `/supervision/examineTask/${val}`;
            this.query.page = 1;
            this.query.size = 10;
            this.$nextTick(() => {
                for (let key in this.query.wheres) {
                    this.query.wheres[key] = "";
                    this.query.wheres.deptId = this.$route.query.deptId;
                }
                this.initSearch();
            });
        }
    },
    computed: {
        checkedObjList() {
            return this.$store.getters.getDictList("regulatoryRepertory");
        }
    }
};
</script>

<style lang="less">
</style>