import React, { useState } from 'react'
import './login.scss'

import { connect } from 'react-redux'
import { login } from '../../redux/user/actions'
import { setAlert } from '../../redux/alert/actions'

import { validateLogin } from '../../utils'
import { Form, Popup, Button, Message } from 'semantic-ui-react'

//

const initFormErrors = {
  email: { state: false, text: '' },
  password: { state: false, text: '' }
}

//

const LoginForm = ({ login, setAlert }) => {
  const [formInputs, setFormInputs] = useState({ email: '', password: '' })
  const { email, password } = formInputs

  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState(initFormErrors)

  const [loginResponse, setLoginResponse] = useState({ show: false, errors: [] })

  const handleInputChange = e => {
    setFormErrors(initFormErrors)
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    const validateData = validateLogin(email, password)

    if (validateData.name)
      return setFormErrors({ ...formErrors, [validateData.name]: validateData.value })

    setFormLoading(true)

    const res = await login(email, password)

    // if only error
    if (res) {
      setFormLoading(false)
      setLoginResponse({ show: true, errors: res.data.errors })
      setTimeout(() => setLoginResponse({ show: false, errors: [] }), 6000)
    }

    setAlert('Logged in successfully', 'success')
  }

  return (
    <Form size="large" onSubmit={handleSubmit} loading={formLoading}>
      <Popup
        inverted
        style={{ opacity: 0.8 }}
        position="right center"
        open={formErrors.email.state}
        content={formErrors.email.text}
        trigger={
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            required
            name="email"
            value={email}
            placeholder="E-mail"
            onChange={handleInputChange}
            error={formErrors.email.state}
          />
        }
      />

      <Popup
        inverted
        style={{ opacity: 0.8 }}
        position="right center"
        open={formErrors.password.state}
        content={formErrors.password.text}
        trigger={
          <Form.Input
            fluid
            icon="lock"
            type="password"
            iconPosition="left"
            required
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleInputChange}
            error={formErrors.password.state}
          />
        }
      />

      <Button color="teal" fluid size="large" className="login-button">
        Login
      </Button>

      {loginResponse.show &&
        loginResponse.errors.map(error => (
          <Message key={error.msg} color="red" header={error.param} content={error.msg} />
        ))}
    </Form>
  )
}

export default connect(null, { login, setAlert })(LoginForm)
