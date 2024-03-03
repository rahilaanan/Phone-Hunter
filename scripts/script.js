const loadData = async(search ='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}



const displayPhones = (phones, isShowAll) =>{
// console.log(phones)

const cardContainer = document.getElementById("card-container");
cardContainer.textContent = '';

const showAll = document.getElementById('showAll');
if(phones.length > 9 && !isShowAll){
    showAll.classList.remove("hidden");

}else{
    showAll.classList.add("hidden")
}
if(!isShowAll){
    phones = phones.slice(0,9);
}

phones.forEach(phone =>{
    // console.log(phone);
    const card = document.createElement('div');
    card.classList =`card p-9 bg-white shadow-xl`
    card.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.brand}</h2>
                  <p>${phone.phone_name}</p>
                  <div class="card-actions justify-center">
                    <button onclick="showModal('${phone.slug}')" class="btn ">Buy Now</button>
                  </div>
                </div>
              
    `;
    cardContainer.appendChild(card);
    
});
//hide loading spinner
spinner(false);
}
//search handler
const handlerSearch = (isShowAll) =>{
    spinner(true)
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   console.log(searchText)
   loadData(searchText,isShowAll);

}



const spinner = (isLoading) => {
const loadProgram = document.getElementById("spinner");
if(isLoading){
    loadProgram.classList.remove("hidden")
}else{
    loadProgram.classList.add("hidden")
}
}

// handle show all button 
const handleShowAll= ()=>{
handlerSearch(true);
}

//showModal
const showModal =async(id) =>{
//load single data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
 const data = await res.json();
//  console.log(data);
 const phone = data.data;
 showDetails(phone)
}

const showDetails = (phone)=>{
    console.log(phone);
    const phonName= document.getElementById("show-phone-name");
    phonName.innerText = phone.name;
    const features = document.getElementById("mainFeatures");
    features.innerHTML =`
    <img src ="${phone.image}" alt="" class="mx-auto"/>
    <P> <span> Storage: </span>${phone?.mainFeatures?.storage} </p>
    `
    my_modal_5.showModal();
}
 loadData();