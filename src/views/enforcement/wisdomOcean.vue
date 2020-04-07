<style lang="less" scoped>
@import "./styles/index.less";
</style>
<template>
  <div class="nav-wrap homepageIndex">
    <div class="chart-wrap" @click="openMap">
      <router-link to="#">
        <p>渔船动态化监管</p>
        <input type="button" value="查看海图" />
      </router-link>
    </div>
    <div class="block-wrap">
      <div class="item-wrap">
        <router-link to class="item weather">
          <i></i>
          <b>{{city}}</b>
          <span class="s1">{{text}}</span>
          <span class="s2">{{code}}</span>
          <span class="s3">{{wind}}</span>
        </router-link>
      </div>
      <div class="item-wrap archives">
        <router-link to="/ships" class="item all-line ycda">
          <p>
            <i></i>
            <span>
              <em>渔船档案</em>
            </span>
          </p>
          <input type="button" name value />
        </router-link>
      </div>
      <div class="item-wrap archives">
        <router-link to="/crews" class="item all-line cyda">
          <p>
            <i></i>
            <span>
              <em>船员档案</em>
            </span>
          </p>
          <input type="button" name value />
        </router-link>
      </div>
    </div>
    <div class="block-wrap">
      <div class="item-wrap"></div>
      <div class="item-wrap archives">
        <router-link to="/enterpriseInfo" class="item all-line txl">
          <p>
            <i></i>
            <span>
              <em>企业档案</em>
            </span>
          </p>
          <input type="button" name value />
        </router-link>
      </div>
      <div class="item-wrap archives">
        <router-link to="/fshingPortFiles" class="item all-line yzda">
          <p>
            <i></i>
            <span>
              <em>渔港档案</em>
            </span>
          </p>
          <input type="button" name value />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "enforcementIndex",
  components: {},
  data() {
    return {
      city: "",
      text: "",
      code: "",
      wind: "",
      weather: {
        name: ""
      }
    };
  },
  computed: {
    // moduleCodes(){
    //     return this.$store.state.app.moduleCodes;
    // }
  },
  methods: {
    handleSearch() {
      this.$http
        .get("/cms/weather/getWeather")
        .then(res => {
          console.log(res);
          var w = res.data;
          this.city = w.name;
          this.text =
            w.text_day == w.text_night
              ? w.text_day
              : w.text_day + "转" + w.text_night;
          this.code = w.low + "℃~" + w.high + "℃";
          this.wind = w.wind_direction + "风 " + w.wind_scale + "级";
        })
        .catch(error => {
          console.log(error);
        });
    },
    openMap() {
      window.open(this.$basePath + "/attachment/h5/map/newIndex.html");
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    }
  },
  beforeRouteLeave(to, from, next) {
    var urls = location.href.split("#")[1];
    if (urls === "/login") {
      next(false);
    } else {
      next();
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style scoped>
.archives .item i{
    background-image: url(../../images/msgCheck.png) !important
}
</style>
