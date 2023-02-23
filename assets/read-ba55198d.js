import{c as f,a as l,l as m,f as p,m as E,s as _,u as A,r as S,g as B,e as x,h as P}from"./authForm-4ddba95c.js";f();const n={readPage:document.querySelector(".read-page-gallery"),emptyPage:document.querySelector(".empty-page"),nameRef:document.getElementById("name"),passRef:document.getElementById("pass"),emailRef:document.getElementById("email"),formRef:document.getElementById("form"),buttonLogin:document.getElementById("login"),buttonRegistr:document.querySelector(".registr"),buttonLogout:document.querySelector(".logout")};if(l("user")){const e=l("user");I(e)}else m("readCards")&&w(m("readCards")),v(),p(n.readPage);n.readPage.addEventListener("click",R);function R(e){const a=e.target,t=m("favCards")||[];if(a.nodeName==="P"||a.nodeName==="DIV"){const s=a.closest(".item-news__article"),r=E(s),o=s.querySelector(".item-news__add-text"),i=s.querySelector("#icon-heart"),d=t.map(c=>c.title).indexOf(r.title);if(!r.title)return;if(d==-1?(t.unshift(r),i.classList.add("is-saved"),o.textContent="Remove from favorite"):(t.splice(d,1),o.textContent="Add to favorite",i.classList.remove("is-saved")),l("user")){const c=l("user");_("favCards",t),A(c,{favCards:m("favCards")})}else _("favCards",t)}f()}function w(e){const a=j(e);q(a)}function q(e){const a=Object.keys(e);for(let t of a){const s=e[t],r=M(),o=$(t),i=O(),u=F(),d=T(),c=s.map(y=>{const{image:h,section:C,title:L,limitString:k,date:b,url:D}=y;return`<li class="list-news__item">
												<article class="item-news__article">
													<div class='item-news__already-read is-read'>
														<span class='item-news__already-read-text'>Have read</span>
													</div>
													<div class="item-news__content">
														<div class="item-news__wrapper-img">
															<img class="item-news__img" src="${h}" alt="">
															<p class="item-news__category">${C}</p>
															<div class="item-news__add-to-favorite">
																<p class="item-news__add-text">Add to favorite</p>
																<svg class='item-news__icon' id='icon-heart' viewBox="0 0 30 32">
																	<path stroke="#4440F7" style="stroke: var(--color3, #4440F7)" stroke-linejoin="round" stroke-linecap="round"
																		stroke-miterlimit="4" stroke-width="2"
																		d="M9.334 4c-3.682 0-6.668 2.954-6.668 6.6 0 2.942 1.168 9.926 12.652 16.986 0.194 0.12 0.43 0.191 0.682 0.191s0.488-0.071 0.688-0.194l-0.006 0.003c11.484-7.060 12.652-14.044 12.652-16.986 0-3.646-2.986-6.6-6.668-6.6-3.68 0-6.666 4-6.666 4s-2.986-4-6.666-4z">
																	</path>
																</svg>
															</div>
														</div>
														<div class="item-news__wrapper-text">
															<h2 class="item-news__title">${L}</h2>
															<p class="item-news__description">${k}</p>
														</div>
														<div class="item-news__info">
															<span class="item-news__info-date">
																${b}
															</span>
															<a class="item-news__info-link" target="_blank" href="${D}#">Read more</a>
														</div>
													</div>
												</article>
											</li>`});o.append(i),u.insertAdjacentHTML("beforeend",c.join("")),r.appendChild(o),r.appendChild(d),r.appendChild(u);const g=r.querySelectorAll(".accordion__title");N(g),n.readPage.appendChild(r)}}function I(e){const a=S(B());x(P(a,`users/${e}/readCards`)).then(t=>{if(t.exists()){const s=t.val(),r=Object.values(s).flat();w(r),v(),p(n.readPage)}else console.log("No data available")}).catch(t=>{console.error(t)})}function j(e){return e.sort((t,s)=>new Date(s.watchDate)-new Date(t.watchDate)).reduce((t,s)=>{const r=new Date(s.watchDate).toLocaleDateString("en-GB",{year:"numeric",day:"numeric",month:"numeric"});return t[r]?t[r].push(s):t[r]=[s],t},{})}function v(){document.querySelector(".accordion__content")?n.readPage.classList.add("have-read-articles"):(n.emptyPage.classList.add("is-show"),n.readPage.classList.remove("have-read-articles"))}function M(){const e=document.createElement("div");return e.classList.add("accordion__by-date"),e}function $(e){const a=document.createElement("h2");return a.classList.add("accordion__title"),a.classList.add("container"),a.textContent=e,a}function O(){const e=document.createElement("div");return e.classList.add("accordion__arrow"),e.classList.add("accordion__arrow--down"),e}function T(){const e=document.createElement("div");return e.classList.add("accordion__border"),e}function F(){const e=document.createElement("ul");return e.classList.add("accordion__content"),e.classList.add("container"),e}function N(e){e.forEach(a=>a.addEventListener("click",G))}function G(e){const t=e.target.closest(".accordion__by-date"),s=t.querySelector(".accordion__arrow"),r=t.querySelector(".accordion__content");s.classList.contains("accordion__arrow--down")?(s.classList.replace("accordion__arrow--down","accordion__arrow--up"),r.classList.add("is-active")):(s.classList.replace("accordion__arrow--up","accordion__arrow--down"),r.classList.remove("is-active"))}
