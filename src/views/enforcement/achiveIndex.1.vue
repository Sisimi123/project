<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap homepageInfoSearch">
        <div class="block-wrap">
            <div class="item-wrap">
                <router-link to="/enforcement/achive/ships"  class="item all-line ycda">
                    <p>
                        <i></i>
                        <span>
                            <em>证书查询</em>
                            <em>Certificate query</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
            <div class="item-wrap">
                <router-link to="/enforcement/achive/crews" class="item cyda volkswagen">
                    <i></i>
                    <em>船员档案</em>
                </router-link>
                <router-link to="/enforcement/achive/maillist" class="item txl volkswagen">
                    <i></i>
                    <em>通讯录</em>
                </router-link>
            </div>
            <div class="item-wrap">
                <router-link to="#"  class="item all-line yzda">
                    <p>
                        <i></i>
                        <span>
                            <em>养殖档案</em>
                            <em>Breed record</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <router-link to="/enforcement/achive/employerInsurance" class="item gzzrhb volkswagen">
                    <i></i>
                    <em>雇主责任互保</em>
                </router-link>
                <router-link to="/enforcement/achive/shipInsurance" class="item yczrhb volkswagen">
                    <i></i>
                    <em>渔船互保</em>
                </router-link>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/yjgzzk"  class="item all-line jczzgl">
                    <p>
                        <i></i>
                        <span>
                            <em>基层组织管理</em>
                            <em>Organization</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
            </div>

            <div class="item-wrap">
                <!-- <router-link to="/enforcement/standingbook/standingbook" class="item hzstz">
                    <i></i>
                    <em>合作社台帐</em>
                </router-link>
                <router-link to="/enforcement/achive/lixianyuchuan" class="item ycda">
                    <i></i>
                    <em>离线渔船管理</em>
                </router-link> -->
                <!-- <div class="item"></div> -->
                <router-link to="/enforcement/cooperatebook/bianzu" class="item all-line ycdtbzgl">
                    <p>
                        <i></i>
                        <span>
                            <em>渔船动态编组管理</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>     
            
        </div>
        <div class="block-wrap">
             <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/yjgzzk"  class="item all-line jczzgl">
                    <p>
                        <i></i>
                        <span>
                            <em>基层组织管理</em>
                            <em>Organization</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/port" class="item gkgl volkswagen">
                    <i></i>
                    <em>港口管理</em>
                </router-link> -->
                <!-- <router-link to="/enforcement/achive/exam" class="item ksgl volkswagen">
                    <i></i>
                    <em>考试管理</em>
                </router-link> -->
            </div>
            <div class="item-wrap">
            
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
