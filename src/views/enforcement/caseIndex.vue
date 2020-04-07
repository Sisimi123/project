<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap homepageCaseDealt">
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/addCase"  class="item all-line lacc-ybaj">
                    <p>
                        <i></i>
                        <span>
                            <em>立案查处（一般案件）</em>
                            <em>Registr</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="addCase" :double="true" subName="Registr" iconClz="lacc-ybaj"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/caseDone" class="item jzdak volkswagen">
                    <i></i>
                    <em>卷宗档案库</em>
                </router-link> -->
                <routerItem moduleId="caseDone" iconClz="jzdak"/>
                <div class="item img caseDealt2"></div>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/caseDoing"  class="item all-line zbaj">
                    <p>
                        <i></i>
                        <span>
                            <em>在办案件</em>
                            <em>In progress</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="caseDoing" :double="true" subName="In progress" iconClz="zbaj"/>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/laws" class="item flfg volkswagen">
                    <i></i>
                    <em>法律法规</em>
                </router-link>
                <router-link to="/enforcement/case/evidenceBase" class="item zjk volkswagen">
                    <i></i>
                    <em>证据库</em>
                </router-link> -->
                <routerItem moduleId="laws" iconClz="flfg"/>
                <routerItem moduleId="evidenceBase"  iconClz="zjk"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/caseTodo"  class="item all-line ajdsp">
                    <p>
                        <i></i>
                        <span>
                            <em>案件待审批</em>
                            <em>Approval</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="caseTodo" :double="true" subName="Approval" iconClz="ajdsp"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/caseHanded" class="item jzdak volkswagen">
                    <p style="text-align: center;">
                        <i></i>
                        <em>案件移交</em>
                    </p>
                </router-link>
                <router-link to="/enforcement/case/caseStatistics" class="item tjfx volkswagen">
                    <p style="text-align: center;">
                        <i></i>
                         <em>统计分析</em>
                    </p>
                </router-link> -->
                <routerItem moduleId="caseHanded" iconClz="jzdak"/>
                <routerItem moduleId="caseStatistics" iconClz="tjfx"/>
            </div>
            
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/illegalShip" class="item swyc all-line">
                    <p>
                        <i></i>
                        <span>
                            <em>三无渔船</em>
                            <em>illegalShip</em>
                        </span>
                    </p>
                    <input type="button" name="" value="">
                </router-link>                 -->
                <routerItem moduleId="illegalShip" :double="true" subName="illegalShip" iconClz="swyc"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/simpleCase"  class="item all-line dccf-jyaj">
                    <p>
                        <i></i>
                        <span>
                            <em>当场处罚（简易案件）</em>
                            <em>Punishment</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="simpleCase" :double="true" subName="Punishment" iconClz="dccf-jyaj"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/case/discretionarys"  class="item all-line zycj">
                    <p>
                        <i></i>
                        <span>
                            <em>自由裁量</em>
                            <em>Discretion</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="discretionarys" :double="true" subName="Discretion" iconClz="zycj"/>
            </div>
        </div>
    </div>
</template>
<script>
import routerItem from '@/views/components/module/routerItem.vue';
export default {
    name:"caseIndex",
    components:{
       routerItem
    },
};
</script>

<style scoped>
.item i{
    background-image: url(../../images/icon3.png);
}
</style>
