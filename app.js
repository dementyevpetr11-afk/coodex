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

function planTypeToTariff(planType) {
  if (planType === 'pro') return 'pro';
  if (planType === 'basic') return 'base';
  return 'free';
}

function normalizeApiUser(user) {
  const planType = user?.subscription?.plan_type || 'free';
  return {
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    createdAt: user.created_at,
    tariff: planTypeToTariff(planType),
    parentCode: 'PARENT-DEMO',
    linkedStudentCode: 'PARENT-DEMO',
    linkedParentId: null,
    lastActiveAt: apiState().parentDashboard?.last_activity_at || null,
    aiUsage: {date: todayISO(), count: 0},
    tasksUsage: {date: todayISO(), count: 0},
    plan: apiState().currentPlan || null,
    progress: {attempts: [], tests: []},
    mentorChat: apiState().mentorChat || []
  };
}

function normalizeTask(task) {
  if (!task) return null;
  return {
    id: task.id,
    number: task.number || task.task_number,
    topic: task.topic,
    type: task.type || (task.is_open_answer ? 'extended' : 'test'),
    question: task.question || task.question_text,
    algorithm: Array.isArray(task.algorithm) ? task.algorithm : String(task.algorithm || task.algorithm_text || '').split(/\n+/).map(s => s.replace(/^\d+\.?\s*/, '').trim()).filter(Boolean),
    answer: task.answer || task.correct_answer || '',
    is_open_answer: !!task.is_open_answer
  };
}

async function apiFetch(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const data = await response.json();
      message = data.detail || data.message || message;
    } catch (e) {
      try { message = await response.text(); } catch (err) {}
    }
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}


// --- Easy OGE algorithm API ---
async function getAlgorithmBundle(taskNumber) {
  return await apiFetch(`/algorithm-bundles/${taskNumber}`);
}

async function getMobileShortCard(taskNumber) {
  return await apiFetch(`/mobile-short-cards/${taskNumber}`);
}

function renderAlgorithmTemplateCard(bundle) {
  const template = bundle?.authoring || bundle;
  if (!template) return '<div class="card"><h3>Алгоритм недоступен</h3></div>';

  const routeItems = Array.isArray(template.answer_route) ? template.answer_route : [];
  const antiMistakeItems = Array.isArray(template.anti_mistake?.items) ? template.anti_mistake.items : [];
  const antiLead = template.anti_mistake?.lead || '';
  const answerTemplateItems = Array.isArray(template.answer_template) ? template.answer_template : [];
  const worked = template.worked_example || {};
  const exampleSections = [
    ['Пример', worked.example || []],
    ['Как думаем', worked.thinking || []],
    ['Что замечаем', worked.notice || []],
    ['Как собираем ответ', worked.assembly || []],
    ['Почему это зачтут', worked.why_counted || []],
  ].filter(([, items]) => items.length);

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
          <p class="algo-lead">${antiLead}</p>
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
            ${exampleSections.map(([title, items]) => `
              <div class="example-block">
                <strong>${title}</strong>
                ${items.map(item => `<p>${item}</p>`).join('')}
              </div>
            `).join('')}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderShortCard(card, taskNumber) {
  if (!card) return '';
  const route = Array.isArray(card.route_3) ? card.route_3 : [];
  const actions = Array.isArray(card.route_3_actions) ? card.route_3_actions : [];
  return `
    <div class="easy-short-card">
      <div class="easy-short-top">
        <div>
          <div class="eyebrow">Easy OGE · быстрый вход</div>
          <h4>${card.headline || `Задание ${taskNumber}`}</h4>
        </div>
        <button class="small-btn" data-open-algorithm="${taskNumber}">Открыть полный алгоритм</button>
      </div>
      <p class="easy-short-hint">${card.ui_short_hint || ''}</p>
      <div class="easy-mini-grid">
        <div class="easy-mini-panel">
          <div class="mini-title">Маршрут 1–2–3</div>
          <ol class="algo-list compact">
            ${route.map(item => `<li>${item}</li>`).join('')}
          </ol>
        </div>
        <div class="easy-mini-panel">
          <div class="mini-title">Чего не делать</div>
          <p>${card.anti_pattern_short || ''}</p>
        </div>
      </div>
      <div class="easy-short-bottom">
        <div class="easy-anchor"><span>Запоминалка</span><strong>${card.memory_anchor || ''}</strong></div>
        ${actions.length ? `<div class="easy-actions"><span>Логика UI:</span><code>${actions.join(' · ')}</code></div>` : ''}
      </div>
    </div>
  `;
}

async function openAlgorithmTemplate(taskNumber) {
  try {
    const api = apiState();
    const bundle = api.algorithmBundles?.[taskNumber] || await getAlgorithmBundle(taskNumber);
    api.algorithmBundles[taskNumber] = bundle;
    const container = document.getElementById('algorithm-template-view');
    if (!container) return;
    container.innerHTML = renderAlgorithmTemplateCard(bundle);
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



function showScreen(screenId) {
  const appRoot = document.getElementById('app');
  const algoScreen = document.getElementById('algorithm-template-screen');

  if (screenId === 'algorithm-template-screen') {
    if (appRoot) appRoot.style.display = 'none';
    if (algoScreen) algoScreen.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }

  if (appRoot) appRoot.style.display = '';
  if (algoScreen) algoScreen.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'instant' });
}


async function refreshStudentCaches() {
  const api = apiState();
  api.progressSummary = await apiFetch('/progress/me');
  api.topicProgress = await apiFetch('/progress/topics');
  api.last7 = await apiFetch('/progress/last-7-days');
  try { api.currentPlan = await apiFetch('/plans/current'); } catch (e) { api.currentPlan = null; }
  try { api.aiLimits = await apiFetch('/ai/limits'); } catch (e) { api.aiLimits = null; }
  if (api.session) {
    api.session.plan = api.currentPlan;
    const tariff = getTariff(api.session);
    const remaining = api.aiLimits?.remaining_today;
    api.session.aiUsage = {
      date: todayISO(),
      count: remaining == null || tariff.aiPerDay === Infinity ? 0 : Math.max(tariff.aiPerDay - remaining, 0)
    };
  }
}

async function refreshParentDashboard() {
  const api = apiState();
  if (!api.parentStudentId) {
    try {
      const link = await apiFetch('/parent/link-student', { method: 'POST', body: JSON.stringify({ access_code: 'PARENT-DEMO' }) });
      api.parentStudentId = link.student_id;
    } catch (e) {}
  }
  if (api.parentStudentId) {
    api.parentDashboard = await apiFetch(`/parent/dashboard/${api.parentStudentId}`);
  }
}

async function bootstrapSession() {
  if (!accessToken) return;
  try {
    const me = await apiFetch('/auth/me');
    apiState().session = normalizeApiUser(me);
    if (me.role === 'student') await refreshStudentCaches();
    if (me.role === 'parent') await refreshParentDashboard();
    saveState();
    render();
  } catch (e) {
    accessToken = null;
    localStorage.removeItem(TOKEN_KEY);
    apiState().session = null;
    saveState();
  }
}

function uid(prefix='id') {
  return prefix + '_' + Math.random().toString(36).slice(2, 10);
}

function todayISO() {
  return new Date().toISOString().slice(0,10);
}

function daysBetween(from, to) {
  const a = new Date(from + 'T00:00:00');
  const b = new Date(to + 'T00:00:00');
  return Math.ceil((b - a) / 86400000);
}

function calcTasksPerDay(targetScore, days, minutes) {
  const raw = Math.max(1, Math.round((targetScore * 3) / Math.max(days, 1)));
  if (minutes <= 15) return Math.min(raw, 2);
  if (minutes <= 30) return Math.min(raw, 4);
  return Math.min(raw, 6);
}

function seededChoice(arr, seed = Date.now()) {
  const index = Math.abs(seed) % arr.length;
  return arr[index];
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (!parsed.api) {
      parsed.api = {session:null,currentTask:null,progressSummary:null,topicProgress:[],last7:[],currentPlan:null,parentDashboard:null,parentStudentId:null,aiLimits:null,mentorChat:[]};
    }
    return parsed;
  }
  const studentId = uid('student');
  const parentCode = 'EOGE-' + Math.random().toString(36).slice(2, 7).toUpperCase();
  const state = {
    currentUserId: null,
    users: [
      {
        id: studentId,
        role: 'student',
        name: 'Пётр',
        email: 'student@easyoge.demo',
        password: '1234',
        tariff: 'free',
        parentCode,
        linkedParentId: null,
        lastActiveAt: null,
        createdAt: new Date().toISOString(),
        aiUsage: {date: todayISO(), count: 0},
        tasksUsage: {date: todayISO(), count: 0},
        plan: null,
        progress: {
          attempts: [],
          tests: []
        },
        mentorChat: []
      },
      {
        id: uid('parent'),
        role: 'parent',
        name: 'Родитель demo',
        email: 'parent@easyoge.demo',
        password: '1234',
        linkedStudentCode: parentCode,
        createdAt: new Date().toISOString()
      },
      {
        id: uid('admin'),
        role: 'admin',
        name: 'Админ',
        email: 'admin@easyoge.demo',
        password: 'admin123',
        createdAt: new Date().toISOString()
      }
    ],
    tasks: TASKS,
    ui: {
      studentTab: 'home',
      parentTab: 'overview',
      adminTab: 'tasks',
      taskAnswer: '',
      mentorInput: '',
      selectedTaskNumber: 1,
      currentTaskId: null,
      activeMockTest: null,
      toast: null,
      showModal: null,
      editingTaskId: null
    }
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setToast(text, type='info') {
  state.ui.toast = {text, type, id: uid('toast')};
  saveState();
  render();
  setTimeout(() => {
    if (state.ui.toast && state.ui.toast.text === text) {
      state.ui.toast = null;
      saveState();
      render();
    }
  }, 2400);
}

function getCurrentUser() {
  return apiState().session || state.users.find(u => u.id === state.currentUserId) || null;
}

function getStudentByCode(code) {
  const local = state.users.find(u => u.role === 'student' && u.parentCode === code);
  if (local) return local;
  const dash = apiState().parentDashboard;
  if (!dash) return null;
  return {
    name: dash.student_name,
    lastActiveAt: dash.last_activity_at,
    progress: {tests: []}
  };
}

function sanitize(text) {
  return text.toString().trim().toLowerCase().replace(/\s+/g, ' ');
}

function resetDailyUsage(student) {
  const today = todayISO();
  if (student.aiUsage.date !== today) student.aiUsage = {date: today, count: 0};
  if (student.tasksUsage.date !== today) student.tasksUsage = {date: today, count: 0};
}

function getTariff(student) {
  return DEFAULT_TARIFFS[student.tariff] || DEFAULT_TARIFFS.free;
}

function findOrGenerateTask(number) {
  const exact = state.tasks.filter(t => Number(t.number) === Number(number));
  if (exact.length) return exact[Math.floor(Math.random() * exact.length)];
  return null;
}

function streakFromAttempts(attempts) {
  const days = [...new Set(attempts.map(a => a.date))].sort().reverse();
  if (!days.length) return 0;
  let streak = 0;
  let cursor = new Date(todayISO() + 'T00:00:00');
  for (const d of days) {
    const day = new Date(d + 'T00:00:00');
    const diff = Math.round((cursor - day) / 86400000);
    if (diff === 0 || diff === 1 && streak === 0) {
      streak += 1;
      cursor = day;
    } else if (diff === 1) {
      streak += 1;
      cursor = day;
    } else break;
  }
  return streak;
}

function studentStats(student) {
  const api = apiState();
  if (api.session && api.session.role === 'student' && api.progressSummary) {
    return {
      solved: api.progressSummary.total_solved || 0,
      correct: api.progressSummary.total_correct || 0,
      wrong: api.progressSummary.total_wrong || 0,
      accuracy: Math.round(api.progressSummary.accuracy_percent || 0),
      streak: api.progressSummary.streak_days || 0,
      byTopic: (api.topicProgress || []).map(t => ({
        topic: t.topic,
        solved: t.solved_count || 0,
        correct: t.correct_count || 0,
        accuracy: Math.round(t.accuracy_percent || 0)
      })),
      last7: (api.last7 || []).map(d => ({ date: d.date, count: d.solved || 0, correct: d.correct || 0 }))
    };
  }
  const attempts = student.progress.attempts || [];
  const solved = attempts.length;
  const correct = attempts.filter(a => a.correct).length;
  const wrong = solved - correct;
  const accuracy = solved ? Math.round(correct / solved * 100) : 0;
  const streak = streakFromAttempts(attempts);
  const byTopic = TOPICS.map(topic => {
    const arr = attempts.filter(a => a.topic === topic);
    return {
      topic,
      solved: arr.length,
      correct: arr.filter(a => a.correct).length,
      accuracy: arr.length ? Math.round(arr.filter(a => a.correct).length / arr.length * 100) : 0
    };
  });
  const last7 = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0,10);
    const items = attempts.filter(a => a.date === key);
    return { date: key, count: items.length, correct: items.filter(a => a.correct).length };
  });
  return {solved, correct, wrong, accuracy, streak, byTopic, last7};
}

