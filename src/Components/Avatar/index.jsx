import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Avatar.module.css'

export const Avatar = () => {
    const avatarRef = useRef(null)
    const boxAvatarRef = useRef(null)
    const lookAtRef = useRef(null)

    const [lookAt, setLookAt] = useState({ x: null, y: null })

    const enterTl = useRef(null)
    const idleTl = useRef(null)
    const surpriseTl = useRef(null)

    const blinkTl = useRef(null)
    const blinkActive = useRef(false)
    const blinkTimeout = useRef(null)


    const [earLeftTop, setEarLeftTop] = useState(null)

    function setLookAtPosition(x, y) {
        const { left, top, width, height } = boxAvatarRef.current.getBoundingClientRect()
        const posX = width * x
        const posY = height * y

        console.log(posX, posY)

        setLookAt({ x: left + posX, y: top + posY })
    }

    function singleBlinkAnimate() {
        blinkTl.current = gsap.timeline()

        blinkTl.current.to(".eyelidTopBlink", { y: 15, duration: 0.1, ease: "power1.in" })
        .to(".eyelidBottomBlink", { y: -15, duration: 0.1, ease: "power1.in" }, 0)
        .to(".eyelidTopBlink", { y: 0, duration: 0.15, ease: "power1.out" }, "+=0.1")
        .to(".eyelidBottomBlink", { y: 0, duration: 0.15, ease: "power1.out" }, "<")

        return blinkTl.current
    }

    function startBlinkAnimateLoop() {
        blinkActive.current = true // ativa o loop

        function loop() {
        if (!blinkActive.current) return // para ser desativado

        const delay = gsap.utils.random(2, 10, 0.1, true)
        const doubleBlinkChance = Math.random() < 0.10

        singleBlinkAnimate()

        if (doubleBlinkChance) gsap.delayedCall(0.3, singleBlinkAnimate)

        blinkTimeout.current = gsap.delayedCall(delay, loop)
        }

        loop()
    }

    function stopBlinkAnimateLoop() {
        blinkActive.current = false // desliga o loop
        if (blinkTimeout.current) blinkTimeout.current.kill() // cancela delayedCall pendente
        if (blinkTl.current) blinkTl.current.kill() // mata timeline ativa
    }

    function enterAnimate() {
        enterTl.current = gsap.timeline({ 
            defaults: { 
                ease: "elastic.out(1, 1)",
                duration: .3
        }})

        gsap.set(avatarRef.current, { y: 350 })
        enterTl.current.to(avatarRef.current, { y: 0, duration: 1, onComplete: () => {
            startBlinkAnimateLoop()
            idleAnimate()
        }}, '<+1')
        .to(avatarRef.current, { y: -1.5, duration: 2, yoyo: true, repeat: -1, ease: 'power2.inOut' })
        .to('.noseBreathe', { scaleX: 1.05, scaleY: .95, duration: 2, yoyo: true, repeat: -1, ease: 'power2.inOut' }, '<-.5')
    }

    function idleAnimate() {
        if(idleTl.current) idleTl.current.kill()
        let transition = true

        idleTl.current = gsap.timeline({ 
            defaults: { 
                ease: "power2.inOut",
                duration: .2
            },
            repeat: transition ? 0 : -1,
            onComplete: () => {
                transition && idleAnimate()
                transition = false
            }
        })

        idleTl.current
        .to('.neck', { rotation: 0, duration: .5 })
        .to('.neck', { y: 0, duration: .5 }, '-=.3')
        .to('.head', { x: 0, y: 0, rotate: 0, duration: .5, onStart: () => {
            setLookAtPosition(.1, .5)
        }}, '<')
        .to('.eyebrowLeft, .eyebrowRight', { y: 15, onStart: stopBlinkAnimateLoop }, '<+1')
        .to('.pupil', { scaleX: .5, scaleY: .5 }, '<')
        .to('.eyelidTopBlink, .eyelidBottomBlink', { y: 0, duration: 0.1 }, '<')
        .to('.eyelidTop', { y: 10, duration: .1}, '<')
        .to('.eyelidBottom', { y: -10, duration: .1 }, '<')
        
        .to('.nose', { scaleY: .9, duration: .5, ease: 'back.out(1.7)'})
        .to('.jaw, .mouth', { x: 0 }, '<')
        .to('.jaw, .mouth', { y: -5, scaleX: .6, scaleY: .5, duration: .5, ease: 'back.out(1.7)' }, '<')
        .to('.teethBottom', { y: -25, x: 0, duration: .5, ease: 'back.out(1.7)' }, '<')
        .to('.tongue', { y: 0, x: 0, duration: .5, ease: 'back.out(1.7)' }, '<')

        .to('.eyebrowLeft, .eyebrowRight', { y: 0, delay: 2, duration: .5 })
        .to('.eyelidTop, .eyelidBottom', { y: 0, duration: .5, onComplete: startBlinkAnimateLoop }, '<+1')
        .to('.pupil', { scaleX: 1, scaleY: 1, duration: .5 }, '<')
        .to('.pupil', { delay: 1, onComplete: () => setLookAtPosition(.9, .3) })
        .to('.mouth', { y: 40, x: -110, scaleX: .2, scaleY: .5, ease: 'back.out(1.7)' })
        .to('.jaw', { y: 50, x: -100, scaleX: .4, scaleY: .7, ease: 'back.out(1.7)' }, '<+=.02')
        .to('.teethBottom', { y: 15, ease: 'back.out(1.7)' }, '<')
        .to('.tongue', { y: 10, x: -10, ease: 'back.out(1.7)' }, '<')
        .to('.eyebrowLeft, .eyebrowRight', { y: -15 }, '<')

        .to('.head', {
            keyframes: [
                { rotate: 2, x: -3, duration: .5, ease: 'back.out(1.4)' },
                { rotate: 5, x: -6, duration: .5, ease: 'back.out(1.4)' },
                { rotate: 2, x: -3, duration: .5, ease: 'back.out(1.4)' },
                { rotate: 0, x: 0, duration: .2 }
            ]
        },'<')
        .to('.mouth', {
            keyframes: [
                { y: 40, x: -110, scaleX: .22, scaleY: .55, duration: .5, ease: 'back.out(1.4)' },
                { y: 35, x: -110, scaleX: .2, scaleY: .5, duration: .5, ease: 'back.out(1.4)' },
                { y: 38, x: -113, scaleX: .22, scaleY: .55, duration: .2, ease: 'back.out(1.4)' },
                { y: 32, x: -113, scaleX: .2, scaleY: .5, duration: .5, }
            ]
        },'<')
        .to('.jaw', {
            keyframes: [
                { y: 50, x: -100, scaleX: .42, scaleY: .75, duration: .5, ease: 'back.out(1.4)' },
                { y: 45, x: -100, scaleX: .4, scaleY: .7, duration: .5, ease: 'back.out(1.4)' },
                { y: 48, x: -105, scaleX: .42, scaleY: .75, duration: .2, ease: 'back.out(1.4)' },
                { y: 42, x: -105, scaleX: .4, scaleY: .7, duration: .5, ease: 'back.out(1.4)' },
            ]
         }, '<')
         .to('.mouth, .jaw', { x: -50, scaleX: .1, scaleY: .5, duration: .5, ease: 'back.out(1.7)'})
         .to('.mouth, .jaw', { y: 20, duration: 1 })
         .to('.mouth', { x: 25, y: 50, scaleX: 1.3, scaleY: 1, ease: 'back.out(1.7)' })
         .to('.jaw', { x: 25, y: 30, scaleX: 1.3, scaleY: 1.4, ease: 'back.out(1.7)' }, '<')
         .to('.teethBottom', { y: 25, ease: 'back.out(1.7)' }, '<')
         .to('.tongue', { y: 20, x: 0, ease: 'back.out(1.7)' }, '<')
         .to('.head', { y: 10, ease: 'back.out(1.7)' }, '<')

    }

    function surpriseAnimate() {
        const { left, width } = boxAvatarRef.current.getBoundingClientRect()
        const boxAvatarCenterX = lookAt.x - left - width / 2

        if(idleTl.current && idleTl.current.isActive()) idleTl.current.kill()
        if (surpriseTl.current) {
            surpriseTl.current.kill()
        }

        setPose()

        surpriseTl.current = gsap.timeline({ 
            defaults: { 
                ease: "power2.inOut",
                duration: .3
            },
        })

        surpriseTl.current.to('.eyeRight, .eyeLeft', { scaleX: 1.3, scaleY: 1.3, duration: .05, onStart: stopBlinkAnimateLoop })
        .to('.eyelidTopBlink, .eyelidBottomBlink', { y: 0, duration: 0.1 }, '<')
        .to('.pupil', { scaleX: .5, scaleY: .5, duration: .5, ease: 'elastic.out(1, .2)' }, '<')
        .to('.eyebrowLeft, .eyebrowRight', { y: -10, duration: .05 }, '<')
        .to('.eyelidTop', { y: -10, duration: .05 }, '<')
        .to('.eyeRight .eyelidBottom', {
            keyframes: [
                { y: -1, duration: .06 },
                { y: 1, duration: .05 },
                { y: -1, duration: .06 },
                { y: 1, duration: .05 },
            ],
            repeat: 1,
            repeatDelay: 1 
        }, '<')
        .to('.eyeLeft .eyelidBottom', { y: 5, duration: .02 }, '<')
        .to('.nose', { scaleY: 1, duration: .2 }, '<')
        .to('.mouth, .jaw', { scaleX: 1, scaleY: 1.6, x: 10, duration: .5, ease: 'elastic.out(1, .2)' }, '<')
        .to('.neck', { rotate: boxAvatarCenterX / 80, y: 15, duration: .05 }, '<')
        .to('.teethBottom, .tongue', { y: 27, x: 15, duration: .5, ease: 'elastic.out(2, .2)' }, '<')
        .to('.head', { x: boxAvatarCenterX / 50, y: 10, rotate: 0, duration: .5, ease: 'elastic.out(1, .2)' }, '<')
        .to('.head', {onComplete: idleAnimate}, '+=1')
    }
    
    function setPose() {
        const q = gsap.utils.selector(avatarRef)
        const eyes = q('.eyePosition')

        eyes.forEach(eye => {
            const pupilPosition = eye.nextElementSibling
            gsap.set(pupilPosition, { transformOrigin: '50% 50%', y: 0, x: 0, scaleX: 1, scaleY: 1 })
        })

        gsap.set('.eyeRight, .eyeLeft, .pupil, .head', { transformOrigin: '50% 50%' })
        gsap.set('.jaw, .mouth', { transformOrigin: '100% 0%', y: 0., x: 0, scaleX: .5, scaleY: .5 })
        gsap.set('.jawPosition, .mouthPosition', { transformOrigin: '100% 0%', y: 0., x: 0 })
        gsap.set('.neck, .neckRotate, .body', { transformOrigin: '50% 90%', rotate: 0 })
        gsap.set('.hairLeft, .hairLeftPosition', { transformOrigin: "left" })
        gsap.set('.hairRight, .hairRightPosition', { transformOrigin: "right" })
        gsap.set('.nose, .nosePosition', { transformOrigin: "50% 0%" })
    }

    useEffect(() => {
        const q = gsap.utils.selector(avatarRef)
        const eyes = q('.eyePosition')

        function eyesMouseAnimate(clientX, clientY) {
            eyes.forEach(eye => {
                const pupilPosition = eye.nextElementSibling
                const { left, top, width, height } = eye.getBoundingClientRect()
                
                //centro dos olhos
                const centerX = left + width / 2
                const centerY = top + height / 2

                // Distância entre mouse e centro
                let dx = clientX - centerX
                let dy = clientY - centerY

                // Raio máximo do movimento (limite circular)
                const radius = width / 2 - pupilPosition.clientWidth / 2
                const distance = Math.sqrt(dx * dx + dy * dy)
                
                // Divide o movimento (estilo "seguindo suavemente")
                dx /= 20
                dy /= 20

                // Impede que saia do círculo
                const limitedDistance = Math.sqrt(dx * dx + dy * dy)
                if (limitedDistance > radius) {
                    const angle = Math.atan2(dy, dx)
                    dx = Math.cos(angle) * radius
                    dy = Math.sin(angle) * radius
                }

                //pupilas
                gsap.to(pupilPosition, { x: dx, y: dy, duration: 0.3, ease: "power2.out" })
            })
        }

        function headMouseAnimate(clientX, clientY) {
            const { left, top, width, height } = boxAvatarRef.current.getBoundingClientRect()
            
            //centro da cabeça ao centro dos olhos
            const centerX = left + width / 2
            const centerY = top + height / 2 - 60
            
            const dx= (clientX - centerX) / 20
            const dy= (clientY - centerY) / 20

            //orelha que fica à frente dependendo da posição da cabeça
            if(dx < -7) setEarLeftTop(false)
            if(dx > 7) setEarLeftTop(true)
            if(dx > -7 && dx < 7) setEarLeftTop(null)

            gsap.defaults({ duration: 0.3, ease: "power2.out" })
            //cabelos
                //cima
                gsap.to('.hairTopPosition', { x: dx/2, y: dy/3 })
                //baixoY
                gsap.to('.hairLeftPosition, .hairRightPosition', {  y: -dy/4 })
                //baixoEsquerdaX
                gsap.to('.hairLeftPosition', {
                    x: dx >= 0 ? dx/3 : 0,
                    scaleX: 1 + dx/60
                })
                //baixoDireitaX
                gsap.to('.hairRightPosition', {
                    x: dx <= 0 ? dx/3 : 0,
                    scaleX: 1 - dx/60
                })

            //orelhas
                //Y
                gsap.to('.earLeftPosition, .earRightPosition', { y: -dy/4 })
                //esquerdaX
                gsap.to('.earLeftPosition', { x: dx >= 0 ? dx/3 : -dx/1.5 })
                //direitaX
                gsap.to('.earRightPosition', { x: dx <= 0 ? dx/3 : -dx/1.5 })

            //nariz
            gsap.to('.nosePosition', { x: dx/1.2, y: dy/1.2 })

            //olhos
            
            gsap.to('.eyelidBottom', { y: 0, duration: .5}) //pálpebra inferior aberta
            gsap.to('.pupil', { scaleX: 1, scaleY: 1, duration: .5 }) //pupila normal

                //óculos
                gsap.to('.glassesPosition', { x: dx/2, y: dy/2 })
                //sobrancelha esquerda
                gsap.to('.eyebrowLeftPosition', { y: dy/2 })
                //sobrancelha direita
                gsap.to('.eyebrowRightPosition', { y: dy < 0 ? dy : dy/1.5 })
                //pálpebra superior
                gsap.to('.eyelidTopPosition', { y: dy/2 })
                //pálpebra inferior
                gsap.to('.eyelidBottomPosition', { y: dy/5 })
                //globo ocular
                gsap.to('.eyesPosition', { x: dx/2, y: dy/2 })
            //boca
                //dentes
                gsap.to('.teethTopPosition, .teethBottomPosition, .gumPosition', { x: dx/4, y: dy/4 })
                //mandíbula
                gsap.to('.jawPosition, .mouthPosition', { x: dx/2, y: dy/2 })
            
            //cabeça
            gsap.to('.headPosition', {
                x: dx/10,
                y: dy/10,
                duration: 0.5,
                ease: "power2.out",
            })
            
            //pescoço
            gsap.to('.neckRotate', {
                rotate: dx/5,
                duration: 0.5,
                ease: "power2.out",
            })
        }

        if(lookAt.x === null || lookAt.y === null) {
            setPose()
            enterAnimate()
            return
        }
        //cabeça
        headMouseAnimate(lookAt.x, lookAt.y)
        //olhar
        eyesMouseAnimate(lookAt.x, lookAt.y)

    }, [lookAt])

    function handleMouseMove(e) {
        const { clientX, clientY } = e
        const { left, top } = boxAvatarRef.current.getBoundingClientRect()

        if(idleTl.current) {
            idleTl.current.pause()
        }

        lookAtRef.current.style.left = `${clientX - left}px`
        lookAtRef.current.style.top = `${clientY - top}px`
        
        setLookAt({ x: clientX, y: clientY })
    }

    function handleMouseLeave() {
        surpriseAnimate()
    }

    const earFront = (isFront) => (
        <>
            <g className='earLeftPosition'>
                <g className='earLeft' id="earLeft" style={{filter: !earLeftTop || earLeftTop === null ? 'brightness(.95) contrast(1.2)' : '', opacity: isFront ? getEarTop('left') ? 1 : 0 : !getEarTop('left') ? 1 : 0}}>
                    <mask id="mask0_2_99" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="26" y="136" width="24"
                        height="61">
                        <rect id="cut" x="26" y="136.695" width="24" height="60" fill="#000" />
                    </mask>
                    <g mask="url(#mask0_2_99)">
                        <rect id="earLeft_2" x="26" y="136.695" width="40" height="60" rx="15" fill="url(#paint_skin)" />
                        <path id="detail1"
                            d="M30 150.695C30 145.172 34.4772 140.695 40 140.695H41C45.9706 140.695 50 144.724 50 149.695V184.695C50 189.113 46.4183 192.695 42 192.695H34C31.7909 192.695 30 190.904 30 188.695V150.695Z"
                            fill="#C78E70" />
                        <path id="detail2"
                            d="M29 145.695C29 145.142 29.4477 144.695 30 144.695H37C42.5228 144.695 47 149.172 47 154.695V190.695C47 192.904 45.2091 194.695 43 194.695H37C32.5817 194.695 29 191.113 29 186.695V145.695Z"
                            fill="url(#paint_skin)" />
                        <circle id="detail3" cx="49.5" cy="172.195" r="10.5" fill="#C78E70" />
                        <circle id="detail4" cx="50.5" cy="172.195" r="6.5" fill="url(#paint_skin)" />
                    </g>
                </g>
            </g>
            <g className='earRightPosition'>
                <g className='earRight' id="earRight" style={{filter: earLeftTop || earLeftTop === null ? 'brightness(.95) contrast(1.2)' : '', opacity: isFront ? !getEarTop('right') ? 1: 0 : getEarTop('right') ? 1 : 0}}>
                    <mask id="mask1_2_98" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="250" y="136" width="24"
                        height="61">
                        <rect id="cut_2" x="250" y="136.695" width="24" height="60" fill="#000" />
                    </mask>
                    <g mask="url(#mask1_2_98)">
                        <rect id="earRight_2" x="234" y="136.695" width="40" height="60" rx="15" fill="url(#paint_skin)" />
                        <path id="detail1_2"
                            d="M270 150.695C270 145.172 265.523 140.695 260 140.695H259C254.029 140.695 250 144.724 250 149.695V184.695C250 189.113 253.582 192.695 258 192.695H266C268.209 192.695 270 190.904 270 188.695V150.695Z"
                            fill="#C78E70" />
                        <path id="detail2_2"
                            d="M271 145.695C271 144.59 270.105 143.695 269 143.695H263C257.477 143.695 253 148.172 253 153.695V190.695C253 192.904 254.791 194.695 257 194.695H263C267.418 194.695 271 191.113 271 186.695V145.695Z"
                            fill="url(#paint_skin)" />
                        <ellipse id="detail3_2" cx="10" cy="10.5" rx="10" ry="10.5"
                            transform="matrix(-1 0 0 1 261 161.695)" fill="#C78E70" />
                        <circle id="detail4_2" cx="6.5" cy="6.5" r="6.5" transform="matrix(-1 0 0 1 258 165.695)"
                            fill="url(#paint_skin)" />
                    </g>
                </g>
            </g>
        </>
    )

    function getEarTop(ear) {
        if(earLeftTop !== null) {
            if(earLeftTop) return true
            else return false
        }
        if(ear !== 'right') return false
        else return true
    }

    return (
        <div className={styles.container}>
            <div 
                ref={boxAvatarRef}
                className={styles.boxMouseMove}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div ref={lookAtRef} className={styles.lookAt}>
                    <span />
                    <span />
                </div>
            </div>
            <div className={styles.containerSVG}>
                <svg
                    ref={avatarRef} 
                    width='400' height='500'
                    viewBox='0 0 500 600'
                    fill="none" xmlns="http://www.w3.org/2000/svg">

                    {/* BODY */}
                    <g className="body" id="body" transform='translate(100, 50)'>
                        <rect id="body_2" y="325.695" width="300" height="378" rx="82" fill="url(#paint_shirt)" />

                        {/* NECK */}
                        <g className="neckRotate">
                            <g className="neck">
                                <rect id="neck_2" x="105" y="228.695" width="90" height="147" rx="45" fill="url(#paint_skinNeck)" />

                                {/* HEAD */}
                                <g className="headPosition">
                                    <g className="head">

                                        {earFront(false)}

                                        <rect id="face" x="50" y="43.6948" width="200" height="250" rx="60" fill="url(#paint_skin)" />

                                        {/* MOUTH */}
                                        <g id="mouth">
                                            <g className='jawPosition'>
                                                <rect className='jaw' id="jaw" x="81" y="203.695" width="138" height="68" rx="16" fill="url(#paint_skin)" />
                                            </g>
                                            <g className='mouthPosition'>
                                                <rect className='mouth' id="mouth_2" x="90" y="212.695" width="120" height="50" rx="16" fill="url(#paint_mouth)" />
                                            </g>
                                            <mask id="mask_mouth" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="40" y="152" width="220" height="171">
                                                <g className='mouthPosition'>
                                                    <rect className='mouth' x="90" y="212.695" width="120" height="50" rx="16" fill="#000" />
                                                </g>
                                            </mask>
                                            <g mask="url(#mask_mouth)">
                                                <g className='tonguePosition'>
                                                    <rect className='tongue' id="tongue" x="116" y="237.695" width="68" height="25" rx="12.5" fill="url(#paint_tongue)" />
                                                </g>
                                                <g className='teethBottomPosition'>
                                                    <rect className='teethBottom' id="teethBottom" x="87" y="258.695" width="126" height="38" rx="12" fill="#EEE3CB" />
                                                </g>
                                                <g className='teethTopPosition'>
                                                    <rect className='teethTop' id="teethTop" x="87" y="197.695" width="126" height="38" rx="12" fill="#EEE3CB" />
                                                </g>
                                                <g className='gumPosition'>
                                                    <rect className='gum' id="gum" x="77" y="195.695" width="146" height="23" rx="11.5" fill="#854C4C" />
                                                </g>
                                            </g>
                                        </g>

                                        {/* EYES */}
                                        <g className='eyesPosition'>
                                            <g className='eyes' id="eyes">
                                                <g className='eyeLeftPosition'>
                                                    <g className='eyeLeft' id="eyeLeft">
                                                        <mask id="mask3_2_16" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="77" y="119"
                                                            width="59" height="60">
                                                            <circle id="cut_4" cx="106.5" cy="148.695" r="29.5" fill="#D9D9D9" />
                                                        </mask>

                                                        <g mask="url(#mask3_2_16)">
                                                            <g className='eyePosition'>
                                                                <circle className='eye' id="eye" cx="106.5" cy="148.695" r="29.5" fill="#D9D9D9" />
                                                            </g>
                                                            <g className='pupilPosition'>
                                                                <g className='pupil' id="pupil">
                                                                    <circle id="pupil_2" cx="106" cy="148.695" r="10" fill="url(#paint_pupila)" />
                                                                    <circle id="iris" cx="106" cy="148.695" r="4" fill="#302A26" />
                                                                </g>
                                                            </g>
                                                            <circle id="highlight" cx="94.5" cy="141.195" r="7.5" fill="#fefefecc" />

                                                            <g className='eyelidBottomPosition'>
                                                                <g className='eyelidBottomBlink'>
                                                                    <path className='eyelidBottom' id="eyelidBottom"
                                                                        d="M143 164.857C138.572 160.429 73 160.857 69 164.857C69 164.857 69 196.929 104.5 196.929C143 196.929 143 164.857 143 164.857Z"
                                                                        fill="url(#paint_skin)" />
                                                                </g>
                                                            </g>
                                                            <g className='eyelidTopPosition'>
                                                                <g className='eyelidTopBlink'>
                                                                    <path className='eyelidTop' id="eyelidTop"
                                                                        d="M69 131.767C73.4282 136.195 139 135.766 143 131.767C143 131.767 143 99.6948 107.5 99.6948C69 99.6948 69 131.767 69 131.767Z"
                                                                        fill="url(#paint_skin)" />
                                                                </g>
                                                            </g>

                                                        </g>
                                                    </g>
                                                </g>
                                                <g className='eyeRightPosition'>
                                                    <g className='eyeRight' id="eyeRight">
                                                        <mask id="mask4_2_16" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="165" y="119"
                                                            width="59" height="60">
                                                            <circle id="cut_5" cx="194.5" cy="148.695" r="29.5" fill="#D9D9D9" />
                                                        </mask>

                                                        <g mask="url(#mask4_2_16)">
                                                            <g className='eyePosition'>
                                                                <circle className='eye' id="eye_2" cx="194.5" cy="148.695" r="29.5" fill="#D9D9D9" />
                                                            </g>
                                                            <g className='pupilPosition'>
                                                                <g className='pupil' id="pupil_3">
                                                                    <circle id="pupil_4" cx="194" cy="148.695" r="10" fill="url(#paint_pupila)" />
                                                                    <circle id="iris_2" cx="194" cy="148.695" r="4" fill="#302A26" />
                                                                </g>
                                                            </g>
                                                            <circle id="highlight_2" cx="182.5" cy="141.195" r="7.5" fill="#fefefecc" />

                                                            <g className='eyelidBottomPosition'>
                                                                <g className='eyelidBottomBlink'>
                                                                    <path className='eyelidBottom' id="eyelidBottom_2"
                                                                        d="M231 164.857C226.572 160.429 161 160.857 157 164.857C157 164.857 157 196.929 192.5 196.929C231 196.929 231 164.857 231 164.857Z"
                                                                        fill="url(#paint_skin)" />
                                                                </g>
                                                            </g>
                                                            <g className='eyelidTopPosition'>
                                                                <g className='eyelidTopBlink'>
                                                                    <path className='eyelidTop' id="eyelidTop_2"
                                                                        d="M157 131.767C161.428 136.195 227 135.766 231 131.767C231 131.767 231 99.6948 195.5 99.6948C157 99.6948 157 131.767 157 131.767Z"
                                                                        fill="url(#paint_skin)" />
                                                                </g>
                                                            </g>

                                                        </g>
                                                    </g>
                                                </g>
                                                <g className='eyebrowLeftPosition'>
                                                    <rect className='eyebrowLeft' id="eyebrowLeft" x="76" y="109.695" width="60" height="20" rx="9" fill="url(#paint_eyebrow)" />
                                                </g>
                                                <g className='eyebrowRightPosition'>
                                                    <rect className='eyebrowRight' id="eyebrowRight" x="164" y="109.695" width="60" height="20" rx="9" fill="url(#paint_eyebrow)" />
                                                </g>
                                            </g>
                                        </g>

                                        {/* GLASSES */}
                                        <g id="glasses" style={{filter: 'drop-shadow(0px 5px 0px #9a473630)'}}>
                                            <g id="astes">
                                                <mask id="mask1_2_16" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="50" y="43" width="200" height="251">
                                                    <rect x="50" y="43.6948" width="200" height="250" rx="60" fill="#000" />
                                                </mask>
                                                <g mask="url(#mask1_2_16)">
                                                    <g className='glassesPosition'>
                                                        <g className='glasses'>
                                                            <line id="asteLeft" x1="68.2902" y1="140.656" x2="30.4942" y2="126.899" stroke="#292935" stroke-width="5" stroke-linecap="round" />
                                                            <line id="asteRight" x1="270" y1="126.899" x2="232.204" y2="140.656" stroke="#292935" stroke-width="5" stroke-linecap="round" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                            <g className='glassesPosition'>
                                                <g className='glasses'>
                                                    <circle id="lensLeft" cx="106" cy="149.195" r="37.5" fill="#30343A" fill-opacity="0.1" stroke="#292935" stroke-width="5" />
                                                    <circle id="lensRight" cx="194" cy="149.195" r="37.5" fill="#30343A" fill-opacity="0.1" stroke="#292935" stroke-width="5" />
                                                    <line id="asteCenter" x1="144.5" y1="144.195" x2="155.5" y2="144.195" stroke="#292935" stroke-width="5" stroke-linecap="round" />
                                                </g>
                                            </g>
                                        </g>

                                        {/* HAIR */}
                                        <g id="hair">
                                            <g className='hairLeftPosition'>
                                                <path className='hairLeft' id="hairLeft" d="M50.2773 163.195V137.695C27.2773 89.6948 49.7773 39.6948 87.7773 33.1948C87.7773 33.1948 92.444 44.1948 87.7773 52.1948C81.444 69.1948 65.8773 104.295 54.2773 108.695C57.4773 118.695 56.2773 149.195 55.2773 163.195H50.2773Z" fill="url(#paint_hair)" />
                                            </g>
                                            <g className='hairRightPosition'>
                                                <path className='hairRight' id="hairRight" d="M250.573 162.695V137.195C273.572 89.1948 251.073 39.1948 213.074 32.6948C213.074 32.6948 208.407 43.6948 213.074 51.6948C219.407 68.6948 234.973 103.795 246.573 108.195C243.373 118.195 244.573 148.695 245.573 162.695H250.573Z" fill="url(#paint_hair)" />
                                            </g>
                                            <g className='hairTopPosition'>
                                                <path className='hairTop' id="hairTop" d="M234.499 41.1948L217.499 56.1948C99 105.195 27.4995 83.1948 27.4995 56.1948C27.4995 29.1948 74.4995 2.69479 132.999 0.194785C191.499 -2.30522 245.5 19.6948 234.499 41.1948Z" fill="url(#paint_hair)" />
                                            </g>
                                        </g>

                                        {/* NOSE */}
                                        <g className='nosePosition'>
                                            <g className='noseBreathe'>
                                                <rect className='nose' style={{filter: 'drop-shadow(0px 10px 0px #9a473630)'}} id="nose" x="120" y="141.695" width="60" height="95" rx="20" fill="url(#paint_skinNose)" />
                                            </g>
                                        </g>

                                        {earFront(true)}

                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <defs>
                        <linearGradient id="paint_skin" x1="150" y1="43.6948" x2="150" y2="293.695"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C79E70" />
                            <stop offset="1" stop-color="#C79470" />
                        </linearGradient>
                        <linearGradient id="paint_skinNeck" x1="150" y1="280" x2="150" y2="330"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#ba7e68" />
                            <stop offset="1" stop-color="#C79E70" />
                        </linearGradient>
                        <linearGradient id="paint_skinNose" x1="150" y1="141.695" x2="150" y2="236.695"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C78E70" />
                            <stop offset="1" stop-color="#BF7066" />
                        </linearGradient>
                        <radialGradient id="paint_mouth" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(150 237.695) rotate(90) scale(25 50)">
                            <stop stop-color="#401530" />
                            <stop offset="1" stop-color="#5C2D2D" />
                        </radialGradient>
                        <linearGradient id="paint_tongue" x1="152" y1="220" x2="150" y2="250"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#401530" />
                            <stop offset="1" stop-color="#854C4C" />
                        </linearGradient>
                        <radialGradient id="paint_pupila" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(194 148.695) rotate(90) scale(15)">
                            <stop stop-color="#593D2F" />
                            <stop offset="1" stop-color="#553128" />
                        </radialGradient>
                        <linearGradient id="paint_hair" x1="65.4257" y1="33.1948" x2="65.4257" y2="140"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1a1512" />
                            <stop offset="1" stop-color="#120e1a" />
                        </linearGradient>
                        <linearGradient id="paint_eyebrow" x1="194" y1="109.695" x2="194" y2="129.695"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1a1512" />
                            <stop offset="1" stop-color="#120e1a" />
                        </linearGradient>
                        <linearGradient id="paint_shirt" x1="150" y1="300" x2="150" y2="550"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#328272" />
                            <stop offset="1" stop-color="#20636f" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}