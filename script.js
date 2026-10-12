
/* =====================================================
   Скоро в кино — премьеры и трейлеры

   Постеры:
   images/dune.jpg
   images/avengers.jpg
   images/hunger.jpg
   images/narnia.jpg
   images/batman.jpg
   images/shrek.jpg
   images/frozen.jpg
   images/secretwars.jpg
   images/superman.jpg
   images/gollum.jpg

   YouTube:
   Можно указать полную ссылку или только ID видео.
   ===================================================== */

const MOVIES = [
  {
    id: 1,
    title: "Дюна: Часть третья",
    original: "Dune: Part Three",
    date: "2026-12-18",
    file: "dune",
    genres: ["Фантастика", "Драма"],
    director: "Дени Вильнёв",
    cast: "Тимоти Шаламе, Зендея",
    youtube: "https://youtu.be/k37FXpe9TnA?si=KZECu_sHPAf0hESB",
    desc: "Завершающая часть саги о Поле Атрейдесе по мотивам романов Фрэнка Герберта."
  },
  {
    id: 2,
    title: "Мстители: Судный день",
    original: "Avengers: Doomsday",
    date: "2026-12-18",
    file: "avengers",
    genres: ["Боевик", "Фантастика"],
    director: "Энтони и Джо Руссо",
    youtube: "https://youtu.be/7z6HZNi0HU4?si=pnByNx3N_x7j2kvg",
    desc: "Герои вселенной Marvel объединяются против новой глобальной угрозы."
  },
  {
    id: 3,
    title: "Голодные игры: Рассвет жатвы",
    original: "The Hunger Games: Sunrise on the Reaping",
    date: "2026-11-20",
    file: "hunger",
    genres: ["Фантастика", "Триллер"],
    youtube: "https://youtu.be/9UVKFX7tip0?si=_2VJKs8xXI82SKrl",
    desc: "Предыстория саги: события, которые привели к первым Голодным играм."
  },
  {
    id: 4,
    title: "Хроники Нарнии",
    original: "The Chronicles of Narnia",
    date: "2027-02-12",
    file: "narnia",
    genres: ["Фэнтези", "Приключения"],
    director: "Грета Гервиг",
    youtube: "",
    desc: "Новая экранизация сказочной серии Клайва Льюиса о волшебной стране за дверью шкафа."
  },
  {
    id: 5,
    title: "Бэтмен: Часть II",
    original: "The Batman Part II",
    date: "2027-10-01",
    file: "batman",
    genres: ["Боевик", "Криминал"],
    director: "Мэтт Ривз",
    youtube: "https://youtu.be/keGk1vOl2yg?si=mxBdXsV5odevrazG",
    desc: "Продолжение мрачной истории о тёмном рыцаре Готэма."
  },
  {
    id: 6,
    title: "Шрек 5",
    original: "Shrek 5",
    date: "2027-06-30",
    file: "shrek",
    genres: ["Мультфильм", "Комедия"],
    youtube: "https://youtu.be/alkSvUVsY8M?si=sB5ity58KwEOB8Ws",
    desc: "Новое приключение любимого огра, Осла и их друзей."
  },
  {
    id: 7,
    title: "Суперсемейка 3",
    original: "Incredibles 3",
    date: "2028-06-16",
    file: "frozen",
    genres: ["Мультфильм", "Семейный"],
    youtube: "",
    desc: "Новое приключение семьи супергероев."
  },
  {
    id: 8,
    title: "Мстители: Секретные войны",
    original: "Avengers: Secret Wars",
    date: "2027-12-17",
    file: "secretwars",
    genres: ["Боевик", "Фантастика"],
    youtube: "",
    desc: "Финал большой саги: миры мультивселенной сталкиваются."
  },
  {
    id: 9,
    title: "Человек-паук: За пределами вселенных",
    original: "Spider-Man: Beyond the Spider-Verse",
    date: "2027-06-17",
    file: "superman",
    genres: ["Мультфильм", "Боевик", "Фантастика"],
    youtube: "",
    desc: "Новое приключение Майлза Моралеса в мультивселенной."
  },
  {
    id: 10,
    title: "Властелин колец: Охота за Голлумом",
    original: "The Hunt for Gollum",
    date: "2027-12-17",
    file: "gollum",
    genres: ["Фэнтези", "Приключения"],
    director: "Энди Серкис",
    youtube: "https://youtu.be/AzHxlEu_eyo?si=EDaCeaINaObBMyry",
    desc: "История о том, как Голлума выслеживают в Средиземье."
  }
];

/* ---------- Состояние ---------- */

let tab = "all";
let favs = new Set();

