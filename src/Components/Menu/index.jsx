import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Menu.module.css'
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { BiAdjust } from "react-icons/bi"
import LinkDestacado from 'Components/LinkDestacado'
import LinkMenuWhatsApp from 'Components/LinkMenuWhatsApp'
import { ModalContato } from 'Components/ModalContato'
import { Logo } from 'Components/Logo/index'
import gsap from 'gsap'

export default function Menu() {
    const listMenu = [ 'HOME', 'PROJETOS', 'SOBRE MIM' ]
    const tema__localStorage = JSON.parse(localStorage.getItem('tema__noturno'))
    const [noturno, setNoturno] = useState(tema__localStorage)
    const icon__tema = useRef(null)
    const [ contatoAberto, setContatoAberto ] = useState(false)
    
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

    const ran = useRef(false)

    const tl = gsap.timeline({ defaults: { ease: "power1.inOut", duration: 1, delay: 1 } })
    
    useEffect(() => {
        if(ran.current) return
        ran.current = true

        tl.fromTo(`.${styles.navegacao}>ul>li`,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, stagger: .2 })
    }, [])
    
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
        <header className={styles.menu}>
            <section className={styles.menuComponent}>
                
                <Logo />
            
                <nav className={styles.navegacao}>
                    <ul>
                        {
                            listMenu.map( (item, index) => (
                                <li key={ index }>
                                    <LinkDestacado
                                        key={ index }
                                        to={ item === 'HOME' ? '' : item.toLowerCase().replace(/\s+/g, '') }
                                    >
                                        { item }</LinkDestacado>
                                </li>
                            ))
                        }
                            <li onClick={() => setContatoAberto(true)}>
                                <p>CONTATO</p>
                            </li>
            
                        <ul className={styles.redes_sociais}>
                            <li>
                                <Link 
                                    to='https://github.com/DavidHSCruz'
                                    target='_blank'
                                    area-label='Abrir perfil do github'
                                >
                                    <FaGithub name="logo-github"/>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to='https://www.linkedin.com/in/david-henrique-silva-cruz-4a0762188/'
                                    target='_blank'
                                    area-label='Abrir perfil do linkedin'
                                >
                                    <FaLinkedin name="logo-linkedin"/>
                                </Link>
                            </li>
                        </ul>
            
                    </ul>
                </nav>

                <button 
                    className={styles.botao_altera_tema}
                    type="button"
                    aria-label='Alterar tema'
                    onClick={ mudarTema }
                >
                    <BiAdjust
                        ref={icon__tema}
                        className={styles.icon_tema}
                    />
                </button>
            </section>

            <ModalContato contatoAberto={contatoAberto} setContatoAberto={setContatoAberto} />
            <LinkMenuWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats} fixed />

        </header>
    )
}