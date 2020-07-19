fetch('http://localhost:3000/pups')
.then(function(response){
    return response.json()
})
.then(function(json){
    renderDogs(json)
})

function renderDogs(json){
    let dogs = document.getElementById('dog-bar')
    json.forEach(dog =>{
        let div = document.createElement('div')
        let span = document.createElement('span')
        span.innerText = `${dog.name}`
        div.appendChild(span)
        dogs.appendChild(div)
        span.addEventListener('click', function(event){
            let info = document.getElementById('dog-info')
            info.innerHTML = `<h2>${dog.name}</h2>
                <img src=${dog.image}>`
            let button = document.createElement('button')
            button.className = 'like'
            button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
            button.addEventListener('click', (e) => good(e, dog))
            info.appendChild(button)
        })
    })
}

function good(e, dog){
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog
      })
    })
    let info = document.getElementById('dog-info')
    let button = document.querySelector('.like')
    console.log(info)
    if(button.innerText == 'Good Dog!'){
        button.innerText = 'Bad Dog!'
        info.appendChild(button)
    }
    else{
        button.innerText = 'Good Dog!'
        info.appendChild(button)
    }
}