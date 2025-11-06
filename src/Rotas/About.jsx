import LinkWhatsApp from "Components/LinkWhatsApp";
import Trajetoria from "Components/Trajetoria";

export default function About() {
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

    return(
        <main>
            <Trajetoria title='MINHA TRAJETÓRIA' />
            <LinkWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats}/>
        </main>
    )
}