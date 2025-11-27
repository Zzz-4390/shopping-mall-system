<template>
  <div class="product-post-page">
    <div class="container">
      <h1 class="page-title">发布商品</h1>

      <form @submit.prevent="submitProduct" class="product-form">
        <!-- 商品标题 -->
        <div class="form-group">
          <label for="title">商品标题</label>
          <input
            id="title"
            v-model="productForm.title"
            type="text"
            placeholder="请输入商品标题"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
          />
          <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
        </div>

        <!-- 商品分类 -->
        <div class="form-group">
          <label for="category">商品分类</label>
          <select
            id="category"
            v-model="productForm.category"
            class="form-control"
            :class="{ 'is-invalid': errors.category }"
          >
            <option value="">请选择分类</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <div v-if="errors.category" class="invalid-feedback">{{ errors.category }}</div>
        </div>

        <!-- 商品价格 -->
        <div class="form-group">
          <label for="price">商品价格</label>
          <input
            id="price"
            v-model.number="productForm.price"
            type="number"
            min="0"
            step="0.01"
            placeholder="请输入价格"
            class="form-control"
            :class="{ 'is-invalid': errors.price }"
            @blur="formatPrice"
          />
          <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
        </div>

        <!-- 商品图片上传 -->
        <div class="form-group">
          <label>商品图片</label>
          <div class="image-upload-area">
            <div class="image-preview" v-for="(image, index) in productForm.photo" :key="index">
              <img :src="image.url" :alt="'商品图片' + (index + 1)" />
              <button type="button" @click="removeImage(index)" class="remove-image-btn">×</button>
            </div>

            <div
              v-if="productForm.photo.length < maxImages"
              class="upload-placeholder"
              @click="triggerFileInput"
            >
              <div class="upload-icon">+</div>
              <p>
                点击上传图片<br /><small>(最多{{ maxImages }}张)</small>
              </p>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                multiple
                @change="handleImageUpload"
                class="hidden-file-input"
              />
            </div>
          </div>
          <div v-if="errors.photo" class="invalid-feedback">{{ errors.photo }}</div>
        </div>

        <!-- 商品描述 -->
        <div class="form-group">
          <label for="content">商品描述</label>
          <textarea
            id="content"
            v-model="productForm.content"
            rows="6"
            placeholder="请详细描述商品信息，包括品牌、规格、新旧程度、是否有瑕疵等"
            class="form-control"
            :class="{ 'is-invalid': errors.content }"
          ></textarea>
          <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div>
        </div>

        <!-- 提交按钮 -->
        <div class="form-actions">
          <button type="button" @click="resetForm" class="btn btn-secondary">重置</button>
          <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
            {{ isSubmitting ? '发布中...' : '发布商品' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// 表单数据
const productForm = reactive({
  title: '',
  category: '',
  price: null as number | null,
  photo: [] as Array<{ file: File; url: string }>,
  content: '',
})

// 错误信息
const errors = reactive<Record<string, string>>({})

// 页面状态
const isSubmitting = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// 配置参数
const maxImages = 6

// 分类选项
const categories = [
  { id: 'electronics', name: '数码电子' },
  { id: 'clothing', name: '服装鞋帽' },
  { id: 'books', name: '图书教材' },
  { id: 'home', name: '家居用品' },
  { id: 'sports', name: '运动户外' },
  { id: 'other', name: '其他' },
]

// 路由
const router = useRouter()

// 触发文件选择
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// 处理图片上传
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files || files.length === 0) return

  // 检查数量限制
  if (productForm.photo.length + files.length > maxImages) {
    alert(`最多只能上传${maxImages}张图片`)
    return
  }

  // 处理每个文件
  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    // 确保 file 存在
    if (!file) continue

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      continue
    }

    // 创建预览URL
    const url = URL.createObjectURL(file)
    productForm.photo.push({ file, url })
  }

  // 清空input值以便重复选择同一文件
  target.value = ''
}

// 移除图片
const removeImage = (index: number) => {
  productForm.photo.splice(index, 1)
}

// 格式化价格为最多两位小数
const formatPrice = () => {
  if (productForm.price !== null && productForm.price !== undefined) {
    // 保留最多两位小数
    const fixed = productForm.price.toFixed(2)
    // 去掉末尾的0
    productForm.price = parseFloat(fixed)
  }
}

// 验证表单
const validateForm = (): boolean => {
  // 清空之前的错误
  Object.keys(errors).forEach((key) => delete errors[key])

  // 必填验证
  if (!productForm.title.trim()) {
    errors.title = '请输入商品标题'
  }

  if (!productForm.category) {
    errors.category = '请选择商品分类'
  }

  if (productForm.price === null || productForm.price <= 0) {
    errors.price = '请输入有效的商品价格'
  }

  if (productForm.photo.length === 0) {
    errors.photo = '请至少上传一张商品图片'
  }

  if (!productForm.content.trim()) {
    errors.content = '请输入商品描述'
  }

  return Object.keys(errors).length === 0
}

// 提交商品
const submitProduct = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // 这里应该调用API提交商品数据
    // await productService.createProduct(productForm)

    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 发布成功后跳转
    alert('商品发布成功！')
    router.push('/products')
  } catch (error) {
    console.error('发布失败:', error)
    alert('商品发布失败，请稍后重试')
  } finally {
    isSubmitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  if (confirm('确定要重置表单吗？所有已填写的内容将会丢失。')) {
    productForm.title = ''
    productForm.category = ''
    productForm.price = null
    productForm.photo = []
    productForm.content = ''

    // 清空错误信息
    Object.keys(errors).forEach((key) => delete errors[key])
  }
}
</script>

<style scoped>
.product-post-page {
  padding: 30px 0;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 40px;
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 32px;
  font-weight: 600;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 10px;
  color: #495057;
  font-size: 16px;
}

.form-control {
  padding: 14px 18px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  background-color: #fff;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

.is-invalid {
  border-color: #dc3545 !important;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 14px;
  margin-top: 8px;
}

.image-upload-area {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px 0;
}

.image-preview {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc3545;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.remove-image-btn:hover {
  transform: scale(1.1);
  background: white;
}

.upload-placeholder {
  width: 140px;
  height: 140px;
  border: 2px dashed #ced4da;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  color: #6c757d;
  transition: all 0.3s;
  background-color: #f8f9fa;
}

.upload-placeholder:hover {
  border-color: #007bff;
  color: #007bff;
  background-color: #e9f4ff;
}

.upload-icon {
  font-size: 36px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 5px;
}

.hidden-file-input {
  display: none;
}

textarea.form-control {
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 20px;
  padding-top: 20px;
}

.btn {
  padding: 14px 36px;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 140px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.2);
}

.btn-primary:hover:not(:disabled) {
  background-color: #0069d9;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 123, 255, 0.3);
}

.btn-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  box-shadow: 0 4px 6px rgba(108, 117, 125, 0.2);
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(108, 117, 125, 0.3);
}

@media (max-width: 768px) {
  .product-post-page {
    padding: 20px 0;
  }

  .container {
    margin: 0 15px;
    padding: 25px;
  }

  .page-title {
    font-size: 28px;
    margin-bottom: 30px;
  }

  .product-form {
    gap: 25px;
  }

  .form-actions {
    flex-direction: column;
    gap: 15px;
  }

  .btn {
    width: 100%;
  }

  .image-upload-area {
    justify-content: flex-start;
  }
}
</style>
