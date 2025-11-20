<!-- src/components/ProductCard.vue -->
<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image || defaultImage" :alt="product.name" @error="handleImageError" />
    </div>

    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>

      <div class="product-price">
        <span class="current-price">¥{{ product.price }}</span>
        <span v-if="product.originalPrice" class="original-price"
          >¥{{ product.originalPrice }}</span
        >
      </div>

      <div v-if="product.description" class="product-description">
        {{ product.description }}
      </div>

      <div class="product-meta" v-if="product.brand || product.category">
        <span v-if="product.brand" class="brand">品牌: {{ product.brand }}</span>
        <span v-if="product.category" class="category">分类: {{ product.category }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

// 定义商品信息接口
interface Product {
  id: number | string
  name: string
  price: number
  originalPrice?: number
  image?: string
  description?: string
  brand?: string
  category?: string
}

// 定义组件属性
interface Props {
  product: Product
  defaultImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultImage: 'https://via.placeholder.com/300x300?text=商品图片',
})

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const imgElement = event.target as HTMLImageElement
  imgElement.src = props.defaultImage
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff;
  position: relative;
}

.product-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-color: #ff0000;
  outline: 2px solid #ff0000;
  outline-offset: -2px;
}

.product-image {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f5f7fa;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 16px;
}

.product-name {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  margin-bottom: 10px;
}

.current-price {
  font-size: 18px;
  font-weight: bold;
  color: #ff4444;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: #999;
}

.brand,
.category {
  background-color: #f0f2f5;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
