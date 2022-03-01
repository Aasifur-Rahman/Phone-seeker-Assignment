const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
         <div class="card">
             <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <p class="card-text">${phone.brand}</p>
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <button class="btn-style">Explore</button>
                     
           </div>
         </div>
         `;
        searchResult.appendChild(div);
    })
}
