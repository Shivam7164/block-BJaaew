let search = document.querySelector("#search")
let allTags = document.querySelector(".tags")
let allData = document.querySelector(".data")
let activeHouse = ''

let allPeoples = got.houses.reduce((acc, cv) => {
  return acc.concat(cv.people);
}, [])

let allName = got.houses.map(e => e.name)

// displayData
function displayData(data) {
  allData.innerHTML = ""
  data.forEach(e => {
    let li = document.createElement("li")
    let img = document.createElement("img")
    img.src = e.image
    let h2 = document.createElement("h2")
    h2.innerText = e.name
    let p = document.createElement("p")
    p.innerText = e.description
    let a = document.createElement("a")
    a.href = e.wikiLink
    a.innerText = "KNOW MORE!"
    li.append(img, h2, p, a)
    allData.append(li)
  })
}

function createTagUI(tags = []) {
  allTags.innerHTML = ""
  tags.forEach(tag => {
    let li = document.createElement("li")
    li.innerText = tag

      if(activeHouse===tag){
        li.classList.add('active')
      }else{
        li.classList.add('inactive')
      }
    
    li.addEventListener("click", (e) => {
      
      activeHouse = e.target.innerText;
      createTagUI(allName)
      let fillterData = got.houses.find(ele => ele.name == tag).people || []
      displayData(fillterData)
    })
    allTags.append(li)
  })
}

function searchVar(event) {
  let value = event.target.value;
  let searchPeople = allPeoples.filter(e => e.name.toLowerCase().includes(value.toLowerCase())
  )
  displayData(searchPeople);
}
search.addEventListener("keyup", searchVar)
displayData(allPeoples)
createTagUI(allName);