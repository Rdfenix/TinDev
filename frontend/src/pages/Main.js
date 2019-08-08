import React from 'react'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import './Main.css'

function Main(props) {
    const { match } = props
    return (
        <div className="main-container">
            <img src={logo} alt="TinDev" />
            <ul>
                <li>
                    <img src="https://avatars0.githubusercontent.com/u/4248081?v=4" alt="" />
                    <footer>
                        <strong>Felipe Deschamps</strong>
                        <p>Programador e cantor sertanejo nos tempos livres</p>
                    </footer>
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="like" />
                        </button>
                    </div>
                </li>
                <li>
                    <img src="https://avatars0.githubusercontent.com/u/4248081?v=4" alt="" />
                    <footer>
                        <strong>Felipe Deschamps</strong>
                        <p>Programador e cantor sertanejo nos tempos livres</p>
                    </footer>
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="like" />
                        </button>
                    </div>
                </li>
                <li>
                    <img src="https://avatars0.githubusercontent.com/u/4248081?v=4" alt="" />
                    <footer>
                        <strong>Felipe Deschamps</strong>
                        <p>Programador e cantor sertanejo nos tempos livres</p>
                    </footer>
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="like" />
                        </button>
                    </div>
                </li>
                <li>
                    <img src="https://avatars0.githubusercontent.com/u/4248081?v=4" alt="" />
                    <footer>
                        <strong>Felipe Deschamps</strong>
                        <p>Programador e cantor sertanejo nos tempos livres</p>
                    </footer>
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="like" />
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Main