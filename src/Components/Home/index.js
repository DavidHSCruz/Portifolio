import styles from './Home.module.css'
import fotoPerfil from 'Imagens/fotoPerfil/eu.jpg'

export default function Home() {
    return(
        <main>

            <section>
                <div className={styles.inicio_direita}>
                    <div>
                        <h1>OLÁ!</h1>
                        <h2>Bem vindo ao meu portifólio.</h2>
                    </div>
                </div>
                <div className={styles.inicio_esquerda}>
                    <div>
                        <img src={fotoPerfil} alt="Minha foto de perfil" />
                    </div>
                </div>
            </section>

            <section>
                
            </section>

        </main>
    )
}