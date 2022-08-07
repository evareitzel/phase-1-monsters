function renderMonster(monster) {
  const monsterCard = document.createElement('div')
  const name = document.createElement('h2')
  name.innerHTML = monster.name
  const age = document.createElement('p')
  age.innerHTML = `Age: ${Math.trunc(monster.age)}`
  const description = document.createElement('p')
  description.innerHTML = monster.description

  monsterCard.append(name, age, description)
  document.querySelector('#monster-container').append(monsterCard)
}

function createMonster() {
  const form = document.createElement('form')
  form.addEventListener('submit', handleSubmit)

  const title = document.createElement('p')
  title.innerHTML = 'Create a monster'

  const nameInput = document.createElement('input')
  nameInput.type = 'text'
  nameInput.placeholder = 'Name'
  nameInput.setAttribute('ID', 'name_input')

  const ageInput = document.createElement('input')
  ageInput.type = 'text'
  ageInput.placeholder = 'Age'
  ageInput.setAttribute('ID', 'age_input')

  const descriptionInput = document.createElement('input')
  descriptionInput.type = 'text'
  descriptionInput.placeholder = 'Description'
  descriptionInput.setAttribute('ID', 'description_input')

  const newMonsterBtn = document.createElement('input')
  newMonsterBtn.type = 'submit'
  newMonsterBtn.value = 'Create new monster'

  form.append(title, nameInput, ageInput, descriptionInput, newMonsterBtn)
  document.querySelector('#create-monster').append(form)
}

function traversePages() {
  const backBtn = document.querySelector('#back')
  backBtn.addEventListener('click', handleBackClick)
  const forwardBtn = document.querySelector('#forward')
  forwardBtn.addEventListener('click', handleForwardClick)
  // const pageNum = 1
}

function handleSubmit(e) {
  e.preventDefault()
  const newMonster = {
    name: e.target.name_input.value,
    age: e.target.age_input.value,
    description: e.target.description_input.value
  }
  renderMonster(newMonster)
  renderNewMonster(newMonster)
}

function handleBackClick() { // e // pageNum
  document.querySelector('#monster-container').innerText = ''
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)  // interpolate page no  // ${pageNum ++}
  .then(resp => resp.json())
  .then(function (data) {
    data.forEach((monster) => {
      renderMonster(monster)
    })
  })
}

function handleForwardClick() {
  document.querySelector('#monster-container').innerText = ''
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=2`)
  .then(resp => resp.json())
  .then(function (data) {
    data.forEach((monster) => {
      renderMonster(monster)
    })
  })
}

function getMonsters() {
  fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
  .then(resp => resp.json())
  // .then((monsterData) => console.log(monsterData))
  .then(function (data) {
    monsterArray = data
    data.forEach((monster) => {
      renderMonster(monster)
    })
  })
}

function renderNewMonster(newMonster) {
  fetch('http://localhost:3000/monsters/?_limit=50', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newMonster)
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}

document.addEventListener('DOMContentLoaded', () => {
  getMonsters()
  createMonster()
  traversePages()
})