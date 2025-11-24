<template>
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
        trigger="click"
        class="carousel rounded-carousel"
        :interval="1500"
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
          <div class="home-ad-banner-item-content-container" style="color: rgb(250, 255, 255)">
            <div class="home-ad-banner-item-title-top">{{ slide.description?.[0] }}</div>
            <div class="home-ad-banner-item-title-middle">{{ slide.description?.[1] }}</div>
            <div class="home-ad-banner-item-subtitle">{{ slide.description?.[2] }}</div>
          </div>
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
      <div class="recommend-header">
        <el-icon class="recommend-icon"><Star /></el-icon>
        <h1 class="page-title">为你推荐</h1>
      </div>

      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.productid"
          :product="product"
          class="product-item"
          @click="router.push('/product/' + product.productid)"
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
import ProductCard from '@/components/ProductCard.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types'

const router = useRouter()
const isCarouselHovered = ref(false)

// 模拟商品数据 (24个商品)
const products = ref<Product[]>([
  {
    productid: '1',
    sellerid: 'seller_001',
    title: '无线蓝牙耳机',
    content: '高品质真无线蓝牙耳机，支持主动降噪，续航时间长达24小时，音质清晰。',
    price: 299.99,
    photo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: 'published',
    publishtime: '2023-05-15T10:30:00Z',
    category: '电子产品',
  },
  {
    productid: '2',
    sellerid: 'seller_002',
    title: '智能手表',
    content: '多功能智能手表，支持心率监测、运动追踪、消息提醒等功能，1.3英寸彩色显示屏。',
    price: 599.0,
    photo: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    status: 'published',
    publishtime: '2023-06-20T14:15:00Z',
    category: '智能设备',
  },
  {
    productid: '3',
    sellerid: 'seller_003',
    title: '休闲运动鞋',
    content: '轻便舒适的休闲运动鞋，透气网面设计，防滑橡胶底，适合日常穿着和轻度运动。',
    price: 199.99,
    photo: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    status: 'published',
    publishtime: '2023-04-10T09:45:00Z',
    category: '鞋类',
  },
  {
    productid: '4',
    sellerid: 'seller_004',
    title: '轻薄笔记本电脑',
    content: '轻薄便携笔记本电脑，搭载最新处理器，14英寸高清屏幕，适合办公和学习。',
    price: 4999.99,
    photo: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    status: 'published',
    publishtime: '2023-07-01T11:20:00Z',
    category: '电脑数码',
  },
  {
    productid: '5',
    sellerid: 'seller_005',
    title: '全自动咖啡机',
    content: '一键式全自动咖啡机，支持多种咖啡制作方式，15Bar高压萃取，保证浓郁口感。',
    price: 899.0,
    photo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: 'published',
    publishtime: '2023-03-22T16:40:00Z',
    category: '家用电器',
  },
  {
    productid: '6',
    sellerid: 'seller_006',
    title: '深层清洁护肤套装',
    content: '三步曲深层清洁护肤套装，包括洁面乳、爽肤水和保湿霜，适合各种肌肤类型。',
    price: 189.99,
    photo: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    status: 'published',
    publishtime: '2023-05-30T13:10:00Z',
    category: '美妆护肤',
  },
  {
    productid: '7',
    sellerid: 'seller_007',
    title: '无线充电板',
    content: '支持快充的无线充电板，兼容Qi标准，可同时为手机和手表充电。',
    price: 129.99,
    photo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: 'published',
    publishtime: '2023-06-05T08:50:00Z',
    category: '电子产品',
  },
  {
    productid: '8',
    sellerid: 'seller_008',
    title: '机械键盘',
    content: 'RGB背光机械键盘，青轴设计，87键紧凑布局，专为游戏玩家打造。',
    price: 349.99,
    photo: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    status: 'published',
    publishtime: '2023-04-18T15:25:00Z',
    category: '电脑配件',
  },
  {
    productid: '9',
    sellerid: 'seller_009',
    title: '不锈钢保温水壶',
    content: '500ml不锈钢真空保温水壶，保冷保热可达12小时，轻巧便携。',
    price: 79.99,
    photo: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    status: 'published',
    publishtime: '2023-07-12T10:05:00Z',
    category: '生活用品',
  },
  {
    productid: '10',
    sellerid: 'seller_010',
    title: '蓝牙音箱',
    content: '360度环绕音效蓝牙音箱，IPX7防水等级，续航时间长达15小时。',
    price: 199.0,
    photo: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    status: 'published',
    publishtime: '2023-03-28T12:30:00Z',
    category: '音响设备',
  },
  {
    productid: '11',
    sellerid: 'seller_011',
    title: '声波电动牙刷',
    content: '声波震动电动牙刷，每分钟40000次震动，5种清洁模式，IPX7防水。',
    price: 159.99,
    photo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: 'published',
    publishtime: '2023-06-14T14:50:00Z',
    category: '个人护理',
  },
  {
    productid: '12',
    sellerid: 'seller_012',
    title: '20000mAh移动电源',
    content: '大容量移动电源，支持双向快充，配备多个输出接口，智能安全保护。',
    price: 129.0,
    photo: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    status: 'published',
    publishtime: '2023-05-08T11:15:00Z',
    category: '手机配件',
  },
  {
    productid: '13',
    sellerid: 'seller_013',
    title: '轻薄羽绒服',
    content: '冬季保暖羽绒服，含绒量90%，轻薄设计，时尚百搭款式。',
    price: 399.99,
    photo: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    status: 'published',
    publishtime: '2023-07-03T09:20:00Z',
    category: '服装',
  },
  {
    productid: '14',
    sellerid: 'seller_014',
    title: '无线游戏手柄',
    content: '人体工学无线游戏手柄，支持多平台连接，6小时续航，震动反馈。',
    price: 249.99,
    photo: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    status: 'published',
    publishtime: '2023-04-25T13:40:00Z',
    category: '游戏设备',
  },
  {
    productid: '15',
    sellerid: 'seller_015',
    title: '4K高清摄像头',
    content: 'USB接口4K超清摄像头，适用于视频会议、直播和在线教学。',
    price: 299.99,
    photo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: 'published',
    publishtime: '2023-06-30T10:10:00Z',
    category: '电脑配件',
  },
  {
    productid: '16',
    sellerid: 'seller_016',
    title: '专业瑜伽垫',
    content: '防滑加厚瑜伽垫，环保天然橡胶材质，提供优秀的缓冲和抓地力。',
    price: 89.99,
    photo: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    status: 'published',
    publishtime: '2023-05-18T15:30:00Z',
    category: '运动健身',
  },
  {
    productid: '17',
    sellerid: 'seller_017',
    title: '智能空气加湿器',
    content: '静音超声波加湿器，大容量水箱，支持定时功能和缺水保护。',
    price: 159.99,
    photo: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    status: 'published',
    publishtime: '2023-07-08T12:20:00Z',
    category: '家用电器',
  },
  {
    productid: '18',
    sellerid: 'seller_018',
    title: '高倍数防晒霜',
    content: 'SPF50+ PA++++高倍防晒霜，清爽不油腻，防水防汗，适合户外活动。',
    price: 89.0,
    photo: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    status: 'published',
    publishtime: '2023-06-12T09:45:00Z',
    category: '美妆护肤',
  },
  {
    productid: '19',
    sellerid: 'seller_019',
    title: '指纹识别智能门锁',
    content: '多种开锁方式的智能门锁，指纹、密码、钥匙三重保障，安全便捷。',
    price: 899.0,
    photo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: 'published',
    publishtime: '2023-04-05T14:15:00Z',
    category: '智能家居',
  },
  {
    productid: '20',
    sellerid: 'seller_020',
    title: '户外登山背包',
    content: '专业登山背包，60L大容量，防水耐磨材料，人体工学背负系统。',
    price: 299.99,
    photo: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    status: 'published',
    publishtime: '2023-05-22T11:35:00Z',
    category: '户外装备',
  },
  {
    productid: '21',
    sellerid: 'seller_021',
    title: '人体工学无线鼠标',
    content: '符合人体工学设计的无线鼠标，静音按键，DPI可调，适合长时间办公。',
    price: 69.99,
    photo: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    status: 'published',
    publishtime: '2023-06-28T16:50:00Z',
    category: '电脑配件',
  },
  {
    productid: '22',
    sellerid: 'seller_022',
    title: '长效保温饭盒',
    content: '304不锈钢内胆保温饭盒，长效保温保冷，便携设计，适合上班族。',
    price: 129.0,
    photo: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    status: 'published',
    publishtime: '2023-04-14T10:25:00Z',
    category: '生活用品',
  },
  {
    productid: '23',
    sellerid: 'seller_023',
    title: '高性能台式主机',
    content: 'RTX显卡高性能游戏主机，i7处理器，16GB内存，1TB固态硬盘。',
    price: 4999.0,
    photo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    status: 'published',
    publishtime: '2023-07-15T13:40:00Z',
    category: '电脑数码',
  },
  {
    productid: '24',
    sellerid: 'seller_024',
    title: '体脂测量智能体重秤',
    content: '高精度体脂测量体重秤，连接手机APP，记录健康数据变化趋势。',
    price: 99.99,
    photo: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    status: 'published',
    publishtime: '2023-05-30T08:55:00Z',
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
    image: 'https://storage.360buyimg.com/component-libray/images/pc/pc_banner_home_appliances.png',
    description: ['智享生活焕新季', '家电狂欢省到底', '爆品直降 限时抢购'],
  },
  {
    id: 2,
    image: 'https://storage.360buyimg.com/component-libray/images/pc/pc_banner_cell_phone.png',
    description: ['手机焕新季', '正品旗舰放心购', '官方正品 限时直降'],
  },
  {
    id: 3,
    image: 'https://storage.360buyimg.com/component-libray/images/pc/pc_banner_trendy_clothing.png',
    description: ['潮流穿搭新势力', '解锁时尚新趋势', '潮服好价 新品折扣'],
  },
  {
    id: 4,
    image:
      'https://storage.360buyimg.com/component-libray/images/pc/pc_banner_digital_equipment.png',
    description: ['潮玩黑科技', '数码3C狂欢盛典', '官方正品 即刻开抢'],
  },
  {
    id: 5,
    image: 'https://storage.360buyimg.com/component-libray/images/pc/pc_banner_home_decoration.png',
    description: ['大牌家具家装', '点缀品质生活', '正品直降 省钱省心'],
  },
  {
    id: 6,
    image: 'https://storage.360buyimg.com/component-libray/images/pc/pc_banner_snacks.png',
    description: ['办公轻补给', '宅家追剧能量站', '精选好物 超值优惠'],
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
.home-ad-banner-item-content-container {
  position: absolute; /* 关键：脱离文档流，浮在图片上 */
  top: 60px;
  left: 40px;
  margin-top: 0; /* 去掉原margin-top:80px，避免冲突 */
  z-index: 2; /* 确保文字在图片上方（图片默认z-index:1） */
  /* 保留原有的文字样式 */
}

.home-ad-banner-item-title-middle,
.home-ad-banner-item-title-top {
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
}

.home-ad-banner-item-subtitle {
  font-size: 16px;
  line-height: 24px;
  margin-left: 4px;
  margin-top: 12px;
  overflow: hidden;
  white-space: nowrap;
}

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
  max-width: 1600px;
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

.recommend-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.recommend-icon {
  font-size: 32px;
  color: #ff4444;
  margin-right: 10px;
}

.page-title {
  text-align: center;
  margin: 0;
  color: #333;
  font-size: 28px;
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
