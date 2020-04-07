<style lang="less">
.check-form-modal {
  .ivu-modal-body {
    max-height: 675px;
    overflow-x: auto;
  }
}
</style>
<template>
  <div class="customFormBox">
    <!-- <Modal v-model="viable" title="文本域" width="1200" class-name="modal" :mask-closable="false" :styles="{top: '20px'}" > -->
    <Modal
      class-name="modal check-form-modal vertical-center-modal"
      v-model="visible"
      :closable="closable"
      :maskClosable="maskClosable"
      :title="formData.formName"
      :width="width"
      :okText="okText"
      :cancelText="cancelText"
      :loading="loading"
      :styles="styles"
      :class="className"
      :footerHide="footerHide"
      :transitionNames="transitionNames"
      :transfer="transfer"
      @on-ok="ok"
      @on-cancel="cancel"
      @on-visible-change="visibleChange"
    >
      <div class="tableBox">
        <table id="customFormTable" border="0" cellspacing="0" cellpadding="0" width="100%">
          <tr>
            <th style="width:5%">序号</th>
            <th style="width:15%">检查项目</th>
            <th style="width:15%">检查内容</th>
            <th style="width:30%">操作方法与要领</th>
            <th style="width:20%">是否检查</th>
            <th style="width:15%">发现问题情况</th>
          </tr>
          <!-- <tr v-for="(v,i) in formData.itemList" :key="i">
          <td style="width:5%">{{i+1}}</td>
          <td style="width:15%">{{v.itemName}}</td>
          <td colspan="4" style="width:80%">
            <div class="CheckContent" style="overflow:hidden" v-for="(item,index) in v.ckCheckPointDutyDtoList" :key="index"  >
              <span class="tableCol" style="width:18.75%">{{item.pointName}}</span>
              <span class="tableCol" style="width:43.75%">{{item.operationEssentials}}</span>
              <span class="tableCol" style="width:18.75%">
                <label class="lable">
                  <input :name="item.pointId" type="radio" value="1" class="radio" v-model="item.isCheck" @click="check(i,index)" />是
                </label>
                <label class="lable">
                  <input :name="item.pointId" type="radio" value="0" class="radio" v-model="item.isCheck" @click="noCheck(i,index)" />否
                </label>
              </span>
              <span class="tableCol" style="width:18.75%">
                <label class="lable">
                  <input :id="`${i}record${index}`" disabled="false" :name="`${i}${index}`" type="radio" value="1" class="radio" v-model="item.isRecord" @click="usable(i,index)" />是
                </label>
                <label class="lable">
                  <input :id="`${i}noRecord${index}`" disabled="false" :name="`${i}${index}`" type="radio" value="0" class="radio" v-model="item.isRecord" @click="disable(i,index)" />否
                </label>
                <textarea :id="`${i}input${index}`" disabled="true" rows="1" v-model="item.introduction" ></textarea>
  
              </span>
            </div>
          </td>
          </tr>-->

          <template v-for="(v,i) in formData.itemList">
            <template v-for="(item,index) in v.ckCheckPointDutyDtoList">
              <tr :key="'itemList_'+i+'_'+index">
                <td :rowspan="v.ckCheckPointDutyDtoList.length" v-if="index==0">{{i+1}}</td>
                <td :rowspan="v.ckCheckPointDutyDtoList.length" v-if="index==0">{{v.itemName}}</td>
                <td>{{item.pointName}}</td>
                <td>{{item.operationEssentials}}</td>
                <td>
                  <RadioGroup
                    v-model="checkResultPoints[item.pointId]['checkResult']"
                    type="button"
                  >
                    <!-- <span @click="normalClick()"><Radio :disabled="isDisable" label="NORMAL">正常</Radio></span> -->
                    <Radio @click.native.stop="normalClick" :disabled="isDisable" label="NORMAL">正常</Radio>
                    <Radio :disabled="isDisable" label="NOCHECK">缺项</Radio>
                    <Radio
                      @click.native.stop="abnormalClick"
                      :disabled="isDisable"
                      label="ABNORMAL"
                    >异常</Radio>
                  </RadioGroup>
                </td>
                <td>
                  <span
                    v-if="checkResultPoints[item.pointId]['checkResult']=='ABNORMAL' && (checkResult.checkStatus == 'UNCHECK' || checkResult.checkStatus == 'INCHECK')"
                    style="color:#2D8CF0;cursor: pointer;"
                    @click="checkPoint(item)"
                  >记录异常</span>
                  <span
                    v-if="checkResultPoints[item.pointId]['checkResult']=='ABNORMAL' && (checkResult.checkStatus == 'COMPLETE_NORMAL' || checkResult.checkStatus == 'COMPLETE_ABNORMAL')"
                    style="color:#2D8CF0;cursor: pointer;"
                    @click="checkPoint(item)"
                  >查看异常记录</span>
                </td>
              </tr>
            </template>
          </template>
        </table>

        <table id="customFormTable" border="0" cellspacing="0" cellpadding="0" width="100%">
          <tr>
            <th colspan="2">检查确认</th>
          </tr>
          <!-- <template v-if="formData.ckCheckCustomTemplateDutyDto!=null && formData.ckCheckCustomTemplateDutyDto.resultItemList!=null"> -->
          <template v-for="(list,j) in formResultLists">
            <tr v-for="(v,i) in list" :key="'formResultLists_'+j+'_'+i">
              <td style="width:15%">
                <span
                  v-if="v.resultItemRequired == 1"
                  style="color:red;font-size:12px;margin-right:5px"
                >*</span>
                {{v.resultItemName}}
              </td>
              <td style="width:85%">
                <div class="CheckBox" v-if="v.resultItemType=='CHECKBOX'">
                  <label
                    class="restluLable"
                    v-for="(item,index) in v.elementList"
                    :key="item.elementId"
                  >
                    <input
                      :name="item.resultItemId"
                      type="checkbox"
                      v-model="checkResultElements[item.elementId]['elementChecked']"
                      class="radio"
                      :disabled="isDisable"
                    />
                    <span>{{item.elementTitle}}</span>
                  </label>
                </div>
                <div class="CheckBox" v-else-if="v.resultItemType=='RADIO'">
                  <label
                    class="restluLable"
                    v-for="(item,index) in v.elementList"
                    :key="item.elementId"
                  >
                    <input
                      :name="item.resultItemId"
                      type="radio"
                      v-model="checkResultElements[item.elementId]['elementChecked']"
                      class="radio"
                      :id="item.elementId"
                      @click="resultRadioClick(item.resultItemId,item.elementId)"
                      :disabled="isDisable"
                    />
                    <span>{{item.elementTitle}}</span>
                  </label>
                </div>
                <div class="CheckBox" v-else>
                  <Input></Input>
                </div>
              </td>
            </tr>
          </template>
        </table>

        <table
          id="customFormTable"
          border="0"
          cellspacing="0"
          cellpadding="0"
          width="100%"
          v-if="taskId"
        >
          <!-- <template v-if="formData.ckCheckResultTemplateDutyDto!=null && formData.ckCheckResultTemplateDutyDto.resultItemList!=null">
          <tr v-for="(v,i) in formData.ckCheckResultTemplateDutyDto.resultItemList" :key="i">
            <td style="width:15%">
              <span v-if="v.resultItemRequired == 1" style="color:red;font-size:12px;margin-right:5px" >*</span>
              {{v.resultItemName}}
            </td>
            <td style="width:85%">
              <div class="CheckBox" v-if="v.resultItemType=='CHECKBOX'">
                <label class="restluLable" v-for="(item,index) in v.elementList" :key="index">
                  <input :name="item.resultItemId" type="checkbox" class="radio" v-model="checkResultElements[item.elementId]['elementChecked']" />
                  <span>{{item.elementTitle}}</span>
                </label>
              </div>
              <div class="CheckBox" v-else-if="v.resultItemType=='RADIO'">
                <label class="restluLable" v-for="(item,index) in v.elementList" :key="index">
                  <input :name="item.resultItemId" type="radio" class="radio" v-model="checkResultElements[item.elementId]['elementChecked']" />
                  <span>{{item.elementTitle}}</span>
                </label>
              </div>
              <div class="CheckBox" v-else>
                <Input></Input>
              </div>
            </td>
          </tr>
          </template>-->
          <tr>
            <td style="width:15%">
              <span style="color:red;font-size:12px;margin-right:5px">*</span>
              后续处置是否完结
            </td>
            <td style="width:85%">
              <div class="CheckBox">
                <label class="restluLable" @click="unfinished">
                  <input
                    name="isEnd"
                    type="radio"
                    value="0"
                    class="radio"
                    v-model="checkResult.completeStatus"
                    :disabled="isDisable"
                  />
                  <span>未完结</span>
                </label>
                <label class="restluLable" @click="finished">
                  <input
                    name="isEnd"
                    type="radio"
                    value="1"
                    class="radio"
                    v-model="checkResult.completeStatus"
                    :disabled="isDisable"
                  />
                  <span>已完结</span>
                </label>
              </div>
            </td>
          </tr>
          <tr v-show="checkResult.completeStatus == '0'">
            <td style="width:15%">未完结描述</td>
            <td style="width:85%">
              <div class="CheckBox">
                <Input
                  style="width: 100%"
                  type="textarea"
                  v-model="checkResult['formDesc']"
                  placeholder="请输入未完结描述"
                  :disabled="isDisable"
                />
              </div>
            </td>
          </tr>
          <tr v-show="checkResult.completeStatus == '0'">
            <td style="width:15%">未完结图片</td>
            <td style="width:85%">
              <div class="CheckBox">
                <upload
                  @getUrl="getUrlArr2"
                  :id="unfinishedId"
                  :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                  :buttonText="'点击上传图片'"
                  :show="!isDisable"
                  ref="unfinishedUpload"
                ></upload>
              </div>
            </td>
          </tr>
          <tr v-show="checkResult.completeStatus == '1'">
            <td style="width:15%">已完结描述</td>
            <td style="width:85%">
              <div class="CheckBox">
                <Input
                  style="width: 100%"
                  type="textarea"
                  v-model="checkResult['formResultDesc']"
                  placeholder="请输入已完结描述"
                  :disabled="isDisable"
                />
              </div>
            </td>
          </tr>
          <tr v-show="checkResult.completeStatus == '1'">
            <td style="width:15%">已完结图片</td>
            <td style="width:85%">
              <div class="CheckBox">
                <upload
                  @getUrl="getUrlArr3"
                  :id="finishedId"
                  :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                  :buttonText="'点击上传图片'"
                  :show="!isDisable"
                  ref="finishedUpload"
                ></upload>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="saveData" style="margin-left: 8px" v-if="!isDisable">提交</Button>
      </div>
    </Modal>
    <Modal
      v-model="issueModal"
      title="记录问题"
      width="700"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <Form :label-width="130">
        <FormItem label="发现问题图片取证：">
          <upload
            @getUrl="getUrlArr"
            :id="dataId"
            :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
            :buttonText="'点击上传图片'"
            :show="!isDisable"
            ref="upload"
          ></upload>
        </FormItem>
        <FormItem label="发现问题情况：">
          <Input :readonly="isDisable" type="textarea" v-model="introduction"></Input>
        </FormItem>
        <FormItem label="问题处置情况：">
          <Input :readonly="isDisable" type="textarea" v-model="dealResult"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="issueCancel()">取消</Button>
        <Button type="primary" @click="issueSure()" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import upload from "./upload";
