var cards = Array.from(document.getElementsByClassName("card"));
var playBtn = document.getElementById("playBtn");
playBtn.onclick = playAgain;
cardsOrder();

function generateRandom(){
   return Math.floor(Math.random() * (12 - 1 + 1) + 1)
}

function generateArray(){
    var randomArray = [];
    for(var i=0; randomArray.length <12 ; i++){
        var randomNum = generateRandom();
        if(!(randomArray.includes(randomNum))) randomArray.push(randomNum);
    }
    return randomArray;
}

function cardsOrder(){
    var orders = generateArray();
    for(var i in orders) cards[i].style.order = orders[i];
}

cards.map(function(elem){
    elem.onclick = function(){
        cardFlip.call(this);
        cardMatch.call(this)
    }
})

function cardFlip(){
    this.classList.add("card-flip");
}

function cardMatch(){
    var thisValue = this.getAttribute("pic");
    var thisIndex = this.style.order;
    var thisElem = this;
    cards.map(function(elem){
        var valueElem = elem.getAttribute("pic");
        var haveClass = elem.classList.contains("card-flip");
        var elemIndex = elem.style.order;

        if((thisValue == valueElem) && (haveClass) && (thisIndex != elemIndex)){
            flipMatchCards(thisElem , elem)
        }else if((thisValue != valueElem) && (haveClass) && (thisIndex != elemIndex)){
            flipAllCards(thisElem , elem);
        }
    })
    
}

function flipAllCards(x,y){
    setTimeout(function(){
        x.classList.remove("card-flip");
        y.classList.remove("card-flip");
    }, 500) 
}

function flipMatchCards(x,y){
    x.classList.add("card-invisible");
    y.classList.add("card-invisible");
    setTimeout(function(){
        
        x.classList.remove("card-flip");
        y.classList.remove("card-flip");
    }, 500)   
}

function playAgain(){
    cardsOrder();
    cards.map(function(elem){
        elem.classList.remove("card-invisible");
        elem.classList.remove("card-flip");
    })
}