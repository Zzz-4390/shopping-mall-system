<!-- src/components/ProductCard.vue -->
<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.photo || defaultImage" :alt="product.title" @error="handleImageError" />
    </div>

    <div class="product-info">
      <h3 class="product-name">{{ product.title }}</h3>

      <div class="product-price">
        <span class="current-price">¥{{ product.price }}</span>
      </div>

      <div class="product-description">
        {{ product.content }}
      </div>

      <div class="product-category" v-if="product.category">
        <span class="category">分类: {{ product.category }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import type { Product } from '@/types/product'

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
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-color: #ff0000;
  outline: 1px solid #ff0000;
  outline-offset: -1px;
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

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: #999;
}

.category {
  background-color: #f0f2f5;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
