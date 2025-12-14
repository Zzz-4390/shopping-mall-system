<template>
  <div class="payment-page">
    <div class="payment-container">
      <el-page-header title="返回" content="订单支付" @back="goBack" />

      <div class="payment-card">
        <h2>确认订单信息</h2>

        <div class="order-summary">
          <div class="order-item" v-if="productInfo">
            <div class="item-image">
              <img :src="productInfo.photo" :alt="productInfo.title" />
            </div>
            <div class="item-details">
              <div class="item-name">{{ productInfo.title }}</div>
              <div class="item-price">¥{{ productInfo.price }} × {{ quantity }}</div>
            </div>
            <div class="item-total">¥{{ (productInfo.price * quantity).toFixed(2) }}</div>
          </div>
        </div>

        <div class="order-total">
          <div class="total-label">应付总额:</div>
          <div class="total-amount" v-if="productInfo">
            ¥{{ (productInfo.price * quantity).toFixed(2) }}
          </div>
        </div>

        <div class="payment-methods">
          <h3>支付方式</h3>
          <el-radio-group v-model="paymentMethod">
            <el-radio label="balance" border>账户余额</el-radio>
            <el-radio label="credit" border disabled>信用卡(暂未开通)</el-radio>
            <el-radio label="alipay" border disabled>支付宝(暂未开通)</el-radio>
            <el-radio label="wechat" border disabled>微信支付(暂未开通)</el-radio>
          </el-radio-group>

          <div class="account-info" v-if="paymentMethod === 'balance'">
            <div class="balance-info">
              <span>账户余额：</span>
              <span class="balance-amount">∞ (无限余额)</span>
            </div>
          </div>
        </div>

        <div class="payment-actions">
          <el-button
            type="primary"
            size="large"
            @click="handlePayment"
            :loading="isPaying"
            :disabled="!productInfo"
          >
            确认支付
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getProductById } from '@/apis/product'

interface Product {
  productid: string
  sellerid: string
  title: string
  content: string
  price: number
  photo: string
  status: string
  publishtime: string
  category: string
}

// 路由实例
const route = useRoute()
const router = useRouter()

// 支付状态
const isPaying = ref(false)

// 支付方式
const paymentMethod = ref('balance')

// 商品数量
const quantity = ref(Number(route.params.quantity) || 1)

// 商品信息
const productInfo = ref<Product | null>(null)

// 返回上一页
const goBack = () => {
  router.go(-1)
}

// 获取商品信息
const fetchProductInfo = async () => {
  console.log(quantity)
  try {
    const productId = route.params.productid as string
    if (productId) {
      const res = await getProductById(productId)
      productInfo.value = res.data.data
    }
  } catch (error) {
    ElMessage.error('获取商品信息失败')
    console.error(error)
  }
}

// 处理支付
const handlePayment = () => {
  if (paymentMethod.value !== 'balance') {
    ElMessage.warning('目前仅支持账户余额支付')
    return
  }

  if (!productInfo.value) {
    ElMessage.warning('商品信息加载中，请稍候...')
    return
  }

  isPaying.value = true

  // 模拟支付过程
  setTimeout(() => {
    isPaying.value = false
    ElMessage.success('支付成功！')
    // 跳转到支付成功页面，携带订单信息
    router.push({
      path: '/payment-success',
      query: {
        sellerid: route.params.sellerid,
        productid: route.params.productid,
        quantity: route.params.quantity,
      },
    })
  }, 1200)
}

// 页面加载时获取商品信息
onMounted(() => {
  fetchProductInfo()
})
</script>

<style scoped>
.payment-page {
  background-color: #f5f5f5;
  min-height: calc(100vh - 60px);
  padding: 20px 0;
}

.payment-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.payment-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.order-summary {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.item-price {
  color: #999;
  font-size: 14px;
}

.item-total {
  font-weight: 500;
  color: #ff0036;
}

.order-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid #eee;
  margin-top: 10px;
}

.total-label {
  font-size: 16px;
  margin-right: 15px;
}

.total-amount {
  font-size: 24px;
  font-weight: bold;
  color: #ff0036;
}

.payment-methods {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 20px;
}

.payment-methods h3 {
  margin-bottom: 15px;
}

.account-info {
  margin-top: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.balance-info {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.balance-amount {
  font-weight: bold;
  color: #67c23a;
  margin-left: 10px;
}

.payment-actions {
  text-align: center;
  margin-top: 30px;
}

.payment-actions .el-button {
  width: 200px;
}
</style>
