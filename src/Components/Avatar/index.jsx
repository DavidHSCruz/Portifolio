import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

export const Avatar = () => {
    const boxAvatar = useRef(null)
    const [boxAvatarOver, setBoxAvatarOver] = useState(false)
    
    useEffect(() => {
        const rect = boxAvatar.current.getBoundingClientRect()
        const eyes = document.querySelectorAll('.eye')

        if (!boxAvatarOver) {
            defaultAnimation()
        }

        function handleMouseMove(e) {
            const { pageX: mouseX, pageY: mouseY } = e
            const { top, bottom, left, right } = rect
            
            if (mouseX > left && mouseX < right && mouseY > top && mouseY < bottom) {
                setBoxAvatarOver(true)
                return handleMouseMoveOverBoxAnimation(e)
            }
            return setBoxAvatarOver(false)
        }

        function defaultAnimation() {
            eyes.forEach(eye => {
                const pupil = eye.nextElementSibling
                const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: .5 } })

                tl.to(pupil, { x: 0, y: 0 })
                .to('.neck', { rotation: 0, y: 0 }, '<')
            })
        }

        function handleMouseMoveOverBoxAnimation(e) {
            eyes.forEach(eye => {
                const pupil = eye.nextElementSibling
                const rect = eye.getBoundingClientRect()
                
                //centro dos olhos
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2

                // Distância entre mouse e centro
                let dx = e.clientX - centerX
                let dy = e.clientY - centerY

                // Raio máximo do movimento (limite circular)
                const radius = rect.width / 2 - pupil.clientWidth / 2
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

                //animações
                    //cabelos
                        //cima
                        gsap.to('.hairTop', {
                            x: dx/2,
                            y: dy/3,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //baixoY
                        gsap.to('.hairLeft, .hairRight', {
                            y: -dy/4,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //baixoEsquerdaX
                        gsap.to('.hairLeft', {
                            transformOrigin: "left",
                            x: dx >= 0 ? dx/3 : 0,
                            scaleX: 1 + dx/60,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //baixoDireitaX
                        gsap.to('.hairRight', {
                            transformOrigin: "right",
                            x: dx <= 0 ? dx/3 : 0,
                            scaleX: 1 - dx/60,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                    //orelhas
                        //Y
                        gsap.to('.earLeft, .earRight', {
                            y: -dy/4,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //esquerdaX
                        gsap.to('.earLeft', {
                            x: dx >= 0 ? dx/3 : -dx/2,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //direitaX
                        gsap.to('.earRight', {
                            x: dx <= 0 ? dx/3 : -dx/2,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                    //nariz
                    gsap.to('.nose', {
                        x: dx/1.5,
                        y: dy/1.5,
                        duration: 0.3,
                        ease: "power2.out",
                    })
                    //olhos
                        //óculos
                        gsap.to('.glasses', {
                            x: dx/3,
                            y: dy/3,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //pálpebra sobrancelha esquerda
                        gsap.to('.eyebrowLeft', {
                            y: dy/2,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //pálpebra sobrancelha direita
                        gsap.to('.eyebrowRight', {
                            y: dy < 0 ? dy : dy/1.5,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //pálpebra superior
                        gsap.to('.eyelidTop', {
                            y: dy/2,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //pálpebra inferior
                        gsap.to('.eyelidBottom', {
                            y: dy/5,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //pupilas
                        gsap.to('.pupil', {
                            x: dx,
                            y: dy,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //globo ocular
                        gsap.to('.eyes', {
                            x: dx/2,
                            y: dy/2,
                            duration: 0.3,
                            ease: "power2.out",
                        })

                    //boca
                        //dentes
                        gsap.to('.teethTop, .teethBottom, .gum', {
                            x: dx/4,
                            y: dy/4,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                        //mandíbula
                        gsap.to('.jaw, .mouth', {
                            x: dx/2,
                            y: dy/2,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                    
                    //cabeça
                    gsap.to('.head', {
                        x: dx/10,
                        y: dy/10,
                        duration: 0.5,
                        ease: "power2.out",
                    })
                    
                    //pescoço
                    gsap.to('.neck', {
                        rotate: dx/5,
                        transformOrigin: '50% 90%',
                        duration: 0.5,
                        ease: "power2.out",
                    })
            })
        }

        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [boxAvatarOver])


    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',  
            position: 'relative',
            width: '80%',
            aspectRatio: '1/1'
        }}>
            <div 
                ref={boxAvatar} 
                style={{
                    position: 'absolute',
                    width: '100%', 
                    aspectRatio: '1/1',
                    zIndex: 0
                }}
            ></div>
            <div style={{ 
                backgroundColor: '#3282ff', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                overflow: 'hidden',
                width: '50%', 
                height: '60%',
                borderRadius: '50%',
                zIndex: 1
            }}>
                <svg 
                    width='300' height='400'
                    viewBox='0 0 500 600'
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="body" transform='translate(100, 50)'>
                        <rect id="body_2" y="325.695" width="300" height="378" rx="82" fill="#328272" />
                        <g className="neck">
                            <rect id="neck_2" x="105" y="228.695" width="90" height="147" rx="45" fill="#C79E70" />
                            <g className="head">
                                <rect className='earLeft' id="earLeft" x="26" y="136.695" width="40" height="60" rx="15" fill="#C79E70" />
                                <rect className='earRight' id="earRight" x="234" y="136.695" width="40" height="60" rx="15" fill="#C79E70" />
                                <rect id="face" x="50" y="43.6948" width="200" height="250" rx="60" fill="#C79E70" />
                                <g id="mouth">
                                    <rect className='jaw' id="jaw" x="81" y="203.695" width="138" height="68" rx="16" fill="#C79E70" />
                                    <rect className='mouth' id="mouth_2" x="90" y="212.695" width="120" height="50" rx="16" fill="#5C2D2D" />
                                    <mask id="mask0_2_16" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="80" y="202" width="140" height="71">
                                        <rect className='mouth' id="cut" x="90" y="212.695" width="120" height="50" rx="16" fill="#5C2D2D" />
                                    </mask>
                                    <g mask="url(#mask0_2_16)">
                                        <rect className='tongue' id="tongue" x="116" y="237.695" width="68" height="25" rx="12.5" fill="#854C4C" />
                                        <rect className='teethBottom' id="teethBottom" x="87" y="258.695" width="126" height="38" rx="12" fill="#EEE3CB" />
                                        <rect className='teethTop' id="teethTop" x="87" y="197.695" width="126" height="38" rx="12" fill="#EEE3CB" />
                                        <rect className='gum' id="gum" x="77" y="195.695" width="146" height="23" rx="11.5" fill="#854C4C" />
                                    </g>
                                </g>
                                <g className='eyes' id="eyes">
                                    <g id="eyeLeft">
                                        <circle className='eye' id="eye" cx="106.5" cy="148.695" r="29.5" fill="#D9D9D9" />
                                        <g className='pupil'>
                                            <circle id="pupil_2" cx="106" cy="148.695" r="15" fill="#593D2F" />
                                            <circle id="iris" cx="106" cy="148.695" r="4" fill="#302A26" />
                                        </g>
                                        <circle id="highlight" cx="93" cy="142.695" r="4" fill="white" />
                                        <path className='eyelidBottom' id="eyelidBottom" d="M143 164.857C138.572 160.429 73 160.857 69 164.857C69 164.857 69 196.929 104.5 196.929C143 196.929 143 164.857 143 164.857Z" fill="#C79E70" />
                                        <path className='eyelidTop' id="eyelidTop" d="M69 131.767C73.4282 136.195 139 135.766 143 131.767C143 131.767 143 99.6948 107.5 99.6948C69 99.6948 69 131.767 69 131.767Z" fill="#C79E70" />
                                        <rect className='eyebrowLeft' id="eyebrow" x="76" y="109.695" width="60" height="20" rx="9" fill="#25201D" />
                                    </g>
                                    <g id="eyeRight">
                                        <circle className='eye' id="eye_2" cx="194.5" cy="148.695" r="29.5" fill="#D9D9D9" />
                                        <g className='pupil'>
                                            <circle id="pupil_4" cx="194" cy="148.695" r="15" fill="#593D2F" />
                                            <circle id="iris_2" cx="194" cy="148.695" r="4" fill="#302A26" />
                                        </g>
                                        <circle id="highlight_2" cx="181" cy="142.695" r="4" fill="white" />
                                        <path className='eyelidBottom' id="eyelidBottom_2" d="M231 164.857C226.572 160.429 161 160.857 157 164.857C157 164.857 157 196.929 192.5 196.929C231 196.929 231 164.857 231 164.857Z" fill="#C79E70" />
                                        <path className='eyelidTop' id="eyelidTop_2" d="M157 131.767C161.428 136.195 227 135.766 231 131.767C231 131.767 231 99.6948 195.5 99.6948C157 99.6948 157 131.767 157 131.767Z" fill="#C79E70" />
                                        <rect className='eyebrowRight' id="eyebrow_2" x="164" y="109.695" width="60" height="20" rx="9" fill="#25201D" />
                                    </g>
                                </g>
                                <g id="glasses">
                                    <g id="astes">
                                        <mask id="mask1_2_16" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="50" y="43" width="200" height="251">
                                            <rect id="cut_2" x="50" y="43.6948" width="200" height="250" rx="60" fill="#C79E70" />
                                        </mask>
                                        <g mask="url(#mask1_2_16)">
                                            <line className='glasses' id="asteLeft" x1="68.2902" y1="140.656" x2="30.4942" y2="126.899" stroke="#292935" stroke-width="5" stroke-linecap="round" />
                                            <line className='glasses' id="asteRight" x1="270" y1="126.899" x2="232.204" y2="140.656" stroke="#292935" stroke-width="5" stroke-linecap="round" />
                                        </g>
                                    </g>
                                    <circle className='glasses' id="lensLeft" cx="106" cy="149.195" r="37.5" fill="#30343A" fill-opacity="0.1" stroke="#292935" stroke-width="5" />
                                    <circle className='glasses' id="lensRight" cx="194" cy="149.195" r="37.5" fill="#30343A" fill-opacity="0.1" stroke="#292935" stroke-width="5" />
                                    <line className='glasses' id="asteCenter" x1="144.5" y1="144.195" x2="155.5" y2="144.195" stroke="#292935" stroke-width="5" stroke-linecap="round" />
                                </g>
                                <g id="hair">
                                    <path className='hairLeft' id="hairLeft" d="M50.2773 163.195V137.695C27.2773 89.6948 49.7773 39.6948 87.7773 33.1948C87.7773 33.1948 92.444 44.1948 87.7773 52.1948C81.444 69.1948 65.8773 104.295 54.2773 108.695C57.4773 118.695 56.2773 149.195 55.2773 163.195H50.2773Z" fill="#25201D" />
                                    <path className='hairRight' id="hairRight" d="M250.573 162.695V137.195C273.572 89.1948 251.073 39.1948 213.074 32.6948C213.074 32.6948 208.407 43.6948 213.074 51.6948C219.407 68.6948 234.973 103.795 246.573 108.195C243.373 118.195 244.573 148.695 245.573 162.695H250.573Z" fill="#25201D" />
                                    <path className='hairTop' id="hairTop" d="M234.499 41.1948L217.499 56.1948C99 105.195 27.4995 83.1948 27.4995 56.1948C27.4995 29.1948 74.4995 2.69479 132.999 0.194785C191.499 -2.30522 245.5 19.6948 234.499 41.1948Z" fill="#25201D" />
                                </g>
                                <rect className='nose' id="nose" x="120" y="141.695" width="60" height="95" rx="20" fill="#C78E70" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    )
}