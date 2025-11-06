import Banner from "Components/Banner";
import Cards from "Components/Cards";
import LinkWhatsApp from "Components/LinkWhatsApp";
import Trajetoria from "Components/Trajetoria";

export default function Contato() {
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

    return(
        <main>
            <Banner />
            <Cards title='PRINCIPAIS PROJETOS' />
            <Trajetoria title='MINHA TRAJETÓRIA' />
            <LinkWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats}/>
        </main>
    )
}