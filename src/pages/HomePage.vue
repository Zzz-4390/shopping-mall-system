<template>
  <LayoutHead></LayoutHead>
  <div class="main-container">
    <!-- 左侧分类区 -->
    <div class="category-section section">
      <h3 class="category-title">商品分类</h3>
      <ul class="category-list">
        <li
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          @click="router.push('/product/' + category.id)"
        >
          <el-icon class="category-icon"><component :is="category.icon"></component></el-icon>
          <span class="category-name">{{ category.name }}</span>
        </li>
      </ul>
    </div>

    <!-- 中间轮播图 -->
    <div class="carousel-wrapper section">
      <el-carousel
        height="350px"
        class="carousel rounded-carousel"
        :interval="1800"
        @mouseenter="handleCarouselHover(true)"
        @mouseleave="handleCarouselHover(false)"
        :class="{ 'carousel-hover': isCarouselHovered }"
      >
        <el-carousel-item v-for="(slide, index) in carouselSlides" :key="index">
          <img
            :src="slide.image"
            class="carousel-image"
            @click="router.push('/product/' + slide.id)"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 右侧推荐区 -->
    <div class="category-section section">
      <h3 class="category-title">推荐活动</h3>
      <ul class="category-list">
        <li
          v-for="promo in promotions"
          :key="promo.id"
          class="category-item"
          @click="router.push('/product/' + promo.id)"
        >
          <el-icon class="category-icon"
            ><component :is="promo.icon || 'Star'"></component
          ></el-icon>
          <span class="category-name">{{ promo.title }}</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- 推荐区 -->
  <div class="home-page">
    <div class="container">
      <h1 class="page-title">为你推荐</h1>

      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="product-item"
        />
      </div>
    </div>
  </div>

  <!-- 底部信息区 -->
  <div class="footer">
    <div class="footer-content">
      <!-- 服务条款 -->
      <div class="footer-section">
        <h3 class="footer-title">购物指南</h3>
        <ul class="footer-links">
          <li><a href="#">购物流程</a></li>
          <li><a href="#">会员介绍</a></li>
          <li><a href="#">生活旅行</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">联系客服</a></li>
        </ul>
      </div>

      <!-- 配送方式 -->
      <div class="footer-section">
        <h3 class="footer-title">配送方式</h3>
        <ul class="footer-links">
          <li><a href="#">上门自提</a></li>
          <li><a href="#">211限时达</a></li>
          <li><a href="#">配送服务查询</a></li>
          <li><a href="#">配送费收取标准</a></li>
          <li><a href="#">海外配送</a></li>
        </ul>
      </div>

      <!-- 支付方式 -->
      <div class="footer-section">
        <h3 class="footer-title">支付方式</h3>
        <ul class="footer-links">
          <li><a href="#">货到付款</a></li>
          <li><a href="#">在线支付</a></li>
          <li><a href="#">分期付款</a></li>
          <li><a href="#">邮局汇款</a></li>
          <li><a href="#">公司转账</a></li>
        </ul>
      </div>

      <!-- 售后服务 -->
      <div class="footer-section">
        <h3 class="footer-title">售后服务</h3>
        <ul class="footer-links">
          <li><a href="#">售后政策</a></li>
          <li><a href="#">价格保护</a></li>
          <li><a href="#">退款说明</a></li>
          <li><a href="#">返修/退换货</a></li>
          <li><a href="#">取消订单</a></li>
        </ul>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="copyright">
      <p class="copyright-text">
        Copyright © 2023 商城系统 版权所有 |
        <a href="#">关于我们</a> | <a href="#">联系我们</a> | <a href="#">人才招聘</a> |
        <a href="#">商家入驻</a> | <a href="#">广告服务</a> | <a href="#">手机商城</a> |
        <a href="#">友情链接</a>
      </p>
      <p class="record-info">
        增值电信业务经营许可证：京B2-xxxxxxx | 网络文化经营许可证：京网文[2023]xxxx-xxx号 |
        违法和不良信息举报电话：400-xxx-xxxx
      </p>
      <p class="record-info">
        京公网安备 xxxxxxxxxxxxx号 |
        <a href="#">京ICP证xxxxxx号</a> | <a href="#">出版物经营许可证</a> | 营业执照
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutHead from '@/pages/LayoutHead.vue'
import ProductCard from '@/components/ProductCard.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()
const isCarouselHovered = ref(false)

