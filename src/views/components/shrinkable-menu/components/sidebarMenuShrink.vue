<style lang="less">
    @import '../styles/menuIcon.less';
</style>

<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer v-if="showSubItem(item) && showItem(item)" placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <!-- <Icon :size="20" :color="iconColor" :type="item.icon"></Icon> -->
                        <!-- <vImg :src="imagePath(item)" imgStyle="width:21px;height:21px;border:0px;padding:3px"/> -->
                        <span :class="item.name+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block"></span>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.path" :key="i" v-if="showItem(child)">
                                <!-- <Icon :type="child.icon"></Icon> -->
                                <!-- <vImg :src="imagePath(child)" imgStyle="width:21px;height:21px;border:0px;padding:3px"/> -->
                                <span :class="child.name+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block"></span>
                                <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
                            </DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-if="!showSubItem(item) && showItem(item)" placement="right-start"  :key="index" @on-click="changeMenu">
                    <Button @click="changeMenu(item.children[0].path)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <!-- <Icon :size="20" :color="iconColor" :type="item.children[0].icon || item.icon"></Icon> -->
                        <!-- <vImg :src="imagePath(item)" imgStyle="width:21px;height:21px;border:0px;padding:3px"/> -->
                        <span :class="item.name+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block"></span>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].path" :key="'d' + index">
                            <!-- <Icon :type="item.children[0].icon || item.icon"></Icon> -->
                            <!-- <vImg :src="imagePath(item.children[0])" imgStyle="width:21px;height:21px;border:0px;padding:3px"/> -->
                            <span :class="item.children[0].name+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block"></span>
                            <span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'darck'
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        },
        showItem(item){
            return true ==item.meta.showInMenu && !item.meta.hidden;
        },
        showSubItem(item){
            return item.children.length > 1 || "1"==item.meta.showAlways
        },
        imagePath(item){
            return this.$basePath+"/attachment"+item.icon;
        }
    }
};
</script>
