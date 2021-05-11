//Получеие кнопок
// I Have section
let from = 'RUB';
let to = 'USD';
let data1 = 0;
let data = 0; 
let timeOutId;

function checkFromTo() {
  let valuteButtons = document.querySelectorAll('.buttonv');
  valuteButtons.forEach((el) => { 
    if(el.textContent === from) {
      el.classList.add('buttonfocus');
    } else if (el.textContent !== from) {
      el.classList.remove('buttonfocus')
    }
  })
}

function checkToFrom() {
  let valuteButtons2 = document.querySelectorAll('.buttonv2');
  valuteButtons2.forEach((el) => { 
    if(el.textContent === to) {
      el.classList.add('buttonfocus');
    } else if (el.textContent !== to) {
      el.classList.remove('buttonfocus')
    }
  })
}

function checkFromToSelect() {
  selectValuteButton = document.querySelectorAll('.select');
  selectValuteButton.forEach((el) => { 
    if(el.textContent === from) {
      el.classList.add('buttonfocus');
    } else if (el.textContent !== from) {
      el.classList.remove('buttonfocus')
    }
  })
}


function checkToFromSelect2() {
  let selectValuteButton2 = document.querySelectorAll('.select2');
  selectValuteButton2.forEach((el) => { 
    if(el.textContent === to) {
      el.classList.add('buttonfocus');
    } else if (el.textContent !== to) {
      el.classList.remove('buttonfocus')
    }
  })
}


function addEventButtonsL () {
  let valuteButtons = document.querySelectorAll('.buttonv');
  valuteButtons.forEach((el) => { 
    checkFromTo()
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
    checkToFrom();
  el.addEventListener('click', (e) => { 
    to = el.textContent;
    getFetch();
    let selectValuteButton2 = document.querySelector('.select2');
    selectValuteButton2.classList.remove('optionactive');
      valuteButtons2.forEach((item) => {
        item.classList.remove('buttonfocus')
        if(item.classList.contains('buttonfocus2')) {
          item.classList.remove('buttonfocus2');
        }
      })
      e.target.classList.add('buttonfocus2');
      inputValue();
  })
})  
}


function addEventSelectL () {
  let selectValuteButton = document.querySelectorAll('.select');
  selectValuteButton.forEach((el) => {
    checkFromToSelect()
  el.addEventListener('change', (e) => {
    checkFromTo();
    from = e.target.options[e.target.selectedIndex].textContent;
    getFetch();
    el.classList.add('optionactive');
    let valuteButtons = document.querySelectorAll('.buttonv');
    valuteButtons.forEach((item) => {
      item.classList.remove('buttonfocus');
      item.classList.remove('buttonfocus2');
    })
    inputValue();
  })
}) 
}

function addEventSelectR () {
  let selectValuteButton2 = document.querySelectorAll('.select2');
  selectValuteButton2.forEach((el) => {
      checkToFromSelect2()
    el.addEventListener('change', (e) => {
      checkToFrom();
      to = e.target.options[e.target.selectedIndex].textContent;
      getFetch();
      el.classList.add('optionactive');
      let valuteButtons2 = document.querySelectorAll('.buttonv2');
      valuteButtons2.forEach((i) => {
        i.classList.remove('buttonfocus');
        i.classList.remove('buttonfocus2');
      })
      inputValue();
    })
  }) 
}

function inputValue() {
    let inputL = document.querySelector('.inputihave');
    let inputR = document.querySelector('.inputiwant');
    inputL.addEventListener('input', (e) => {
      if(from === to){ 
        inputR.value = inputL.value
      }  else {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(() => {
          fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            inputR.value = (inputL.value * data.rates[to]).toFixed(4);
          })
          .catch((err) => {
            console.log(err)
          })

        }, 1000)
      }
    })
    inputR.addEventListener('input', (e) => {
      console.log(to)
      if(from === to){ 
        inputR.value = inputL.value
      }  else {
        clearTimeout(timeOutId);
        timeOutId = setTimeout(() => {
          fetch(`https://api.ratesapi.io/api/latest?base=${to}&symbols=${from}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            inputL.value = (inputR.value * data.rates[from]).toFixed(4);
          })
          .catch((err) => {
            console.log(err)
          })

        }, 1000)
      }
    })
  }

function addEventListenerChange () {
  let changeButton = document.querySelector('.changebutton');
  let selectValuteButton2 = document.querySelectorAll('.select2');
  let selectValuteButton = document.querySelectorAll('.select');
  changeButton.addEventListener('click', (e) => {
    [from, to] = [to, from];
    let inputL = document.querySelector('.inputihave');
    let inputR = document.querySelector('.inputiwant');
    [inputL.value, inputR.value] = [inputR.value, inputL.value];
    [selectValuteButton[0].value, selectValuteButton2[0].value] = [selectValuteButton2[0].value, selectValuteButton[0].value]
    // [from, selectValuteButton2[0].value] = [selectValuteButton2[0].value, from]
    // [selectValuteButton[0].value, to] = [to, selectValuteButton[0].value]
    console.dir(selectValuteButton[0].value)
    checkFromTo();
    checkToFrom();
    getFetch();
    inputValue();
  })
}
addEventListenerChange();
addEventButtonsL();
addEventSelectL();
addEventButtonsR();
addEventSelectR();
inputValue();


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
      let inputL = document.querySelector('.inputihave');
      let inputR = document.querySelector('.inputiwant');
      inputR.value = (inputL.value * data.rates[to]).toFixed(4);

    })
    .catch(err => {
      console.log('errorrrrr')
    })

}

function clearInputValue() {
  let inputL = document.querySelector('.inputihave');
  let inputR = document.querySelector('.inputiwant');
  
}
 



