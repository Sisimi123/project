<style lang="less">
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap homepageCaseDealt">
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
                <router-link to="/enforcement/shipScoreIndex"  class="item all-line ycaqjf ">
                    <p>
                        <i></i>
                        <span>
                            <em>记分管理</em>
                            <em>record</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
            <div class="item-wrap">
                 <router-link to="/enforcement/caseIndex"  class="item all-line ajbl">
                    <p>
                        <i></i>
                        <span>
                            <em>执法管理</em>
                            <em>clear</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
            <div class="item-wrap">
                <router-link to="/home"  class="item xtgl all-line" style="background-color: #6abb48;">
                    <p>
                        <i></i>
                        <span>
                            <em>系统管理</em>
                            <em>reward</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
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
export default {
   name:"caseIndex",
};
</script>

<style>
.item i{
    background-image: url(../../images/icon3.png);
}
</style>
