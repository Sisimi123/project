
<template>
    <!-- <dataContent overflow="hidden" :withCard="false">
       <iframe :src="mapUrl" style="height:100%;width:100%;border:0px;overflow:hidden" ></iframe>
    </dataContent> -->
    <div><iframe :src="mapUrl" style="height:100%;width:100%;border:0px;overflow:hidden" ></iframe></div>
</template>

<script>

export default {
    name: 'map',
    data () {
        var _self=this;
        return {
        };
    },
    computed:{
        mapUrl(){
             return this.$basePath+"/attachment/h5/map/newIndex.html";
        }
    },
    methods: {
        
    },
    mounted() {
    }
};
</script>
