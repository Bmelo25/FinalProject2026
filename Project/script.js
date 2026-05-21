guess = document.querySelector(".guess")
answer = document.querySelectorAll(".answer-box-1")

guess.addEventListener('keydown', (e) =>{
    
    if (e.key === "Enter"){
        answer.value = guess.value
        
        answer.forEach(ans => {
       ans.value = answer.value
    });
    answerChecker()
    if (answer.value === correctAnswer ){
        // so imagine this if statement but multiple tries and answers in the API
      console.log(correctAnswer)
      answer.value = 'correct!!!'
      answer.classList.add("")
    }
}
})
const correctAnswer = "hello"


function toggleDarkMode(){

}

function settings(){

}


function celebritySearch(){
// This is going to be fetching the API and generating a random celebrity, assigning them to correct variables and 
}


function answerChecker(){
// This will check if the answer is correct adding to a counter


}