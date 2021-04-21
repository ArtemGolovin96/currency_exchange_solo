//Получеие кнопок
// I Have section



let valuteButtons = document.querySelectorAll('.buttonv');
valuteButtons.forEach((el) => { 
  el.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    el.style.backgroundColor = '#833AE0'
    el.style.color = 'white'
  })
})  

let selectValuteButton = document.querySelectorAll('.select');
selectValuteButton.forEach((el) => {
  el.addEventListener('change', (e) => {
    console.log(e.target.value);
  })
})  

async function getFetch(){
  let respose =  await fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`);
  let data = await respose.json();
  console.log(data);
}

