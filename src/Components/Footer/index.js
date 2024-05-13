import LinkDestacado from 'Components/LinkDestacado'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav>
                <LinkDestacado />
            </nav>
            <p><i>©</i> 2024 David Cruz</p>
        </footer>
    )
}