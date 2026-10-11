const api_key = "8fea1bc8";

const input_field = document.getElementById("movie_name");

const search_btn = document.getElementById("search_btn");

const img = document.querySelector(".img");

const name_movie =document.getElementById("name_movie");

const rating = document.getElementById("rating");


const Released_date = document.getElementById("Released_date");

const language = document.getElementById("language");

const duration = document.getElementById("duration");

const cast = document.getElementById("cast");

const plot = document.getElementById("plot");


search_btn.addEventListener("click",()=>{
    getMovie();
    input_field.value="";
})

async function getMovie() {

    const movie_name = input_field.value.trim();
    const warning = document.querySelector(".searchbar");

    if (movie_name === "") {
        input_field.focus();
        warning.style.border="2px solid red";
        warning.style.boxShadow="0 0 10px red";
        return;
    }
    warning.style.border="none";
    warning.style.boxShadow="none";

    const final_url = await fetch(
        `https://www.omdbapi.com/?apikey=${api_key}&t=${movie_name}`
    );

    const data = await final_url.json();

    console.log(data);

    if(data.Response==="False"){
        alert("Movie not Find !");
        return;
    }

    let image = data.Poster;
    img.innerHTML = `<img src = ${image}>`;

    name_movie.textContent = data.Title;

    rating.textContent = data.imdbRating;

    Released_date.textContent =data.Released;

    language.textContent = data.Language;

    duration.textContent = data.Runtime;

    cast.textContent = data.Actors; 
    
    plot.textContent = data.Plot;



    const genres = data.Genre.split(",");
   
    const genre = document.querySelector(".genre");

    genre.innerHTML="";
    genres.forEach((item)=>{
        const h4 = document.createElement("h4");
        h4.setAttribute("class","genre-abt");
        h4.textContent = item.trim();
        genre.appendChild(h4);
    })


}
input_field.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        search_btn.click();
    }
})
