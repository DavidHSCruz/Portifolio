import { Link, useLocation } from "react-router-dom"
import styles from './LinkDestacado.module.css'

export default function LinkDestacado({ children, to, menuAberto, setMenuAberto }) {
    const localizacao = useLocation()

    return (
        <Link
            className={ `${'linkDestacado'} ${localizacao.pathname === '/' + to ? styles.selecionado : ''}` }
            to={ to } 
            onClick={ () => { menuAberto && setMenuAberto(!menuAberto) }}
        >
            <p>{children}</p>
        </Link>
    )
}