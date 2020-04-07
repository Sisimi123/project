<template>
  <Dropdown
    ref="dropdown"
    @on-click="handleClick"
    :class="hideTitle ? '' : 'collased-menu-dropdown'"
    :transfer="hideTitle"
    :placement="placement"
  >
    <a
      class="drop-menu-a"
      type="text"
      @mouseover="handleMousemove($event, children)"
      :style="{textAlign: !hideTitle ? 'left' : ''}"
    >
      <!-- <common-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon"/> -->
      <!-- <span :class="parentItem.code+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"></span> -->
      <img
        style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
        :src="showImage(parentItem.icon)"
        alt
      />
      <span class="menu-title" v-if="!hideTitle">{{ showTitle(parentItem) }}</span>
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in children">
        <template v-if="child.showInMenu == '1'">
          <collapsed-menu
            v-if="showChildren(child)"
            :icon-size="iconSize"
            :parent-item="child"
            :key="`drop-${child.name}`"
          >
            <span
              :class="child.code+'-icon'"
              style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
            ></span>
          </collapsed-menu>
          <DropdownItem v-else :key="`drop-${child.name}`" :name="child.code">
            <!-- <common-icon :size="iconSize" :type="child.icon"/> -->
            <!-- <span :class="child.code+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"></span> -->
            <!-- <img
              style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
              :src="showImage(child.icon)"
              alt
            /> -->
            <span class="menu-title">{{ showTitle(child) }}</span>
          </DropdownItem>
        </template>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import mixin from "./mixin";
import itemMixin from "./item-mixin";
import { findNodeUpperByClasses } from "@/libs/util";

export default {
  name: "CollapsedMenu",
  mixins: [mixin, itemMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    rootIconSize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      placement: "right-end"
    };
  },
  methods: {
    handleClick(name) {
      this.$emit("on-click", name);
    },
    handleMousemove(event, children) {
      const { pageY } = event;
      const height = children.length * 38;
      const isOverflow = pageY + height < window.innerHeight;
      this.placement = isOverflow ? "right-start" : "right-end";
    }
  },
  mounted() {
    let dropdown = findNodeUpperByClasses(this.$refs.dropdown.$el, [
      "ivu-select-dropdown",
      "ivu-dropdown-transfer"
    ]);
    if (dropdown) dropdown.style.overflow = "visible";
  }
};
</script>
