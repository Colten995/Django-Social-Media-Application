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
                    <!-- The line of code below is commented out -->
                    <!--${el.title} - <b>${el.body}</b><br>-->

                    <!-- Put the post contents into bootstrap card elements-->
                    <!-- mb2 puts a bottom margin of 2 on the element -->
                    <div class="card mb-2">
                        <div class="card-body">
                            <h5 class="card-title">${el.title}</h5>
                            <p class="card-text">${el.body}</p>
                        </div>
                        <!-- Add the two buttons for details and like using a row and col div class -->
                        <!-- the col-2 puts the buttons closer to each other, bootstrap uses a 12 grid system -->
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-1">
                                    <a href="#" class="btn btn-primary">Details</a>
                                </div>
                                <div class="col-1">
                                    <a href="#" class="btn btn-primary">Like</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
        }, 100);
    },
    error: function(error){
        console.log(error);
    }
})