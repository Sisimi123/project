
<template>
    <dataContent overflow="hidden" :withCard="false">
       <iframe :src="url" style="height:100%;width:100%;border:0px;overflow:hidden" ></iframe>
    </dataContent>
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
        url(){
            // return this.$basePath+'/attachment/zjmap/protectionZone.html?user_right=personal&current_type=6&current_id=undefined';
            return this.$basePath+'/attachment/h5/map/protectionZone.html?user_right=personal&current_type=6&current_id=undefined';
        }
    },
    methods: {
        
    },
    mounted() {
    }
};
</script>
