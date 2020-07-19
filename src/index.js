fetch ('http://localhost:3000/pups')
.then(res => res.json())
.then(json => json.forEach(pup => showAllPups(pup)))

const showAllPups = (pup) => {
    const dogBar = document.querySelector('#dog-bar')
    let span = document.createElement('span')
    span.innerHTML = `
        <h2>${pup.name}</h2>
    `
    dogBar.appendChild(span)
    span.addEventListener('click', (e) => showOnePup(pup))
}

const showOnePup = (pup) => {

    const dogInfo = document.querySelector('#dog-info')
    let div = document.createElement('div')
    div.className = 'dog-info-div'
    div.id = pup.id

    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let button = document.createElement('button')

    h2.innerText = pup.name
    img.src = pup.image
    button.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
    
    div.append(h2)
    div.append(img)
    div.append(button)

    dogInfo.appendChild(div)

    button.addEventListener('click', (e) => patchPupStatus(pup))
}

const patchPupStatus = (pup) => {
    let currentDog = document.getElementById(`${pup.id}`)
    let h2 = currentDog.querySelector('h2')
    let img = currentDog.querySelector('img')
    let button = currentDog.querySelector('button')

    h2.innerText = pup.name
    img.src = pup.image
    if (button.innerText === "Good Dog!") {
        button.innerText = "Bad Dog!"
    } else if (button.innerText === "Bad Dog!") {
        button.innerText = "Good Dog!"
    }

    let status = !pup.isGoodDog

    let data = {
        id: pup.id,
        name: pup.name,
        isGoodDog: status,
        image: pup.image,
    }

    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method:'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
}