<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center p-4">
    <div class="bg-transparent rounded-2xl shadow-none p-8 max-w-md w-full">
        <img src="/images/subtitletop.svg" alt="Logo" class="w-40 h-14 mb-4 rounded-none shadow-none" />
        <img src="/images/title.svg" alt="Logo" class="w-77 h-32 mb-4 rounded-none shadow-none" />
        <img src="/images/subtitlebottom.svg" alt="Logo" class="w-120 h-12 mb-4 rounded-none shadow-none svg-color" />
        <button
          @click="startQuiz"
          class="bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          开始答题
        </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store'

const router = useRouter()
const quizStore = useQuizStore()

const startQuiz = () => {
  quizStore.resetQuiz()
  router.push('/quiz')
}
</script> 