try {
  const savedFavs = JSON.parse(localStorage.getItem("favs") || "[]");
  if (Array.isArray(savedFavs)) {
    favs = new Set(savedFavs);
  }
} catch (error) {
  favs = new Set();
}

let current = null;

const $ = (selector) => document.querySelector(selector);
const grid = $("#grid");
const hero = $("#hero");

/* ---------- Форматирование дат ---------- */

function fmtDate(iso) {
  return new Date(iso + "T12:00:00").toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function daysLeft(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(iso + "T00:00:00");
  return Math.round((target - today) / 86400000);
}

function leftText(iso) {
  const d = daysLeft(iso);

  if (d < 0) return "Дата премьеры прошла";
  if (d === 0) return "Премьера сегодня";

  const n10 = d % 10;
  const n100 = d % 100;

  const word =
    n10 === 1 && n100 !== 11
      ? "день"
      : n10 >= 2 && n10 <= 4 &&
        (n100 < 10 || n100 >= 20)
        ? "дня"
        : "дней";

  return `Через ${d} ${word}`;
}

/* ---------- Защита HTML ---------- */

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

/* ---------- Получение ID YouTube ---------- */

function getYouTubeId(value) {
  if (!value) return "";

  const input = String(value).trim();

  // Если пользователь уже указал только ID
  if (/^[\w-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase();

    // Короткие ссылки youtu.be
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0] || "";
      return /^[\w-]{11}$/.test(id) ? id : "";
    }

    // Обычные ссылки youtube.com
    if (
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtube-nocookie.com" ||
      host.endsWith(".youtube-nocookie.com")
    ) {
      let id = url.searchParams.get("v") || "";

      if (!id) {
        const match = url.pathname.match(
          /^\/(?:embed|shorts|live)\/([\w-]{11})/
        );

        if (match) id = match[1];
      }

      return /^[\w-]{11}$/.test(id) ? id : "";
    }
  } catch (error) {
    return "";
  }

  return "";
}

/* ---------- Поиск постеров ---------- */

function findImage(file) {
  const extensions = ["jpg", "jpeg", "png", "webp"];

  return new Promise((resolve) => {
    function tryExtension(index) {
      if (index >= extensions.length) {
        resolve(`images/${file}.svg`);
        return;
      }

      const path = `images/${file}.${extensions[index]}`;
      const img = new Image();

      img.onload = () => resolve(path);
      img.onerror = () => tryExtension(index + 1);
      img.src = path;
    }

    tryExtension(0);
  });
}

/* ---------- Жанры ---------- */

function fillGenres() {
  const genreSelect = $("#genre");
  if (!genreSelect) return;

  const genres = [
    ...new Set(MOVIES.flatMap((movie) => movie.genres))
  ].sort((a, b) => a.localeCompare(b, "ru"));

  genreSelect.innerHTML =
    '<option value="">Все жанры</option>' +
    genres.map((genre) =>
      `<option value="${esc(genre)}">${esc(genre)}</option>`
    ).join("");
}

/* ---------- Фильтрация и сортировка ---------- */

function filtered() {
  const query = ($("#search")?.value || "").trim().toLowerCase();
  const genre = $("#genre")?.value || "";
  const sort = $("#sort")?.value || "date";

  const list = MOVIES.filter((movie) =>
    (tab === "all" || favs.has(movie.id)) &&
    (!genre || movie.genres.includes(genre)) &&
    (
      !query ||
      movie.title.toLowerCase().includes(query) ||
      (movie.original || "").toLowerCase().includes(query)
    )
  );

  list.sort((a, b) => {
    if (sort === "title") {
      return a.title.localeCompare(b.title, "ru");
    }

    return new Date(a.date) - new Date(b.date);
  });

  return list;
}

/* ---------- Отображение карточек ---------- */

function render() {
  const list = filtered();

  if ($("#favCount")) {
    $("#favCount").textContent = favs.size;
  }

  grid.innerHTML = list.map((movie) => `
    <button class="card" data-id="${movie.id}">
      <div
        class="card__poster"
        style="background-image: url('${esc(movie.img)}')"
      >
        <span class="card__date">${fmtDate(movie.date)}</span>
      </div>

      <div>
        <div class="card__title">
          ${favs.has(movie.id) ? "♥ " : ""}${esc(movie.title)}
        </div>

        <div class="card__genres">
          ${esc(movie.genres.join(", "))}
        </div>
      </div>
    </button>
  `).join("");

  if (list.length === 0) {
    grid.innerHTML = `
      <p class="status">
        ${
          tab === "fav"
            ? "В избранном пока пусто. Откройте фильм и нажмите «В избранное»."
            : "Ничего не найдено. Измените запрос или жанр."
        }
      </p>
    `;
  }

  renderHero();
}

