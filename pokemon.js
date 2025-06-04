document.getElementById('searchBtn').addEventListener('click', searchPokemon);

async function searchPokemon() {
  const input = document.getElementById('pokemonInput').value.toLowerCase().trim();
  const infoDiv = document.getElementById('pokemonInfo');

  if (input === '') {
    infoDiv.innerHTML = '<p style="color:red;"></p>';
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Pokémon not found');

    const data = await response.json();

    const name = data.name.toUpperCase();
    const image = data.sprites.front_default;
    const types = data.types.map(type => type.type.name).join(', '); // Bonus

    infoDiv.innerHTML = `
      <h2>${name}</h2>
      <img src="${image}" alt="${name}">
      <p><strong>Type:</strong> ${types}</p>
    `;
  } catch (error) {
    infoDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
