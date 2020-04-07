<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap shipDianYan">
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/shipsdy/dainyanlists"  class="item all-line tjlb">
                    <p>
                        <i></i>
                        <span>
                            <em>统计列表</em>
                            <em>Statistical list</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="dainyanlists" subName="Statistical list" :double="true" iconClz="tjlb"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/shipsdy/dianyanhistory" class="item tjls volkswagen">
                    <i></i>
                    <em>统计历史</em>
                </router-link>
                <router-link to="/enforcement/shipsdy/whitemenu" class="item bmd volkswagen">
                    <i></i>
                    <em>白名单</em>
                </router-link> -->
                <routerItem moduleId="dianyanhistory" iconClz="tjls"/>
                <routerItem moduleId="whitemenu" iconClz="bmd"/>
            </div>
            <div class="item-wrap">
               
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
     
            </div>
            <div class="item-wrap">
  
            </div>

            <div class="item-wrap">

            </div>     
            
        </div>
        <div class="block-wrap">
            <div class="item-wrap">


            </div>
            <div class="item-wrap">

            </div>
            <div class="item-wrap">

            </div>

        </div>
    </div>
</template>
<script>
import routerItem from '@/views/components/module/routerItem.vue';
export default {
   name:"shipdanyanIndex",
   components:{
       routerItem
    },
};
</script>

<style scoped>
.item i{
    background-image: url(../../images/icon2.png);
}
</style>
