import Banner from "Components/Banner";
import LinkWhatsApp from "Components/LinkWhatsApp";
import Trajetoria from "Components/Trajetoria";

export default function Contato() {
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

    return(
        <main>
            <Banner />
            <Trajetoria title='MINHA TRAJETÓRIA' />
            <LinkWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats}/>
        </main>
    )
}