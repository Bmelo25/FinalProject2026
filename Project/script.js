guess = document.querySelector(".guess")
answer = document.querySelectorAll(".answer-box-1")

guess.addEventListener('keydown', (e) =>{
    
    if (e.key === "Enter"){
        celebrityData()
        answer.value = guess.value
        
        answer.forEach(ans => {
       ans.value = answer.value
    });
    // answerChecker()
    // if (answer.value === correctAnswer ){
    //     // so imagine this if statement but multiple tries and answers in the API
    //   console.log(correctAnswer)
    //   answer.value = 'correct!!!'
    //   answer.classList.add("")
    // }
}
})
const correctAnswer = "hello"


function toggleDarkMode(){

}

function settings(){

}


// This is going to be fetching the API and generating a random celebrity, assigning them to correct variables and 
const celebrityData = async () => {
const celebrity = guess.value
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

celebrityData()

function answerChecker(){
// This will check if the answer is correct adding to a counter

}