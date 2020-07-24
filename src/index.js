let url1 = 'http://localhost:3000/pups' //for POST
const filterButton = document.getElementById('good-dog-filter')
filterButton.addEventListener('click', () => dogFilter())
let dogBar = document.getElementById('dog-bar')



fetch(url1)
.then(res => res.json())
.then(json => json.forEach(json => doggoNames(json))) //an array of objects, we will need to do forEach 


// create a span to list the dog names in the dog bar
const doggoNames = (dog) => {
  // let dogBar = document.getElementById('dog-bar') At the top to be global
  let span = document.createElement('span')
  span.innerText = dog.name
  dogBar.appendChild(span)

  span.addEventListener('click', () => dogInfo(dog))
}

// on <span> make a 'click' to show dog info
// create image, dog name and button with good boy or bad boy if true or false

const dogInfo = (dog) => {
  let dogInfo = document.getElementById('dog-info')
  dogInfo.innerHTML = ''
  let img = document.createElement('img')
  img.src = dog.image

  let h2 = document.createElement('h2')
  h2.innerText = dog.name

  let button = document.createElement('button')
  if (button.innerText = dog.isGoodDog === true) {
    button.innerText = 'Good Dog!'
  } else {
    button.innerText = 'Bad Dog!'
  }

  button.addEventListener('click', () => toggleDog(dog))

  dogInfo.appendChild(img)
  dogInfo.appendChild(h2)
  dogInfo.appendChild(button)

  console.log(dogInfo)
}

// PATCH 

  const toggleDog = (dog) => {
    let data = {
      isGoodDog: !dog.isGoodDog
    }
    fetch(`${url1}/${dog.id}`, {
      method: 'PATCH',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => dogInfo(json))
}  


const dogFilter = () => {
  
  let dogStatus = document.getElementById('good-dog-filter')
  let dogBar = document.getElementById('dog-bar')
  let filterStatus
    if (dogStatus.innerText === 'Filter good dogs: OFF' ){
      dogStatus.innerText = 'Filter good dogs: ON'
      filterStatus = false

    } else {

      // dogStatus.innerText === 'Filter good dogs: ON'
      dogStatus.innerText = 'Filter good dogs: OFF'
      dogBar.innerHTML = ''
      filterStatus = true
      // console.log(filteredStatus)
    }
    // console.log(filterStatus, 'filtered')
    fetch(url1)
    .then(res => res.json())
    .then(json =>{
      dogBar.innerHTML = ''
     let filterGoodDogs = json.filter(dog => dog.isGoodDog == filterStatus)
     
    filterGoodDogs.forEach(dog => {
      console.log(dog.name)
      let span = document.createElement('span')
      span.innerText = dog.name
      dogBar.appendChild(span)
      span.addEventListener('click', () => dogInfo(dog))
    })
  })
}

