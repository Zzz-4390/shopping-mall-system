<template>
  <div class="navigation-container">
    <div class="home-page">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="首页" name="first"></el-tab-pane>
        <el-tab-pane label="消息通知" name="second"></el-tab-pane>
        <el-tab-pane label="个人中心" name="third"></el-tab-pane>
      </el-tabs>

      <!-- 搜索框 -->
      <div class="search-wrapper">
        <el-input v-model="searchInput" placeholder="请输入搜索内容" clearable>
          <template #suffix>
            <Search class="icon-search" style="width: 1em; height: 1em; margin-right: 6px" />
          </template>
        </el-input>
      </div>

      <!-- 右侧操作按钮 -->
      <div class="action-buttons">
        <el-button link class="login-btn" @click="router.push('/login')">
          <el-icon><User /></el-icon>
          登录
        </el-button>

        <el-badge :value="cartCount" class="cart-badge">
          <el-button link class="cart-btn" @click="router.push('/cart')">
            <el-icon><ShoppingCart /></el-icon>
          </el-button>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { User, ShoppingCart, Search } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router'

const searchInput = ref('')
const activeName = ref('first')
const cartCount = ref(0) // 购物车商品数量
const router = useRouter()

const handleClick = (tab: TabsPaneContext) => {
  const tabName = tab.props.name
  switch (tabName) {
    case 'first':
      console.log('首页被点击')
      router.push('/')
      break
    case 'second':
      console.log('消息通知被点击')
      router.push('/message')
      break
    case 'third':
      console.log('个人中心被点击')
      router.push('/profile')
      break
  }
}
</script>

<style scoped>
.navigation-container {
  background-color: #fdfdfd; /* 更浅的灰色背景 */
  padding: 10px 0; /* 上下留出一些间距 */
}

.home-page {
  display: flex;
  align-items: center;
  position: relative;
}

.demo-tabs {
  height: 80px;
  flex: 0 0 auto; /* 不再自动扩展 */
}

.demo-tabs :deep(.el-tabs__header) {
  height: 80px;
}

.demo-tabs :deep(.el-tabs__item) {
  letter-spacing: 2px;
  word-spacing: 4px;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
}

.demo-tabs :deep(.el-tabs__nav-scroll) {
  padding-left: 50px;
}

.demo-tabs :deep(.el-tab-pane) {
  letter-spacing: 1px;
}

/* 取消标签页下方的下划线 */
.demo-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none !important;
}

/* 搜索框容器 */
.search-wrapper {
  flex: 1; /* 占据可用空间 */
  display: flex;
  justify-content: center; /* 水平居中 */
  padding: 0 20px; /* 左右留出间距 */
  margin: 0 40px 0 20px;
}

.el-input {
  width: 600px;
  height: 44px;
}

:deep(.el-input__wrapper) {
  margin-left: 5px;
  font-size: 15px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 120px;
  box-shadow: 2 2 2 2px;
}

:deep(.el-input__inner) {
  margin-left: 10px;
}

.icon-search:hover {
  color: #409efc;
  cursor: pointer;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 30px;
  margin-right: 20px;
  flex: 0 0 auto; /* 不伸缩 */
}

.login-btn,
.cart-btn {
  font-size: 16px;
  color: #606266;
}

.login-btn:hover,
.cart-btn:hover {
  color: #409eff;
}

.cart-badge :deep(.el-badge__content) {
  top: 10px;
  right: 5px;
}
</style>
