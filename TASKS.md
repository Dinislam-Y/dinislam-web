# Задачи по улучшению анимаций и переходов

## Источник вдохновения: [davidlangarica.dev](https://www.davidlangarica.dev/)

Awwwards Honorable Mention. Next.js + Framer Motion + Three.js + Lenis + GSAP.
Мы берём лучшие анимационные приёмы и адаптируем их под наш стек и структуру.

---

## Наш текущий стек

- **Next.js 16** (App Router, `[locale]` routing)
- **Framer Motion 12** — анимации компонентов
- **GSAP 3.14** + ScrollTrigger + ScrollToPlugin — scroll-анимации
- **Lenis** — smooth scroll
- **Tailwind CSS 4** + globals.css — стили
- **tsparticles** — фоновые частицы
- **next-intl** — i18n (en/ru)
- **Цветовая схема:** dark (#050505), accent green (#00e5a0), accent blue (#0ea5e9)

## Наши компоненты (справка)

```
src/components/
├── layout/
│   ├── Navbar.tsx          — навигация, GSAP-underline, IntersectionObserver
│   ├── Footer.tsx          — подвал
│   └── ScrollProgress.tsx  — полоса прогресса скролла
├── sections/
│   ├── HeroSection.tsx     — главный экран (TextReveal, MagneticButton, Particles, FallingElements, FloatingSnippets)
│   ├── AboutSection.tsx    — timeline + AnimatedCounter + GlassCard
│   ├── SkillsSection.tsx   — сетка навыков + TiltCard
│   ├── ProjectsSection.tsx — горизонтальная прокрутка проектов
│   └── ContactSection.tsx  — форма + соцсети
├── ui/
│   ├── CustomCursor.tsx    — кастомный курсор (spring physics)
│   ├── SmoothScroll.tsx    — Lenis + GSAP sync
│   ├── ScrollStack.tsx     — stacking-эффект Hero→About
│   ├── HorizontalScroll.tsx— горизонтальный скролл проектов
│   ├── TextReveal.tsx      — побуквенное появление текста
│   ├── MagneticButton.tsx  — магнитная кнопка
│   ├── TiltCard.tsx        — 3D-перспектива на hover
│   ├── GlassCard.tsx       — glassmorphism-карточка
│   ├── AnimatedCounter.tsx — анимация чисел
│   ├── ParticlesBackground.tsx — tsparticles фон
│   ├── FallingElements.tsx — падающие фигуры
│   ├── FloatingSnippets.tsx— летающие карточки метрик
│   └── TypeWriter.tsx      — эффект печатной машинки (не используется)
└── LanguageSwitcher.tsx    — переключатель en/ru
```

---

## Правила работы

1. **Не ломать существующее.** Каждое изменение должно быть обратно совместимым. Если что-то уже работает — не трогай без причины.
2. **Один таск = один PR-ready коммит.** Каждый чеклист-пункт — это логически завершённое изменение.
3. **Сохраняй наш стек.** Не добавляй Three.js или другие тяжёлые зависимости без явного согласования. Работаем с тем, что есть: Framer Motion, GSAP, Lenis, tsparticles.
4. **Не дублируй код.** Если создаёшь новый UI-компонент — он должен быть переиспользуемым.
5. **Accessibility.** Все анимации должны уважать `prefers-reduced-motion`. Добавляй `aria-hidden="true"` на декоративные элементы.
6. **Performance.** Используй `will-change` только на анимируемых элементах. Анимируй только `transform` и `opacity` где возможно. Не используй `layout` анимации без необходимости.
7. **i18n.** Весь новый текст должен идти через `useTranslations()` и добавляться в оба файла: `messages/en.json` и `messages/ru.json`.
8. **Mobile-first.** Все новые элементы должны работать на мобильных. Тяжёлые анимации отключай на `max-width: 768px`.

---

## Задача 1: Загрузочный экран (Loader)

**Что на davidlangarica.dev:**
- Полноэкранный экран загрузки с именем и счётчиком прогресса 0→100
- Две "шторки" (clip-divs) сверху и снизу расходятся как занавес
- После загрузки шторки разъезжаются, раскрывая основной контент
- `overflow: hidden` на body во время загрузки, затем разблокируется

**Что нужно сделать:**

- [ ] Создать компонент `src/components/ui/PageLoader.tsx`
  - Полноэкранный overlay (`fixed, z-50, inset-0`)
  - Текст имени: "DINISLAM" или имя/фамилия — с `opacity: 0→1`, `transform: none`
  - Счётчик прогресса: анимация числа от 0 до 100 (requestAnimationFrame или AnimatedCounter)
  - Две "шторки": верхняя (`transform-origin: top`) и нижняя (`transform-origin: bottom`)
  - После завершения загрузки: шторки уходят (scaleY: 1→0), overlay скрывается
  - Тело страницы `overflow: hidden` во время загрузки, затем `overflow: auto`
- [ ] Подключить `PageLoader` в `src/app/[locale]/layout.tsx` — оборачивать основной контент
- [ ] Добавить CSS-стили для loader в `globals.css` (или CSS Modules)
- [ ] `prefers-reduced-motion`: loader сразу скрывается, без анимации

**Ожидаемый результат:** При первой загрузке страницы пользователь видит элегантный занавес с именем и прогрессом, который раскрывается, показывая сайт.

---

## Задача 2: Hero-секция — улучшение анимаций

**Что на davidlangarica.dev:**
- "Creative" появляется сверху: `opacity: 0→1`, `translateY(-40px→0)`
- "Engineer" появляется снизу: `translateY(40px→0)` с задержкой 0.31s
- Карусель профессий между ними (ротация: Web Developer, UX/UI Designer, Software Engineer)
- "Scroll to know more" — подсказка внизу

**Что нужно сделать:**

- [ ] Улучшить анимацию появления заголовка в `HeroSection.tsx`:
  - Первая строка (имя): `translateY(-40px)→0`, `opacity: 0→1`, задержка после loader
  - Вторая строка (роль): `translateY(40px)→0`, `opacity: 0→1`, задержка +0.3s
  - Использовать Framer Motion `motion.span` с `variants` и `staggerChildren`
- [ ] Добавить карусель ролей/специализаций:
  - Ротация текстов: "Senior SDET", "QA Automation Engineer", "Flutter Developer" (или свои)
  - AnimatePresence для плавной смены текста (fade out up → fade in up)
  - Автоматическая смена каждые 3 секунды
- [ ] "Scroll to know more" — добавить текст-подсказку в низ Hero:
  - Анимация: лёгкое bounce вверх-вниз (infinite)
  - Появляется с задержкой 1.5s после основных анимаций
- [ ] Связать появление Hero-анимаций с завершением Loader (задача 1)

**Ожидаемый результат:** Hero-секция оживает поэтапно — сначала loader раскрывается, затем имя, затем роль, затем карусель и CTA.

---

## Задача 3: About-секция — blur/deblur и scale-on-scroll

**Что на davidlangarica.dev:**
- Имя появляется из blur: `filter: blur(15px)→blur(0)`, `opacity: 0→1`, `translateY(50px→0)`
- Контент-блок масштабируется на скролле: `transform: scale(0.8)→scale(1)` через `will-change: transform`
- Слово "magic" — анимация: `letter-spacing: 100px→normal` + `blur(10px→0)`, sparkle ✦
- Разделительная линия анимируется по ширине при скролле

**Что нужно сделать:**

- [ ] Добавить blur-reveal анимацию для заголовка About:
  - `TextReveal.tsx` уже поддерживает blur — убедиться что `filter: blur(15px)→0` работает
  - Или: добавить вариант `blurReveal` к TextReveal с более агрессивным blur
- [ ] Добавить scale-on-scroll для контент-блока About:
  - GSAP ScrollTrigger: `scrub: true`, `start: "top bottom"`, `end: "top center"`
  - `scale: 0.85→1` при прокрутке секции в viewport
  - `will-change: transform` на контейнере
- [ ] (Опционально) Добавить "magic-word" эффект:
  - Выбрать ключевое слово в bio-тексте
  - Анимация: `letter-spacing: 50px→0`, `blur(10px→0)`, `opacity: 0→1`
  - Sparkle-символы `✦` рядом со словом (Framer Motion scale + rotate)
- [ ] Анимированная разделительная линия:
  - `scaleX: 0→1` при скролле через GSAP ScrollTrigger
  - accent-gradient фон

**Ожидаемый результат:** About-секция ощущается "живой" — элементы появляются из размытия, контент масштабируется, ключевые слова акцентированы.

---

## Задача 4: Секция проектов — анимации карточек

**Что на davidlangarica.dev:**
- Названия проектов анимируются: `opacity: 0.5→1`, `scale(0.6)→scale(1)`, смена font-weight
- У каждого проекта свой цвет (#7888de, #ffe2c7, #e3c7ff и т.д.)
- Hover: плавные transition на разделителях (scaleY, opacity)
- Тумбнейлы проектов с hover-масштабированием

**Что нужно сделать:**

- [ ] Улучшить анимацию карточек в `ProjectsSection.tsx`:
  - При скролле в viewport: `opacity: 0.5→1`, `scale(0.85)→1` с stagger 0.15s между карточками
  - Framer Motion `whileInView` с `viewport: { once: true, amount: 0.3 }`
- [ ] Добавить уникальный accent-цвет для каждого проекта:
  - В `src/data/projects.ts` — добавить поле `accentColor` к каждому проекту
  - Цвет используется для бордера/подсветки карточки при hover
- [ ] Hover-эффекты на карточках:
  - `scale: 1.02` на hover (через Framer Motion `whileHover`)
  - Glow-border с цветом проекта (через CSS box-shadow или gradient border)
  - Тумбнейл: `scale: 1.05` на hover с `overflow: hidden` на контейнере
- [ ] Разделители между проектами:
  - Горизонтальная линия с `scaleX: 0→1` при появлении
  - На hover карточки: линия меняет цвет на accent проекта

**Ожидаемый результат:** Секция проектов выглядит динамично — карточки появляются каскадом, каждый проект визуально отличается цветом, hover-эффекты дают тактильную обратную связь.

---

## Задача 5: Contact-секция — микроанимации

**Что на davidlangarica.dev:**
- Copy-to-clipboard для email с визуальным feedback
- Кнопка "Discovery Call" с hover-анимацией
- Соцссылки с hover-transition
- Spinner и fadeIn анимации

**Что нужно сделать:**

- [ ] Добавить copy-to-clipboard для email:
  - По клику на email — копируется в буфер обмена
  - Визуальный feedback: текст меняется на "Copied!" с fadeIn/fadeOut (2 секунды)
  - Иконка копирования рядом с email
- [ ] Улучшить hover-анимации соцсылок:
  - `scale: 1.1` + `color` переход на accent при hover
  - Framer Motion `whileHover` + `whileTap: { scale: 0.95 }`
- [ ] Анимация появления секции Contact:
  - Заголовок: blur-reveal (как в About)
  - Форма/контент: `translateY(30px)→0`, `opacity: 0→1`, stagger 0.1s по элементам
- [ ] Кнопка отправки — MagneticButton с loading-state:
  - При отправке: spinner внутри кнопки
  - После отправки: текст меняется на "Sent!" с checkmark-иконкой

**Ожидаемый результат:** Contact-секция интерактивна — клик копирует email, ховеры отзывчивы, отправка формы имеет состояния.

---

## Задача 6: Глобальные переходы между секциями

**Что на davidlangarica.dev:**
- NProgress bar при переходах между страницами (blur-эффект)
- Плавные scroll-переходы между секциями
- Фон плавно меняет градиент при скролле

**Что нужно сделать:**

- [ ] Улучшить ScrollStack:
  - Hero → About: Hero плавно уходит в `scale(0.9)` + `opacity: 0.3` пока About наезжает сверху
  - Текущая реализация в `ScrollStack.tsx` — проверить и улучшить timing/easing
- [ ] Добавить фоновый градиент, реагирующий на скролл:
  - В `globals.css` или отдельном компоненте
  - Цвет фона плавно меняется при прокрутке секций (от #050505 к чуть более светлому/цветному)
  - GSAP ScrollTrigger с scrub для плавности
- [ ] ScrollProgress bar — улучшить:
  - Добавить `blur(4px)` тень под полосой прогресса (как NProgress)
  - Полоса должна использовать accent-gradient
- [ ] Smooth anchor-scroll через Navbar:
  - Убедиться что Lenis корректно скроллит к секциям при клике на nav-ссылки
  - Добавить `offset` чтобы секция не упиралась в самый верх

**Ожидаемый результат:** Весь сайт ощущается как единое перетекающее пространство — секции плавно сменяют друг друга, фон дышит, навигация мгновенна.

---

## Задача 7: Навигация — улучшения

**Что на davidlangarica.dev:**
- Навигация с разделителями-точками между пунктами
- Активный пункт: `border-bottom` с accent-цветом
- Мобильное меню: fullscreen с `backdrop-filter: blur(60px)`
- Языковой переключатель интегрирован в навбар
- Кнопка скролла наверх (bounce-анимация)

**Что нужно сделать:**

- [ ] Добавить разделители-точки между nav-пунктами (desktop):
  - Маленький круг `w-1 h-1 rounded-full bg-foreground/50` между каждым пунктом
- [ ] Мобильное меню — усилить backdrop blur:
  - `backdrop-filter: blur(40px)` или `blur(60px)` для более "матового" эффекта
  - Фон: `rgba(5, 5, 5, 0.5)` — полупрозрачный
- [ ] Scroll-to-top кнопка:
  - Появляется после скролла ниже Hero-секции
  - `position: fixed`, `bottom-right`
  - Bounce-анимация: `translateY(0) → translateY(-10px) → translateY(0)` infinite
  - onClick: Lenis scroll к `#home`
- [ ] Active nav item — анимировать underline:
  - Текущий GSAP-underline — убедиться что transition плавный
  - Ширина underline плавно перемещается между пунктами (не прыгает)

**Ожидаемый результат:** Навигация выглядит отполированной — точки-разделители, матовый мобильный фон, плавные переходы underline.

---

## Задача 8: Типографика и микро-детали

**Что на davidlangarica.dev:**
- Огромные заголовки: `clamp(6.5rem, 5rem + 7vw, 14rem)`, font-weight: 100
- Кастомный скроллбар: фиолетовый, закруглённый
- Spotify виджет — "Now playing" с обложкой альбома
- Sparkle-символы ✦ для акцентирования

**Что нужно сделать:**

- [ ] Проверить и улучшить типографику заголовков:
  - Заголовки секций — clamp для fluid-размера (уже есть в TextReveal/sectionH2?)
  - Убедиться что `font-weight` оптимальна для каждого уровня
- [ ] Кастомный скроллбар (в нашей палитре):
  - Track: `#0a0a0a` (наш surface)
  - Thumb: accent-gradient (green→blue)
  - Thumb:hover: более яркий gradient
  - `border-radius: 7px`
  - Добавить в `globals.css`
- [ ] (Опционально) Sparkle-эффекты:
  - Создать компонент `Sparkle.tsx` — SVG/символ `✦`
  - Framer Motion: `scale(0→1)`, `rotate(0→180)` с spring-physics
  - Использовать рядом с ключевыми заголовками или CTA

**Ожидаемый результат:** Типографика чёткая и масштабируемая, скроллбар стилизован под дизайн, мелкие детали добавляют "polish".

---

## Порядок выполнения (рекомендуемый)

```
1. Задача 8 (типографика, скроллбар) — быстрая, улучшает общий вид
2. Задача 1 (Loader) — первое впечатление
3. Задача 2 (Hero) — главный экран
4. Задача 6 (переходы между секциями) — связность
5. Задача 3 (About) — blur/scale анимации
6. Задача 4 (Projects) — карточки
7. Задача 7 (Navigation) — полировка
8. Задача 5 (Contact) — микроанимации
```

---

## Чеклист перед каждым изменением

- [ ] Прочитать текущий код файла, который буду менять
- [ ] Проверить что изменение не ломает i18n (en/ru)
- [ ] Проверить mobile-версию (responsive)
- [ ] `prefers-reduced-motion` — уважать предпочтение пользователя
- [ ] Не добавлять новые npm-зависимости без причины
- [ ] Если меняю анимацию — убедиться что easing и duration консистентны с остальным сайтом
- [ ] Протестировать в dev-режиме перед commit
