document.getElementById('search-error').style.display = 'none';
document.getElementById('error-message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';

    //error handling
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

//Search result section
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data.length == 0) {
        Response("No results found");
    }
    const firstTwentyPhones = data.slice(0, 20);
    firstTwentyPhones.forEach(phone => {
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

const loadMore = document.getElementById('load-more');
loadMore.style.display = 'none';


// phone details section
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-25 pt-5  mx-auto" alt="...">
    <div class="card-body ">
        <h5 class="card-title fw-bold">${phone.name}</h5>
        <p class="card-text">${phone.releaseDate ? phone.releaseDate : "No Release Date Found"}</p>

        <h5 class="fw-bold ">Main Features</h5>
        <p class="card-text"><span class="fw-bold ">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
        <p class="card-text"><span class="fw-bold ">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
        <p class="card-text"><span class="fw-bold">Sensors:</span> ${phone.mainFeatures.sensors}</p>
        <p class="card-text"><span class="fw-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
        <p class="card-text"><span class="fw-bold" >Storage:</span> ${phone.mainFeatures.storage}</p>
        
        ${phone.others ? `
        <h5 class="fw-bold">Other Features</h5>
            <p class="card-text"><span class="fw-bold">Bluetooth:</span> ${phone.others.Bluetooth}</p>
            
            <p class="card-text"><span class="fw-bold">GPS:</span> ${phone.others.GPS}</p>
            <p class="card-text"><span class="fw-bold">NFC:</span> ${phone.others.NFC}</p>
            <p class="card-text"><span class="fw-bold">Radio:</span> ${phone.others.Radio}</p>
            <p class="card-text"><span class="fw-bold">USB:</span> ${phone.others.USB}</p>
            <p class="card-text"><span class="fw-bold pb-5">WLAN:</span> ${phone.others.WLAN}</p>` : ''}
    </div>
    `;

    phoneDetails.appendChild(div);


}
