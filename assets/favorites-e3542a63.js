import{f as u}from"./header-24b1e038.js";const c={categories:document.querySelector(".categories"),favorites:document.querySelector(".favorites"),noData:document.querySelector(".no-data")};function l(t,r){if(c.categories.innerHTML="",!t)return;const a=t.filter(s=>r.some(e=>s.name===e.category)).map(s=>{const e=document.createElement("button");return e.setAttribute("type","button"),e.classList.add("categories-btn","btn"),e.addEventListener("click",()=>{if(e.classList.contains("active")){e.classList.remove("active"),n(r,null);return}a.forEach(o=>{o.classList.remove("active")}),e.classList.add("active"),n(r,s.name)}),e.textContent=s.name,e}),i=document.createElement("button");i.classList.add("categories-btn","btn","all-categories"),i.textContent="All categories",i.addEventListener("click",()=>{n(r,null),a.forEach(s=>{s.classList.remove("active")})}),c.categories.append(i,...a)}function n(t,r){c.favorites.innerHTML="";const a=t.filter(i=>r?i.category===r:!0).map(i=>{const s=document.createElement("li");return s.innerHTML=g(i),s.querySelector(".favorites-btn").addEventListener("click",()=>{const e=t.filter(o=>o._id!==i._id);localStorage.setItem("favorites",JSON.stringify(e)),d()}),s.setAttribute("data-id",i._id),s});c.favorites.append(...a)}function d(){const t=JSON.parse(localStorage.getItem("favorites"));!t||!t.length?(c.noData.style.display="flex",n(t),l(null,t)):u().then(r=>{n(t),l(r,t)})}function g(t){return`
    <li class="card-recipe">
            <img class="card-img" src="${t.preview}" />
            <button class="favorites-btn" data-id="${t._id}" type="button">
                <svg class="is-favorite" width="22" height="22">
                    <use href="./img/icons.svg#heart"></use>
                </svg>
            </button>
            <div class="card-info">
                <h3 class="card-title">${t.title}</h3>
                <p class="card-description">${t.description}</p>
                <div class="card-additional-info">
                    <p>${t.rating}</p>
                    <ul class="card-rating">
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg>    
                        </li>
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg> 
                        </li>
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg>   
                        </li>
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg>     
                        </li>
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg>     
                        </li>
                    </ul>
                    <button type="button" class="card-button" data-id="${t._id}">See recipe</button>
                </div>
            </div>
        </li>
  `}d();
