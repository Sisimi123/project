// 渔船灭失信息

<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table ref="test" url="/achive/ycms/page" :params="query" :columns="columns">
      <div slot="search">
        <Form :label-width="90" @submit.native.prevent>
          <Row>
              <Col span="6">
                  <Form-item label="船名:">
                    <Input v-model="query.wheres.nametheShip_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                  </Form-item>
              </Col>
              <Col span="6">
                  <Form-item label="船东:">
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

    <ycmsModal
        v-model = "modal.ycms"
        :nametheShip = "info.nametheShip"
        :unid = 'info.id'
        okText = "确定"
        cancelText = "返回"
    ></ycmsModal>
  </div>
</template>

<script>
import ycmsModal from '../../components/modal-ship/ycmsModal.vue'

export default {
  name: 'shipslosses',
  components: {
    ycmsModal
  },
  data () {
    return {
      modal: {
        ycms: false
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
          minWidth: 120
        },
        {
          key: 'namevesselOwner',
          title: '船东',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'certVessA',
          title: '渔业船舶灭失证明书编号',
          align: 'center',
          minWidth: 180
        },
        {
          key: 'portregistry',
          title: '船籍港',
          align: 'center',
          minWidth: 120
        },
        {
          key: 'namevesselOwner',
          title: '船舶所有人名称',
          align: 'center',
          minWidth: 140
        },
        {
          key: 'sinkingReason',
          title: '沉没原因',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'sinkTime',
          title: '沉没时间',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'sunkenSite',
          title: '沉没地点',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'missingTime',
          title: '失踪时间',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'otherCausesloss',
          title: '其它灭失原因',
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
                      this.modal.ycms = true
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
