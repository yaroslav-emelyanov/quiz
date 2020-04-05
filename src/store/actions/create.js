import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION,} from "./actionTypes";
import axios from "../../axios/axios-quiz";


export function createQuizQuestion (item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation () {
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz () {
    return async (dispatch, getState) => {
        const quiz = getState().create.quiz
        await axios.post('/quizes.json', quiz)
        dispatch(resetQuizCreation())
    }
}