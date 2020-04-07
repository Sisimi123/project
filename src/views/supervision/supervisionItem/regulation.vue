<style lang="less">
// @import "../../../styles/commonStyle.less";
@import "../../../styles/common.less";
</style>
<template>
  <div>
    <data-table
      ref="test"
      :url="'/supervision/regulation/listRegulation'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="事项编码:">
                <Input v-model="query.wheres.itemCode" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="监管事项:" :label-width="110">
                <Input v-model="query.wheres.itemName" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="监管部门:">
                <Input v-model="query.wheres.supervisionDept" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="事项状态:">
                <RadioGroup
                  v-model="query.wheres.itemStatus"
                  type="button"
                  @on-change="statusChange"
                >
                  <Radio label="0">无效</Radio>
                  <Radio label="1">在用</Radio>
                </RadioGroup>
              </Form-item>
            </Col>
            <Col span="8">
                <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset()">重置</Button>
                
              
                <MyUpload :action="'/supervision/regulation/importYSGS'"
                    :format="['xlsx','xls']"  
                    :on-success="importXls"
                    :on-format-error="handleFormatError"
                    style="height:35px;float:right;margin-left:4px;"
                    >
                    <Button type="info" icon="ios-cloud-download-outline">导入映射关系梳理表</Button>
                </MyUpload>
                <MyUpload :action="'/supervision/regulation/importGJSX'"
                    :format="['xlsx','xls']"  
                    :on-success="importXls"
                    :on-format-error="handleFormatError"
                    style="height:35px;float:right;margin-left:4px;"
                    >
                    <Button type="info" icon="ios-cloud-download-outline">导入国家事项清单</Button>
                </MyUpload>
                <Button @click="add()" type="success" style="float:right;margin-left:4px;">新增</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal
      v-model="modal"
      :title="itemTitle"
      width="1000"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <div class="formBox">
        <!-- <Card :bordered="false" style="margin-bottom:15px">
        <p slot="title"></p>-->
        <Row style="margin-bottom:10px">
          <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
          <span icon="ios-add" class="title">监管主项</span>
        </Row>
        <Form ref="itemObj" :model="itemObj" :rules="itemObjdate" :label-width="200">
          <Row>
            <Col span="12">
              <FormItem label="职能部门：" prop="dutyCode">
                <Select v-model="itemObj.dutyCode" :disabled="!isItemSubmit">
                  <Option value="A028">农业部门</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="业务条线：" prop="lineCode">
                <Select v-model="itemObj.lineCode" :disabled="!isItemSubmit">
                  <Option value="A0280000001">农业部门</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="事项编码：" prop="itemCode">
                <Input
                  style="width: 100%"
                  v-model="itemObj.itemCode"
                  placeholder="请输入事项编码"
                  :readonly="!isItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="监管事项：" prop="itemName">
                <Input
                  style="width: 100%"
                  v-model="itemObj.itemName"
                  placeholder="请输入监管事项"
                  :readonly="!isItemSubmit"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="监管事项对应的权力事项编码：" prop="powerItemCode">
                <Input
                  style="width: 100%"
                  v-model="itemObj.powerItemCode"
                  placeholder="请输入监管事项对应的权力事项编码"
                  :readonly="!isItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="监管部门：" prop="supervisionDept">
                <Input
                  style="width: 100%"
                  v-model="itemObj.supervisionDept"
                  placeholder="请输入监管部门"
                  :readonly="!isItemSubmit"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="对应的许可事项类型：" prop="allowItemType">
                <Input
                  style="width: 100%"
                  v-model="itemObj.allowItemType"
                  placeholder="请输入对应的许可事项类型"
                  :readonly="!isItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="对应的许可事项名称：" prop="allowItemName">
                <Input
                  style="width: 100%"
                  v-model="itemObj.allowItemName"
                  placeholder="请输入对应的许可事项名称"
                  :readonly="!isItemSubmit"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="设置人：">
                <Input
                  style="width: 100%"
                  v-model="itemObj.userName"
                  placeholder="请输入设置人"
                  :readonly="true"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="设置部门：">
                <Input
                  style="width: 100%"
                  v-model="itemObj.deptName"
                  placeholder="请输入设置部门"
                  :readonly="true"
                />
              </FormItem>
            </Col>
          </Row>
          <Form-item label="事项状态:" prop="itemStatus">
            <RadioGroup v-model="itemObj.itemStatus">
              <Radio :disabled="!isItemSubmit" label="0">无效</Radio>
              <Radio :disabled="!isItemSubmit" label="1">有效</Radio>
            </RadioGroup>
          </Form-item>
          <div v-if="itemId">
            <Row style="margin-bottom:10px">
              <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
              <span icon="ios-add" class="title">监管子项</span>
              <Button style="float:right" v-if="isItemSubmit" @click="addSubItem()" type="success">新增子项</Button>
            </Row>
            <Table border :columns="subItemColumns" :data="subItemList">
              <template slot-scope="{ row, index }" slot="action">
                  <Button type="info" size="small" style="margin-right: 5px" @click="subItemDetails(row)">详情</Button>
                  <Button type="primary" v-if="isItemSubmit" size="small" @click="subItemEdit(row)">编辑</Button>
              </template>
            </Table>
          </div>
        </Form>
      </div>
      <div v-show="isItemSubmit" slot="footer">
        <Button @click="cancel('itemObj')">取消</Button>
        <Button type="primary" @click="sure('itemObj')" style="margin-left: 8px">确定</Button>
      </div>
      <div v-show="!isItemSubmit" slot="footer">
        <Button @click="cancel('itemObj')">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="subItemModal"
      :title="subItemTitle"
      width="1000"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <div class="formBox">
        <!-- <Card :bordered="false" style="margin-bottom:15px">
        <p slot="title"></p>-->
        <Row style="margin-bottom:10px">
          <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
          <span icon="ios-add" class="title">监管子项</span>
        </Row>
        <Form ref="subItemObj" :model="subItemObj" :rules="subItemObjdate" :label-width="150">
          <Row>
            <Col span="12">
              <FormItem label="职能部门：" prop="dutyCode">
                <Select v-model="subItemObj.dutyCode" :disabled="!isSubItemSubmit">
                  <Option value="A028">农业部门</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="业务条线：" prop="lineCode">
                <Select v-model="subItemObj.lineCode" :disabled="!isSubItemSubmit">
                  <Option value="A0280000001">农业部门</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="子项编码：" prop="subItemCode">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.subItemCode"
                  placeholder="请输入子项编码："
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="监管子项：" prop="subItemName">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.subItemName"
                  placeholder="请输入监管子项："
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="对应的子项权力编码：" prop="subItemPowerCode">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.subItemPowerCode"
                  placeholder="请输入对应的子项权力编码"
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="监管对象类别：" prop="checkType">
                <Select v-model="subItemObj.checkType">
                  <Option v-for="(item,i) in checkObjectTypeList" :key="i" :value="item.value">{{item.title}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="监管对象：" prop="supervisionObject">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.supervisionObject"
                  placeholder="请输入监管对象："
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="监管形式：" prop="supervisionForm">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.supervisionForm"
                  placeholder="请输入监管形式"
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="监管方式：" prop="supervisionMode">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.supervisionMode"
                  placeholder="请输入监管方式"
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="监管层级：" prop="supervisionLevel">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.supervisionLevel"
                  placeholder="请输入监管层级"
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="设定依据：" prop="supervisionBasis">
                <Input
                  style="width: 100%"
                  type="textarea"
                  v-model="subItemObj.supervisionBasis"
                  placeholder="请输入设定依据"
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="监管流程：" prop="supervisionProcess">
                <Input
                  style="width: 100%"
                  type="textarea"
                  v-model="subItemObj.supervisionProcess"
                  placeholder="请输入监管流程"
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="监管结果：" prop="supervisionResult">
                <Input
                  style="width: 100%"
                  type="textarea"
                  v-model="subItemObj.supervisionResult"
                  placeholder="请输入监管结果"
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="检查实施清单编号：" prop="practListCode">
                <Input
                  style="width: 100%"
                  type="textarea"
                  v-model="subItemObj.practListCode"
                  placeholder="请输入检查实施清单编号"
                  :readonly="!isSubItemSubmit"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="适用范围：" prop="applyScope">
                <CheckboxGroup v-model="subItemObj.applyScopeArr" @on-change="applyScopeArrChange">
                  <Checkbox :disabled="!isSubItemSubmit" label="1">适用全省</Checkbox>
                  <Checkbox :disabled="!isSubItemSubmit" label="2">适用地市</Checkbox>
                  <Checkbox :disabled="!isSubItemSubmit" label="3">适用区县</Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="子项状态：" prop="subItemStatus">
                <RadioGroup v-model="subItemObj.subItemStatus">
                  <Radio :disabled="!isSubItemSubmit" label="0">无效</Radio>
                  <Radio :disabled="!isSubItemSubmit" label="1">在用</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="设置人：">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.userName"
                  placeholder="请输入设置人"
                  :readonly="true"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="设置部门：">
                <Input
                  style="width: 100%"
                  v-model="subItemObj.deptName"
                  placeholder="请输入设置部门"
                  :readonly="true"
                />
              </FormItem>
            </Col>
          </Row>
          <div v-if="subItemId">
            <Row style="margin-bottom:10px">
              <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
              <span icon="ios-add" class="title">监管检查项</span>
              <Button style="float:right" v-if="isSubItemSubmit" @click="addCheckItem()" type="success">新增检查项</Button>
            </Row>
            <Table border :columns="checkItemColumns" :data="checkItemList">
              <template slot-scope="{ row, index }" slot="action">
                  <Button type="info" size="small" style="margin-right: 5px" @click="checkItemDetails(row)">详情</Button>
                  <Button type="primary" v-if="isSubItemSubmit" size="small" style="margin-right: 5px" @click="checkItemEdit(row)">编辑</Button>
                  <Button type="error" v-if="isSubItemSubmit" size="small"  @click="checkItemDel(row)">删除</Button>
              </template>
            </Table>
          </div>
        </Form>
      </div>
      <div v-show="isSubItemSubmit" slot="footer">
        <Button @click="SubCancel('subItemObj')">取消</Button>
        <Button type="primary" @click="SubSure('subItemObj')" style="margin-left: 8px">确定</Button>
      </div>
      <div v-show="!isSubItemSubmit" slot="footer">
        <Button @click="SubCancel('subItemObj')">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="checkItemModal"
      :title="checkItemTitle"
      width="1000"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <div class="formBox">
        <!-- <Card :bordered="false" style="margin-bottom:15px">
        <p slot="title"></p>-->
        <Row style="margin-bottom:10px">
          <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
          <span icon="ios-add" class="title">监管检查项</span>
        </Row>
        <Form ref="checkItemObj" :model="checkItemObj" :rules="checkItemObjdate" :label-width="150">
          <FormItem label="自定义检查项：" prop="checkItem">
              <Input
                style="width: 100%"
                type="textarea"
                v-model="checkItemObj.checkItem"
                :disabled="!isCheckItemSubmit"
                placeholder="请输入自定义检查项"
              />
          </FormItem>
          <div v-if="checkId">
            <Row style="margin-bottom:10px">
              <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
              <span icon="ios-add" class="title">监管检查内容</span>
              <Button style="float:right" v-if="isCheckItemSubmit" @click="addCheckContent()" type="success">新增检查内容</Button>
            </Row>
            <Table border :columns="checkContentColumns" :data="checkContentList">
              <template slot-scope="{ row, index }" slot="action">
                  <Button type="info" size="small" style="margin-right: 5px" @click="checkContentDetails(row)">详情</Button>
                  <Button type="primary" v-if="isCheckItemSubmit" size="small" style="margin-right: 5px" @click="checkContentEdit(row)">编辑</Button>
                  <Button type="error" v-if="isCheckItemSubmit" size="small"  @click="checkContentDel(row)">删除</Button>

              </template>
            </Table>
          </div>
          </Form>
          </div>
          <div v-show="isCheckItemSubmit" slot="footer">
            <Button @click="checkCancel('subItemObj')">取消</Button>
            <Button type="primary" @click="checkSure('subItemObj')" style="margin-left: 8px">确定</Button>
          </div>
          <div v-show="!isCheckItemSubmit" slot="footer">
            <Button @click="checkCancel('subItemObj')">取消</Button>
          </div>
      </Modal>
      <Modal
      v-model="checkContentModal"
      :title="checkContentTitle"
      width="1000"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <div class="formBox">
        <!-- <Card :bordered="false" style="margin-bottom:15px">
        <p slot="title"></p>-->
        <Row style="margin-bottom:10px">
          <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
          <span icon="ios-add" class="title">监管检查内容</span>
        </Row>
        <Form ref="checkContentObj" :model="checkContentObj" :rules="checkContentObjdate" :label-width="150">
          <Row>
            <Col span="12">
          <FormItem label="检查内容：" prop="checkContent">
              <Input
                style="width: 100%"
                v-model="checkContentObj.checkContent"
                :readonly="!isCheckContentSubmit"
                placeholder="请输入检查内容"
              />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="检查内容编码：" prop="checkContentId">
              <Input
                style="width: 100%"
                v-model="checkContentObj.checkContentId"
                :readonly="!isCheckContentSubmit"
                placeholder="请输入检查内容编码"
              />
          </FormItem>
          </Col>
          </Row>
          <FormItem label="操作要领和方法：" prop="operationEssentials">
              <Input
                style="width: 100%"
                type="textarea"
                v-model="checkContentObj.operationEssentials"
                :readonly="!isCheckContentSubmit"
                placeholder="请输入操作要领和方法"
              />
          </FormItem>
          <FormItem label="处罚依据：" prop="punishmentBasis">
              <Input
                style="width: 100%"
                type="textarea"
                v-model="checkContentObj.punishmentBasis"
                :readonly="!isCheckContentSubmit"
                placeholder="请输入处罚依据"
              />
          </FormItem>
          <FormItem label="处罚依据权力编码：" prop="punishmentBasisPowerCode">
              <Input
                style="width: 100%"
                type="textarea"
                v-model="checkContentObj.punishmentBasisPowerCode"
                :readonly="!isCheckContentSubmit"
                placeholder="请输入处罚依据权力编码"
              />
          </FormItem>
          <FormItem label="检查类型：" prop="checkType">
            <RadioGroup v-model="checkContentObj.checkType">
              <Radio :disabled="!isCheckContentSubmit" label="DAILY">日常检查</Radio>
              <Radio :disabled="!isCheckContentSubmit" label="RANDOM">随机抽查</Radio>
              <Radio :disabled="!isCheckContentSubmit" label="SPECIAL">专项</Radio>
              <Radio :disabled="!isCheckContentSubmit" label="TEMPORARY">临时</Radio>
            </RadioGroup>
          </FormItem>
          </Form>
          </div>
          <div v-show="isCheckContentSubmit" slot="footer">
            <Button @click="checkContentCancel('checkContentObj')">取消</Button>
            <Button type="primary" @click="checkContentSure('checkContentObj')" style="margin-left: 8px">确定</Button>
          </div>
          <div v-show="!isCheckContentSubmit" slot="footer">
            <Button @click="checkContentCancel('checkContentObj')">取消</Button>
          </div>
      </Modal>
  </div>
</template> 

<script>
import user from "@/store/module/user.js";
import MyUpload from '@/views/components/Upload/MyUpload.vue';
export default {
  components: {MyUpload},
  data() {
    return {
      itemObjdate: {
        dutyCode: [
          { required: true, message: "职能部门不能为空！", trigger: "change" }
        ],
        lineCode: [
          { required: true, message: "业务条线不能为空！", trigger: "change" }
        ],
        itemCode: [
          { required: true, message: "事项编码不能为空！", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "监管事项不能为空！", trigger: "blur" }
        ],
        powerItemCode: [
          {
            required: true,
            message: "监管事项对应的权力事项编码不能为空！",
            trigger: "blur"
          }
        ],
        supervisionDept: [
          { required: true, message: "监管部门不能为空！", trigger: "blur" }
        ],
        allowItemCode: [
          {
            required: true,
            message: "对应的许可事项编码不能为空！",
            trigger: "blur"
          }
        ],
        allowPowerItemCode: [
          {
            required: true,
            message: "对应的权力事项编码不能为空！",
            trigger: "blur"
          }
        ],
        itemStatus: [
          { required: true, message: "事项状态不能为空！", trigger: "change" }
        ]
      },
      subItemObjdate: {
        dutyCode: [
          { required: true, message: "职能部门不能为空！", trigger: "change" }
        ],
        lineCode: [
          { required: true, message: "业务条线不能为空！", trigger: "change" }
        ],
        subItemCode: [
          { required: true, message: "子项编码不能为空！", trigger: "blur" }
        ],
        subItemName: [
          { required: true, message: "监管子项不能为空！", trigger: "blur" }
        ],
        subItemPowerCode: [
          {
            required: true,
            message: "对应的子项权力编码不能为空！",
            trigger: "blur"
          }
        ],
        supervisionObjectType: [
          { required: true, message: "监管对象类别不能为空！", trigger: "blur" }
        ],
        supervisionForm: [
          {
            required: true,
            message: "监管形式不能为空！",
            trigger: "blur"
          }
        ],
        supervisionLevel: [
          {
            required: true,
            message: "监管层级不能为空！",
            trigger: "blur"
          }
        ],
        applyScope: [
          {
            required: true,
            message: "适用范围不能为空！",
            trigger: "change"
          }
        ],
        supervisionBasis: [
          {
            required: true,
            message: "设定依据不能为空！",
            trigger: "blur"
          }
        ],
        supervisionResult: [
          {
            required: true,
            message: "监管结果不能为空！",
            trigger: "blur"
          }
        ],
        supervisionProcess: [
          {
            required: true,
            message: "监管流程不能为空！",
            trigger: "blur"
          }
        ],
        subItemStatus: [
          { required: true, message: "子项状态不能为空！", trigger: "change" }
        ]
      },
      checkItemObjdate:{
        checkItem: [
          { required: true, message: "自定义检查项不能为空！", trigger: "blur" }
        ],
      },
      checkContentObjdate:{
        checkType: [
          { required: true, message: "检查类型不能为空！", trigger: "change" }
        ],
        checkContentId: [
          { required: true, message: "检查内容编码不能为空！", trigger: "blur" }
        ],
        checkContent: [
          { required: true, message: "检查内容不能为空！", trigger: "blur" }
        ],
        operationEssentials: [
          { required: true, message: "操作要领和方法不能为空！", trigger: "blur" }
        ],
        punishmentBasis: [
          { required: true, message: "处罚依据不能为空！", trigger: "blur" }
        ],
      },
      modal: false,
      tableModel: false,
      isItemSubmit: true,
      title: "信息填写",
      checkObjectTypeList:[],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "事项编码",
          key: "itemCode",
          align: "center",
          maxWidth: 160,
        },
        {
          title: "监管事项",
          key: "itemName",
          align: "center"
        },
        {
          title: "监管部门",
          key: "supervisionDept",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          maxWidth: 160,
        },
        {
          title: "事项状态",
          key: "itemStatus",
          align: "center",
          maxWidth: 100,
          render: (h, params) => {
            let itemStatus = params.row.itemStatus;
            switch (itemStatus) {
              case "0":
                itemStatus = "无效 ";
                break;
              case "1":
                itemStatus = "有效";
                break;
            }
            return h("span", itemStatus);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
          render: (h, params) => {
            let buttons = [];
            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.details(params.row);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "编辑"
              )
            );
            return h("div", buttons);
          }
        }
      ],
      // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          supervisionDept: "",
          itemCode: "",
          itemName: "",
          itemStatus: ""
        }
      },
      itemTitle: "新增主项",
      itemObj: {
        dutyCode: "",
        dutyName: "",
        lineCode: "",
        lineName: "",
        practDeptCode: "",
        practDeptShortName: "",
        practDeptFullName: "",
        itemCode: "",
        itemName: "",
        powerItemCode: "",
        supervisionDept: "",
        supervisionDeptCode: "",
        allowItemType: "",
        allowItemName: "",
        allowItemCode: "",
        allowPowerItemCode: "",
        itemStatus: "",
        userName: "",
        deptName: ""
      },
      itemId: "",
      subItemColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "子项编码",
          key: "subItemCode",
          align: "center"
        },
        {
          title: "监管子项",
          key: "subItemName",
          align: "center"
        },
        {
          title: "监管形式",
          key: "supervisionForm",
          align: "center"
        },
        {
          title: "监管方式",
          key: "supervisionMode",
          align: "center"
        },
        {
          title: "监管层级",
          key: "supervisionLevel",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 180,
        }
      ],
      subItemList: [],
      subItemModal: false,
      isSubItemSubmit: true,
      subItemId: "",
      subItemTitle: "新增监管子项",
      subItemObj: {
        mainId: "",
        dutyCode: "",
        dutyName: "",
        lineCode: "",
        lineName: "",
        subItemCode: "",
        subItemName: "",
        subItemType: "",
        subItemPowerCode: "",
        supervisionObjectType: "",
        supervisionObject: "",
        supervisionForm: "",
        supervisionMode: "",
        supervisionLevel: "",
        applyScope: "",
        applyScopeArr:[],
        supervisionBasis: "",
        supervisionProcess: "",
        supervisionResult: "",
        practListCode: "",
        subItemStatus: "",
        userName: "",
        deptName: ""
      },
      checkItemColumns:[
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "检查项目",
          key: "checkItem",
          align: "center"
        },
             {
          title: "操作",
          slot: "action",
          align: "center",
          width: 180,
        }
      ],
      checkItemList:[],
      checkItemObj:{
        subId:"",
        checkItem:""
      },
      checkItemModal:false,
      isCheckItemSubmit:true,
      checkItemTitle:"新增检查项",
      checkId:"",
      checkContentColumns:[
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "检查内容",
          key: "checkContent",
          align: "center"
        },
        {
          title: "操作要领和方法",
          key: "operationEssentials",
          align: "center"
        },
        {
          title: "检查类型",
          key: "checkType",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 180,
        }
      ],
      checkContentList:[],
      checkContentModal:false,
      isCheckContentSubmit:true,
      checkContentTitle:"新增检查内容",
      checkContentObj:{
        itemId:"",
        checkType:"",
        checkContentId:"",
        checkContent:"",
        operationEssentials:"",
        punishmentBasis:"",
        punishmentBasisPowerCode:"",
        spotCheck:"",
        spotCheckContent:""
      },
      checkContentId:""
    };
  },
  computed: {
    //  getFormItem() {
    //    return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    //  },
    //  defaultUserName() {
    //    return this.$store.state.user.userInfo.name;
    //  },
  },
  // 方法.事件
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.supervisionDept = "";
      this.query.wheres.itemCode = "";
      this.query.wheres.itemName = "";
      this.query.wheres.itemStatus = "";
      this.$refs.test.initSearch();
    },
    selectChange() {},
    statusChange() {
      this.initSearch();
    },
    add() {
      this.itemId = ""
      this.itemTitle = "新增监管主项"
      this.itemObj = {
        dutyCode: "",
        dutyName: "",
        lineCode: "",
        lineName: "",
        practDeptCode: "",
        practDeptShortName: "",
        practDeptFullName: "",
        itemCode: "",
        itemName: "",
        powerItemCode: "",
        supervisionDept: "",
        supervisionDeptCode: "",
        allowItemType: "",
        allowItemName: "",
        allowItemCode: "",
        allowPowerItemCode: "",
        itemStatus: "",
        userName: "",
        deptName: ""
      }
      this.subItemList = []
      this.modal = true;
      this.isItemSubmit = true;
      this.itemObj.userName = user.state.userInfo.name;
      this.itemObj.deptName = user.state.userInfo.dept.name;
    },
    details(row) {
      this.itemTitle = "监管主项详情"
      this.isItemSubmit = false
      this.getItem(row)
    },
    edit(row) {
      console.log(row);
      this.itemTitle = "修改监管主项"
      this.isItemSubmit = true
      this.getItem(row)
    },
    getItem(row){
      this.$http
        .get(`/supervision/regulation/getRegulation?id=${row.id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.modal = true;
            this.itemId = row.id;
            this.itemObj = res.data;
            this.getSubItemList();
          } else {
            this.$Message.error("请求失败！");
          }
        })
        .catch(error => {
          this.$Message.error("请求失败！");
        });
    },
    getSubItemList() {
      this.$http
        .get(`/supervision/regulation/regulationSubList?mainId=${this.itemId}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res, "res");
            this.subItemList = res.data;
          } else {
            this.subItemList = [];
          }
        })
        .catch(error => {
          this.subItemList = [];
        });
    },
    cancel(name) {
      this.modal = false;
      this.$refs[name].resetFields();
      this.itemId = "";
      this.itemObj = {
        dutyCode: "",
        dutyName: "",
        lineCode: "",
        lineName: "",
        practDeptCode: "",
        practDeptShortName: "",
        practDeptFullName: "",
        itemCode: "",
        itemName: "",
        powerItemCode: "",
        supervisionDept: "",
        supervisionDeptCode: "",
        allowItemType: "",
        allowItemName: "",
        allowItemCode: "",
        allowPowerItemCode: "",
        itemStatus: "",
        userName: "",
        deptName: ""
      };
    },
    sure(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.itemId) {
            this.$http
              .post(`/supervision/regulation/saveRegulation`, this.itemObj)
              // 返回值
              .then(res => {
                if (res.success) {
                  this.$Message.info("新增成功！");
                  this.initSearch();
                  this.itemObj = res.data
                  this.itemId = res.data.id
                  // this.cancel(name);
                } else {
                  this.$Message.info("新增成功！");
                }
              })
              .catch(error => {
                this.$Message.error("新增失败！");
              });
          } else {
            this.$http
              .put(
                `/supervision/regulation/updateRegulation?id=${this.itemId}`,
                this.itemObj
              )
              // 返回值
              .then(res => {
                if (res.success) {
                  this.$Message.info("修改成功！");
                  this.initSearch();
                  this.cancel(name);
                } else {
                  this.$Message.info("修改成功！");
                }
              })
              .catch(error => {
                this.$Message.error("修改失败！");
              });
          }
        } else {
          this.$Message.error("表单未填写完全！");
        }
      });
    },
    addSubItem() {
      this.subItemId = ""
      this.subItemTitle = "新增监管子项"
      this.subItemObj = {
        ainId: "",
        dutyCode: "",
        dutyName: "",
        lineCode: "",
        lineName: "",
        subItemCode: "",
        subItemName: "",
        subItemType: "",
        subItemPowerCode: "",
        supervisionObjectType: "",
        supervisionObject: "",
        supervisionForm: "",
        supervisionMode: "",
        supervisionLevel: "",
        applyScope: "",
        applyScopeArr:[],
        supervisionBasis: "",
        supervisionProcess: "",
        supervisionResult: "",
        practListCode: "",
        subItemStatus: "",
        userName: "",
        deptName: ""
      }
      this.subItemModal = true;
      this.isSubItemSubmit = true;
      this.subItemObj.mainId = this.itemId;
      this.subItemObj.userName = user.state.userInfo.name;
      this.subItemObj.deptName = user.state.userInfo.dept.name;
    },
    subItemDetails(row) {
      this.subItemTitle = "监管子项详情"
      this.isSubItemSubmit = false;
      this.getSubItem(row)
    },
    subItemEdit(row) {
      this.subItemTitle = "编辑监管子项"
      this.isSubItemSubmit = true;
      this.getSubItem(row)
    },
    getSubItem(row){
      this.$http
        .get(`/supervision/regulation/getRegulationSub?id=${row.id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.subItemId = row.id
            this.subItemModal = true;
            this.subItemObj = res.data;
            if(res.data.applyScope){
              this.subItemObj.applyScopeArr = res.data.applyScope.split(',')
            }else{
              this.subItemObj.applyScopeArr = []
            }
            this.getCheckItemList()
          } else {
            this.$Message.error("请求失败！");
          }
        })
        .catch(error => {
          this.$Message.error("请求失败！");
        });
    },
    SubCancel(name) {
      this.subItemModal = false;
      this.$refs[name].resetFields();
      this.subItemId = "";
      this.subItemObj = {
        mainId: "",
        dutyCode: "",
        dutyName: "",
        lineCode: "",
        lineName: "",
        subItemCode: "",
        subItemName: "",
        subItemType: "",
        subItemPowerCode: "",
        supervisionObjectType: "",
        supervisionObject: "",
        supervisionForm: "",
        supervisionMode: "",
        supervisionLevel: "",
        applyScope: "",
        supervisionBasis: "",
        supervisionProcess: "",
        supervisionResult: "",
        practListCode: "",
        subItemStatus: "",
        userName: "",
        deptName: ""
      };
    },
    SubSure(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.subItemId) {
            this.$http
              .post(
                `/supervision/regulation/saveRegulationSub`,
                this.subItemObj
              )
              // 返回值
              .then(res => {
                if (res.success) {
                  this.$Message.info("新增成功！");
                  this.getSubItemList();
                  // this.SubCancel(name);
                  this.subItemObj = res.data
                  this.subItemId = res.data.id
                } else {
                  this.$Message.info("新增成功！");
                }
              })
              .catch(error => {
                this.$Message.error("新增失败！");
              });
          } else {
            this.$http
              .put(
                `/supervision/regulation/updateRegulationSub?id=${this.subItemId}`,
                this.subItemObj
              )
              // 返回值
              .then(res => {
                if (res.success) {
                  this.$Message.info("编辑成功！");
                  this.getSubItemList();
                  this.SubCancel(name);
                } else {
                  this.$Message.info("编辑成功！");
                }
              })
              .catch(error => {
                this.$Message.error("编辑失败！");
              });
          }
        } else {
          this.$Message.error("表单未填写完全！");
        }
      });
    },
    getCheckItemList(){
      this.$http
        .get(`/supervision/regulation/regulationSubItemList?subId=${this.subItemId}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res, "res");
            this.checkItemList = res.data;
          } else {
            this.checkItemList = [];
          }
        })
        .catch(error => {
          this.checkItemList = [];
        });
    },
    addCheckItem(){
      this.checkId = ""
      this.checkItemObj = {
        subId:"",
        checkItem:""
      }
      this.checkItemTitle = "新增检查项"
      this.checkItemModal = true
      this.isCheckItemSubmit = true
      this.checkItemObj.subId = this.subItemId
    },
    checkItemDetails(row){
      this.checkItemTitle = "检查项详情"
      this.isCheckItemSubmit = false
      this.getCheckItem(row)
    },
    checkItemEdit(row){
      this.checkItemTitle = "编辑检查项"
      this.isCheckItemSubmit = true
      this.getCheckItem(row)
    },
    checkItemDel(row){
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http
            //请求路径
            .delete(`/supervision/regulation/deleteRegulationSubItem?SubItemId=${row.id}`)
            // 返回值
            .then(res => {
              if (res.success) {
                this.getCheckItemList()
                this.$Message.info("删除成功");
              }else{
                this.$Message.error("删除失败");
              }
            })
            .catch(error => {
              this.$Message.error("删除失败");
            });
        },
        onCancel: () => {}
      });
    },
    getCheckItem(row){
      this.$http
        .get(`/supervision/regulation/getRegulationSubItem?id=${row.id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.checkId = row.id
            this.checkItemModal = true
            this.checkItemObj = res.data;
            this.getCheckContentList()
          } else {
            this.$Message.error("请求失败！");
          }
        })
        .catch(error => {
          this.$Message.error("请求失败！");
        });
    },
    checkCancel(name){
      this.checkItemModal = false;
      this.$refs[name].resetFields();
      this.checkId = "";
      this.checkItemObj = {
        subId:"",
        checkItem:""
      }
    },
    checkSure(name){
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.checkId) {
            this.$http
              .post(
                `/supervision/regulation/saveRegulationSubItem`,
                this.checkItemObj
              )
              // 返回值
              .then(res => {
                if (res.success) {
                  this.$Message.info("新增成功！");
                  this.getCheckItemList();
                  // this.checkCancel(name);
                  this.checkItemObj = res.data
                  this.checkId = res.data.id
                } else {
                  this.$Message.info("新增成功！");
                }
              })
              .catch(error => {
                this.$Message.error("新增失败！");
              });
          } else {
            this.$http
              .put(
                `/supervision/regulation/updateRegulationSubItem?id=${this.checkId}`,
                this.subItemObj
              )
              // 返回值
              .then(res => {
                if (res.success) {
                  this.$Message.info("编辑成功！");
                  this.getCheckItemList();
                  this.checkCancel(name);
                } else {
                  this.$Message.info("编辑成功！");
                }
              })
              .catch(error => {
                this.$Message.error("编辑失败！");
              });
          }
        } else {
          this.$Message.error("表单未填写完全！");
        }
      });
    },
    getCheckContentList(){
      this.$http
        .get(`/supervision/regulation/regulationSubItemContentList?itemId=${this.checkId}`)
        // 返回值
        .then(res => {
          if (res.success) {
            this.checkContentList = res.data;
          } else {
            this.checkContentList = [];
          }
        })
        .catch(error => {
          this.checkContentList = [];
        });
    },
    addCheckContent(){
      this.checkContentId = ""
      this.checkContentObj = {
        itemId:"",
        checkType:"",
        checkContentId:"",
        checkContent:"",
        operationEssentials:"",
        punishmentBasis:"",
        punishmentBasisPowerCode:"",
        spotCheck:"",
        spotCheckContent:""
      }
      this.checkContentTitle = "新增检查内容"
      this.checkContentModal = true
      this.isCheckContentSubmit = true
      this.checkContentObj.itemId = this.checkId
    },
    checkContentDetails(row){
      this.checkContentTitle = "检查内容详情"
      this.isCheckContentSubmit = false
      this.getCheckContent(row)
    },
    checkContentEdit(row){
      this.checkContentTitle = "编辑检查内容"
      this.isCheckContentSubmit = true
      this.getCheckContent(row)
    },
    checkContentDel(row){
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http
            //请求路径
            .delete(`/supervision/regulation/deleteRegulationSubItemContent?id=${row.id}`)
            // 返回值
            .then(res => {
              if (res.success) {
                this.getCheckContentList()
                this.$Message.info("删除成功");
              }else{
                this.$Message.error("删除失败");
              }
            })
            .catch(error => {
              this.$Message.error("删除失败");
            });
        },
        onCancel: () => {}
      });
    },
    getCheckContent(row){
      this.$http
        .get(`/supervision/regulation/getRegulationSubItemContent?id=${row.id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.checkContentId = row.id
            this.checkContentModal = true
            this.checkContentObj = res.data;
          } else {
            this.$Message.error("请求失败！");
          }
        })
        .catch(error => {
          this.$Message.error("请求失败！");
        });
    },
    checkContentCancel(name){
      this.checkContentModal = false;
      this.checkContentId = ""
      this.$refs[name].resetFields();
      this.checkContentObj = {
        itemId:"",
        checkType:"",
        checkContentId:"",
        checkContent:"",
        operationEssentials:"",
        punishmentBasis:"",
        punishmentBasisPowerCode:"",
        spotCheck:"",
        spotCheckContent:""
      };
    },
    checkContentSure(name){
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.checkContentId) {
            this.$http
              .post(
                `/supervision/regulation/saveRegulationSubItemContent`,
                this.checkContentObj
              )
              // 返回值
              .then(res => {
                if (res.success) {
                  this.$Message.info("新增成功！");
                  this.getCheckContentList();
                  this.checkContentCancel(name);
                } else {
                  this.$Message.info("新增成功！");
                }
              })
              .catch(error => {
                this.$Message.error("新增失败！");
              });
          } else {
            this.$http
              .put(
                `/supervision/regulation/updateRegulationSubItemContent?id=${this.checkContentId}`,
                this.checkContentObj
              )
              // 返回值
              .then(res => {
                if (res.success) {
                  this.$Message.info("编辑成功！");
                  this.getCheckContentList();
                  this.checkContentCancel(name);
                } else {
                  this.$Message.info("编辑成功！");
                }
              })
              .catch(error => {
                this.$Message.error("编辑失败！");
              });
          }
        } else {
          this.$Message.error("表单未填写完全！");
        }
      });
    },
    applyScopeArrChange(data){
      this.subItemObj.applyScope = data.join(",")
    },
    importXls(response, file, fileList){
      this.$Message.info(response.msg);
    },
    handleFormatError(file, fileList){

    }
  },
  mounted() {
    //   if (!this.isEmpty(this.$route.query)) {
    //      this.initQuery();
    //  } else {
    //      this.initSearch();
    //  }
    this.initSearch();
    this.checkObjectTypeList = this.$store.getters.getDictList("regulatoryRepertory")
  }
};
</script>

<style scoped>
body,
th,
td {
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}

table.regisbg {
  border-collapse: collapse;
  margin-bottom: 10px;
}

table.regisbg th,
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}

.text-left {
  text-align: left !important;
  text-indent: 2px;
}

th.none-line,
td.none-line {
  border: none;
}

textarea {
  outline: none;
  border: none;
  width: 100%;
  resize: none;
}

input[type="checkbox" i] {
  margin: 0px !important;
}
input {
  outline: none;
  border: 0px;
  width: 65px;
  text-indent: 2px;
}
input.return_sj {
  width: 156px;
}
input.sl {
  width: 59px;
}

input.qm {
  width: 35%;
}
.mid-whole-width {
  width: 80%;
}
.whole-width {
  width: 100%;
}

caption {
  font-size: 25px;
  font-weight: 700;
}

.checkbox_cl {
  width: 15px !important;
  height: 15px !important;
  margin: 0 auto;
}
.title{
  font-size: 18px
}
</style>
