console.log('hello world');

//Just a debugging div
const helloWorldBox = document.getElementById("hello-world");

//the div that the posts will display in
const postsBox = document.getElementById("posts-box");

const spinnerBox = document.getElementById("spinner-box");

//Create an ajax request to get the hello world view response
$.ajax({
    type: 'GET',
    url: '/hello-world/',
    success: function(response){
        console.log('success', response.text);
        helloWorldBox.textContent = response.text;
    },
    error: function(error){
        console.log('error', error);
    }
})

//Created an ajax request to get the posts response data on the main page
//The response is returned as a string, so we parse the data into JSON objects
//*This is not the best solution because the primary key or author is the same for every post*
// $.ajax({
//     type:'GET',
//     url: '/data/',
//     success: function(response){
//         console.log(response);
//         const data = JSON.parse(response.data);
//         console.log(data);
//     },
//     error: function(error){
//         console.log(error);
//     }
// })

//This is the better solution
$.ajax({
    type:'GET',
    url: '/data/',
    success: function(response){
        console.log(response);
        const data = response.data;
        //shows the spinner for one second
        setTimeout(() => {
            //When the request completes the spinner element gets the not-visible class
            spinnerBox.classList.add('not-visible')
            console.log(data)
            //do this on every element in the data array
            data.forEach(el => {
                //Need to use back ticks (`) instead of quotes (') because we want to have multiline html and inject element title data
                //The ${} is used to access variables in the html
                postsBox.innerHTML += `
                    ${el.title} - <b>${el.body}</b><br>
                `
            });
        }, 100);
    },
    error: function(error){
        console.log(error);
    }
})