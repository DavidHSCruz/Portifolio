import gsap from "gsap"

export function singleBlinkAnimate(blinkTl) {
    blinkTl.current = gsap.timeline()

    blinkTl.current.to(".eyelidTopBlink", { y: 15, duration: 0.1, ease: "power1.in" })
    .to(".eyelidBottomBlink", { y: -15, duration: 0.1, ease: "power1.in" }, 0)
    .to(".eyelidTopBlink", { y: 0, duration: 0.15, ease: "power1.out" }, "+=0.1")
    .to(".eyelidBottomBlink", { y: 0, duration: 0.15, ease: "power1.out" }, "<")

    return blinkTl.current
}

export function startBlinkAnimateLoop(blinkTl, blinkActive, blinkTimeout) {
    blinkActive.current = true // ativa o loop
    
    function loop() {
        if (!blinkActive.current) return // para ser desativado

        const delay = gsap.utils.random(2, 10, 0.1, true)
        const doubleBlinkChance = Math.random() < 0.10

        singleBlinkAnimate(blinkTl)

        if (doubleBlinkChance) gsap.delayedCall(0.3, () => singleBlinkAnimate(blinkTl))

        blinkTimeout.current = gsap.delayedCall(delay, loop)
    }

    loop()
}

export function stopBlinkAnimateLoop(blinkTl, blinkActive, blinkTimeout) {
    blinkActive.current = false
    
    if (blinkTimeout.current) blinkTimeout.current.kill()
    if (blinkTl.current) blinkTl.current.kill()
}

export function enterAnimate(enterTl, avatarRef, idleTl, setLookAtPosition, blinkTl, blinkActive, blinkTimeout) {
    setPose(avatarRef)
    
    enterTl.current = gsap.timeline({ 
        defaults: { 
            ease: "elastic.out(1, 1)",
            duration: .3
    }})

    gsap.set(avatarRef.current, { y: 350 })
    enterTl.current.to(avatarRef.current, { y: 0, duration: 1, onComplete: () => {
        startBlinkAnimateLoop(blinkTl, blinkActive, blinkTimeout)
        idleAnimateLoop(idleTl, setLookAtPosition, blinkTl, blinkActive, blinkTimeout)
    }}, '<+1')
    .to(avatarRef.current, { y: -1.5, duration: 2, yoyo: true, repeat: -1, ease: 'power2.inOut' })
    .to('.noseBreathe', { scaleX: 1.05, scaleY: .95, duration: 2, yoyo: true, repeat: -1, ease: 'power2.inOut' }, '<-.5')
}

export function idleAnimateLoop(idleTl, setLookAtPosition, blinkTl, blinkActive, blinkTimeout) {
    if(idleTl.current) idleTl.current.kill()
    let transition = true

    idleTl.current = gsap.timeline({ 
        defaults: { 
            ease: "power2.inOut",
            duration: .2
        },
        repeat: transition ? 0 : -1,
        onComplete: () => {
            transition && idleAnimateLoop(idleTl, setLookAtPosition, blinkTl, blinkActive, blinkTimeout)
            transition = false
        }
    })

    idleTl.current
    .to('.neck', { rotation: 0, duration: .5 })
    .to('.neck', { y: 0, duration: .5 }, '-=.3')
    .to('.head', { x: 0, y: 0, rotate: 0, duration: .5, onStart: () => {
        setLookAtPosition(.1, .5)
    }}, '<')
    .to('.eyebrowLeft, .eyebrowRight', { y: 15, onStart: () => stopBlinkAnimateLoop(blinkTl, blinkActive, blinkTimeout) }, '<+1')
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
    .to('.eyelidTop, .eyelidBottom', { y: 0, duration: .5, onComplete: () => startBlinkAnimateLoop(blinkTl, blinkActive, blinkTimeout) }, '<+1')
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

export function surpriseAnimate(boxAvatarRef, surpriseTl, idleTl, setLookAtPosition, blinkTl, blinkActive, blinkTimeout, lookAt) {
    const { left, width } = boxAvatarRef.current.getBoundingClientRect()
    const boxAvatarCenterX = lookAt.x - left - width / 2

    if(idleTl.current) idleTl.current.kill()
    if (surpriseTl.current) {
        surpriseTl.current.kill()
    }

    surpriseTl.current = gsap.timeline({ 
        defaults: { 
            ease: "power2.inOut",
            duration: .3
        },
    })

    surpriseTl.current.to('.eyeRight, .eyeLeft', { scaleX: 1.3, scaleY: 1.3, duration: .05, onStart: () => stopBlinkAnimateLoop(blinkTl, blinkActive, blinkTimeout) })
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
    .to('.head', {onComplete: () => idleAnimateLoop(idleTl,  setLookAtPosition, blinkTl, blinkActive, blinkTimeout)}, '+=1')
}
    
export function setPose(avatarRef) {
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