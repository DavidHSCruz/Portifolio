import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card({ title, descricao, img, to }) {
    return (
        <Link className={styles.card} to={to} target="_blank">
            <div>
                <img src={img} alt='' />
            </div>
            <h3>{title}</h3>
            <p>{descricao}</p>
        </Link>
        
    )
}