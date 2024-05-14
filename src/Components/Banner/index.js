import styles from './Banner.module.css'
import fotoPerfil from 'Imagens/fotoPerfil/eu.jpg'

export default function Banner() {
    return(
        <section>
            <div className={styles.inicio_esquerda}>
                <div>
                    <h1>OLÁ!</h1>
                    <h2>Bem vindo ao meu portifólio.</h2>
                </div>
            </div>
            <div className={styles.inicio_direita}>
                <div>
                    <img src={fotoPerfil} alt="Minha foto de perfil" />
                    <span></span>
                </div>
            </div>
        </section>
    )
}