import styles from './Tragetoria.module.css'

export default function Tragetoria({ title }) {
    return(
        <section className={styles.tragetoria}>
            <h2>{title}</h2>
            <p>
                Cresci ouvindo que tenho um perfil autoditada.<br/>
                Sempre me interessei por design e tecnologia e, hoje,<br/>
                vejo que isso tem ampliado meus horizontes.
            </p>
            <p>
                Iniciei minha trajetória profissional no comércio,<br/>
                onde desenvolvi habilidades de Liderança e<br/>
                Gestão de Equipes.
            </p>
            <p>
                Nas horas vagas, atuava como<br/>
                Designer Gráfico, Motion Design e Editor de Vídeos.<br/>
                Além disso, me qualifiquei em<br/>
                Design de Games para adquirir conhecimentos complementares.
            </p>
            <p>
                Atualmente, consigo unir essas experiências enquanto<br/>
                tenho aprimorado meus conhecimentos como<br/>
                Desenvolvedor Web Front-end, com noções de HTML,<br/>
                CSS3, JavaScript, Node.js, React, git e Github.
            </p>
            <p>
                Busco aprendizado continuo e estou aberto a novos desafios.
            </p>
        </section>
    )
}