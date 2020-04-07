<template>
    <div id="UEtor">
        <script id="editor" type="text/palin"></script>
    </div>
</template>
<script>
import '../../../public/ueditor2/ueditor.config'
import '../../../public/ueditor2/ueditor.all'
import '../../../public/ueditor2/lang/zh-cn/zh-cn'
export default {
    name:'UEtor',
    data(){
        return {
            editor:null,
            initialing:true,
        }
    },
    props:{
        defaultMsg:{
            type:String
        },
        config:{
            type:Object
        },
        initialFrameWidth:{
            type:[Number,String]
        }
    },
    methods:{
        getUEContent(){
            return this.editor.getContent();
            // console.log(tttete);
            // return 'dasd';
        },
        setUEContent(content){
            const _self = this;
            if(_self.initialing){
                _self.editor.ready(function(){
                    _self.initialing = false;
                    _self.editor.setContent(content,false);
                    $(".edui-editor-messageholder.edui-default").css({ "visibility": "hidden" });
                })
            }else{
                _self.editor.setContent(content,false);
            }
            
        }
    },
    mounted(){
        //初始化UE
        const _self = this;
        // _self.config.initialFrameWidth=_self.initialFrameWidth;
        _self.editor = UE.getEditor('editor',_self.config);
        // _self.editor.ready(function () {
        console.log('mounted',_self.defaultMsg)
        if(_self.defaultMsg != ''){
            _self.setUEContent(_self.defaultMsg);
        }            
        // });
        

    },
    destroyed(){
        this.editor.destroy();
    }
    
}
</script>
<style>
    .edui-editor .edui-box{
        width:auto;
        height:24px;
    }
    .edui-editor-messageholder.edui-default
    { 
        visibility: "hidden" 
    };

</style>


