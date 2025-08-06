<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 进度指示 -->
      <div class="mb-6 text-center">
        <div class="text-sm text-gray-600 mb-2">第 {{ questionIndex + 1 }} 题答案</div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- 题目卡片 -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
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
                   class="w-3 h-3 rounded-full bg-black"></div>
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
          <p class="text-blue-700 text-sm">{{ getExplanation() }}</p>
        </div>
      </div>

      <!-- 导航按钮 -->
      <div class="flex justify-between">
        <button
          @click="previousQuestion"
          class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          上一题
        </button>

        <button
          v-if="questionIndex < totalQuestions - 1"
          @click="nextQuestion"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          下一题
        </button>
        <button
          v-else
          @click="goToReview"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          查看总结
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuizStore } from '@/store'

const router = useRouter()
const route = useRoute()
const quizStore = useQuizStore()

const questionIndex = computed(() => parseInt(route.params.questionIndex as string))
const totalQuestions = computed(() => quizStore.questions.length)
const question = computed(() => quizStore.questions[questionIndex.value])
const userAnswer = computed(() => quizStore.getAnswer(questionIndex.value))
const isCorrect = computed(() => quizStore.isAnswerCorrect(questionIndex.value))

const resultClass = computed(() => {
  return isCorrect.value 
    ? 'border-[#5BC279] bg-[#FCFFFD]' 
    : 'border-[#DF6935] bg-[#FFFCFC]'
})

const resultTextClass = computed(() => {
  return isCorrect.value 
    ? 'text-[#5BC279]' 
    : 'text-[#DF6935]'
})

const getOptionClass = (option: string) => {
  if (quizStore.isCorrectAnswer(questionIndex.value, option)) {
    return 'border-[#5BC279] bg-[#FCFFFD]'
  }
  if (quizStore.isSelectedAnswer(questionIndex.value, option)) {
    return 'border-[#DF6935] bg-[#FFFCFC]'
  }
  return 'border-gray-200'
}

const getRadioClass = (option: string) => {
  if (quizStore.isCorrectAnswer(questionIndex.value, option)) {
    return 'border-[#5BC279]'
  }
  if (quizStore.isSelectedAnswer(questionIndex.value, option)) {
    return 'border-[#DF6935]'
  }
  return 'border-gray-300'
}

const isCorrectAnswer = (option: string) => {
  return quizStore.isCorrectAnswer(questionIndex.value, option)
}

const isSelectedAnswer = (option: string) => {
  return quizStore.isSelectedAnswer(questionIndex.value, option)
}

const getExplanation = () => {
  const explanations = [
    '现代简约风格强调简洁、清晰的设计原则。黑白灰作为基础色调，搭配蓝色作为点缀，既保持了简约感，又增加了视觉层次。这种配色方案在UI设计中广泛应用，能够提供良好的可读性和用户体验。',
    '在用户体验设计中，可用性是最重要的原则。无论设计多么美观或创新，如果用户无法轻松完成任务，设计就是失败的。可用性确保产品能够满足用户的基本需求，提供直观、高效的使用体验。'
  ]
  return explanations[questionIndex.value] || '暂无知识点解释'
}

const previousQuestion = () => {
  if (questionIndex.value > 0) {
    router.push(`/answer/${questionIndex.value - 1}`)
  } else {
    router.push('/quiz')
  }
}

const nextQuestion = () => {
  if (questionIndex.value < totalQuestions.value - 1) {
    router.push(`/answer/${questionIndex.value + 1}`)
  }
}

const goToReview = () => {
  router.push('/review')
}
</script> 