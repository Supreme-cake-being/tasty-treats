import{P as f,f as h}from"./header-3dcce4a0.js";const u={categories:document.querySelector(".categories"),favorites:document.querySelector(".favorites"),noData:document.querySelector(".no-data")};let o,c;const d=12;c=new f(document.getElementById("tui-pagination-container"),{page:1,visiblePages:3,itemsPerPage:d,totalItems:0,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn tui-page">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}});function m(e,i){if(u.categories.innerHTML="",!e)return;const n=e.filter(t=>i.some(s=>t.name===s.category));n.some(t=>t.name===o)||(o=null);const r=n.map(t=>{const s=document.createElement("button");return s.setAttribute("type","button"),s.classList.add("categories-btn","btn","favotites-btn"),t.name===o&&s.classList.add("active"),s.addEventListener("click",()=>{if(c.movePageTo(1),s.classList.contains("active")){s.classList.remove("active"),l(i,null),o=null;return}r.forEach(p=>{p.classList.remove("active")}),s.classList.add("active"),l(i,t.name),o=t.name}),s.textContent=t.name,s}),a=document.createElement("button");a.classList.add("categories-btn","btn","all-categories","favotites-btn"),a.textContent="All categories",a.addEventListener("click",()=>{l(i,null),o=null,r.forEach(t=>{t.classList.remove("active")})}),u.categories.append(a,...r)}function l(e,i){u.favorites.innerHTML="";const n=e.filter(a=>i?a.category===i:!0);v(e,n.length,c.getCurrentPage());const r=n.slice(d*(c.getCurrentPage()-1),d*c.getCurrentPage()).map(a=>{const t=document.createElement("li");return t.classList.add("card-recipe","favorit-recipe"),t.innerHTML=y(a),t.querySelector(".card-favorites-btn").addEventListener("click",()=>{const s=e.filter(p=>p._id!==a._id);localStorage.setItem("favorites",JSON.stringify(s)),g()}),t});u.favorites.append(...r)}window.addEventListener("refresh-favorites",g);function g(){const e=JSON.parse(localStorage.getItem("favorites"))||[];!e||!e.length?(u.noData.style.display="flex",window.innerWidth<767?document.querySelector(".hero-favotites").style.display="none":document.querySelector(".hero-favotites").style.display="block",document.getElementById("tui-pagination-container").style.display="none",l(e),m(null,e)):h().then(i=>{m(i,e),v(e,100,1),l(e,o)})}function y({_id:e,preview:i,title:n,description:r,rating:a}){const t=[];a=Math.floor(a),a>5&&(a=5);for(let s=0;s<5;s++)s<Math.floor(a)?t.push(`<li>
                          <svg class="card-star" width="18" height="18">
                              <use href="/tasty-treats/assets/icons-e30ccde6.svg#icon-star-colored"></use>
                          </svg>
                      </li>`):t.push(`<li>
                          <svg class="card-star" width="18" height="18">
                              <use href="/tasty-treats/assets/icons-e30ccde6.svg#icon-star-no-colored"></use>
                          </svg>
                      </li>`);return`
            <img class="card-img" src="${i}" />
            <button class="card-favorites-btn" data-id="${e}" type="button">
                <svg class="icon-heart is-favorite" width="22" height="22">
                    <use href="/tasty-treats/assets/icons-e30ccde6.svg#heart"></use>
                </svg>
            </button>
            <div class="card-info">
                <h3 class="card-title">${n}</h3>
                <p class="card-description">${r}</p>
                <div class="card-additional-info">
                    <p>${a}</p>
                    <ul class="card-rating">${t.join("")}</ul>
                    <button type="button" class="card-button" data-id="${e}">See recipe</button>
                </div>
            </div>
        `}function v(e,i,n){if(i<=d){document.getElementById("tui-pagination-container").style.display="none";return}else document.getElementById("tui-pagination-container").style.display="";c=new f(document.getElementById("tui-pagination-container"),{page:n,visiblePages:3,itemsPerPage:d,totalItems:i,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn tui-page">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}"></span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}"></span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}}),c.on("afterMove",r=>{l(e,o)})}g();
