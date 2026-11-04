(function () {
  "use strict";

  var cfg = window.DVIDA || {};

  /* ---------- Botones hacia el backend (aplicación web) ---------- */
  document.querySelectorAll("[data-backend]").forEach(function (a) {
    a.href = cfg.backendUrl || "#";
  });
  if (!cfg.backendUrl || cfg.backendUrl.indexOf("TU-") !== -1) {
    console.warn("Configura backendUrl en js/config.js con la URL real de tu aplicación.");
  }

  /* ---------- Textos y contacto ---------- */
  document.querySelectorAll("[data-direccion]").forEach(function (el) {
    el.textContent = cfg.direccion || "";
  });

  function mostrarCampo(nombre, valor, hrefFn) {
    var li = document.querySelector('[data-field="' + nombre + '"]');
    if (!li || !valor) return;
    var destino = li.querySelector("a") || li.querySelector("span");
    destino.textContent = valor;
    if (hrefFn && destino.tagName === "A") destino.href = hrefFn(valor);
    li.hidden = false;
  }
  mostrarCampo("horario", cfg.horario);
  mostrarCampo("telefono", cfg.telefono);
  mostrarCampo("correo", cfg.correo, function (v) { return "mailto:" + v; });

  var wa = document.getElementById("btn-whatsapp");
  if (wa && cfg.whatsapp) {
    var texto = encodeURIComponent("Hola, quisiera hacer un pedido en D’Vida.");
    wa.href = "https://wa.me/" + cfg.whatsapp.replace(/\D/g, "") + "?text=" + texto;
    wa.hidden = false;
  }

  var consulta = encodeURIComponent("Panadería D'Vida, " + (cfg.direccion || ""));
  var mapa = document.getElementById("mapa");
  if (mapa) mapa.src = "https://www.google.com/maps?q=" + consulta + "&output=embed";
  var btnMapa = document.getElementById("btn-mapa");
  if (btnMapa) btnMapa.href = "https://www.google.com/maps/search/?api=1&query=" + consulta;

  var repo = document.getElementById("repo-link");
  if (repo) {
    if (cfg.repoUrl && cfg.repoUrl.indexOf("TU-") === -1) repo.href = cfg.repoUrl;
    else repo.parentElement.hidden = true;
  }

  document.getElementById("anio").textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  function cerrarMenu() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  }
  toggle.addEventListener("click", function () {
    var abierto = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(abierto));
    toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", cerrarMenu); });

  /* ---------- Galería ---------- */
  var fotos = cfg.galeria || [];
  var grid = document.getElementById("galeria-grid");
  var visor = document.getElementById("visor");
  var visorImg = document.getElementById("visor-img");
  var visorPie = document.getElementById("visor-pie");
  var actual = 0;
  var RELLENO = "img/placeholder.svg";

  function conRelleno(img) {
    img.addEventListener("error", function () {
      if (img.getAttribute("src") !== RELLENO) img.src = RELLENO;
    });
  }

  fotos.forEach(function (foto, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "Ampliar foto: " + foto.alt);

    var img = document.createElement("img");
    img.loading = "lazy";
    img.alt = foto.alt;
    conRelleno(img);
    img.src = foto.src;

    btn.appendChild(img);
    btn.addEventListener("click", function () { abrir(i); });
    grid.appendChild(btn);
  });

  function mostrar(i) {
    if (!fotos.length) return;
    actual = (i + fotos.length) % fotos.length;
    visorImg.src = fotos[actual].src;
    visorImg.alt = fotos[actual].alt;
    visorPie.textContent = fotos[actual].alt + " (" + (actual + 1) + " de " + fotos.length + ")";
  }
  conRelleno(visorImg);

  function abrir(i) {
    mostrar(i);
    if (typeof visor.showModal === "function") visor.showModal();
  }

  document.getElementById("visor-prev").addEventListener("click", function () { mostrar(actual - 1); });
  document.getElementById("visor-next").addEventListener("click", function () { mostrar(actual + 1); });
  document.getElementById("visor-cerrar").addEventListener("click", function () { visor.close(); });

  // Cerrar al hacer clic fuera de la foto
  visor.addEventListener("click", function (e) { if (e.target === visor) visor.close(); });

  // Flechas del teclado (Esc ya cierra el <dialog> de forma nativa)
  visor.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") mostrar(actual - 1);
    if (e.key === "ArrowRight") mostrar(actual + 1);
  });
})();
