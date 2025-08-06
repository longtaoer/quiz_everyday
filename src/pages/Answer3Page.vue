<template>
  <div class="w-full min-h-screen bg-[#F4F3EF] flex items-center justify-center p-4">
    <div class="max-w-6xl mx-auto w-full">
      <!-- 答案卡片 -->
      <div class="bg-transparent rounded-none shadow-none p-6 mb-6">
        <h2 class="text-xl font-regular text-gray-600 mb-6">{{ question.question }}</h2>
        <img src="/images/question3.svg" alt="Question 3" class="w-auto h-12 mb-6">
        
        <!-- 连线题区域 -->
        <div class="flex flex-col gap-8 justify-center">
          <!-- 上面一排：图片选项 -->
          <div class="flex gap-8 justify-center">
            <div 
              v-for="(image, index) in images" 
              :key="`image-${index}`"
              class="cursor-pointer transition-all duration-200"
            >
              <img 
                :src="getImageSrc(index)" 
                :alt="image.label" 
                class="w-40 h-auto object-contain rounded-lg border-2 transition-all duration-200"
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
              class="cursor-pointer transition-all duration-200"
            >
              <div class="bg-gray-100 w-40 h-12 rounded-lg p-4 text-center border-2 transition-all duration-200 flex items-center justify-center"
                   :class="getOptionBorderClass(index)">
                <p class="text-gray-700 font-medium">{{ option }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息区域 -->
      <div class="h-36 fixed bottom-0 left-0 right-0 p-4 bg-transparent" >
        <div class="max-w-2xl mx-auto">
          <div class="flex items-center justify-center gap-12">
            

            <!-- 挑战下一题按钮 -->
            <div class="flex-shrink-0 items-center h-full mt-8">
              <button
                @click="goToSummary"
                class="px-8 py-3 font-semibold rounded-full transition-colors"
                :class="buttonClass"
              >
              完成答题 查看今日成果
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store'

const router = useRouter()
const quizStore = useQuizStore()

const question = computed(() => quizStore.questions[2])
const userAnswer = computed(() => quizStore.getAnswer(2))
const isCorrect = computed(() => quizStore.isAnswerCorrect(2))

// 图片数据
const images = ref([
  { label: '图1', name: '设计元素A' },
  { label: '图2', name: '设计元素B' },
  { label: '图3', name: '设计元素C' }
])

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

const getImageBorderClass = (index: number) => {
  const colors = ['border-[#536EF1]', 'border-[#FFDD00]', 'border-[#E73CBF]']
  return colors[index]
}

const getOptionBorderClass = (index: number) => {
  const colors = ['border-[#536EF1]', 'border-[#FFDD00]', 'border-[#E73CBF]']
  return colors[index]
}

const resultClass = computed(() => {
  return isCorrect.value 
    ? 'border-[#5BC279] bg-[#5BC279]/10' 
    : 'border-[#DF6935] bg-[#DF6935]/10'
})

const resultTextClass = computed(() => {
  return isCorrect.value 
    ? 'text-[#5BC279]' 
    : 'text-[#DF6935]'
})

const getOptionClass = (option: string) => {
  if (quizStore.isCorrectAnswer(2, option)) {
    return 'border-[#5BC279] bg-[#5BC279]/10'
  }
  if (quizStore.isSelectedAnswer(2, option)) {
    return 'border-[#DF6935] bg-[#DF6935]/10'
  }
  return 'border-gray-200'
}

const getRadioClass = (option: string) => {
  if (quizStore.isCorrectAnswer(2, option)) {
    return 'border-[#5BC279]'
  }
  if (quizStore.isSelectedAnswer(2, option)) {
    return 'border-[#DF6935]'
  }
  return 'border-gray-300'
}

const isCorrectAnswer = (option: string) => {
  return quizStore.isCorrectAnswer(2, option)
}

const isSelectedAnswer = (option: string) => {
  return quizStore.isSelectedAnswer(2, option)
}

const explanation = '一致性是设计中的重要原则，它确保界面元素在视觉和行为上保持统一。通过保持一致的色彩、字体、间距和交互模式，用户可以更容易地理解和预测界面行为，从而提升用户体验和可用性。'

const bottomInfoClass = computed(() => {
  return isCorrect.value 
    ? 'bg-[#E0F7C8]' 
    : 'bg-[#FAE0E0]'
})

const buttonClass = computed(() => {
  return 'bg-black text-white hover:bg-gray-800'
})

const goToSummary = () => {
  router.push('/summary')
}
</script> 