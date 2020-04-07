// 养殖档案

<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table
      ref="test"
      url = "/achive/breeding/page"
      :params="query"
      :columns="columns"
      @on-row-dblclick="handleEditdb"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="6">
              <Form-item label="业主名称:">
                <Input
                  v-model="query.wheres.name_like"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <div class="btn-wrap" style="margin-left:20px">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>
            <span style="float:right;margin-bottom:10px">
              <ButtonGroup>
                <Button @click="newWin" type="warning" icon="ios-add">新增</Button>
                <MyUpload
                  action = '/achive/breeding/importExcel'
                  :format = "['xlsx','xls']"
                  :on-success = "importXls"
                  :on-format-error = "handleFormatError"
                  style = "width:60px;height:35px;float:right;margin-left:5px;"
                >
                  <Button type="info" icon="ios-add">导入</Button>
                </MyUpload>
              </ButtonGroup>
            </span>
          </Row>
        </Form>
      </div>
    </data-table>
    <!-- 详情窗口 -->
    <Modal
      :width="800"
      v-model="modal.showDetail"
      :styles="{top: '80px'}"
      :title="title"
      :mask-closable="maskclosable"
    >
      <Form :label-width="90" :model="info" :rules="infoRules" ref="info">
        <Row>
          <Col span="12">
            <FormItem label="业主名称:" prop="name">
              <Input v-model="info.name" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="场所类型:" prop="locationype">
              <Input v-model="info.locationype" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="面积:">
              <Input v-model="info.area" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="面积单位:">
              <Input v-model="info.areaunits" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="养殖品种:">
              <Input v-model="info.breedType" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="尾水处理:">
              <Select v-model="info.tailwater" :readonly="ifEdit">
                  <Option value="1">有</Option>
                  <Option value="0">无</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="市:">
              <Input v-model="info.city" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="区县:">
              <Input v-model="info.county" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="备注:">
              <Input v-model="info.note" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancel('info')">取消</Button>
        <Button v-show="btnShow" type="primary" @click="submitData('info')">{{this.btnInfo}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import MyUpload from '@/views/components/Upload/MyUpload.vue'

export default {
  components: {
    MyUpload
  },
  data () {
    return {
      btnInfo: '保存',
      btnShow: false,
      ifEdit: false,
      maskclosable: false,
      modal: {
        showDetail: false
      },
      title: '详情',
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center',
          width: 80
        },
        {
          key: 'name',
          title: '业主名称',
          align: 'center',
          minWidth: 140
        },
        {
          key: 'locationype',
          title: '场所类型',
          align: 'center',
          minWidth: 140
        },
        {
          key: 'area',
          title: '面积',
          align: 'center',
          minWidth: 140
        },
        {
          key: 'areaunits',
          title: '面积单位',
          align: 'center',
          minWidth: 140
        },
        {
          key: 'breedType',
          title: '主要品种',
          align: 'center',
          minWidth: 140
        },
        {
          key: 'tailwater',
          title: '有无尾水处理',
          align: 'center',
          minWidth: 140,
          render: (h, params) => {
            let value = '';
            if (params.row.tailwater == '1') value = '有'
            else if (params.row.tailwater == '0') value = '无'
            else value = params.row.tailwater

            return h('p', value)
          }
        },
        {
          key: '',
          title: '地区（市 区县）',
          align: 'center',
          minWidth: 140,
          render: (h, params) => {
            let { city, county } = params.row;

            return h('p', {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              }
            }, `${city}${county}`)
          }
        },
        {
          key: 'note',
          title: '备注',
          align: 'center',
          minWidth: 140
        },
        {
          title: '操作',
          align: 'center',
          fixed: 'right',
          minWidth: 180,
          render: (h, params) => {
            // var _self = this;
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.title = '详情'
                      this.editWin(params.row)
                    }
                  }
                },
                '详情'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.title = '编辑'
                      this.editWin(params.row)
                    }
                  }
                },
                '修改'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.row.id)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          name_like: ''
        }
      },
      info: {
        id: '',
        name: '',
        area: '',
        locationype: '',
        areaunits: '',
        breedType: '',
        tailwater: '',
        city: '',
        county: '',
        note: ''
      },
      infoRules: {
        name: [
          { required: true, message: '请输入业主名称', trigger: 'blur' }
        ],
        locationype: [
          { required: true, message: '请输入场所类型', trigger: 'blur' }
        ]
      },
      searchParams: {
        uniscId: '',
        companyName: '',
        registerNo: '',
        entType: 'E'
      }
    }
  },
  methods: {
    // 编辑
    editWin (row) {
      this.$refs['info'].resetFields()
      if (this.title === '详情') {
        this.btnShow = false
        this.ifEdit = true
      } else if (this.title === '编辑') {
        this.btnShow = true
        this.btnInfo = '保存'
        this.ifEdit = false
      }
      for (let i in this.info) this.info[i] = row[i]
      this.modal.showDetail = true
    },
    // 新增
    newWin () {
      this.modal.showDetail = true
      this.title = '新增'
      this.btnShow = true
      this.ifEdit = false
      this.btnInfo = '保存'
      for (let key in this.info) {
        this.info[key] = '' // 清空所有属性
      }
      this.$refs['info'].resetFields()
    },
    submitData (name) {
      this.$refs[name].validate(valid => {
        if (valid) {

          let url = '', type = '';
          if (this.title === '新增') {
            url = '/achive/breeding'
            type = 'post'
          } else if (this.title === '编辑') {
            url = `/achive/breeding/${this.info.id}`
            type = 'patch'
          }

          this.$http[type](url, this.info)
            .then(res => {
              if (res.success) {
                this.$Message.info('操作成功!')
                this.modal.showDetail = false
                this.initSearch()
              } else {
                this.$Message.info(res.msg)
              }
            })
            .catch(error => {
              console.log(error)
            })
          
        }
      })

      // 有填写
      // let url = '', type = '';
      // if (this.title === '新增') {
      //   url = '/achive/breeding'
      //   type = 'post'
      // } else if (this.title === '编辑') {
      //   url = `/achive/breeding/${this.info.id}`
      //   type = 'patch'
      // }

      // this.$http[type](url, this.info)
      //   .then(res => {
      //     if (res.success) {
      //       this.$Message.info('操作成功!')
      //       this.modal.showDetail = false
      //       this.initSearch()
      //     } else {
      //       this.$Message.info(res.msg)
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    // 取消
    cancel (name) {
      this.modal.showDetail = false
      this.$refs[name].resetFields()
    },
    // 删除
    handleDelete (index /* index 为 id */) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确认删除吗？</p>',
        okText: '继续',
        cancelText: '返回',
        onOk: () => {
          this.$http
            .delete(`/achive/breeding/${index}`)
            .then(res => {
              this.$Message.info('操作成功')
              this.initSearch()
            })
            .catch(err => {
              console.log(err)
            })
        },
        onCancel: () => {
          console.log('onCancel')
        }
      })
    },
    // 导入
    importXls (response, file, fileList) {
      if (response.success) {
        this.$Message.info('导入成功！')
        this.initSearch()
      } else {
        this.$Message.error(response.msg)
      }
    },
    // 导入失败
    handleFormatError (file) {
      this.$Message.error('文件格式不支持上传！')
    },
    initSearch () {
      this.$refs.test.initSearch()
    },
    handleReset () {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = ''
      }
      this.query.wheres.type = '1'
      this.query.page = 1
      this.query.size = 10
      this.initSearch()
    },
    handleEditdb (ids) {
      // this.info = ids;
      // this.$refs["info"].resetFields();
      // this.modal.watchMsg = true;
      // this.handleEdit(ids);
    }
  },
  mounted() {}
};
</script>