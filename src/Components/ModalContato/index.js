import styles from './ModalContato.module.css'

export const ModalContato = ({ contatoAberto, setContatoAberto }) => {

    function handleClick(e) {
        e.preventDefault()
    }

    return (
        <>
            <section className={`${styles.contato} ${contatoAberto && styles.aberto}`}>
                    <button onClick={() => setContatoAberto(false)}>X</button>
                    <form>
                        <div>
                            
                            <label>
                                <input type="text" name='nome' required/>
                                <span>Nome</span>
                            </label>

                            <label>
                                <input type="text" name='empresa' required/>
                                <span>Empresa</span>
                            </label>

                            <label>
                                <input type="email" name='email' required/>
                                <span>E-mail</span>
                            </label>
                        </div>

                        <textarea placeholder="Digite aqui sua mensagem..." />

                        <button type="submit" onClick={(e) => handleClick(e)}>Enviar</button>
                    </form>
                </section>
                <div onClick={() => setContatoAberto(false)}></div>
        </>
    )
}