<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 答案卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">{{ question.question }}</h2>
        
        <!-- 选项列表 -->
        <div class="space-y-3 mb-6">
          <div 
            v-for="option in question.options" 
            :key="option"
            class="flex items-center p-3 rounded-lg border-2"
            :class="getOptionClass(option)"
          >
            <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center"
                 :class="getRadioClass(option)">
              <div v-if="isSelectedAnswer(option)" 
                   class="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <span class="text-gray-700">{{ option }}</span>
            <div class="ml-auto">
              <span v-if="isCorrectAnswer(option)" class="text-green-600 font-medium">✓ 正确答案</span>
              <span v-else-if="isSelectedAnswer(option)" class="text-red-600 font-medium">✗ 你的答案</span>
            </div>
          </div>
        </div>

        <!-- 结果状态 -->
        <div class="p-4 rounded-lg border-2 mb-4" :class="resultClass">
          <div class="flex items-center mb-2">
            <span class="text-lg font-semibold" :class="resultTextClass">
              {{ isCorrect ? '✓ 回答正确！' : '✗ 回答错误' }}
            </span>
          </div>
        </div>

        <!-- 知识点解释 -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-2">知识点</h3>
          <p class="text-blue-700 text-sm">{{ explanation }}</p>
        </div>
      </div>

      <!-- 挑战下一题按钮 -->
      <div class="text-center">
        <button
          @click="nextQuestion"
          class="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
        >
          挑战下一题
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store'

const router = useRouter()
const quizStore = useQuizStore()

const question = computed(() => quizStore.questions[0])
const userAnswer = computed(() => quizStore.getAnswer(0))
const isCorrect = computed(() => quizStore.isAnswerCorrect(0))

const resultClass = computed(() => {
  return isCorrect.value 
    ? 'border-green-200 bg-green-50' 
    : 'border-red-200 bg-red-50'
})

const resultTextClass = computed(() => {
  return isCorrect.value 
    ? 'text-green-700' 
    : 'text-red-700'
})

const getOptionClass = (option: string) => {
  if (quizStore.isCorrectAnswer(0, option)) {
    return 'border-green-300 bg-green-50'
  }
  if (quizStore.isSelectedAnswer(0, option)) {
    return 'border-red-300 bg-red-50'
  }
  return 'border-gray-200'
}

const getRadioClass = (option: string) => {
  if (quizStore.isCorrectAnswer(0, option)) {
    return 'border-green-500'
  }
  if (quizStore.isSelectedAnswer(0, option)) {
    return 'border-red-500'
  }
  return 'border-gray-300'
}

const isCorrectAnswer = (option: string) => {
  return quizStore.isCorrectAnswer(0, option)
}

const isSelectedAnswer = (option: string) => {
  return quizStore.isSelectedAnswer(0, option)
}

const explanation = '现代简约风格强调简洁、清晰的设计原则。黑白灰作为基础色调，搭配蓝色作为点缀，既保持了简约感，又增加了视觉层次。这种配色方案在UI设计中广泛应用，能够提供良好的可读性和用户体验。'

const nextQuestion = () => {
  router.push('/question2')
}
</script> 