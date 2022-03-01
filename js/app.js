document.getElementById('search-error').style.display = 'none';
document.getElementById('error-message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';
    document.getElementById('search-error').style.display = 'none';
    if (searchText == '') {
        document.getElementById('search-error').style.display = 'block';
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data.length == 0) {
        Response("No results found");
    }

    data.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
         <div class="card">
             <img  src="${phone.image}" class="card-img-top w-50 mx-auto p-3" alt="...">
                <div class="card-body">
                <p class="card-text">${phone.brand}</p>
                 <h5 class="card-title pb-3">${phone.phone_name}</h5>
                 <button onclick="loadPhoneDetail('${phone.slug}')" class="btn-style">Explore</button>         
           </div>
         </div>
         `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-25 p-3 mx-auto" alt="...">
    <div class="card-body ">
        <h5 class="card-title">${phone.name}</h5>
       
        <p class="card-text"><span class="fw-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
        <p class="card-text"><span class="fw-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
        <p class="card-text"><span class="fw-bold">Sensors:</span> ${phone.mainFeatures.sensors}</p>
        <p class="card-text"><span class="fw-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
        <p class="card-text"><span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
        <p class="card-text"> ${phone.releaseDate}</p>
        
    </div>
    `;
    phoneDetails.appendChild(div);
}
