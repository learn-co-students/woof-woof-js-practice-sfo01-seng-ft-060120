// add pups to bar
const allPups = []
const dogBarDiv = document.getElementById('dog-bar')

const fetchAllPups = () => {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => json.map(pup => {
        allPups.push(pup);
        buildPupSpan(pup);
    }))
}

const buildPupSpan = pup => {
    let span = document.createElement('span')
    span.textContent = pup.name
    span.addEventListener('click', () => buildPupPage(pup))
    dogBarDiv.appendChild(span)
}

// show more info about pup
const dogInfoDiv = document.getElementById('dog-info')

const isGoodDog = (status) => {
    if (status === true) {
        return 'Good Dog!'
    } else {
        return 'Bad Dog!'
    }
}

const buildPupPage = (pup) => {
    dogInfoDiv.textContent = ""

    let img = document.createElement('img')
    img.src = pup.image

    let h2 = document.createElement('h2')
    h2.textContent = pup.name

    let button = document.createElement('button')
    button.textContent = isGoodDog(pup.isGoodDog)
    button.addEventListener('click', () => toggleGoodDog(pup))

    dogInfoDiv.appendChild(img)
    dogInfoDiv.appendChild(h2)
    dogInfoDiv.appendChild(button)
}

// toggle good dog
const toggleGoodDog = (pup) => {
    let data = {
        isGoodDog: (pup.isGoodDog = !pup.isGoodDog)
    }

    let configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(`http://localhost:3000/pups/${pup.id}`, configObj)
    .then(res => res.json())
    .then(json => {
        let button = dogInfoDiv.querySelector('button')
        button.textContent = isGoodDog(pup.isGoodDog)
        filterGoodDogs()
    })
}

// filter good dogs
const filterButton = document.getElementById('good-dog-filter')
filterButton.addEventListener('click', () => {
    filterButtonSwitch()
    filterGoodDogs()
})

const filterButtonSwitch = () => {
    if (filterButton.textContent === 'Filter good dogs: ON') {
        filterButton.textContent = 'Filter good dogs: OFF'
    } else {
        filterButton.textContent = 'Filter good dogs: ON'
    }
}

const filterGoodDogs = () => {
    if (filterButton.textContent === 'Filter good dogs: OFF') {
        dogBarDiv.textContent = ""
        allPups.forEach(pup => buildPupSpan(pup))
    } else {
        dogBarDiv.textContent = ""
        let filteredPups = allPups.filter(pup => pup.isGoodDog === true )
        filteredPups.forEach(pup => buildPupSpan(pup))
    }
}

// method calls
fetchAllPups()