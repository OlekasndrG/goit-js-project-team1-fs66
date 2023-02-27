import{c as g,d as p,l as n,m as u,a as v,s as _,u as w,f as y}from"./authForm-4bb3c28e.js";const s={favPage:document.querySelector(".favotire-page-gallery"),emptyPage:document.querySelector(".empty-page"),nameRef:document.getElementById("name"),passRef:document.getElementById("pass"),emailRef:document.getElementById("email"),formRef:document.getElementById("form"),buttonLogin:document.getElementById("login"),buttonRegistr:document.querySelector(".registr"),buttonLogout:document.querySelector(".logout")};g();x();s.favPage.addEventListener("click",C);function C(a){const e=a.target;e.nodeName==="A"&&p(e);const i=n("favCards")||[];if(e.nodeName==="P"||e.nodeName==="DIV"){const t=e.closest(".item-news__article"),d=t.closest(".list-news__item"),r=u(t),o=t.querySelector(".item-news__add-text"),c=t.querySelector("#icon-heart"),l=i.map(m=>m.title).indexOf(r.title);if(i.splice(l,1),o.textContent="Add to favorite",c.classList.remove("is-saved"),t.classList.add("is-disappered"),setTimeout(()=>{d.classList.add("is-removed")},700),k(),v("user")){const m=v("user");_("favCards",i),w(m,{favCards:n("favCards")})}else _("favCards",i)}g()}function h(a){const e=document.createElement("ul");e.classList.add("list-news");const i=a.map(t=>{const{image:d,section:r,title:o,limitString:c,date:f,url:l}=t;return`<li class="list-news__item">
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
															<img class="item-news__img" src="${d}" alt="">
															<p class="item-news__category">${r}</p>
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
															<h2 class="item-news__title">${o}</h2>
															<p class="item-news__description">${c}</p>
														</div>
														<div class="item-news__info">
															<span class="item-news__info-date">
																${f}
															</span>
															<a class="item-news__info-link" target="_blank" href="${l}#">Read more</a>
														</div>
													</div>
												</article>
											</li>`});e.insertAdjacentHTML("beforeend",i.join("")),L(e)}function L(a){a.hasChildNodes()?(s.favPage.appendChild(a),s.favPage.classList.add("is-favorite")):(s.emptyPage.classList.add("is-show"),s.favPage.classList.remove("is-favorite"))}function k(){n("favCards").length===1&&setTimeout(()=>{s.emptyPage.classList.add("is-show")},500)}function x(){n("favCards")&&(h(n("favCards")),y(s.favPage))}
