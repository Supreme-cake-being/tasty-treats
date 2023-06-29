import{f as v,P as h}from"./header-3c783956.js";const u={categories:document.querySelector(".categories"),favorites:document.querySelector(".favorites"),noData:document.querySelector(".no-data")};let o,c;const g=12;function p(e,s){if(u.categories.innerHTML="",!e)return;const i=e.filter(t=>s.some(a=>t.name===a.category));i.some(t=>t.name===o)||(o=null);const r=i.map(t=>{const a=document.createElement("button");return a.setAttribute("type","button"),a.classList.add("categories-btn","btn","favotites-btn"),t.name===o&&a.classList.add("active"),a.addEventListener("click",()=>{if(c.movePageTo(1),a.classList.contains("active")){a.classList.remove("active"),l(s,null),o=null;return}r.forEach(d=>{d.classList.remove("active")}),a.classList.add("active"),l(s,t.name),o=t.name}),a.textContent=t.name,a}),n=document.createElement("button");n.classList.add("categories-btn","btn","all-categories","favotites-btn"),n.textContent="All categories",n.addEventListener("click",()=>{l(s,null),o=null,r.forEach(t=>{t.classList.remove("active")})}),u.categories.append(n,...r)}function l(e,s){u.favorites.innerHTML="";const i=e.filter(n=>s?n.category===s:!0);f(e,i.length,c.getCurrentPage());const r=i.slice(g*(c.getCurrentPage()-1),g*c.getCurrentPage()).map(n=>{const t=document.createElement("li");return t.classList.add("card-recipe"),t.innerHTML=b(n),t.querySelector(".card-favorites-btn").addEventListener("click",()=>{const a=e.filter(d=>d._id!==n._id);localStorage.setItem("favorites",JSON.stringify(a)),m()}),t});u.favorites.append(...r)}function m(){const e=JSON.parse(localStorage.getItem("favorites"));!e||!e.length?(u.noData.style.display="flex",document.querySelector(".hero-favotites").style.display="none",document.getElementById("tui-pagination-container").style.display="none",l(e),p(null,e)):v().then(s=>{p(s,e),f(e,100,1),l(e,o)})}function b({_id:e,preview:s,title:i,description:r,rating:n}){const t=[];for(let a=0;a<5;a++)a<Math.floor(n)?t.push(`<li>
                          <svg class="card-star" width="18" height="18">
                              <use href="./img/icons.svg#icon-star-colored"></use>
                          </svg>
                      </li>`):t.push(`<li>
                          <svg class="card-star" width="18" height="18">
                              <use href="./img/icons.svg#icon-star-no-colored"></use>
                          </svg>
                      </li>`);return`
            <img class="card-img" src="${s}" />
            <button class="card-favorites-btn" data-id="${e}" type="button">
                <svg class="icon-heart" width="22" height="22">
                    <use href="./img/icons.svg#heart"></use>
                </svg>
            </button>
            <div class="card-info">
                <h3 class="card-title">${i}</h3>
                <p class="card-description">${r}</p>
                <div class="card-additional-info">
                    <p>${n}</p>
                    <ul class="card-rating">${t.join("")}</ul>
                    <button type="button" class="card-button" data-id="${e}">See recipe</button>
                </div>
            </div>
        `}function f(e,s,i){c=new h(document.getElementById("tui-pagination-container"),{page:i,visiblePages:3,itemsPerPage:g,totalItems:s,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn tui-page">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),c.on("afterMove",r=>{l(e,o)})}m();
