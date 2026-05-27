guess = document.querySelector(".guess")
answer = document.querySelectorAll(".answer-box-1")
card = document.querySelector(".card")


let secretCelebrity = null


guess.addEventListener('keydown', async (e) =>{
    
    if (e.key === "Enter"){
        const celebrityName = guess.value.toLowerCase().trim()
        if (!celebrityName) return

        // fetch celeb guess data
        const guessedData = await celebritySearch(celebrityName)

        // if celeb not found alert user
        if (!guessedData) {
            alert("Celebrity not found. Please try again.")
            return
        }
        
        answer.forEach(ans => {
            ans.textContent = guessedData.name
        });

        answerChecker(guessedData, secretCelebrity)

        guess.value = ""
    

}
})
const correctAnswer = "hello"


function toggleDarkMode(){

}

function settings(){

}


// This is going to be fetching the API and generating a random celebrity, assigning them to correct variables and 
const celebritySearch = async (name) => {
try{
    const url = `https://api.api-ninjas.com/v1/celebrity?name=${name}`

        const response = await fetch(url, {
        headers: { 'X-Api-Key': 'qR8GaBspsOHmoycr4KLkodVwTi3uMJjEDtd0UXr5'}
    })
    const data = await response.json()

    if (data.length === 0) return null

    return data[0]
   
    // Just a quick FYI, some names have no storage so there is going to be a function that will fix it
    // const guessName = data[0].name
    // const guessNationality = data[0].nationality
    // const guessGender = data[0].gender
    // const guessNetWorth = data[0].net_worth
    // console.log(guessNetWorth)
    // console.log(data)

    } catch (error) {
        console.log(error)
        return null
    }
}


// this is the randomly generated celebrity
const generateCelebrity = async () => {
    try{
        const url = `https://api.api-ninjas.com/v1/celebrity?min_net_worth=10000000`//changed to 10m

        const response = await fetch(url, {
        headers: {'X-Api-Key': 'qR8GaBspsOHmoycr4KLkodVwTi3uMJjEDtd0UXr5'}
        })

        const answerdata = await response.json()
        // so basically what the answer data is is the data of celebrities above a certain min net worth
        const math = Math.floor(Math.random() * answerdata.length)
        // the random celeb generation uses math to generate a random celebrity out of the array of 30
        secretCelebrity = answerdata[math]  

        //  These variables are the correct answers here, which work with the answerChecker function
        // const correctName = secretCelebrity.name
        // const correctNationality = secretCelebrity.nationality
        // const correctGender = secretCelebrity.gender
        // const correctNetWorth = secretCelebrity.net_worth
        // console.log(correctGender)
        //lowk do not need these ^

        console.log(secretCelebrity)
    } catch (error) {
        console.log(error)
    }
}
generateCelebrity()
function answerChecker(guess, target){
// This will check if the answer is correct adding to a counter
    if (!guess || !target) return

    if (guess.name.toLowerCase() === target.name.toLowerCase()) {
        alert("Congratulations! You've guessed the celebrity correctly!")
        return
    }

    if (guess.nationality === target.nationality) {
    } else {
    }

    if (guess.gender === target.gender) {
    } else {
    }   

    if (guess.net_worth === target.net_worth) {
    } else if (guess.net_worth > target.net_worth) {
    } else {
    }

    const guessHeight = metersToFeetInches(guess.height)
    const targetHeight = metersToFeetInches(target.height)
    if (guessHeight === targetHeight) {
    } else if (guess.height > target.height) {
    } else {
    }

    const currentYear = new Date().getFullYear()
    const guessAge = currentYear - new Date(guess.birth_date).getFullYear()
    const targetAge = currentYear - new Date(target.birth_date).getFullYear()
    if (guessAge === targetAge) {
    } else if (guessAge > targetAge) {
    } else {
    }



}

//meters to feet inches
function metersToFeetInches(meters) {
    const totalInches = meters * 39.3701
    const feet = Math.floor(totalInches / 12)
    const inches = Math.round(totalInches % 12)
    if (inches === 12) {
        feet += 1
        inches = 0
    }
    return `${feet}'${inches}"`    
}