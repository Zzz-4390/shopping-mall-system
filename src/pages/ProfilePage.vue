<template>
  <div class="profile-container">
    <!-- 头部 -->
    <div class="profile-header">
      <div class="avatar-section">
        <img :src="userInfo.photo || defaultAvatar" alt="头像" class="avatar" />
        <el-upload
          class="avatar-uploader"
          action="/api/upload/avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" type="primary">修改头像</el-button>
        </el-upload>
      </div>

      <div class="user-info">
        <h2>{{ userInfo.name }}</h2>
        <p class="register-time">注册时间: {{ formatRegisterTime(userInfo.registertime || '') }}</p>
      </div>
    </div>

    <el-divider></el-divider>

    <!-- Tab导航栏 -->
    <el-tabs v-model="activeTab" class="profile-tabs">
      <!-- 个人信息标签页 -->
      <el-tab-pane label="个人信息" name="profile">
        <div class="profile-details">
          <el-form
            ref="formRef"
            :model="userInfo"
            :rules="rules"
            label-width="100px"
            class="profile-form"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="editingUsername" :disabled="!isEditing"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userInfo.phone" disabled></el-input>
            </el-form-item>

            <el-form-item>
              <el-button v-if="!isEditing" type="primary" @click="toggleEdit"> 修改信息 </el-button>
              <el-button v-if="!isEditing" type="primary" @click="openPasswordDialog">
                修改密码
              </el-button>
              <div v-else>
                <el-button type="success" @click="saveProfile">保存</el-button>
                <el-button @click="cancelEdit">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!-- 我的商品标签页 -->
      <el-tab-pane label="我的商品" name="products">
        <div class="products-management">
          <!-- 商品列表 -->
          <el-table :data="productList" style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="商品名称" width="180">
              <template #default="scope"> {{ scope.row.title }} </template></el-table-column
            >
            <el-table-column prop="price" label="价格" width="120">
              <template #default="scope"> ¥{{ scope.row.price }} </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.status === 'onsale' ? 'success' : 'info'">
                  {{ scope.row.status === 'onsale' ? '已上架' : '已下架' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="180">
              <template #default="scope">
                {{ formatDate(scope.row.publishtime) }}
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="editProduct(scope.row)">编辑</el-button>
                <el-button
                  size="small"
                  :type="scope.row.status === 'onsale' ? 'warning' : 'success'"
                  @click="toggleProductStatus(scope.row)"
                >
                  {{ scope.row.status === 'onsale' ? '下架' : '上架' }}
                </el-button>
                <el-button size="small" type="danger" @click="deleteProduct(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination
            v-if="totalProducts > 0"
            layout="prev, pager, next, total"
            :total="totalProducts"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
            class="pagination"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 商品编辑对话框 -->
    <el-dialog v-model="productDialogVisible" width="500px">
      <el-form :model="currentProduct" :rules="productRules" ref="productFormRef">
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="currentProduct.title"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="currentProduct.price" :min="0" :step="1"></el-input-number>
        </el-form-item>
        <el-form-item label="描述" prop="content">
          <el-input type="textarea" v-model="currentProduct.content"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="currentProduct.category" placeholder="请选择分类">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="productDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProduct">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="修改密码"
      width="500px"
      @closed="resetPasswordForm"
    >
      <el-form
        :model="passwordForm"
        :rules="passwordRules"
        ref="passwordFormRef"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="savePassword">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, UploadProps, FormItemRule } from 'element-plus'
import defaultAvatar from '@/assets/avatar.jpg'
import type { Product } from '@/types/product'
import type { User } from '@/types/user'
import { useUserStore } from '@/stores/user'
import { updateUser } from '@/apis/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref<FormInstance>()
const productFormRef = ref()
const userStore = useUserStore()
// 添加密码相关的响应式变量
const passwordDialogVisible = ref(false)
const passwordFormRef = ref<FormInstance>()
const isEditing = ref(false)
const activeTab = ref('profile')
const loading = ref(false)
const productDialogVisible = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalProducts = ref(0)

// 添加一个新的响应式变量来保存编辑中的用户名
const editingUsername = ref('')

const userInfo = reactive<Partial<User>>({
  name: '',
  registertime: '',
  photo: '',
  phone: '',
})

const originalUserInfo = reactive<Partial<User>>({ ...userInfo })

const productList = ref<Product[]>([])

// 商品表单数据
const currentProduct = reactive({
  productid: '',
  title: '',
  price: 0,
  content: '',
  category: '',
  status: 'onsale',
})

// 添加密码表单数据
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 添加密码验证规则
const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20位之间', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20位之间', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (
        _rule: FormItemRule,
        value: string,
        callback: (error?: string | Error) => void,
      ) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
}

// 商品验证规则
const productRules = {
  title: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
}

