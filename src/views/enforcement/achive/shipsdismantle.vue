// 渔船报废拆解

<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table ref="test" url="/achive/nybycbfcj/page" :params="query" :columns="columns">
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
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
    
    <ycbxModal
        v-model = "modal.ycbx"
        :nametheShip = "info.nametheShip"
        :unid = 'info.id'
        okText = "确定"
        cancelText = "返回"
    ></ycbxModal>
  </div>
</template>

<script>
import ycbxModal from '../../components/modal-ship/ycbxModal.vue'

export default {
  name: 'shipsdismantle',
  components: {
    ycbxModal
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
          key: 'fishingCode',
          title: '渔船编码',
          align: 'center',
          minWidth: 130
        },
        {
          key: 'applicant',
          title: '申请人',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'fishVessInspCertNo',
          title: '渔船检验证书编号',
          align: 'center',
          minWidth: 120
        },
        {
          key: 'certDestVess',
          title: '渔船拆解销毁或处理证明书编号',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'scrapDisposalSite',
          title: '报废处理地点',
          align: 'center',
          minWidth: 100
        },
        {
          key: 'commDateDism',
          title: '报废拆解开始日期',
          align: 'center',
          minWidth: 80
        },
        {
          key: 'scrapDismantlingEndDate',
          title: '报废拆解结束日期',
          align: 'center',
          minWidth: 80
        },
        {
          key: 'scrapDisposalMode',
          title: '报废处理方式',
          align: 'center',
          minWidth: 70
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
