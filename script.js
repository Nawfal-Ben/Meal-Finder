const searchInput = document.getElementById("search-input")
const searchForm = document.getElementById("search-form")
const randomSearchBtn = document.getElementById("random-search")
const searchArea = document.getElementById("search-area")
const mealInfo = document.getElementById("meal-informations")

// add Event listeners
searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    searchInput.value !== "" ? searchMeals() : false
    searchInput.value = ""
})
randomSearchBtn.addEventListener("click", getRandomMeal)

// Search for meals with keyword
async function searchMeals() {
    mealInfo.innerHTML = ""
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
    const meals = (await response.json()).meals
    if (meals) {

        searchArea.innerHTML = `<p>Search results for '<span class="search-keyword">${searchInput.value}</span>':</p>
        <div class="search-results" id="search-results">
        </div>`

        const searchResults = document.getElementById("search-results")
        meals.forEach(meal => {
            const div = document.createElement("div")
            const img = document.createElement("img")
            const span = document.createElement("span")
            div.addEventListener("click", () => showDetails(meal))
            span.innerText = meal.strMeal
            img.setAttribute("src", meal.strMealThumb)
            div.append(span, img)
            searchResults.appendChild(div)
        });

    } else {
        searchArea.innerHTML = "There are no search results. Try again!"
    }
}

// show Deatils
function showDetails(mealDetails) {
    mealInfo.innerHTML = `
    <h2>${mealDetails.strMeal}</h2>
    <div class="meal-image">
        <img src="${mealDetails.strMealThumb}">
    </div>
    <div class="meal-name">
        <span>${mealDetails.strCategory}</span>
        <span>${mealDetails.strArea}</span>
    </div>
    <p>
        ${mealDetails.strInstructions}
    </p>
    <h3>Ingredients</h3>
    <div class="ingredients" id="ingredients">
    </div>`
    const ingredients = document.getElementById("ingredients")
    for (let i = 1; i <= 20; i++) {
        if (mealDetails[`strIngredient${i}`] !== "") {
            const span = document.createElement("span")
            span.innerText = mealDetails[`strIngredient${i}`] + " - " + mealDetails[`strMeasure${i}`]
            ingredients.appendChild(span)
        }
    }
}

// get random meal
async function getRandomMeal() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    const meal = (await response.json()).meals[0]
    searchArea.innerHTML = "";
    showDetails(meal)
}