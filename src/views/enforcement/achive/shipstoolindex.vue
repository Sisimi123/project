// 渔业船网工具指标信息

<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table ref="test" url="/achive/yycwgjzb/page" :params="query" :columns="columns">
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

    <ycgjzbModal
        v-model = "modal.ycgjzb"
        :nametheShip = "info.nametheShip"
        :unid = 'info.id'
        okText = "确定"
        cancelText = "返回"
    ></ycgjzbModal>
  </div>
</template>

<script>
import ycgjzbModal from '../../components/modal-ship/ycgjzbModal.vue'

export default {
  name: 'shipstoolindex',
  components: {
    ycgjzbModal
  },
  data () {
    return {
      modal: {
        ycgjzb: false
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
          minWidth: 100
        },
        {
          key: 'jobType',
          title: '作业类型',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'typeLength',
          title: '船长',
          align: 'center',
          minWidth: 120
        },
        {
          key: 'grossTonnage',
          title: '总吨位',
          align: 'center',
          minWidth: 120
        },
        {
          key: 'fishVessNetwToolIndeApplNumb',
          title: '渔业船网工具指标申请书编号',
          align: 'center',
          minWidth: 240
        },
        {
          key: 'intfUpdateTime',
          title: '更新时间',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            let value = params.row.intfUpdateTime.slice(0, 10)

            return h('p', value)
          }
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
                      this.modal.ycgjzb = true
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
