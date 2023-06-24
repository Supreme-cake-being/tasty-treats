import"./main-d112b649.js";const c=async()=>{try{const t=await fetch("https://tasty-treats-backend.p.goit.global/api/recipes"),{totalPages:e}=await t.json(),n=Array.from({length:e},async(o,a)=>(await v(a+1)).results),r=(await Promise.all(n)).flat(),{times:p,areas:l,titles:u,previews:g,categories:d,descriptions:y}=r.reduce((o,a)=>{const{time:i,area:m,title:h,preview:w,category:b,description:f}=a;return o.times.push(i),o.areas.push(m),o.titles.push(h),o.previews.push(w),o.categories.push(b),o.descriptions.push(f),o},{times:[],areas:[],titles:[],previews:[],categories:[],descriptions:[]});return{recipes:r,times:p,areas:l,titles:u,previews:g,categories:d,descriptions:y}}catch(t){return console.error("Помилка під час виконання запиту:",t),null}};async function v(t){try{return await(await fetch(`https://tasty-treats-backend.p.goit.global/api/recipes?page=${t}`)).json()}catch(e){return console.error("Помилка під час виконання запиту:",e),null}}const S=async()=>{try{return(await(await fetch("https://tasty-treats-backend.p.goit.global/api/ingredients")).json()).map(s=>s.name)}catch(t){return console.error("Помилка під час виконання запиту:",t),[]}},j=async()=>{try{return(await(await fetch("https://tasty-treats-backend.p.goit.global/api/categories")).json()).map(s=>s.name)}catch(t){return console.error("Помилка під час виконання запиту:",t),[]}};document.querySelector(".gallery");async function $(){const t=document.querySelector(".categories-list"),n=(await j()).map(s=>`<li class="categories-item">
                <button class="category-btn"
                  type="button">${s}
                </button>
              </li>`).join("");t.innerHTML+=n}$();async function T(t){const e=document.querySelector(".select-time"),n=['<option value=""></option>',...new Set(t)].sort((s,r)=>s-r).map(s=>`<option value="">${s} min</option>`);e.innerHTML=n.join("")}async function q(t){const e=document.querySelector(".select-area"),n=['<option value=""></option>',...new Set(t)].sort().map(s=>`<option value="">${s}</option>`);e.innerHTML=n.join("")}async function L(){const{times:t,areas:e}=await c();await T(t),await q(e)}L();async function k(){const t=await S(),e=document.querySelector(".select-ingredients"),n=['<option value=""></option>',...new Set(t)].sort().map(s=>`<option value="">${s}</option>`);e.innerHTML=n.join("")}k();const E=document.querySelector(".gallery"),{titles:H,previews:M,descriptions:R}=c(),A=M.map((t,e)=>`<div class="card-recipe" style="background-image: url(${t})">
            <svg class="card-heart"
              src="/images/heart.svg"
              width="22"
              height="22"></svg>
            <h3 class="card-title">${H[e]}</h3>
            <p class="card-description">${R[e]}</p>
            <button type="button" class="card-button">
              See recipe
            </button>
          </div>`).join("");E.innerHTML+=A;
