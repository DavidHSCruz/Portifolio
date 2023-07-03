

const tema__btn = document.querySelector('#tema')
const tema = document.documentElement.style
const tema__noturno = localStorage.getItem('tema__noturno')
const icon__noturno = document.querySelector('#icon-tema')
let noturno

testarTema()

tema__btn.addEventListener('click', () => {
    mudarTema()
})


function testarTema() {

    if (!tema__noturno) {
        noturno = false
        localStorage.setItem('tema__noturno', 'false')
    }else if (tema__noturno === 'false'){
        noturno = true
        temaSite(noturno)
    }else {
        noturno = false
        temaSite(noturno)
    }
    
}

function mudarTema() {

    if (noturno === true){
        localStorage.setItem('tema__noturno', 'false')
        temaSite(noturno)
    }else {
        localStorage.setItem('tema__noturno', 'true')
        temaSite(noturno)
    }
    
}

function temaSite(resultado) {
    if (resultado) {
        icon__noturno.setAttribute('name', 'contrast')
        tema.setProperty('--cor-1', '#202734')
        tema.setProperty('--cor-2', '#ffffff')
        noturno = false
    }else {
        icon__noturno.setAttribute('name', 'contrast-outline')
        tema.setProperty('--cor-1', '#ffffff')
        tema.setProperty('--cor-2', '#202734')
        noturno = true
    }
}