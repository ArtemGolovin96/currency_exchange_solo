//Получеие кнопок
// I Have section
let from = 'RUB';
let to = 'USD';
let data1 = 0;
let data = 0; 
let timeOutId;
function addEventButtonsL () {
  let valuteButtons = document.querySelectorAll('.buttonv');
  valuteButtons.forEach((el) => { 
    el.addEventListener('click', (e) => { 
      from = el.textContent;
      getFetch();
        let selectValuteButton = document.querySelector('.select');
        selectValuteButton.classList.remove('optionactive');
        valuteButtons.forEach((item) => {
          if(item.classList.contains('buttonfocus')) {
            item.classList.remove('buttonfocus');
          }
        })
        e.target.classList.toggle('buttonfocus');
        inputValue();
    })
  })  
}




function addEventButtonsR () {
  let valuteButtons2 = document.querySelectorAll('.buttonv2');
  valuteButtons2.forEach((el) => { 
  el.addEventListener('click', (e) => { 
    to = el.textContent;
    getFetch();
    let selectValuteButton2 = document.querySelector('.select2');
    selectValuteButton2.classList.remove('optionactive');
      valuteButtons2.forEach((item) => {
        if(item.classList.contains('buttonfocus2')) {
          item.classList.remove('buttonfocus2');
        }
      })
      e.target.classList.toggle('buttonfocus2');
      inputValue();
  })
})  
}


function addEventSelectL () {
  let selectValuteButton = document.querySelectorAll('.select');
  selectValuteButton.forEach((el) => {
  el.addEventListener('change', (e) => {
    from = e.target.options[e.target.selectedIndex].textContent;
    getFetch();
    el.classList.toggle('optionactive');
    let valuteButtons = document.querySelectorAll('.buttonv');
    valuteButtons.forEach((item) => {
      item.classList.remove('buttonfocus');
    })
    inputValue();
  })
}) 
}

function addEventSelectR () {
  let selectValuteButton2 = document.querySelectorAll('.select2');
  selectValuteButton2.forEach((el) => {
    el.addEventListener('change', (e) => {
      to = e.target.options[e.target.selectedIndex].textContent;
      getFetch();
      el.classList.toggle ('optionactive');
      let valuteButtons2 = document.querySelectorAll('.buttonv2');
      valuteButtons2.forEach((item) => {
        item.classList.remove('buttonfocus2');
      })
      inputValue();
    })
  }) 
}

function inputValue() {
    let inputL = document.querySelector('.inputihave');
    let inputR = document.querySelector('.inputiwant');
    inputL.value = '';
    inputR.value = '';
    inputL.addEventListener('input', (e) => {
      if(from === to){ 
        inputR.value = inputL.value
      }  else {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(() => {
          inputR.value = (inputL.value * data.rates[to]).toFixed(4);
        }, 2000)
      }
    })
  }



inputValue();
addEventButtonsL();
addEventSelectL();
addEventButtonsR();
addEventSelectR();



async function getFetch(){
  let respose =  await fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`);
  let respose1 =  await fetch(`https://api.ratesapi.io/api/latest?base=${to}&symbols=${from}`);
  data1 = await respose1.json();
  data = await respose.json();
    Promise.all([data1, data])
    .then(items => {
      let pL = document.querySelector('#inputp1');
      pL.textContent = `1 ${data.base} =  ${data.rates[to]} ${to}`;
      let pR = document.querySelector('#inputp2');
      pR.textContent = `1 ${to} =  ${data1.rates[from]} ${from}`;
    })
    .catch(err => {
      console.log('errorrrrr')
    })

}