// 商品分类选项
const categories = [
  { value: 'electronics', label: '电子产品' },
  { value: 'clothing', label: '服装' },
  { value: 'books', label: '图书' },
  { value: 'home', label: '家居' },
  { value: 'other', label: '其他' },
]

// 格式化注册时间
const formatRegisterTime = (time: string) => {
  if (!time) return ''
  const date = new Date(time)
  return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN')
}

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

// 切换编辑状态
const toggleEdit = () => {
  isEditing.value = true
  editingUsername.value = userInfo.name || '' // 初始化编辑值
  Object.assign(originalUserInfo, { ...userInfo })
}

// 保存个人信息
const saveProfile = async () => {
  if (!formRef.value) return
  // 需要先更新表单模型以通过验证
  userInfo.name = editingUsername.value
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const updatedInfo = {
          name: userInfo.name,
        }
        const id = userStore.userInfo.userid
        await updateUser(id, updatedInfo)
        ElMessage.success('保存成功')
        userStore.setUserInfo(updatedInfo)
        isEditing.value = false
      } catch (error) {
        ElMessage.error('保存失败')
        console.error(error)
      }
    } else {
      ElMessage.error('请检查输入信息')
    }
  })
}

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false
  editingUsername.value = userInfo.name || ''
  // 将用户信息恢复到编辑前的状态
  Object.assign(userInfo, { ...originalUserInfo })
  // 清除表单验证状态
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}

// 打开修改密码对话框
const openPasswordDialog = () => {
  passwordDialogVisible.value = true
  // 重置表单数据
  Object.assign(passwordForm, {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
}

// 处理头像上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  if (response && response.url) {
    userInfo.photo = response.url
    ElMessage.success('头像更新成功')
  } else {
    ElMessage.error('头像更新失败')
  }
}

// 上传前检查文件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('头像必须是 JPG 或 PNG 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过 2MB!')
    return false
  }
  return true
}

// 获取用户信息
const fetchUserInfo = () => {
  try {
    const userData = userStore.userInfo
    // 更新用户信息
    Object.assign(userInfo, {
      name: userData.name,
      registertime: userData.registertime,
      photo: userData.photo,
      phone: userData.phone,
    })

    // 初始化编辑用户名
    if (!isEditing.value) {
      editingUsername.value = userInfo.name || ''
    }
  } catch (error) {
    ElMessage.error('获取用户信息失败')
    console.error('Failed to fetch user info:', error)
  }
}

