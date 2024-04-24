import { Link } from 'react-router-dom'
import styles from './Menu.module.css'
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { BiAdjust } from "react-icons/bi"
import { useEffect, useRef, useState } from 'react'
import LinkDestacado from 'Components/LinkDestacado'

export default function Menu() {
    const listMenu = [ 'HOME', 'PROJETOS', 'HABILIDADES', 'SOBRE MIM', 'CONTATO' ]
    const tema__noturno = JSON.parse(localStorage.getItem('tema__noturno'))
    const [noturno, setNoturno] = useState(tema__noturno)
    const icon__tema = useRef(null)
    const tema = document.documentElement.style

    useEffect(() => {

        function testarTema() {
            if (tema__noturno === false) {
                temaSite(noturno)
            }else if (tema__noturno === true) {
                temaSite(noturno)
            }else {
                setNoturno(false)
                localStorage.setItem('tema__noturno', false)
                temaSite(noturno)
            }
        }
    
        testarTema()
    },[noturno])

    function temaSite(temaSite) {
        if (!temaSite) {
            tema.setProperty('--cor-1', '#202734')
            tema.setProperty('--cor-2', '#ffffff')
        }else {
            tema.setProperty('--cor-1', '#ffffff')
            tema.setProperty('--cor-2', '#202734')
        }
    }

    function mudarTema() {
            
        if (noturno){
            localStorage.setItem('tema__noturno', false)
            temaSite(noturno)
        }else if (!noturno) {
            localStorage.setItem('tema__noturno', true)
            temaSite(noturno)
        }
        
    }

    return(
        <header>
            <section>
                <div className={styles.logo_marca}>
                    <p>D<i>C</i></p>
                </div>
            
                <nav className={styles.navegacao}>
                    <ul>
                        {
                            listMenu.map( item => (
                                <LinkDestacado to={ item === 'HOME' ? '' : item.toLowerCase() }>{item}</LinkDestacado>
                                ))
                        }
            
                        <ul className={styles.redes_sociais}>
                            <Link to='https://github.com/DavidHSCruz'>
                                <li>
                                    <FaGithub name="logo-github"/>
                                </li>
                            </Link>
                            <Link to='https://www.linkedin.com/in/david-henrique-silva-cruz-4a0762188/'>
                                <li>
                                    <FaLinkedin name="logo-linkedin"/>
                                </li>
                            </Link>
                        </ul>
            
                    </ul>
                </nav>

                <button 
                    className={styles.botao_altera_tema}
                    type="button"
                    onClick={ () => {
                        if (noturno) {
                            setNoturno(false)
                            mudarTema()
                        }else {
                            setNoturno(true)
                            mudarTema()
                        }
                    }}
                >
                    <BiAdjust
                        ref={icon__tema}
                        className={styles.icon_tema}
                    />
                </button>
            </section>
        </header>
    )
}