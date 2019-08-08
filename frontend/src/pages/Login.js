import React, { useState } from 'react'
import './Login.css'

import api from '../services/api'
import logo from '../assets/logo.svg'

function Login(props) {

    const [username, setUsername] = useState('')
    const { history } = props

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await api.post('/devs', { username })
        const { _id } = response.data
        history.push(`/dev/${_id}`)
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