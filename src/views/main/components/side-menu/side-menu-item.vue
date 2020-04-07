<template>
  <Submenu :name="`${parentName}`" v-if="parentItem.showInMenu == '1'">
    <template slot="title">
      <!-- <common-icon :type="parentItem.icon || ''"/> -->
      <img
        v-if="parentItem.icon"
        style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
        :src="showImage(parentItem.icon)"
        alt
      />
      <span
        v-else
        class="crewFile-icon"
        style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
      ></span>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
          <!-- <common-icon :type="item.children[0].icon || ''"/> -->
          <img
            v-if="item.children[0].icon"
            style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
            :src="showImage(item.children[0].icon)"
            alt
          />
          <span
            v-else
            :class="item.code+'-icon'"
            style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
          ></span>
          <span>{{ showTitle(item.children[0]) }}</span>
        </menu-item>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <template v-else>
          <menu-item
            v-if="item.showInMenu == '1'"
            :name="getNameOrHref(item)"
            :key="`menu-${item.name}`"
          >
            <img
              v-if="item.icon"
              style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
              :src="showImage(item.icon)"
              alt
            />
            <span v-else class="crewFile-icon" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"></span>
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </template>
  </Submenu>
</template>
<script>
import mixin from "./mixin";
import itemMixin from "./item-mixin";
export default {
  name: "SideMenuItem",
  mixins: [mixin, itemMixin]
};
</script>
<style lang="less">
@import "./menuIcon.less";
</style>