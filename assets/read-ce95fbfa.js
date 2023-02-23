import{c as f,a as l,l as m,f as p,m as D,s as _,u as A,r as E,g as B,e as S,h as x}from"./authForm-bf986623.js";f();const n={readPage:document.querySelector(".read-page-gallery"),emptyPage:document.querySelector(".empty-page"),nameRef:document.getElementById("name"),passRef:document.getElementById("pass"),emailRef:document.getElementById("email"),formRef:document.getElementById("form"),buttonLogin:document.getElementById("login"),buttonRegistr:document.querySelector(".registr"),buttonLogout:document.querySelector(".logout")};if(l("user")){const e=l("user");q(e)}else m("readCards")&&w(m("readCards")),p(n.readPage);n.readPage.addEventListener("click",P);function P(e){const a=e.target,t=m("favCards")||[];if(a.nodeName==="P"||a.nodeName==="DIV"){const r=a.closest(".item-news__article"),s=D(r),o=r.querySelector(".item-news__add-text"),i=r.querySelector("#icon-heart"),d=t.map(c=>c.title).indexOf(s.title);if(!s.title)return;if(d==-1?(t.unshift(s),i.classList.add("is-saved"),o.textContent="Remove from favorite"):(t.splice(d,1),o.textContent="Add to favorite",i.classList.remove("is-saved")),l("user")){const c=l("user");_("favCards",t),A(c,{favCards:m("favCards")})}else _("favCards",t)}f()}function w(e){const a=I(e);R(a)}function R(e){const a=Object.keys(e);!a.length>0?n.emptyPage.classList.add("is-show"):n.emptyPage.classList.remove("is-show");for(let t of a){const r=e[t],s=j(),o=M(t),i=$(),u=T(),d=O(),c=r.map(g=>{const{image:y,section:h,title:L,limitString:C,date:k,url:b}=g;return`<li class="list-news__item">
												<article class="item-news__article">
													<div class='item-news__already-read is-read'>
														<span class='item-news__already-read-text'>Have read</span>
													</div>
													<div class="item-news__content">
														<div class="item-news__wrapper-img">
															<img class="item-news__img" src="${y}" alt="">
															<p class="item-news__category">${h}</p>
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
															<p class="item-news__description">${C}</p>
														</div>
														<div class="item-news__info">
															<span class="item-news__info-date">
																${k}
															</span>
															<a class="item-news__info-link" target="_blank" href="${b}#">Read more</a>
														</div>
													</div>
												</article>
											</li>`});o.append(i),u.insertAdjacentHTML("beforeend",c.join("")),s.appendChild(o),s.appendChild(d),s.appendChild(u);const v=s.querySelectorAll(".accordion__title");F(v),n.readPage.appendChild(s),n.readPage.classList.add("have-read-articles")}}function q(e){const a=E(B());S(x(a,`users/${e}/readCards`)).then(t=>{if(t.exists()){const r=t.val(),s=Object.values(r).flat();w(s),p(n.readPage),n.emptyPage.classList.remove("is-show")}else n.emptyPage.classList.add("is-show"),console.log("No data available")}).catch(t=>{console.error(t)})}function I(e){return e.sort((t,r)=>new Date(r.watchDate)-new Date(t.watchDate)).reduce((t,r)=>{const s=new Date(r.watchDate).toLocaleDateString("en-GB",{year:"numeric",day:"numeric",month:"numeric"});return t[s]?t[s].push(r):t[s]=[r],t},{})}function j(){const e=document.createElement("div");return e.classList.add("accordion__by-date"),e}function M(e){const a=document.createElement("h2");return a.classList.add("accordion__title"),a.classList.add("container"),a.textContent=e,a}function $(){const e=document.createElement("div");return e.classList.add("accordion__arrow"),e.classList.add("accordion__arrow--down"),e}function O(){const e=document.createElement("div");return e.classList.add("accordion__border"),e}function T(){const e=document.createElement("ul");return e.classList.add("accordion__content"),e.classList.add("container"),e}function F(e){e.forEach(a=>a.addEventListener("click",N))}function N(e){const t=e.target.closest(".accordion__by-date"),r=t.querySelector(".accordion__arrow"),s=t.querySelector(".accordion__content");r.classList.contains("accordion__arrow--down")?(r.classList.replace("accordion__arrow--down","accordion__arrow--up"),s.classList.add("is-active")):(r.classList.replace("accordion__arrow--up","accordion__arrow--down"),s.classList.remove("is-active"))}
