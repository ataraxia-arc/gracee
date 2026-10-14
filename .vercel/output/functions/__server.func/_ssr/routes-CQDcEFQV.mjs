import { o as __toESM } from "../_runtime.mjs";
import { Q as require_react, T as require_jsx_runtime, m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Wordmark, o as useCurrentUserState, r as PillLink } from "./ui-DljB4Qx7.mjs";
import { l as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as hero_default } from "./hero-CcNMERMY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CQDcEFQV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Glass({ className, kicker, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `glass-card pointer-events-none rounded-3xl p-4 ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-[0.18em] text-white/60",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children
			})
		]
	});
}
function HeroStage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative mx-auto mt-8 max-w-6xl px-4 sm:px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[2rem] bg-void shadow-[0_30px_80px_rgba(11,11,13,0.18)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-[460px] sm:h-[540px] lg:h-[680px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_default,
						alt: "Cinematic portrait lit with lavender and blue rim light, surrounded by orbital rings",
						className: "drift absolute inset-0 h-full w-full object-cover object-[center_22%]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-cream via-transparent to-void/50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "orbit pointer-events-none absolute -inset-[18%] opacity-70",
						viewBox: "0 0 800 800",
						fill: "none",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "400",
							cy: "400",
							rx: "280",
							ry: "120",
							stroke: "rgba(152,144,255,0.55)",
							strokeWidth: "1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "400",
							cy: "400",
							rx: "340",
							ry: "170",
							stroke: "rgba(108,150,234,0.35)",
							strokeWidth: "1",
							transform: "rotate(18 400 400)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 hidden lg:block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, {
								className: "float-a absolute left-8 top-16 w-56",
								kicker: "Live view",
								title: "Inventory Overview",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-end gap-1.5",
									children: [
										40,
										62,
										48,
										78,
										56,
										88,
										70
									].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-2 rounded-full bg-white/80",
										style: { height: `${h / 4}px` }
									}, h))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, {
								className: "float-b absolute bottom-20 left-16 w-60",
								kicker: "Watchlist",
								title: "Stock Monitoring",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "space-y-2 text-xs text-white/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "In stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Steady" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Low stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Attention" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Out of stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resolve" })]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, {
								className: "float-c absolute right-10 top-20 w-60",
								kicker: "Clarity",
								title: "Product Intelligence",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: [
										"Electronics",
										"Office",
										"Home"
									].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full border border-white/20 px-2 py-1 text-[11px]",
										children: c
									}, c))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
								className: "float-d absolute bottom-24 right-14 w-56",
								kicker: "Signals",
								title: "Business Insights",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 overflow-hidden rounded-full bg-white/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-2/3 rounded-full bg-lavender" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-white/70",
									children: "Value, units, and movement in one glance."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, {
								className: "float-e absolute bottom-8 left-1/2 w-64 -translate-x-1/2",
								kicker: "Workspace",
								title: "Quick Organization",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs leading-5 text-white/75",
									children: "Name, SKU, category, price, and quantity — kept in order."
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 p-4 sm:grid-cols-2 lg:hidden",
				children: [
					["Inventory Overview", "Every product, one refined view."],
					["Product Intelligence", "Categories that stay easy to read."],
					["Stock Monitoring", "See what needs attention."],
					["Business Insights", "Value and units, clearly stated."],
					["Quick Organization", "Add, edit, and refine without friction."]
				].map(([title, copy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "glass-card rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-5 text-white/70",
						children: copy
					})]
				}, title))
			})]
		})
	});
}
var links = [
	{
		label: "Home",
		to: "/",
		hash: void 0
	},
	{
		label: "Features",
		to: "/",
		hash: "features"
	},
	{
		label: "Solutions",
		to: "/",
		hash: "solutions"
	},
	{
		label: "Dashboard",
		to: "/dashboard",
		hash: void 0
	},
	{
		label: "Products",
		to: "/products",
		hash: void 0
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const path = useRouterState({ select: (s) => s.location.pathname });
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line/80 bg-cream/80 backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-cream",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "shrink-0",
						"aria-label": "GRXX INTELLIGENCE home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-7 lg:flex",
						"aria-label": "Primary",
						children: links.map((item) => {
							const active = item.hash ? false : path === item.to && item.to !== "/";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								hash: item.hash,
								className: `text-sm transition-colors hover:text-ink ${active ? "text-ink" : "text-muted"}`,
								children: item.label
							}, item.label);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden items-center gap-2 lg:flex",
						children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-11 w-28 rounded-full bg-line/70" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
							to: "/dashboard",
							children: "Open workspace"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "px-3 text-sm text-ink hover:text-muted",
							children: "Sign In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
							to: "/login",
							search: { mode: "signup" },
							children: "Get Started"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden",
						"aria-expanded": open,
						"aria-label": open ? "Close menu" : "Open menu",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-line bg-ivory px-5 py-4 lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col gap-1",
					"aria-label": "Mobile",
					children: [links.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						hash: item.hash,
						onClick: () => setOpen(false),
						className: "rounded-2xl px-3 py-3 text-base hover:bg-white",
						children: item.label
					}, item.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-col gap-2",
						children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
							to: "/dashboard",
							children: "Open workspace"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setOpen(false),
							className: "grid h-11 place-items-center rounded-full border border-line",
							children: "Sign In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
							to: "/login",
							search: { mode: "signup" },
							children: "Get Started"
						})] })
					})]
				})
			}) : null
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line bg-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xs text-sm leading-6 text-muted",
					children: "Intelligent Inventory. Effortless Control."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Navigate"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-muted",
							children: "Home"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "features",
							className: "hover:text-muted",
							children: "Features"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							hash: "solutions",
							className: "hover:text-muted",
							children: "Solutions"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "hover:text-muted",
							children: "Dashboard"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							className: "hover:text-muted",
							children: "Products"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "hover:text-muted",
							children: "Sign In"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { mode: "signup" },
							className: "hover:text-muted",
							children: "Create account"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							hash: "account",
							className: "hover:text-muted",
							children: "Account"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between border-t border-line px-5 py-5 text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" GRXX INTELLIGENCE"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inventory, organized with clarity." })]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "atmosphere min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "px-5 pb-6 pt-14 text-center sm:pt-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow rise",
								children: "The intelligence behind your inventory"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "display rise rise-d1 mx-auto mt-6 max-w-5xl text-ink",
								children: [
									"Your business,",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"reimagined."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rise rise-d2 mx-auto mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg",
								children: "Organize effortlessly. Track intelligently. Grow confidently. Experience inventory management built for a clearer tomorrow."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rise rise-d3 mt-8 flex flex-wrap items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
									to: "/login",
									search: { mode: "signup" },
									children: "Get Started"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
									to: "/",
									hash: "features",
									tone: "ghost",
									children: "Explore Platform"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroStage, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-6xl px-5 py-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Why GRXX INTELLIGENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "display-md mt-4 max-w-3xl",
								children: [
									"Simplicity in every detail.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Clarity in every decision."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 grid gap-4 md:grid-cols-3",
								children: [
									[
										"01",
										"Effortless Organization",
										"Bring products, categories, and inventory records into one refined workspace."
									],
									[
										"02",
										"Smarter Business Insights",
										"Understand important inventory metrics instantly."
									],
									[
										"03",
										"Complete Control",
										"Manage product data with precision and confidence."
									]
								].map(([n, title, copy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface p-7 transition-transform duration-200 hover:-translate-y-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm tracking-[0.18em] text-muted",
											children: n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-6 text-2xl tracking-tight",
											children: title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-6 text-muted",
											children: copy
										})
									]
								}, n))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "features",
						className: "scroll-mt-24 bg-ivory py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Made to work smarter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "display-md mt-4 max-w-3xl",
									children: [
										"Powerful tools for",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"a more intelligent business."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-12 grid gap-4 lg:grid-cols-12",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "surface p-7 lg:col-span-7",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "eyebrow",
													children: "01"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-4 text-3xl tracking-tight",
													children: "Product Inventory Management"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 max-w-md text-sm leading-6 text-muted",
													children: "A calm table for the records you actually keep — names, SKUs, prices, and quantities."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-8 overflow-hidden rounded-2xl border border-line",
													children: [
														[
															"Wireless Keyboard",
															"KB-001",
															"20"
														],
														[
															"Studio Lamp",
															"LM-014",
															"8"
														],
														[
															"Linen Notebook",
															"NB-220",
															"41"
														]
													].map(([name, sku, qty]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-[1.4fr_0.8fr_auto] items-center gap-3 border-b border-line px-4 py-3 text-sm last:border-0",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted",
																children: sku
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "tabular-nums",
																children: qty
															})
														]
													}, sku))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-3 text-xs text-muted",
													children: "Interface preview"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "surface flex flex-col justify-between p-7 lg:col-span-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "eyebrow",
													children: "02"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-4 text-3xl tracking-tight",
													children: "Real-Time Stock Overview"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm leading-6 text-muted",
													children: "In stock, low, and out — visible the moment you open the workspace."
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-8 flex items-end gap-3",
												children: [
													[
														"In",
														"72%",
														"h-28"
													],
													[
														"Low",
														"38%",
														"h-16"
													],
													[
														"Out",
														"14%",
														"h-8"
													]
												].map(([label, width, height]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: `rounded-t-2xl bg-charcoal ${height}`,
															style: { opacity: label === "In" ? 1 : label === "Low" ? .55 : .3 }
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-2 text-xs text-muted",
															children: label
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-sm tabular-nums",
															children: width
														})
													]
												}, label))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "surface p-7 lg:col-span-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "eyebrow",
													children: "03"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-4 text-2xl tracking-tight",
													children: "Inventory Analytics"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm leading-6 text-muted",
													children: "Category mix and inventory value, drawn from your own records."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													viewBox: "0 0 240 90",
													className: "mt-6 w-full",
													"aria-hidden": "true",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M0 70 C 30 68, 40 40, 70 46 S 120 20, 150 28 200 18, 240 12",
														fill: "none",
														stroke: "#161616",
														strokeWidth: "2"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M0 70 C 30 68, 40 40, 70 46 S 120 20, 150 28 200 18, 240 12 V 90 H 0 Z",
														fill: "#9890FF",
														opacity: "0.25"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "surface p-7 lg:col-span-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "eyebrow",
													children: "04"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-4 text-2xl tracking-tight",
													children: "Secure Account Access"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm leading-6 text-muted",
													children: "Your inventory stays yours. Every record is tied to the signed-in account."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-6 space-y-2 rounded-2xl border border-line bg-ivory p-4 text-sm",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "flex justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Session" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted",
																children: "Protected"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "flex justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Passwords" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted",
																children: "Hashed"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "flex justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Records" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted",
																children: "Private"
															})]
														})
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "surface p-7 lg:col-span-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "eyebrow",
													children: "05"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-4 text-2xl tracking-tight",
													children: "Organized Product Categories"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm leading-6 text-muted",
													children: "Group what you sell so search and filters stay effortless."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-6 flex flex-wrap gap-2",
													children: [
														"Electronics",
														"Apparel",
														"Grocery",
														"Office",
														"Home"
													].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full border border-line bg-ivory px-3 py-1.5 text-sm",
														children: c
													}, c))
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
											className: "surface p-7 lg:col-span-12",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid items-end gap-8 lg:grid-cols-[1fr_1.2fr]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "eyebrow",
														children: "06"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "mt-4 text-3xl tracking-tight",
														children: "Business Performance Visibility"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 max-w-md text-sm leading-6 text-muted",
														children: "Totals for products, units, and inventory value sit beside the items that need a closer look."
													})
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-3 gap-3",
													children: [
														["Products", "Counted"],
														["Units", "Summed"],
														["Value", "Priced"]
													].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-2xl border border-line bg-ivory p-4",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-muted",
															children: k
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-3 text-lg tracking-tight",
															children: v
														})]
													}, k))
												})]
											})
										})
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "solutions",
						className: "scroll-mt-24 mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Workspace"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "display-md mt-4",
								children: [
									"Your inventory,",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"understood."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-md text-base leading-7 text-muted",
								children: "Every product tells a story. GRXX INTELLIGENCE turns your inventory data into clarity so you can focus on what matters."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
									to: "/dashboard",
									children: "Explore Dashboard"
								})
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted",
												children: "Overview"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs tracking-[0.16em] text-soft",
												children: "PREVIEW"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-6 text-4xl tracking-tight",
											children: "At a glance"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-6 grid grid-cols-2 gap-3",
											children: [
												"Products",
												"Units",
												"Value",
												"Low stock"
											].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-line bg-ivory p-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted",
													children: label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-2 w-16 rounded-full bg-charcoal/80" })]
											}, label))
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface absolute -left-4 bottom-8 hidden w-44 p-4 sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "Categories"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm",
										children: "Grouped with care"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface absolute -right-2 -top-6 hidden w-48 p-4 sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "Recent"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm",
										children: "Newest records first"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "bg-ivory py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "How it works"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display-md mt-4 max-w-xl",
									children: "Three quiet steps."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-12 grid gap-8 md:grid-cols-3",
									children: [
										[
											"01",
											"Create Your Workspace",
											"Register securely and access your personal dashboard."
										],
										[
											"02",
											"Organize Your Inventory",
											"Add products, update details, and manage stock levels."
										],
										[
											"03",
											"Understand Your Business",
											"Monitor inventory metrics and gain meaningful insights."
										]
									].map(([n, title, copy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm tracking-[0.2em] text-muted",
											children: n
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 text-2xl tracking-tight",
											children: title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-sm leading-6 text-muted",
											children: copy
										})
									] }, n))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "px-5 py-28 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "display-md mx-auto max-w-3xl",
								children: [
									"Intelligence begins",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"with clarity."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-5 max-w-md text-muted",
								children: "Everything you need to manage your inventory, beautifully connected."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillLink, {
									to: "/login",
									search: { mode: "signup" },
									children: "Start with GRXX"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Home as component };
