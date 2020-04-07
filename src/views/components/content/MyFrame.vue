
<template>
    <dataContent overflow="hidden" :withCard="false">
       <iframe :src="url" style="height:100%;width:100%;border:0px;overflow:hidden" v-if="show"></iframe>
    </dataContent>
</template>

<script>

export default {
    name: 'map',
    data () {
        var _self=this;
        return {
            show:false,
            url:"",
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.setHref();
            vm.show=true;
            vm.$forceUpdate();
        })
    },
    methods:{
        setHref(){
            var href=this.$route.meta.href
            if(href.indexOf('/http')==0)
                href=href.substring(1);
            else 
                href=this.$basePath+href;
            this.url=href;
        }
    },
    watch:{
        $route(){
            this.show=false
            this.$forceUpdate();
            this.$nextTick(() => {          
                this.setHref();
                this.show=true;
            })
        }
    }
};
</script>
