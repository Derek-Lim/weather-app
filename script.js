async function initialize () {
  const form = document.querySelector('form')
  const input = document.querySelector('input')

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
  const tempF = document.querySelector('.temp-f')
  tempF.textContent = `${weatherData.current.temp_f}°F`
  container.append(tempF)
  // humidity
  const humidity = document.querySelector('.humidity')
  humidity.textContent = `Humidity: ${weatherData.current.humidity}`
  container.append(humidity)
}

initialize()