// 获取商品列表 - 实现真正的分页功能
const fetchProducts = async () => {
  loading.value = true
  try {
    // 模拟所有商品数据 (12条)
    const allProducts: Product[] = [
      {
        productid: '1',
        sellerid: 'seller001',
        title: 'iPhone 12',
        price: 3999,
        content: '二手iPhone 12，几乎全新',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-01T10:00:00Z',
        category: 'electronics',
      },
      {
        productid: '2',
        sellerid: 'seller001',
        title: 'MacBook Pro',
        price: 8999,
        content: 'MacBook Pro 13寸，使用一年',
        photo: '',
        status: 'sold',
        publishtime: '2023-05-02T14:30:00Z',
        category: 'electronics',
      },
      {
        productid: '3',
        sellerid: 'seller001',
        title: '华为P40',
        price: 2999,
        content: '华为P40手机，九成新',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-03T09:15:00Z',
        category: 'electronics',
      },
      {
        productid: '4',
        sellerid: 'seller001',
        title: '耐克运动鞋',
        price: 599,
        content: '耐克篮球鞋，42码',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-04T16:45:00Z',
        category: 'clothing',
      },
      {
        productid: '5',
        sellerid: 'seller001',
        title: 'JavaScript高级程序设计',
        price: 89,
        content: '第4版，几乎全新',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-05T11:20:00Z',
        category: 'books',
      },
      {
        productid: '6',
        sellerid: 'seller001',
        title: '小米空气净化器',
        price: 799,
        content: '小米3代空气净化器，使用半年',
        photo: '',
        status: 'sold',
        publishtime: '2023-05-06T13:30:00Z',
        category: 'home',
      },
      {
        productid: '7',
        sellerid: 'seller001',
        title: '联想ThinkPad',
        price: 4500,
        content: '联想ThinkPad笔记本，办公利器',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-07T10:00:00Z',
        category: 'electronics',
      },
      {
        productid: '8',
        sellerid: 'seller001',
        title: '阿迪达斯外套',
        price: 399,
        content: '阿迪达斯春季外套，M码',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-08T15:45:00Z',
        category: 'clothing',
      },
      {
        productid: '9',
        sellerid: 'seller001',
        title: 'Vue.js实战',
        price: 69,
        content: 'Vue.js开发指南，适合初学者',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-09T14:20:00Z',
        category: 'books',
      },
      {
        productid: '10',
        sellerid: 'seller001',
        title: '宜家台灯',
        price: 129,
        content: '简约风格台灯，护眼设计',
        photo: '',
        status: 'sold',
        publishtime: '2023-05-10T17:30:00Z',
        category: 'home',
      },
      {
        productid: '11',
        sellerid: 'seller001',
        title: '索尼耳机',
        price: 899,
        content: '索尼降噪耳机，音质出色',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-11T09:00:00Z',
        category: 'electronics',
      },
      {
        productid: '12',
        sellerid: 'seller001',
        title: '优衣库衬衫',
        price: 199,
        content: '优衣库纯棉衬衫，L码',
        photo: '',
        status: 'onsale',
        publishtime: '2023-05-12T12:15:00Z',
        category: 'clothing',
      },
    ]

    // 设置总商品数
    totalProducts.value = allProducts.length

    // 根据当前页和页面大小计算显示的数据
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    productList.value = allProducts.slice(start, end)
  } catch (error) {
    ElMessage.error('获取商品列表失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 打开商品对话框
const openProductDialog = (product: Product | null = null) => {
  if (product) {
    Object.assign(currentProduct, product)
  } else {
    // 重置表单
    Object.assign(currentProduct, {
      productid: '',
      title: '',
      price: 0,
      content: '',
      category: '',
      status: 'onsale',
    })
  }
  productDialogVisible.value = true
}

// 编辑商品
const editProduct = (product: Product) => {
  openProductDialog(product)
}

// 切换商品状态
const toggleProductStatus = (product: Product) => {
  ElMessageBox.confirm(
    `确定要${product.status === 'onsale' ? '下架' : '上架'} "${product.title}" 吗？`,
    '确认操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(async () => {
    try {
      // 调用API更新商品状态
      // await api.updateProductStatus(product.id, product.status === 'onsale' ? 'sold' : 'onsale')

      // 更新本地数据
      product.status = product.status === 'onsale' ? 'sold' : 'onsale'
      ElMessage.success('操作成功')
    } catch (error) {
      ElMessage.error('操作失败')
      console.error(error)
    }
  })
}
// 删除商品
const deleteProduct = (product: Product) => {
  ElMessageBox.confirm(`确定要删除 "${product.title}" 吗？`, '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      // 调用API删除商品
      // await api.deleteProduct(product.id)

      // 更新本地数据
      productList.value = productList.value.filter((item) => item.productid !== product.productid)
      // 也需要更新总数量
      totalProducts.value--
      ElMessage.success('删除成功')
    } catch (error) {
      ElMessage.error('删除失败')
      console.error(error)
    }
  })
}

// 保存商品
const saveProduct = async () => {
  if (!productFormRef.value) return

  await productFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        if (currentProduct.productid) {
          // 编辑商品 - 更新现有商品
          ElMessage.success('商品更新成功')
        }

        productDialogVisible.value = false
        // 重置表单
        Object.assign(currentProduct, {
          productid: '',
          title: '',
          price: 0,
          content: '',
          category: '',
          status: 'onsale',
        })
        //重新获取商品列表
        /* fetchProductData() */
      } catch (error) {
        ElMessage.error('操作失败')
        console.error(error)
      }
    }
  })
}

// 保存密码修改
const savePassword = async () => {
  if (!passwordFormRef.value) return

  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 调用API修改密码
        const userId = userStore.userInfo.userid
        const res = await updateUser(userId, {
          oldPassword: passwordForm.oldPassword,
          password: passwordForm.newPassword,
        })
        console.log(res)
        resetPasswordForm()
        ElMessage.success('密码修改成功')
        passwordDialogVisible.value = false
        userStore.clearUserInfo()
        router.push('/login')
      } catch (error) {
        ElMessage.error('密码修改失败')
        console.error(error)
      }
    }
  })
}

// 关闭时重置表单
const resetPasswordForm = () => {
  // 重置表单数据
  Object.assign(passwordForm, {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // 清除表单验证状态
  if (passwordFormRef.value) {
    passwordFormRef.value.clearValidate()
  }
}
// 处理分页变化
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchProducts()
}

onMounted(() => {
  fetchUserInfo()
  fetchProducts()
})
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 80px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px 0;
}

.avatar-section {
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
}

.avatar-uploader {
  margin-top: 10px;
}

.user-info h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #333;
}

.register-time {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.profile-details {
  padding: 20px 0;
}

.profile-form {
  max-width: 500px;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 20px;
}

:deep(.el-form-item__label) {
  font-weight: bold;
}

.profile-tabs {
  margin-top: 20px;
}

.products-header {
  margin-bottom: 20px;
  text-align: right;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-container {
    margin: 10px;
    padding: 15px;
  }

  .pagination {
    justify-content: center;
  }
}
</style>
