<template>
  <router-view :info="info" />
</template>

<script>
export default {
   props:{
    info:{
      type: Object,
      default(){
        return {}
      }
    }
  },
}
</script>
