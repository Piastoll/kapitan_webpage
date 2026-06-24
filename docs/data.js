/* Data layer — easy to split per locale later */
window.KAPITAN_DATA = {
  shared: {
    phone: "+48 732 921 503",
    phoneHref: "tel:+48732921503",
    email: "kamil@kapitanburger.com",
    address: "ul. Rozewska 24, Jastrzębia Góra",
    hours: "Codziennie 12:00–22:00",
    social: {
      facebook: "https://www.facebook.com/KapitanBurgerJG",
      instagram: "https://www.instagram.com/kapitanburger/",
      // TODO: replace with the exact Pyszne.pl restaurant listing URL.
      // Falls back to a Pyszne search for the brand so the link is never dead.
      pyszne: "https://www.pyszne.pl/szukaj?q=Kapitan%20Burger%20Jastrz%C4%99bia%20G%C3%B3ra"
    }
  },
  burger: {
    phone: "+48 732 921 503",
    address: "ul. Rozewska 24, Jastrzębia Góra",
    hours: "Codziennie 12:00–22:00"
  },
  kebs: {
    phone: "+48 732 921 503",
    address: "ul. Rozewska 24, Jastrzębia Góra",
    hours: "Codziennie 12:00–22:00"
  },
  menuBurger: [
    {
      title: "Burgerki",
      tag: "100% wołowiny",
      items: [
        { name: "Majtek",   price: "35 zł", desc: "100% wołowiny, sałata, ogórek, pomidor, cebula, autorski sos Kapitana" },
        { name: "Oficer",   price: "37 zł", desc: "Majtek + ser" },
        { name: "Bosman",   price: "40 zł", desc: "Majtek + ser + bekon" },
        { name: "Kapitan",  price: "45 zł", desc: "Majtek + 2× ser + bekon + jalapeño" },
        { name: "Wege Majtek",        price: "40 zł", desc: "Kotlet WEGE, sałata, ogórek, pomidor, cebula, sos" },
        { name: "Nachosowy Holender", price: "45 zł", desc: "Majtek + 2× ser + nachosy + jalapeño" },
        { name: "Serowy Pirat",       price: "45 zł", desc: "Majtek + camembert + żurawina" },
        { name: "Zestaw",             price: "10 zł", desc: "Frytki lub krążki cebulowe do każdego burgera" },
        { name: "Dodatkowy kotlet",   price: "15 zł" }
      ]
    },
    {
      title: "Smash",
      tag: "Smashowana wołowina",
      items: [
        { name: "Single", price: "30 zł", desc: "1× smashowana wołowina (70 g), 1× ser cheddar, ogórek piklowany, cebula w kostkę, sos kapitalny." },
        { name: "Double", price: "35 zł", desc: "2× smashowana wołowina (70 g), 2× ser cheddar, ogórek piklowany, cebula w kostkę, sos kapitalny." },
        { name: "Triple", price: "40 zł", desc: "3× smashowana wołowina (70 g), 3× ser cheddar, ogórek piklowany, cebula w kostkę, sos kapitalny." }
      ],
      // optional add-on strip; all the same price, so it's shown once
      addons: {
        label: "Doładuj smasha · dodatki po 3 zł",
        items: [
          { name: "Jalapeño",    emoji: "🌶️" },
          { name: "Ser cheddar", emoji: "🧀" },
          { name: "Bekon",       emoji: "🥓" },
          { name: "Nachosy",     emoji: "📐" }
        ]
      }
    },
    {
      title: "Hot-dog",
      tag: "Klasyka portowa",
      items: [
        { name: "Klasyczny",   price: "10 zł", desc: "Bułka, parówka, sos" },
        { name: "Na wypasie",  price: "14 zł", desc: "Klasyczny + ogórek lub jalapeño + prażona cebulka" }
      ]
    },
    {
      title: "Zapiekanki",
      tag: "Z pieca",
      items: [
        { name: "Legendarna", price: "13 zł", desc: "Ser, pieczarki, sos" },
        { name: "Szyna",      price: "15 zł", desc: "Legendarna + szynka" },
        { name: "Salame",     price: "15 zł", desc: "Legendarna + salami" },
        { name: "Kałabanga",  price: "17 zł", desc: "Legendarna + szynka + ananas" },
        { name: "Galapagos",  price: "17 zł", desc: "Legendarna + szynka lub salami + jalapeño" }
      ]
    },
    {
      title: "Dodatki",
      tag: "Coś na ząb",
      compact: true,
      items: [
        { name: "Frytki 200 g",          price: "13 zł" },
        { name: "Krążki cebulowe 8 szt.", price: "13 zł" },
        { name: "Nuggetsy 8 szt.",        price: "20 zł" },
        { name: "Serki mozzarella 6 szt.", price: "15 zł" },
        { name: "Nachosy",                price: "20 zł" }
      ]
    },
  ],

  // Beverages live in one place and are shared by both brands, so a price
  // change updates everywhere at once. Both menus show all of these.
  beverages: [
    {
      title: "Napoje",
      tag: "Do popicia",
      compact: true,
      items: [
        { name: "Lemoniada 0,33 l", price: "15 zł" },
        { name: "Gazowane 0,5 l",   price: "10 zł" },
        { name: "Soczek 0,33 l",    price: "8 zł" },
        { name: "Woda 0,5 l",       price: "6 zł" },
        { name: "Herbata",          price: "10 zł" }
      ]
    },
    {
      title: "Piwko",
      tag: "Na luzie",
      compact: true,
      items: [
        { name: "Butelka 0,33 l", price: "10 zł" },
        { name: "Butelka 0,5 l",  price: "15 zł" },
        { name: "Z kija 0,4 l",   price: "12 zł" },
        { name: "FREE 0,5 l",     price: "15 zł" }
      ]
    },
    {
      title: "Kawa",
      tag: "Pobudka",
      compact: true,
      items: [
        { name: "Espresso",          price: "8 zł" },
        { name: "Espresso Macchiato", price: "9 zł" },
        { name: "Americano",         price: "10 zł" },
        { name: "Cappuccino",        price: "12 zł" },
        { name: "Flat White",        price: "12 zł" }
      ]
    }
  ],

  // Kebs has a single signature product with a bun choice and a sauce choice,
  // so it gets its own shape (rendered by a dedicated template, not menuBurger).
  menuKebs: {
    name: "Gemüse Kebab",
    tag: "Berlin style · kebab z warzywami",
    // Both buns are the same price, so it's shown once next to the product.
    // If they ever differ, move price back onto each bread and render it.
    price: "35 zł",
    desc: "Mięso z kurczaka (150 g), smażone warzywa (marchew, ziemniak, cukinia), świeże warzywa (sałata, pomidor, ogórek, czerwona cebula), ser bałkański, mięta, sok z cytryny i nasz autorski sos do wyboru.",
    breads: [
      { name: "Bułka" },
      { name: "Lawasz" }
    ],
    sauces: [
      { name: "Czosnek",          emoji: "🧄" },
      { name: "Spicy Mango",      emoji: "🥭" },
      { name: "Ostry",            emoji: "🔥" },
      { name: "Jogurtowo-ziołowy", emoji: "🌿" }
    ]
  },

  delivery: [
    {
      lede: true,
      icon: "anchor",
      title: "Zamów od Kapitana",
      body: "Wybierz swoją drogę po najlepszy street food w okolicy. My zajmiemy się resztą.",
      meta: [],
      cta: { label: "Zadzwoń · +48 732 921 503", href: "tel:+48732921503" }
    },
    {
      icon: "scooter",
      title: "Dostawa pod drzwi",
      body: "Burczy w brzuchu? Nasz dostawca już grzeje silnik, żeby dowieźć Ci gorący towar.",
      meta: [
        { k: "Minimalne zamówienie", v: "60 zł" },
        { k: "Koszt dostawy", v: "10 zł" },
        { k: "Godziny", v: "12:00–22:00" }
      ],
      cta: { label: "Zadzwoń i zamów", href: "tel:+48732921503" }
    },
    {
      icon: "bag",
      title: "Wpadnij po odbiór",
      body: "Nie lubisz czekać? Złóż zamówienie telefonicznie, a my wrzucimy mięcho na ruszt. Odbierzesz dokładnie wtedy, gdy będzie gotowe.",
      meta: [
        { k: "Adres", v: "ul. Rozewska 24" },
        { k: "Czas", v: "ok. 20 min" }
      ],
      cta: { label: "Zadzwoń i wpadaj", href: "tel:+48732921503" }
    }
  ],

  pillars: [
    { ico: "10",    title: "Dekada w grze", body: "Przez 10 lat przerobiliśmy tony wołowiny i streetfoodowych klasyków. Doświadczenie czuć w każdym kęsie." },
    { ico: "star",  title: "Lokalny patriotyzm", body: "Buły to nie mrożonki z marketu — rzemieślnicza robota z zaprzyjaźnionej piekarni. Maślane, puszyste, zawsze świeże." },
    { ico: "flame", title: "Tylko prawdziwy grill", body: "Żadnych mikrofali ani dziwnych wynalazków. Smażymy na żywym ogniu, bo tylko tak jedzenie nabiera charakteru." },
    { ico: "badge", title: "Jakość bez kompromisów", body: "Wybieramy dostawców z okolicy, bo wiemy, skąd biorą towar. Świeżo, lokalnie, bez kompromisów." },
    { ico: "heart", title: "Rodzinny vibe", body: "Kapitan to nasz dom. Prowadzimy to razem, po swojemu i zawsze z uśmiechem." }
  ],

  navLinks: [
    { label: "Menu",             id: "menu",     num: "01" },
    { label: "Dostawa",          id: "dostawa",  num: "02" },
    { label: "O marce",          id: "about",    num: "03" },
    { label: "Kontakt",          id: "kontakt",  num: "04" },
    { label: "Wynajmij foodtrucka", id: "foodtruck", num: "05" }
  ]
};
