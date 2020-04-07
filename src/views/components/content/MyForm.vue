<template>
    <div>
        <Form :ref="id" :model="dataInfo" :rule="ruleVaildator" :label-width="80">
            <slot></slot>
        </Form>
    </div>
</template>

<script>
import { isNull } from '@/libs/common';
export default {
    name: 'MyForm',
    props: {
        id:{
            type: String
        },
        dataInfo:{
            type: Object,
            default(){
                return {};
            }
        },
        ruleVaildator:{
            type: Array
        },
        buttons:{
            type: Array,
            default(){
                return [];
            }
        }
    },  
    data () {
        return {
            appModal:{
                show:false,
                appInfo:{

                }
            }
        };
    },
    methods: {
        
    },
    mounted() {
        
    }
};
</script>

