<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-4xl mx-auto w-full">
      <!-- 成绩概览 -->
      <div class="text-center flex flex-col items-center mb-8">
        <img src="/images/result.svg" alt="result" class="w-auto h-80 mb-6">
      </div>

      

      <!-- 操作按钮 -->
      <div class="flex justify-center space-x-4 mt-8">
      
        <button
          @click="goHome"
          class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          返回首页
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

const score = computed(() => quizStore.score)
const correctAnswers = computed(() => quizStore.correctAnswers)
const totalQuestions = computed(() => quizStore.questions.length)
const questions = computed(() => quizStore.questions)

const scorePercentage = computed(() => {
  return Math.round((score.value / totalQuestions.value) * 100)
})

const scoreColor = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 80) return 'text-green-600'
  if (percentage >= 60) return 'text-yellow-600'
  return 'text-red-600'
})

const getQuestionClass = (index: number) => {
  const isCorrect = quizStore.isAnswerCorrect(index)
  return isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
}

const getAnswerClass = (index: number) => {
  const isCorrect = quizStore.isAnswerCorrect(index)
  return isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
}

const getAnswerStatus = (index: number) => {
  return quizStore.isAnswerCorrect(index) ? '正确' : '错误'
}

const getOptionClass = (index: number, option: string) => {
  const isCorrect = quizStore.isCorrectAnswer(index, option)
  const isSelected = quizStore.isSelectedAnswer(index, option)
  
  if (isCorrect) return 'bg-green-100 border-green-300'
  if (isSelected && !isCorrect) return 'bg-red-100 border-red-300'
  return 'bg-gray-50'
}

const isCorrectAnswer = (index: number, option: string) => {
  return quizStore.isCorrectAnswer(index, option)
}

const isSelectedAnswer = (index: number, option: string) => {
  return quizStore.isSelectedAnswer(index, option)
}

const getExplanation = (index: number) => {
  const explanations = [
    '现代简约风格强调简洁、清晰的设计原则。黑白灰作为基础色调，搭配蓝色作为点缀，既保持了简约感，又增加了视觉层次。这种配色方案在UI设计中广泛应用，能够提供良好的可读性和用户体验。',
    '一致性是设计中的重要原则，它确保界面元素在视觉和行为上保持统一。通过保持一致的色彩、字体、间距和交互模式，用户可以更容易地理解和预测界面行为，从而提升用户体验和可用性。'
  ]
  return explanations[index] || '暂无知识点解释'
}

const restartQuiz = () => {
  quizStore.resetQuiz()
  router.push('/')
}

const goHome = () => {
  router.push('/')
}
</script> 