import { axiosAll } from "../../../libs/http"
export default {
  components: {
    upload
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "1"
    },
    width: {
      type: [Number, String],
      default: 960
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default: function() {
        return { top: "20px" };
      }
    },
    className: {
      type: String,
      default: "vertical-center-modal"
    },
    // for instance
    footerHide: {
      type: Boolean,
      default: false
    },
    // scrollable: {
    //     type: Boolean,
    //     default: false
    // },
    transitionNames: {
      type: Array,
      default() {
        return ["ease", "fade"];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    },
    formLookId: String,
    taskId: String,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      isSubmit: true,
      isDisable: false,
      formData: {},
      checkResult: {},
      checkResultPoints: {},
      checkResultElements: {},
      dataId: "",
      unfinishedId: "",
      finishedId: "",
      issueModal: false,
      uploadShow: true,
      introduction: "",
      dealResult: "",
      urlStr: ""
    };
  },
  computed: {
    formResultLists() {
      return this.resultLists(this.formData);
    }
    // isDisable(){
    //   if(this.readonly)
    //     return true;
    //   return false;
    // }
  },
  methods: {
    normalClick() {
      for (let i in this.checkResultPoints) {
        if (this.checkResultPoints[i].checkResult == "NORMAL") {
          this.checkResultElements[
            "05dbd0ef87f04383bca293536bd0cbc2"
          ].elementChecked = false;
          this.checkResultElements[
            "4a931c5255464cbd81ec361a7fe5a382"
          ].elementChecked = true;
          document.getElementById(
            "05dbd0ef87f04383bca293536bd0cbc2"
          ).checked = false;
          document.getElementById(
            "4a931c5255464cbd81ec361a7fe5a382"
          ).checked = true;
        }
      }
    },
    abnormalClick() {
      document.getElementById(
        "05dbd0ef87f04383bca293536bd0cbc2"
      ).checked = true;
      document.getElementById(
        "4a931c5255464cbd81ec361a7fe5a382"
      ).checked = false;
    },
    ok() {
      if (!this.loading) this.$emit("input", this.visible);
      this.$emit("on-ok");
    },
    cancel() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      this.$emit("on-visible-change", val);
    },
    //请求表单和结果数据
    getFormData() {
      this.formData = {};
      this.checkResult = {};
      this.checkResultPoints = {};
      this.checkResultElements = {};

      var requests = [
        this.$http.get(
          `/supervision/form/getFormById?formId=${this.formLookId}`
        )
      ];

      if (!this.$util.isEmpty(this.taskId))
        requests.push(
          this.$http.get(
            `/supervision/checkresult/form?taskId=${this.taskId}&formId=${this.formLookId}`
          )
        );

      axiosAll(requests, (form, result) => {
        if (form.success) {
          if (!this.$util.isNull(result) && result.success)
            this.mergeData(form.data, result.data);
          else this.mergeData(form.data);
        }
      });

      // this.$http.get(`/supervision/form/getFormById?formId=${this.formLookId}`).then(form=>{
      //   if(form.success){
      //     if(this.taskId){
      //       this.$http.get(`/supervision/checkresult/form?taskId=${this.taskId}&formId=${this.formLookId}`).then(result=>{
      //         if(result.success){
      //           this.mergeData(form.data,result.data);
      //         }else{
      //           this.mergeData(form.data);
      //         }
      //       });
      //     }else{
      //       this.mergeData(form.data);
      //     }
      //   }
      // });
    },
    //合并数据
    mergeData(formData, resultData) {
      //检查结果
      var checkResultPoints = {};
      var checkResultElements = {};

      if (!this.$util.isNull(resultData)) {
        // console.log(resultData,'resultData')
        if (
          resultData.checkStatus == "UNCHECK" ||
          resultData.checkStatus == "INCHECK"
        ) {
          this.isDisable = false;
        } else {
          this.isDisable = true;
        }
        // if(resultData.checkStatus != "UNCHECK"){
        if (resultData.completeStatus == "0") {
          this.unfinishedId = this.taskId + this.formLookId + "unfinished";
          this.$refs.unfinishedUpload.loadFiles();
        } else {
          this.finishedId = this.taskId + this.formLookId + "finished";
          this.$refs.finishedUpload.loadFiles();
        }
        // }
        var pointResultList = resultData.pointResultList;
        if (!this.$util.isNull(resultData.pointResultList)) {
          for (let i = 0; i < pointResultList.length; i++) {
            var point = pointResultList[i];
            checkResultPoints[point.pointId] = point;
          }
        }
        // console.log(checkResultPoints,'checkResultPoints')
        var resultList = resultData.resultList;
        if (!this.$util.isNull(resultList)) {
          for (let i = 0; i < resultList.length; i++) {
            var result = resultList[i];
            if (
              this.$util.isNull(result) ||
              this.$util.isEmpty(result.detailValue)
            )
              continue;
            var details = JSON.parse(result.detailValue);
            for (let j = 0; j < details.length; j++) {
              var detail = details[j];
              detail["elementChecked"] = eval(detail["elementChecked"]);
              checkResultElements[detail.elementId] = detail;
            }
          }
        }
      }

      //检查点明细

      var itemList = formData.itemList;
      for (let i = 0; i < itemList.length; i++) {
        var item = itemList[i];
        var ckCheckPointDutyDtoList = item.ckCheckPointDutyDtoList;
        for (let j = 0; j < ckCheckPointDutyDtoList.length; j++) {
          var point = ckCheckPointDutyDtoList[j];
          var pointResult = checkResultPoints[point.pointId];
          if (this.$util.isNull(pointResult)) {
            checkResultPoints[point.pointId] = {
              itemId: point.itemId,
              pointId: point.pointId,
              isRecord: "0",
              checkResult: "NORMAL"
            };
          }
        }
      }
      var resultLists = this.resultLists(formData);
      //自定义模板明细
      for (let z = 0; z < resultLists.length; z++) {
        // if(!this.$util.isNull(formData.ckCheckCustomTemplateDutyDto) && !this.$util.isNull(formData.ckCheckCustomTemplateDutyDto.resultItemList)){
        var resultItemList = resultLists[z];
        // console.log(resultItemList);
        for (let i = 0; i < resultItemList.length; i++) {
          var resultItem = resultItemList[i];
          var elementList = resultItem.elementList;
          if (!this.$util.isNull(elementList)) {
            for (let j = 0; j < elementList.length; j++) {
              var element = elementList[j];
              var pointResult = checkResultElements[element.elementId];
              if (this.$util.isNull(pointResult)) {
                checkResultElements[element.elementId] = {
                  elementChecked: eval(element.elementChecked) || false,
                  elementCode: element.elementCode,
                  elementId: element.elementId,
                  elementInputValue: element.elementInputValue,
                  elementOrder: element.elementOrder,
                  elementTitle: element.elementTitle,
                  elementType: element.elementType,
                  resultItemId: element.resultItemId,
                  status: "1"
                };
              }
            }
          }
        }
      }
      //结果模板明细
      // if(!this.$util.isNull(formData.ckCheckResultTemplateDutyDto) && !this.$util.isNull(formData.ckCheckResultTemplateDutyDto.resultItemList)){
      //   var resultItemList= formData.ckCheckResultTemplateDutyDto.resultItemList;
      //   for(let i=0;i<resultItemList.length;i++){
      //       var resultItem=resultItemList[i];
      //       var elementList=resultItem.elementList;
      //       if(!this.$util.isNull(elementList)){
      //         for(let j=0;j<elementList.length;j++){
      //           var element=elementList[j];
      //           var pointResult=checkResultElements[element.elementId];
      //           if(this.$util.isNull(pointResult)){
      //             checkResultElements[element.elementId]={
      //                 elementChecked: element.elementChecked||false,
      //                 elementCode: element.elementCode,
      //                 elementId: element.elementId,
      //                 elementInputValue: element.elementInputValue,
      //                 elementOrder: element.elementOrder,
      //                 elementTitle: element.elementTitle,
      //                 elementType: element.elementType,
      //                 resultItemId: element.resultItemId,
      //                 status: "1"
      //             }
      //           }
      //         }
      //       }
      //    }
      // }
      this.formData = formData;
      this.checkResult = resultData;
      this.checkResultPoints = checkResultPoints;
      this.checkResultElements = checkResultElements;
      console.log(checkResultElements, "checkResultElements");
    },
    //保存数据
    saveData() {
      var resultData = this.checkResult;
      resultData.pointResultList = this.sortData(this.checkResultPoints);

      //结果模板数据
      var details = {};
      var resultList = resultData.resultList;
      for (let i = 0; i < resultList.length; i++) {
        var element = resultList[i];
        if (!this.$util.isEmpty(element["resultItemId"]))
          details[element["resultItemId"]] = element;
      }
      var checkResultElements = this.checkResultElements;
      for (let i in checkResultElements) {
        var element = checkResultElements[i];
        if (this.$util.isNull(details[element.resultItemId])) {
          details[element.resultItemId] = {
            formId: resultData.id,
            resultItemId: element.resultItemId
          };
        }
        var detail = details[element.resultItemId];
        if (this.$util.isNull(detail.values)) detail.values = [];
        element.elementChecked = "" + element.elementChecked;
        detail.values.push(element);
      }
      var results = [];
      for (let i in details) {
        var detail = details[i];
        detail.detailValue = JSON.stringify(detail.values);
        delete detail.values;
        results.push(detail);
      }
      resultData.resultList = results;

      //任务状态
      if (resultData.completeStatus == "1") {
        var pointResultList = resultData.pointResultList;
        var checkStatus = "COMPLETE_NORMAL";
        for (let i = 0; i < pointResultList.length; i++) {
          if (pointResultList[i]["checkResult"] == "ABNORMAL") {
            checkStatus = "COMPLETE_ABNORMAL";
            break;
          }
        }
        resultData.checkStatus = checkStatus;
      } else {
        resultData.checkStatus = "INCHECK";
      }
      console.log(resultData);
      this.$http
        .post("/supervision/checkresult/saveForm", resultData)
        .then(res => {
          if (res.success) {
            this.visible = false;
            this.$emit("isSuccess", true);
            this.ok();
          } else {
            this.$Message.error("操作失败");
          }
        });
    },
    resultLists(formData) {
      var resultLists = [];
      if (
        !this.$util.isNull(formData.ckCheckCustomTemplateDutyDto) &&
        !this.$util.isNull(formData.ckCheckCustomTemplateDutyDto.resultItemList)
      )
        resultLists.push(formData.ckCheckCustomTemplateDutyDto.resultItemList);
      if (
        !this.$util.isNull(formData.ckCheckResultTemplateDutyDto) &&
        !this.$util.isNull(formData.ckCheckResultTemplateDutyDto.resultItemList)
      )
        resultLists.push(formData.ckCheckResultTemplateDutyDto.resultItemList);
      return resultLists;
    },
    resultRadioClick(resultItemId, elementId) {
      var checkResultElements = this.checkResultElements;
      for (var i in checkResultElements) {
        var element = checkResultElements[i];
        if (element["resultItemId"] == resultItemId) {
          element["elementChecked"] = element["elementId"] == elementId;
        }
      }
    },
    sortData(obj) {
      var arr = [];
      for (var i in obj) {
        arr.push(obj[i]);
      }
      return arr;
    },
    checkPoint(item) {
      console.log(item);
      this.unfinishedId = "";
      this.finishedId = "";
      this.dataId = this.taskId + item.pointId;
      this.$refs.upload.loadFiles();
      this.pointId = item.pointId;
      this.urlStr = this.checkResultPoints[item.pointId].files;
      this.introduction = this.checkResultPoints[item.pointId].introduction;
      this.dealResult = this.checkResultPoints[item.pointId].dealResult;
      this.issueModal = true;
    },
    issueCancel() {
      this.dataId = "";
      this.introduction = "";
      this.dealResult = "";
      this.issueModal = false;
    },
    issueSure() {
      this.checkResultPoints[this.pointId]["files"] = this.urlStr;
      this.checkResultPoints[this.pointId]["introduction"] = this.introduction;
      this.checkResultPoints[this.pointId]["dealResult"] = this.dealResult;
      console.log(this.checkResultPoints, "checkResultPoints");
      this.issueCancel();
    },
    getUrlArr(v) {
      if (v === undefined) {
        this.urlStr = "";
      } else {
        this.urlStr = "";
        v.forEach((v, i) => {
          this.urlStr = v.url + "," + this.urlStr;
        });
      }
    },
    getUrlArr2(v) {
      if (v === undefined) {
        return;
      } else {
        this.checkResult["NofinishFiles"] = "";
        v.forEach((v, i) => {
          this.checkResult.NofinishFiles =
            v.url + "," + this.checkResult.NofinishFiles;
        });
      }
    },
    getUrlArr3(v) {
      if (v === undefined) {
        return;
      } else {
        this.checkResult["finishFiles"] = "";
        v.forEach((v, i) => {
          this.checkResult.finishFiles =
            v.url + "," + this.checkResult.finishFiles;
        });
      }
    },
    unfinished() {
      this.$nextTick(() => {
        this.unfinishedId = this.taskId + this.formLookId + "unfinished";
        this.finishedId = "";
        this.$refs.unfinishedUpload.loadFiles();
        // console.log(this.unfinishedId,'unfinished')
      });
    },
    finished() {
      this.$nextTick(() => {
        this.finishedId = this.taskId + this.formLookId + "finished";
        this.unfinishedId = "";
        this.$refs.finishedUpload.loadFiles();
        // console.log(this.finishedId,'finishedId')
      });
    }
  },
  watch: {
    value(val) {
      if (val) {
        if (!this.taskId) {
          this.isDisable = true;
        } else {
          this.isDisable = false;
        }
        this.visible = val;
        this.getFormData();
      }
    }
    // formLookId(val){
    //   if(val){
    //     this.visible=true;
    //     this.getFormData();
    //   }
    // }
  }
};
</script>

