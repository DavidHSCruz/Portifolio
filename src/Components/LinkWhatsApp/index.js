import styles from './LinkWhatsApp.module.css'
import { IoLogoWhatsapp } from "react-icons/io"
import { Link } from 'react-router-dom'

export default function LinkWhatsApp({ numeroWhats, mensagemWhats }) {
    return (
        <section className={styles.contato}>
            <Link 
                to={`https://api.whatsapp.com/send?phone=${numeroWhats}&text=${mensagemWhats.replace(' ', '%20')}`}
                target='_blank'
                aria-label='Click aqui para falar pelo WhatsApp'
            >
                <IoLogoWhatsapp className={styles.whats} />
                <p>Entre em contato<br/>pelo whatsapp.</p>
            </Link>
        </section>
    )
}







