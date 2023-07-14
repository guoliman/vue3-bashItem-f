<!--字典类型-->
<script setup lang="ts">
import { getDictTypePage, getDictTypeForm, addDictType, updateDictType, deleteDictTypes, } from "@/api/dict";
import DictData from "@/views/system/dict/DictData.vue";
import { DelId, DictTypePageVO, DictTypeQuery, DictTypeForm } from "@/api/dict/types";

defineOptions({
  name: "DictType",
  inheritAttrs: false,
});

const queryFormRef = ref(ElForm);
const dataFormRef = ref(ElForm);

const loading = ref(false);
const ids = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<DictTypeQuery>({
  pageNum: 1,
  pageSize: 10,
  order: "id desc",
});

const delId = reactive<DelId>({
  id:"",
});

const dictTypeList = ref<DictTypePageVO[]>();

const dialog = reactive<DialogOption>({
  visible: false,
});

let formData = reactive<DictTypeForm>({
  status: 1,
});

const rules = reactive({
  name: [{ required: true, message: "请输入字典类型名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入字典类型编码", trigger: "blur" }],
});

/**
 * 查询
 */
function handleQuery() {
  loading.value = true;
  getDictTypePage(queryParams)
    .then(({ data }) => {
      dictTypeList.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/**
 * 重置查询
 */
function resetQuery() {
  queryFormRef.value.resetFields();  // 表单清空
  queryParams.pageNum = 1;
  handleQuery();
}

/**
 * 行checkbox change事件
 */
function handleSelectionChange(selection: any) {
  ids.value = selection.map((item: any) => item.id);
}

/**
 * 打开字典类型表单弹窗
 *
 * @param dicTypeId 字典类型ID
 */
function openDialog(row?: DictTypeForm) {
  dialog.visible = true;
  if (row) {
    dialog.title = "修改字典类型";
    Object.assign(formData, row);  // 把row赋值给formData
  } else {
    dialog.title = "新增字典类型";
  }
}

/**
 * 字典类型表单提交
 */
function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      loading.value = false;
      const dictTypeId = formData.id;
      if (dictTypeId) {
        // updateDictType(dictTypeId, formData)
        updateDictType(formData)
          .then(() => {
            ElMessage.success("修改成功");
            closeDialog();
            handleQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        addDictType(formData)
          .then(() => {
            ElMessage.success("新增成功");
            closeDialog();
            handleQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/**
 * 重置表单
 */
function resetForm() {
  dataFormRef.value.resetFields();     // 表单清空
  dataFormRef.value.clearValidate();   // 表单验证清空

  // 这样写 只需要改赋值的 不用全部定义
  formData = reactive<DictTypeForm>({
    status: 1,
  });
}

/**
 * 删除字典类型
 */
function handleDelete(dictTypeId?: number) {
  delId.id = ""
  delId.id = [dictTypeId || ids.value].join(",");

  if (!delId.id) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteDictTypes(delId).then(() => {
      ElMessage.success("删除成功");
      resetQuery();
    });
  });
}

const dictDataDialog = reactive<DialogOption>({
  visible: false,
});

// 当前选中的字典类型
const selectedDictType = reactive({ type_code: "", typeName: "" });

/**
 * 打开字典弹窗
 */
function openDictDialog(row: DictTypePageVO) {
  dictDataDialog.visible = true;
  dictDataDialog.title = "【" + row.name + "】字典数据";

  selectedDictType.type_code = row.code;
  selectedDictType.typeName = row.name;
}

/**
 * 关闭字典弹窗
 */
function closeDictDialog() {
  dictDataDialog.visible = false;
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">

    <!--搜索框-->
    <div class="search">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="name">
          <el-input v-model="queryParams.name" placeholder="字典类型名称" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button v-hasPerm="['sys:dict_type:get']" type="primary" @click="handleQuery()"><i-ep-search />搜索</el-button>
          <el-button @click="resetQuery()"><i-ep-refresh />重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <!--新增、删除-->
      <template #header>
        <el-button v-hasPerm="['sys:dict_type:add']" type="success" @click="openDialog()"><i-ep-plus />新增</el-button>
        <el-button v-hasPerm="['sys:dict_type:delete']" type="danger" :disabled="ids.length === 0" @click="handleDelete()"><i-ep-delete />删除</el-button>
      </template>
      <!--表格渲染-->
      <el-table v-loading="loading" highlight-current-row :data="dictTypeList" border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="字典类型名称" prop="name" />
        <el-table-column label="字典类型编码" prop="code" />
        <el-table-column label="状态" align="center" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" align="center" />
        <el-table-column label="更新时间" prop="update_time" width="160"/>
        <el-table-column fixed="right" label="操作" align="center" width="220">
          <template #default="scope">
            <el-button v-hasPerm="['sys:dict:get']" type="primary" link size="small"
              @click.stop="openDictDialog(scope.row)"><i-ep-Collection />字典数据</el-button>
            <el-button v-hasPerm="['sys:dict_type:edit']" type="primary" link size="small"
              @click.stop="openDialog(scope.row)"><i-ep-edit />编辑</el-button>
            <el-button v-hasPerm="['sys:dict_type:delete']" type="primary" link size="small"
              @click.stop="handleDelete(scope.row.id)"><i-ep-delete />删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
    </el-card>

    <!--字典组的遮罩层-->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" @close="closeDialog">
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典编码" prop="code">
          <el-input v-model="formData.code" placeholder="请输入字典编码" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="字典类型备注"
            :autosize="{ minRows: 2, maxRows: 4 }" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!--字典子级的数据弹窗 调用了DictData.vue模板 dict-data就是DictData  -->
    <el-dialog v-model="dictDataDialog.visible" :title="dictDataDialog.title" width="1000px" @close="closeDictDialog">
      <dict-data v-model:type_code="selectedDictType.type_code" v-model:typeName="selectedDictType.typeName" />
    </el-dialog>
  </div>
</template>
