import Cards from "Components/Cards";
import LinkWhatsApp from "Components/LinkWhatsApp";

export default function Projetos() {
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

    return(
        <main>
            <Cards title='PRINCIPAIS PROJETOS' />
            <LinkWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats}/>
        </main>
    )
}