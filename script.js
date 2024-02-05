const div = document.querySelector('.main');

const submit = document.querySelector('#submit').addEventListener('click', ()=>{appClima(1)})
const surprise = document.querySelector('#surprise').addEventListener('click', randomAppClima)

const local = document.querySelector('.local')
const temp = document.querySelector('.temp')
const simbol = document.querySelector('#simbolo')
const rain = document.querySelector('.rain')
const pronoExt = document.querySelector('.pronoExt')
const divContent = document.querySelector('.divContent')

async function appClima(valor){
    try{
        let value
        if(valor===1){value = document.querySelector('.search').value}
        else{value = valor}
        
        const page = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ebe01db6712440338b7134120240102&q=${value}&days=3&es`)
        const content = await page.json()

        addContent(content)
        addIcons(content)
        simbol.addEventListener('click', ()=> changeSimbol(content))
        divContent.innerHTML = ""
        pronoExt.addEventListener('click', ()=> showPronoExt(content))

        //console.log(content.forecast.forecastday[0].hour[0].time)

    } catch(err){
        console.log(err)
    }
};

function randomAppClima() {
    cities = [
        "Nueva York",
        "París",
        "Tokio",
        "Londres",
        "Roma",
        "Sídney",
        "Pekín",
        "Río de Janeiro",
        "Estambul",
        "Ciudad de México",
        "Moscú",
        "El Cairo",
        "Bangkok",
        "Ciudad del Cabo",
        "Dubái",
        "Toronto",
        "Buenos Aires",
        "Mumbai",
        "Barcelona",
        "Berlín"
    ]
    // Obtener un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * cities.length);

    // Obtener el elemento aleatorio
    const elementoAleatorio = cities[indiceAleatorio];
    console.log(elementoAleatorio)
    appClima(elementoAleatorio);
}

const addContent = (content)=>{
    local.textContent = content.location.name + ", " + content.location.country
    temp.textContent = content.current.temp_c + " °C"    
    simbol.textContent = "°F"
    rain.textContent = 'Probabilidad de ⛈ lluvia diaria: ' + content.forecast.forecastday[0].day.daily_chance_of_rain + ' %'
    pronoExt.textContent = 'Mostrar prono extendido'
}

const addIcons = (content)=>{
    const img = document.querySelector('img')
    const conditionV = content.current.condition.icon
    const showIco = conditionV.slice(20) 
    img.src = `./icons${showIco}`
} 

const changeSimbol = (content)=>{
    if(simbol.textContent === "°F"){
        temp.textContent = content.current.temp_f + " °F"
        simbol.textContent = "°C"
    } else{
        temp.textContent = content.current.temp_c + " °C"
        simbol.textContent = "°F"
    }
}

const showPronoExt = (content)=>{
    divContent.innerHTML = ""
    const foreHour = content.forecast.forecastday[0].hour

    const hora = document.createElement('h3')
    hora.textContent = 'Hora'
    const temp = document.createElement('h3')
    temp.textContent = 'Temp'
    const hum = document.createElement('h3')
    hum.textContent = 'Humedad'
    const cond = document.createElement('h3')
    cond.textContent = 'Estado'
    divContent.appendChild(hora);divContent.appendChild(temp);divContent.appendChild(hum);divContent.appendChild(cond)

    foreHour.forEach(e => {
        const div = document.createElement('p')
        div.textContent = (e.time).slice(10)
        divContent.appendChild(div)

        const div1 = document.createElement('div')
        div1.textContent = e.temp_c + " °C"
        divContent.appendChild(div1)

        const div2 = document.createElement('div')
        div2.textContent = e.humidity + " %"
        divContent.appendChild(div2)

        const div3 = document.createElement('img')
        const srcCut = (e.condition.icon).slice(20)
        div3.src = `./icons${srcCut}`
        divContent.appendChild(div3)

    });
}