import React, {Component} from 'react'
import classes from './QuizCreator.scss'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

export default class QuizCreator extends Component{
    submitHandler (e) {
        e.preventDefault()
    }

    addQuestHandler () {
        console.log('click')
    }

    createQuizHandler () {

    }

    render () {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>

                        <Input />

                        <hr/>

                        <Input />
                        <Input />
                        <Input />
                        <Input />

                        <select></select>
                        <Button type='primary' onClick={this.addQuestHandler}>Добавить вопрос</Button>
                        <Button type='success' onClick={this.createQuizHandler}>Создать тест</Button>
                    </form>
                </div>
            </div>
        )
    }
}