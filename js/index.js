const passengerDiv = document.getElementById('passengerDiv')
const passengerForm = document.getElementById('passengerForm')
const confirmButton = document.getElementById('confirmButton')

passengerDiv.addEventListener('click', () => {
	passengerForm.style.display = 'block'
})

const countOfPas = document.getElementById('count_of_pas')
const classOfPas = document.getElementById('class_of_pas')

confirmButton.addEventListener('click', () => {
	const adults = document.getElementById('adults_input').value
	const children = document.getElementById('children').value
	const babies = document.getElementById('babies').value
	countOfPas.textContent =
		parseInt(adults) + parseInt(children) + parseInt(babies)
	const selectedOption = document.querySelector('input[name="class"]:checked')

	if (selectedOption) {
		classOfPas.textContent = selectedOption.value
	}
	passengerForm.style.display = 'none'
})

window.addEventListener('click', event => {
	if (event.target !== passengerDiv && !passengerForm.contains(event.target)) {
		passengerForm.style.display = 'none'
	}
})

const inputs = [
	document.getElementById('adults_input'),
	document.getElementById('children'),
	document.getElementById('babies'),
]

const errorMessage = document.getElementById('error-message')

function getTotalSum() {
	return inputs.reduce((sum, input) => sum + Number(input.value), 0)
}

function updateValue(inputId, change) {
	const input = document.getElementById(inputId)
	let currentValue = Number(input.value)
	let newValue = currentValue + change

	if (newValue < 0) newValue = 0

	if (getTotalSum() + change > 9) {
		errorMessage.style.display = 'block'
		return
	}

	errorMessage.style.display = 'none'
	input.value = newValue
}

document.querySelectorAll('.plus_button').forEach(button => {
	button.addEventListener('click', function () {
		updateValue(this.dataset.target, 1)
	})
})

document.querySelectorAll('.minus_button').forEach(button => {
	button.addEventListener('click', function () {
		updateValue(this.dataset.target, -1)
	})
})

inputs.forEach(input => {
	input.addEventListener('input', function () {
		let totalSum = getTotalSum()

		if (Number(this.value) > 9) this.value = 9
		if (Number(this.value) < 0) this.value = 0

		if (totalSum > 9) {
			this.value = Math.max(0, 9 - (totalSum - Number(this.value)))
			errorMessage.style.display = 'block'
		} else {
			errorMessage.style.display = 'none'
		}
	})
})

const inputFrom = document.getElementById('inputField_from')
const inputTo = document.getElementById('inputField_to')
const spanFrom = document.getElementById('SpanFrom')
const spanTo = document.getElementById('SpanTo')

inputFrom.addEventListener('focus', () => {
	spanFrom.style.top = '5px'
	spanFrom.style.left = '5px'
	spanFrom.style.fontSize = '14px'
})

inputFrom.addEventListener('blur', () => {
	if (inputFrom.value !== '') {
		return
	} else {
		spanFrom.style.top = '20px'
		spanFrom.style.left = '0'
		spanFrom.style.fontSize = '16px'
	}
})
inputTo.addEventListener('focus', () => {
	spanTo.style.top = '5px'
	spanTo.style.left = '5px'
	spanTo.style.fontSize = '14px'
})

inputTo.addEventListener('blur', () => {
	if (inputTo.value !== '') {
		return
	} else {
		spanTo.style.top = '20px'
		spanTo.style.left = '0'
		spanTo.style.fontSize = '16px'
	}
})

const cities = [
	{ name: 'Варшава', code: 'WAW' },
	{ name: 'Кишинев', code: 'RMO' },
	{ name: 'Балице', code: 'KRK' },
	{ name: 'Берлин', code: 'BER' },
	{ name: 'Лондон', code: 'LON' },
	{ name: 'Париж', code: 'PAR' },
]

function setupAutocomplete(inputId, listId) {
	const input = document.getElementById(inputId)
	const list = document.getElementById(listId)

	input.addEventListener('input', function () {
		const value = this.value.trim().toLowerCase()
		list.innerHTML = ''

		if (value === '') {
			list.style.display = 'none'
			return
		}

		const filteredCities = cities.filter(city =>
			city.name.toLowerCase().includes(value)
		)

		if (filteredCities.length > 0) {
			list.style.display = 'block'

			const selectedCity = document.createElement('div')
			selectedCity.classList.add('selected-city')
			selectedCity.innerHTML = `<span>${filteredCities[0].name}</span> <span class="remove-icon">✖</span>`
			list.appendChild(selectedCity)

			const sectionHeader = document.createElement('div')
			sectionHeader.classList.add('autocomplete-section')
			sectionHeader.textContent = 'Ближайшие аэропорты'
			list.appendChild(sectionHeader)

			filteredCities.forEach(city => {
				const item = document.createElement('div')
				item.classList.add('autocomplete-item')
				item.innerHTML = `<span><span class="city-icon">📍</span> ${city.name}</span> <span>${city.code}</span>`

				item.addEventListener('click', function () {
					input.value = city.name
					list.style.display = 'none'
				})

				list.appendChild(item)
			})

			selectedCity
				.querySelector('.remove-icon')
				.addEventListener('click', function () {
					list.style.display = 'none'
				})
		}
	})

	document.addEventListener('click', function (event) {
		if (!input.contains(event.target) && !list.contains(event.target)) {
			list.style.display = 'none'
		}
	})
}

setupAutocomplete('inputField_from', 'autocompleteListFrom')
setupAutocomplete('inputField_to', 'autocompleteListTo')

document.getElementById('search_button').addEventListener('click', function () {
	let fromValue = document.getElementById('inputField_from').value
	let toValue = document.getElementById('inputField_to').value
	let countOfPas = document.getElementById('count_of_pas').textContent
	let classOfPas = document.getElementById('class_of_pas').textContent

	console.log('Откуда: ', fromValue)
})

const burgerMenu = document.getElementById('hamburger')
const navLinks = document.getElementById('header_menu_links')

burgerMenu.addEventListener('click', () => {
	navLinks.classList.toggle('open')
})
