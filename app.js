
numbers = document.querySelectorAll('#num')
calscreen = document.querySelector('.screen')

clear = document.querySelector('#clear');

clear.addEventListener('click',()=>{
    calscreen.innerText = "";
})

numbers.forEach(e => {
    e.addEventListener('click',()=>{
        calscreen.innerText += e.value;
    })
});