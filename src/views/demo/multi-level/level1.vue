<template>
  <div style="padding: 30px">
    <el-link href="https://www.baidu.com/vue3-bashItem-f/" type="primary" target="_blank" class="mb-10">示例源码
      请点击>>>></el-link>

    <el-alert :closable="false" title="菜单一级">
      <router-view />
    </el-alert>
  </div>
</template>
