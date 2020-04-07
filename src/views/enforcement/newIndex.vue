<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap homepageCaseDealt">
        <div class="block-wrap">
            <div class="item-wrap">
                <router-link to="/enforcement/case/addCase"  class="item all-line lacc-ybaj">
                    <p>
                        <i></i>
                        <span>
                            <em>立案查处（一般案件）</em>
                            <em>registr</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
            <div class="item-wrap">
                <router-link to="/enforcement/case/caseDone" class="item jzdak volkswagen">
                    <i></i>
                    <em>卷宗档案库</em>
                </router-link>
                <div class="item img caseDealt2"></div>
            </div>
            <div class="item-wrap">
                <router-link to="/enforcement/shipScore/shipScoreApplyClear"  class="item sqxf all-line">
                    <p>
                        <i></i>
                        <span>
                            <em>申请消分</em>
                            <em>apply</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
            <!-- <div class="item-wrap">
                <router-link to="/enforcement/case/caseDoing"  class="item all-line zbaj">
                    <p>
                        <i></i>
                        <span>
                            <em>在办案件</em>
                            <em>in progress</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>-->
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <router-link to="/enforcement/case/laws" class="item flfg volkswagen">
                    <i></i>
                    <em>法律法规</em>
                </router-link>
                <div class="item"></div>
            </div>
            <div class="item-wrap">
                <router-link to="/enforcement/case/caseTodo"  class="item all-line ajdsp">
                    <p>
                        <i></i>
                        <span>
                            <em>案件待审批</em>
                            <em>approval</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
            <div class="item-wrap">
                <router-link to="/enforcement/shipScore/shipScoreCase" class="item jfgl volkswagen">
                    <i></i>
                    <em>记分管理</em>
                </router-link>
                <router-link to="/enforcement/shipScore/shipScoreClear" class="item xfjl volkswagen">
                    <i></i>
                    <em>消分记录</em>
                </router-link>  
            </div>
            
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <div class="item all-line img caseDealt1"></div>
            </div>
            <!-- <div class="item-wrap">
                <router-link to="/enforcement/case/simpleCase"  class="item all-line dccf-jyaj">
                    <p>
                        <i></i>
                        <span>
                            <em>当场处罚（简易案件）</em>
                            <em>punishment</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div> -->
            <div class="item-wrap">
                <router-link to="" class="item xtfx volkswagen">
                    <i></i>
                    <em>统计分析</em>
                </router-link>
                <router-link to="/enforcement/case/discretionarys"  class="item all-line zycj">
                    <p>
                        <i></i>
                        <span>
                            <em>自由裁量</em>
                            <em>discretion</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
            <div class="item-wrap">
                <router-link to="/enforcement/shipScore/shipScoreItem" class="item jftl volkswagen">
                    <i></i>
                    <em>记分条例</em>
                </router-link>
                
                <router-link to="/enforcement/shipscore/shipScoreUser" class="item grcx volkswagen">
                    <i></i>
                    <em>个人查询</em>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
   name:"achiveIndex",
};
</script>

<style scoped>
.item i{
    background-image: url(../../images/icon2.png);
}
</style>
