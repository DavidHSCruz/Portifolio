import { BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from "./Components/Menu"
import Home from "./Components/Home"

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Menu />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projetos" element={<Home />} />
                <Route path="/habilidades" element={<Home />} />
                <Route path="/sobremim" element={<Home />} />
                <Route path="/contato" element={<Home />} />
                <Route path="https://github.com/DavidHSCruz" />
                <Route path="https://www.linkedin.com/in/david-henrique-silva-cruz-4a0762188/" />
            </Routes>
        </BrowserRouter>
    )
}