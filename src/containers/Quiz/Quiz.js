import React from 'react'
import classes from './Quiz.scss'

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'


class Quiz extends React.Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {id: 1, text: 'Красное'},
                    {id: 2, text: 'Синее'},
                    {id: 3, text: 'Зелёное'},
                    {id: 4, text: 'Чёрное'}
                ]
            },{
                id: 2,
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 1,
                answers: [
                    {id: 1, text: '1703'},
                    {id: 2, text: '1708'},
                    {id: 3, text: '1800'},
                    {id: 4, text: '1803'}
                ]
            }
        ]
    }

    componentDidMount () {
        console.log(this.props.match.params.id);
    }

    onAnswerClickHandler = (answerId) => {

      if (this.state.answerState) {
          const key = Object.keys(this.state.answerState)[0]
          if (this.state.answerState[key] === 'success') {
              return
          }
      }

       const question = this.state.quiz[this.state.activeQuestion]
       const results = this.state.results

       if (question.rightAnswerId === answerId) {

           if (!results[question.id]) results[question.id] = 'success'
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                }  else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }  
                window.clearTimeout(timeout)
            }, 1000)
       } else {
        results[question.id] = 'error'
        this.setState({
            answerState: {[answerId]: 'error'},
            results
        })
       }
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render () {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы:</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz results={this.state.results}
                                            quiz={this.state.quiz}
                                            onRetry={this.retryHandler}
                              />
                            : <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                          question={this.state.quiz[this.state.activeQuestion].question}
                                          onAnswerClick={this.onAnswerClickHandler}
                                          quizLength={this.state.quiz.length}
                                          answerNumber={this.state.activeQuestion + 1}
                                          state={this.state.answerState}
                              />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz