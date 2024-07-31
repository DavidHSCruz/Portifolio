import Cards from "Components/Cards";

const PrincipaisProjetos = () => {
    const projetos = [
        {
            titulo: 'TIC TAC TOE',
            descricao: "Clássico jogo de estratégia com duas opções emocionantes de jogo para você se divertir e desafiar suas habilidades! Prepare-se para marcar seus X's e O's em duas modalidades distintas: o Jogo Normal e o Jogo Avançado.",
            img: '/imagens/Projetos/TicTacToe.png',
            to: 'https://davidhscruz.github.io/TIC-TAC-TOE/'
        },
        {
            titulo: 'CASA VERDE',
            descricao: "Uma plataforma de e-commerce dedicada à venda de plantas e acessórios de jardinagem.",
            img: '/imagens/Projetos/CasaVerde.png',
            to: 'https://casa-verde-dqnbzesb6-davidhscruzs-projects.vercel.app/'
        },
        {
            titulo: 'ALURA BOOKS',
            descricao: "Uma plataforma de e-commerce dedicada à venda e distribuição de livros digitais de TI.",
            img: '/imagens/Projetos/AluraBooks.png',
            to: 'https://alurabooks-tau-ten.vercel.app/'
        },
    ]
    return(
        <>
            <Cards title='PRINCIPAIS PROJETOS' data={projetos} />
        </>
    )
}

export default PrincipaisProjetos;