<style scoped>
.customFormBox {
  background: white;
}
/* .tableRow{
    text-align: center;
    border: 1px solid #e9eaec
} */
.tableCol {
  border-bottom: 1px solid #e9eaec;
  border-right: 1px solid #e9eaec;
  display: table-cell;
  vertical-align: middle;
  /* float: left; */
  /* height: 100%; */
  /* height:inherit; */
  box-sizing: border-box;
  padding: 10px 5px;
}
#customFormTable th {
  border: 1px solid #e9eaec;
  height: 30px;
  line-height: 30px;
}
#customFormTable td {
  border: 1px solid #e9eaec;
  /* height: 50px; */
  /* line-height: 50px; */
  text-align: center;
}
.radio {
  margin-right: 3px;
  vertical-align: -2px;
}
.lable {
  margin-right: 5px;
}
.CheckContent {
  display: flex;
  height: 100%;
}
.CheckBox {
  height: 100%;
  padding: 10px;
  text-align: left;
}
.restluLable {
  margin-right: 10px;
}
textarea {
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 4px 7px;
  box-sizing: border-box;
  min-height: 36px;
}
textarea:disabled {
  background-color: #f3f3f3;
}
[type="checkbox"],
[type="radio"] {
  cursor: pointer;
}
input:disabled {
  cursor: unset;
}
.allRadioBox {
  margin-top: -10px;
}
.tableBox td {
  padding: 4px;
}
</style>