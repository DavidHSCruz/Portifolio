import Banner from "Components/Banner";
import Cards from "Components/Cards";
import LinkWhatsApp from "Components/LinkWhatsApp";
import Tragetoria from "Components/Tragetoria";

export default function Home() {
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

    return(
        <main>
            <Banner />
            <Cards title='PRINCIPAIS PROJETOS' />
            <Tragetoria title='MINHA TRAGETÓRIA' />
            <LinkWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats}/>
        </main>
    )
}