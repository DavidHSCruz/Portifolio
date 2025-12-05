import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { useMemo, useState } from 'react';
import { TbLockFilled } from "react-icons/tb";

export default function Card({ title, description: d, tags, img, to, github, updated_at, privateRepo }) {
    const [hovered, setHovered] = useState(false);
    const description = useMemo(() => {
        if(hovered) {
            return d;
        }

        return maxCharacters(d)
    }, [hovered, d]);

    function maxCharacters(text, n=90) {
        if(text.length <= n) {
            return text;
        }
        return text.substring(0, n) + '...';
    }

    return (
        <div 
            className={styles.card}
            style={{height: !hovered ? '260px' : 'auto'}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            to={to}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div 
                className={styles.img}
                style={{backgroundImage: `url(${img})`}}
            >
            </div>
            <div className={styles.description}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <h3>{title}</h3>
                    {privateRepo &&
                        <div className={styles.block_icon}>
                            <TbLockFilled />
                        </div>
                    }
                </div>
                
                <p>{description}</p>
                {hovered &&
                    <div className={styles.links}>
                        {github &&
                            <Link to={github} target="_blank" rel="noopener noreferrer"><p>Ver no GitHub</p></Link>
                        }
                        {to &&
                            <Link to={to} target="_blank" rel="noopener noreferrer"><p>Ver Projeto</p></Link>
                        }
                    </div>
                }
                <div className={styles.tags}>
                    {tags.map((tag, index) => (
                        <div key={index}>
                            <p>{tag}</p>
                        </div>
                    ))
                }
                </div>
                {hovered &&
                    <p className={styles.updated_at}>Atualizado em: {new Date(updated_at).toLocaleDateString('pt-BR')}</p>
                }
            </div>
        </div>
    )
}