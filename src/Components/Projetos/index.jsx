import Card from 'Components/Card'
import styles from './Projetos.module.css'
import { getProjetos } from 'utils/getRepositories'
import { useEffect, useState } from 'react'

const Projetos = ({title}) => {
    const [projetos, setProjetos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getRepositories() {
            const projetos = await getProjetos()
            if(projetos.length === 0) return
            
            setProjetos(projetos)
            setLoading(false)
        }

        getRepositories()
    }, [])

    if(loading) return <p>Loading...</p>

    return(
        <section className={styles.cards_container}>
            <h1>{title}</h1>
            <div className={styles.cards_component}>
                {projetos.filter(repo => repo.image && repo.name && repo.tags.length !== 0).map(repo => 
                    <Card
                        key={repo.id}
                        title={repo.name}
                        description={repo.description}
                        img={!repo.private ? repo.image : `/imagens/Projetos/${repo.name}.png`}
                        tags={repo.tags}
                        privateRepo={repo.private}
                        github={repo.url}
                        to={repo.homepage}
                        updated_at={repo.updated_at}
                    />
                )}
            </div>
        </section>
    )
}

export default Projetos
