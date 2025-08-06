<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto">
      <!-- 题目卡片 -->
      <QuestionCard 
        v-if="currentQuestion"
        :question="currentQuestion"
        :selected-answer="selectedAnswer"
        @select-answer="selectAnswer"
      />



      <!-- 导航按钮 -->
      <div class="flex justify-between mt-8">
        <button
          v-if="currentQuestionIndex > 0"
          @click="previousQuestion"
          class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          上一题
        </button>
        <div v-else></div>

        <button
          v-if="currentQuestionIndex < totalQuestions - 1"
          @click="nextQuestion"
          :disabled="!selectedAnswer"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一题
        </button>
        <button
          v-else
          @click="finishQuiz"
          :disabled="!selectedAnswer"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          完成答题
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store'
import QuestionCard from '@/components/QuestionCard.vue'

const router = useRouter()
const quizStore = useQuizStore()

const selectedAnswer = ref<string | null>(null)

const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex)
const totalQuestions = computed(() => quizStore.questions.length)
const currentQuestion = computed(() => quizStore.currentQuestion)



const selectAnswer = (answer: string) => {
  selectedAnswer.value = answer
  quizStore.setAnswer(currentQuestionIndex.value, answer)
  
  // 答完题目后跳转到答案页面
  setTimeout(() => {
    router.push(`/answer/${currentQuestionIndex.value}`)
  }, 500)
}

const nextQuestion = () => {
  if (selectedAnswer.value) {
    quizStore.nextQuestion()
    selectedAnswer.value = quizStore.getAnswer(currentQuestionIndex.value + 1) || null
  }
}

const previousQuestion = () => {
  quizStore.previousQuestion()
  selectedAnswer.value = quizStore.getAnswer(currentQuestionIndex.value) || null
}

const finishQuiz = () => {
  if (selectedAnswer.value) {
    quizStore.finishQuiz()
    router.push('/result')
  }
}
</script> 