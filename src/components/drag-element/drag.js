export default {
    bind(el, binding, vnode) {
        const dialogHeaderEl = el.querySelector('.drag-element-img'); // 这是移动的元素
        const dragDom = el; // 这是移动元素包裹的最外层元素
        dialogHeaderEl.style.cssText += ';cursor:move;'
            // dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const getStyle = (function() {
            if (window.document.currentStyle) {
                return (dom, attr) => dom.currentStyle[attr]
            } else {
                return (dom, attr) => getComputedStyle(dom, false)[attr]
            }
        })()
        let firstTime='',lastTime='';
        dialogHeaderEl.onmousedown = (e) => {
            // vnode.elm.dispatchEvent(new CustomEvent('addClick'));
            firstTime=new Date().getTime();
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            const dragDomWidth = dragDom.offsetWidth; // 移动元素的宽度
            const dragDomHeight = dragDom.offsetHeight; // 移动元素的高度

            const screenWidth = document.body.clientWidth; // body当前宽度
            const screenHeight = document.body.clientHeight; // body当前高度

            const minDragDomLeft = dragDom.offsetLeft;
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

            const minDragDomTop = dragDom.offsetTop;
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;


            // 获取到的值带px 正则匹配替换
            let styL = getStyle(dragDom, 'left');
            let styT = getStyle(dragDom, 'top');

            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
            } else {
                styL = +styL.replace(/\px/g, '');
                styT = +styT.replace(/\px/g, '');
            }

            document.onmousemove = function(e) {
                // 指针移到指定位置时触发
                // 通过事件委托，计算移动的距离
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -minDragDomLeft;
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft;
                }

                if (-(top) > minDragDomTop) {
                    top = -minDragDomTop;
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop;
                }

                // 移动当前元素
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;

                // emit onDrag event
                // vnode.child.$emit('dragDialog')
                // vnode.elm.dispatchEvent(new CustomEvent('removeClick'));
            }

            document.onmouseup = function(e) {
                document.onmousemove = null;
                document.onmouseup = null;
                lastTime=new Date().getTime();
                if(lastTime-firstTime<200){
                    var handler=vnode.data.on.dragclick;
                    if(typeof handler =="function")
                        handler();
                }
                // console.log(el, binding, vnode);
            }
            return false;
        }
    }
}