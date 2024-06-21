const searchInput = document.querySelector('section.top input[type="search"]');
const profileList = document.getElementById('profile');

fetch('https://6674179975872d0e0a950e53.mockapi.io/user')
  .then(response => response.json())
  .then(users => {
    const profileTemplates = users.map(user => createProfileTemplate(user));
    profileList.innerHTML = profileTemplates.join('');

    searchInput.addEventListener('keyup', (event) => {
      const searchTerm = event.target.value.toLowerCase();

      const profiles = profileList.querySelectorAll('.datos');
      profiles.forEach(profile => {
        const name = profile.querySelector('h4').textContent.toLowerCase();
        const location = profile.querySelector('h5').textContent.toLowerCase();

        const isMatch = name.includes(searchTerm) || location.includes(searchTerm);
        profile.parentElement.style.display = isMatch ? 'flex' : 'none';
      });
    });
  });

function createProfileTemplate(user) {
  return `
    <div class="profile">
      <img src="${user.avatar}" alt="${user.name}">
      <div class="datos">
        <h4>${user.name_full}</h4>
        <h5>${user.description}</h5>
      </div>
    </div>
  `;
}
