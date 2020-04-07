import CommonIcon from '_c/common-icon'
import { showTitle } from '@/libs/util'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return showTitle(item, this)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
    },
    showImage (item) {
      if (item) {
        return this.$baseIconUrl + item
      }
    },
    getNameOrHref (item, children0) {
      // console.log(item,'getNameOrHref')
      if (item.code) {
        return item.code
      }
      // if(item.path)
      //   return item.path;
      // if(item.component)
      //   return item.component;
      // if(item.href)
      // return item.href;
      // if(item.path)
      // return item.path;
      // return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
    }
  }
}