// 模拟商品数据 (24个商品)
const products = ref<Product[]>([
  {
    id: 1,
    name: '无线蓝牙耳机',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    description: '高品质无线蓝牙耳机，降噪功能，音质清晰',
    brand: 'Brand A',
    category: '电子产品',
  },
  {
    id: 2,
    name: '智能手表',
    price: 599.99,
    originalPrice: 799.99,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    description: '多功能智能手表，健康监测，运动追踪',
    brand: 'Brand B',
    category: '智能设备',
  },
  {
    id: 3,
    name: '休闲运动鞋',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    description: '舒适透气运动鞋，适合日常穿着和运动',
    brand: 'Brand C',
    category: '鞋类',
  },
  {
    id: 4,
    name: '笔记本电脑',
    price: 5999.99,
    originalPrice: 6999.99,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    description: '轻薄便携笔记本，高性能处理器',
    brand: 'Brand D',
    category: '电脑数码',
  },
  {
    id: 5,
    name: '咖啡机',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    description: '全自动咖啡机，多种口味选择',
    brand: 'Brand E',
    category: '家用电器',
  },
  {
    id: 6,
    name: '护肤品套装',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    description: '深层清洁护肤套装，适合各种肌肤',
    brand: 'Brand F',
    category: '美妆护肤',
  },
  {
    id: 7,
    name: '无线充电器',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    description: '支持快充的无线充电板，兼容多种设备',
    brand: 'Brand G',
    category: '电子产品',
  },
  {
    id: 8,
    name: '机械键盘',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    description: 'RGB背光机械键盘，青轴手感',
    brand: 'Brand H',
    category: '电脑配件',
  },
  {
    id: 9,
    name: '运动水壶',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    description: '不锈钢保温运动水壶，保冷保热',
    brand: 'Brand I',
    category: '运动户外',
  },
  {
    id: 10,
    name: '蓝牙音箱',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    description: '360度环绕音效，防水设计',
    brand: 'Brand J',
    category: '音响设备',
  },
  {
    id: 11,
    name: '电动牙刷',
    price: 199.99,
    originalPrice: 259.99,
    image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    description: '声波震动电动牙刷，多种清洁模式',
    brand: 'Brand K',
    category: '个人护理',
  },
  {
    id: 12,
    name: '移动电源',
    price: 129.99,
    originalPrice: 169.99,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    description: '20000mAh大容量，支持快充',
    brand: 'Brand L',
    category: '手机配件',
  },
  {
    id: 13,
    name: '羽绒服',
    price: 499.99,
    originalPrice: 699.99,
    image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    description: '冬季保暖羽绒服，轻薄舒适',
    brand: 'Brand M',
    category: '服装',
  },
  {
    id: 14,
    name: '游戏手柄',
    price: 249.99,
    originalPrice: 299.99,
    image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    description: '无线游戏手柄，人体工学设计',
    brand: 'Brand N',
    category: '游戏设备',
  },
  {
    id: 15,
    name: '高清摄像头',
    price: 349.99,
    originalPrice: 399.99,
    image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    description: '4K超清摄像头，适用于视频会议',
    brand: 'Brand O',
    category: '电脑配件',
  },
  {
    id: 16,
    name: '瑜伽垫',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    description: '防滑加厚瑜伽垫，环保材质',
    brand: 'Brand P',
    category: '运动健身',
  },
  {
    id: 17,
    name: '空气加湿器',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    description: '静音加湿器，大容量水箱',
    brand: 'Brand Q',
    category: '家用电器',
  },
  {
    id: 18,
    name: '防晒霜',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    description: 'SPF50+高倍防晒，清爽不油腻',
    brand: 'Brand R',
    category: '美妆护肤',
  },
  {
    id: 19,
    name: '智能门锁',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    description: '指纹识别智能门锁，安全便捷',
    brand: 'Brand S',
    category: '智能家居',
  },
  {
    id: 20,
    name: '登山背包',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    description: '大容量登山背包，防水耐磨',
    brand: 'Brand T',
    category: '户外装备',
  },
  {
    id: 21,
    name: '无线鼠标',
    price: 69.99,
    originalPrice: 99.99,
    image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    description: '人体工学无线鼠标，静音按键',
    brand: 'Brand U',
    category: '电脑配件',
  },
  {
    id: 22,
    name: '保温饭盒',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    description: '长效保温饭盒，便携设计',
    brand: 'Brand V',
    category: '生活用品',
  },
  {
    id: 23,
    name: '台式电脑主机',
    price: 4999.99,
    originalPrice: 5999.99,
    image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    description: '高性能游戏主机，RTX显卡',
    brand: 'Brand W',
    category: '电脑数码',
  },
  {
    id: 24,
    name: '智能体重秤',
    price: 99.99,
    originalPrice: 129.99,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    description: '体脂测量智能体重秤，连接手机APP',
    brand: 'Brand X',
    category: '健康监测',
  },
])

