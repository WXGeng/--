/**
 * Copyright (C) 2017
 * A project by mcx
 */
(function(g) {
	function b(G, H) {
		var F = new RegExp("(^|\\s)" + H + "(\\s|$)");
		return F.test(G.className)
	}

	function j(G, H) {
		var F = G.className.split(" ");
		if(G.className == "") {
			F = []
		}
		F.push(H);
		G.className = F.join(" ")
	}
0
	function n(G, H) {
		var F = new RegExp("(^|\\s)" + H + "(\\s|$)", "g");
		G.className = G.className.replace(F, " ")
	}
	var k = !!document.addEventListener;

	function i(G, F, H) {
		if(k) {
			G.addEventListener(F, H)
		} else {
			G.attachEvent("on" + F, H)
		}
	}

	function A(H, G, F) {
		if(k) {
			H.removeEventListener(G, F)
		} else {
			H.detachEvent("on" + G, F)
		}
	}

	function w(G, H) {
		for(var F in H) {
			G[F] = H[F]
		}
		return G
	}

	function v(I) {
		var G = ["animation", "webkitAnimation"];
		var F = {
			animation: "animationend",
			webkitAnimation: "webkitAnimationEnd"
		};
		for(var H = 0; H < G.length; H++) {
			if(I.style[G[H]] != undefined) {
				return F[G[H]]
			}
		}
		return undefined
	}

	function d(F) {
		var K = this.context = document.getElementById(F);
		var O = K.offsetHeight;
		var P = K.querySelectorAll(".accordion-item");
		var I = K.getElementsByTagName("h5")[0];
		var L = this.initH = I.offsetHeight;
		var J = O - P.length * L + L;
		this.h = J = J - 1 - 1;
		var Q = P[0];
		Q.style.height = J + "px";
		var N = Q.querySelector(".accordion-content");
		N.style.display = "block";
		N.style.height = J - L + "px";
		j(Q, "collapsable");
		j(Q.getElementsByTagName("i")[0], "collapse");
		var G = K.querySelectorAll(".accordion-head");
		var M = this;
		i(G[0], "click", function(R) {
			p.call(M, R.target || R.srcElement)
		});
		i(Q.getElementsByTagName("i")[0], "click", function(R) {
			p.call(M, R.target || R.srcElement)
		});
		for(var H = 1; H < P.length; H++) {
			i(G[H], "click", function(R) {
				p.call(M, R.target || R.srcElement)
			});
			i(P[H].getElementsByTagName("i")[0], "click", function(R) {
				p.call(M, R.target || R.srcElement)
			});
			P[H].style.height = L + "px";
			N = P[H].querySelector(".accordion-content");
			N.style.height = J - L + "px"
		}
	}
	var x = true;

	function p(I) {
		if(!b(I.parentNode, "collapsable") && x) {
			var H = this.context.querySelector(".collapsable");
			var G = H.querySelector(".accordion-content");
			G.style.display = "none";
			n(H, "collapsable");
			n(H.getElementsByTagName("i")[0], "collapse");
			j(I.parentNode, "collapsable");
			j(I.parentNode.getElementsByTagName("i")[0], "collapse");
			x = false;
			var F = I.parentNode;
			G = F.querySelector(".accordion-content");
			G.style.display = "block";
			r(H, I.parentNode, this.initH, this.h, function(K, J) {
				x = true
			})
		}
	}

	function r(L, H, K, G, M) {
		var F = parseInt(H.style.height);
		var J = G;
		var I = setInterval(function() {
			J = J - 15;
			L.style.height = J + "px";
			H.style.height = F + (G - J) + "px";
			if(J <= K) {
				L.style.height = K + "px";
				H.style.height = F + (G - K) + "px";
				clearInterval(I);
				M(L, H)
			}
		}, 10)
	}

	function h(F, N) {
		this.id = F;
		this.currentIndex = 0;
		this.options = {
			removeable: false,
			tabChange: function(Q, P, O) {}
		};
		this.options = w(this.options, N);
		var G = document.getElementById(F);
		var H = G.querySelector("#" + F + " > .tab-head");
		this.titleContainer = H.getElementsByTagName("ul")[0];
		this.contentContainer = G.querySelector("#" + F + " > .tab-content");
		this.tabTitles = [];
		var K = G.querySelectorAll(".tab-title");
		this.tabTitles.push.apply(this.tabTitles, K);
		this.tabContents = [];
		var M = G.querySelectorAll("#" + F + " > .tab-content > .content");
		this.tabContents.push.apply(this.tabContents, M);
		this.contentHeight = G.offsetHeight - H.offsetHeight - 2;
		this.tabContents[0].style.display = "block";
		var J = this;
		for(var I = 0; I < this.tabTitles.length; I++) {
			this.tabTitles[I].id = this.id + "_title-" + (I + 1);
			i(this.tabTitles[I], "click", function(O) {
				J._changeTab(O.target || O.srcElement)
			});
			this.tabContents[I].style.height = this.contentHeight - 10 + "px";
			if(this.options.removeable && I != 0) {
				var L = document.createElement("i");
				i(L, "click", function(O) {
					if(O.stopPropagation) {
						O.stopPropagation()
					}
					O.cancelBubble = true;
					J._removeTab(O.target || O.srcElement)
				});
				this.tabTitles[I].appendChild(L);
				this.tabTitles[I].style.paddingRight = "28px"
			}
		}
		if(this.options.removeable) {
			i(H, "contextmenu", function(O) {
				if(O.preventDefault) {
					O.preventDefault()
				} else {
					g.event.returnValue = false
				}
				if(!H.querySelector(".tab-menu")) {
					var T = O.pageX || O.clientX;
					var Q = O.pageY || O.clientY;
					var W = document.createElement("div");
					var R = document.createElement("div");
					var V = document.createElement("div");
					var U = document.createElement("div");
					var S = document.createElement("div");
					var P = document.createElement("div");
					R.style.left = T + "px";
					R.style.top = Q + "px";
					V.innerHTML = "关闭当前";
					U.innerHTML = "关闭其它";
					S.innerHTML = "关闭所有";
					P.innerHTML = "取消";
					j(W, "tab-menu-bg");
					j(R, "tab-menu");
					j(V, "tab-menu-opt");
					j(U, "tab-menu-opt");
					j(S, "tab-menu-opt");
					j(P, "tab-menu-opt");
					i(V, "click", function() {
						J._closeTab("current");
						H.removeChild(W);
						H.removeChild(R)
					});
					i(U, "click", function() {
						J._closeTab("other");
						H.removeChild(W);
						H.removeChild(R)
					});
					i(S, "click", function() {
						J._closeTab("all");
						H.removeChild(W);
						H.removeChild(R)
					});
					i(P, "click", function() {
						H.removeChild(W);
						H.removeChild(R)
					});
					i(W, "click", function() {
						H.removeChild(W);
						H.removeChild(R)
					});
					R.appendChild(V);
					R.appendChild(U);
					R.appendChild(S);
					R.appendChild(P);
					H.appendChild(W);
					H.appendChild(R)
				}
			})
		}
	}
	h.prototype = {
		constructor: h,
		_changeTab: function(H) {
			var J = H;
			var I = this;
			if(!b(J, "selected")) {
				var F = J.id.split("-")[1];
				F = parseInt(F) - 1;
				I.currentIndex = F;
				for(var G = 0; G < I.tabTitles.length; G++) {
					if(G == F) {
						I.tabContents[F].style.display = "block";
						j(I.tabTitles[F], "selected")
					} else {
						I.tabContents[G].style.display = "none";
						n(I.tabTitles[G], "selected")
					}
				}
				I.options.tabChange(I.tabTitles[F], I.tabContents[F], F)
			}
		},
		_removeTab: function(H) {
			var J = H;
			var I = this;
			var F = J.parentNode.id.split("-")[1];
			F = parseInt(F) - 1;
			I.titleContainer.removeChild(document.getElementById(J.parentNode.id));
			I.tabTitles.splice(F, 1);
			I.contentContainer.removeChild(I.tabContents[F]);
			I.tabContents.splice(F, 1);
			for(var G = 0; G < I.tabTitles.length; G++) {
				I.tabTitles[G].id = I.id + "_title-" + (G + 1)
			}
			if(I.tabTitles.length != 0) {
				I._changeTab(I.tabTitles[I.tabTitles.length - 1])
			}
		},
		_closeTab: function(I) {
			if(I == "current") {
				if(this.currentIndex != 0) {
					var H = this.tabTitles[this.currentIndex].querySelector("i");
					this._removeTab(H)
				}
			} else {
				if(I == "other") {
					var L = [],
						J = [];
					for(var G = 1; G < this.tabTitles.length; G++) {
						if(G != this.currentIndex) {
							var K = this.tabTitles[G].querySelector("i");
							var F = K.parentNode.id.split("-")[1];
							F = parseInt(F) - 1;
							this.titleContainer.removeChild(document.getElementById(K.parentNode.id));
							this.contentContainer.removeChild(this.tabContents[F])
						}
					}
					L.push(this.tabTitles[0]);
					L.push(this.tabTitles[this.currentIndex]);
					J.push(this.tabContents[0]);
					J.push(this.tabContents[this.currentIndex]);
					this.tabTitles = L;
					this.tabContents = J;
					for(var G = 0; G < this.tabTitles.length; G++) {
						this.tabTitles[G].id = this.id + "_title-" + (G + 1)
					}
					this.currentIndex = 1
				} else {
					if(I = "all") {
						var L = [],
							J = [];
						for(var G = 1; G < this.tabTitles.length; G++) {
							var K = this.tabTitles[G].querySelector("i");
							var F = K.parentNode.id.split("-")[1];
							F = parseInt(F) - 1;
							this.titleContainer.removeChild(document.getElementById(K.parentNode.id));
							this.contentContainer.removeChild(this.tabContents[F])
						}
						L.push(this.tabTitles[0]);
						J.push(this.tabContents[0]);
						this.tabTitles = L;
						this.tabContents = J;
						for(var G = 0; G < this.tabTitles.length; G++) {
							this.tabTitles[G].id = this.id + "_title-" + (G + 1)
						}
						this.tabContents[0].style.display = "block";
						j(this.tabTitles[0], "selected");
						this.currentIndex = 0
					}
				}
			}
		},
		addTab: function(L, K) {
			for(var I = 0; I < this.tabTitles.length; I++) {
				var G = this.tabTitles[I];
				var N = G.innerHTML.replace("<i></i>", "");
				if(N == L) {
					this.tabContents[I].innerHTML = K;
					this._changeTab(G);
					D(K);
					return
				}
			}
			var F = document.createElement("li");
			F.innerHTML = L;
			F.id = this.id + "_title-" + (this.tabTitles.length + 1);
			var J = this;
			i(F, "click", function(O) {
				J._changeTab(O.target || O.srcElement)
			});
			if(this.options.removeable) {
				var M = document.createElement("i");
				i(M, "click", function(O) {
					if(O.stopPropagation) {
						O.stopPropagation()
					}
					O.cancelBubble = true;
					J._removeTab(O.target || O.srcElement)
				});
				F.appendChild(M);
				F.style.paddingRight = "28px"
			}
			j(F, "tab-title");
			var H = document.createElement("div");
			H.innerHTML = K;
			H.style.height = this.contentHeight - 10 + "px";
			j(H, "content");
			this.titleContainer.appendChild(F);
			this.tabTitles.push(F);
			this.contentContainer.appendChild(H);
			this.tabContents.push(H);
			this._changeTab(F);
			D(K)
		},
		setCurrentTab: function(F) {
			this.tabContents[this.currentIndex].innerHTML = F;
			D(F)
		}
	};

	function D(I) {
		var J = document.createElement("div");
		J.innerHTML = I;
		var F = J.getElementsByTagName("script");
		for(var H = 0; H < F.length; H++) {
			var G = document.createElement("script");
			G.type = "text/javascript";
			if(F[H].innerHTML) {
				G.innerHTML = F[H].innerHTML
			}
			if(F[H].getAttribute("src")) {
				G.src = F[H].getAttribute("src")
			}
			document.getElementsByTagName("body")[0].appendChild(G)
		}
	}

	function u(H, F, G) {
		this.options = {
			enableLink: true,
			enableCheck: false,
			treeClick: function(I) {},
			checkboxClick: function(K, I, J) {}
		};
		this.options = w(this.options, F);
		this.data = (G && G instanceof Array) ? G : [];
		this.checkedNodes = [];
		if(this.data.length > 0) {
			this.context = this._initView(this.context);
			document.getElementById(H).appendChild(this.context)
		} else {
			this.context = document.getElementById(H)
		}
		this._initBehavior()
	}
	u.prototype = {
		constructor: u,
		_initView: function() {
			var I = this.data;
			var Q = document.createElement("ul");
			j(Q, "mcxui-tree");
			for(var J = 0; J < I.length; J++) {
				var G = I[J];
				if(G.parentId == 0) {
					var L = document.createElement("li");
					var N = document.createElement("i");
					var O = document.createElement("a");
					var H = document.createElement("i");
					var K = document.createElement("span");
					j(L, "tree-item");
					j(L, "data-item");
					j(N, "tree-icon");
					j(O, "tree-node");
					if(G.expand == true) {
						j(O, "tree-expand")
					}
					j(H, "tree-icon");
					j(K, "tree-name");
					O.id = G.id;
					if(G.url != undefined) {
						O.href = G.url
					}
					K.innerHTML = G.name;
					O.appendChild(H);
					O.appendChild(K);
					L.appendChild(N);
					if(this.options.enableCheck == true) {
						var M = document.createElement("span");
						j(M, "tree-checkbox");
						if("checked" in G && G.checked == true) {
							j(M, "checked");
							var P = {
								id: 0,
								name: "",
								checked: false,
								url: ""
							};
							P.id = G.id;
							P.name = G.name;
							P.checked = G.checked;
							P.url = G.url;
							this.checkedNodes.push(P)
						} else {
							j(M, "unchecked");
							G.checked = false
						}
						L.appendChild(M)
					}
					L.appendChild(O);
					var F = u.structureTreeView(I, G.id, this.options.enableCheck, this.checkedNodes);
					if(F) {
						L.appendChild(F)
					}
					Q.appendChild(L)
				}
			}
			return Q
		},
		_initBehavior: function() {
			var M = this;
			var G = this.context.querySelectorAll(".tree-item > .tree-icon");
			for(var I = 0; I < G.length; I++) {
				var K = G[I];
				var L = m(K, "ul", "html");
				var J = m(K, "tree-node", "class")[0];
				if(L.length > 0) {
					j(K, "expandable");
					j(L[0], "hidden");
					j(J.querySelector("i"), "folder");
					if(b(J, "tree-expand")) {
						n(K, "expandable");
						n(L[0], "hidden");
						n(J.querySelector("i"), "folder");
						j(K, "collapsable");
						j(L[0], "show");
						j(J.querySelector("i"), "folder-open")
					}
					i(K, "click", this._indicateClick)
				} else {
					n(K, "expandable");
					n(K, "collapsable");
					j(J.querySelector("i"), "text")
				}
				if(this.options.enableLink == false) {
					i(J, "click", function(N) {
						if(N.preventDefault) {
							N.preventDefault()
						} else {
							N.returnValue = false
						}
						M._treeNodeClick(N.target || N.srcElement)
					})
				}
			}
			if(this.data.length > 0 && this.options.enableCheck == true) {
				var F = this.context.querySelectorAll(".tree-item > .tree-checkbox");
				for(var I = 0; I < F.length; I++) {
					var H = F[I];
					i(H, "click", function(N) {
						M._checkboxClick(N.target || N.srcElement)
					})
				}
			}
		},
		_indicateClick: function(I) {
			var H = I.target || I.srcElement;
			var J = m(H, "ul", "html")[0];
			var G = m(H, "tree-node", "class")[0];
			var F = G.querySelector("i");
			if(b(J, "hidden")) {
				n(J, "hidden");
				j(J, "show");
				n(H, "expandable");
				j(H, "collapsable");
				n(F, "folder");
				j(F, "folder-open")
			} else {
				n(J, "show");
				j(J, "hidden");
				n(H, "collapsable");
				j(H, "expandable");
				n(F, "folder-open");
				j(F, "folder")
			}
		},
		_treeNodeClick: function(H) {
			var G;
			if(H.tagName != "A") {
				G = H.parentNode
			} else {
				G = H
			}
			var F = {
				id: 0,
				name: "",
				url: ""
			};
			F.id = G.getAttribute("id");
			F.name = G.querySelector("span").innerHTML;
			F.url = G.getAttribute("href");
			this.options.treeClick(F)
		},
		_checkboxClick: function(H) {
			var G = m(H, "tree-node", "class")[0];
			var F = {};
			if(b(H, "checked")) {
				n(H, "checked");
				j(H, "unchecked");
				F = u.checkChildTree(G, false, this.checkedNodes);
				u.checkParentTree(G, false, this.checkedNodes)
			} else {
				n(H, "unchecked");
				j(H, "checked");
				F = u.checkChildTree(G, true, this.checkedNodes);
				u.checkParentTree(G, true, this.checkedNodes);
				this.checkedNodes.push(F)
			}
			this.options.checkboxClick(F.id, F.name, F.checked)
		},
		getCheckedNodes: function() {
			return this.checkedNodes
		},
		getUncheckedNodes: function() {
			var F = [];
			for(var J = 0; J < this.data.length; J++) {
				var I = this.data[J];
				var K = false;
				for(var H = 0; H < this.checkedNodes.length; H++) {
					var G = this.checkedNodes[H];
					if(I.id == G.id) {
						K = true;
						break
					}
				}
				if(!K) {
					F.push(I)
				}
			}
			if(this.checkedNodes.length > 0) {
				return F
			} else {
				return this.data
			}
		}
	};
	u.structureTreeView = function(K, O, Q, T) {
		var I = document.createElement("ul");
		j(I, "tree-child");
		var H = false;
		for(var L = 0; L < K.length; L++) {
			var G = K[L];
			if(G.parentId != 0 && G.parentId == O) {
				var N = document.createElement("li");
				var R = document.createElement("i");
				var S = document.createElement("a");
				var J = document.createElement("i");
				var M = document.createElement("span");
				j(N, "tree-item");
				j(N, "data-item");
				j(R, "tree-icon");
				j(S, "tree-node");
				j(J, "tree-icon");
				j(M, "tree-name");
				S.id = G.id;
				if(G.url != undefined) {
					S.href = G.url
				}
				M.innerHTML = G.name;
				S.appendChild(J);
				S.appendChild(M);
				N.appendChild(R);
				if(Q == true) {
					var P = document.createElement("span");
					j(P, "tree-checkbox");
					if("checked" in G && G.checked == true) {
						j(P, "checked");
						var U = {
							id: 0,
							name: "",
							checked: false,
							url: ""
						};
						U.id = G.id;
						U.name = G.name;
						U.checked = G.checked;
						U.url = G.url;
						T.push(U)
					} else {
						j(P, "unchecked");
						G.checked = false
					}
					N.appendChild(P)
				}
				N.appendChild(S);
				var F = u.structureTreeView(K, G.id, Q);
				if(F) {
					N.appendChild(F)
				}
				I.appendChild(N);
				H = true
			}
		}
		if(H) {
			return I
		} else {
			return undefined
		}
	};
	u.checkChildTree = function(M, N, O) {
		var Q = {
			id: 0,
			name: "",
			checked: false,
			url: ""
		};
		Q.id = M.getAttribute("id");
		Q.name = M.querySelector("span").innerHTML;
		Q.url = M.getAttribute("href");
		Q.checked = N;
		var K = m(M, "tree-child", "class");
		if(K.length > 0) {
			var G = K[0].children;
			for(var I = 0; I < G.length; I++) {
				var J = G[I].querySelector("span.tree-checkbox");
				var F = G[I].querySelector("a.tree-node");
				if(N) {
					n(J, "unchecked");
					if(!b(J, "checked")) {
						j(J, "checked")
					}
					var P = u.checkChildTree(F, N, O);
					if(!u.isCheckedTree(O, P.id)) {
						O.push(P)
					}
				} else {
					n(J, "checked");
					if(!b(J, "unchecked")) {
						j(J, "unchecked")
					}
					u.checkChildTree(F, N, O)
				}
			}
		}
		if(N == false) {
			for(var H = 0; H < O.length; H++) {
				var L = O[H];
				if(L.id == Q.id) {
					O.splice(H, 1)
				}
			}
		}
		return Q
	};
	u.checkParentTree = function(M, L, H) {
		var J = M.parentNode.parentNode;
		var I = m(J, "tree-node", "class");
		if(I.length > 0) {
			var G = {
				id: 0,
				name: "",
				checked: false,
				url: ""
			};
			var F = I[0];
			G.id = F.getAttribute("id");
			G.name = F.querySelector("span").innerHTML;
			G.url = F.getAttribute("href");
			G.checked = L;
			var K = m(J, "tree-checkbox", "class")[0];
			if(L) {
				n(K, "unchecked");
				if(!b(K, "checked")) {
					j(K, "checked")
				}
				if(!u.isCheckedTree(H, G.id)) {
					H.push(G)
				}
				u.checkParentTree(K, L, H);
				return G
			}
		}
		return undefined
	};
	u.isCheckedTree = function(G, J) {
		var I = false;
		for(var H = 0; H < G.length; H++) {
			var F = G[H];
			if(F.id == J) {
				I = true;
				break
			}
		}
		return I
	};

	function m(I, F, H) {
		H = H == undefined ? "html" : H;
		var J = [];
		var K = I.parentNode.children;
		for(var G = 0; G < K.length; G++) {
			switch(H) {
				case "html":
					if(K[G].nodeName == F.toUpperCase()) {
						J.push(K[G])
					}
					break;
				case "class":
					if(K[G].className.indexOf(F) != -1) {
						J.push(K[G])
					}
					break
			}
		}
		return J
	}

	function q(K) {
		this.context = document.getElementById(K);
		var G = this.context.querySelectorAll(".nav-item>a");
		for(var H = 0; H < G.length; H++) {
			var I = G[H];
			var F = m(I, "nav-child", "class")[0];
			if(F) {
				if(!b(I, "nav-expandable")) {
					j(I, "nav-expandable")
				}
				if(!b(F, "hide")) {
					j(F, "hide")
				}
				if(b(I, "nav-expand")) {
					n(I, "nav-expandable");
					j(I, "nav-collapsable");
					j(I, "choose");
					j(I.parentNode, "nav-current");
					n(F, "hide");
					j(F, "show")
				}
				var J = this;
				i(I, "click", function(L) {
					if(L.preventDefault) {
						L.preventDefault()
					} else {
						L.returnValue = false
					}
					J._itemClick(L.target || L.srcElement)
				})
			} else {
				i(I, "click", function(L) {
					J._linkItemClick(L.target || L.srcElement)
				})
			}
		}
	}
	q.prototype = {
		constructor: q,
		_itemClick: function(G) {
			var F = m(G, "nav-child", "class")[0];
			if(b(F, "hide")) {
				n(G, "nav-expandable");
				j(G, "nav-collapsable");
				j(G, "choose");
				j(G.parentNode, "nav-current");
				n(F, "hide");
				j(F, "show");
				F.style.overflow = "hidden";
				z(F, 0, F.offsetHeight, "expand", function() {
					F.style.height = "";
					F.style.overflow = "auto"
				})
			} else {
				n(G, "nav-collapsable");
				j(G, "nav-expandable");
				n(G, "choose");
				n(F, "show");
				F.style.overflow = "hidden";
				z(F, F.offsetHeight, 0, "collapse", function() {
					F.style.height = "";
					F.style.overflow = "auto";
					n(G.parentNode, "nav-current");
					j(F, "hide")
				})
			}
		},
		_linkItemClick: function(F) {
			var G = this.context.querySelector("a.nav-active");
			if(G) {
				n(G, "nav-active")
			}
			j(F, "nav-active")
		}
	};

	function z(K, J, F, H, L) {
		K.style.height = J + "px";
		var I = 0;
		var G = setInterval(function() {
			if(H == "expand") {
				I += 10
			} else {
				if(H == "collapse") {
					I -= 10
				}
			}
			K.style.height = J + I + "px";
			if(H == "expand") {
				if(I >= F) {
					K.style.height = F + "px";
					clearInterval(G);
					L()
				}
			} else {
				if(H == "collapse") {
					if((J + I) <= F) {
						K.style.height = F + "px";
						clearInterval(G);
						L()
					}
				}
			}
		}, 20)
	}

	function m(I, F, H) {
		H = H == undefined ? "html" : H;
		var J = [];
		var K = I.parentNode.children;
		for(var G = 0; G < K.length; G++) {
			switch(H) {
				case "html":
					if(K[G].nodeName == F.toUpperCase()) {
						J.push(K[G])
					}
					break;
				case "class":
					if(K[G].className.indexOf(F) != -1) {
						J.push(K[G])
					}
					break
			}
		}
		return J
	}

	function s(H) {
		this.switchElem = document.getElementById(H);
		this.switchBtn = this.switchElem.querySelector(".switch-button");
		this.animationEndName = v(this.switchBtn);
		var G = this;
		i(this.switchBtn, "click", function() {
			G._switchClick()
		});

		function F() {
			G._switch()
		}
		if(this.animationEndName) {
			i(this.switchBtn, this.animationEndName, F)
		}
		if(b(this.switchElem, "switch-on")) {
			this.isOpen = true
		} else {
			this.isOpen = false
		}
		this.toggleCallback = function(I) {}
	}
	s.prototype = {
		constructor: s,
		_switchClick: function() {
			if(!this.animationEndName) {
				this._switch();
				return
			}
			if(b(this.switchElem, "switch-on")) {
				j(this.switchBtn, "animation-off");
				j(this.switchElem, "switching")
			} else {
				j(this.switchBtn, "animation-on");
				j(this.switchElem, "switching")
			}
		},
		_switch: function() {
			if(b(this.switchElem, "switch-on")) {
				n(this.switchElem, "switch-on");
				n(this.switchBtn, "animation-off");
				j(this.switchElem, "switch-off");
				this.isOpen = false
			} else {
				n(this.switchElem, "switch-off");
				n(this.switchBtn, "animation-on");
				j(this.switchElem, "switch-on");
				this.isOpen = true
			}
			n(this.switchElem, "switching");
			this.toggleCallback(this.isOpen)
		},
		on: function() {
			if(!this.isOpen) {
				if(this.animationEndName) {
					j(this.switchBtn, "animation-on");
					j(this.switchElem, "switching")
				} else {
					this._switch()
				}
			}
		},
		off: function() {
			if(this.isOpen) {
				if(this.animationEndName) {
					j(this.switchBtn, "animation-off");
					j(this.switchElem, "switching")
				} else {
					this._switch()
				}
			}
		},
		toggle: function(F) {
			if(F) {
				this.toggleCallback = F
			} else {
				this._switchClick()
			}
		}
	};

	function e(H, F) {
		this.options = {
			showSkipPage: true,
			showFirstLast: true,
			pageNumber: 1,
			pageSize: 10,
			totalCount: 10,
			pages: 5,
			form: ""
		};
		var G = {
			url: "",
			type: "POST",
			contentType: "application/x-www-form-urlencoded",
			before: function(I) {},
			success: function(J, I) {},
			failure: function() {}
		};
		this.options = w(this.options, F);
		if(F.ajax) {
			w(G, F.ajax)
		}
		this.options.ajax = G;
		this.container = document.getElementById(H);
		this.totalPage = this.options.totalCount % this.options.pageSize == 0 ? this.options.totalCount / this.options.pageSize : parseInt(this.options.totalCount / this.options.pageSize) + 1;
		this.pages = [];
		this._init()
	}
	e.prototype = {
		constructor: e,
		_init: function() {
			var N = this.options;
			var L = document.createElement("div");
			j(L, "pagination-operation");
			j(this.container, "mcxui-pagination");
			if(this.totalPage > 1) {
				var J = document.createElement("div");
				var K = document.createElement("div");
				var G = document.createElement("div");
				var O = document.createElement("div");
				var H = document.createElement("div");
				var F = document.createElement("div");
				J.innerHTML = "首页";
				K.innerHTML = "末页";
				G.innerHTML = "上一页";
				O.innerHTML = "下一页";
				K.innerHTML = "末页";
				H.innerHTML = F.innerHTML = "...";
				j(J, "first");
				j(K, "last");
				j(G, "previous");
				j(O, "next");
				j(H, "leaveout");
				j(F, "leaveout");
				L.appendChild(G);
				if(this.options.showFirstLast == true) {
					L.appendChild(J)
				}
				L.appendChild(H);
				if(N.pageNumber > 1) {
					if(N.pageNumber <= N.pages) {
						H.style.display = "none"
					}
				} else {
					J.style.display = "none";
					H.style.display = "none"
				}
				var T = this;
				for(var U = 1; U <= this.totalPage; U++) {
					var I = document.createElement("div");
					I.innerHTML = U;
					j(I, "page");
					if(N.pageNumber == U) {
						var P = document.createElement("span");
						P.innerHTML = U;
						j(P, "current");
						I.appendChild(P)
					}
					var W = gtLimit = 0;
					if(N.pageNumber % N.pages == 0) {
						W = N.pageNumber - (N.pages - 1);
						gtLimit = N.pageNumber
					} else {
						W = parseInt(N.pageNumber / N.pages) * N.pages + 1;
						gtLimit = W + (N.pages - 1)
					}
					if(U < W || U > gtLimit) {
						I.style.display = "none"
					}
					L.appendChild(I);
					i(I, "click", function(Y) {
						T._page(Y.target || Y.srcElement)
					});
					this.pages.push(I)
				}
				L.appendChild(F);
				if(this.options.showFirstLast == true) {
					L.appendChild(K)
				}
				L.appendChild(O);
				var V = (parseInt(this.totalPage / N.pages) - 1) * N.pages;
				if(this.totalPage % N.pages != 0) {
					V = parseInt(this.totalPage / N.pages) * N.pages
				}
				this.lastLimit = V;
				if(N.pageNumber < this.totalPage) {
					if(N.pageNumber > V) {
						F.style.display = "none"
					}
				} else {
					F.style.display = "none";
					K.style.display = "none"
				}
				this.container.appendChild(L);
				this.first = J;
				this.last = K;
				this.previous = G;
				this.next = O;
				this.firstLeaveout = H;
				this.lastLeaveout = F;
				if(this.options.showFirstLast == true) {
					i(J, "click", function(Y) {
						T._first()
					});
					i(K, "click", function(Y) {
						T._last()
					})
				}
				i(G, "click", function(Y) {
					T._previous()
				});
				i(O, "click", function(Y) {
					T._next()
				});
				if(this.options.showSkipPage == true) {
					var M = document.createElement("div");
					var R = document.createElement("span");
					var X = document.createElement("input");
					var Q = document.createElement("span");
					var S = document.createElement("button");
					R.innerHTML = "跳转到";
					X.type = "text";
					X.value = N.pageNumber;
					Q.innerHTML = "页";
					S.innerHTML = "确定";
					j(M, "pagination-skip");
					j(X, "skip-page");
					j(S, "skip-button");
					M.appendChild(R);
					M.appendChild(X);
					M.appendChild(Q);
					M.appendChild(S);
					this.container.appendChild(M);
					this.skipPage = X;
					i(S, "click", function(Y) {
						T._skipPage()
					});
					i(X, "blur", function(Z) {
						var Y = Z.target || Z.srcElement;
						if(/\d/.test(Y.value)) {
							if(parseInt(Y.value) < 1) {
								Y.value = 1
							} else {
								if(parseInt(Y.value) > T.totalPage) {
									Y.value = T.totalPage
								}
							}
						}
					})
				}
			} else {}
		},
		_first: function() {
			if(this.options.form == "") {
				var F = {
					pageNumber: 1,
					pageSize: this.options.pageSize,
					totalCount: this.options.totalCount,
					totalPage: this.totalPage
				};
				if(this.options.ajax.url != "") {
					this._ajax(F, "first")
				} else {
					this._selectPage("first")
				}
			} else {
				this.options.pageNumber = 1;
				this._formSubmit()
			}
		},
		_last: function() {
			if(this.options.form == "") {
				var F = {
					pageNumber: this.totalPage,
					pageSize: this.options.pageSize,
					totalCount: this.options.totalCount,
					totalPage: this.totalPage
				};
				if(this.options.ajax.url != "") {
					this._ajax(F, "last")
				} else {
					this._selectPage("last")
				}
			} else {
				this.options.pageNumber = this.totalPage;
				this._formSubmit()
			}
		},
		_previous: function() {
			var F = this.options.pageNumber - 1;
			if(F >= 1) {
				if(this.options.form == "") {
					var G = {
						pageNumber: F,
						pageSize: this.options.pageSize,
						totalCount: this.options.totalCount,
						totalPage: this.totalPage
					};
					if(this.options.ajax.url != "") {
						this._ajax(G, "previous")
					} else {
						this._selectPage("previous")
					}
				} else {
					this.options.pageNumber = F;
					this._formSubmit()
				}
			} else {
				this.options.pageNumber = 1
			}
		},
		_next: function() {
			var F = this.options.pageNumber + 1;
			if(F <= this.totalPage) {
				if(this.options.form == "") {
					var G = {
						pageNumber: F,
						pageSize: this.options.pageSize,
						totalCount: this.options.totalCount,
						totalPage: this.totalPage
					};
					if(this.options.ajax.url != "") {
						this._ajax(G, "next")
					} else {
						this._selectPage("next")
					}
				} else {
					this.options.pageNumber = F;
					this._formSubmit()
				}
			} else {
				this.options.pageNumber = this.totalPage
			}
		},
		_page: function(G) {
			if(this.options.form == "") {
				var F = {
					pageNumber: parseInt(G.innerHTML),
					pageSize: this.options.pageSize,
					totalCount: this.options.totalCount,
					totalPage: this.totalPage
				};
				if(this.options.ajax.url != "") {
					this._ajax(F, "page", G)
				} else {
					this._selectPage("page", G)
				}
			} else {
				this.options.pageNumber = parseInt(G.innerHTML);
				this._formSubmit()
			}
		},
		_skipPage: function() {
			var G = this.container.querySelector(".skip-page");
			if(/\d/.test(G.value)) {
				if(this.options.form == "") {
					var F = {
						pageNumber: parseInt(G.value),
						pageSize: this.options.pageSize,
						totalCount: this.options.totalCount,
						totalPage: this.totalPage
					};
					if(this.options.ajax.url != "") {
						this._ajax(F, "skip", G)
					} else {
						this._selectPage("skip", G)
					}
				} else {
					this.options.pageNumber = parseInt(G.value);
					this._formSubmit()
				}
			} else {
				alert("请输入数字");
				G.value = this.options.pageNumber
			}
		},
		_selectPage: function(H, F) {
			if(H == "first") {
				var G = this.pages[this.options.pageNumber - 1].querySelector("span.current");
				G.innerHTML = 1;
				this.pages[0].appendChild(G);
				this.options.pageNumber = 1;
				if(this.options.showSkipPage == true) {
					this.skipPage.value = 1
				}
				this.last.style.display = "inline-block";
				this.first.style.display = "none";
				this.firstLeaveout.style.display = "none";
				if(this.options.pageNumber <= this.lastLimit) {
					this.lastLeaveout.style.display = "inline-block"
				}
				this._changePage()
			} else {
				if(H == "last") {
					var G = this.pages[this.options.pageNumber - 1].querySelector("span.current");
					G.innerHTML = this.totalPage;
					this.pages[this.totalPage - 1].appendChild(G);
					this.options.pageNumber = this.totalPage;
					if(this.options.showSkipPage == true) {
						this.skipPage.value = this.totalPage
					}
					this.first.style.display = "inline-block";
					this.last.style.display = "none";
					this.lastLeaveout.style.display = "none";
					if(this.options.pageNumber - this.options.pages >= 1) {
						this.firstLeaveout.style.display = "inline-block"
					}
					this._changePage()
				} else {
					if(H == "previous") {
						this.options.pageNumber = this.options.pageNumber - 1;
						var G = this.pages[this.options.pageNumber].querySelector("span.current");
						G.innerHTML = this.options.pageNumber;
						this.pages[this.options.pageNumber - 1].appendChild(G);
						if(this.options.pageNumber <= 1) {
							this.first.style.display = "none"
						} else {
							if(this.options.pageNumber + 1 <= this.totalPage) {
								this.last.style.display = "inline-block"
							}
						}
						if(this.options.pageNumber <= this.lastLimit) {
							this.lastLeaveout.style.display = "inline-block"
						}
						if(this.options.pageNumber <= this.options.pages) {
							this.firstLeaveout.style.display = "none"
						}
						if(this.options.pageNumber % this.options.pages == 0) {
							this._changePage()
						}
						if(this.options.showSkipPage == true) {
							this.skipPage.value = this.options.pageNumber
						}
					} else {
						if(H == "next") {
							this.options.pageNumber = this.options.pageNumber + 1;
							var G = this.pages[this.options.pageNumber - 2].querySelector("span.current");
							G.innerHTML = this.options.pageNumber;
							this.pages[this.options.pageNumber - 1].appendChild(G);
							if(this.options.pageNumber >= this.totalPage) {
								this.last.style.display = "none"
							} else {
								if(this.options.pageNumber - 1 >= 1) {
									this.first.style.display = "inline-block"
								}
							}
							if(this.options.pageNumber > this.options.pages) {
								this.firstLeaveout.style.display = "inline-block"
							}
							if(this.options.pageNumber > this.lastLimit) {
								this.lastLeaveout.style.display = "none"
							}
							if((this.options.pageNumber - 1) % this.options.pages == 0) {
								this._changePage()
							}
							if(this.options.showSkipPage == true) {
								this.skipPage.value = this.options.pageNumber
							}
						} else {
							if(H == "page") {
								var G = this.pages[this.options.pageNumber - 1].querySelector("span.current");
								this.options.pageNumber = parseInt(F.innerHTML);
								G.innerHTML = this.options.pageNumber;
								this.pages[this.options.pageNumber - 1].appendChild(G);
								if(this.options.showSkipPage == true) {
									this.skipPage.value = this.options.pageNumber
								}
								if(this.options.pageNumber == 1) {
									this.first.style.display = "none"
								} else {
									this.first.style.display = "inline-block"
								}
								if(this.options.pageNumber == this.totalPage) {
									this.last.style.display = "none"
								} else {
									this.last.style.display = "inline-block"
								}
							} else {
								if(H == "skip") {
									var G = this.pages[this.options.pageNumber - 1].querySelector("span.current");
									this.options.pageNumber = parseInt(F.value);
									G.innerHTML = this.options.pageNumber;
									this.pages[this.options.pageNumber - 1].appendChild(G);
									if(this.options.pageNumber == 1) {
										this.first.style.display = "none"
									} else {
										this.first.style.display = "inline-block"
									}
									if(this.options.pageNumber == this.totalPage) {
										this.last.style.display = "none"
									} else {
										this.last.style.display = "inline-block"
									}
									if(this.options.pageNumber > this.options.pages) {
										this.firstLeaveout.style.display = "inline-block"
									} else {
										this.firstLeaveout.style.display = "none"
									}
									if(this.options.pageNumber > this.lastLimit) {
										this.lastLeaveout.style.display = "none"
									} else {
										this.lastLeaveout.style.display = "inline-block"
									}
									this._changePage()
								}
							}
						}
					}
				}
			}
		},
		_changePage: function() {
			for(var G = 1; G <= this.pages.length; G++) {
				var H = this.pages[G - 1];
				var F = gtLimit = 0;
				if(this.options.pageNumber % this.options.pages == 0) {
					F = this.options.pageNumber - (this.options.pages - 1);
					gtLimit = this.options.pageNumber
				} else {
					F = parseInt(this.options.pageNumber / this.options.pages) * this.options.pages + 1;
					gtLimit = F + (this.options.pages - 1)
				}
				if(G < F || G > gtLimit) {
					H.style.display = "none"
				} else {
					H.style.display = "inline-block"
				}
			}
		},
		_formSubmit: function() {
			var F = document.getElementById(this.options.form);
			if(F) {
				var H = F.querySelector("input[type='hidden'][name='pageNumber']");
				var G = F.querySelector("input[type='hidden'][name='pageSize']");
				if(H == null && G == null) {
					H = document.createElement("input");
					G = document.createElement("input");
					H.type = "hidden";
					G.type = "hidden";
					H.name = "pageNumber";
					G.name = "pageSize";
					F.insertBefore(G, F.firstChild);
					F.insertBefore(H, F.firstChild)
				}
				H.value = this.options.pageNumber;
				G.value = this.options.pageSize;
				if(F.onsubmit) {
					if(F.onsubmit() != false) {
						F.submit()
					}
				} else {
					F.submit()
				}
			}
		},
		_ajax: function(O, H, N) {
			var Q = this.options.ajax;
			var F = Q.url;
			var K = {};
			this.options.ajax.before(K);
			if(Q.type.toUpperCase() == "POST") {
				K.pageNumber = O.pageNumber;
				K.pageSize = O.pageSize;
				if(this.options.ajax.contentType == "application/x-www-form-urlencoded") {
					var J = [];
					for(var R in K) {
						J.push(R + "=" + K[R])
					}
					K = J.join("&")
				} else {
					var P = "{";
					for(var R in K) {
						P += '"' + R + '":"' + K[R] + '",'
					}
					if(P.indexOf(",") != -1) {
						P = P.substring(0, P.length - 1)
					}
					P += "}";
					K = P
				}
			} else {
				var G = [];
				for(var R in K) {
					G.push(R + "=" + K[R])
				}
				G.push("pageNumber=" + O.pageNumber);
				G.push("pageSize=" + O.pageSize);
				var I = G.join("&");
				var L = "";
				if(Q.url.indexOf("?") != -1) {
					if(Q.url.indexOf("=") != -1) {
						L = "&"
					}
				} else {
					L = "?"
				}
				F = Q.url + L + I
			}
			var M = this;
			y({
				url: F,
				type: Q.type,
				contentType: Q.contentType,
				data: K,
				success: function(S) {
					Q.success(S, O);
					if(H == "first") {
						M._selectPage("first")
					} else {
						if(H == "last") {
							M._selectPage("last")
						} else {
							if(H == "previous") {
								M._selectPage("previous")
							} else {
								if(H == "next") {
									M._selectPage("next")
								} else {
									if(H == "page") {
										M._selectPage("page", N)
									} else {
										if(H == "skip") {
											M._selectPage("skip", N)
										}
									}
								}
							}
						}
					}
				},
				failure: Q.failure
			})
		}
	};

	function y(I) {
		var H;
		try {
			H = new XMLHttpRequest()
		} catch(G) {
			try {
				H = new ActiveXObject("Msxml2.XMLHTTP")
			} catch(G) {
				try {
					H = new ActiveXObject("Microsoft.XMLHTTP")
				} catch(G) {
					throw new Error("你的浏览器过时了")
				}
			}
		}
		H.onreadystatechange = function() {
			if(H.readyState == 4) {
				if(H.status == 200) {
					I.success(H.responseText)
				} else {
					I.failure()
				}
			}
		};
		H.open(I.type.toUpperCase(), I.url, true);
		H.setRequestHeader("Content-Type", I.contentType + "; charset=UTF-8");
		var F = null;
		if(I.type.toUpperCase() == "POST") {
			F = I.data
		}
		H.send(F)
	}

	function a(G) {
		var F = G.offsetTop;
		while(G.offsetParent != null) {
			F += G.offsetParent.offsetTop;
			G = G.offsetParent
		}
		return F
	}

	function o(G) {
		var F = G.offsetLeft;
		while(G.offsetParent != null) {
			F += G.offsetParent.offsetLeft;
			G = G.offsetParent
		}
		return F
	}
	var C = {
		init: function(K, V, Q) {
			var P = document.getElementsByTagName("body")[0];
			if(Q) {
				var S = document.createElement("div");
				j(S, "mcxui-dialog-bg");
				P.appendChild(S);
				if(V.shadeClose) {
					i(S, "click", function() {
						N()
					})
				}
			}
			if(V.showClose) {
				var T = K.getElementsByTagName("i")[0];
				i(T, "click", function() {
					N()
				})
			}
			var O = false;
			if(K.style.animation != undefined) {
				O = true
			}

			function M() {
				C.close([K]);
				A(K, "animationend", M)
			}

			function N() {
				if(O) {
					j(K, "animation-" + V.animationType + "-out");
					i(K, "animationend", M);
					C.close([S]);
					if(V.layer) {
						t.layerElement = []
					}
				} else {
					C.close([S, K]);
					if(V.layer) {
						t.layerElement = []
					}
				}
			}
			var U = K.getElementsByTagName("div")[0];
			var G, F, J, R;

			function I(X) {
				var W = (X.pageX || X.clientX) - G;
				var Y = (X.pageY || X.clientY) - F;
				K.style.left = J + W + "px";
				K.style.top = R + Y + "px"
			}
			i(U, "mousedown", function(W) {
				G = W.pageX || W.clientX;
				F = W.pageY || W.clientY;
				J = parseFloat(K.style.left);
				R = parseFloat(K.style.top);
				i(document, "mousemove", I)
			});
			i(U, "mouseup", function() {
				A(document, "mousemove", I)
			});
			if(V.buttons.length > 0) {
				for(var L = 0; L < V.buttons.length; L++) {
					var H = V.buttons[L];
					H.setAttribute("index", L);
					i(H, "click", function(W) {
						N();
						var X = W.target || W.srcElement;
						if(V.btnClick) {
							V.btnClick(parseInt(X.getAttribute("index")))
						}
					})
				}
			}
			P.appendChild(K);
			K.style.top = (document.documentElement.clientHeight - K.offsetHeight) / 2 + "px";
			K.style.left = (document.documentElement.clientWidth - K.offsetWidth) / 2 + "px";
			if(V.layer) {
				t.layerElement.push(S);
				t.layerElement.push(K);
				V.afterLoad()
			}
		},
		initHint: function(H, N) {
			var L = document.getElementsByTagName("body")[0];
			L.appendChild(H);
			if(N.target == undefined) {
				H.style.top = (document.documentElement.clientHeight - H.offsetHeight) / 2 + "px";
				H.style.left = (document.documentElement.clientWidth - H.offsetWidth) / 2 + "px"
			} else {
				var M = document.getElementById(N.target);
				var F = a(M);
				var G = o(M);
				if(N.direction == "right") {
					G = G + M.offsetWidth;
					H.style.top = F + "px";
					H.style.left = G + 10 + "px"
				} else {
					if(N.direction == "left") {
						G = G - H.offsetWidth;
						H.style.top = F + "px";
						H.style.left = G - 10 + "px"
					} else {
						if(N.direction == "top") {
							F = F - H.offsetHeight;
							H.style.top = F - 10 + "px";
							H.style.left = G + "px"
						} else {
							if(N.direction == "bottom") {
								F = F + M.offsetHeight;
								H.style.top = F + 10 + "px";
								H.style.left = G + "px"
							}
						}
					}
				}
			}
			var K = false;
			if(H.style.animation != undefined) {
				K = true
			}

			function I() {
				C.close([H]);
				A(H, "animationend", I)
			}

			function J() {
				if(K) {
					j(H, "animation-" + N.animationType + "-out");
					i(H, "animationend", I)
				} else {
					C.close([H])
				}
			}
			setTimeout(function() {
				J()
			}, N.time * 1000)
		},
		close: function(H) {
			var F = document.getElementsByTagName("body")[0];
			for(var G = 0; G < H.length; G++) {
				F.removeChild(H[G])
			}
		}
	};
	var t = {
		loadElement: [],
		layerElement: [],
		alert: function(H, F) {
			var G = {
				showClose: true,
				shadeClose: false,
				animationType: "bounce",
				titleStyle: {},
				buttonStyle: {}
			};
			G = w(G, F);
			G.btn = ["确定"];
			G.btnClick = undefined;
			if(G.buttonStyle) {
				G.buttonStyle = [G.buttonStyle]
			}
			this.open(H, G)
		},
		confirm: function(H, F) {
			var I = {
				color: "#000000",
				border: "1px solid #DEDEDE",
				backgroundColor: "#F1F1F1"
			};
			var G = {
				btn: ["确定", "取消"],
				showClose: true,
				shadeClose: false,
				animationType: "bounce",
				titleStyle: {},
				buttonStyle: [{}, I]
			};
			G = w(G, F);
			if(G.buttonStyle.length == 1) {
				G.buttonStyle = [F.buttonStyle[0], I]
			}
			this.open(H, G)
		},
		layer: function(F) {
			var G = {
				width: 500,
				height: 400,
				showClose: true,
				shadeClose: false,
				animationType: "bounce",
				titleStyle: {},
				style: 1,
				content: "",
				afterLoad: function() {}
			};
			G = w(G, F);
			G.btn = [];
			G.showClose = true;
			G.layer = true;
			this.open(G.content, G)
		},
		open: function(L, Q) {
			var M = document.createElement("div");
			var P = document.createElement("div");
			var O = document.createElement("div");
			var G = document.createElement("div");
			G.innerHTML = Q.title || "信息";
			O.innerHTML = L;
			j(M, "mcxui-dialog");
			j(M, "animation-" + Q.animationType + "-in");
			j(P, "dialog-head");
			j(O, "dialog-content");
			j(G, "dialog-title");
			P.appendChild(G);
			M.appendChild(P);
			M.appendChild(O);
			if(Q.width) {
				M.style.width = Q.width + "px"
			}
			if(Q.height) {
				if(!Q.layer) {
					O.style.height = Q.height - 41 - 2 * 18 - 50 + "px"
				} else {
					O.style.height = Q.height - 41 - 2 * 18 + "px"
				}
			}
			if(Q.titleStyle) {
				for(var J in Q.titleStyle) {
					P.style[J] = Q.titleStyle[J]
				}
			}
			if(Q.showClose) {
				var I = document.createElement("i");
				j(I, "dialog-ico");
				P.appendChild(I)
			}
			if(!Q.layer) {
				var F = document.createElement("div");
				j(F, "dialog-foot");
				M.appendChild(F)
			} else {
				if(Q.style == 1) {
					j(M, "dialog-layer");
					P.style.borderRadius = "0"
				}
				O.style.overflow = "auto"
			}
			Q.buttons = [];
			for(var K = 0; K < Q.btn.length; K++) {
				var H = document.createElement("a");
				H.href = "javascript:void(0);";
				H.innerHTML = Q.btn[K];
				j(H, "dialog-foot-btn");
				if(Q.buttonStyle && Q.buttonStyle.length > 0) {
					var N = Q.buttonStyle[K];
					for(var J in N) {
						H.style[J] = N[J]
					}
				}
				F.appendChild(H);
				Q.buttons.push(H)
			}
			C.init(M, Q, true)
		},
		msg: function(J, G) {
			var I = {
				time: 3,
				style: {},
				animationType: "zoom"
			};
			I = w(I, G);
			var H = document.createElement("div");
			j(H, "mcxui-dialog-msg");
			j(H, "animation-" + I.animationType + "-in");
			H.innerHTML = J;
			for(var F in I.style) {
				H.style[F] = I.style[F]
			}
			C.initHint(H, I)
		},
		tips: function(L, K, O) {
			var F = {
				time: 3,
				direction: "right",
				animationType: "zoom",
				style: {}
			};
			F = w(F, O);
			F.target = K || "";
			var H = {
				left: "right",
				right: "left",
				top: "bottom",
				bottom: "top"
			};
			var J = document.createElement("div");
			var G = document.createElement("div");
			var N = document.createElement("div");
			var M = document.createElement("div");
			j(J, "mcxui-dialog-tips");
			j(J, "animation-" + F.animationType + "-in");
			j(G, "tips-wrapper");
			j(N, "tips-arrow-" + H[F.direction]);
			M.innerHTML = L;
			J.appendChild(G);
			G.appendChild(N);
			G.appendChild(M);
			for(var I in F.style) {
				J.style[I] = F.style[I];
				if(I == "backgroundColor") {
					if(F.direction == "left" || F.direction == "right") {
						N.style.borderBottomColor = F.style[I]
					} else {
						N.style.borderRightColor = F.style[I]
					}
				}
			}
			C.initHint(J, F)
		},
		loading: function(I) {
			var K = {
				src: "img",
				hint: "",
				type: 1,
				animationType: "zoom"
			};
			K = w(K, I);
			var L = document.createElement("div");
			var G = document.createElement("div");
			var J = document.createElement("img");
			var H = document.createElement("div");
			j(L, "mcxui-dialog-loading-bg");
			j(G, "mcxui-dialog-loading");
			j(G, "animation-" + K.animationType + "-in");
			if(K.hint) {
				j(G, "mcxui-dialog-loading-hint");
				H.innerHTML = K.hint
			}
			J.src = K.src + "/loading-" + K.type + ".gif";
			G.appendChild(J);
			G.appendChild(H);
			var F = document.getElementsByTagName("body")[0];
			F.appendChild(L);
			F.appendChild(G);
			G.style.top = (document.documentElement.clientHeight - G.offsetHeight) / 2 + "px";
			G.style.left = (document.documentElement.clientWidth - G.offsetWidth) / 2 + "px";
			this.loadElement.push(L);
			this.loadElement.push(G)
		},
		closeLoading: function() {
			C.close(this.loadElement);
			this.loadElement = []
		},
		closeLayer: function() {
			C.close(this.layerElement);
			this.layerElement = []
		}
	};
	var c = {
		init: function() {
			this.initSelect();
			this.initCheckbox();
			this.initRadioButton()
		},
		initSelect: function() {
			var H = document.querySelectorAll(".mcxui-select");
			for(var G = 0; G < H.length; G++) {
				var F = H[G];
				if(F.previousSibling && b(F.previousSibling, "mcxui-select-wrap")) {
					continue
				}
				this.createSelect(F)
			}
		},
		initCheckbox: function() {
			var H = [];
			var N = document.querySelectorAll(".mcxui-checkbox");
			for(var J = 0; J < N.length; J++) {
				var O = N[J];
				if(O.previousSibling && b(O.previousSibling, "mcxui-checkbox-wrap")) {
					continue
				}
				var I = document.createElement("div");
				var P = document.createElement("i");
				j(I, "mcxui-checkbox-wrap");
				if(O.checked == true) {
					j(P, "icon-checkbox-checked")
				} else {
					j(P, "icon-checkbox-unchecked")
				}
				I.appendChild(P);
				var L = O.getAttribute("title");
				if(L != null) {
					var K = document.createElement("span");
					K.innerHTML = L;
					I.appendChild(K)
				}
				if(O.disabled == true) {
					j(I, "disabled")
				} else {
					i(I, "click", function(X) {
						var W = X.target || X.srcElement;
						if(W.tagName == "SPAN") {
							W = W.parentNode.querySelector("i")
						} else {
							if(W.tagName == "DIV") {
								W = W.querySelector("i")
							}
						}
						var Q = W.parentNode.nextSibling;
						if(b(W, "icon-checkbox-unchecked")) {
							n(W, "icon-checkbox-unchecked");
							j(W, "icon-checkbox-checked");
							if(Q.tagName == "INPUT" && Q.type == "checkbox") {
								Q.checked = true
							}
							var V = W.getAttribute("mcxui-group");
							if(V != null) {
								var T = c.getElements(H, V);
								for(var R = 0; R < T.length; R++) {
									var S = T[R];
									n(S, "icon-checkbox-unchecked");
									if(!b(S, "icon-checkbox-checked")) {
										j(S, "icon-checkbox-checked")
									}
								}
								var U = document.querySelectorAll("input[type='checkbox'][mcxui-allcheck][name='" + V + "']");
								l(U)
							}
						} else {
							n(W, "icon-checkbox-checked");
							j(W, "icon-checkbox-unchecked");
							if(Q.tagName == "INPUT" && Q.type == "checkbox") {
								Q.checked = false
							}
							var V = W.getAttribute("mcxui-group");
							if(V != null) {
								var T = c.getElements(H, V);
								for(var R = 0; R < T.length; R++) {
									var S = T[R];
									n(S, "icon-checkbox-checked");
									if(!b(S, "icon-checkbox-unchecked")) {
										j(S, "icon-checkbox-unchecked")
									}
								}
								var U = document.querySelectorAll("input[type='checkbox'][mcxui-allcheck][name='" + V + "']");
								f(U)
							}
						}
						Q.checked = !Q.checked;
						Q.click()
					});
					var M = O.getAttribute("mcxui-group");
					if(M != null) {
						P.setAttribute("mcxui-group", M)
					}
					if(O.getAttribute("mcxui-allcheck") != null) {
						var G = O.getAttribute("name");
						var F = c.getElements(H, G);
						if(F != null) {
							F.push(P)
						} else {
							c.setElements(H, G, P)
						}
					}
				}
				O.parentNode.insertBefore(I, O)
			}
		},
		initRadioButton: function() {
			var G = [];
			var N = document.querySelectorAll(".mcxui-radio");
			for(var K = 0; K < N.length; K++) {
				var J = N[K];
				if(J.previousSibling && b(J.previousSibling, "mcxui-radio-wrap")) {
					continue
				}
				var H = document.createElement("div");
				var I = document.createElement("i");
				j(H, "mcxui-radio-wrap");
				if(J.checked == true) {
					j(I, "icon-radio-checked")
				} else {
					j(I, "icon-radio-unchecked")
				}
				I.setAttribute("name", J.getAttribute("name"));
				H.appendChild(I);
				var O = J.getAttribute("title");
				if(O != null) {
					var L = document.createElement("span");
					L.innerHTML = O;
					H.appendChild(L)
				}
				if(J.disabled == true) {
					j(H, "disabled")
				} else {
					i(H, "click", function(U) {
						var T = U.target || U.srcElement;
						if(T.tagName == "SPAN") {
							T = T.parentNode.querySelector("i")
						} else {
							if(T.tagName == "DIV") {
								T = T.querySelector("i")
							}
						}
						var P = T.parentNode.nextSibling;
						if(b(T, "icon-radio-unchecked")) {
							var R = T.getAttribute("name");
							var V = c.getElements(G, R);
							for(var Q = 0; Q < V.length; Q++) {
								var S = V[Q];
								if(!b(S, "icon-radio-unchecked")) {
									n(S, "icon-radio-checked");
									j(S, "icon-radio-unchecked")
								}
							}
							n(T, "icon-radio-unchecked");
							j(T, "icon-radio-checked");
							if(P.tagName == "INPUT" && P.type == "radio") {
								P.checked = true
							}
						}
						P.click()
					})
				}
				J.parentNode.insertBefore(H, J);
				var F = J.getAttribute("name");
				var M = c.getElements(G, F);
				if(M != null) {
					M.push(I)
				} else {
					c.setElements(G, F, I)
				}
			}
		},
		createSelect: function(L) {
			var G = document.createElement("div");
			var M = document.createElement("i");
			var N = document.createElement("input");
			var F = document.createElement("div");
			N.type = "text";
			N.readOnly = true;
			F.setAttribute("name", L.getAttribute("name"));
			F.setAttribute("multiple", L.multiple);
			j(G, "mcxui-select-wrap");
			j(N, "select-input");
			j(M, "select-arrow");
			j(F, "mcxui-options");
			G.appendChild(M);
			G.appendChild(N);
			G.appendChild(F);
			i(N, "focus", function(Q) {
				var P = Q.target || Q.srcElement;
				P.nextSibling.style.display = "block";
				n(P.previousSibling, "arrow-rotate-anticlockwise");
				j(P.previousSibling, "arrow-rotate-clockwise")
			});
			i(N, "blur", function(Q) {
				var P = Q.target || Q.srcElement;
				n(P.previousSibling, "arrow-rotate-clockwise");
				j(P.previousSibling, "arrow-rotate-anticlockwise");
				setTimeout(function() {
					P.nextSibling.style.display = "none"
				}, 150)
			});
			var K = [];
			var O = L.options;
			for(var I = 0; I < O.length; I++) {
				var J = O[I];
				var H = document.createElement("div");
				H.setAttribute("value", J.value);
				H.innerHTML = J.text;
				j(H, "mcxui-option");
				if(J.selected == true) {
					K.push(J.text);
					j(H, "selected")
				}
				F.appendChild(H);
				i(H, "click", function(U) {
					var V = U.target || U.srcElement;
					var T = V.getAttribute("value");
					var S = V.parentNode.parentNode.nextSibling;
					var Z = V.parentNode.getAttribute("multiple");
					if(Z == "true") {
						var P = V.parentNode.previousSibling;
						if(b(V, "selected")) {
							var Y = P.value.split(",");
							if(Y.length != 1) {
								for(var Q = 0; Q < Y.length; Q++) {
									var X = Y[Q];
									if(X == V.innerHTML) {
										Y.splice(Q, 1);
										n(V, "selected");
										break
									}
								}
								P.value = Y.join(",");
								c.cancelOption(S, T)
							}
						} else {
							var R = ",";
							if(P.value.length == 0) {
								R = ""
							}
							P.value = P.value + R + V.innerHTML;
							j(V, "selected");
							c.selectOption(S, T, Z)
						}
					} else {
						V.parentNode.previousSibling.value = V.innerHTML;
						var W = V.parentNode.children;
						for(var Q = 0; Q < W.length; Q++) {
							n(W[Q], "selected")
						}
						j(V, "selected");
						c.selectOption(S, T, Z);
						E(S)
					}
				})
			}
			if(L.multiple != true) {
				N.value = L.options[L.selectedIndex].text
			} else {
				N.value = K.join(",")
			}
			L.parentNode.insertBefore(G, L)
		}
	};
	c.selectOption = function(G, K, F) {
		var H = G.options;
		for(var I = 0; I < H.length; I++) {
			var J = H[I];
			if(F == "false") {
				if(J.value == K) {
					J.selected = true
				} else {
					J.selected = false
				}
			} else {
				if(J.value == K) {
					J.selected = true
				}
			}
		}
	};
	c.cancelOption = function(F, J) {
		var G = F.options;
		for(var H = 0; H < G.length; H++) {
			var I = G[H];
			if(I.value == J) {
				I.selected = false;
				break
			}
		}
	};

	function E(G) {
		if(document.createEvent) {
			var F = document.createEvent("HTMLEvents");
			F.initEvent("change", true, true);
			G.dispatchEvent(F)
		} else {
			G.fireEvent("onchange")
		}
	}
	c.getElements = function(I, H) {
		for(var G = 0; G < I.length; G++) {
			var F = I[G];
			if(F.key == H) {
				return F.elements
			}
		}
		return null
	};
	c.setElements = function(I, G, F) {
		var H = {};
		H.key = G;
		H.elements = [];
		H.elements.push(F);
		I.push(H)
	};

	function l(F) {
		for(var G = 0; G < F.length; G++) {
			var H = F[G];
			H.checked = true
		}
	}

	function f(F) {
		for(var G = 0; G < F.length; G++) {
			var H = F[G];
			H.checked = false
		}
	}
	var B = {
		accordion: {
			init: function(F) {
				new d(F)
			}
		},
		dialog: t,
		form: {
			init: function() {
				c.init()
			},
			select: function(G) {
				var F = typeof G == "object" ? G : document.getElementById(G);
				if(F.previousSibling != null && b(F.previousSibling, "mcxui-select-wrap")) {
					F.parentNode.removeChild(F.previousSibling)
				}
				F.style.display = "none";
				c.createSelect(F)
			}
		},
		nav: {
			init: function(F) {
				new q(F)
			}
		},
		pagination: {
			init: function(G, F) {
				new e(G, F)
			}
		},
		"switch": {
			init: function(F) {
				return new s(F)
			}
		},
		tab: {
			init: function(G, F) {
				return new h(G, F)
			}
		},
		tree: {
			init: function(H, F, G) {
				return new u(H, F, G)
			}
		}
	};
	g.mcxui = B;
	i(g, "load", function() {
		c.init()
	})
})(window);