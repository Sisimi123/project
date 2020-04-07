// 船名登记信息

<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table ref="test" url="/achive/nybcmdj/page" :params="query" :columns="columns">
      <div slot="search">
        <Form :label-width="110" @submit.native.prevent>
            <Row>
                <Col span="6">
                    <Form-item label="船名:">
                        <Input v-model="query.wheres.nametheShip_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船舶所有人名称:">
                        <Input v-model="query.wheres.namevesselOwner_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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

    <ycdjModal
        v-model = "modal.ycbx"
        :nametheShip = "info.nametheShip"
        :unid = 'info.id'
        okText = "确定"
        cancelText = "返回"
    ></ycdjModal>
  </div>
</template>

<script>
import ycdjModal from '../../components/modal-ship/ycdjModal.vue'

export default {
  name: 'shipsregisterinfo',
  components: {
    ycdjModal
  },
  data () {
    return {
      modal: {
        ycbx: false
      },
      info: {},
      // 搜索
      query: {
        page: 1,
        size: 10,
        wheres: {
          nametheShip_like: '',
          namevesselOwner_like: ''
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
          minWidth: 110
        },
        {
          key: 'originalName',
          title: '原船名',
          align: 'center',
          minWidth: 110
        },
        {
          key: 'namevesselOwner',
          title: '船舶所有人名称',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'shipType',
          title: '船舶类型',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'typeLength',
          title: '船长',
          align: 'center',
          minWidth: 80
        },
        {
          key: 'grossTonnage',
          title: '总吨位',
          align: 'center',
          minWidth: 80
        },
        {
          key: 'masterPower',
          title: '主机总功率',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'hullMaterialA',
          title: '船体材质',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'applicantName',
          title: '申请人姓名',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'applicationDate',
          title: '申请日期',
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
                      this.modal.ycbx = true
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