/* ---------- Главный баннер ---------- */

function renderHero() {
  const next = [...MOVIES]
    .filter((movie) => daysLeft(movie.date) >= 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  if (!next) {
    hero.hidden = true;
    return;
  }

  hero.hidden = false;
  hero.style.backgroundImage = `url("${next.img}")`;

  hero.innerHTML = `
    <div class="countdown">
      ${leftText(next.date)} · ${fmtDate(next.date)}
    </div>

    <h1>${esc(next.title)}</h1>

    <p>${esc(next.desc)}</p>

    <div class="hero__actions">
      <button class="btn" data-open="${next.id}">
        Смотреть трейлер
      </button>
    </div>
  `;
}

/* ---------- Окно фильма ---------- */

function openMovie(id) {
  const movie = MOVIES.find((item) => item.id === id);
  if (!movie) return;

  current = movie;

  $("#mTitle").textContent = movie.title;
  $("#mMeta").textContent =
    `${fmtDate(movie.date)} · ${leftText(movie.date)}`;
  $("#mDesc").textContent = movie.desc;

  const facts = [
    ["Оригинал", movie.original],
    ["Жанры", movie.genres.join(", ")],
    ["Режиссёр", movie.director],
    ["В ролях", movie.cast]
  ].filter((fact) => fact[1]);

  $("#mFacts").innerHTML = facts.map(([key, value]) => `
    <dt>${esc(key)}</dt>
    <dd>${esc(value)}</dd>
  `).join("");

  const player = $("#mPlayer");
  const youtubeId = getYouTubeId(movie.youtube);

  // Очищаем старое видео
  player.innerHTML = "";
  player.style.backgroundImage = "";

  if (youtubeId) {
    const iframe = document.createElement("iframe");

    iframe.src =
      `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

    iframe.title = `Трейлер: ${movie.title}`;
    iframe.allow =
      "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    player.appendChild(iframe);
  } else {
    // Если трейлер не указан — показываем постер
    player.style.backgroundImage = `url("${movie.img}")`;
  }

  const ytButton = $("#mYt");

  if (youtubeId) {
    ytButton.href =
      `https://www.youtube.com/watch?v=${youtubeId}`;
    ytButton.textContent = "Открыть на YouTube";
  } else {
    ytButton.href =
      "https://www.youtube.com/results?search_query=" +
      encodeURIComponent(`${movie.title} ${movie.original || ""} трейлер`);

    ytButton.textContent = "Найти трейлер на YouTube";
  }

  updateFavButton();

  $("#modal").hidden = false;
  document.body.style.overflow = "hidden";
  $("#mClose").focus();
}

/* ---------- Закрытие окна ---------- */

function closeModal() {
  $("#modal").hidden = true;

  // Удаление iframe останавливает воспроизведение
  $("#mPlayer").innerHTML = "";
  $("#mPlayer").style.backgroundImage = "";

  document.body.style.overflow = "";
}

/* ---------- Избранное ---------- */

function updateFavButton() {
  if (!current) return;

  $("#mFav").textContent = favs.has(current.id)
    ? "Убрать из избранного"
    : "В избранное";
}

function toggleFav() {
  if (!current) return;

  if (favs.has(current.id)) {
    favs.delete(current.id);
  } else {
    favs.add(current.id);
  }

  try {
    localStorage.setItem("favs", JSON.stringify([...favs]));
  } catch (error) {
    console.warn("Не удалось сохранить избранное.", error);
  }

  updateFavButton();
  render();
}

/* ---------- События карточек и баннера ---------- */

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".card");

  if (card) {
    openMovie(Number(card.dataset.id));
  }
});

hero.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open]");

  if (button) {
    openMovie(Number(button.dataset.open));
  }
});

/* ---------- Переключение вкладок ---------- */

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => {
      item.classList.remove("is-active");
    });

    button.classList.add("is-active");
    tab = button.dataset.tab;

    render();
  });
});

/* ---------- Поиск, жанры и сортировка ---------- */

["#search", "#genre", "#sort"].forEach((selector) => {
  const element = $(selector);

  if (element) {
    element.addEventListener("input", render);
    element.addEventListener("change", render);
  }
});

/* ---------- Кнопки окна фильма ---------- */

$("#mClose").addEventListener("click", closeModal);
$("#mFav").addEventListener("click", toggleFav);

$("#modal").addEventListener("click", (event) => {
  if (event.target.id === "modal") {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !$("#modal").hidden) {
    closeModal();
  }
});

/* ---------- Запуск сайта ---------- */

(async function init() {
  await Promise.all(
    MOVIES.map(async (movie) => {
      movie.img = await findImage(movie.file);
    })
  );

  fillGenres();
  render();
})();
