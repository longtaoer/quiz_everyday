<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto w-full">
      <!-- 答案卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <h2 class="text-xl font-regular text-gray-600 mb-6">{{ question.question }}</h2>
        <img src="/images/question2.svg" alt="Question 2" class="w-auto h-20 mb-6">
        
        <!-- 选项列表 -->
        <div class="grid grid-cols-3 gap-4 mb-0">
          <div 
            v-for="(option, index) in question.options" 
            :key="option"
            class="relative"
          >
            <img 
              :src="getImageSrc(index)" 
              :alt="option" 
              class="w-full h-auto object-contain rounded-lg border-2 transition-all duration-200"
              :class="getImageClass(option)"
              @error="handleImageError"
            />
            <!-- 结果标签 -->
            <div class="absolute top-2 right-2">
              <span v-if="isCorrectAnswer(option)" class="bg-[#5BC279] text-white px-2 py-1 rounded text-xs font-medium">✓ 正确答案</span>
              <span v-else-if="isSelectedAnswer(option)" class="bg-[#DF6935] text-white px-2 py-1 rounded text-xs font-medium">✗ 你的答案</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 底部信息区域 - 撑满屏幕宽度 -->
    <div class="h-36 fixed bottom-0 left-0 right-0 p-4 " :class="bottomInfoClass">
      <div class="max-w-2xl mx-auto">
        <div class="flex items-start gap-12">
           <!-- 知识点解释 -->
          <div class="flex-1 flex items-start gap-3">
            <!-- 结果图片 -->
            <img 
              v-if="isCorrect"
              src="/images/rightresult.svg" 
              alt="回答正确"
              class="w-16 h-16 flex-shrink-0 mr-2"
            />
            <img 
              v-else
              src="/images/wrongresult.svg" 
              alt="回答错误"
              class="w-16 h-16 flex-shrink-0 mr-2"
            />
            
            <!-- 文字内容 -->
            <div class="flex-1">
              <span class="text-lg font-semibold mb-4" :class="resultTextClass">
                {{ isCorrect ? '你太棒啦！' : `再接再厉！` }}
              </span>
              <p class="text-gray-500 text-sm mt-2">
                <span class="font-semibold">知识点：</span>{{ explanation }}
              </p>
            </div>
          </div>

          <!-- 挑战下一题按钮 -->
          <div class="flex-shrink-0 items-center h-full mt-8">
            <button
              @click="nextQuestion"
              class="px-8 py-3 font-semibold rounded-full transition-colors"
              :class="buttonClass"
            >
              挑战下一题
            </button>
          </div>
        </div>
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

const question = computed(() => quizStore.questions[1])
const userAnswer = computed(() => quizStore.getAnswer(1))
const isCorrect = computed(() => quizStore.isAnswerCorrect(1))

const resultClass = computed(() => {
  return isCorrect.value 
    ? 'border-[#5BC279] bg-[#FCFFFD]' 
    : 'border-[#DF6935] bg-[#FFFCFC]'
})

const resultTextClass = computed(() => {
  return isCorrect.value 
    ? 'text-[#4AB832]' 
    : 'text-[#DF6935]'
})

const bottomInfoClass = computed(() => {
  return isCorrect.value 
    ? 'bg-[#E0F7C8]' 
    : 'bg-[#FAE0E0]'
})

const buttonClass = computed(() => {
  return isCorrect.value 
    ? 'bg-[#6EC25B] text-white hover:bg-[#5DB24A]' 
    : 'bg-[#DB5D26] text-white hover:bg-[#CA4C15]'
})

const getImageSrc = (index: number) => {
  const imageNames = ['q2_1.png', 'q2_2.png', 'q2_3.png']
  return `/quiz_everyday/images/${imageNames[index]}`
}

const getImageClass = (option: string) => {
  if (isCorrectAnswer(option)) {
    return 'border-[#5BC279] border-2'
  }
  if (isSelectedAnswer(option)) {
    return 'border-[#DF6935] border-2'
  }
  return 'border-transparent border-2'
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.log('Image failed to load:', img.src)
  console.log('Alt text:', img.alt)
  img.style.display = 'none'
}

const getOptionClass = (option: string) => {
  if (quizStore.isCorrectAnswer(1, option)) {
    return 'border-[#5BC279] bg-[#FCFFFD]'
  }
  if (quizStore.isSelectedAnswer(1, option)) {
    return 'border-[#DF6935] bg-[#FFFCFC]'
  }
  return 'border-gray-200'
}

const getRadioClass = (option: string) => {
  if (quizStore.isCorrectAnswer(1, option)) {
    return 'border-[#5BC279]'
  }
  if (quizStore.isSelectedAnswer(1, option)) {
    return 'border-[#DF6935]'
  }
  return 'border-gray-300'
}

const isCorrectAnswer = (option: string) => {
  return quizStore.isCorrectAnswer(1, option)
}

const isSelectedAnswer = (option: string) => {
  return quizStore.isSelectedAnswer(1, option)
}

const explanation = '在UI设计中，色彩搭配需要遵循一定的原则。主色调应该占据60%的空间，辅助色占30%，强调色占10%。这样的比例分配能够创造视觉层次，同时保持整体和谐。'

const nextQuestion = () => {
  router.push('/question3')
}
</script> 