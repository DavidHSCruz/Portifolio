import { Link, useLocation } from "react-router-dom"
import styles from './LinkDestacado.module.css'

export default function LinkDestacado({ children, to }) {
    const localizacao = useLocation()
    return (
        <Link to={ to }>
            <li className={ localizacao.pathname === '/' + to ? styles.selecionado : '' }>
                <p>{children}</p>
            </li>
        </Link>
    )
}