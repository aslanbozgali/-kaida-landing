/**
 * Единственный источник фактов о Kaida App для лендинга.
 * Все цифры и тексты — только из CLAUDE.md или явно предоставленные пользователем
 * (утверждённые дизайн-макеты). Ничего не добавлять и не менять здесь без подтверждения.
 */

export type IconKey =
  | "people"
  | "tag"
  | "percent"
  | "qr"
  | "coffee"
  | "food-dome"
  | "burger"
  | "joystick"
  | "house-tree"
  | "bicycle"
  | "star-medal"
  | "gift"
  | "pin"
  | "check";

export const stats = [
  { value: "100+", label: "партнёров", icon: "people" as IconKey },
  { value: "220+", label: "акций", icon: "tag" as IconKey },
  { value: "до 30%", label: "скидки", icon: "percent" as IconKey },
] as const;

export const whyKaida = [
  {
    icon: "people" as IconKey,
    value: "100+",
    title: "партнёров",
    description: "Кафе, рестораны, развлечения и многое другое в одном приложении.",
  },
  {
    icon: "tag" as IconKey,
    value: "220+",
    title: "акций",
    description: "Скидки, подарки и специальные предложения от партнёров Kaida.",
  },
  {
    icon: "percent" as IconKey,
    value: "до 30%",
    title: "скидки",
    description: "Экономь на любимых местах и получай больше за те же деньги.",
  },
  {
    icon: "qr" as IconKey,
    value: "QR",
    title: "без купонов",
    description: "Все акции активируются по QR-коду прямо в заведении.",
  },
] as const;

export const howItWorks = [
  {
    step: "1",
    title: "Выбери заведение",
    description: "Найди любимое заведение в каталоге или на карте.",
    image: "/screens/favorites-step.png",
  },
  {
    step: "2",
    title: "Выбери акцию",
    description: "Ознакомься с доступными акциями и выбери подходящую.",
    image: "/screens/partner-detail.png",
  },
  {
    step: "3",
    title: "Покажи QR-код",
    description: "На входе покажи QR-код для активации акции.",
    image: "/screens/qr.png",
  },
  {
    step: "4",
    title: "Получи скидку",
    description: "Акция активирована! Наслаждайся бонусами.",
    image: "/screens/offer-detail.png",
  },
] as const;

/** Категории заведений — подтверждено пользователем (CLAUDE.md). */
export const categories = [
  { icon: "coffee" as IconKey, title: "Кафе", count: "Более 100 заведений" },
  { icon: "food-dome" as IconKey, title: "Рестораны", count: "Более 80 заведений" },
  { icon: "burger" as IconKey, title: "Фастфуд", count: "Более 60 заведений" },
  { icon: "joystick" as IconKey, title: "Cyber-клубы", count: "Более 20 клубов" },
  { icon: "house-tree" as IconKey, title: "Базы отдыха", count: "Более 30 мест" },
  { icon: "bicycle" as IconKey, title: "Активный отдых", count: "Более 50 мест" },
] as const;

export const offerTypes = [
  {
    title: "Welcome-скидка",
    value: "от 20%",
    description: "Действует один раз — отличный повод познакомиться с заведением.",
  },
  {
    title: "Скидка постоянного гостя",
    value: "от 10%",
    description: "Возвращайся и экономь снова — скидка работает при каждом визите.",
  },
  {
    title: "Подарки",
    value: "при условиях",
    description: "Выполняй условия заведения и получай подарки к заказу.",
  },
] as const;

export const subscriptionBenefits = [
  "Доступ ко всем акциям партнёров Kaida",
  "Скидки до 30% в каждом заведении",
  "Подарки от партнёров при выполнении условий",
  "Активация предложений прямо в заведении по QR-коду",
] as const;

export const pricingPlans = [
  {
    duration: "3 месяца",
    price: "2 990 ₸",
    highlighted: false,
  },
  {
    duration: "6 месяцев",
    price: "4 990 ₸",
    highlighted: false,
  },
  {
    duration: "12 месяцев",
    price: "7 990 ₸",
    highlighted: true,
    badge: "Выгоднее всего",
  },
] as const;

/**
 * Реальные названия заведений-партнёров — из скриншотов приложения
 * и подтверждённые пользователем. Список неполный (100+ заведений),
 * новые названия не придумывать. Логотип указан там, где файл предоставлен пользователем —
 * остальные партнёры пока отображаются как typography-аватар (первая буква названия).
 */
export const partners = [
  { name: "Mogol Coffee", logo: "/partners/mogol.png" },
  { name: "Point bowling bar & karaoke", logo: "/partners/point-bowling.png" },
  { name: "Jide", logo: "/partners/jide.png" },
  { name: "Tokki", logo: null },
  { name: "Grill Town", logo: "/partners/grill-town.png" },
  { name: "Gaia", logo: "/partners/gaia.png" },
  { name: "Pantone", logo: "/partners/pantone.png" },
  { name: "Libe", logo: "/partners/libe.png" },
  { name: "La Mia Pasta", logo: "/partners/la-mia-pasta.png" },
  { name: "Girex", logo: "/partners/girex.png" },
  { name: "Pacman Game Center", logo: "/partners/pacman.png" },
  { name: "Ochag Cafe & Lounge", logo: "/partners/ochag.png" },
  { name: "Odyssey Bar & Kitchen", logo: "/partners/odyssey.png" },
  { name: "Harat's Irish Pub", logo: "/partners/harats.png" },
] as const;

/** Отзывы пользователей — подтверждены пользователем как реальные (CLAUDE.md). */
export const testimonials = [
  {
    name: "Аружан",
    initial: "А",
    date: "Актобе, июнь 2026",
    rating: 5,
    text: "Kaida App реально выручает! Столько классных скидок и акций в одном месте. Очень удобно и понятно.",
    helpful: 24,
  },
  {
    name: "Максат",
    initial: "М",
    date: "Актобе, май 2026",
    rating: 5,
    text: "Пользуюсь каждый день. Интерфейс удобный, быстро нахожу нужные места и получаю классные бонусы.",
    helpful: 18,
  },
  {
    name: "Салтанат",
    initial: "С",
    date: "Актобе, апрель 2026",
    rating: 5,
    text: "Отличное приложение для тех, кто любит выгодные предложения. Уже окупила свою подписку в первый же месяц!",
    helpful: 31,
  },
  {
    name: "Ербол",
    initial: "Е",
    date: "Актобе, март 2026",
    rating: 5,
    text: "Много интересных мест, о которых раньше не знал. Kaida App помогает экономить и открывать новое.",
    helpful: 15,
  },
] as const;

export const finalCtaBenefits = [
  { icon: "tag" as IconKey, label: "Скидки до 30%" },
  { icon: "gift" as IconKey, label: "Подарки от партнёров" },
  { icon: "star-medal" as IconKey, label: "Спецпредложения" },
] as const;

export const nav = [
  { label: "Как работает", href: "#how-it-works" },
  { label: "Категории", href: "#categories" },
  { label: "Партнёры", href: "#partners" },
  { label: "Тарифы", href: "#subscription" },
] as const;
