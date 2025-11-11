import gsap from "gsap"
import { useEffect, useRef } from "react"
import styles from './Logo.module.css'

export const Logo = () => {
    const ran = useRef(false)

    
    
    useEffect(() => {
        const root = document.documentElement
        const corVerde = getComputedStyle(root).getPropertyValue("--cor-verde").trim()
        const cor1 = getComputedStyle(root).getPropertyValue("--cor-1").trim()
        
        const widthWindow = window.innerWidth
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: .4 } })
        
        if(ran.current) return
        ran.current = true

        tl.fromTo(`.${styles.d_verde_guia}`, 
            { transformOrigin: '100% 100%', x: widthWindow*14, opacity: 0 }, 
            { x: 180, opacity: 1, duration: 1.2, ease: "power1.out" })
        .to(`.${styles.d_verde}`, { transformOrigin: '50% 50%', rotate: -25, duration: 1, ease: "power1.inOut" }, '-=.7')
        .to(`.${styles.d_verde}`, { rotate: 360*3, duration: 1.2, ease: "power1.inOut" }, '-=.6')
        .to(`.${styles.d_verde}`, { rotate: 0, duration: 0 })
        .to(`.${styles.d_verde_guia}`, { x: 1200, duration: .8, delay: .5, ease: "power1.inOut" })
        .fromTo(`.${styles.c}`, 
            { opacity: 0, x: -45  }, 
            { opacity: 1, x: -35, duration: .8, ease: "power2.out" }, '-=.6')
        .fromTo(`.${styles.ruz} > p`, 
            { opacity: 0, x: -45 }, 
            { opacity: 1, x: 0, duration: .8, ease: "power2.out" }, '-=.6')
        .to(`.${styles.d_verde_guia}`, {transformOrigin: '50% 100%', scaleY: .8, scaleX: 1.8, duration: .2})
        .to(`.${styles.d_verde_guia}`, {scaleY: 1.2, scaleX: .8, y: -50})
        .to(`.${styles.d_verde_guia}`, {opacity: 0, duration: .2}, '-=.2')
        .to(`.${styles.d_verde_guia}`, {x: 0, y: 50, duration: 0})
        .to(`.${styles.d_verde_guia}`, {opacity: 1, duration: .2})
        .to(`.${styles.d_verde_guia}`, {scaleY: 1, scaleX: 1, y: 0}, '-=.2')
        .from(`.${styles.d_tema}`, 
            { opacity: 0, x: -45  }, '-=.6')
        .fromTo(`.${styles.avid} > p`, 
            { opacity: 0, x: -45, color: cor1, }, 
            { opacity: 1, x: -1, color: corVerde, duration: .8, ease: "power2.out" }, '-=.6')
        .to(`.${styles.c}`, {x: 7, duration: .7}, '-=.9')
        .to(`.${styles.ruz}`, {x: 43, duration: .6}, '-=.8')
        
    }, [])
    

    return (
        <div className={styles.logo_marca} alt='Logo David Cruz'>
            <div>
                <svg className={styles.d} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228.76 269.3">
                    <g>
                        <g className={styles.d_verde_guia}>
                            <path className={styles.d_verde} d="M49.94,128.12c0,31.5-.19,63.13-.58,94.89v46.29H7.88c-5.26,0-7.88-2.69-7.88-8.07,0-6.79.13-13.54.38-20.27.23-6.01.41-11.99.53-17.95.02-.71.04-1.41.05-2.12.26-14.85.48-29.67.67-44.46.19-14.79.29-29.55.29-44.28s-.07-28.42-.19-42.64c-.13-14.21-.32-28.43-.58-42.64,0-.26,0-.51-.02-.77-.13-6.15-.31-12.36-.55-18.63C.32,20.94.19,14.48.19,8.07.19,2.69,2.82,0,8.07,0h41.52v46.1h-.03c.12,13.58.22,27.21.28,40.92.07,13.7.1,27.4.1,41.1Z"/>
                        </g>
                        <path className={styles.d_tema} d="M228.76,138.88c0,26.25-5.92,49.14-17.76,68.66-3.34,5.5-7.02,10.66-11.04,15.47-10.24,12.26-22.69,22.29-37.37,30.06-20.42,10.82-43.5,16.23-69.24,16.23h-43.99v-46.29h35.54c28.55,0,51.38-7.53,68.47-22.57,17.1-15.05,25.64-37.23,25.64-66.56,0-16.64-3.52-31.59-10.56-44.85-7.04-13.25-16.9-23.72-29.58-31.4-10.24-6.21-21.91-9.91-34.99-11.1-3.11-.29-6.3-.43-9.57-.43h-44.72V0h30.51c8.56,0,16.93.49,25.1,1.47,12.35,1.47,24.24,4.06,35.69,7.75,19.01,6.15,35.56,15.92,49.65,29.3,2.52,2.39,4.91,4.92,7.19,7.58,10.48,12.21,18.46,27.26,23.93,45.14,4.73,15.62,7.1,31.5,7.1,47.64Z"/>
                    </g>
                </svg>
                <div className={styles.avid}>
                    <p>avid</p>
                </div>
                <p className={styles.c}>C</p>
                <div className={styles.ruz}>
                    <p>ruz</p>
                </div>
            </div>
        </div>
    )
}
