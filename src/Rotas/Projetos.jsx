import LinkWhatsApp from "Components/LinkWhatsApp";
import PrincipaisProjetos from "Components/PrincipaisProjetos";

export default function Projetos() {
    const numeroWhats = '554199497870'
    const mensagemWhats = 'Olá, adorei seu portfólio, vamos conversar?'

    return(
        <main>
            <PrincipaisProjetos />
            <LinkWhatsApp numeroWhats={numeroWhats} mensagemWhats={mensagemWhats}/>
        </main>
    )
}