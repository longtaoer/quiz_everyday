import { defineStore } from 'pinia'

export interface Question {
  question: string
  options: string[]
  correctAnswer: string
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [
      {
        question: '在UI设计中，以下哪种颜色搭配最符合现代简约风格？',
        options: ['大红配大绿', '黑白灰配蓝色', '彩虹色渐变', '荧光色配黑色'],
        correctAnswer: '黑白灰配蓝色'
      },
      {
        question: '在用户体验设计中，以下哪个原则最重要？',
        options: ['美观性', '可用性', '创新性', '复杂性'],
        correctAnswer: '可用性'
      }
    ] as Question[],
    currentQuestionIndex: 0,
    answers: [] as string[],
    isFinished: false
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentQuestionIndex],
    score: (state) => {
      return state.answers.reduce((score, answer, index) => {
        return score + (answer === state.questions[index].correctAnswer ? 1 : 0)
      }, 0)
    },
    correctAnswers: (state) => {
      return state.answers.reduce((count, answer, index) => {
        return count + (answer === state.questions[index].correctAnswer ? 1 : 0)
      }, 0)
    }
  },

  actions: {
    setAnswer(questionIndex: number, answer: string) {
      this.answers[questionIndex] = answer
    },

    getAnswer(questionIndex: number): string | null {
      return this.answers[questionIndex] || null
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
      }
    },

    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },

    finishQuiz() {
      this.isFinished = true
    },

    resetQuiz() {
      this.currentQuestionIndex = 0
      this.answers = []
      this.isFinished = false
    },

    isAnswerCorrect(questionIndex: number): boolean {
      const answer = this.answers[questionIndex]
      const question = this.questions[questionIndex]
      return answer === question.correctAnswer
    },

    isCorrectAnswer(questionIndex: number, option: string): boolean {
      const question = this.questions[questionIndex]
      return option === question.correctAnswer
    },

    isSelectedAnswer(questionIndex: number, option: string): boolean {
      const answer = this.answers[questionIndex]
      return answer === option
    }
  }
}) 