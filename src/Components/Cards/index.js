import Card from 'Components/Card'
import styles from './Cards.module.css'
import CasaVerdeIMG from 'Imagens/Projetos/CasaVerde.png'
import TicTacToeIMG from 'Imagens/Projetos/TicTacToe.png'
import AluraBooksIMG from 'Imagens/Projetos/AluraBooks.png'

export default function Cards({ title }) {
    return (
        <section className={styles.cards_container}>
            <h1>{title}</h1>
            <div className={styles.cards_component}>
                <Card 
                    title='TIC TAC TOE'
                    descricao="Clássico jogo de estratégia com duas opções emocionantes de jogo para você se divertir e desafiar suas habilidades! Prepare-se para marcar seus X's e O's em duas modalidades distintas: o Jogo Normal e o Jogo Avançado."
                    img={TicTacToeIMG}
                    to='https://davidhscruz.github.io/TIC-TAC-TOE/'
                />
                <Card 
                    title='CASA VERDE'
                    descricao='Uma plataforma de e-commerce dedicada à venda de plantas e acessórios de jardinagem.'
                    img={CasaVerdeIMG}
                    to='https://casa-verde-dqnbzesb6-davidhscruzs-projects.vercel.app/'
                />
                <Card 
                    title='ALURA BOOKS'
                    descricao='Uma plataforma de e-commerce dedicada à venda e distribuição de livros digitais de TI.'
                    img={AluraBooksIMG}
                    to='https://alurabooks-tau-ten.vercel.app/'
                />
            </div>
        </section>
    )
}