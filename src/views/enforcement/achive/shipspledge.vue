// 渔船抵押登记信息

<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table ref="test" url="/achive/ycdydj/page" :params="query" :columns="columns">
      <div slot="search">
        <Form :label-width="90" @submit.native.prevent>
          <Row>
              <Col span="6">
                  <Form-item label="船名:">
                    <Input v-model="query.wheres.nametheShip_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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

    <ycdyModal
        v-model = "modal.ycdy"
        :nametheShip = "info.nametheShip"
        :unid = 'info.id'
        okText = "确定"
        cancelText = "返回"
    ></ycdyModal>
  </div>
</template>

<script>
import ycdyModal from '../../components/modal-ship/ycdyModal.vue'

export default {
  name: 'shipslosses',
  components: {
    ycdyModal
  },
  data () {
    return {
      modal: {
        ycdy: false
      },
      info: {},
      // 搜索
      query: {
        page: 1,
        size: 10,
        wheres: {
          nametheShip_like: ''
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
          key: 'nametheMortgageHolder',
          title: '抵押权人-姓名',
          align: 'center',
          minWidth: 140
        },
        {
          key: 'mortgageContractNumber',
          title: '抵押合同编号',
          align: 'center',
          minWidth: 160
        },
        {
          key: 'fishShipMortRegiCertNumb',
          title: '渔业船舶抵押权登记证书编号',
          align: 'center',
          minWidth: 200
        },
        {
          key: 'fishVessOwneRegiCertNumb',
          title: '渔业船舶所有权登记证书编号',
          align: 'center',
          minWidth: 200
        },
        {
          key: 'approvalTime',
          title: '审批时间',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'shareHeldBymortgageHolder',
          title: '抵押权人-所占股份',
          align: 'center',
          minWidth: 140
        },
        {
          key: 'mortgageAmount',
          title: '抵押金额',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'expiryDatemortgage',
          title: '抵押终止日期',
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
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.info = params.row
                      this.modal.ycdy = true
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
