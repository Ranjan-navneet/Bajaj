const developersContainer = document.getElementById('developers-container');
const searchNameInput = document.getElementById('search-name');
const filterDesignationSelect = document.getElementById('filter-designation');

// Fetch JSON data from the provided source
fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch developers data');
    }
    return response.json();
  })
  .then(data => {
    const developers = data.developers;

    // Render all developers initially
    renderDevelopers(developers);

    // Add event listeners for search and filter
    searchNameInput.addEventListener('input', handleSearch);
    filterDesignationSelect.addEventListener('change', handleFilter);

    function renderDevelopers(developers) {
      developersContainer.innerHTML = '';

      if (developers.length === 0) {
        developersContainer.innerHTML = '<p>No developers found.</p>';
        return;
      }

      developers.forEach(developer => {
        const card = document.createElement('div');
        card.classList.add('developer-card');

        const name = document.createElement('h2');
        name.textContent = developer.name;

        const designation = document.createElement('p');
        designation.textContent = `Designation: ${developer.designation}`;

        const skills = document.createElement('p');
        skills.textContent = `Skills: ${developer.skills.join(', ')}`;

        const email = document.createElement('p');
        email.textContent = `Email: ${developer.email}`;

        card.appendChild(name);
        card.appendChild(designation);
        card.appendChild(skills);
        card.appendChild(email);

        developersContainer.appendChild(card);
      });
    }

    function handleSearch() {
      const searchTerm = searchNameInput.value.toLowerCase();
      const filteredDevelopers = developers.filter(developer => developer.name.toLowerCase().includes(searchTerm));
      renderDevelopers(filteredDevelopers);
    }

    function handleFilter() {
      const selectedDesignation = filterDesignationSelect.value;
      if (selectedDesignation === '') {
        renderDevelopers(developers);
      } else {
        const filteredDevelopers = developers.filter(developer => developer.designation === selectedDesignation);
        renderDevelopers(filteredDevelopers);
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
    developersContainer.innerHTML = '<p>An error occurred while retrieving developers data.</p>';
  });
