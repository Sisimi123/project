<template>
  <div v-if="customObjList.length>0" style="margin-bottom:20px">
    <Table border :columns="columns" :data="customObjList" :show-header="false"></Table>
  </div>
</template>

<script>
export default {
  props: {
    customObjList: Array
  },
  data() {
    return {
      columns: [
        {
          title: "模板细项名称",
          key: "resultItemName",
          maxWidth: 200,
          align: "center",
        },
        {
          title: "结果项",
          key: "elementList",
          render: (h, params) => {
            if (params.row.resultItemType == "CHECKBOX") {
              let checkbox = [];
              let list = params.row.elementList;
              for (let i in list) {
                checkbox.push(
                  h(
                    "Checkbox",
                    {
                      style: {
                        marginRight: "5px"
                      },
                      props: {
                        label: list[i].elementTitle,
                        disabled: true
                      },
                      on: {
                        click: () => {}
                      }
                    },
                    list[i].elementTitle
                  )
                );
              }
              return h("div", checkbox);
            }
            if (params.row.resultItemType == "RADIO") {
              let radios = [];
              let list = params.row.elementList;
              for (let i in list) {
                radios.push(
                  h(
                    "Radio",
                    {
                      style: {
                        margin: "0 8px"
                      },
                      props: {
                        label: list[i].elementTitle,
                        disabled: true
                      },
                      on: {
                        click: () => {}
                      }
                    },
                    list[i].elementTitle
                  )
                );
              }
              return h("div", radios);
            }
             if (params.row.resultItemType == "TEXT") {
              let text = [];
              let list = params.row.elementList;
              for (let i in list) {
                text.push(
                  h(
                    "Input",
                    {
                      style: {
                        width:"100%"
                      },
                      props: {
                          
                      },
                      on: {
                        click: () => {}
                      }
                    },
                    list[i].elementTitle
                  )
                );
              }
              return h("div", text);
            }
          }
        }
      ]
    };
  },
  watch: {
    customObjList(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>
</style>