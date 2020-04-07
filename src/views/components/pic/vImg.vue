<template>
    <img :src="src"  :alt="alt" :style="imgStyle"  :onerror="onerror" >
</template>
<script>
export default {
    name: "vImg",
    props: {
        src: {
            type:String,
            default:""
        },
        alt: {
            type:String,
            default:""
        },
        imgStyle: {
            type:String,
            default:""
        },
        onerror: {
            type:String,
            default:""
        }
    }
};
</script>