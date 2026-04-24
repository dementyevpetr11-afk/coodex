const STORAGE_KEY = 'easyoge-pwa-mvp-v1';

const TASKS = [
  {id: 1, number: 1, topic: 'человек и общество', type: 'extended', question: 'Назовите два признака деятельности человека и приведите по одному примеру.', algorithm: ['Определи, что такое деятельность.', 'Выбери два признака: осознанность, целеполагание, преобразование мира.', 'К каждому признаку приведи короткий пример из жизни.', 'Пиши кратко и по делу.'], answer: 'развернутый ответ'},
  {id: 2, number: 2, topic: 'экономика', type: 'test', question: 'Что из перечисленного относится к факторам производства?', algorithm: ['Прочитай все варианты.', 'Ищи то, что используется для создания товаров и услуг.', 'Вспомни 4 классических фактора: труд, земля, капитал, предпринимательство.', 'Сравни варианты и выбери подходящий.'], answer: 'капитал'},
  {id: 3, number: 3, topic: 'экономика', type: 'test', question: 'Что происходит с ценой товара при росте спроса при прочих равных?', algorithm: ['Определи, что изменилось: спрос вырос.', 'Если товара столько же, а желающих больше — цена обычно растёт.', 'Проверь, нет ли в вопросе подвоха про "прочие равные".', 'Выбери вариант про повышение цены.'], answer: 'повышается'},
  {id: 4, number: 4, topic: 'политика', type: 'test', question: 'Что является признаком государства?', algorithm: ['Вспомни основные признаки государства.', 'Ищи: территория, публичная власть, налоги, суверенитет.', 'Отделяй государство от партии, семьи и фирмы.', 'Выбери уникальный признак государства.'], answer: 'суверенитет'},
  {id: 5, number: 5, topic: 'право', type: 'extended', question: 'Приведите два примера прав и обязанностей гражданина.', algorithm: ['Раздели ответ на права и обязанности.', 'Возьми по одному понятному примеру в каждом блоке.', 'Старайся не повторять одно и то же разными словами.', 'Пиши простыми формулировками.'], answer: 'развернутый ответ'},
  {id: 6, number: 6, topic: 'социальная сфера', type: 'extended', question: 'Назовите две социальные роли подростка и кратко поясните их.', algorithm: ['Вспомни, где подросток действует в обществе.', 'Подумай про роли ученика, сына/дочери, друга, спортсмена.', 'Назови две роли.', 'К каждой добавь одно короткое пояснение.'], answer: 'развернутый ответ'},
  {id: 7, number: 7, topic: 'социальная сфера', type: 'test', question: 'Что относится к малой социальной группе?', algorithm: ['Вспомни признак малой группы — личное общение.', 'Отсекай слишком большие объединения.', 'Подумай, где все участники знают друг друга.', 'Выбери семью, класс или компанию друзей.'], answer: 'семья'},
  {id: 8, number: 8, topic: 'право', type: 'test', question: 'С какого возраста по общему правилу наступает уголовная ответственность в РФ?', algorithm: ['Вспомни базовое правило.', 'Не путай с трудовым или административным правом.', 'Общее правило — 16 лет.', 'Проверь, не спрашивают ли про отдельные тяжкие преступления.'], answer: '16'},
  {id: 9, number: 9, topic: 'политика', type: 'test', question: 'Что относится к функциям политической партии?', algorithm: ['Подумай, что делает партия в политике.', 'Она выражает интересы, участвует в выборах, формирует власть.', 'Не путай с функциями суда или полиции.', 'Выбери вариант про участие в политической жизни.'], answer: 'участие в выборах'},
  {id: 10, number: 10, topic: 'экономика', type: 'test', question: 'Какой показатель отражает общий рост цен в стране?', algorithm: ['Ищи термин из макроэкономики.', 'Не путай доход семьи и курс валют.', 'Общий рост цен — это инфляция.', 'Выбери соответствующий вариант.'], answer: 'инфляция'},
  {id: 11, number: 11, topic: 'человек и общество', type: 'test', question: 'Что отличает человека от животного?', algorithm: ['Вспомни признаки: сознание, речь, труд, творчество.', 'Проверь, нет ли биологических признаков среди вариантов.', 'Найди то, что связано с осмысленной деятельностью.', 'Выбери подходящий вариант.'], answer: 'способность к сознательной деятельности'},
  {id: 12, number: 12, topic: 'право', type: 'extended', question: 'Объясните, почему важно соблюдать законы.', algorithm: ['Сначала назови, зачем нужны законы обществу.', 'Потом покажи, что происходит, если их нарушать.', 'Добавь мысль про порядок, безопасность и защиту прав.', 'Пиши коротко, но логично.'], answer: 'развернутый ответ'},
  {id: 13, number: 13, topic: 'политика', type: 'test', question: 'Кто является носителем суверенитета и единственным источником власти в РФ?', algorithm: ['Вопрос из Конституции.', 'Ищи не орган власти, а того, от кого власть исходит.', 'Правильный ответ связан с народом.', 'Выбери вариант без лишней детализации.'], answer: 'народ'},
  {id: 14, number: 14, topic: 'право', type: 'test', question: 'Что относится к обязанностям гражданина РФ?', algorithm: ['Раздели права и обязанности.', 'Посмотри, где есть слово "обязан".', 'Один из базовых примеров — платить налоги.', 'Выбери реальную обязанность.'], answer: 'платить законно установленные налоги'},
  {id: 15, number: 15, topic: 'экономика', type: 'test', question: 'Что такое бюджет семьи?', algorithm: ['Определи, о чём вопрос: деньги семьи.', 'Бюджет = доходы и расходы за период.', 'Ищи вариант, где есть обе части.', 'Не путай с зарплатой одного человека.'], answer: 'план доходов и расходов семьи'},
  {id: 16, number: 16, topic: 'социальная сфера', type: 'test', question: 'Что такое социальная мобильность?', algorithm: ['Посмотри на слово "мобильность" — это движение.', 'В обществе это изменение положения человека или группы.', 'Не путай с переездом как физическим действием.', 'Выбери вариант про смену социального статуса.'], answer: 'изменение социального положения'},
  {id: 17, number: 17, topic: 'человек и общество', type: 'test', question: 'Что такое мораль?', algorithm: ['Вспомни, что регулирует поведение с точки зрения добра и зла.', 'Не путай с законом: мораль не устанавливается государством.', 'Ищи нормы, основанные на представлениях общества.', 'Выбери соответствующее определение.'], answer: 'нормы о добре и зле'},
  {id: 18, number: 18, topic: 'политика', type: 'test', question: 'Что является признаком демократии?', algorithm: ['Подумай, как народ влияет на власть.', 'Ищи выборы, права и свободы, политический плюрализм.', 'Отсекай признаки авторитаризма.', 'Выбери вариант про свободные выборы.'], answer: 'свободные выборы'},
  {id: 19, number: 19, topic: 'право', type: 'test', question: 'Как называется способность своими действиями приобретать права и обязанности?', algorithm: ['Не путай правоспособность и дееспособность.', 'Если речь про "своими действиями" — это дееспособность.', 'Запомни: право иметь — правоспособность, право действовать — дееспособность.', 'Выбери правильный термин.'], answer: 'дееспособность'},
  {id: 20, number: 20, topic: 'экономика', type: 'test', question: 'Что такое конкуренция?', algorithm: ['Вспомни рынок и борьбу продавцов.', 'Конкуренция — соперничество за покупателя.', 'Ищи вариант про борьбу производителей или продавцов.', 'Выбери наиболее точный ответ.'], answer: 'соперничество производителей за покупателя'},
  {id: 21, number: 21, topic: 'человек и общество', type: 'extended', question: 'Составьте план ответа по теме "Общество как форма жизнедеятельности людей".', algorithm: ['Сначала напиши название темы.', 'Выдели 3–4 крупных пункта.', 'Добавь подпункты, если требуется.', 'Строй план логично: определение → признаки → сферы → значение.'], answer: 'развернутый ответ'},
  {id: 22, number: 22, topic: 'социальная сфера', type: 'extended', question: 'Используя обществоведческие знания, объясните влияние семьи на социализацию подростка.', algorithm: ['Определи, что такое социализация.', 'Покажи роль семьи как первой среды общения.', 'Добавь примеры передачи норм, ценностей и поведения.', 'Свяжи это именно с подростком.'], answer: 'развернутый ответ'},
  {id: 23, number: 23, topic: 'политика', type: 'extended', question: 'Приведите два аргумента в пользу участия граждан в выборах.', algorithm: ['Сформулируй тезис: участие важно.', 'Дай 2 разных аргумента: влияние на власть и защита интересов.', 'Не повторяй одну мысль разными словами.', 'Пиши коротко и ясно.'], answer: 'развернутый ответ'},
  {id: 24, number: 24, topic: 'право', type: 'extended', question: 'Приведите два примера ситуаций, регулируемых нормами гражданского права.', algorithm: ['Вспомни, что гражданское право связано с имуществом, сделками, договорами.', 'Возьми 2 жизненных примера: покупка, аренда, договор, наследство.', 'Покажи, что это отношения между равными участниками.', 'Пиши конкретно.'], answer: 'развернутый ответ'}
];

