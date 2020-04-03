import React, {Component} from 'react'
import classes from './Auth.scss'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

function validateEmail(email) {
    //eslint-disable-next-line
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
}

export default class Auth extends Component{

    state = {
        isFormValid: false,
        formControls: {
            email: {
               value: '',
               type: 'email',
               label: 'Email',
               errorMessage: 'Введите корректный email',
               valid:  false,
               touched: false,
               validation: {
                   required: true, 
                   email: true
               }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid:  false,
                touched: false,
                validation: {
                    required: true, 
                    minLength: 6
                }
            }
        }
    }

   loginHandler = () => {

   }

   registerhandler = () => {

   }

   submitHandler = (e) => {
       e.preventDefalt()
   }

   validateControl (value, validation) {
       if (!validation) {
           return true
        }

       let isValid = true

       if (validation.required) {
          isValid = value.trim() !== '' && isValid
       }

       if (validation.email) {
           isValid = validateEmail(value) && isValid
       }

       if (validation.minLength) {
           isValid = value.length >= validation.minLength && isValid
       }

       return isValid
   }

   onChangeHandler = (e, controlName) => {
       console.log(`${controlName}: `, e.target.value)

       const formControls = {...this.state.formControls}
       const control = { ...formControls[controlName] }

       control.value = e.target.value
       control.touched = true
       control.valid = this.validateControl(control.value, control.validation)

       formControls[controlName] = control

       let isFormValid = true

       Object.keys(formControls).forEach(name => {
           isFormValid = formControls[name].valid && isFormValid
       })
       
       this.setState({ formControls, isFormValid})
   }

   renderInputs () {
      return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]  
            return (
                <Input 
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
      })
   }

    render () {
        return (
            <div className={classes.Auth}>
                <div>
                <h1>Авторизация</h1>
                <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                   { this.renderInputs() }
                   <Button type="success" onClick={this.lodinHadler} disabled={!this.state.isFormValid}>Войти</Button>
                   <Button type="primary" onClick={this.registerHadler} disabled={!this.state.isFormValid}>Зарегистрироваться</Button>
                </form>
                </div>
            </div>
        )
    }
}