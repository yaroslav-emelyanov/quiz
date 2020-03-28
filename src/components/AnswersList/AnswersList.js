import React from 'react'
import classes from './AnswersList.scss'

import AnswerItem from './AnswerItem'

const Answerslist = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map(answer => (
            <AnswerItem state={props.state ? props.state[answer.id] : null} 
                        onAnswerClick={props.onAnswerClick} 
                        answer={answer} 
                        key={answer.id}
                        />
        ))}
    </ul>
)

export default Answerslist