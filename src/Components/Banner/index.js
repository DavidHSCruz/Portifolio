import styles from './Banner.module.css'
import fotoPerfil from 'Imagens/fotoPerfil/eu.jpg'
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript, IoLogoNodejs } from "react-icons/io"
import { IoLogoReact } from "react-icons/io5"

export default function Banner() {
    return(
        <section className={styles.bannerContainer}>
            <div className={styles.inicio_esquerda}>
                <div>
                    <h1>OLÁ!</h1>
                    <h2>Bem vindo ao meu portifólio.</h2>
                    <div className={styles.tecnologias}>
                        <IoLogoHtml5 />
                        <IoLogoCss3 />
                        <IoLogoJavascript />
                        <IoLogoNodejs />
                        <IoLogoReact />
                    </div>

                </div>
            </div>
            <div className={styles.inicio_direita}>
                <div>
                    <div>
                        <img src={fotoPerfil} alt="Minha foto de perfil" />
                        <span></span>
                    </div>
                </div>
            </div>
        </section>
    )
}