import Banner from "Components/Banner"
import LinkWhatsApp from "Components/LinkWhatsApp"
import Projetos from "Components/Projetos"
import Trajetoria from "Components/Trajetoria"

export default function Home() {
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

    return(
        <main>
            <Banner />
            <Projetos title='MEUS PROJETOS'/>
            <Trajetoria title='MINHA TRAJETÓRIA' />
            <LinkWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats}/>
        </main>
    )
}