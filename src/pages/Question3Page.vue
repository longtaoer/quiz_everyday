<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 题目卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <img src="/images/question3.svg" alt="Question 3" class="w-auto h-12 mb-6">
        <!-- 连线题区域 -->
        <div class="flex flex-col gap-8 justify-center">
          <!-- 上面一排：图片选项 -->
          <div class="flex gap-8 justify-center">
            <div 
              v-for="(image, index) in images" 
              :key="`image-${index}`"
              @click="selectImage(index)"
              class="cursor-pointer transition-all duration-200"
              :class="getImageClass(index)"
            >
              <img 
                :src="getImageSrc(index)" 
                :alt="image.label" 
                class="w-40 h-auto object-contain rounded-lg border-2 transition-all duration-200 hover:border-gray-300"
                :class="getImageBorderClass(index)"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- 下面一排：文字选项 -->
          <div class="flex gap-8 justify-center">
            <div 
              v-for="(option, index) in ['简约性', '一致性', '可访问性']" 
              :key="`option-${index}`"
              @click="selectOption(option)"
              class="cursor-pointer transition-all duration-200"
              :class="getOptionClass(option)"
            >
              <div class="bg-[#ffffff]/70 w-40 h-12 rounded-lg p-4 text-center border-2 transition-all duration-200 hover:border-gray-300 flex items-center justify-center"
                   :class="getOptionBorderClass(option)">
                <p class="text-gray-700 font-medium">{{ option }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 连线显示 -->
        <div v-if="currentConnection" class="fixed top-[60px] left-1/2 transform -translate-x-1/2 z-50 rounded-lg">
          <div class="inline-block p-3 rounded-lg" :class="connectionClass">
            <span class="font-semibold">{{ connectionText }}</span>
          </div>
        </div>
      </div>
<!-- 底部信息区域 - 撑满屏幕宽度 -->
<div class="h-32 fixed bottom-0 left-0 right-0 p-4 " :class="bottomInfoClass">
      <div class="max-w-2xl mx-auto">
        <div class="flex items-start gap-12">
           <!-- 知识点解释 -->
          <div class="flex-1 flex items-start gap-3">
            
            
            <!-- 文字内容 -->
            <div class="flex-1 text-transparent">
              <span class="text-lg font-semibold mb-4">你太棒啦！</span>
              
            </div>
          </div>

           <!-- 提交按钮 -->
        <div class="text-center">
          <button
            @click="submitAnswer"
            :disabled="!isAllConnected"
            class="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            查看结果
          </button>
        </div>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store'

const router = useRouter()
const quizStore = useQuizStore()

// 连线题状态
const selectedImage = ref<number | null>(null)
const selectedOption = ref<string | null>(null)
const connections = ref<Map<number, string>>(new Map())
const usedOptions = ref<Set<string>>(new Set())
const usedImages = ref<Set<number>>(new Set())

const question = computed(() => quizStore.questions[2])

const getImageSrc = (index: number) => {
  const imageNames = ['q2_1.png', 'q2_2.png', 'q2_3.png']
  return `/quiz_everyday/images/${imageNames[index]}`
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.log('Image failed to load:', img.src)
  console.log('Alt text:', img.alt)
  img.style.display = 'none'
}

const bottomInfoClass = computed(() => {
  return 'bg-transparent'
})

// 图片数据
const images = ref([
  { label: '图1', name: '设计元素A' },
  { label: '图2', name: '设计元素B' },
  { label: '图3', name: '设计元素C' }
])

// 正确答案映射
const correctAnswers = {
  0: '简约性',
  1: '一致性', 
  2: '可访问性'
}

const selectImage = (imageIndex: number) => {
  if (usedImages.value.has(imageIndex)) return
  
  if (selectedImage.value === imageIndex) {
    selectedImage.value = null
  } else {
    selectedImage.value = imageIndex
    checkConnection()
  }
}

const selectOption = (option: string) => {
  if (usedOptions.value.has(option)) return
  
  if (selectedOption.value === option) {
    selectedOption.value = null
  } else {
    selectedOption.value = option
    checkConnection()
  }
}

const checkConnection = () => {
  if (selectedImage.value !== null && selectedOption.value !== null) {
    const imageIndex = selectedImage.value
    const option = selectedOption.value
    
    // 建立连接
    connections.value.set(imageIndex, option)
    usedImages.value.add(imageIndex)
    usedOptions.value.add(option)
    
    // 检查是否正确
    const isCorrect = correctAnswers[imageIndex as keyof typeof correctAnswers] === option
    
    // 显示反馈
    setTimeout(() => {
      if (isCorrect) {
        // 正确连接保持
      } else {
        // 错误连接移除
        connections.value.delete(imageIndex)
        usedImages.value.delete(imageIndex)
        usedOptions.value.delete(option)
      }
      selectedImage.value = null
      selectedOption.value = null
    }, 1000)
  }
}

const getImageClass = (index: number) => {
  if (selectedImage.value === index) {
    return 'scale-105'
  }
  if (usedImages.value.has(index)) {
    return 'opacity-50'
  }
  return 'hover:scale-105'
}

const getImageBorderClass = (index: number) => {
  if (selectedImage.value === index) {
    return 'border-black'
  }
  if (usedImages.value.has(index)) {
    const option = connections.value.get(index)
    const isCorrect = correctAnswers[index as keyof typeof correctAnswers] === option
    return isCorrect ? 'border-green-500' : 'border-[#DB5D26]'
  }
  return 'border-transparent'
}

const getOptionClass = (option: string) => {
  if (selectedOption.value === option) {
    return 'scale-105'
  }
  if (usedOptions.value.has(option)) {
    return 'opacity-50'
  }
  return 'hover:scale-105'
}

const getOptionBorderClass = (option: string) => {
  if (selectedOption.value === option) {
    return 'border-black'
  }
  if (usedOptions.value.has(option)) {
    // 检查这个选项是否连接正确
    for (const [imageIndex, connectedOption] of connections.value.entries()) {
      if (connectedOption === option) {
        const isCorrect = correctAnswers[imageIndex as keyof typeof correctAnswers] === option
        return isCorrect ? 'border-green-500' : 'border-[#DB5D26]'
      }
    }
  }
  return 'border-transparent'
}

const currentConnection = computed(() => {
  return selectedImage.value !== null && selectedOption.value !== null
})

const connectionText = computed(() => {
  if (!currentConnection.value) return ''
  const imageIndex = selectedImage.value!
  const option = selectedOption.value!
  const isCorrect = correctAnswers[imageIndex as keyof typeof correctAnswers] === option
  return isCorrect ? '✓ 连接正确！' : '✗ 连接错误'
})

const connectionClass = computed(() => {
  if (!currentConnection.value) return ''
  const imageIndex = selectedImage.value!
  const option = selectedOption.value!
  const isCorrect = correctAnswers[imageIndex as keyof typeof correctAnswers] === option
  return isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
})

const isAllConnected = computed(() => {
  return connections.value.size === 3
})

const submitAnswer = () => {
  if (isAllConnected.value) {
    // 计算最终答案（选择一致性作为答案）
    quizStore.setAnswer(2, '一致性')
    router.push('/answer3')
  }
}
</script> 