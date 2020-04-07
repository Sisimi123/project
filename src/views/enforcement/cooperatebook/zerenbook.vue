<style lang="less" scoped>
    @import '../../../styles/common.less';
</style>  
<template>
    <div class="fu">
        <Card style="height:580px;">
            <Button @click="ShipModal=true">渔船安全生产责任书</Button>
            <Button @click="PeopleModal=true">船员安全生产责任书</Button>
        </Card>
        <Modal v-model="ShipModal" :styles="{top: '100px'}" title="渔船安全生产责任书" width="840">
                <div class="shipsafe printonly printOrder-datanss">
                        <p class="centers">渔船安全生产责任书</p>
                        <br/><span class="suojin"></span>甲方：<input type="text" value="苍南县惠利渔业专业合作社" class="signiture">
                        <br/><span class="suojin"></span>乙方：<input type="text" value="浙苍渔（运）————————" class="signiture">
                        <br/><span class="suojin"></span>为了保证渔船航行和生产的安全，防止海损事故的发生，确保渔民生产和财产的安全，认真贯彻执行“安全第一，预防为主”的方针，使渔业安全生产规章制度全面落实，做到责任明确，现经双方研究决定，特订立以下安全责任书：
                        <br/><span class="suojin"></span>甲方对安全生产负领导责任：
                        <br/><span class="suojin"></span>一、领导和组织乙方学习有关法律法规和安全知识，增强法制观念和安全意识；
                        <br/><span class="suojin"></span>二、督促乙方严格遵守和执行国家有关法律法规和上级管理部门的有关政策，服从上级管理机关的监督和管理，自觉维护海上生产和港区的交通秩序；
                        <br/><span class="suojin"></span>三、组织船员业务技术培训，并协作乙方处理海损事故等工作；
                        <br/><span class="suojin"></span>四、督促检查乙方各项安全生产规章制度的落实，认真总结经验教训，确保安全生产；
                        <br/><span class="suojin"></span>五、定期开展安全隐患排查工作吗；
                        <br/><span class="suojin"></span>乙方对航行、生产的安全负直接责任：
                        <br/><span class="suojin"></span>一、严格遵守执行《72国籍避碰规则》、《中华人民共和国海上交通安全法》、《中华人民共和国渔港水域交通安全管理条例》、《渔船作业避让暂行条例》和渔船安全操作规程，自觉办理进出港签证手续；
                        <br/><span class="suojin"></span>二、严禁超抗风力等级、超航区航行、生产，严禁违章搭客；
                        <br/><span class="suojin"></span>三、做到经常检查船体、主机和各种设备的技术情况和使用情况，及时做好维护保养工作，保证船舶处于适航状态；
                        <br/><span class="suojin"></span>四、保养期间一定要检查好船体各部门的安全情况；
                        <br/><span class="suojin"></span>五、生产期间保证救生、消防、通讯、信号灯、号型等处于适航状态；
                        <br/><span class="suojin"></span>六、做好船上日常值班，注意防火、防盗、人身安全、严禁港内违规明火作业；
                        <br/><span class="suojin"></span>七、要做好防台、避风、抗台等工作；
                        <br/><span class="suojin"></span>八、渔船每次进出港时，必须通过北斗设备向县渔船安全信息中心发送进出港报告，出港期间必须开启渔船信息终端设备，积极回复信息中心发送有关的安全信息，做好信息终端设备日常维护，做到信息终端专人保管，如有故障及时到维修点进行维护，未携带信息终端设备不得出海，按规定实行报平安制度。
                        <br/><span class="suojin"></span>九、发生海损事故应按规定及时向就近渔港监督部门报告，并接受调查，申请有关部门调解。
                        <br/><span class="suojin"></span>本责任书有限期定为一年，自<input type="text" class="dt">年<input type="text" class="dt">月<input type="text" class="dt">日起至<input type="text" class="dt">年<input type="text" class="dt">月<input type="text" class="dt">日止，双方签名盖章后生效。
                        <p style="height:20px;"></p>
                        <br/><span class="suojin"></span>甲方（代表）签字：
                        <p style="height:20px;"></p>
                        <br/><span class="suojin"></span>乙方（代表）签字：
                        <br/><span style="display: inline-block;width:400px;"></span><input type="text" class="dt">年<input type="text" class="dt">月<input type="text" class="dt">日
                </div>
                <div slot="footer">
                        <Button  @click="ShipModal = false">关闭</Button>
                        <Button  @click="dayin()" type="primary">打印</Button>
                </div>
        </Modal>
        <Modal v-model="PeopleModal" :styles="{top: '100px'}" title="船员安全生产责任书" width="840">
                <div class="peopleD printonly printOrder-datanss">
                        <p class="centers">浙苍渔（运）<input type="text" style="width:150px;border:0;outline:0;text-align: center;border-bottom:1px solid black;"> 船员安全生产责任书</p>
                        <br/>船长：<input type="text" value="" class="signiture">
                        <br/>船员：<input type="text" value="" class="signiture">
                        <br/><span class="suojin"></span>为了认真贯彻执行“安全第一，预防为主”的工作方针，全面落实上级有关部门的安全生产责任制，防止海损事故和其他以外工伤事故的发生，确保渔船船员的生命财产安全，进一步明确各船员的职责。现经本船研究特订立如下安全生产责任书：
                        <br/><span class="suojin"></span>一、各船员必须遵守国际公约、国际惯例，遵守国家和港口当局的法律、法规、规章、条例、法令。
                        <br/><span class="suojin"></span>二、各船员必须认真遵守《渔船安全航行守则》，切实履行船员职责。
                        <br/><span class="suojin"></span>三、船员在临水作业时必须穿救生衣上甲板作业。
                        <br/><span class="suojin"></span>四、船员在参加起、放网时必须戴安全帽作业。
                        <br/><span class="suojin"></span>五、在渔船航行生产时严禁醺酒、赌博。
                        <br/><span class="suojin"></span>六、严禁船员在床上吸烟、乱丢烟蒂及其他违规明火作业。
                        <br/><span class="suojin"></span>七、船员要严格执行值班制度，特别是渔船抛锚时要坚守值班岗位，加强值班瞭望。
                        <br/><span class="suojin"></span>八、轮机人员除完成本职工作外，还需特别注意安排好轮机值班。
                        <br/><span class="suojin"></span>九、渔船抛锚时应事先清理锚索（锚链），检查好锚索（锚链）旋子和卸扣。
                        <br/><span class="suojin"></span>十、起网机操作人员应注意事项：
                        <br/><span class="suojin"></span>1、经常检查起网机的各部件运转情况，确保起、放网顺利进行。
                        <br/><span class="suojin"></span>2、经常检查送勾绳、吊渔钢丝索的磨损程度；
                        <br/><span class="suojin"></span>3、起网机运转时要系紧衣服，防止勾缠。
                        <br/><span class="suojin"></span>十一、起、放网时应注意事项：
                        <br/><span class="suojin"></span>1、大风大浪起网时，船尾要系好安全保险绳，以防止夹综弹出船尾；
                        <br/><span class="suojin"></span>2、放网时，放网人员要站在安全的地方，防止被网眼和绳索勾缠；
                        <br/><span class="suojin"></span>3、出渔绳时，渔绳边不准站无关人员。
                        <br/><span class="suojin"></span>时效：该责任书有效期为一年，自<input type="text" class="dt">年<input type="text" class="dt">月<input type="text" class="dt">日至<input type="text" class="dt">年<input type="text" class="dt">月<input type="text" class="dt">日。
                        <br/><span class="suojin"></span>违背责任：
                        <br/><span class="suojin"></span>一、各船员必须严格执行责任书中确定的各项条款，如有违背，发生意外事故由该当事人负（主要）责任。
                        <br/><span class="suojin"></span>二、任何船员违背上诉条款到主要部门处罚，责任自负。
                        <p style="height:20px;"></p>
                        <br/><span class="suojin"></span>船长签名：<span style="display: inline-block;width:275px;"></span>船员签字：
                        <p style="height:20px;"></p>
                        <br/><span class="suojin"></span>所属单位盖章：<span style="display: inline-block;width:200px;"></span><input type="text" class="dt">年<input type="text" class="dt">月<input type="text" class="dt">日
                </div>
                <div slot="footer">
                        <Button  @click="PeopleModal = false">关闭</Button>
                        <Button  @click="dayin()" type="primary">打印</Button>
                </div>
        </Modal>
</div>
</template>
<script>
import {isNull } from '@/libs/common.js'  
export default {
    name: 'filemng',
    components: {
    },
    data () {
        return {
            ShipModal:false,
            PeopleModal:false,
        }
    },
    computed:{  
    },
    methods: {
        dayin(){
            var newstr = document.getElementsByClassName('printOrder-datanss')[0].innerHTML
            document.body.innerHTML = newstr
            window.print()
            // 重新加载页面，以刷新数据
            window.location.reload()
        },
    },
    mounted() {
    },
};
</script>      
<style scoped>
.centers{
        text-align: center;
        font-size:25px;
}
.peopleD,.shipsafe{
        font-size:17px;
        width:100%;
        height:580px;
        overflow: auto;
        padding:20px 60px;
        letter-spacing:0px;
        line-height:30px;  
}
.peopleD>.suojin,.shipsafe>.suojin{
        display:inline-block;
        width:34px;
}
input.dt{
        width:40px;
        outline:0;
        border:0;
        text-align:center;
}
input.signiture{
        width:400px;
        outline:0;
        border:0;
}
</style>
                    
        
        
        