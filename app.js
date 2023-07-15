
numbers = document.querySelectorAll('#num');
calscreen = document.querySelector('.screen');

root = document.querySelector('#root');
pi = document.querySelector('#pi')

clear = document.querySelector('#clear');
del = document.querySelector('#del');

operator = document.querySelectorAll('#op');


equalto = document.querySelector('#equalto');

clear.addEventListener('click',()=>{
    calscreen.innerText = "";
})

del.addEventListener('click',()=>{
   
    const nums = calscreen.innerText;
    const newnum = nums.slice(0, nums.length-1);
    calscreen.innerText = newnum;    
})

root.addEventListener('click',()=>{
    const nums = calscreen.innerText;
    const numbedroot = Math.sqrt(nums);

    calscreen.innerText= numbedroot;
})

pi.addEventListener('click',()=>{
    calscreen.innerText += Math.PI; 
})

numbers.forEach(e => {
    e.addEventListener('click',()=>{
        calscreen.innerText += e.value;
    })
});

operator.forEach((e)=>{
    e.addEventListener('click',()=>{
        calscreen.innerText += e.value;
    })
})

equalto.addEventListener('click',()=>{
    const nums = calscreen.innerText;
    const answer = eval(nums)

    calscreen.innerText = answer;
})



