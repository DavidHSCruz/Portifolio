import { Link } from 'react-router-dom'
import styles from './MenuMobile.module.css'
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { BiAdjust } from "react-icons/bi"
import { useEffect, useRef, useState } from 'react'
import LinkDestacado from 'Components/LinkDestacado'
import LinkMenuWhatsApp from 'Components/LinkMenuWhatsApp'

export default function Menu() {
    const listMenu = [ 'HOME', 'PROJETOS', 'SOBRE MIM', 'CONTATO' ]
    const tema__localStorage = JSON.parse(localStorage.getItem('tema__noturno'))
    const [noturno, setNoturno] = useState(tema__localStorage)
    const [menuAberto, setMenuAberto] = useState(false)
    const [ contatoAberto, setContatoAberto ] = useState(false)
    const icon__tema = useRef(null)
    const menu__hamburguer = useRef(null)
    const menu__hamburguer__linha1 = useRef(null)
    const menu__hamburguer__linha2 = useRef(null)
    const menu__hamburguer__linha3 = useRef(null)
    const menu__container = useRef(null)
    
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'
    
    useEffect(() => {
        const tema = document.documentElement.style

        function testarTema() {
            if (noturno === false) {
                temaSite(noturno)
            }else if (noturno === true) {
                temaSite(noturno)
            }else {
                setNoturno(false)
                localStorage.setItem('tema__noturno', false)
                temaSite(noturno)
            }
        }

        function temaSite(temaSite) {
            if (!temaSite) {
                tema.setProperty('--cor-1', '#202734')
                tema.setProperty('--cor-2', '#f4f4f4')
            }else {
                tema.setProperty('--cor-1', '#f4f4f4')
                tema.setProperty('--cor-2', '#202734')
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


    function mudarTema() {
            
        if (noturno){
            localStorage.setItem('tema__noturno', false)
            setNoturno(false)
        }else if (!noturno) {
            localStorage.setItem('tema__noturno', true)
            setNoturno(true)
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
                            listMenu.map( (item, index) => (
                                <li key={ index }>
                                    <LinkDestacado
                                        key={ index }
                                        to={ item === 'HOME' ? '' : item.toLowerCase().replace(/\s+/g, '') }
                                        menuAberto={menuAberto}
                                        setMenuAberto={setMenuAberto}
                                        contatoAberto={contatoAberto}
                                        setContatoAberto={setContatoAberto}
                                    >
                                        { item }</LinkDestacado>
                                </li>
                            ))
                        }
            
                        <ul className={styles.redes_sociais}>
                            <li>
                                <Link to='https://github.com/DavidHSCruz' target='_blank'>
                                    <FaGithub name="logo-github"/>
                                </Link>
                            </li>
                            <li>
                                <Link to='https://www.linkedin.com/in/david-henrique-silva-cruz-4a0762188/' target='_blank'>
                                    <FaLinkedin name="logo-linkedin"/>
                                </Link>
                            </li>
                        </ul>
                        <button 
                            className={styles.botao_altera_tema}
                            type="button"
                            onClick={ mudarTema }
                        >
                            <BiAdjust
                                ref={icon__tema}
                                className={styles.icon_tema}
                            />

                            <LinkMenuWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats} />

                        </button>
                    </ul>
                </nav>
            </section>
        </header>
    )
}