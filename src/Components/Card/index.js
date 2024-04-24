import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card() {
    return (
        <Link className={styles.card} to={'/'}>
            <img src="" alt="" />
            <h3>Título</h3>
            <p>Descrição</p>
        </Link>
        
    )
}