// 渔船捕捞许可注销

<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table ref="test" url="/achive/ycblxkzx/page" :params="query" :columns="columns">
      <div slot="search">
        <Form :label-width="90" @submit.native.prevent>
          <Row>
              <Col span="6">
                  <Form-item label="船名:">
                    <Input v-model="query.wheres.nametheShip_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                  </Form-item>
              </Col>
              <Col span="6">
                  <Form-item label="持证人名称:">
                    <Input v-model="query.wheres.holder_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                  </Form-item>
              </Col>
              <div class="btn-wrap">
                <Button  @click="initSearch" type="info" icon="ios-search" shape="circle">搜索</Button>
                <Button  @click="handleReset" type="primary" >重置</Button>
              </div>
          </Row>
        </Form>
      </div>
    </data-table>

    <ycblxkzxModal
        v-model = "modal.ycblxkzx"
        :nametheShip = "info.nametheShip"
        :unid = 'info.id'
        okText = "确定"
        cancelText = "返回"
    ></ycblxkzxModal>
  </div>
</template>

<script>
import ycblxkzxModal from '../../components/modal-ship/ycblxkzxModal.vue'

export default {
  name: 'shipscatchlogout',
  components: {
    ycblxkzxModal
  },
  data () {
    return {
      modal: {
        ycblxkzx: false
      },
      info: {},
      // 搜索
      query: {
        page: 1,
        size: 10,
        wheres: {
          nametheShip_like: '',
          holder_like: ''
        },
        orders: 'intfUpdateTime desc'
      },
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center',
          minWidth: 65
        },
        {
          key: 'nametheShip',
          title: '船名',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'holder',
          title: '持证人名称',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'jobType',
          title: '作业类型',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'nationalityCertNumb',
          title: '国籍或登记证书编号',
          align: 'center',
          minWidth: 160
        },
        {
          key: 'fishingLicenseNumberA',
          title: '渔业捕捞许可证编号',
          align: 'center',
          minWidth: 160
        },
        {
          key: 'uniqIdenLiceCancelNumber',
          title: '捕捞许可注销证明书编号',
          align: 'center',
          minWidth: 180
        },
        {
          key: 'cancelReason',
          title: '注销理由',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'issuer',
          title: '签发人',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'issuingOrgan',
          title: '发证机关',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'issueDate',
          title: '签发日期',
          align: 'center',
          minWidth: 100
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            let buttons = [];
            buttons.push(
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.info = params.row
                      this.modal.ycblxkzx = true
                    }
                  }
                },
                '详情'
              )
            )
            return h('div', buttons)
          }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    initSearch () {
      this.$refs.test.initSearch()
    },
    handleReset () {
      // 重置 data内的 query对象到初始化状态
      Object.assign(this.$data.query, this.$options.data().query)
      this.initSearch()
    }
  }
}
</script>

<style scoped>

</style>