// 处理轮播图悬停事件
const handleCarouselHover = (hovered: boolean) => {
  isCarouselHovered.value = hovered
}

// 商品分类数据
const categories = ref([
  { id: 1, name: '电子产品', icon: 'Monitor' },
  { id: 2, name: '服装鞋帽', icon: 'Handbag' },
  { id: 3, name: '家居用品', icon: 'House' },
  { id: 4, name: '运动户外', icon: 'Bicycle' },
])

// 轮播图数据
const carouselSlides = ref([
  {
    id: 1,
    image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  },
  {
    id: 2,
    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  },
  {
    id: 3,
    image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  },
  {
    id: 4,
    image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  },
])

// 推荐活动数据
const promotions = ref([
  {
    id: 1,
    title: '限时特惠',
    icon: 'Discount',
  },
  {
    id: 2,
    title: '新品上市',
    icon: 'Goods',
  },
  {
    id: 3,
    title: '热销榜单',
    icon: 'TrendCharts',
  },
  {
    id: 4,
    title: '会员专享',
    icon: 'User',
  },
])
</script>

<style scoped>
.main-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  margin: 10px 30px;
  height: 350px;
}

.section {
  height: 350px;
  display: flex;
  flex-direction: column;
}

/* 分类区域样式 */
.category-section {
  flex: 0 0 calc(20% - 10px);
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.category-title {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.category-item {
  padding: 10px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 6px;
  margin: 0 5px 0 0;
  margin-bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  transform: scale(1);
  transform-origin: left center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.category-item:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.category-icon {
  font-size: 18px;
  margin-right: 10px;
  color: #409eff;
  width: 24px;
  text-align: center;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  letter-spacing: 0.5px;
}

/* 中间轮播图区 */
.carousel-wrapper {
  flex: 0 0 60%;
  cursor: pointer;
}

.rounded-carousel {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.carousel-hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.carousel-hover .carousel-image {
  transform: scale(1.05);
}

/* 为你推荐区域 */
.home-page {
  padding: 20px 0;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* 在大屏幕设备上确保每行最多显示6个 */
@media (min-width: 1400px) {
  .products-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .container {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 24px;
  }
}

/* 底部区域 */
/* 底部信息区样式 */
.footer {
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
}

.footer-section {
  flex: 1;
  padding: 0 15px;
}

.footer-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #e1251b;
}

.copyright {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.copyright-text,
.record-info {
  margin: 5px 0;
  font-size: 12px;
  color: #666;
  line-height: 1.6;
}

.copyright-text a,
.record-info a {
  color: #666;
  text-decoration: none;
  margin: 0 5px;
}

.copyright-text a:hover,
.record-info a:hover {
  color: #e1251b;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin-bottom: 20px;
  }

  .copyright-text,
  .record-info {
    font-size: 10px;
  }
}
</style>
