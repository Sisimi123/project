<template>
  <div>
    <p
      :class="className"
      :style="{textAlign: 'center', color: color, fontSize: countSize, fontWeight: countWeight}"
    >
      <span v-cloak :id="idName">{{ startVal }}</span>
      <span>{{ unit }}</span>
    </p>
    <slot name="intro"></slot>
  </div>
</template>

<script>
import CountUp from "countup";

export default {
  data() {
    return {
      unit: "",
      demo: {}
    };
  },
  name: "countUp",
  props: {
    idName: String,
    className: String,
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2
    },
    delay: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: () => {
        return {
          useEasing: true,
          useGrouping: true,
          separator: ",",
          decimal: "."
        };
      }
    },
    color: String,
    countSize: {
      type: String,
      default: "30px"
    },
    countWeight: {
      type: Number,
      default: 700
    },
    introText: [String, Number],
    isCentage:{
        type:Boolean,
        default:false
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        let res = this.transformValue(this.endVal);
        let endVal = res.val;
        this.unit = res.unit;
        let demo = {};
        this.demo = demo = new CountUp(
          this.idName,
          this.startVal,
          endVal,
          this.decimals,
          this.duration,
          this.options
        );
        if (!demo.error) {
          demo.start();
        }
      }, this.delay);
    });
  },
  methods: {
    transformValue(val) {
      let endVal = 0;
      let unit = "";
      if(this.isCentage == true){
          unit = "%"
      }else{
          unit = ""
      }
      endVal = val;
      return {
        val: endVal,
        unit: unit
      };
    }
  },
  watch: {
    endVal(val) {
      let res = this.transformValue(val);
      let endVal = res.val;
      this.unit = res.unit;
      this.demo.update(endVal);
    }
  }
};
</script>