const TOPICS = ['экономика', 'политика', 'право', 'социальная сфера', 'человек и общество'];
const EXTENDED_NUMBERS = [1,5,6,12,21,22,23,24];
const DEFAULT_TARIFFS = {
  free: {name: 'Бесплатный', tasksPerDay: 3, aiPerDay: 3, trial: false, parent: false},
  base: {name: 'Базовый', tasksPerDay: 12, aiPerDay: 15, trial: true, parent: false},
  pro: {name: 'PRO', tasksPerDay: Infinity, aiPerDay: Infinity, trial: true, parent: true}
};

const API_BASE = 'http://127.0.0.1:8001';
const TOKEN_KEY = 'easyoge_api_token';
let accessToken = localStorage.getItem(TOKEN_KEY) || null;

function apiState() {
  if (!state.api) {
    state.api = {
      session: null,
      currentTask: null,
      progressSummary: null,
      topicProgress: [],
      last7: [],
      currentPlan: null,
      parentDashboard: null,
      parentStudentId: null,
      aiLimits: null,
      mentorChat: [],
      algorithmBundles: {},
      latestShortCard: null
    };
  }
  return state.api;
}

async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const response = await fetch(`${API_BASE}${path}`, {...options, headers});
  if (response.status === 401) {
    logoutApi();
    throw new Error('Сессия истекла. Войди снова.');
  }
  if (!response.ok) {
    let detail = 'Ошибка сервера';
    try {
      const data = await response.json();
      detail = data.detail || JSON.stringify(data);
    } catch {
      detail = await response.text();
    }
    throw new Error(detail);
  }
  if (response.status === 204) return null;
  return response.json();
}

async function loginApi(email, password) {
  const form = new URLSearchParams();
  form.append('username', email);
  form.append('password', password);
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: form.toString()
  });
  if (!response.ok) {
    let detail = 'Не удалось войти';
    try {
      const data = await response.json();
      detail = data.detail || JSON.stringify(data);
    } catch {
      detail = await response.text();
    }
    throw new Error(detail);
  }
  const data = await response.json();
  accessToken = data.access_token;
  localStorage.setItem(TOKEN_KEY, accessToken);
  return data;
}

function logoutApi() {
  accessToken = null;
  localStorage.removeItem(TOKEN_KEY);
  const api = apiState();
  api.session = null;
  api.currentTask = null;
}

async function fetchSession() {
  const data = await apiFetch('/auth/me');
  apiState().session = data;
  return data;
}

async function fetchProgressSummary() {
  const [summary, topicProgress, last7] = await Promise.all([
    apiFetch('/progress/summary'),
    apiFetch('/progress/topic-progress'),
    apiFetch('/progress/last7')
  ]);
  const api = apiState();
  api.progressSummary = summary;
  api.topicProgress = topicProgress;
  api.last7 = last7;
  return {summary, topicProgress, last7};
}

async function fetchCurrentPlan() {
  try {
    const plan = await apiFetch('/plans/current');
    apiState().currentPlan = plan;
    return plan;
  } catch (error) {
    if (String(error.message).includes('План не найден')) {
      apiState().currentPlan = null;
      return null;
    }
    throw error;
  }
}

async function fetchParentDashboard(studentId = null) {
  const path = studentId ? `/parent/dashboard?student_id=${studentId}` : '/parent/dashboard';
  const dashboard = await apiFetch(path);
  const api = apiState();
  api.parentDashboard = dashboard;
  api.parentStudentId = studentId;
  return dashboard;
}

async function fetchAiLimits() {
  const limits = await apiFetch('/ai/limits');
  apiState().aiLimits = limits;
  return limits;
}

