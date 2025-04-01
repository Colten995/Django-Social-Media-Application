console.log('hello world');

//Just a debugging div
// const helloWorldBox = document.getElementById("hello-world");

//the div that the posts will display in
const postsBox = document.getElementById("posts-box");

const spinnerBox = document.getElementById("spinner-box");
const loadBtn = document.getElementById('load-btn');
const endBox = document.getElementById('end-box');

const postForm = document.getElementById('post-form');
const title = document.getElementById('id_title');
const body = document.getElementById('id_body');
const csrf = document.getElementsByName('csrfmiddlewaretoken');

const url = window.location.href
//window.location is an object with information about the url
// console.log(window.location);

const alertBox = document.getElementById('alert-box')
console.log('csrf', csrf[0].value);


//Create an ajax request to get the hello world view response
// $.ajax({
//     type: 'GET',
//     url: '/hello-world/',
//     success: function(response){
//         console.log('success', response.text);
//         helloWorldBox.textContent = response.text;
//     },
//     error: function(error){
//         console.log('error', error);
//     }
// })

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

//setting the constant getCookie to an anonymous function that is passed the a parameter called name
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const deleted = localStorage.getItem('title');
if(deleted)
{
    handleAlerts('danger', `deleted "${deleted}"`);
    localStorage.clear();
}

const likeUnlikePosts = ()=>{
    //The [... ] operator sets the contents between the ellipses and the square bracket to an array
    const likeUnlikeForms = [...document.getElementsByClassName('like-unlike-forms')];
    likeUnlikeForms.forEach(form => form.addEventListener('submit', e=>{
        e.preventDefault();
        //get the id of the form that was clicked
        const clickedId = e.target.getAttribute('data-form-id');
        const clickedBtn = document.getElementById(`like-unlike-${clickedId}`);

        $.ajax({
            type: 'POST',
            url: "/like-unlike/",
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickedId,
            },
            success: function(response){
                console.log(response);
                clickedBtn.textContent = response.liked ? `Unlike (${response.count})`: `Like (${response.count})`
            },
            error: function(error){
                console.log(error);
            }
        })

    }))
}

let visible = 3;

const getData = ()=>{
//This is the better solution
    $.ajax({
        type:'GET',
        url: `/data/${visible}/`,
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
                            <!-- the col-1 puts the buttons closer to each other, bootstrap uses a 12 grid system -->
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-2">
                                        <!-- Change the link to the current url with the id appended to it-->
                                        <a href="${url}${el.id}" class="btn btn-primary">Details</a>
                                    </div>
                                    <div class="col-2">
                                        <!-- can type data-[element attr] to give it a custom attribute -->
                                        <form class="like-unlike-forms" data-form-id="${el.id}">
                                            <!-- csrf_token is a cross-site request forgery protection token -->
                                            <button href="#" class="btn btn-primary" id="like-unlike-${el.id}">${el.liked ? `Unlike (${el.count})`: `Like (${el.count})`}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                });
                likeUnlikePosts();
            }, 100);
            console.log(response.size);
            if(response.size === 0)
            {
                endBox.textContent = 'No posts added yet...';
            }
            else if(response.size <= visible)
            {
                loadBtn.classList.add('not-visible');
                endBox.textContent = 'No more posts to load...';
            }
        },
        error: function(error){
            console.log(error);
        }
    })
}

//when the user clicks load more the number of visible posts increase by 3 and the spinner becomes visible
loadBtn.addEventListener('click', ()=>{
    spinnerBox.classList.remove('not-visible');
    visible += 3;
    getData();
})

postForm.addEventListener('submit', e=>{
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': title.value,
            'body': body.value
        },
        success: function(response)
        {
            console.log(response);
            //'afterbegin' puts the postBox at the top of the element
            postsBox.insertAdjacentHTML('afterbegin', `
                <!-- The line of code below is commented out -->
                <!--${response.title} - <b>${response.body}</b><br>-->

                <!-- Put the post contents into bootstrap card elements-->
                <!-- mb2 puts a bottom margin of 2 on the element -->
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">${response.title}</h5>
                        <p class="card-text">${response.body}</p>
                    </div>
                    <!-- Add the two buttons for details and like using a row and col div class -->
                    <!-- the col-1 puts the buttons closer to each other, bootstrap uses a 12 grid system -->
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-2">
                                <a href="#" class="btn btn-primary">Details</a>
                            </div>
                            <div class="col-2">
                                <!-- can type data-[element attr] to give it a custom attribute -->
                                <form class="like-unlike-forms" data-form-id="${response.id}">
                                    <!-- csrf_token is a cross-site request forgery protection token -->
                                    <button href="#" class="btn btn-primary" id="like-unlike-${response.id}">Like (0)</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            likeUnlikePosts();
            $('#addPostModal').modal('hide');
            handleAlerts('success', 'New post added!');
            postForm.reset();
        },
        error: function(error)
        {
            console.log(error);
            handleAlerts('danger', 'Oops...something went wrong');
        }
    })
})

getData();