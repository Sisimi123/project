<style lang="less">
    @import '../styles/menu.less';
    @import '../styles/menuIcon.less';
</style>

<template>
    <!-- <Menu ref="sideMenu" :active-name="activeName" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" v-show="!item.meta.hidden" :name="item.children[0].path" :key="'menuitem' + item.meta.id">
                <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.meta.id"></Icon>
                <span class="layout-text" :key="'title' + item.meta.id">{{ itemTitle(item.children[0]) }}</span>
            </MenuItem>

            <Submenu v-if="item.children.length > 1" v-show="!item.meta.hidden" :name="item.meta.id" :key="item.meta.id">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.path" v-show="!child.meta.hidden" :key="'menuitem' + child.meta.id">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.meta.id"></Icon>
                        <span class="layout-text" :key="'title' + child.meta.id">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu> -->
    <Menu ref="sideMenu" :active-name="activeName" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="!showSubItem(item) && showItem(item)" :name="item.children[0].path"  :key="'menuitem' + item.meta.id">
                <!-- <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.meta.id"></Icon> -->
                <!-- <vImg :src="imagePath(item)" :icon="item.name" imgStyle="width:15px;height:15px;border:0px;margin:3px"/> -->
                <span :class="item.name+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block"></span>
                <span class="layout-text" :key="'title' + item.meta.id">{{ itemTitle(item.children[0]) }}</span>
            </MenuItem>

            <Submenu v-if="showSubItem(item) && showItem(item)" :name="item.meta.id" :key="item.meta.id">
                <template slot="title">
                    <!-- <Icon :type="item.icon" :size="iconSize"></Icon> -->
                    <!-- <vImg :src="imagePath(item)" :icon="item.name" imgStyle="width:15px;height:15px;border:0px;margin:3px"/> -->
                    <span :class="item.name+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block"></span>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.path" v-if="showItem(child)" :key="'menuitem' + child.meta.id">
                        <!-- <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.meta.id"></Icon> -->
                        <span :class="child.name+'-icon'" style="width:15px;height:15px;border:0px;margin:3px;display:inline-block"></span>
                        <!-- <vImg :src="imagePath(child)" :icon="child.name" imgStyle="width:15px;height:15px;border:0px;margin:3px"/> -->
                        <span class="layout-text" :key="'title' + child.meta.id">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    computed:{
        activeName(){
            var path=this.$route.path;
            // console.log(path);
            // if(this.menuList){
            //     this.menuList.forEach(function(child){
            //         child.children.forEach(function(item){
            //             if(item.path==path){
            //                 return item.meta.id;
            //             }
            //         });
            //     });
            // }
            return path;
        },
    },
    methods: {
        changeMenu (active) {
            // console.log("changeMenu");
            // console.log(active);
            // console.log(this.openNames);
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
            console.log(item,'showItem')
            return "1"==item.meta.showInMenu && !item.meta.hidden;
        },
        showSubItem(item){
            console.log(item,'showSubItem')
            return item.children.length > 1 || "1"==item.meta.showAlways
        },
        imagePath(item){
            return ""+item.icon;
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
