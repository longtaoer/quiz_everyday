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
        question: '请选择正确答案',
        options: ['按钮的大小应根据其功能的重要性而变化', '按钮应当至少具有一定的最小尺寸，以避免误触', '按钮大小应根据内容长短自适应', '按钮的尺寸不需要固定，根据界面布局灵活调整即可'],
        correctAnswer: '按钮应当至少具有一定的最小尺寸，以避免误触'
      },
      {
        question: '请选择正确答案',
        options: ['方案一', '方案二', '方案三'],
        correctAnswer: '方案三'
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