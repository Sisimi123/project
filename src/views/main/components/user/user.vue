<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <a style="margin-right:10px">{{username}}</a>
        <Avatar :src="userAvatar" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          个人中心
          <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import "./user.less";
import { isNull,isEmpty } from "../../../../libs/common";
import { mapActions } from "vuex";
export default {
  name: "User",
  props: {
    // userAvatar: {
    //   type: String,
    //   default: ""
    // },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    username() {
      return this.$store.getters.getUsername();
    },
    userAvatar() {
      var userInfo=this.$store.state.user.userInfo;
      if (!isNull(userInfo)&&!isEmpty(userInfo.photo)) {
        return this.$config.basePath + '/$admin/attachs/stream/' + this.$store.state.user.userInfo.photo;
      }
      return this.$config.avatar
    }
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    logout() {
      this.$store.commit("logout");
    },
    message() {
      this.$router.push({
        name: "ownspace_index"
      });
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
      }
    }
  },
  watch:{

  }
};
</script>