function aiAdvice(student) {
  const stats = studentStats(student);
  const weakest = [...stats.byTopic].sort((a,b) => a.accuracy - b.accuracy || a.solved - b.solved)[0];
  if (!stats.solved) return 'Начни с 2–3 простых заданий по экономике или праву, чтобы набрать ритм. Лучше маленькие шаги каждый день, чем один героический рывок.';
  if (weakest && weakest.solved > 0) return `У тебя сейчас проседает тема «${weakest.topic}». Повтори базовый алгоритм и сделай 2 задания подряд именно по этой теме.`;
  return 'Ты держишь хороший темп. Добавь один пробный тест после серии из нескольких дней — это даст более честную картину прогресса.';
}

function mentorReply(student, input) {
  const text = sanitize(input);
  if (!text) return 'Напиши вопрос по заданию или теме, и я помогу без готового ответа.';
  if (text.includes('не понял')) return 'Давай ещё проще. Сначала найди, о чём вопрос: экономика, право, политика, социальная сфера или человек и общество. Потом выбери 1 ключевую мысль и только после этого отвечай.';
  const numberMatch = text.match(/(\d{1,2})/);
  if (numberMatch) {
    const task = findOrGenerateTask(Number(numberMatch[1]));
    if (task) {
      return `Задание ${task.number}. Смотри на логику: ${task.algorithm[0]} Потом: ${task.algorithm[1]} Не спеши с ответом — сначала попробуй назвать главный признак или термин.`;
    }
  }
  const topic = TOPICS.find(t => text.includes(t));
  if (topic) {
    const task = state.tasks.find(t => t.topic === topic);
    if (task) {
      return `По теме «${topic}» держись так: ${task.algorithm.join(' ')} Теперь попробуй сам сформулировать ответ в 1–2 фразах.`;
    }
  }
  if (text.includes('как решать')) {
    return 'Сначала определи тему задания. Потом найди ключевое слово вопроса. Вспоминай алгоритм, а не весь учебник сразу. К ответу переходи только когда понял, что именно спрашивают.';
  }
  return 'Я не дам готовый ответ, но помогу дойти до него. Сформулируй, что именно непонятно: тема, термин, тип задания или проверка ответа.';
}

function createAttempt(student, task, rawAnswer, correct) {
  student.progress.attempts.push({
    id: uid('attempt'),
    taskId: task.id,
    number: task.number,
    topic: task.topic,
    answer: rawAnswer,
    correct,
    date: todayISO(),
    createdAt: new Date().toISOString()
  });
  student.lastActiveAt = new Date().toISOString();
}

function createMockTest(student) {
  const ordered = [...state.tasks].sort((a,b) => a.number - b.number);
  state.ui.activeMockTest = {
    id: uid('mock'),
    studentId: student.id,
    index: 0,
    tasks: ordered.map(t => ({taskId: t.id, userAnswer: '', checked: false, correct: null})),
    createdAt: new Date().toISOString()
  };
}

function finishMockTest(student) {
  const active = state.ui.activeMockTest;
  const total = active.tasks.length;
  const checked = active.tasks.filter(x => x.correct !== null);
  const correct = checked.filter(x => x.correct).length;
  student.progress.tests.push({
    id: active.id,
    date: todayISO(),
    total,
    checked: checked.length,
    correct,
    percent: checked.length ? Math.round(correct / checked.length * 100) : 0
  });
  state.ui.activeMockTest = null;
  saveState();
  render();
  setToast(`Пробный тест завершён: ${correct}/${total}`);
}

