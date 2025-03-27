console.log('hello world');

const helloWorldBox = document.getElementById("hello-world");

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