import { Link } from 'react-router-dom'
import styles from './MenuMobile.module.css'
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { BiAdjust } from "react-icons/bi"
import { useEffect, useRef, useState } from 'react'
import LinkDestacado from 'Components/LinkDestacado'

export default function Menu() {
    const listMenu = [ 'HOME', 'PROJETOS', 'HABILIDADES', 'SOBRE MIM', 'CONTATO' ]
    const tema__noturno = JSON.parse(localStorage.getItem('tema__noturno'))
    const [noturno, setNoturno] = useState(tema__noturno)
    const [menuAberto, setMenuAberto] = useState(false)
    const icon__tema = useRef(null)
    const menu__hamburguer = useRef(null)
    const menu__hamburguer__linha1 = useRef(null)
    const menu__hamburguer__linha2 = useRef(null)
    const menu__hamburguer__linha3 = useRef(null)
    const menu__container = useRef(null)
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

    useEffect(() =>{

        function abrirMenu() {
            menu__container.current.style.top = 0
            menu__hamburguer__linha1.current.style.transform = 'translateY(15px) rotate(45deg)'
            menu__hamburguer__linha2.current.style.opacity = '0'
            menu__hamburguer__linha3.current.style.transform = 'translateY(-15px) rotate(-45deg)'
        }
        function fecharMenu() {
            menu__container.current.style.top = '-100vh'
            menu__hamburguer__linha1.current.style.transform = 'translateY(0px) rotate(0deg)'
            menu__hamburguer__linha2.current.style.opacity = '1'
            menu__hamburguer__linha3.current.style.transform = 'translateY(0px) rotate(0deg)'
        }

        menuAberto ? abrirMenu() : fecharMenu()

    }, [menuAberto])

    function temaSite(temaSite) {
        if (!temaSite) {
            tema.setProperty('--cor-1', '#202734')
            tema.setProperty('--cor-2', '#f4f4f4')
        }else {
            tema.setProperty('--cor-1', '#f4f4f4')
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
        <header className={styles.menuMobile}>
            <div 
                ref={menu__hamburguer}
                className={styles.hamburguer}
                onClick={
                    () => {
                        setMenuAberto(!menuAberto)
                    } 
                }
            >
                    <span ref={menu__hamburguer__linha1}></span>
                    <span ref={menu__hamburguer__linha2}></span>
                    <span ref={menu__hamburguer__linha3}></span>
            </div>
            <section ref={menu__container}>
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
                    </ul>
                </nav>
            </section>
        </header>
    )
}