async function login(email, password) {
  try {
    const data = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    accessToken = data.access_token;
    localStorage.setItem(TOKEN_KEY, accessToken);
    const me = await apiFetch('/auth/me');
    apiState().session = normalizeApiUser(me);
    apiState().currentTask = null;
    apiState().mentorChat = [];
    if (me.role === 'student') await refreshStudentCaches();
    if (me.role === 'parent') await refreshParentDashboard();
    saveState();
    render();
    setToast('Вход выполнен');
  } catch (e) {
    setToast(e.message || 'Неверный логин или пароль', 'danger');
  }
}

async function registerStudent(name, email, password) {
  try {
    await apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, role: 'student' }) });
    hideModal();
    await login(email, password);
  } catch (e) {
    setToast(e.message || 'Не удалось создать аккаунт', 'danger');
  }
}

async function registerParent(name, email, password, code) {
  try {
    await apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, role: 'parent' }) });
    await login(email, password);
    try {
      const link = await apiFetch('/parent/link-student', { method: 'POST', body: JSON.stringify({ access_code: code || 'PARENT-DEMO' }) });
      apiState().parentStudentId = link.student_id;
      await refreshParentDashboard();
    } catch (err) {}
    hideModal();
    render();
    setToast('Родительский аккаунт создан');
  } catch (e) {
    setToast(e.message || 'Не удалось создать аккаунт родителя', 'danger');
  }
}

function logout() {
  state.currentUserId = null;
  apiState().session = null;
  apiState().currentTask = null;
  apiState().progressSummary = null;
  apiState().topicProgress = [];
  apiState().last7 = [];
  apiState().currentPlan = null;
  apiState().parentDashboard = null;
  apiState().parentStudentId = null;
  apiState().mentorChat = [];
  accessToken = null;
  localStorage.removeItem(TOKEN_KEY);
  saveState();
  render();
}

function header(user) {
  return `
    <div class="topbar">
      <div class="topbar-glow"></div>
      <div class="userline">
        <div class="logo logo-textonly"><div class="brand-lockup"><span class="brand-name">Easy OGE</span><span class="brand-eyebrow">AI-подготовка к ОГЭ</span></div></div>
        <span class="badge ${user.role === 'student' ? '' : user.role === 'parent' ? 'blue' : 'warn'}">${user.role === 'student' ? 'Ученик' : user.role === 'parent' ? 'Родитель' : 'Админ'}</span>
        ${user.role === 'student' ? `<span class="badge blue">${DEFAULT_TARIFFS[user.tariff].name}</span>` : ''}
      </div>
      <div class="row">
        <span class="muted">${user.name}</span>
        <button class="small-btn" onclick="logout()">Выйти</button>
      </div>
    </div>
  `;
}

function authView() {
  return `
    <div class="auth-wrap auth-wrap-premium">
      <div class="auth-shell auth-shell-premium">
        <div class="auth-stage premium-stage">
          <div class="stage-noise"></div>
          <div class="stage-grid"></div>
          <div class="motion-beam beam-a"></div>
          <div class="motion-beam beam-b"></div>
          <div class="motion-beam beam-c"></div>
          <div class="motion-orbit orbit-a"></div>
          <div class="motion-orbit orbit-b"></div>
          <div class="motion-orbit orbit-c"></div>
          <div class="cinema-glow"></div>
          <div class="cinema-card cinema-card-a"><span>AI-наставник</span><strong>Не решает вместо ученика</strong></div>
          <div class="cinema-card cinema-card-b"><span>Parent view</span><strong>Точность, активность, тесты</strong></div>
          <div class="cinema-card cinema-card-c"><span>Focus</span><strong>Алгоритм за 60 секунд</strong></div>

          <div class="premium-topline premium-topline-minimal">
            <span class="premium-chip">PWA / MVP</span>
            <span class="premium-chip premium-chip-soft">AI • ОГЭ • 2026</span>
          </div>

          <div class="stage-brand-watermark" aria-hidden="true"><img src="./logo.png" alt="" /></div>
          <div class="eyebrow">AI-формат, быстрый старт, понятный контроль</div>
          <div class="hero-brand hero-brand-auth hero-brand-auth-inline">
            <div class="hero-brand-copy"><strong>Easy OGE</strong><span>Подготовка к ОГЭ по обществознанию</span></div>
          </div>
          <h1 class="auth-title premium-title">Алгоритмы вместо перегруза. Подготовка, которая держит темп.</h1>
          <p class="auth-sub premium-sub">Ученик быстро доходит до ответа через алгоритмы и AI-наставника, а родитель видит реальный прогресс без лишней суеты.</p>

          <div class="stage-actions stage-actions-premium">
            <button class="btn btn-accent" onclick="openAuth('login')">Войти</button>
            <button class="btn btn-ghost-light" onclick="openAuth('register-student')">Регистрация ученика</button>
            <button class="btn btn-ghost-light" onclick="openAuth('register-parent')">Регистрация родителя</button>
          </div>

          <div class="orb-stage orb-stage-auth">
            <div class="orb-backdrop"></div>
            <div class="orb-ring orb-ring-a"></div>
            <div class="orb-ring orb-ring-b"></div>
            <div class="orb-ring orb-ring-c"></div>
            <div class="orb-line orb-line-a"></div>
            <div class="orb-line orb-line-b"></div>
            <div class="orb-line orb-line-c"></div>
            <div class="orb-satellite satellite-a"><span>AI mentor</span></div>
            <div class="orb-satellite satellite-b"><span>Parent view</span></div>
            <div class="orb-satellite satellite-c"><span>24 задания</span></div>
            <div class="logo-orb motion-orb-target orb-black" data-depth="18">
              <div class="logo-orb-shadow"></div>
              <div class="logo-orb-core"></div>
              <div class="logo-orb-gloss"></div>
              <div class="logo-orb-outline"></div>
              <div class="orb-yellow-lines">
                <span class="yellow-line yl-a"></span>
                <span class="yellow-line yl-b"></span>
                <span class="yellow-line yl-c"></span>
                <span class="yellow-line yl-d"></span>
              </div>
            </div>
          </div>

          <div class="visual-rail">
            <div class="visual-rail-track">
              <span>adaptive pace</span>
              <span>fast answers</span>
              <span>premium motion</span>
              <span>student focus</span>
              <span>parent control</span>
              <span>adaptive pace</span>
              <span>fast answers</span>
              <span>premium motion</span>
            </div>
          </div>

          <div class="stage-spec-grid">
            <div class="spec-card spec-card-dark"><span>60 сек</span><small>до алгоритма</small></div>
            <div class="spec-card"><span>AI</span><small>наставник, а не решатель</small></div>
            <div class="spec-card"><span>Parent</span><small>контроль прогресса</small></div>
          </div>

          <div class="stage-marquee premium-marquee"><div class="stage-marquee-track">АЛГОРИТМЫ • НАСТАВНИК • ПРОГРЕСС • ПЛАН • ПРОБНЫЙ ТЕСТ • РОДИТЕЛЬСКАЯ ПАНЕЛЬ • АЛГОРИТМЫ • НАСТАВНИК • ПРОГРЕСС • ПЛАН • ПРОБНЫЙ ТЕСТ • РОДИТЕЛЬСКАЯ ПАНЕЛЬ •</div></div>
        </div>

        <div class="auth-side auth-side-premium">
          <div class="feature-card feature-card-premium">
            <div class="feature-kicker">Почему это работает как продукт</div>
            <h2 class="feature-title">Чёткая подача, короткий путь до результата.</h2>
            <p class="feature-text">Сильный первый экран, понятные действия, быстрый доступ к заданиям и интерфейс, где ученик не теряется, а двигается по шагам.</p>
          </div>

          <div class="auth-benefits benefits-premium">
            <div class="auth-benefit premium-benefit"><strong>Ученик</strong><span>Получает алгоритмы, а не тонет в теории.</span></div>
            <div class="auth-benefit premium-benefit"><strong>Родитель</strong><span>Видит точность, активность и слабые темы.</span></div>
            <div class="auth-benefit premium-benefit"><strong>Продукт</strong><span>Похоже на мобильный продукт, а не на бот с кнопками.</span></div>
          </div>

          <div class="demo-panel demo-panel-premium">
            <h3 class="demo-title">Демо-доступы</h3>
            <div class="kpi">Ученик demo<strong>student@easyoge.demo / 1234</strong></div>
            <div class="kpi">Родитель demo<strong>parent@easyoge.demo / 1234</strong></div>
            <div class="kpi">Админ demo<strong>admin@easyoge.demo / admin123</strong></div>
          </div>
        </div>
      </div>
      ${authModal()}
      ${toastView()}
    </div>
  `;
}

