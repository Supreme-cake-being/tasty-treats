import{f as u}from"./API-9c92df24.js";const c={categories:document.querySelector(".categories"),favorites:document.querySelector(".favorites"),noData:document.querySelector(".no-data")};function l(e,s){if(c.categories.innerHTML="",!e)return;const i=e.filter(n=>s.some(t=>n.name===t.category)).map(n=>{const t=document.createElement("button");return t.setAttribute("type","button"),t.classList.add("categories-btn","btn"),t.addEventListener("click",()=>{if(t.classList.contains("active")){t.classList.remove("active"),a(s,null);return}i.forEach(o=>{o.classList.remove("active")}),t.classList.add("active"),a(s,n.name)}),t.textContent=n.name,t}),r=document.createElement("button");r.classList.add("categories-btn","btn","all-categories"),r.textContent="All categories",r.addEventListener("click",()=>{a(s,null),i.forEach(n=>{n.classList.remove("active")})}),c.categories.append(r,...i)}function a(e,s){c.favorites.innerHTML="";const i=e.filter(r=>s?r.category===s:!0).map(r=>{const n=document.createElement("li");return n.innerHTML=m(r),n.querySelector(".favorites-btn").addEventListener("click",()=>{const t=e.filter(o=>o._id!==r._id);localStorage.setItem("favorites",JSON.stringify(t)),d()}),n.setAttribute("data-id",r._id),n});c.favorites.append(...i)}function d(){const e=JSON.parse(localStorage.getItem("favorites"));!e||!e.length?(c.noData.style.display="flex",a(e),l(null,e)):u().then(s=>{a(e),l(s,e)})}function m(e){return`
    <div class="card-recipe" style="background-image: url(${e.preview})">
        <button class="favorites-btn" data-id="${e._id}" type="button">
            <svg class="icon-heart" width="22" height="22">
                <use href="./img/icons.svg#heart-filled"></use>
            </svg>
        </button>
        <h3 class="card-title">${e.title}</h3>
        <p class="card-description">${e.description}</p>
        <button type="button" class="card-button" data-id="${e._id}">See recipe</button>
    </div>
  `}d();
