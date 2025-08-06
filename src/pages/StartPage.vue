<template>
      <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center pl-8 pr-16">
            <div class="flex items-center justify-between max-w-6xl w-full">
        <!-- 左侧文字内容 -->
          <div class="bg-transparent rounded-2xl shadow-none pl-4 pr-0 pt-0 pb-0 max-w-md h-96 flex flex-col justify-between">
            <div>
              <img src="/images/subtitletop.svg" alt="Logo" class="w-30 h-10 mb-0 rounded-none shadow-none" />
              <img src="/images/title.svg" alt="Logo" class="w-56 h-24 mb-0 rounded-none shadow-none" />
              <img src="/images/subtitlebottom.svg" alt="Logo" class="w-120 h-12 mb-0 rounded-none shadow-none svg-color" />
            </div>
            <button
              @click="startQuiz"
              class="bg-black text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg w-fit"
            >
              开始答题
            </button>
        </div>
        
        <!-- 右侧图片 -->
        <div class="w-96 flex justify-center">
          <img src="/images/bg.svg" alt="Illustration" class="object-contain" />
        </div>
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
  router.push('/question1')
}
</script> 