function authModal() {
  const mode = state.ui.showModal;
  if (!mode || !mode.startsWith('auth:')) return '';
  const kind = mode.split(':')[1];
  if (kind === 'login') {
    return `
      <div class="modal" onclick="closeModal(event)">
        <div class="modal-card" onclick="event.stopPropagation()">
          <h3 class="section-title">Войти</h3>
          <div class="grid">
            <div><label>Email</label><input id="login-email" placeholder="you@example.com"></div>
            <div><label>Пароль</label><input id="login-password" type="password" placeholder="••••••"></div>
            <div class="row"><button class="btn" onclick="submitLogin()">Войти</button><button class="btn secondary" onclick="hideModal()">Отмена</button></div>
          </div>
        </div>
      </div>
    `;
  }
  if (kind === 'register-student') {
    return `
      <div class="modal" onclick="closeModal(event)">
        <div class="modal-card" onclick="event.stopPropagation()">
          <h3 class="section-title">Регистрация ученика</h3>
          <div class="grid">
            <div><label>Имя</label><input id="reg-s-name" placeholder="Пётр"></div>
            <div><label>Email</label><input id="reg-s-email" placeholder="you@example.com"></div>
            <div><label>Пароль</label><input id="reg-s-pass" type="password" placeholder="Придумай пароль"></div>
            <div class="row"><button class="btn" onclick="submitRegisterStudent()">Создать аккаунт</button><button class="btn secondary" onclick="hideModal()">Отмена</button></div>
          </div>
        </div>
      </div>
    `;
  }
  return `
    <div class="modal" onclick="closeModal(event)">
      <div class="modal-card" onclick="event.stopPropagation()">
        <h3 class="section-title">Регистрация родителя</h3>
        <div class="grid">
          <div><label>Имя</label><input id="reg-p-name" placeholder="Мария"></div>
          <div><label>Email</label><input id="reg-p-email" placeholder="parent@example.com"></div>
          <div><label>Пароль</label><input id="reg-p-pass" type="password" placeholder="Придумай пароль"></div>
          <div><label>Код ученика</label><input id="reg-p-code" placeholder="EOGE-XXXXX"></div>
          <div class="row"><button class="btn" onclick="submitRegisterParent()">Подключиться</button><button class="btn secondary" onclick="hideModal()">Отмена</button></div>
        </div>
      </div>
    </div>
  `;
}

function toastView() {
  if (!state.ui.toast) return '';
  const color = state.ui.toast.type === 'danger' ? 'danger' : state.ui.toast.type === 'warn' ? 'warn' : 'secondary';
  return `<div style="position:fixed;right:16px;top:16px;z-index:30"><button class="btn ${color}" style="cursor:default">${state.ui.toast.text}</button></div>`;
}

function studentView(student) {
  resetDailyUsage(student);
  const stats = studentStats(student);
  const tab = state.ui.studentTab || 'home';
  const tariff = getTariff(student);
  const currentTask = apiState().currentTask || (state.ui.currentTaskId ? state.tasks.find(t => t.id === state.ui.currentTaskId) : null);
  return `
    <div class="container">
      ${header(student)}
      <div class="hero-grid hero-grid-premium">
        <div class="panel hero-primary hero-primary-premium">
          <div class="hero-shell">
            <div class="hero-lines"></div>
            <div class="hero-rings"></div>
            <div class="hero-scan"></div>
            <div class="hero-copy">
              <div class="hero-brand-watermark" aria-hidden="true"><img src="./logo.png" alt="" /></div>
              <div class="eyebrow hero-eyebrow">Сегодняшний фокус</div>
              <div class="hero-brand hero-brand-home hero-brand-home-inline">
                <div class="hero-brand-copy"><strong>Easy OGE</strong><span>Алгоритмы вместо учебников</span></div>
              </div>
              <div class="section-title hero-title">Привет, ${student.name}</div>
              <p class="section-sub hero-sub">Открывай задание, получай алгоритм, проверяй ответ и накапливай уверенность шаг за шагом.</p>
            </div>
            <div class="hero-orb-cluster">
              <div class="hero-orb-backdrop"></div>
              <div class="hero-orb-track"></div>
              <div class="hero-orb-track hero-orb-track-b"></div>
              <div class="hero-logo-orb motion-orb-target orb-black-small" data-depth="12">
                <div class="hero-logo-orb-core"></div>
                <div class="hero-logo-orb-gloss"></div>
                <div class="orb-yellow-lines orb-yellow-lines-small">
                  <span class="yellow-line yl-a"></span>
                  <span class="yellow-line yl-b"></span>
                  <span class="yellow-line yl-c"></span>
                </div>
              </div>
              <div class="hero-orb-chip hero-orb-chip-a">Алгоритмы</div>
              <div class="hero-orb-chip hero-orb-chip-b">AI</div>
              <div class="hero-orb-chip hero-orb-chip-c">План</div>
            </div>
            <div class="hero-floating-stack">
              <div class="hero-float-card card-main"><small>Сегодня</small><strong>${student.plan ? `${student.plan.tasksPerDay} заданий` : 'Начни с 1 задания'}</strong><span>Темп, который реально держать</span></div>
              <div class="hero-float-card card-side card-side-a"><small>AI</small><strong>${student.aiUsage.count}/${tariff.aiPerDay === Infinity ? '∞' : tariff.aiPerDay}</strong><span>вопросов сегодня</span></div>
              <div class="hero-float-card card-side card-side-b"><small>Серия</small><strong>${stats.streak} дней</strong><span>без пропусков</span></div>
            </div>
            <div class="hero-pulse-row">
              <span class="pulse-chip">Понятные шаги</span>
              <span class="pulse-chip">AI рядом</span>
              <span class="pulse-chip">Контроль для родителя</span>
            </div>
            <div class="hero-marquee"><div class="hero-marquee-track">EASY OGE • АЛГОРИТМЫ • ПЕРСОНАЛЬНЫЙ ПЛАН • AI-НАСТАВНИК • РОДИТЕЛЬСКИЙ КОНТРОЛЬ • EASY OGE • АЛГОРИТМЫ • ПЕРСОНАЛЬНЫЙ ПЛАН • AI-НАСТАВНИК • РОДИТЕЛЬСКИЙ КОНТРОЛЬ •</div></div>
            <div class="stat-grid stat-grid-premium">
              <div class="stat stat-premium"><div class="k">Всего решено</div><div class="v">${stats.solved}</div></div>
              <div class="stat stat-premium"><div class="k">Точность</div><div class="v">${stats.accuracy}%</div></div>
              <div class="stat stat-premium"><div class="k">Дней подряд</div><div class="v">${stats.streak}</div></div>
              <div class="stat stat-premium"><div class="k">ИИ сегодня</div><div class="v">${student.aiUsage.count}/${tariff.aiPerDay === Infinity ? '∞' : tariff.aiPerDay}</div></div>
            </div>
          </div>
        </div>
        <div class="panel hero-side hero-side-premium">
          <div class="hero-side-heading">
            <div class="section-title">Ключевые действия</div>
            <p class="section-sub">Всё важное вынесено в быстрые сценарии без лишних экранов.</p>
          </div>
          <div class="list premium-action-list">
            <button class="card-btn card-btn-premium" onclick="setStudentTab('tasks')"><strong>Найти задание</strong><span class="muted">Номер, алгоритм, ответ — без лишней теории</span></button>
            <button class="card-btn card-btn-premium" onclick="setStudentTab('mentor')"><strong>Мой наставник</strong><span class="muted">Понять логику и дойти до ответа самому</span></button>
            <button class="card-btn card-btn-premium" onclick="setStudentTab('plan')"><strong>Персональный план</strong><span class="muted">Сколько задач в день и когда напомнить</span></button>
            <button class="card-btn card-btn-premium" onclick="setStudentTab('test')"><strong>Пробный тест</strong><span class="muted">Полный вариант и честная самопроверка</span></button>
          </div>
        </div>
      </div>

      <div class="nav-tabs nav-tabs-premium">
        ${['home','tasks','progress','mentor','plan','test','tariff','profile'].map(x => `<button class="tab-btn ${tab === x ? 'active' : ''}" onclick="setStudentTab('${x}')">${studentTabLabel(x)}</button>`).join('')}
      </div>

      ${tab === 'home' ? studentHome(student, stats) : ''}
      ${tab === 'tasks' ? studentTasks(student, currentTask) : ''}
      ${tab === 'progress' ? studentProgress(student, stats) : ''}
      ${tab === 'mentor' ? studentMentor(student) : ''}
      ${tab === 'plan' ? studentPlan(student) : ''}
      ${tab === 'test' ? studentTest(student) : ''}
      ${tab === 'tariff' ? studentTariff(student) : ''}
      ${tab === 'profile' ? studentProfile(student) : ''}

      <div class="footer-nav">
        <div class="footer-inner">
          ${footerLink('home','','Главная', tab)}
          ${footerLink('tasks','','Задания', tab)}
          ${footerLink('mentor','','Наставник', tab)}
          ${footerLink('progress','','Прогресс', tab)}
          ${footerLink('profile','','Профиль', tab)}
        </div>
      </div>
      ${toastView()}
    </div>
  `;
}

