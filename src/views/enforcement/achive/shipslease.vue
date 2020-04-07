// 渔船租赁登记信息

<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table ref="test" url="/achive/yczldj/page" :params="query" :columns="columns">
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
                    <Input v-model="query.wheres.nameholder_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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

    <yczldjModal
        v-model = "modal.yczldj"
        :nametheShip = "info.nametheShip"
        :unid = 'info.id'
        okText = "确定"
        cancelText = "返回"
    ></yczldjModal>
  </div>
</template>

<script>
import yczldjModal from '../../components/modal-ship/yczldjModal.vue'

export default {
  name: 'shipslease',
  components: {
    yczldjModal
  },
  data () {
    return {
      modal: {
        yczldj: false
      },
      info: {},
      // 搜索
      query: {
        page: 1,
        size: 10,
        wheres: {
          nametheShip_like: '',
          nameholder_like: ''
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
          minWidth: 120
        },
        {
          key: 'nameholder',
          title: '持证人名称',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'mortHoldAgreNumb',
          title: '抵押权人同意出租证明文件编号',
          align: 'center',
          minWidth: 220
        },
        {
          key: 'fishVessOwneRegiCertNumb',
          title: '渔业船舶所有权登记证书编号',
          align: 'center',
          minWidth: 200
        },
        {
          key: 'namelessee',
          title: '承租人-名称',
          align: 'center',
          minWidth: 120
        },
        {
          key: 'addresslessee',
          title: '承租人-地址',
          align: 'center',
          minWidth: 160
        },
        {
          key: 'leaseContractNo',
          title: '租赁契约号',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'rent',
          title: '租金',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'datelease',
          title: '起租日期',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'terminationDatelease',
          title: '租赁终止日期',
          align: 'center',
          minWidth: 120
        },
        {
          key: 'dateleaseApplication',
          title: '租赁申请日期',
          align: 'center',
          minWidth: 120
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
                  on: {
                    click: () => {
                      this.info = params.row
                      this.modal.yczldj = true
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
