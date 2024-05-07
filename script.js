
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["S", "D",  "C",  "H"]

let deck = []
let playerHand = []
let dealerHand = []

let dealerCard1
let dealerCard2
let playerCard1
let playerCard2
let hitCardPlayer
let hitCardDealer

let playerAceCount = 0
let dealerAceCount = 0
let dealerSum = 0
let playerSum = 0

let canDeal = true
let canHit = false
let canStand = false

const dealbutton = document.getElementById("deal")
const message = document.getElementById("message")
let playerHandDiv = document.getElementById('playerhand')
let dealerHandDiv = document.getElementById('dealerhand')
let cardImg1 = document.createElement("img")
let cardImg2 = document.createElement("img")
let cardImg3 = document.createElement("img")
let cardImg4 = document.createElement("img")
let Back = document.createElement("img")

//--------------------------------------------------------------------------------------------//

// 1. Running the function to create the deck when the browser page loads
window.onload = createDeck()

//--------------------------------------------------------------------------------------------//

// 2. Creating the deck throuch the combination of the card values and suits previously declared
function createDeck(){
    suits.forEach((suit) => {
        values.forEach((value)=> {
            deck.push(value + "-" + suit);
        });
    });
    
    for(let i=0; i< deck.length; i++){
        let shuffle = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[shuffle];
        deck[shuffle] = temp;
    };
    //console.log(deck)
}

// 3. Taking the value of the player's cards
function playerCardValue(card){
    let splitCard = card.split("-")
    let value = splitCard[0]
    
    if (isNaN(value)) {
        if (value === "A") {
            playerAceCount += 1
            return 11
        } else {
            return 10
        }
    }
    return parseInt(value)
}

// 4. Taking the value of the dealer's cards
function dealerCardValue(card){
    let splitCard = card.split("-")
    let value = splitCard[0]
    
    if (isNaN(value)) {
        if (value === "A") {
            dealerAceCount += 1
            return 11
        } else {
            return 10
        }
    }
    return parseInt(value)
}

// 5. Creating the hand of the player and the dealer 
function deal(){
    playerHand = [];
    dealerHand = [];
    playerSum = 0;
    dealerSum = 0;
    playerAceCount = 0;
    dealerAceCount = 0;
    canDeal = true;
    canHit = false;
    canStand = false;
    message.innerText = "";


    if (canDeal === true){
    playerHandDiv.textContent = ""
    dealerHandDiv.textContent = ""
    
    // Taking random cards out of the deck
    playerCard1 = deck.pop(Math.floor(Math.random() * deck.length))
    playerCard2 = deck.pop(Math.floor(Math.random() * deck.length))
    dealerCard1 = deck.pop(Math.floor(Math.random() * deck.length))
    dealerCard2 = deck.pop(Math.floor(Math.random() * deck.length))

    // Updating player's and dealer's hand

    cardImg1.src = "./Cards/" + playerCard1 + ".png"
    playerHandDiv.append(cardImg1)

    cardImg2.src = "./Cards/" + playerCard2 + ".png"
    playerHandDiv.append(cardImg2)

    Back.src = "./Cards/BACK.png"
    cardImg3.src = "./Cards/" + dealerCard1 + ".png"
    dealerHandDiv.appendChild(Back)

    cardImg4.src = "./Cards/" + dealerCard2 + ".png"
    dealerHandDiv.append(cardImg4)

    // Updating player's and dealer's sum
    playerSum += playerCardValue(playerCard1) + playerCardValue(playerCard2)
    dealerSum += dealerCardValue(dealerCard1) + dealerCardValue(dealerCard2) 

    // Checking if the player's hand starts with two aces in case he doesn't hit
    if (playerSum === 22) {
        playerSum -= 10
        playerAceCount -= 1
    }

    // Checking if the dealer's hand start with two aces
    if (dealerSum === 22) {
        dealerSum -= 10
        dealerAceCount -= 1
    }

    canHit = true
    canStand = true
    canDeal = false
    }
    dealbutton.disabled = true
}

// 6. When the player chooses to hit
function hit(){
    if (canHit === true){
        // Adding another card to the hand and updating the sum
        hitCardPlayer = deck.pop(Math.floor(Math.random() * deck.length))
        playerSum += playerCardValue(hitCardPlayer)

        playerHand.push(hitCardPlayer)

        let cardImg = document.createElement("img")
        cardImg.src = "./Cards/" + hitCardPlayer + ".png"
        playerHandDiv.append(cardImg)

        // Checking if the hand has bust and how many aces there are
        if (playerSum > 21 && playerAceCount > 0) {
            playerSum -= 10
            playerAceCount -= 1
            canStand = true;
        } else if (playerSum > 21 && playerAceCount === 0){
            dealerHandDiv.replaceChild(cardImg3, Back)
            message.innerText = "Dealer wins!"
            canStand = false;
            canDeal = true;
            dealbutton.disabled = false
        }
    }else{
        return
    }
}

// 7. When the player chooses to stand
function stand(){
    if (canStand === true){
        canHit = false
        dealerHandDiv.replaceChild(cardImg3, Back)
        if (dealerSum < 17){    
            do{
                //setTimeout(() => {
                    hitCardDealer = deck.pop(Math.floor(Math.random() * deck.length))
                    dealerSum += dealerCardValue(hitCardDealer)

                    let cardImg = document.createElement("img")
                    cardImg.src = "./Cards/" + hitCardDealer + ".png"
                    dealerHandDiv.append(cardImg)

                    splitCard = hitCardDealer.split("-")
                    
                    if (hitCardDealer[0] === 'A' && dealerAceCount > 0){
                        dealerSum -= 10
                        dealerAceCount -= 1
                    }
                //},1000)    
            }while (dealerSum < 17);
        }
                
        if (dealerSum > 21){
            message.innerText = "You win!"
            canDeal = true;
            dealbutton.disabled = false
        }else if (dealerSum > playerSum){
            message.innerText = "Dealer wins!"
            canDeal = true;
            dealbutton.disabled = false
        }else if (dealerSum < playerSum){
            message.innerText = "You win!"
            canDeal = true;
            dealbutton.disabled = false
        }else if(dealerSum === playerSum){
             message.innerText = "Tie!"
             canDeal = true;
             dealbutton.disabled = false
        }
    }
}

dealbutton.addEventListener("click", deal)
dealbutton.addEventListener("click", createDeck)
document.getElementById("hit").addEventListener("click", hit)
document.getElementById("stand").addEventListener("click", stand)