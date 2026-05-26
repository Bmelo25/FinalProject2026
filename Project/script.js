guess = document.querySelector(".guess")
answer = document.querySelectorAll(".answer-box-1")
card = document.querySelector(".card")
guess.addEventListener('keydown', (e) =>{
    
    if (e.key === "Enter"){
        celebritySearch()
        answer.value = guess.value
        
        answer.forEach(ans => {
       ans.value = answer.value
    });
    // note for Tyler: put the answer correctness function in here
    // 
    // answerChecker()

}
})
const correctAnswer = "hello"


function toggleDarkMode(){

}

function settings(){

}


// This is going to be fetching the API and generating a random celebrity, assigning them to correct variables and 
const celebritySearch = async () => {
const celebrity = guess.value.toLowerCase()
    if(!celebrity) return
try{
    const url = `https://api.api-ninjas.com/v1/celebrity?name=${celebrity}`

        const response = await fetch(url, {
        headers: { 'X-Api-Key': 'qR8GaBspsOHmoycr4KLkodVwTi3uMJjEDtd0UXr5'}
        
    })
    const data = await response.json()
    console.log(data)
    // displayData(data);
        }
        catch (error) {
console.log(error)
}
}


celebritySearch()


// this is the randomly generated celebrity
const generateCelebrity = async () => {
    try{
       const url = `https://celebrities-api-by-apirobots.p.rapidapi.com/v1/celebrities/random`

        const response = await fetch(url, {
        headers: {'x-rapidapi-key': '4e7be9fa07mshf4492be2be6ca62p1132bbjsnba7f74105220',
		'x-rapidapi-host': 'celebrities-api-by-apirobots.p.rapidapi.com',
		'Content-Type': 'application/json'
        }
    })
    
    const answerdata = await response.json()
    const correctName = answerdata.name
    const correctNationality = answerdata.nationality
    const correctGender = answerdata.gender
    console.log(correctGender)
    console.log(answerdata)
}
catch (error) {
    console.log(error)
}
}
generateCelebrity()
function answerChecker(){
// This will check if the answer is correct adding to a counter
}