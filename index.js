console.log("Hello World");

const testEl = document.getElementById("test-el");

//change the element text
testEl.textContent = "bye bye";

//change the element text when the element is clicked
testEl.addEventListener('click', () =>{
    console.log('clicked');
    testEl.innerHTML = "<b>clicked</b>"
});

//log a message to the console when the user hovers over the element with their mouse
testEl.addEventListener('mouseover', ()=>{
    console.log('on');
});

//log a message to the console when the user moves the mouse off of the element
testEl.addEventListener('mouseout', ()=>{
    console.log('off');
});

//log the y position of the window when the user scrolls
document.addEventListener('scroll', ()=>
{
    const positionY = window.scrollY;
    console.log(positionY);
});


// GET the data with ajax from the free swapi API
const url = "https://swapi.dev/api/people";

// 1. jquery ajax method <- this is what we are going to use in this course
$.ajax({
    type: 'GET',
    url: url,
    success: function(response){
        console.log('jquery ajax', response)
    },
    error: function(error){
        console.log(error)
    }
});
// 2. XMLHttpRequest
// 3. fetch method

// other popular: axios library, async await + fetch