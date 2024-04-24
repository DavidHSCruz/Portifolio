import Card from 'Components/Card'
import styles from './Cards.module.css'

export default function Cards({ title }) {
    return (
        <section className={styles.cards_container}>
            <h1>{title}</h1>
            <div className={styles.cards_component}>
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    )
}