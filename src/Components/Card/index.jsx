import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card({ title, descricao, tags, img, to }) {
    return (
        <Link className={styles.card} to={to} target="_blank">
            <div 
                className={styles.img}
                style={{backgroundImage: `url(${img})`}}
            >
            </div>
            <div className={styles.description}>
                <h3>{title}</h3>
                <p>{descricao}</p>
                <div>
                    {tags.map((tag, index) => (
                        <div key={index}>
                            <p>{tag}</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </Link>
    )
}