async function populate () {
  const header = document.querySelector('header')
  const container = document.querySelector('div.container')

  const response = await fetch('https://api.weatherapi.com/v1/current.json?key=0b98e2cd37f645f0980142451232811&q=silver spring', { mode: 'cors' })
  const weatherData = await response.json()

  // location
  const location = document.createElement('div')
  if (weatherData.location.country === 'United States of America') {
    location.textContent = `${weatherData.location.name}, ${weatherData.location.region}`
  } else {
    location.textContent = `${weatherData.location.name}, ${weatherData.location.country}`
  }
  header.append(location)
  // date
  const date = document.createElement('div')
  date.textContent = weatherData.location.localtime.split(' ')[0]
  header.append(date)
  // time
  const time = document.createElement('div')
  time.textContent = weatherData.location.localtime.split(' ')[1]
  header.append(time)
  // weather condition
  const condition = document.createElement('div')
  condition.textContent = weatherData.current.condition.text
  container.append(condition)
  // weather icon
  const img = document.createElement('img')
  img.src = weatherData.current.condition.icon
  container.append(img)
  // temperature f
  const tempF = document.createElement('div')
  tempF.textContent = `${weatherData.current.temp_f}°F`
  container.append(tempF)
  // humidity
  const humidity = document.createElement('div')
  humidity.textContent = `Humidity: ${weatherData.current.humidity}`
  container.append(humidity)
}
populate()
