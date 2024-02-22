const cards = document.querySelectorAll('.carta');

let carta1, carta2;
let haEmpezado = false;

function flipCard() {
  this.classList.add('flip'); // LLamar a la funcion "flip" de CSS

  if (!haEmpezado){
    carta1 = this;
    haEmpezado = true;
  }
  else if(haEmpezado & carta1 !== this){
    carta2 = this;
    if (carta2 !== carta1 && carta2.innerHTML !== carta1.innerHTML){
      setTimeout(unflipCards, 500);
    }
    else{
      disableFlipping();
    }
    haEmpezado = false;

    function unflipCards() {
      carta1.classList.remove('flip');
      carta2.classList.remove('flip');
    }

    function disableFlipping(){
      carta1.removeEventListener('click', flipCard);
      carta2.removeEventListener('click', flipCard);
    }
  }
}

cards.forEach(card => card.addEventListener('click', flipCard)); // Cuando se haga click, ejecutar la funcion flipCard

fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=9") 
  .then(response => response.json()) 
  .then(data => { 
    cartas = document.querySelectorAll(".carta");
    data_cartas = data["cards"]
    let i_9 = 0;
    for (let i=0;i<18;i++){
      url = data_cartas[i_9]["image"];
      cartas[i].innerHTML = `<img class=\"se_ve\" src=\"${url}\"> <img class=\"no_se_ve\" src=\"https://deckofcardsapi.com/static/img/back.png\">`
      i_9++;
      if (i_9 === 9){
        i_9 = 0;
        shuffle(data_cartas);
      }
    }
    console.log(typeof(data))
  }) 
  .catch(error => {
    console.error(error);
  });

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
