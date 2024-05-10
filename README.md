# Blackjack Game Project

## Technologies Used
- **Javascript**: Implement the logic of the game

- **CSS**: Styling 

- **HTML**: Game structure

## Game Rules

In Blackjack, everyone plays against the dealer. The goal is to get closer to 21 than the dealer without going over 21. If a hand goes over 21, it is called a “bust” or “break” and the wager is lost. Jacks, Queens and Kings count as 10. An Ace may be played as a 1 or an 11. All other cards are played at face value.

## Demo

![](./Images/GameScreenshot1.png)

In this game the player will have the option to deal, hit or stand. The deck will be created and shuffled when the player chooses to deal. When making this choice, the player and the dealer will be dealt two cards each. The player will get two cards facing up and the dealer will receive one faced up and the other faced down.

![](./Images/GameScreenshot2.png)

After choosing to deal, the 'Deal' button is disabled and the player will now have the the option to hit (get another card) or stand. If the player chooses to hit and his sum goes over 21, the dealer wins. If the player chooses to stand, the dealer's card is revealed and new cards will be added to the dealer's hand until it reaches a sum equal or greater than 17. Once this treshold is reached, the dealer's and player's hand sum will be compared and the winner will be declared based on the rules of the game.

The 'Deal' button is abled again after the winner is declared.

![](./Images/GameScreenshot3.png)

## Game Code Details

**HTML Structure**

```html
<body>
    <div class="rules-div">Rules</div>
    <div id="hands">
        <div id="playerhand"></div>
        <div id="dealerhand"></div>
    </div>
    <div id="gamebuttons">
        <button id="deal" class="buttons">Deal</button>
        <button id="hit" class="buttons">Hit</button>
        <button id="stand" class="buttons">Stand</button>
    </div>
    <p id="message"></p>
    <div class="title">Blackjack</div>
</body>
</html>
```

**Javascript**

Creating and shuffling the deck:

```js
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
}
```

Functions to get the value of the cards:

```js

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

```
Deal function:

```js
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

        playerCard1 = deck.pop(Math.floor(Math.random() * deck.length))
        playerCard2 = deck.pop(Math.floor(Math.random() * deck.length))
        dealerCard1 = deck.pop(Math.floor(Math.random() * deck.length))
        dealerCard2 = deck.pop(Math.floor(Math.random() * deck.length))

        cardImg1.src = "./Cards/" + playerCard1 + ".png"
        playerHandDiv.append(cardImg1)

        cardImg2.src = "./Cards/" + playerCard2 + ".png"
        playerHandDiv.append(cardImg2)

        Back.src = "./Cards/BACK.png"
        cardImg3.src = "./Cards/" + dealerCard1 + ".png"
        dealerHandDiv.appendChild(Back)

        Back.classList.add("back")
        cardImg3.classList.add("front")

        cardImg4.src = "./Cards/" + dealerCard2 + ".png"
        dealerHandDiv.append(cardImg4)

        playerSum += playerCardValue(playerCard1) + playerCardValue(playerCard2)
        dealerSum += dealerCardValue(dealerCard1) + dealerCardValue(dealerCard2) 

    if (playerSum === 22) {
        playerSum -= 10
        playerAceCount -= 1
    }

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
```

Hit function:

```js
function hit(){
    if (canHit === true){

        hitCardPlayer = deck.pop(Math.floor(Math.random() * deck.length))
        playerSum += playerCardValue(hitCardPlayer)

        playerHand.push(hitCardPlayer)

        let cardImg = document.createElement("img")
        cardImg.src = "./Cards/" + hitCardPlayer + ".png"
        playerHandDiv.append(cardImg)

    if (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10
        playerAceCount -= 1
         canStand = true;
    } else if (playerSum > 21 && playerAceCount === 0){
        dealerHandDiv.replaceChild(cardImg3, Back)
        message.innerText = "Dealer wins!"
        canStand = false;
        canHit = false;
        canDeal = true;
        dealbutton.disabled = false
    }
    }else{
        return
    }
}
```
Stand function:
```js
function stand(){
    if (canStand === true){
        canHit = false
        dealerHandDiv.replaceChild(cardImg3, Back)
        if (dealerSum < 17){    
            do{
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
```