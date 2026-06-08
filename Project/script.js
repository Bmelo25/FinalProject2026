const guess = document.querySelector(".guess")
const card = document.querySelector(".card")
const settings = document.querySelector(".settings")
const overlay = document.querySelector(".overlay")
const exit = document.querySelector(".exit")
const darkModeButton = document.querySelector(".dark-mode-button")
let secretCelebrity = null
let currentGuessCount = 1

function loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode')
        darkModeButton.textContent = 'light mode'
    }
}

function saveDarkMode() {
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'))
}

guess.addEventListener('keydown', async (e) =>{
    if (e.key === "Enter" && guess.value.length > 2){
        let celebrityName = guess.value.toLowerCase().trim()
        const guessedData = await celebritySearch(celebrityName)
          if (!guessedData) {
            alert("Celebrity not found. Please try again.")
            return;
        }
        answerChecker(guessedData, secretCelebrity)
        guess.value = ""
        currentGuessCount++
    }
})

darkModeButton.addEventListener('click', ()=>{
    toggleDarkMode()
    if(document.body.classList.contains('dark-mode')){
        darkModeButton.textContent = "light mode"
    } else if(!document.body.classList.contains('dark-mode')){
        darkModeButton.textContent = "dark mode"
    }
    saveDarkMode()
})

settings.addEventListener ('click', (e) =>{
    e.preventDefault()
    overlayOn()
})

exit.addEventListener('click', () =>{
    overlayOff()
})

function overlayOn (){
    overlay.style.display = "block";
}
function overlayOff (){
    overlay.style.display = "none";
}

function toggleDarkMode(){
    document.body.classList.toggle('dark-mode')
}

// This is going to be fetching the API and generating a random celebrity, assigning them to correct variables and 
const celebritySearch = async (name) => {
    try{
        const response = await fetch(
            `https://api.api-ninjas.com/v1/celebrity?name=${name}`,
            { headers: { 'X-Api-Key': 'qR8GaBspsOHmoycr4KLkodVwTi3uMJjEDtd0UXr5' } }
        )
        const data = await response.json()
        if (data.length === 0) return null
        return data[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

// this is the randomly generated celebrity
const generateCelebrity = async () => {
    try{
        const url = `https://api.api-ninjas.com/v1/celebrity?min_net_worth=10000000` //changed to 10m

        const response = await fetch(url, {
            headers: {'X-Api-Key': 'qR8GaBspsOHmoycr4KLkodVwTi3uMJjEDtd0UXr5'}
        })

        const answerdata = await response.json()
        // so basically what the answer data is is the data of celebrities above a certain min net worth
        const math = Math.floor(Math.random() * answerdata.length)
        // the random celeb generation uses math to generate a random celebrity out of the array of 30
        secretCelebrity = answerdata[math]  
        console.log(secretCelebrity)
    } catch (error) {
        console.log(error)
    }
}

generateCelebrity()

function answerChecker(guess, target){
// This will check if the answer is correct adding to a counter
    if (!guess || !target) return

    const currentRow = document.querySelector(`#row-${currentGuessCount}`);
    if (!currentRow) return

    const genderTile = currentRow.querySelector(".gender-tile");
    const natTile = currentRow.querySelector(".nat-tile");
    const worthTile = currentRow.querySelector(".worth-tile");
    const heightTile = currentRow.querySelector(".height-tile");
    const ageTile = currentRow.querySelector(".age-tile");  

    if (guess.name.toLowerCase() === target.name.toLowerCase()) {
        alert("Congratulations! You've guessed the celebrity correctly!")
        return
    } else{

    genderTile.textContent = guess.gender;
    if (guess.gender === target.gender) {
        genderTile.classList.add("correct");
    } else  {
        genderTile.classList.add("incorrect");
    }

    natTile.textContent = guess.nationality;
    if (guess.nationality === target.nationality) {
        natTile.classList.add("correct");
    } else {
        natTile.classList.add("incorrect");
    } 

    worthTile.textContent = `$${(guess.net_worth / 1000000).toFixed(0)}M`;
    if (guess.net_worth === target.net_worth) {
        worthTile.classList.add("correct");
    } else if (guess.net_worth < target.net_worth) {
        worthTile.classList.add("higher");
        worthTile.textContent += " ⬆️";
    } else {
        worthTile.classList.add("lower");
        worthTile.textContent += " ⬇️";
    }

    heightTile.textContent = metersToFeetInches(guess.height);
    if (guess.height === target.height) {
        heightTile.classList.add("correct");
    } else if (guess.height < target.height) {
        heightTile.classList.add("higher");
        heightTile.textContent += " ⬆️";
    } else {
        heightTile.classList.add("lower");
        heightTile.textContent += " ⬇️";
    } 
    
    const currentYear = new Date().getFullYear();
    const guessAge = currentYear - new Date(guess.birthday).getFullYear();
    const targetAge = currentYear - new Date(target.birthday).getFullYear();
    ageTile.textContent = `${guessAge} yrs`;

    if (guessAge === targetAge) {
        ageTile.classList.add("correct");
    } else if (guessAge < targetAge) {
        ageTile.classList.add("higher");
        ageTile.textContent += " ⬆️";
    } else {
        ageTile.classList.add("lower");
        ageTile.textContent += " ⬇️";
    }
    }

    if (guess.name.toLowerCase() === target.name.toLowerCase()) {
        // Force green indicators across the board
        genderTile.classList.add("correct");
        natTile.classList.add("correct");
        worthTile.classList.add("correct");
        heightTile.classList.add("correct");
        ageTile.classList.add("correct");
        
        setTimeout(() => {
            alert(`🎉 Congratulations! You've guessed ${target.name} correctly in ${currentGuessCount} tries!`);
        }, 100);
        return;
    }

    if (currentGuessCount === 6) {
        setTimeout(() => {
            alert(`😔 Out of turns! The mystery celebrity was: ${target.name}`);
        }, 100);
    }
}

//meters to feet inches
function metersToFeetInches(meters) {
    const totalInches = meters * 39.3701
    let feet = Math.floor(totalInches / 12)
    let inches = Math.round(totalInches % 12)
    if (inches === 12) {
        feet += 1
        inches = 0
    }
    return `${feet}'${inches}"`    
}

loadDarkMode()