async function sendAiMessage(message) {
  const payload = await apiFetch('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({message})
  });
  apiState().aiLimits = {remaining_today: payload.remaining_today};
  return payload;
}

async function fetchRandomTask(number = null) {
  const query = number ? `?number=${number}` : '';
  const task = await apiFetch(`/tasks/random${query}`);
  apiState().currentTask = task;
  return task;
}

async function submitTaskAnswer(taskId, payload) {
  return apiFetch(`/tasks/${taskId}/answer`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

async function fetchAlgorithmTemplate(taskNumber) {
  return await apiFetch(`/algorithm-templates/${taskNumber}`);
}

async function getAlgorithmBundle(taskNumber) {
  try {
    return await apiFetch(`/algorithm-bundles/${taskNumber}`);
  } catch (e) {
    return await apiFetch(`/algorithm-templates/${taskNumber}`);
  }
}

async function fetchShortCard(taskNumber) {
  try {
    return await apiFetch(`/mobile-short-cards/${taskNumber}`);
  } catch (e) {
    return null;
  }
}

function renderAlgorithmTemplateCard(template) {
  if (!template) return '<div class="card"><h3>Алгоритм недоступен</h3></div>';

  const routeItems = Array.isArray(template.answer_route) ? template.answer_route : [];
  const antiMistakeItems = Array.isArray(template.anti_mistake?.items)
    ? template.anti_mistake.items
    : Array.isArray(template.anti_mistake)
      ? template.anti_mistake
      : [];
  const antiMistakeLead = typeof template.anti_mistake?.lead === 'string' ? template.anti_mistake.lead : '';
  const answerTemplateItems = Array.isArray(template.answer_template) ? template.answer_template : [];
  const workedExample = template.worked_example || {};
  const exampleParts = [
    ...(Array.isArray(workedExample.example) ? workedExample.example : []),
    ...(Array.isArray(workedExample.thinking) ? workedExample.thinking : []),
    ...(Array.isArray(workedExample.notice) ? workedExample.notice : []),
    ...(Array.isArray(workedExample.assembly) ? workedExample.assembly : []),
    ...(Array.isArray(workedExample.why_counted) ? workedExample.why_counted : [])
  ];

  return `
    <section class="algo-template-page">
      <div class="hero-inline">
        <div class="hero-copy">
          <div class="eyebrow">Алгоритм Easy OGE</div>
          <h2>Задание ${template.task_number}</h2>
          <p>${template.what_is_it || ''}</p>
        </div>
      </div>

      <div class="algo-grid">
        <article class="algo-card spotlight-card">
          <h3>Узнай тип за 3 секунды</h3>
          <p>${template.recognize_fast || ''}</p>
        </article>

        <article class="algo-card">
          <h3>Первый ход</h3>
          <p>${template.first_move || ''}</p>
        </article>

        <article class="algo-card algo-wide">
          <h3>Маршрут ответа</h3>
          <ol class="algo-list">
            ${routeItems.map(item => `<li>${item}</li>`).join('')}
          </ol>
        </article>

        <article class="algo-card">
          <h3>Антиошибка</h3>
          ${antiMistakeLead ? `<p style="margin-bottom:10px;">${antiMistakeLead}</p>` : ''}
          <ul class="algo-list compact">
            ${antiMistakeItems.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </article>

        <article class="algo-card">
          <h3>Шаблон ответа</h3>
          <ul class="algo-list compact">
            ${answerTemplateItems.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </article>

        <article class="algo-card accent-card">
          <h3>Запоминалка</h3>
          <p class="anchor-text">${template.memory_anchor || ''}</p>
        </article>

        <article class="algo-card algo-wide">
          <h3>Решалка на примере</h3>
          <div class="example-copy">
            ${exampleParts.map(item => `<p>${item}</p>`).join('')}
          </div>
        </article>
      </div>
    </section>
  `;
}

async function openAlgorithmTemplate(taskNumber) {
  try {
    const data = await getAlgorithmBundle(taskNumber);
    const template = data.authoring ?? data;

    const container = document.getElementById('algorithm-template-view');
    if (!container) return;

    container.innerHTML = renderAlgorithmTemplateCard(template);
    showScreen('algorithm-template-screen');
  } catch (error) {
    console.error(error);
    const container = document.getElementById('algorithm-template-view');
    if (container) {
      container.innerHTML = `
        <div class="algo-card">
          <h3>Не удалось загрузить алгоритм</h3>
          <p>Попробуй ещё раз. Если ошибка повторяется, проверь backend.</p>
        </div>
      `;
      showScreen('algorithm-template-screen');
    }
  }
}

function screen(id, html) {
  return `<section id="${id}" class="screen">${html}</section>`;
}

function tag(label, cls='tag') {
  return `<span class="${cls}">${label}</span>`;
}

function escapeHtml(value='') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function tariffName(code) {
  const map = {free: 'Бесплатный', basic: 'Базовый', pro: 'PRO'};
  return map[code] || code;
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.style.display = screen.id === screenId ? 'block' : 'none';
  });
  state.currentScreen = screenId;
}

const state = {
  route: location.hash.replace('#', '') || 'landing',
  currentScreen: 'landing-screen',
  role: null,
  userName: '',
  stats: {
    solvedToday: 0,
    accuracy: 78,
    streak: 4,
    weakTopics: ['экономика', 'право'],
    solvedHistory: []
  },
  tariff: 'free',
  parentalLinkCode: 'OGE-2048',
  linkedStudentName: 'Пётр',
  filters: {
    topic: 'all',
    type: 'all'
  },
  parentDashboard: {
    weeklyTasks: 18,
    weeklyGoal: 25,
    weakTopics: [
      {name: 'Экономика', progress: 42},
      {name: 'Право', progress: 58},
      {name: 'Политика', progress: 71}
    ],
    notices: [
      '3 дня подряд открыт AI-наставник',
      'Вчера закрыт блок «Экономика: спрос и предложение»'
    ]
  },
  currentTaskId: null,
  taskInput: '',
  openAnswerStatus: null,
  api: null
};

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    Object.assign(state, parsed);
    if (parsed.filters) state.filters = parsed.filters;
    if (parsed.stats) state.stats = parsed.stats;
    if (parsed.parentDashboard) state.parentDashboard = parsed.parentDashboard;
    if (parsed.api) state.api = parsed.api;
  } catch (e) {
    console.warn('state reset', e);
  }
}

