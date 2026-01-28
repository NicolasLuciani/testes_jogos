/* =======================
   CONTROLE DE GOLS
======================= */
const controles = document.querySelectorAll(".controle_gols");

controles.forEach(controle => {
  const spanGols = controle.querySelector(".gols");
  const botoes = controle.querySelectorAll(".btn_gol");

  if (!spanGols || botoes.length < 2) return; // evita erro

  const btnMenos = botoes[0];
  const btnMais = botoes[1];

  let gols = 0;

  function atualizarPlacar() {
    spanGols.textContent = gols;

    btnMenos.disabled = gols === 0;
    btnMenos.style.opacity = gols === 0 ? "0.4" : "1";
    btnMenos.style.cursor = gols === 0 ? "not-allowed" : "pointer";
  }

  btnMais.addEventListener("click", () => {
    gols++;
    atualizarPlacar();
  });

  btnMenos.addEventListener("click", () => {
    if (gols > 0) {
      gols--;
      atualizarPlacar();
    }
  });

  atualizarPlacar();
});

/* =======================
   CRONÔMETRO
======================= */
const tempoEl = document.getElementById("tempo");
const btnPlay = document.querySelector(".play_cronometro i");
const btnReset = document.querySelector(".reiniciar");

let segundos = 0;
let intervalo = null;
let rodando = false;

function atualizarTempo() {
  if (!tempoEl) return;

  const min = String(Math.floor(segundos / 60)).padStart(2, "0");
  const sec = String(segundos % 60).padStart(2, "0");

  tempoEl.textContent = `${min}:${sec}`;

  if (btnReset) {
    if (segundos === 0) {
      btnReset.style.opacity = "0.4";
      btnReset.style.cursor = "not-allowed";
      btnReset.style.pointerEvents = "none";
    } else {
      btnReset.style.opacity = "1";
      btnReset.style.cursor = "pointer";
      btnReset.style.pointerEvents = "auto";
    }
  }
}

if (btnPlay) {
  btnPlay.addEventListener("click", () => {
    if (!rodando) {
      intervalo = setInterval(() => {
        segundos++;
        atualizarTempo();
      }, 1000);

      btnPlay.className = "bi bi-pause-circle-fill";
      rodando = true;
    } else {
      clearInterval(intervalo);
      intervalo = null;

      btnPlay.className = "bi bi-play-circle-fill";
      rodando = false;
    }
  });
}

if (btnReset) {
  btnReset.addEventListener("click", () => {
    if (segundos === 0) return;

    clearInterval(intervalo);
    intervalo = null;
    segundos = 0;
    rodando = false;

    if (btnPlay) btnPlay.className = "bi bi-play-circle-fill";
    atualizarTempo();
  });
}

atualizarTempo();

/* =======================
   VALIDAÇÃO DOS NOMES DOS TIMES
======================= */
const btnIniciar = document.querySelector(".btn_iniciar_partida");
const nomeTime1 = document.querySelector(".nome_time1");
const nomeTime2 = document.querySelector(".nome_time2");

if (btnIniciar && nomeTime1 && nomeTime2) {
  btnIniciar.addEventListener("click", function(e) {
    e.preventDefault();

    const time1 = nomeTime1.value.trim();
    const time2 = nomeTime2.value.trim();

    if (time1 === "" || time2 === "") {
      return;
    }

    // salva no localStorage para usar na página final
    localStorage.setItem("time1", time1);
    localStorage.setItem("time2", time2);

    // vai para a tela final
    window.location.href = "placar_final.html";
  });
}

const aviso = document.querySelector(".aviso_nome");

btnIniciar.addEventListener("click", function(e) {
    e.preventDefault();

    const time1 = nomeTime1.value.trim();
    const time2 = nomeTime2.value.trim();

    if (time1 === "" || time2 === "") {
        aviso.textContent = "Por favor, preencha os nomes dos dois times!";
        aviso.style.display = "block"; // mostra a mensagem
        return;
    }

    aviso.style.display = "none"; // esconde se estiver tudo certo

    // salva os nomes e vai para a página final
    localStorage.setItem("time1", time1);
    localStorage.setItem("time2", time2);
    window.location.href = "placar_final.html";
});


document.addEventListener("DOMContentLoaded", () => {
    const time1Final = document.getElementById("time1_final");
    const time2Final = document.getElementById("time2_final");

    const time1 = localStorage.getItem("time1");
    const time2 = localStorage.getItem("time2");

    if (!time1 || !time2) {
        window.location.href = "placar.html"; // redireciona se não tiver nomes
        return;
    }

    time1Final.textContent = time1;
    time2Final.textContent = time2;
});
