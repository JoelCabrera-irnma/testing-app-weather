const div = document.querySelector('.main');

const submit = document.querySelector('#submit').addEventListener('click', appClima)
const local = document.querySelector('.local')
const temp = document.querySelector('.temp')
const simbol = document.querySelector('#simbolo')

let clonContent

async function appClima(){
    try{
        const value = document.querySelector('.search').value
        
        const page = await fetch(`http://api.weatherapi.com/v1/current.json?key=ebe01db6712440338b7134120240102&q=${value}`)
        const content = await page.json()
        
        local.textContent = content.location.name + ", " + content.location.country
        temp.textContent = content.current.temp_c + " °C"
        
        simbol.textContent = "°F"

        clonContent = content

        const img = document.querySelector('img')
        const conditionV = content.current.condition.icon
        const showIco = conditionV.slice(20) 
        img.src = `./icons${showIco}`
        console.log(showIco)

    } catch(err){
        console.log(err)
    }
};

const changeSimbol = ()=>{
    if(simbol.textContent === "°F"){
        temp.textContent = clonContent.current.temp_f + " °F"
        simbol.textContent = "°C"
    } else{
        temp.textContent = clonContent.current.temp_c + " °C"
        simbol.textContent = "°F"
    }
}
simbol.addEventListener('click', changeSimbol)