function pageShell(content, options = {}) {
  const topbar = options.topbar ?? '';
  const bottom = options.bottom ?? '';
  return `
    <div class="page-shell">
      ${topbar}
      <main class="page-main">${content}</main>
      ${bottom}
    </div>
  `;
}

function gradientHero({eyebrow, title, subtitle, action, secondaryAction, statsLine}) {
  return `
    <section class="hero hero--premium">
      <div class="hero__content">
        <div class="hero__eyebrow">${eyebrow}</div>
        <h1 class="hero__title">${title}</h1>
        <p class="hero__subtitle">${subtitle}</p>
        <div class="hero__actions">
          ${action || ''}
          ${secondaryAction || ''}
        </div>
        ${statsLine ? `<div class="hero__statsline">${statsLine}</div>` : ''}
      </div>
      <div class="hero__visual">
        <div class="orb orb--main"></div>
        <div class="orb orb--small"></div>
        <div class="hero__ring"></div>
        <div class="hero__grid"></div>
      </div>
    </section>
  `;
}

function landingScreen() {
  return screen('landing-screen', pageShell(`
    <section class="brand-hero brand-hero--new">
      <div class="brand-hero__backdrop"></div>
      <div class="brand-hero__overlay"></div>
      <div class="brand-hero__content">
        <div class="brand-badge">PWA · AI · ОГЭ 2026</div>
        <div class="brand-logo-wrap">
          <img src="logo.png" alt="Easy OGE" class="brand-logo brand-logo--giant" />
        </div>
        <h1 class="brand-title">Готовься к ОГЭ по обществознанию умно, быстро и без хаоса</h1>
        <p class="brand-subtitle">Easy OGE — это маршруты решения, AI-наставник, прогресс и задания 1–24 в одном приложении.</p>
        <div class="cta-row">
          <button class="btn btn--primary btn--xl" data-route="student-auth">Я ученик</button>
          <button class="btn btn--secondary btn--xl" data-route="parent-auth">Я родитель</button>
          <button class="btn btn--ghost btn--xl" data-route="about">Что внутри</button>
        </div>
        <div class="hero-proof">
          <span>Алгоритмы по 24 заданиям</span>
          <span>AI-наставник</span>
          <span>PWA на телефон и ноутбук</span>
        </div>
      </div>
    </section>

    <section class="landing-grid">
      <article class="feature-card">
        <div class="feature-card__number">01</div>
        <h3>Маршруты решения</h3>
        <p>Не теория ради теории, а первый ход, короткий маршрут и антиошибка для каждого типа задания.</p>
      </article>
      <article class="feature-card">
        <div class="feature-card__number">02</div>
        <h3>AI-наставник</h3>
        <p>Подсказывает, как подступиться к вопросу, и не уводит в длинные скучные лекции.</p>
      </article>
      <article class="feature-card">
        <div class="feature-card__number">03</div>
        <h3>Прогресс и контроль</h3>
        <p>Видно, сколько решено, где просадки и что делать дальше, а родитель может смотреть динамику.</p>
      </article>
    </section>
  `));
}

function authScreen(role) {
  const isStudent = role === 'student';
  const demoEmail = isStudent ? 'student@easyoge.demo' : 'parent@easyoge.demo';
  const demoPassword = 'easyoge123';
  return screen(`${role}-auth-screen`, pageShell(`
    <section class="auth-layout auth-layout--premium">
      <div class="auth-brandcard">
        <div class="brand-badge">Easy OGE</div>
        <div class="brand-logo-wrap brand-logo-wrap--auth">
          <img src="logo.png" alt="Easy OGE" class="brand-logo brand-logo--auth" />
        </div>
        <h2>${isStudent ? 'Вход для ученика' : 'Вход для родителя'}</h2>
        <p>${isStudent ? 'Тренируй задания, общайся с наставником и следи за прогрессом.' : 'Смотри прогресс ребёнка и слабые темы в одном месте.'}</p>
        <div class="demo-box">
          <div><strong>Demo:</strong> ${demoEmail}</div>
          <div><strong>Пароль:</strong> ${demoPassword}</div>
        </div>
      </div>
      <form class="auth-card" data-auth-form="${role}">
        <h3>${isStudent ? 'Войти в кабинет ученика' : 'Войти в кабинет родителя'}</h3>
        <label class="field">
          <span>Email</span>
          <input type="email" name="email" value="${demoEmail}" required />
        </label>
        <label class="field">
          <span>Пароль</span>
          <input type="password" name="password" value="${demoPassword}" required />
        </label>
        <button class="btn btn--primary btn--full" type="submit">Войти</button>
        <button class="btn btn--ghost btn--full" type="button" data-route="landing">Назад</button>
        <p class="helper-text">Пока используем demo-входы, чтобы проверить интерфейс и backend.</p>
      </form>
    </section>
  `));
}

function dashboardTopbar(title, extra='') {
  return `
    <header class="topbar topbar--glass">
      <div class="topbar__brand">
        <img src="logo.png" alt="Easy OGE" class="topbar__logo" />
        <div>
          <div class="topbar__kicker">Easy OGE</div>
          <div class="topbar__title">${title}</div>
        </div>
      </div>
      <div class="topbar__actions">
        ${extra}
        <button class="btn btn--ghost" data-action="logout">Выйти</button>
      </div>
    </header>
  `;
}

