const API_KEY = 'api_key=ff18db059e618641a193a8bd428c0e32';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const NEW_API_URL = BASE_URL + '/discover/movie?sort_by=release_date.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?'+ API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const main2 = document.getElementById('main2');
const main3 = document.getElementById('main3');



//console.log(API_URL);
getMovie(API_URL,main);
getMovie(NEW_API_URL,main2);


function getMovie(url,main){
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results,main);
        //console.log(data);
    })
}

function showMovies(data,main){

    main.innerHTML = '';
    
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');
        movieE1.innerHTML = `
            <img src="${IMG_URL + poster_path}" ,alt = "${title}">

            <div class='movie-info'>
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>

            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div> 
        `

        main.appendChild(movieE1);
    })
}




function getColor(vote){
    if(vote>=8){
        return 'green';
    }
    else if (vote>=5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit' , (e) => {
    e.preventDefault();

    const searchterm = search.value;
    if(searchterm){
        getMovie(SEARCH_URL+"&query="+searchterm, main3);
    }
    
})