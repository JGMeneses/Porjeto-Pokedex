const pokemon_name = document.querySelector(".pokemon_name");
const pokemon_number = document.querySelector(".pokemon_number");
const pokemon_img = document.querySelector(".pokemon_img");
const form = document.querySelector(".form");
const inputsearch = document.querySelector(".input-search");
const ButtonP = document.querySelector(".btn-Prev");
const ButtonN = document.querySelector(".btn-Next");

let PokeInicial = 1;
const fetchPokemon = async (pokemon) => {

    pokemon_name.innerHTML = "Buscando...";
    pokemon_number.innerHTML = "";
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //await está ai para só deixar a função rodar quando o fetch mostrar a resposta
    //e ela só funciona em funções async

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }   
}

const renderPokemon = async(pokemon) => {
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemon_img.style.display ="block"
        pokemon_name.innerHTML = data.name;
        pokemon_number.innerHTML = data.id;
        pokemon_img.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputsearch.value ="";
        PokeInicial = data.id;

    }else{
        pokemon_name.innerHTML = "404";
        pokemon_number.innerHTML = "";
        pokemon_img.style.display ="none"
    }
}
form.addEventListener("submit", (event)=>{ 
    event.preventDefault();
    renderPokemon(inputsearch.value.toLowerCase());
});

ButtonP.addEventListener('click', ()=>{
    if(PokeInicial > 1){
        PokeInicial--;
        renderPokemon(PokeInicial)
    }
});

ButtonN.addEventListener('click', ()=>{
    PokeInicial++;
    renderPokemon(PokeInicial)
    
});




renderPokemon(PokeInicial)

