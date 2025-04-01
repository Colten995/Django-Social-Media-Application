console.log('hello world detail');

const backBtn = document.getElementById('back-btn');

backBtn.addEventListener('click', ()=>
{
    //navigates to the previous page in the browser history
    history.back();
})