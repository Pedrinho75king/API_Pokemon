function renderPokemon(data) {
  const container = document.getElementById("pokemonInfo");

  const types = data.types.map(t => t.type.name).join(", ");
  const abilities = data.abilities.map(a => a.ability.name).join(", ");

  container.innerHTML = `
    <h2>${data.name} (#${data.id})</h2>
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <ul>
      <li><strong>Altura:</strong> ${data.height / 10} m</li>
      <li><strong>Peso:</strong> ${data.weight / 10} kg</li>
      <li><strong>Tipos:</strong> ${types}</li>
      <li><strong>Habilidades:</strong> ${abilities}</li>
    </ul>
  `;
}

async function getPokemonData(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase().trim()}`);
    if (!response.ok) throw new Error("Pokémon não encontrado!");
    const data = await response.json();
    renderPokemon(data);
  } catch (error) {
    document.getElementById("pokemonInfo").innerHTML = `<p>${error.message}</p>`;
  }
}

function handleSearch() {
  const input = document.getElementById("pokemonInput");
  const pokemonName = input.value;

  if (pokemonName) {
    getPokemonData(pokemonName);
  } else {
    alert("Digite o nome ou número do Pokémon.");
  }
}
