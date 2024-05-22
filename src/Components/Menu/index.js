import { Link } from 'react-router-dom'
import styles from './Menu.module.css'
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { BiAdjust } from "react-icons/bi"
import { useEffect, useRef, useState } from 'react'
import LinkDestacado from 'Components/LinkDestacado'
import LinkWhatsApp from 'Components/LinkWhatsApp'

export default function Menu() {
    const listMenu = [ 'HOME', 'PROJETOS', 'HABILIDADES', 'SOBRE MIM', 'CONTATO' ]
    const tema__noturno = JSON.parse(localStorage.getItem('tema__noturno'))
    const [noturno, setNoturno] = useState(tema__noturno)
    const icon__tema = useRef(null)
    const tema = document.documentElement.style

    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

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
        <header className={styles.menu}>
            <section className={styles.menuComponent}>
                
                <div className={styles.logo_marca} alt='Logo David Cruz'>
                    <div>
                        <svg className={styles.d} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228.76 269.3">
                            <g>
                                <path className={styles.d_verde} d="M49.94,128.12c0,31.5-.19,63.13-.58,94.89v46.29H7.88c-5.26,0-7.88-2.69-7.88-8.07,0-6.79.13-13.54.38-20.27.23-6.01.41-11.99.53-17.95.02-.71.04-1.41.05-2.12.26-14.85.48-29.67.67-44.46.19-14.79.29-29.55.29-44.28s-.07-28.42-.19-42.64c-.13-14.21-.32-28.43-.58-42.64,0-.26,0-.51-.02-.77-.13-6.15-.31-12.36-.55-18.63C.32,20.94.19,14.48.19,8.07.19,2.69,2.82,0,8.07,0h41.52v46.1h-.03c.12,13.58.22,27.21.28,40.92.07,13.7.1,27.4.1,41.1Z"/>
                                <path className={styles.d_tema} d="M228.76,138.88c0,26.25-5.92,49.14-17.76,68.66-3.34,5.5-7.02,10.66-11.04,15.47-10.24,12.26-22.69,22.29-37.37,30.06-20.42,10.82-43.5,16.23-69.24,16.23h-43.99v-46.29h35.54c28.55,0,51.38-7.53,68.47-22.57,17.1-15.05,25.64-37.23,25.64-66.56,0-16.64-3.52-31.59-10.56-44.85-7.04-13.25-16.9-23.72-29.58-31.4-10.24-6.21-21.91-9.91-34.99-11.1-3.11-.29-6.3-.43-9.57-.43h-44.72V0h30.51c8.56,0,16.93.49,25.1,1.47,12.35,1.47,24.24,4.06,35.69,7.75,19.01,6.15,35.56,15.92,49.65,29.3,2.52,2.39,4.91,4.92,7.19,7.58,10.48,12.21,18.46,27.26,23.93,45.14,4.73,15.62,7.1,31.5,7.1,47.64Z"/>
                            </g>
                        </svg>
                        <div className={styles.avid}>
                            <p>avid</p>
                        </div>
                        <p className={styles.c}>C</p>
                        <div className={styles.ruz}>
                            <p>ruz</p>
                        </div>
                    </div>
                </div>
            
                <nav className={styles.navegacao}>
                    <ul>
                        {
                            listMenu.map( item => (
                                <LinkDestacado to={ item === 'HOME' ? '' : item.toLowerCase().replace(/\s+/g, '') }>{item}</LinkDestacado>
                                ))
                        }
            
                        <ul className={styles.redes_sociais}>
                            <Link to='https://github.com/DavidHSCruz' target='_blank'>
                                <li>
                                    <FaGithub name="logo-github"/>
                                </li>
                            </Link>
                            <Link to='https://www.linkedin.com/in/david-henrique-silva-cruz-4a0762188/' target='_blank'>
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
            
            <LinkWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats} fixed/>

        </header>
    )
}