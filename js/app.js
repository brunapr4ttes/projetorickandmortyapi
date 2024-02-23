//   "characters": "https://rickandmortyapi.com/api/character",
//   "locations": "https://rickandmortyapi.com/api/location",
//   "episodes": "https://rickandmortyapi.com/api/episode"

const page = 2
const baseUrl = 'https://rickandmortyapi.com/api'

const loadCharacter = async ()=>{ //JÁ QUE A FUNÇÃO VAI FAZER UMA REQUISIÇÃO HTTP, ELA PRECISA SER ASSÍNCRONA (async)
    const res = await fetch(`${baseUrl}/character?page=${page}`)
    const data = await res.json()
    const limitData = data.results.slice(0,9)
    
    return {results: limitData}
}

const loadLocation = async ()=>{
    const res = await fetch(`${baseUrl}/location`)
    return await res.json()
}

const loadEpisode = async ()=>{
    const res = await fetch(`${baseUrl}/episode`)
    return await res.json()
}


const loadAllWithPromiseAll = async ()=>{
    const [character, location, episode] = await Promise.all([
        loadCharacter(),
        loadLocation(),
        loadEpisode()
    ])
    showCharacter(character.results) //MOSTRAR DADOS ESPECÍFICOS DA API
    showCharacter(location.results)
    console.log("Episode: ",episode.results)
}

loadAllWithPromiseAll()

function showCharacter(characters){
    const characterContainer = document.getElementById('character-container');
    characters.map((character)=>{
        const divCharacter = document.createElement('div')
        divCharacter.innerHTML = `
            <img src="${character.image}" alt="Imagem do personagem">
            <article class="character-info">
                <h3>${character.name}</h3>
                <span>${character.status} - ${character.species}</span>

                <span class="location">Last Known Location:</span>
                <a href="${character.location.url}">${character.location.name}</a>

                <span class="origin">Origin: </span>
                <a href="${character.origin.url}">${character.origin.name}</a>
                
            </article>
            `;
            divCharacter.classList.add('character-box')
        characterContainer.appendChild(divCharacter) //INFORMAÇÕES APARECERAM NO HTML
    })

}
