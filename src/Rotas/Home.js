import Banner from "Components/Banner";
import Cards from "Components/Cards";
import Tragetoria from "Components/Tragetoria";

export default function Home() {
    return(
        <main>
            <Banner />
            <Cards title='PRINCIPAIS PROJETOS' />
            <Tragetoria title='MINHA TRAGETÓRIA' />
        </main>
    )
}