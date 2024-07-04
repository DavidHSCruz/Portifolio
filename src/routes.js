import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "Rotas/Home"
import Footer from "Components/Footer"
import Menu from "Components/Menu"
import MenuMobile from "Components/MenuMobile"
import { useState } from "react"
import About from "Rotas/About"
import Contato from "Rotas/Contato"
import Projetos from "Rotas/Projetos"

export default function AppRoutes() {
    const [widthResize, setWidthResize] = useState(window.innerWidth)
    
    window.addEventListener('resize', () => {
        setWidthResize(window.innerWidth)
    })

    return(
        <BrowserRouter>
            { widthResize > 768 ? <Menu /> : <MenuMobile /> }
                
            <Routes>
                <Route index element={<Home />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/sobremim" element={<About />} />
                <Route path="/contato" element={<Contato />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}