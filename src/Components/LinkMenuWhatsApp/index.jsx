import styles from './LinkMenuWhatsApp.module.css'
import { IoLogoWhatsapp } from "react-icons/io"
import { Link } from 'react-router-dom'

export default function LinkMenuWhatsApp({ numeroWhats, mensagemWhats, fixed }) {
    return (
        <section className={`${styles.contato} ${fixed && styles.fixed}`}>
            <Link to={`https://api.whatsapp.com/send?phone=${numeroWhats}&text=${mensagemWhats.replace(' ', '%20')}`} target='_blank'>
                <IoLogoWhatsapp className={styles.whats} />
            </Link>
        </section>
    )
}







