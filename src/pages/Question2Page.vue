<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 题目卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <img src="/images/question2.svg" alt="Question 2" class="w-auto h-12 mb-6">
        <!-- 选项列表 -->
        <div class="grid grid-cols-3 gap-4 mb-0">
          <div
            v-for="(option, index) in question.options"
            :key="option"
            @click="selectAnswer(option)"
            class="cursor-pointer transition-all duration-200"
          >
            <img 
              :src="getImageSrc(index)" 
              :alt="option" 
              class="w-full h-auto object-contain rounded-lg border-2 transition-all duration-200 hover:shadow-md hover:scale-105"
              :class="getImageClass(option)"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
      <!-- 底部信息区域 - 撑满屏幕宽度 -->
    <div class="h-32 fixed bottom-0 left-0 right-0 p-4 ">
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
      <div class="text-right mr-0">
        <button
          @click="submitAnswer"
          :disabled="!selectedAnswer"
          class="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          提交答案
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

const selectedAnswer = ref<string | null>(null)

const question = computed(() => quizStore.questions[1])

const getImageSrc = (index: number) => {
  const imageNames = ['q2_1.png', 'q2_2.png', 'q2_3.png']
  return `/quiz_everyday/images/${imageNames[index]}`
}

const selectAnswer = (answer: string) => {
  selectedAnswer.value = answer
}

const getOptionClass = (option: string) => {
  if (option === selectedAnswer.value) {
    return 'border-black bg-gray-50'
  }
  return 'border-gray-200 hover:border-black hover:bg-gray-50'
}

const getRadioClass = (option: string) => {
  if (option === selectedAnswer.value) {
    return 'border-black'
  }
  return 'border-gray-300'
}

const getImageClass = (option: string) => {
  if (option === selectedAnswer.value) {
    return 'border-black border-2'
  }
  return 'border-transparent border-2 hover:border-gray-300'
}

const submitAnswer = () => {
  if (selectedAnswer.value) {
    quizStore.setAnswer(1, selectedAnswer.value)
    router.push('/answer2')
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.log('Image failed to load:', img.src)
  console.log('Alt text:', img.alt)
  // 尝试设置一个默认图片或者隐藏图片
  img.style.display = 'none'
}
</script> 