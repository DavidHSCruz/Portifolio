import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "Rotas/Home"
import Footer from "Components/Footer"
import Menu from "Components/Menu"
import MenuMobile from "Components/MenuMobile"
import { useState } from "react"

export default function AppRoutes() {
    const [widthResize, setWidthResize] = useState(window.innerWidth)
    
    window.addEventListener('resize', () => {
        setWidthResize(window.innerWidth)
    })

    return(
        <BrowserRouter>
        
            { widthResize >= 768 ? <Menu /> : <MenuMobile /> }
            
            <Routes>
                <Route index element={<Home />} />
                <Route path="/projetos" element={<Home />} />
                <Route path="/habilidades" element={<Home />} />
                <Route path="/sobremim" element={<Home />} />
                <Route path="/contato" element={<Home />} />
                <Route path="https://github.com/DavidHSCruz" />
                <Route path="https://www.linkedin.com/in/david-henrique-silva-cruz-4a0762188/" />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}