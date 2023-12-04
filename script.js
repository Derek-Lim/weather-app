async function initialize () {
  const form = document.querySelector('form')
  const input = document.querySelector('input')
  const temp = document.querySelector('.temp')

  let response = await fetch('https://api.weatherapi.com/v1/current.json?key=0b98e2cd37f645f0980142451232811&q=silver spring', { mode: 'cors' })
  let weatherData = await response.json()

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    (async () => {
      response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0b98e2cd37f645f0980142451232811&q=${input.value}`, { mode: 'cors' })
      weatherData = await response.json()
      displayData(weatherData)
    })()
  })

  temp.addEventListener('click', () => {
    if (temp.classList.contains('f')) {
      temp.textContent = `${weatherData.current.temp_c}°C`
      temp.classList.remove('f')
      temp.classList.add('c')
    } else if (temp.classList.contains('c')) {
      temp.textContent = `${weatherData.current.temp_f}°F`
      temp.classList.remove('c')
      temp.classList.add('f')
    }
  })

  displayData(weatherData)
}

function displayData (weatherData) {
  const header = document.querySelector('header')
  const container = document.querySelector('.container')
  // location
  const location = document.querySelector('.location')
  if (weatherData.location.country === 'United States of America') {
    location.textContent = `${weatherData.location.name}, ${weatherData.location.region}`
  } else {
    location.textContent = `${weatherData.location.name}, ${weatherData.location.country}`
  }
  header.append(location)
  // date
  const date = document.querySelector('.date')
  date.textContent = weatherData.location.localtime.split(' ')[0]
  header.append(date)
  // time
  const time = document.querySelector('.time')
  time.textContent = weatherData.location.localtime.split(' ')[1]
  header.append(time)
  // weather condition
  const condition = document.querySelector('.condition')
  condition.textContent = weatherData.current.condition.text
  container.append(condition)
  // weather icon
  const img = document.querySelector('.icon')
  img.src = weatherData.current.condition.icon
  container.append(img)
  // temperature f
  const temp = document.querySelector('.temp')
  temp.textContent = `${weatherData.current.temp_f}°F`
  temp.classList.add('f')
  container.append(temp)
  // humidity
  const humidity = document.querySelector('.humidity')
  humidity.textContent = `Humidity: ${weatherData.current.humidity}`
  container.append(humidity)
  // background color
  if (weatherData.current.temp_c <= 0) {
    document.body.style.backgroundColor = 'lightblue'
    header.style.backgroundColor = 'cyan'
  } else if (weatherData.current.temp_c <= 10 && weatherData.current.temp_c > 0) {
    document.body.style.backgroundColor = 'lightgreen'
    header.style.backgroundColor = 'lightblue'
  } else if (weatherData.current.temp_c <= 20 && weatherData.current.temp_c > 10) {
    document.body.style.backgroundColor = 'yellow'
    header.style.backgroundColor = 'lightgreen'
  } else if (weatherData.current.temp_c <= 30 && weatherData.current.temp_c > 20) {
    document.body.style.backgroundColor = 'orange'
    header.style.backgroundColor = 'yellow'
  } else if (weatherData.current.temp_c > 30) {
    document.body.style.backgroundColor = 'red'
    header.style.backgroundColor = 'orange'
  }
}

initialize()
