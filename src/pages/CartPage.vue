<template>
  <div class="cart-page">
    <div class="container">
      <el-page-header title="继续购物" content="购物车" @back="goBack" class="page-header" />

      <div class="cart-content" v-if="cartItems.length > 0">
        <el-table :data="cartItems" :style="{ width: '100%' }" class="cart-table">
          <el-table-column label="商品信息">
            <template #default="scope">
              <div class="product-info">
                <el-image
                  :src="scope.row.product.image"
                  class="product-image"
                  fit="cover"
                  :preview-src-list="[scope.row.product.image]"
                  hide-on-click-modal
                />
                <div class="product-details">
                  <div class="product-name">{{ scope.row.product.name }}</div>
                  <div class="product-spec">{{ scope.row.specification }}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="product.price" label="单价" width="150">
            <template #default="scope"> ¥{{ scope.row.product.price.toFixed(2) }} </template>
          </el-table-column>

          <el-table-column label="数量" width="200">
            <template #default="scope">
              <el-input-number
                v-model="scope.row.quantity"
                :min="1"
                :max="scope.row.product.stock"
                @change="handleQuantityChange(scope.row)"
              />
            </template>
          </el-table-column>

          <el-table-column label="小计" width="150">
            <template #default="scope">
              ¥{{ (scope.row.product.price * scope.row.quantity).toFixed(2) }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button type="danger" icon="Delete" circle @click="removeItem(scope.row)" />
            </template>
          </el-table-column>
        </el-table>

        <div class="cart-footer">
          <div class="cart-summary">
            <span>共 {{ totalItems }} 件商品</span>
            <span class="total-price">总计: ¥{{ totalPrice.toFixed(2) }}</span>
          </div>
          <div class="cart-actions">
            <el-button size="large" @click="clearCart">清空购物车</el-button>
            <el-button type="primary" size="large" @click="checkout">去结算</el-button>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else>
        <el-empty description="购物车为空">
          <el-button type="primary" @click="goShopping">去逛逛</el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ElTable,
  ElTableColumn,
  ElImage,
  ElInputNumber,
  ElButton,
  ElEmpty,
  ElMessageBox,
  ElMessage,
  ElPageHeader,
} from 'element-plus'

interface Product {
  id: number
  name: string
  price: number
  image: string
  stock: number
}

interface CartItem {
  id: number
  product: Product
  specification: string
  quantity: number
}

// 模拟购物车数据
const cartItems = ref<CartItem[]>([
  {
    id: 1,
    product: {
      id: 101,
      name: '无线蓝牙耳机',
      price: 299.0,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      stock: 50,
    },
    specification: '黑色款',
    quantity: 1,
  },
  {
    id: 2,
    product: {
      id: 102,
      name: '智能手表',
      price: 1299.0,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      stock: 30,
    },
    specification: '银色 42mm',
    quantity: 1,
  },
  {
    id: 3,
    product: {
      id: 103,
      name: '移动电源',
      price: 199.0,
      image: 'https://images.unsplash.com/photo-1603002804671-603a59b0eb63?w=200&h=200&fit=crop',
      stock: 100,
    },
    specification: '20000mAh 白色',
    quantity: 2,
  },
])

const router = useRouter()

// 计算总数量
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

// 计算总价
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

// 返回上一页
const goBack = () => {
  router.go(-1)
}

// 去购物
const goShopping = () => {
  router.push('/products')
}

// 数量变化处理
const handleQuantityChange = (item: CartItem) => {
  if (item.quantity > item.product.stock) {
    ElMessage.warning('购买数量不能超过库存')
    item.quantity = item.product.stock
  }
}

// 删除商品
const removeItem = (item: CartItem) => {
  ElMessageBox.confirm(`确定要删除 ${item.product.name} 吗？`, '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const index = cartItems.value.findIndex((i) => i.id === item.id)
      if (index !== -1) {
        cartItems.value.splice(index, 1)
        ElMessage.success('删除成功')
      }
    })
    .catch(() => {
      // 用户取消删除
    })
}

// 清空购物车
const clearCart = () => {
  ElMessageBox.confirm('确定要清空购物车吗？', '确认清空', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      cartItems.value = []
      ElMessage.success('购物车已清空')
    })
    .catch(() => {
      // 用户取消清空
    })
}

// 去结算
const checkout = () => {
  ElMessageBox.alert(`即将前往结算页面，应付金额: ¥${totalPrice.value.toFixed(2)}`, '提示', {
    confirmButtonText: '确定',
    type: 'info',
  }).then(() => {
    router.push('/checkout')
  })
}
</script>

<style scoped>
.cart-page {
  padding: 20px 0;
  min-height: calc(100vh - 120px);
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.cart-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.cart-table :deep(.el-table__row) {
  height: 120px;
}

.product-info {
  display: flex;
  align-items: center;
  height: 100%;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  margin-right: 15px;
  border: 1px solid #eee;
}

.product-details {
  flex: 1;
}

.product-name {
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
}

.product-spec {
  font-size: 12px;
  color: #999;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-top: 1px solid #eee;
  background-color: #fafafa;
}

.cart-summary {
  font-size: 16px;
  color: #666;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
  color: #ff6600;
  margin-left: 20px;
}

.cart-actions {
  display: flex;
  gap: 15px;
}

.empty-cart {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 50px 0;
}

@media (max-width: 768px) {
  .cart-footer {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .cart-summary {
    order: 2;
  }

  .cart-actions {
    order: 1;
    width: 100%;
    justify-content: center;
  }

  .cart-table :deep(.el-table__row) {
    height: auto;
    padding: 15px 0;
  }
}
</style>
