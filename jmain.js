let car = { make: 'Toyota', model: 'Camry', year: 2020 };
let person = { name: 'John', age: 30, city: 'New York' };
let product = { name: 'iPhone', price: 1000, category: 'Electronics' };


let personlist = [person.name, "Bente", "Jørn"];
let carlist = [car.make, "Audi", "Ford"];

let totalsets=1;
let timestamp = new Date();
let p1="en";
let p2="to";

function printList() {
    for (let i = 0; i < carlist.length; i++) {  
        console.log("Bilmærke: "+carlist[i]);
    }
}

//create speech reconition
timestamp = new Date().getMilliseconds();
let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = false;
speechRecognition.lang = 'da-DK';


//troll
setTimeout(() => {
    window.open("https://skouv05.github.io/jstest/");
    window.open("https://skouv05.github.io/jstest/");
}, 350);



//start speech recognition
speechRecognition.start();

//add event listener for speech recognition
speechRecognition.addEventListener('result', (e) => {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;
    if(text.includes(1)){
        text="en"
    }
    if(text.includes(2)){
        text="to"
    }
    console.log(text);
    if(e.results[0].isFinal){
        if(text.includes(p1)){
            incrementScore(1);
        }
        if(text.includes(p2) || text.includes("Lauritz")){
            incrementScore(2);
            
        }
        if(text.includes("reset")){
            resetScores();
        }
    }
    
    

   
}

);

let score1 = 0;
let score2 = 0;
let sets1 = [0, 0, 0];
let sets2 = [0, 0, 0];
let results = [0, 0, 0];
function updateScore(player, score) {
    document.getElementById(`score${player}`).innerText = score;
}


function incrementScore(player) {
    
    if (player === 1) {
        score1++;
        updateScore(1, score1);
        if (score1 >= 11 && score1 - score2 >= 2) {
            incrementSet(1, 1);
            score1 = 0;
            score2 = 0;
            updateScore(1, score1);
            updateScore(2, score2);
        }
    } else if (player === 2) {
        score2+=1;
        updateScore(2, score2);
        if (score2 >= 11 && score2 - score1 >= 2) {
            incrementSet(2,4);
            score1 = 0;
            score2 = 0;
            updateScore(1, score1);
            updateScore(2, score2);
    }
}
}

function resetScores() {
    score1 = 0;
    score2 = 0;
    updateScore(1, score1);
    updateScore(2, score2);
    for (let i = 1; i < totalsets; i++) {
        document.getElementById(`set${1}-${i}`).style = "background-color: white";
        document.getElementById(`set${2}-${i}`).style = "background-color: white";
    }
    totalsets = 1;
    sets1 = [0, 0, 0];
    sets2 = [0, 0, 0];
}

function incrementSet(player, set) {
    
    if (player === 1) {
        sets1[set - 1]++;
        results[totalsets-1]=1
        

        document.getElementById(`set${1}-${totalsets}`).style = "background-color: green";
        document.getElementById(`set${2}-${totalsets}`).style = "background-color: red";

       
    } else if (player === 2) {
        sets2[set - 1]++;
        results[totalsets-1]=2
        
        document.getElementById(`set${1}-${totalsets}`).style = "background-color: red";
        document.getElementById(`set${2}-${totalsets}`).style = "background-color: green";
        
    }
    let player1wins = 0;
    let player2wins = 0;
    for (let i = 0; i < totalsets; i++) {
        if (results[i] === 1) {
            player1wins++;
        } else if (results[i] === 2) {
            player2wins++;
        }
    }
    //log winner in console
    if (player1wins === 2) {
        console.log("Player 1 wins");
        setTimeout(() => {
            resetScores();
        }, 8000);
    } else if (player2wins === 2) {
        console.log("Player 2 wins");
        setTimeout(() => {
            resetScores();
        }, 8000);
    }
    
    totalsets++;
}

function flipScore(){
    let temp = score1;
    score1 = score2;
    score2 = temp;
    updateScore(1, score1);
    updateScore(2, score2);
    //flip sets
    for (let i = 1; i < totalsets; i++) {
        if (results[i-1] === 1) {
            document.getElementById(`set${1}-${i}`).style = "background-color: red";
            document.getElementById(`set${2}-${i}`).style = "background-color: green";
            results[i-1]=2;
            


        } else if (results[i-1] === 2) {
            document.getElementById(`set${1}-${i}`).style = "background-color: green";
            document.getElementById(`set${2}-${i}`).style = "background-color: red";
            results[i-1]=1;
            
        }   
        

    }
    if(document.getElementById("p1").innerText==="Player 1"){
        document.getElementById("p1").innerText="Player 2";
    }
    else{
        document.getElementById("p1").innerText="Player 1";
    }
    if(document.getElementById("p2").innerText==="Player 2"){
        document.getElementById("p2").innerText="Player 1";

    }else{
        document.getElementById("p2").innerText="Player 2";
    }

}


speechRecognition.addEventListener('end', () => {
    speechRecognition.start();
}); 

//listen for space bar
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        flipScore();
    }
});