function bottomNav(role, active) {
  const base = role === 'parent'
    ? [
        {key: 'parent-home', label: 'Обзор', icon: '◉'},
        {key: 'parent-progress', label: 'Прогресс', icon: '▤'},
        {key: 'parent-more', label: 'Ещё', icon: '⋯'}
      ]
    : [
        {key: 'student-home', label: 'Главная', icon: '◉'},
        {key: 'student-task', label: 'Задание', icon: '✎'},
        {key: 'student-mentor', label: 'Наставник', icon: '✦'},
        {key: 'student-progress', label: 'Прогресс', icon: '▤'},
        {key: 'student-more', label: 'Ещё', icon: '⋯'}
      ];

  return `
    <nav class="bottom-nav">
      ${base.map(item => `
        <button class="bottom-nav__item ${active === item.key ? 'is-active' : ''}" data-route="${item.key}">
          <span class="bottom-nav__icon">${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

function studentHomeScreen() {
  const api = apiState();
  const limits = api.aiLimits;
  const plan = api.currentPlan;
  const summary = api.progressSummary;
  const solved = summary?.total_solved ?? state.stats.solvedToday;
  const correct = summary?.correct_answers ?? Math.round((state.stats.accuracy / 100) * Math.max(1, solved));
  const accuracy = summary?.accuracy_percent ?? state.stats.accuracy;

  return screen('student-home-screen', pageShell(`
    ${dashboardTopbar('Кабинет ученика', `<button class="btn btn--ghost" data-route="student-task">Открыть задание</button>`)}
    ${gradientHero({
      eyebrow: 'Подготовка без хаоса',
      title: `Привет, ${api.session?.full_name || state.userName || 'ученик'}!`,
      subtitle: 'Твой короткий маршрут: открой задание, посмотри алгоритм и добей слабую тему через наставника.',
      action: '<button class="btn btn--primary btn--xl" data-route="student-task">Решать сейчас</button>',
      secondaryAction: '<button class="btn btn--secondary btn--xl" data-route="student-mentor">Спросить наставника</button>',
      statsLine: `${solved} решено · ${accuracy}% точность · ${limits ? `${limits.remaining_today} AI-вопросов сегодня` : `${state.stats.streak} дня подряд`}`
    })}

    <section class="stats-row">
      <article class="stat-card stat-card--accent">
        <div class="stat-card__label">Решено</div>
        <div class="stat-card__value">${solved}</div>
        <p>Всего заданий, которые ты уже отправил на проверку или закрыл.</p>
      </article>
      <article class="stat-card">
        <div class="stat-card__label">Точность</div>
        <div class="stat-card__value">${accuracy}%</div>
        <p>Правильных ответов: ${correct}. Смотри прогресс и подчищай слабые темы.</p>
      </article>
      <article class="stat-card">
        <div class="stat-card__label">AI-наставник</div>
        <div class="stat-card__value">${limits ? limits.remaining_today : state.stats.streak}</div>
        <p>${limits ? 'Осталось сообщений сегодня.' : 'Сейчас считаем streak локально.'}</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel panel--highlight">
        <div class="panel__head">
          <div>
            <div class="panel__eyebrow">Сегодняшний фокус</div>
            <h3>${plan ? plan.focus_topic || 'План уже рассчитан' : 'Сначала открой задание или наставника'}</h3>
          </div>
          ${plan ? tag(`до ${plan.exam_date || 'экзамена'}`) : ''}
        </div>
        <p>${plan ? `Тип плана: ${plan.plan_type}. Слабые темы: ${(plan.weak_topics || []).join(', ') || 'пока не определены'}.` : 'После нескольких решённых заданий здесь появится нормальный фокус на день.'}</p>
        <div class="panel__actions">
          <button class="btn btn--primary" data-route="student-task">Открыть задание</button>
          <button class="btn btn--ghost" data-route="student-progress">Мой прогресс</button>
        </div>
      </article>

      <article class="panel action-card-algo" data-open-algorithm="12">
        <div class="action-card-kicker">Easy OGE</div>
        <h3>Алгоритмы по номерам</h3>
        <p>Открой фирменный маршрут ответа, антиошибку и решалку на примере.</p>
        <button class="btn btn--primary" data-open-algorithm="12">Открыть пример алгоритма</button>
      </article>

      <article class="panel">
        <div class="panel__head">
          <div>
            <div class="panel__eyebrow">AI-наставник</div>
            <h3>Спроси коротко и по делу</h3>
          </div>
          ${limits ? tag(`${limits.remaining_today} осталось`) : ''}
        </div>
        <p>Наставник уже подключён к backend и умеет искать алгоритмы по базе. Проверь на номерах 12, 21, 22 или спроси про термин.</p>
        <button class="btn btn--secondary" data-route="student-mentor">Открыть наставника</button>
      </article>
    </section>
  `, {bottom: bottomNav('student', 'student-home')}));
}

function topicPill(topic) {
  return `<button class="chip ${state.filters.topic === topic ? 'is-active' : ''}" data-filter-topic="${topic}">${topic === 'all' ? 'Все темы' : topic}</button>`;
}

function currentTaskData() {
  const apiTask = apiState().currentTask;
  if (apiTask) return {
    id: apiTask.id,
    number: apiTask.task_number,
    topic: apiTask.topic,
    type: apiTask.answer_type === 'manual_ai_assist' ? 'extended' : 'test',
    question: apiTask.question_text,
    algorithm: apiTask.algorithm_text ? apiTask.algorithm_text.split('\n').filter(Boolean) : [],
    answer: apiTask.correct_answer ?? 'развернутый ответ',
    maxScore: apiTask.max_score ?? 1
  };
  return TASKS.find(t => t.id === state.currentTaskId) || TASKS[0];
}

function renderShortCard(card) {
  if (!card) return '';
  return `
    <div class="short-card short-card--easyoge">
      <div class="short-card__eyebrow">Easy OGE</div>
      <h3>${card.headline || `Задание ${card.task_number}`}</h3>
      <p><strong>Первый ход:</strong> ${card.ui_short_hint || ''}</p>
      <ol class="algo-list compact">
        ${(card.route_3 || []).map(item => `<li>${item}</li>`).join('')}
      </ol>
      <p><strong>Антиошибка:</strong> ${card.anti_pattern_short || ''}</p>
      <p><strong>Запоминалка:</strong> ${card.memory_anchor || ''}</p>
      <div class="panel__actions">
        <button class="btn btn--ghost" data-open-algorithm="${card.task_number}">Полный алгоритм</button>
      </div>
    </div>
  `;
}

function studentTaskScreen() {
  const task = currentTaskData();
  const api = apiState();
  const card = api.latestShortCard;
  return screen('student-task-screen', pageShell(`
    ${dashboardTopbar('Задание', `<button class="btn btn--ghost" data-action="refresh-task">Случайное</button>`)}
    <section class="task-layout">
      <aside class="task-sidebar">
        <div class="panel filter-panel">
          <div class="panel__eyebrow">Фильтр по теме</div>
          <div class="chips-row">
            ${topicPill('all')}
            ${TOPICS.map(topicPill).join('')}
          </div>
        </div>
        <div class="panel">
          <div class="panel__eyebrow">Номер задания</div>
          <div class="number-grid">
            ${Array.from({length: 24}, (_, idx) => idx + 1).map(n => `
              <button class="number-tile ${task.number === n ? 'is-active' : ''}" data-task-number="${n}">${n}</button>
            `).join('')}
          </div>
        </div>
      </aside>
      <section class="task-main">
        <article class="panel task-card task-card--premium">
          <div class="task-card__meta">
            ${tag(`№ ${task.number}`)}
            ${tag(task.topic, 'tag tag--dark')}
            ${tag(task.type === 'extended' ? 'Развёрнутый ответ' : 'Тест', 'tag tag--soft')}
          </div>
          <h2>${task.question}</h2>
          <div class="task-card__actions">
            <button class="btn btn--ghost" data-open-algorithm="${task.number}">Полный алгоритм</button>
          </div>
        </article>

        ${renderShortCard(card)}

        <article class="panel answer-card">
          <div class="panel__head">
            <div>
              <div class="panel__eyebrow">Ответ</div>
              <h3>${task.type === 'extended' ? 'Напиши развёрнутый ответ' : 'Выбери или введи ответ'}</h3>
            </div>
          </div>
          ${task.type === 'extended' ? `
            <textarea class="answer-textarea" data-task-input rows="8" placeholder="Напиши свой ответ по шагам...">${escapeHtml(state.taskInput || '')}</textarea>
            <div class="panel__actions">
              <button class="btn btn--primary" data-action="submit-open-answer">Отправить на проверку</button>
              <button class="btn btn--ghost" data-route="student-mentor">Спросить наставника</button>
            </div>
            ${state.openAnswerStatus ? `<div class="result-card result-card--status">${state.openAnswerStatus}</div>` : ''}
          ` : `
            <label class="field">
              <span>Ответ</span>
              <input type="text" data-task-input value="${escapeHtml(state.taskInput || '')}" placeholder="Введи ответ" />
            </label>
            <div class="panel__actions">
              <button class="btn btn--primary" data-action="submit-task-answer">Проверить</button>
              <button class="btn btn--ghost" data-route="student-mentor">Спросить наставника</button>
            </div>
          `}
        </article>
      </section>
    </section>
  `, {bottom: bottomNav('student', 'student-task')}));
}

function mentorBubble(role, text) {
  return `
    <div class="mentor-bubble ${role === 'user' ? 'mentor-bubble--user' : 'mentor-bubble--assistant'}">
      <div class="mentor-bubble__role">${role === 'user' ? 'Ты' : 'AI'}</div>
      <div class="mentor-bubble__text">${escapeHtml(text)}</div>
    </div>
  `;
}

function studentMentorScreen() {
  const api = apiState();
  const chat = api.mentorChat.length ? api.mentorChat : [
    {role: 'assistant', message: 'Привет. Я AI-наставник Easy OGE. Напиши номер задания или задай вопрос по теме — объясню коротко и по делу.'}
  ];

  return screen('student-mentor-screen', pageShell(`
    ${dashboardTopbar('AI-наставник', `<button class="btn btn--ghost" data-action="refresh-limits">Обновить лимит</button>`)}
    <section class="mentor-layout">
      <article class="panel mentor-panel">
        <div class="panel__head">
          <div>
            <div class="panel__eyebrow">Чат Easy OGE</div>
            <h3>Спроси про номер, термин или ошибку</h3>
          </div>
          ${api.aiLimits ? tag(`${api.aiLimits.remaining_today} осталось`) : ''}
        </div>
        <div class="mentor-chat">
          ${chat.map(item => mentorBubble(item.role, item.message)).join('')}
        </div>
        <div class="mentor-prompt-row">
          <button class="chip" data-mentor-prompt="Как решать 12?">Как решать 12?</button>
          <button class="chip" data-mentor-prompt="Что такое социальная мобильность?">Что такое мобильность?</button>
          <button class="chip" data-mentor-prompt="Проверь мой план для 21">План для 21</button>
        </div>
        <div class="mentor-input-row">
          <textarea class="answer-textarea" data-mentor-input rows="4" placeholder="Напиши вопрос..."></textarea>
          <div class="panel__actions">
            <button class="btn btn--primary" data-action="send-mentor-message">Отправить</button>
          </div>
        </div>
      </article>
    </section>
  `, {bottom: bottomNav('student', 'student-mentor')}));
}

function topicProgressBars(items) {
  if (!items || !items.length) return '<p class="muted">Прогресс по темам появится после первых решённых заданий.</p>';
  return items.map(item => `
    <div class="progress-item">
      <div class="progress-item__head">
        <span>${item.topic || item.name}</span>
        <span>${item.accuracy_percent ?? item.progress}%</span>
      </div>
      <div class="progress-bar"><span style="width:${item.accuracy_percent ?? item.progress}%"></span></div>
    </div>
  `).join('');
}

function studentProgressScreen() {
  const api = apiState();
  const summary = api.progressSummary;
  return screen('student-progress-screen', pageShell(`
    ${dashboardTopbar('Мой прогресс')}
    <section class="stats-row">
      <article class="stat-card stat-card--accent">
        <div class="stat-card__label">Решено всего</div>
        <div class="stat-card__value">${summary?.total_solved ?? 0}</div>
        <p>Все задания, которые ушли на проверку или уже закрыты.</p>
      </article>
      <article class="stat-card">
        <div class="stat-card__label">Правильных</div>
        <div class="stat-card__value">${summary?.correct_answers ?? 0}</div>
        <p>Количество ответов, где результат уже хороший.</p>
      </article>
      <article class="stat-card">
        <div class="stat-card__label">Точность</div>
        <div class="stat-card__value">${summary?.accuracy_percent ?? 0}%</div>
        <p>Это главный сигнал, насколько ты уверенно держишь тему.</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <div class="panel__head">
          <div>
            <div class="panel__eyebrow">Слабые и сильные темы</div>
            <h3>Где добивать в первую очередь</h3>
          </div>
        </div>
        ${topicProgressBars(api.topicProgress)}
      </article>
      <article class="panel">
        <div class="panel__head">
          <div>
            <div class="panel__eyebrow">Последние 7 дней</div>
            <h3>Ритм подготовки</h3>
          </div>
        </div>
        <div class="mini-chart">
          ${(api.last7 || []).map(item => `
            <div class="mini-chart__bar-wrap">
              <div class="mini-chart__bar" style="height:${Math.max(12, (item.solved_count || 0) * 14)}px"></div>
              <span>${(item.day_label || '').slice(0, 3)}</span>
            </div>
          `).join('')}
        </div>
      </article>
    </section>
  `, {bottom: bottomNav('student', 'student-progress')}));
}

function studentMoreScreen() {
  const session = apiState().session;
  return screen('student-more-screen', pageShell(`
    ${dashboardTopbar('Ещё')}
    <section class="content-grid">
      <article class="panel">
        <div class="panel__eyebrow">Аккаунт</div>
        <h3>${session?.full_name || state.userName || 'Ученик'}</h3>
        <p>Email: ${session?.email || 'demo'}</p>
        <p>Тариф: ${tariffName(session?.plan_type || state.tariff)}</p>
      </article>
      <article class="panel">
        <div class="panel__eyebrow">Что дальше</div>
        <ul class="algo-list compact">
          <li>Дожать AI-наставника как встроенный интеллект Easy OGE</li>
          <li>Довести open answers и менеджерскую проверку</li>
          <li>Потом собрать персональный план</li>
        </ul>
      </article>
    </section>
  `, {bottom: bottomNav('student', 'student-more')}));
}

function parentHomeScreen() {
  const dashboard = apiState().parentDashboard || state.parentDashboard;
  return screen('parent-home-screen', pageShell(`
    ${dashboardTopbar('Кабинет родителя')}
    ${gradientHero({
      eyebrow: 'Контроль без давления',
      title: `Прогресс ${apiState().session?.linked_student_name || state.linkedStudentName}`,
      subtitle: 'Смотри динамику, слабые темы и действия ребёнка внутри Easy OGE без хаоса и лишних таблиц.',
      action: '<button class="btn btn--primary btn--xl" data-route="parent-progress">Открыть прогресс</button>',
      secondaryAction: '<button class="btn btn--secondary btn--xl" data-action="refresh-parent-dashboard">Обновить</button>',
      statsLine: `${dashboard.weeklyTasks || 0}/${dashboard.weeklyGoal || 0} задач за неделю`
    })}

    <section class="content-grid">
      <article class="panel">
        <div class="panel__head">
          <div>
            <div class="panel__eyebrow">Слабые темы</div>
            <h3>Где ребёнку тяжелее</h3>
          </div>
        </div>
        ${topicProgressBars(dashboard.weakTopics || [])}
      </article>
      <article class="panel">
        <div class="panel__head">
          <div>
            <div class="panel__eyebrow">Сигналы</div>
            <h3>Что видно по действиям</h3>
          </div>
        </div>
        <ul class="algo-list compact">
          ${(dashboard.notices || []).map(item => `<li>${item}</li>`).join('')}
        </ul>
      </article>
    </section>
  `, {bottom: bottomNav('parent', 'parent-home')}));
}

function parentProgressScreen() {
  const dashboard = apiState().parentDashboard || state.parentDashboard;
  return screen('parent-progress-screen', pageShell(`
    ${dashboardTopbar('Прогресс ребёнка')}
    <section class="stats-row">
      <article class="stat-card stat-card--accent">
        <div class="stat-card__label">Сделано за неделю</div>
        <div class="stat-card__value">${dashboard.weeklyTasks || 0}</div>
        <p>Из цели ${dashboard.weeklyGoal || 0}. Это простой и понятный ориентир.</p>
      </article>
      <article class="stat-card">
        <div class="stat-card__label">Слабая тема №1</div>
        <div class="stat-card__value">${dashboard.weakTopics?.[0]?.name || '—'}</div>
        <p>Именно здесь проще всего потерять баллы.</p>
      </article>
    </section>
    <section class="content-grid">
      <article class="panel">
        <div class="panel__eyebrow">Темы</div>
        <h3>Динамика по блокам</h3>
        ${topicProgressBars(dashboard.weakTopics || [])}
      </article>
    </section>
  `, {bottom: bottomNav('parent', 'parent-progress')}));
}

function parentMoreScreen() {
  return screen('parent-more-screen', pageShell(`
    ${dashboardTopbar('Ещё')}
    <section class="content-grid">
      <article class="panel">
        <div class="panel__eyebrow">Подсказка</div>
        <h3>Как смотреть на прогресс</h3>
        <p>Главное — не только сколько задач сделано, а какие темы проседают и появляется ли стабильный ритм.</p>
      </article>
    </section>
  `, {bottom: bottomNav('parent', 'parent-more')}));
}

function aboutScreen() {
  return screen('about-screen', pageShell(`
    <section class="content-grid">
      <article class="panel panel--highlight">
        <div class="panel__eyebrow">Что такое Easy OGE</div>
        <h2>Не теория ради теории, а маршрут к ответу</h2>
        <p>Мы собираем сервис подготовки к ОГЭ по обществознанию, где задания, алгоритмы, AI-наставник и прогресс работают как один продукт.</p>
        <div class="panel__actions">
          <button class="btn btn--primary" data-route="landing">Назад</button>
        </div>
      </article>
      <article class="panel">
        <div class="panel__eyebrow">Фирменный формат Easy OGE</div>
        <ul class="algo-list compact">
          <li>Узнай тип за 3 секунды</li>
          <li>Первый ход</li>
          <li>Маршрут ответа</li>
          <li>Антиошибка</li>
          <li>Шаблон ответа</li>
          <li>Решалка на примере</li>
        </ul>
      </article>
    </section>
  `));
}

function algorithmTemplateScreen() {
  return screen('algorithm-template-screen', pageShell(`
    <div class="screen-shell">
      <div class="topbar topbar--glass">
        <button class="btn btn--ghost" data-action="back-to-last-screen">← Назад</button>
        <div class="topbar__title">Easy OGE · Алгоритм</div>
      </div>
      <div id="algorithm-template-view" class="algorithm-template-view"></div>
    </div>
  `));
}

function appMarkup() {
  return [
    landingScreen(),
    authScreen('student'),
    authScreen('parent'),
    studentHomeScreen(),
    studentTaskScreen(),
    studentMentorScreen(),
    studentProgressScreen(),
    studentMoreScreen(),
    parentHomeScreen(),
    parentProgressScreen(),
    parentMoreScreen(),
    aboutScreen(),
    algorithmTemplateScreen()
  ].join('');
}

function mount() {
  document.body.innerHTML = appMarkup();
  bindEvents();
  const routeMap = {
    landing: 'landing-screen',
    'student-auth': 'student-auth-screen',
    'parent-auth': 'parent-auth-screen',
    'student-home': 'student-home-screen',
    'student-task': 'student-task-screen',
    'student-mentor': 'student-mentor-screen',
    'student-progress': 'student-progress-screen',
    'student-more': 'student-more-screen',
    'parent-home': 'parent-home-screen',
    'parent-progress': 'parent-progress-screen',
    'parent-more': 'parent-more-screen',
    about: 'about-screen'
  };
  showScreen(routeMap[state.route] || 'landing-screen');
}

function rerender(nextRoute = null) {
  if (nextRoute) state.route = nextRoute;
  saveState();
  mount();
}

function bindEvents() {
  document.addEventListener('click', async (event) => {
    const routeBtn = event.target.closest('[data-route]');
    if (routeBtn) {
      rerender(routeBtn.getAttribute('data-route'));
      return;
    }

    const openAlgoBtn = event.target.closest('[data-open-algorithm]');
    if (openAlgoBtn) {
      const taskNumber = Number(openAlgoBtn.getAttribute('data-open-algorithm'));
      state.previousScreen = state.currentScreen;
      await openAlgorithmTemplate(taskNumber);
      return;
    }

    const backBtn = event.target.closest('[data-action="back-to-last-screen"]');
    if (backBtn) {
      showScreen(state.previousScreen || 'student-task-screen');
      return;
    }

    const logoutBtn = event.target.closest('[data-action="logout"]');
    if (logoutBtn) {
      logoutApi();
      state.role = null;
      state.userName = '';
      rerender('landing');
      return;
    }

    const refreshTaskBtn = event.target.closest('[data-action="refresh-task"]');
    if (refreshTaskBtn) {
      try {
        const task = await fetchRandomTask(state.filters.topic === 'all' ? null : undefined);
        state.currentTaskId = task.id;
        state.taskInput = '';
        state.openAnswerStatus = null;
        apiState().latestShortCard = await fetchShortCard(task.task_number);
      } catch (e) {
        console.error(e);
      }
      rerender('student-task');
      return;
    }

    const submitTaskBtn = event.target.closest('[data-action="submit-task-answer"]');
    if (submitTaskBtn) {
      const input = document.querySelector('[data-task-input]');
      state.taskInput = input?.value || '';
      const task = currentTaskData();
      try {
        const result = await submitTaskAnswer(task.id, {user_answer: state.taskInput});
        state.openAnswerStatus = `Результат: ${result.is_correct ? 'верно' : 'пока неверно'}. Балл: ${result.score}/${result.max_score}.`;
        await fetchProgressSummary();
      } catch (e) {
        state.openAnswerStatus = `Ошибка: ${e.message}`;
      }
      rerender('student-task');
      return;
    }

    const submitOpenBtn = event.target.closest('[data-action="submit-open-answer"]');
    if (submitOpenBtn) {
      const input = document.querySelector('[data-task-input]');
      state.taskInput = input?.value || '';
      if (!state.taskInput.trim()) {
        state.openAnswerStatus = 'Сначала напиши ответ.';
        rerender('student-task');
        return;
      }
      const task = currentTaskData();
      state.openAnswerStatus = `Ответ по заданию ${task.number} сохранён. Поток расширенной проверки подключим следующим этапом.`;
      rerender('student-task');
      return;
    }

    const sendMentorBtn = event.target.closest('[data-action="send-mentor-message"]');
    if (sendMentorBtn) {
      const input = document.querySelector('[data-mentor-input]');
      const message = (input?.value || '').trim();
      if (!message) return;
      apiState().mentorChat.push({role: 'user', message});
      if (input) input.value = '';
      rerender('student-mentor');
      try {
        const payload = await sendAiMessage(message);
        apiState().mentorChat.push({role: 'assistant', message: payload.answer || 'AI ничего не вернул.'});
      } catch (e) {
        apiState().mentorChat.push({role: 'assistant', message: `AI: ${e.message}`});
      }
      rerender('student-mentor');
      return;
    }

    const mentorPromptBtn = event.target.closest('[data-mentor-prompt]');
    if (mentorPromptBtn) {
      const input = document.querySelector('[data-mentor-input]');
      if (input) input.value = mentorPromptBtn.getAttribute('data-mentor-prompt') || '';
      return;
    }

    const refreshLimitsBtn = event.target.closest('[data-action="refresh-limits"]');
    if (refreshLimitsBtn) {
      try {
        await fetchAiLimits();
      } catch (e) {
        console.error(e);
      }
      rerender('student-mentor');
      return;
    }

    const refreshParentBtn = event.target.closest('[data-action="refresh-parent-dashboard"]');
    if (refreshParentBtn) {
      try {
        await fetchParentDashboard();
      } catch (e) {
        console.error(e);
      }
      rerender('parent-home');
      return;
    }

    const topicBtn = event.target.closest('[data-filter-topic]');
    if (topicBtn) {
      state.filters.topic = topicBtn.getAttribute('data-filter-topic');
      rerender('student-task');
      return;
    }

    const numberBtn = event.target.closest('[data-task-number]');
    if (numberBtn) {
      const number = Number(numberBtn.getAttribute('data-task-number'));
      try {
        const task = await fetchRandomTask(number);
        state.currentTaskId = task.id;
        state.taskInput = '';
        state.openAnswerStatus = null;
        apiState().latestShortCard = await fetchShortCard(task.task_number);
      } catch (e) {
        state.openAnswerStatus = `Ошибка: ${e.message}`;
      }
      rerender('student-task');
      return;
    }
  }, {once: true});

  document.querySelectorAll('[data-auth-form]').forEach(form => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const role = form.getAttribute('data-auth-form');
      const formData = new FormData(form);
      const email = String(formData.get('email') || '');
      const password = String(formData.get('password') || '');
      try {
        await loginApi(email, password);
        const session = await fetchSession();
        state.role = role;
        state.userName = session.full_name || (role === 'student' ? 'Ученик' : 'Родитель');
        await Promise.all([
          fetchAiLimits().catch(() => null),
          fetchProgressSummary().catch(() => null),
          fetchCurrentPlan().catch(() => null),
          role === 'parent' ? fetchParentDashboard().catch(() => null) : Promise.resolve(null)
        ]);
        try {
          const task = await fetchRandomTask();
          state.currentTaskId = task.id;
          apiState().latestShortCard = await fetchShortCard(task.task_number);
        } catch {
          state.currentTaskId = TASKS[0].id;
        }
        rerender(role === 'student' ? 'student-home' : 'parent-home');
      } catch (e) {
        alert(`Не удалось войти: ${e.message}`);
      }
    });
  });
}

loadState();
mount();
