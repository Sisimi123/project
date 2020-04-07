<style lang="less" scoped>
    @import '../../enforcement/styles/index.less';
</style>
<template>
    <router-link v-if="!isNull(router)" :to="router['component']"  :class="clazz">
        <template v-if="double">
          <p>
              <i></i>
              <span>
                  <em>{{router.name}}</em>
                  <em>{{subTitle}}</em>
              </span> 
          </p>
          <input type="button" name="" value="">
        </template>
        <template v-else>
          <i></i>
          <em>{{router.name}}</em>
        </template>
    </router-link>
</template>
<script>
import {isNull,isEmpty} from '@/libs/common'
export default {
  name: "routerItem",
  props: {
    moduleId:{
      type: String,
      required: true,
    },
    double:{
      type: Boolean,
      default:false,
    },
    subName:{
      type: String,
      default:""
    },
    iconClz:{
      type: String,
      default:""
    }
  },
  computed: {
    router(){
      // console.log(this.$store.state.app.moduleCodes)
      return this.$store.state.user.moduleCodes[this.moduleId];
    },
    subTitle(){
      if(!isEmpty(this.subName))
        return this.subName
      
      return "";
    },
    clazz(){
      if(this.double)
        return "item all-line "+this.iconClz
      return "item volkswagen "+this.iconClz
    }
  },
  methods: {
    isNull,
    isEmpty,

  }

};
</script>