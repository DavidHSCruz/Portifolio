import Card from 'Components/Card'
import styles from './Cards.module.css'

export default function Cards({ title, data }) {
    return (
        <section className={styles.cards_container}>
            <h1>{title}</h1>
            <div className={styles.cards_component}>
                {data.map((data, i) => 
                    <Card 
                        key={i}
                        title={data.titulo}
                        descricao={data.descricao}
                        img={data.img}
                        to={data.to}
                    />
                )}
            </div>
        </section>
    )
}