function studentTabLabel(tab) {
  return ({home:'Главная', tasks:'Задания', progress:'Прогресс', mentor:'Наставник', plan:'План', test:'Пробный тест', tariff:'Тарифы', profile:'Профиль'})[tab];
}

function footerLink(tab, icon, label, current) {
  return `<button class="footer-link ${current===tab?'active':''}" onclick="setStudentTab('${tab}')"><span>${icon}</span><span>${label}</span></button>`;
}

function studentHome(student, stats) {
  return `
    <div class="grid grid-2">
      <div class="panel">
        <h3 class="section-title">Совет AI</h3>
        <p class="section-sub">Персональная рекомендация на основе твоей статистики.</p>
        <div class="algo">${aiAdvice(student)}</div>
      </div>
      <div class="panel">
        <h3 class="section-title">Слабые темы</h3>
        <div class="list">
          ${stats.byTopic.map(t => `
            <div>
              <div class="row" style="justify-content:space-between"><span>${t.topic}</span><span class="muted">${t.accuracy}%</span></div>
              <div class="topic-bar"><div class="topic-fill" style="width:${t.accuracy}%"></div></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function studentTasks(student, currentTask) {
  const tariff = getTariff(student);
  const usageLeft = tariff.tasksPerDay === Infinity ? '∞' : Math.max(tariff.tasksPerDay - student.tasksUsage.count, 0);
  return `
    <div class="grid grid-2">
      <div class="panel">
        <h3 class="section-title">Найти задание</h3>
        <p class="section-sub">Выбери номер от 1 до 24. Система покажет вариант и короткий алгоритм решения.</p>
        <div class="grid">
          <div><label>Номер задания</label><select id="task-number">${Array.from({length:24},(_,i)=>`<option value="${i+1}" ${Number(state.ui.selectedTaskNumber)===i+1?'selected':''}>${i+1}</option>`).join('')}</select></div>
          <div class="row"><button class="btn" onclick="openTask()">Получить задание</button><button class="btn secondary" onclick="openRandomTask()">Случайное</button></div>
          <div class="notice">Доступно заданий сегодня: <strong>${usageLeft}</strong></div>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Как устроен сценарий</h3>
        <div class="list">
          <div class="list-item"><span>1. Выбираешь номер</span><span>🔢</span></div>
          <div class="list-item"><span>2. Получаешь алгоритм</span><span>🧠</span></div>
          <div class="list-item"><span>3. Решаешь и проверяешь</span><span>→</span></div>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
    ${currentTask ? taskDetailView(currentTask) : '<div class="empty">Выбери номер задания и открой карточку.</div>'}
  `;
}


function taskDetailView(task) {
  task = normalizeTask(task);
  const bundle = apiState().algorithmBundles?.[task.number] || null;
  const shortCard = bundle?.mobile_short_card || apiState().latestShortCard || null;
  return `
    <div class="task-card">
      <div class="task-header">
        <div class="row">
          <span class="badge blue">Задание ${task.number}</span>
          <span class="badge">${task.topic}</span>
          ${task.type === 'extended' ? '<span class="badge warn">Развёрнутый ответ</span>' : ''}
        </div>
        <div class="row">
          <button class="small-btn" onclick="openTaskByNumber(${task.number})">🔁 Ещё задание</button>
        </div>
      </div>
      <h3 class="task-title">${task.question}</h3>
      <p class="muted">Короткая логика вместо длинной теории.</p>
      ${shortCard ? renderShortCard(shortCard, task.number) : `<div class="algo"><ol>${task.algorithm.map(step => `<li>${step}</li>`).join('')}</ol></div>`}
      <hr class="sep">
      ${task.type === 'extended' ? `
        <div class="notice">Это задание с развёрнутым ответом. Открой полный алгоритм и решалку, а потом попроси AI проверить ход мысли.</div>
        <div class="row"><button class="btn secondary" data-open-algorithm="${task.number}">Открыть полный алгоритм</button><button class="btn" onclick="setStudentTab('mentor')">Спросить AI</button></div>
      ` : `
        <div class="grid grid-2">
          <div><label>Твой ответ</label><input id="task-answer" value="${state.ui.taskAnswer || ''}" placeholder="Введи ответ"></div>
          <div class="row" style="align-items:end"><button class="btn" onclick="checkTaskAnswer(${task.id})">Проверить</button><button class="btn secondary" onclick="setStudentTab('mentor')">Спросить AI</button><button class="btn ghost" data-open-algorithm="${task.number}">Полный алгоритм</button></div>
        </div>
      `}
    </div>
  `;
}


function studentProgress(student, stats) {
  return `
    <div class="grid grid-2">
      <div class="panel">
        <h3 class="section-title">Общий прогресс</h3>
        <div class="list">
          <div class="list-item"><span>Всего решено</span><strong>${stats.solved}</strong></div>
          <div class="list-item"><span>Правильных</span><strong>${stats.correct}</strong></div>
          <div class="list-item"><span>Неправильных</span><strong>${stats.wrong}</strong></div>
          <div class="list-item"><span>Точность</span><strong>${stats.accuracy}%</strong></div>
          <div class="list-item"><span>Дней подряд</span><strong>${stats.streak}</strong></div>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Последние 7 дней</h3>
        <div class="list">
          ${stats.last7.map(d => `<div class="list-item"><span>${formatDateShort(d.date)}</span><span>${d.correct}/${d.count}</span></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="spacer"></div>
    <div class="panel">
      <h3 class="section-title">По темам</h3>
      <div class="list">
        ${stats.byTopic.map(t => `
          <div>
            <div class="row" style="justify-content:space-between"><strong>${t.topic}</strong><span class="muted">${t.correct}/${t.solved} · ${t.accuracy}%</span></div>
            <div class="topic-bar"><div class="topic-fill" style="width:${t.accuracy}%"></div></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function studentMentor(student) {
  const tariff = getTariff(student);
  return `
    <div class="panel">
      <h3 class="section-title">Наставник</h3>
      <p class="section-sub">Он помогает понять алгоритм, но не даёт готовый ответ.</p>
      <div class="notice">Лимит сегодня: ${student.aiUsage.count}/${tariff.aiPerDay === Infinity ? '∞' : tariff.aiPerDay}</div>
      <div class="spacer"></div>
      <div class="chat-box">
        ${(student.mentorChat.length ? student.mentorChat : [{role:'ai', text:'Привет. Напиши вопрос по теме или номер задания, и я помогу разобраться шаг за шагом.'}]).map(msg => `
          <div class="message ${msg.role === 'user' ? 'user' : 'ai'}"><strong>${msg.role === 'user' ? 'Ты' : 'AI'}:</strong> ${msg.text}</div>
        `).join('')}
      </div>
      <div class="spacer"></div>
      <div class="grid grid-2">
        <div><label>Твой вопрос</label><textarea id="mentor-input" placeholder="Например: как решать задание 12 по экономике?"></textarea></div>
        <div class="grid">
          <button class="btn" onclick="sendMentor()">Отправить</button>
          <button class="btn secondary" onclick="quickMentor('не понял')">Не понял</button>
          <button class="btn secondary" onclick="quickMentor('как решать задание 12')">Как решать задание 12?</button>
          <button class="btn warn" onclick="setToast('Кнопка связи с менеджером будет подключена на следующем этапе', 'warn')">Связь с поддержкой</button>
        </div>
      </div>
    </div>
  `;
}

function studentPlan(student) {
  const plan = student.plan;
  const daysLeft = plan ? Math.max(daysBetween(todayISO(), plan.examDate), 0) : null;
  return `
    <div class="grid grid-2">
      <div class="panel">
        <h3 class="section-title">План</h3>
        <div class="grid">
          <div><label>Дата экзамена</label><input id="plan-date" type="date" value="${plan?.examDate || ''}"></div>
          <div><label>Желаемый балл</label><input id="plan-score" type="number" min="0" max="100" value="${plan?.targetScore || 60}"></div>
          <div><label>Минут в день</label><select id="plan-minutes">${[15,30,45,60].map(m => `<option ${plan?.minutes===m?'selected':''}>${m}</option>`).join('')}</select></div>
          <div><label>Время уведомлений</label><input id="plan-time" type="time" value="${plan?.notifyTime || '20:00'}"></div>
          <div class="row"><button class="btn" onclick="savePlan()">Сохранить план</button>${plan ? '<button class="btn secondary" onclick="clearPlan()">Сбросить</button>' : ''}</div>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Текущий статус</h3>
        ${plan ? `
          <div class="list">
            <div class="list-item"><span>До экзамена</span><strong>${daysLeft} дн.</strong></div>
            <div class="list-item"><span>Цель</span><strong>${plan.targetScore} баллов</strong></div>
            <div class="list-item"><span>Заданий в день</span><strong>${plan.tasksPerDay}</strong></div>
            <div class="list-item"><span>Время напоминания</span><strong>${plan.notifyTime}</strong></div>
            <div class="list-item"><span>Проверочная</span><strong>${plan.day % 20 === 0 ? 'Сегодня' : 'через ' + (20 - (plan.day % 20 || 20)) + ' дн.'}</strong></div>
          </div>
        ` : '<div class="empty">План ещё не создан. Укажи дату, цель и время подготовки.</div>'}
      </div>
    </div>
  `;
}

function studentTest(student) {
  const tariff = getTariff(student);
  if (!tariff.trial) {
    return `<div class="panel"><div class="notice">Пробный тест доступен только по подписке Базовый или PRO.</div></div>`;
  }
  const active = state.ui.activeMockTest;
  if (!active || active.studentId !== student.id) {
    return `
      <div class="panel">
        <h3 class="section-title">Пробный тест</h3>
        <p class="section-sub">Полный вариант из 24 заданий. Для развёрнутых задач будет только вывод текста без автопроверки.</p>
        <div class="row"><button class="btn" onclick="startMockTest()">Начать тест</button></div>
        ${student.progress.tests.length ? `
          <hr class="sep">
          <div class="section-sub">Последние результаты</div>
          <div class="list">${student.progress.tests.slice(-5).reverse().map(t => `<div class="list-item"><span>${formatDateShort(t.date)}</span><strong>${t.correct}/${t.total} · ${t.percent}%</strong></div>`).join('')}</div>
        ` : ''}
      </div>
    `;
  }
  const item = active.tasks[active.index];
  const task = state.tasks.find(t => t.id === item.taskId);
  return `
    <div class="task-card">
      <div class="task-header">
        <div class="row"><span class="badge blue">Пробный тест</span><span class="badge">${active.index + 1} / ${active.tasks.length}</span></div>
        <button class="small-btn" onclick="cancelMockTest()">Отменить</button>
      </div>
      <h3 class="task-title">Задание ${task.number}. ${task.question}</h3>
      <div class="algo"><ol>${task.algorithm.map(step => `<li>${step}</li>`).join('')}</ol></div>
      <hr class="sep">
      ${task.type === 'extended' ? `
        <div class="notice">Это развёрнутый ответ. В MVP он выводится без автопроверки.</div>
        <div class="row"><button class="btn" onclick="nextMockTask()">Дальше</button></div>
      ` : `
        <div class="grid grid-2">
          <div><label>Твой ответ</label><input id="mock-answer" value="${item.userAnswer || ''}" placeholder="Введи ответ"></div>
          <div class="row" style="align-items:end"><button class="btn" onclick="submitMockAnswer()">Проверить и дальше</button></div>
        </div>
      `}
    </div>
  `;
}

function studentTariff(student) {
  return `
    <div class="grid grid-3">
      ${Object.entries(DEFAULT_TARIFFS).map(([key, value]) => `
        <div class="panel">
          <div class="row" style="justify-content:space-between"><h3 class="section-title" style="margin:0">${value.name}</h3>${student.tariff===key?'<span class="badge">Текущий</span>':''}</div>
          <p class="section-sub">${key==='free'?'Попробовать':'Доступ к расширенной версии продукта'}</p>
          <div class="list">
            <div class="list-item"><span>Заданий в день</span><strong>${value.tasksPerDay===Infinity?'∞':value.tasksPerDay}</strong></div>
            <div class="list-item"><span>AI-вопросов</span><strong>${value.aiPerDay===Infinity?'∞':value.aiPerDay}</strong></div>
            <div class="list-item"><span>Пробный тест</span><strong>${value.trial?'Да':'Нет'}</strong></div>
            <div class="list-item"><span>Родительская панель</span><strong>${value.parent?'Да':'Нет'}</strong></div>
          </div>
          <div class="spacer"></div>
          <button class="btn ${student.tariff===key?'secondary':''}" onclick="upgradeTariff('${key}')">${student.tariff===key?'Уже подключен':'Выбрать'}</button>
        </div>
      `).join('')}
    </div>
  `;
}

function studentProfile(student) {
  return `
    <div class="grid grid-2">
      <div class="panel">
        <h3 class="section-title">Профиль ученика</h3>
        <div class="list">
          <div class="list-item"><span>Имя</span><strong>${student.name}</strong></div>
          <div class="list-item"><span>Email</span><strong>${student.email}</strong></div>
          <div class="list-item"><span>Тариф</span><strong>${DEFAULT_TARIFFS[student.tariff].name}</strong></div>
          <div class="list-item"><span>Код для родителя</span><span class="code">${student.parentCode}</span></div>
          <div class="list-item"><span>Последняя активность</span><strong>${student.lastActiveAt ? formatDateShort(student.lastActiveAt.slice(0,10)) : 'ещё не было'}</strong></div>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Что дальше</h3>
        <div class="list">
          <div class="list-item"><span>Подключить оплату</span><span>ЮKassa / T-Bank</span></div>
          <div class="list-item"><span>Подключить OpenAI API</span><span>вместо локального AI</span></div>
          <div class="list-item"><span>Сделать push</span><span>через PWA</span></div>
        </div>
      </div>
    </div>
  `;
}

function parentView(parent) {
  const dashboard = apiState().parentDashboard;
  const tab = state.ui.parentTab || 'overview';
  return `
    <div class="container">
      ${header(parent)}
      <div class="nav-tabs">
        ${['overview','topics','tests','profile'].map(x => `<button class="tab-btn ${tab === x ? 'active' : ''}" onclick="setParentTab('${x}')">${parentTabLabel(x)}</button>`).join('')}
      </div>
      ${!dashboard ? '<div class="empty">Не удалось загрузить данные ученика. Попробуй позже.</div>' : ''}
      ${dashboard && tab==='overview' ? parentOverview(dashboard) : ''}
      ${dashboard && tab==='topics' ? parentTopics(dashboard) : ''}
      ${dashboard && tab==='tests' ? parentTests(dashboard) : ''}
      ${dashboard && tab==='profile' ? parentProfile(dashboard, parent) : ''}
      ${toastView()}
    </div>
  `;
}

function parentTabLabel(tab) { return ({overview:'Обзор', topics:'Темы', tests:'Тесты', profile:'Профиль'})[tab]; }

function parentOverview(dashboard) {
  return `
    <div class="grid grid-2">
      <div class="panel">
        <h3 class="section-title">Ребёнок занимается?</h3>
        <div class="stat-grid">
          <div class="stat"><div class="k">Всего заданий</div><div class="v">${dashboard.total_solved}</div></div>
          <div class="stat"><div class="k">Точность</div><div class="v">${Math.round(dashboard.accuracy_percent || 0)}%</div></div>
          <div class="stat"><div class="k">Дней подряд</div><div class="v">${dashboard.streak_days}</div></div>
          <div class="stat"><div class="k">Последняя активность</div><div class="v" style="font-size:20px">${dashboard.last_activity_at ? formatDateShort(dashboard.last_activity_at.slice(0,10)) : '—'}</div></div>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Короткий вывод</h3>
        <div class="algo">${parentSummary(dashboard)}</div>
      </div>
    </div>
  `;
}

function parentSummary(dashboard) {
  const topics = dashboard.topics || [];
  if (!dashboard.total_solved) return 'Пока активности почти нет. Важно помочь ребёнку начать с малого: 1–2 задания в день, чтобы появилась регулярность.';
  const weak = [...topics].sort((a,b)=>(a.accuracy_percent||0)-(b.accuracy_percent||0))[0];
  return `Сейчас ребёнок решает задания с точностью ${Math.round(dashboard.accuracy_percent || 0)}%. Наибольшее внимание стоит уделить теме «${weak?.topic || 'без данных'}». Важно сохранить регулярность и не пропускать дни.`;
}

function parentTopics(dashboard) {
  return `
    <div class="panel">
      <h3 class="section-title">Прогресс по темам</h3>
      <div class="list">
        ${(dashboard.topics || []).map(t => `<div><div class="row" style="justify-content:space-between"><strong>${t.topic}</strong><span>${t.correct_count}/${t.solved_count} · ${Math.round(t.accuracy_percent || 0)}%</span></div><div class="topic-bar"><div class="topic-fill" style="width:${Math.round(t.accuracy_percent || 0)}%"></div></div></div>`).join('')}
      </div>
    </div>
  `;
}

function parentTests(dashboard) {
  return `
    <div class="panel">
      <h3 class="section-title">Результаты тестов</h3>
      <div class="empty">В backend-каркасе пока нет отдельной витрины тестов для родителя. Этот экран можно подключить следующим шагом.</div>
    </div>
  `;
}

function parentProfile(dashboard, parent) {
  return `
    <div class="grid grid-2">
      <div class="panel">
        <h3 class="section-title">Профиль родителя</h3>
        <div class="list">
          <div class="list-item"><span>Имя</span><strong>${parent.name}</strong></div>
          <div class="list-item"><span>Email</span><strong>${parent.email}</strong></div>
          <div class="list-item"><span>Подключённый ученик</span><strong>${dashboard.student_name}</strong></div>
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">Ценность для родителя</h3>
        <div class="algo">Вы видите не только факт оплаты, а реальную динамику подготовки: активность, точность, слабые темы и результаты тестов.</div>
      </div>
    </div>
  `;
}


function adminView(admin) {
  const tab = state.ui.adminTab || 'tasks';
  return `
    <div class="container">
      ${header(admin)}
      <div class="nav-tabs">
        ${['tasks','users','billing','stats'].map(x => `<button class="tab-btn ${tab===x?'active':''}" onclick="setAdminTab('${x}')">${adminTabLabel(x)}</button>`).join('')}
      </div>
      ${tab==='tasks' ? adminTasks() : ''}
      ${tab==='users' ? adminUsers() : ''}
      ${tab==='billing' ? adminBilling() : ''}
      ${tab==='stats' ? adminStats() : ''}
      ${toastView()}
    </div>
  `;
}

function adminTabLabel(tab) { return ({tasks:'Задания', users:'Пользователи', billing:'Подписки', stats:'Статистика'})[tab]; }

function adminTasks() {
  const editingTask = state.ui.editingTaskId ? state.tasks.find(t => t.id === state.ui.editingTaskId) : null;
  return `
    <div class="grid grid-2">
      <div class="panel">
        <h3 class="section-title">Список заданий</h3>
        <div class="list" style="max-height:70vh;overflow:auto">
          ${state.tasks.map(t => `<div class="list-item"><span>#${t.number} · ${t.topic}</span><div class="row"><button class="small-btn" onclick="editTask('${t.id}')">Изменить</button><button class="small-btn" onclick="deleteTask('${t.id}')">Удалить</button></div></div>`).join('')}
        </div>
      </div>
      <div class="panel">
        <h3 class="section-title">${editingTask ? 'Редактировать задание' : 'Новое задание'}</h3>
        <div class="grid">
          <div><label>Номер</label><input id="admin-task-number" type="number" min="1" max="24" value="${editingTask?.number ?? 1}"></div>
          <div><label>Тема</label><select id="admin-task-topic">${TOPICS.map(t => `<option ${editingTask?.topic===t?'selected':''}>${t}</option>`).join('')}</select></div>
          <div><label>Тип</label><select id="admin-task-type"><option value="test" ${editingTask?.type==='test'?'selected':''}>test</option><option value="extended" ${editingTask?.type==='extended'?'selected':''}>extended</option></select></div>
          <div><label>Вопрос</label><textarea id="admin-task-question">${editingTask?.question ?? ''}</textarea></div>
          <div><label>Алгоритм (каждый шаг с новой строки)</label><textarea id="admin-task-algo">${editingTask?.algorithm?.join('\n') ?? ''}</textarea></div>
          <div><label>Правильный ответ</label><input id="admin-task-answer" value="${editingTask?.answer ?? ''}"></div>
          <div class="row"><button class="btn" onclick="saveTask()">Сохранить</button>${editingTask ? '<button class="btn secondary" onclick="cancelEditTask()">Отмена</button>' : ''}</div>
        </div>
      </div>
    </div>
  `;
}

function adminUsers() {
  return `
    <div class="panel">
      <h3 class="section-title">Пользователи</h3>
      <div class="list">${state.users.filter(u => u.role !== 'admin').map(u => `<div class="list-item"><span>${u.name} · ${u.role}</span><span>${u.email}</span></div>`).join('')}</div>
    </div>
  `;
}

function adminBilling() {
  return `
    <div class="panel">
      <h3 class="section-title">Ручная активация подписок</h3>
      <div class="list">${state.users.filter(u => u.role === 'student').map(u => `<div class="list-item"><span>${u.name}</span><div class="row"><span class="badge blue">${DEFAULT_TARIFFS[u.tariff].name}</span><button class="small-btn" onclick="setUserTariff('${u.id}','free')">Free</button><button class="small-btn" onclick="setUserTariff('${u.id}','base')">Base</button><button class="small-btn" onclick="setUserTariff('${u.id}','pro')">PRO</button></div></div>`).join('')}</div>
    </div>
  `;
}

function adminStats() {
  const students = state.users.filter(u => u.role === 'student');
  const totalAttempts = students.reduce((acc, s) => acc + s.progress.attempts.length, 0);
  const totalTests = students.reduce((acc, s) => acc + s.progress.tests.length, 0);
  return `
    <div class="stat-grid">
      <div class="stat"><div class="k">Учеников</div><div class="v">${students.length}</div></div>
      <div class="stat"><div class="k">Заданий в базе</div><div class="v">${state.tasks.length}</div></div>
      <div class="stat"><div class="k">Попыток</div><div class="v">${totalAttempts}</div></div>
      <div class="stat"><div class="k">Пробных тестов</div><div class="v">${totalTests}</div></div>
    </div>
  `;
}

function render() {
  const app = document.getElementById('app');
  const user = getCurrentUser();
  if (!user) {
    app.innerHTML = authView();
    setupMotionScene();
    return;
  }
  if (user.role === 'student') app.innerHTML = studentView(user);
  if (user.role === 'parent') app.innerHTML = parentView(user);
  if (user.role === 'admin') app.innerHTML = adminView(user);
  setupMotionScene();
}

function openAuth(kind) { state.ui.showModal = 'auth:' + kind; saveState(); render(); }
function hideModal() { state.ui.showModal = null; saveState(); render(); }
function closeModal(e) { if (e.target.classList.contains('modal')) hideModal(); }
function submitLogin() { login(document.getElementById('login-email').value, document.getElementById('login-password').value); }
function submitRegisterStudent() { registerStudent(document.getElementById('reg-s-name').value, document.getElementById('reg-s-email').value, document.getElementById('reg-s-pass').value); }
function submitRegisterParent() { registerParent(document.getElementById('reg-p-name').value, document.getElementById('reg-p-email').value, document.getElementById('reg-p-pass').value, document.getElementById('reg-p-code').value); }
function setStudentTab(tab) { state.ui.studentTab = tab; saveState(); render(); }
function setParentTab(tab) { state.ui.parentTab = tab; saveState(); render(); }
function setAdminTab(tab) { state.ui.adminTab = tab; saveState(); render(); }
function openTaskByNumber(n) { state.ui.selectedTaskNumber = n; openTask(); }

async function openTask() {
  const user = getCurrentUser();
  const number = Number(document.getElementById('task-number')?.value || state.ui.selectedTaskNumber || 1);
  state.ui.selectedTaskNumber = number;
  if (!user || user.role !== 'student') return;
  const tariff = getTariff(user);
  resetDailyUsage(user);
  if (tariff.tasksPerDay !== Infinity && user.tasksUsage.count >= tariff.tasksPerDay) return setToast('Лимит заданий на сегодня исчерпан', 'warn');
  try {
    const [task, bundle] = await Promise.all([
      apiFetch(`/tasks/random?number=${number}`),
      getAlgorithmBundle(number).catch(() => null)
    ]);
    user.tasksUsage.count += 1;
    apiState().currentTask = normalizeTask(task);
    apiState().algorithmBundles[number] = bundle;
    apiState().latestShortCard = bundle?.mobile_short_card || null;
    state.ui.currentTaskId = apiState().currentTask.id;
    state.ui.taskAnswer = '';
    saveState();
    render();
  } catch (e) {
    setToast(e.message || 'Задание не найдено', 'danger');
  }
}
function openRandomTask() { state.ui.selectedTaskNumber = 1 + Math.floor(Math.random() * 24); saveState(); openTask(); }
async function checkTaskAnswer(taskId) {
  const user = getCurrentUser();
  const task = normalizeTask(apiState().currentTask || state.tasks.find(t => t.id === taskId));
  const value = document.getElementById('task-answer').value;
  try {
    const result = await apiFetch(`/tasks/${task.id}/check-answer`, { method: 'POST', body: JSON.stringify({ answer: value }) });
    if (!result.is_open_answer) createAttempt(user, task, value, result.is_correct);
    user.lastActiveAt = new Date().toISOString();
    await refreshStudentCaches();
    saveState();
    render();
    setToast(result.message || (result.is_correct ? 'Верно.' : 'Неверно. Попробуй ещё раз.'), result.is_correct ? 'info' : 'danger');
  } catch (e) {
    setToast(e.message || 'Не удалось проверить ответ', 'danger');
  }
}
async function sendMentor() {
  const user = getCurrentUser();
  const input = document.getElementById('mentor-input').value.trim();
  if (!input) return;
  const tariff = getTariff(user);
  resetDailyUsage(user);
  if (tariff.aiPerDay !== Infinity && user.aiUsage.count >= tariff.aiPerDay) return setToast('Лимит AI-вопросов на сегодня исчерпан', 'warn');
  try {
    const api = apiState();
    api.mentorChat.push({role:'user', text: input});
    const result = await apiFetch('/ai/chat', { method: 'POST', body: JSON.stringify({ message: input }) });
    api.mentorChat.push({role:'ai', text: result.answer});
    if (result.remaining_today != null && tariff.aiPerDay !== Infinity) user.aiUsage.count = Math.max(tariff.aiPerDay - result.remaining_today, 0);
    else user.aiUsage.count += 1;
    user.mentorChat = api.mentorChat;
    saveState();
    render();
  } catch (e) {
    setToast(e.message || 'AI временно недоступен', 'danger');
  }
}
function quickMentor(text) {
  document.getElementById('mentor-input').value = text;
  sendMentor();
}
async function savePlan() {
  const user = getCurrentUser();
  const examDate = document.getElementById('plan-date').value;
  const targetScore = Number(document.getElementById('plan-score').value || 60);
  const minutes = Number(document.getElementById('plan-minutes').value || 30);
  const notifyTime = document.getElementById('plan-time').value || '20:00';
  if (!examDate) return setToast('Выбери дату экзамена', 'danger');
  try {
    const plan = await apiFetch('/plans/create', { method: 'POST', body: JSON.stringify({ exam_date: examDate, target_score: targetScore, daily_minutes: minutes, notification_time: notifyTime + ':00' }) });
    apiState().currentPlan = plan;
    user.plan = plan;
    saveState(); render(); setToast('План сохранён');
  } catch (e) {
    setToast(e.message || 'Не удалось сохранить план', 'danger');
  }
}
function clearPlan() { const user = getCurrentUser(); user.plan = null; saveState(); render(); }
function startMockTest() { const user = getCurrentUser(); createMockTest(user); saveState(); render(); }
function cancelMockTest() { state.ui.activeMockTest = null; saveState(); render(); }
function nextMockTask() {
  const user = getCurrentUser();
  const active = state.ui.activeMockTest;
  active.index += 1;
  if (active.index >= active.tasks.length) return finishMockTest(user);
  saveState(); render();
}
function submitMockAnswer() {
  const user = getCurrentUser();
  const active = state.ui.activeMockTest;
  const item = active.tasks[active.index];
  const task = state.tasks.find(t => t.id === item.taskId);
  const input = document.getElementById('mock-answer').value;
  item.userAnswer = input;
  item.checked = true;
  item.correct = sanitize(input) === sanitize(task.answer);
  createAttempt(user, task, input, item.correct);
  active.index += 1;
  if (active.index >= active.tasks.length) return finishMockTest(user);
  saveState(); render();
}
function upgradeTariff(key) { const user = getCurrentUser(); user.tariff = key; saveState(); render(); setToast(`Подключен тариф: ${DEFAULT_TARIFFS[key].name}`); }
function formatDateShort(iso) { const d = new Date(iso + 'T00:00:00'); return d.toLocaleDateString('ru-RU', {day:'2-digit', month:'2-digit'}); }
function editTask(id) { state.ui.editingTaskId = id; saveState(); render(); }
function cancelEditTask() { state.ui.editingTaskId = null; saveState(); render(); }
function saveTask() {
  const data = {
    number: Number(document.getElementById('admin-task-number').value),
    topic: document.getElementById('admin-task-topic').value,
    type: document.getElementById('admin-task-type').value,
    question: document.getElementById('admin-task-question').value,
    algorithm: document.getElementById('admin-task-algo').value.split('\n').map(s => s.trim()).filter(Boolean),
    answer: document.getElementById('admin-task-answer').value
  };
  if (!data.question || !data.algorithm.length) return setToast('Заполни вопрос и алгоритм', 'danger');
  if (state.ui.editingTaskId) {
    const task = state.tasks.find(t => t.id === state.ui.editingTaskId);
    Object.assign(task, data);
  } else {
    state.tasks.push({id: uid('task'), ...data});
  }
  state.ui.editingTaskId = null; saveState(); render(); setToast('Задание сохранено');
}
function deleteTask(id) { state.tasks = state.tasks.filter(t => t.id !== id); saveState(); render(); setToast('Задание удалено'); }
function setUserTariff(id, tariff) { const user = state.users.find(u => u.id === id); user.tariff = tariff; saveState(); render(); setToast('Тариф обновлён'); }

window.logout = logout;
window.openAuth = openAuth;
window.hideModal = hideModal;
window.closeModal = closeModal;
window.submitLogin = submitLogin;
window.submitRegisterStudent = submitRegisterStudent;
window.submitRegisterParent = submitRegisterParent;
window.setStudentTab = setStudentTab;
window.setParentTab = setParentTab;
window.setAdminTab = setAdminTab;
window.openTask = openTask;
window.openRandomTask = openRandomTask;
window.openTaskByNumber = openTaskByNumber;
window.checkTaskAnswer = checkTaskAnswer;
window.sendMentor = sendMentor;
window.quickMentor = quickMentor;
window.savePlan = savePlan;
window.clearPlan = clearPlan;
window.startMockTest = startMockTest;
window.cancelMockTest = cancelMockTest;
window.nextMockTask = nextMockTask;
window.submitMockAnswer = submitMockAnswer;
window.upgradeTariff = upgradeTariff;
window.editTask = editTask;
window.cancelEditTask = cancelEditTask;
window.saveTask = saveTask;
window.deleteTask = deleteTask;
window.setUserTariff = setUserTariff;


function setupMotionScene() {
  if (window.__easyOgeMotionBound) return;
  window.__easyOgeMotionBound = true;
  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    const spotlight = document.querySelector('.scene-spotlight');
    if (spotlight) {
      spotlight.style.setProperty('--mx', x + '%');
      spotlight.style.setProperty('--my', y + '%');
    }
    const rx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ry = (e.clientY / window.innerHeight - 0.5) * 2;
    document.querySelectorAll('.motion-orb-target').forEach((node) => {
      const depth = Number(node.dataset.depth || 10);
      node.style.transform = `translate3d(${rx * depth}px, ${ry * depth * -1}px, 0)`;
    });
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

render();
setupMotionScene();
bootstrapSession();


document.addEventListener('click', async (event) => {
  const algoBtn = event.target.closest('[data-open-algorithm]');
  if (algoBtn) {
    const taskNumber = algoBtn.getAttribute('data-open-algorithm');
    if (taskNumber) {
      await openAlgorithmTemplate(taskNumber);
    }
  }
});
