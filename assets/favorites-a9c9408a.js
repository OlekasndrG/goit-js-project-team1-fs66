import{c as _,l,f as g,d as u,m as p,a as f,s as v,u as w}from"./authForm-26c78b9b.js";const s={favPage:document.querySelector(".favotire-page-gallery"),emptyPage:document.querySelector(".empty-page"),nameRef:document.getElementById("name"),passRef:document.getElementById("pass"),emailRef:document.getElementById("email"),formRef:document.getElementById("form"),buttonLogin:document.getElementById("login"),buttonRegistr:document.querySelector(".registr"),buttonLogout:document.querySelector(".logout")};_();l("favCards")&&(C(l("favCards")),g(s.favPage));s.favPage.addEventListener("click",y);function y(a){const e=a.target;e.nodeName==="A"&&u(e);const t=l("favCards")||[];if(e.nodeName==="P"||e.nodeName==="DIV"){const i=e.closest(".item-news__article"),n=p(i),o=i.querySelector(".item-news__add-text"),d=i.querySelector("#icon-heart"),c=t.map(r=>r.title).indexOf(n.title);if(!n.title)return;if(c==-1?(t.unshift(n),d.classList.add("is-saved"),o.textContent="Remove from favorite"):(t.splice(c,1),o.textContent="Add to favorite",d.classList.remove("is-saved")),f("user")){const r=f("user");v("favCards",t),w(r,{favCards:l("favCards")})}else v("favCards",t)}_()}function C(a){const e=document.createElement("ul");e.classList.add("list-news"),e.classList.add("favorite-flex-start");const t=a.map(i=>{const{image:n,section:o,title:d,limitString:m,date:c,url:r}=i;return`<li class="list-news__item">
												<article class="item-news__article">
													<div class='item-news__already-read'>
														<span class='item-news__already-read-text'>Already read</span>
														<svg class='item-news__icon item-news__icon-check' viewBox="0 0 14 14">
															<path
																d="M16.188 3.594a.6.6 0 0 0-.412.182L6.6 12.952 2.824 9.176a.6.6 0 1 0-.848.848l4.2 4.2a.6.6 0 0 0 .848 0l9.6-9.6a.6.6 0 0 0-.436-1.03Z"
																fill="#00DD73" />
														</svg>
													</div>
													<div class="item-news__content">
														<div class="item-news__wrapper-img">
															<img class="item-news__img" src="${n}" alt="">
															<p class="item-news__category">${o}</p>
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
															<h2 class="item-news__title">${d}</h2>
															<p class="item-news__description">${m}</p>
														</div>
														<div class="item-news__info">
															<span class="item-news__info-date">
																${c}
															</span>
															<a class="item-news__info-link" target="_blank" href="${r}#">Read more</a>
														</div>
													</div>
												</article>
											</li>`});e.insertAdjacentHTML("beforeend",t.join("")),h(e)}function h(a){a.hasChildNodes()?(s.favPage.appendChild(a),s.favPage.classList.add("is-favorite")):(s.emptyPage.classList.add("is-show"),s.favPage.classList.remove("is-favorite"))}
