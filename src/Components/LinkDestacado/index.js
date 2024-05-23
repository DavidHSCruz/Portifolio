import { Link, useLocation } from "react-router-dom"
import styles from './LinkDestacado.module.css'

export default function LinkDestacado({ children, to, menuAberto, setMenuAberto }) {
    const localizacao = useLocation()

    return (
        <Link 
            to={ to } 
            onClick={ () => { menuAberto && setMenuAberto(!menuAberto) }}
        >
            <li className={ localizacao.pathname === '/' + to ? styles.selecionado : '' }>
                <p>{children}</p>
            </li>
        </Link>
    )
}