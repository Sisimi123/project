<template>
  <div :style="tableBoxStyle">
    <tree-table
      :expand-key="expandKey"
      :expand-type="expandType"
      :selectable="selectable"
      :columns="columns"
      :data="data"
      :border="border"
      :stripe="stripe"
      :show-index="showIndex"
      :show-row-hover="showRowHover"
      :tree-type="treeType"
      :children-prop="childrenProp"
      :row-class-name="rowClassName"
      @row-click="onRowClick"
      @row-dblclick="onRowDBlClick"
      @cell-contextmenu="onContextmenu"
      @checkbox-click="checkboxClick"
    >
      <slot name="header"></slot>
      <slot name="footer"></slot>
      <slot name="loading"></slot>
    </tree-table>
  </div>
</template>

<script>
import { oneOf, isNull, isEmpty } from "../../../libs/common.js";

export default {
  name: "MyTreeGrid",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // size: {
    //     validator(value) {
    //         return oneOf(value, ['small', 'large', 'default']);
    //     }
    // },
    expandKey: {
      type: String
    },
    expandType: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showRowHover: {
      type: Boolean,
      default: true
    },
    treeType: {
      type: Boolean,
      default: true
    },
    childrenProp: {
      type: String,
      default: "children"
    },
    isFold: {
      type: Boolean,
      default: false
    },
    selectType: {
      type: String,
      default: "checkbox"
    },
    rowClassName: {
      type: [String, Function],
      default() {
        return "";
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableBoxStyle: {
        height: this.height + "px",
        overflow: "auto"
      },
      treeData: []
    };
  },
  computed: {
    newColumns() {
      console.log(this.columns, "columns");
    }
  },
  methods: {
    // onCurrentChange(currentRow, oldCurrentRow) {
    //   this.$emit("on-current-change", currentRow, oldCurrentRow);
    // },
    // onSelect(selection, row) {
    //   this.$emit("on-select", selection, row);
    // },
    // onSelectCancel(selection, row) {
    //   this.$emit("on-select-cancel", selection, row);
    // },
    // onSelectAll(selection) {
    //   this.$emit("on-select-all", selection);
    // },
    checkboxClick(selection) {
      this.$emit("checkbox-Click", selection);
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order);
    },
    // onFilterChange(column) {
    //   this.$emit("on-row-click", column);
    // },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index);
    },
    onRowDBlClick(row, index) {
        console.log(row,'row')
      this.$emit("on-row-dblclick", row, index);
    },
    onContextmenu(row, index) {
      this.$emit("on-Contextmenu", row, index);
    }
  },
  watch: {},
  mounted(){
      var Fun = this.columns[3].render
      console.log(Fun(),'Fun')
  }
};
</script>
