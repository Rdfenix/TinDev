import React, { useState } from 'react'
import './Login.css'

import logo from '../assets/logo.svg'

function Login(props) {

    const [username, setUsername] = useState('')
    const { history } = props

    function handleSubmit(e) {
        e.preventDefault()
        history.push('/main')
    }

    return (
        <div className="login-container">
            <img src={logo} alt="Tindev" />
            <form onSubmit={handleSubmit}>
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text" placeholder="Digite seu usuario no Github" />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Login