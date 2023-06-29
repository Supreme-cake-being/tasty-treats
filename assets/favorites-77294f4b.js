import{f as v,P as h}from"./header-1b507def.js";const u={categories:document.querySelector(".categories"),favorites:document.querySelector(".favorites"),noData:document.querySelector(".no-data")};let o,c;const g=12;function p(e,n){if(u.categories.innerHTML="",!e)return;const i=e.filter(t=>n.some(s=>t.name===s.category));i.some(t=>t.name===o)||(o=null);const r=i.map(t=>{const s=document.createElement("button");return s.setAttribute("type","button"),s.classList.add("categories-btn","btn","favotites-btn"),t.name===o&&s.classList.add("active"),s.addEventListener("click",()=>{if(c.movePageTo(1),s.classList.contains("active")){s.classList.remove("active"),l(n,null),o=null;return}r.forEach(d=>{d.classList.remove("active")}),s.classList.add("active"),l(n,t.name),o=t.name}),s.textContent=t.name,s}),a=document.createElement("button");a.classList.add("categories-btn","btn","all-categories","favotites-btn"),a.textContent="All categories",a.addEventListener("click",()=>{l(n,null),o=null,r.forEach(t=>{t.classList.remove("active")})}),u.categories.append(a,...r)}function l(e,n){u.favorites.innerHTML="";const i=e.filter(a=>n?a.category===n:!0);f(e,i.length,c.getCurrentPage());const r=i.slice(g*(c.getCurrentPage()-1),g*c.getCurrentPage()).map(a=>{const t=document.createElement("li");return t.classList.add("card-recipe"),t.innerHTML=b(a),t.querySelector(".card-favorites-btn").addEventListener("click",()=>{const s=e.filter(d=>d._id!==a._id);localStorage.setItem("favorites",JSON.stringify(s)),m()}),t});u.favorites.append(...r)}function m(){const e=JSON.parse(localStorage.getItem("favorites"));!e||!e.length?(u.noData.style.display="flex",document.querySelector(".hero-favotites").style.display="none",document.getElementById("tui-pagination-container").style.display="none",l(e),p(null,e)):v().then(n=>{p(n,e),f(e,100,1),l(e,o)})}function b({_id:e,preview:n,title:i,description:r,rating:a}){const t=[];a=Math.floor(a),a>5&&(a=5);for(let s=0;s<5;s++)s<Math.floor(a)?t.push(`<li>
                          <svg class="card-star" width="18" height="18">
                              <use href="./img/icons.svg#icon-star-colored"></use>
                          </svg>
                      </li>`):t.push(`<li>
                          <svg class="card-star" width="18" height="18">
                              <use href="./img/icons.svg#icon-star-no-colored"></use>
                          </svg>
                      </li>`);return`
            <img class="card-img" src="${n}" />
            <button class="card-favorites-btn" data-id="${e}" type="button">
                <svg class="icon-heart" width="22" height="22">
                    <use href="./img/icons.svg#heart"></use>
                </svg>
            </button>
            <div class="card-info">
                <h3 class="card-title">${i}</h3>
                <p class="card-description">${r}</p>
                <div class="card-additional-info">
                    <p>${a}</p>
                    <ul class="card-rating">${t.join("")}</ul>
                    <button type="button" class="card-button" data-id="${e}">See recipe</button>
                </div>
            </div>
        `}function f(e,n,i){c=new h(document.getElementById("tui-pagination-container"),{page:i,visiblePages:3,itemsPerPage:g,totalItems:n,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn tui-page">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),c.on("afterMove",r=>{l(e,o)})}m();