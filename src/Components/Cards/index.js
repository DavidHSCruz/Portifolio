import Card from 'Components/Card'
import styles from './Cards.module.css'
import CasaVerdeIMG from 'Imagens/Projetos/CasaVerde.jpg'
import TicTacToeIMG from 'Imagens/Projetos/TicTacToe.jpg'

export default function Cards({ title }) {
    return (
        <section className={styles.cards_container}>
            <h1>{title}</h1>
            <div className={styles.cards_component}>
                <Card 
                    title='TIC TAC TOE'
                    descricao=''
                    img={TicTacToeIMG}
                    to='https://davidhscruz.github.io/TIC-TAC-TOE/'
                />
                <Card 
                    title='CASA VERDE'
                    descricao=''
                    img={CasaVerdeIMG}
                    to='https://casa-verde-dqnbzesb6-davidhscruzs-projects.vercel.app/'
                />
                <Card 
                    title='ALURA BOOKS'
                    descricao=''
                    img=''
                    to=''
                />
            </div>
        </section>
    )
}