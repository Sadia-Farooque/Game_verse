import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const iconShapes = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M7 7h10v10" />,
  ball: <><circle cx="12" cy="12" r="9" /><path d="m8 4 2 5-4 3m14-2-5 2-1 5m-8 1 4-3 5 2" /></>,
  bolt: <path d="m13 2-3 8h7l-6 12 1-9H6l7-11Z" />,
  car: <><path d="m5 17-1 2v2h2l1-2h10l1 2h2v-2l-1-2" /><path d="m4 17 2-7h12l2 7H4Zm2-7 2-4h8l2 4M7 14h.01M17 14h.01" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chess: <><path d="M8 21h8m-7-4h6l1 4H8l1-4Zm1-3a4 4 0 0 1 0-8l-1-3h6l-1 3a4 4 0 0 1 0 8" /><path d="M12 3V2" /></>,
  close: <path d="m18 6-12 12M6 6l12 12" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  controller: <><path d="M6 10h12a4 4 0 0 1 3.8 5l-.8 2a2 2 0 0 1-3.3.8L15 15H9l-2.7 2.8A2 2 0 0 1 3 17l-.8-2A4 4 0 0 1 6 10Z" /><path d="M7 12v4m-2-2h4m6-1h.01M17 15h.01" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
  people: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6-7.9a4 4 0 0 1 0 7.8M20 21v-2a4 4 0 0 0-3-3.9" /></>,
  play: <path d="m8 5 12 7-12 7V5Z" />,
  puzzle: <path d="M19 13h-2a2 2 0 1 1 0-4h2V5a2 2 0 0 0-2-2h-4v2a2 2 0 1 1-4 0V3H5a2 2 0 0 0-2 2v4h2a2 2 0 1 1 0 4H3v4a2 2 0 0 0 2 2h4v-2a2 2 0 1 1 4 0v2h4a2 2 0 0 0 2-2v-4Z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14ZM5 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" /></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
  sword: <><path d="m14.5 17.5 3 3a2.1 2.1 0 0 0 3-3l-3-3M15 15l5-5V3h-7l-5 5m7-5v4m5-4-5 5M8 8l8 8m-9 5 4-4m-6 2 3 3" /></>,
  trophy: <><path d="M8 21h8m-4-4v4m-6-18h12v5a6 6 0 0 1-12 0V3Zm0 3H3v2a5 5 0 0 0 5 5m8-7h5v2a5 5 0 0 1-5 5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
}

function Icon({ name, size = 18, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      width={size}
    >
      {iconShapes[name] || iconShapes.sparkles}
    </svg>
  )
}

const games = [
  {
    id: 'neon-racer',
    title: 'Neon Racer',
    category: 'Racing',
    rating: '4.8',
    players: 'Single player',
    badge: 'Trending',
    image: 'photo-1519608487953-e999c86e7455',
    imageAlt: 'Neon-lit city at night',
    tone: 'violet',
  },
  {
    id: 'chess-masters',
    title: 'Chess Masters',
    category: 'Strategy',
    rating: '4.9',
    players: 'Two players',
    badge: 'Popular',
    image: 'photo-1586165368502-1bad197a6461',
    imageAlt: 'A dramatic chessboard',
    tone: 'gold',
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    category: 'Arcade',
    rating: '4.7',
    players: 'Single player',
    badge: 'Classic',
    image: 'photo-1446776811953-b23d57bd21aa',
    imageAlt: 'Earth seen from space',
    tone: 'blue',
  },
  {
    id: 'puzzle-quest',
    title: 'Puzzle Quest',
    category: 'Puzzle',
    rating: '4.6',
    players: 'Single player',
    badge: 'Brain game',
    image: 'photo-1518770660439-4636190af475',
    imageAlt: 'Colorful electronic circuit board',
    tone: 'green',
  },
  {
    id: 'speed-basketball',
    title: 'Speed Basketball',
    category: 'Sports',
    rating: '4.5',
    players: 'Single player',
    badge: 'New',
    image: 'photo-1519861531473-9200262188bf',
    imageAlt: 'Basketball on an outdoor court',
    tone: 'orange',
  },
  {
    id: 'zombie-survival',
    title: 'Zombie Survival',
    category: 'Action',
    rating: '4.8',
    players: 'Single player',
    badge: 'Hot',
    image: 'photo-1518709268805-4e9042af9f23',
    imageAlt: 'Misty forest at dusk',
    tone: 'red',
  },
  {
    id: 'wild-horizon',
    title: 'Wild Horizon',
    category: 'Adventure',
    rating: '4.8',
    players: 'Single player',
    badge: 'New world',
    image: 'photo-1464822759023-fed622ff2c3b',
    imageAlt: 'A dramatic mountain range',
    tone: 'green',
  },
  {
    id: 'party-pixels',
    title: 'Party Pixels',
    category: 'Multiplayer',
    rating: '4.7',
    players: 'Up to 4 players',
    badge: 'Play together',
    image: 'photo-1511512578047-dfb367046420',
    imageAlt: 'Colorful game controller on a desk',
    tone: 'violet',
  },
]

const categories = [
  { name: 'Action', icon: 'sword', count: '32 games', color: 'wine' },
  { name: 'Adventure', icon: 'compass', count: '28 games', color: 'olive' },
  { name: 'Racing', icon: 'car', count: '24 games', color: 'gold' },
  { name: 'Puzzle', icon: 'puzzle', count: '41 games', color: 'blue' },
  { name: 'Sports', icon: 'ball', count: '19 games', color: 'wine' },
  { name: 'Strategy', icon: 'chess', count: '36 games', color: 'olive' },
  { name: 'Arcade', icon: 'controller', count: '45 games', color: 'gold' },
  { name: 'Multiplayer', icon: 'people', count: '25 games', color: 'blue' },
]

const benefits = [
  {
    icon: 'bolt',
    title: 'Play for free',
    description: 'Every game is ready to enjoy, with no subscriptions or surprise fees.',
  },
  {
    icon: 'sparkles',
    title: 'Nothing to download',
    description: 'Jump straight into the fun from your browser, on the device you love.',
  },
  {
    icon: 'play',
    title: 'Instant entertainment',
    description: 'Less waiting, more playing. Your next favorite is just a click away.',
  },
  {
    icon: 'heart',
    title: 'A game for everyone',
    description: 'Find fresh challenges, cozy puzzles, and friendly competition.',
  },
]

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Explore games', href: '#games' },
  { label: 'Categories', href: '#categories' },
  { label: 'Leaderboard', href: '#trending' },
  { label: 'About us', href: '#about' },
]

const imageUrl = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function App() {
  const searchInputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All games')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lightTheme, setLightTheme] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [authMode, setAuthMode] = useState('')
  const [notice, setNotice] = useState('')

  const visibleGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(normalizedQuery)
      const matchesCategory =
        activeCategory === 'All games' || game.category === activeCategory
      const matchesFavorites = !showFavorites || favorites.includes(game.id)
      return matchesSearch && matchesCategory && matchesFavorites
    })
  }, [activeCategory, favorites, query, showFavorites])

  useEffect(() => {
    if (!selectedGame && !authMode) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setSelectedGame(null)
        setAuthMode('')
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [authMode, selectedGame])

  useEffect(() => {
    function focusSearch(event) {
      const activeTag = document.activeElement?.tagName
      if (
        event.key === '/' &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        activeTag !== 'INPUT' &&
        activeTag !== 'TEXTAREA' &&
        !selectedGame &&
        !authMode
      ) {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [authMode, selectedGame])

  useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [notice])

  function chooseCategory(category) {
    setActiveCategory(category)
    setShowFavorites(false)
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })
  }

  function toggleFavorite(game) {
    const alreadySaved = favorites.includes(game.id)
    setFavorites((current) =>
      alreadySaved
        ? current.filter((id) => id !== game.id)
        : [...current, game.id],
    )
    setNotice(
      alreadySaved
        ? `${game.title} removed from your favorites`
        : `${game.title} added to your favorites`,
    )
  }

  function startExploring() {
    setActiveCategory('All games')
    setShowFavorites(false)
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })
  }

  function playDemo(game) {
    setSelectedGame(game)
  }

  function handleAuthSubmit(event) {
    event.preventDefault()
    setAuthMode('')
    setNotice('Account sign-in is a demo interaction for now.')
  }

  return (
    <div className={`site-shell${lightTheme ? ' light-theme' : ''}`}>
      <header className="site-header">
        <div className="header-inner">
          <a
            aria-label="GameVerse home"
            className="brand"
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="brand-mark"><Icon name="controller" size={22} /></span>
            <span>GAME<span className="brand-accent">VERSE</span></span>
          </a>

          <nav
            aria-label="Main navigation"
            className={`main-nav${mobileMenuOpen ? ' is-open' : ''}`}
          >
            {navigation.map((item, index) => (
              <a
                aria-current={index === 0 ? 'page' : undefined}
                className={index === 0 ? 'nav-link active' : 'nav-link'}
                href={item.href}
                key={item.label}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mobile-nav-actions">
              <button className="button button-outline" onClick={() => setAuthMode('Sign in')} type="button">
                Sign in
              </button>
              <button className="button button-primary" onClick={() => setAuthMode('Create your account')} type="button">
                Join free <Icon name="arrow" size={16} />
              </button>
            </div>
          </nav>

          <div className="header-actions">
            <label className="header-search">
              <Icon name="search" size={17} />
              <input
                aria-label="Search games"
                onChange={(event) => {
                  setQuery(event.target.value)
                  setShowFavorites(false)
                  if (event.target.value) {
                    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                placeholder="Find a game"
                ref={searchInputRef}
                value={query}
              />
              <kbd>/</kbd>
            </label>
            <button
              aria-label={lightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
              className="icon-button theme-toggle"
              onClick={() => setLightTheme((current) => !current)}
              title={lightTheme ? 'Switch to dark theme' : 'Switch to light theme'}
              type="button"
            >
              <Icon name={lightTheme ? 'moon' : 'sun'} size={18} />
            </button>
            <button className="button button-text desktop-auth" onClick={() => setAuthMode('Sign in')} type="button">
              Sign in
            </button>
            <button className="button button-primary desktop-auth" onClick={() => setAuthMode('Create your account')} type="button">
              Join free <Icon name="arrow" size={16} />
            </button>
            <button
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="icon-button menu-toggle"
              onClick={() => setMobileMenuOpen((current) => !current)}
              type="button"
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={21} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero-section" id="home">
          <div aria-hidden="true" className="hero-orb hero-orb-one" />
          <div aria-hidden="true" className="hero-orb hero-orb-two" />
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT FAVORITE IS WAITING</div>
              <h1 id="hero-title">Your next adventure <span>starts here.</span></h1>
              <p className="hero-description">
                Discover hundreds of exciting games, challenge yourself, compete
                with friends, and enjoy endless entertainment — completely free.
              </p>
              <div className="hero-buttons">
                <button className="button button-primary button-large" onClick={startExploring} type="button">
                  Explore games <Icon name="arrow" size={18} />
                </button>
                <button className="button button-quiet button-large" onClick={() => playDemo(games[0])} type="button">
                  <span className="play-circle"><Icon name="play" size={13} /></span>
                  Play now
                </button>
              </div>
              <div className="hero-proof">
                <span><Icon name="check" size={14} /> 100% free</span>
                <i />
                <span>No downloads</span>
                <i />
                <span>Play instantly</span>
              </div>
              <div className="hero-social-proof">
                <div className="avatar-stack" aria-hidden="true">
                  <span className="avatar avatar-one">J</span>
                  <span className="avatar avatar-two">M</span>
                  <span className="avatar avatar-three">A</span>
                  <span className="avatar avatar-four">+</span>
                </div>
                <span><strong>50k+</strong> players found their fun</span>
              </div>
            </div>

            <div className="hero-art-wrap">
              <div className="hero-art-backdrop" />
              <div className="hero-art" id="hero-art">
                <div className="hero-art-frame">
                  <img
                    alt="A player enjoying a vivid neon gaming world"
                    className="hero-art-image"
                    src={imageUrl('photo-1542751371-adc38448a05e', 1100)}
                  />
                  <div className="hero-art-shade" />
                  <div className="hero-art-caption">
                    <span className="caption-kicker">FEATURED THIS WEEK</span>
                    <strong>Into the unknown.</strong>
                    <span className="caption-rating"><Icon name="star" size={14} /> 4.9 <i /> Players' pick</span>
                  </div>
                </div>
                <div aria-hidden="true" className="float-card float-card-top">
                  <span className="float-card-icon"><Icon name="bolt" size={18} /></span>
                  <span><strong>Instant play</strong><small>No installs needed</small></span>
                </div>
                <div aria-hidden="true" className="float-card float-card-bottom">
                  <span className="online-indicator" />
                  <span><strong>Good times, online</strong><small>Join the community</small></span>
                </div>
                <div aria-hidden="true" className="art-stamp"><Icon name="sparkles" size={22} /></div>
              </div>
            </div>
          </div>
          <a aria-label="Scroll to explore games" className="scroll-cue" href="#games">
            <span /> Scroll to explore
          </a>
        </section>

        <section aria-label="GameVerse at a glance" className="stats-strip">
          <div className="page-width stats-grid">
            <div className="stat-item"><strong>250<span>+</span></strong><small>free games</small></div>
            <div className="stat-item"><strong>50<span>K</span></strong><small>happy players</small></div>
            <div className="stat-item"><strong>15<span>+</span></strong><small>game genres</small></div>
            <div className="stat-item"><strong>100<span>%</span></strong><small>free entertainment</small></div>
          </div>
        </section>

        <section aria-labelledby="games-title" className="section games-section" id="games">
          <div className="page-width">
            <div className="section-heading games-heading">
              <div>
                <span className="section-kicker">THE PLAYGROUND</span>
                <h2 id="games-title">Discover your next favorite game<span>.</span></h2>
                <p>Handpicked games to keep your entertainment going.</p>
              </div>
              <div className="games-tools">
                <button
                  aria-pressed={showFavorites}
                  className={`favorites-filter${showFavorites ? ' selected' : ''}`}
                  onClick={() => setShowFavorites((current) => !current)}
                  type="button"
                >
                  <Icon name="heart" size={16} />
                  <span>My list</span>
                  {favorites.length > 0 && <span className="favorites-count">{favorites.length}</span>}
                </button>
                <button className="text-link" onClick={startExploring} type="button">
                  Browse all <Icon name="arrowUpRight" size={16} />
                </button>
              </div>
            </div>

            <div aria-label="Filter games by category" className="filter-row">
              {['All games', ...categories.map((category) => category.name)].map((category) => (
                <button
                  aria-pressed={activeCategory === category}
                  className={`filter-chip${activeCategory === category ? ' selected' : ''}`}
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setShowFavorites(false)
                  }}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>

            {visibleGames.length > 0 ? (
              <div className="game-grid">
                {visibleGames.map((game) => (
                  <article className="game-card" key={game.id}>
                    <button
                      aria-label={favorites.includes(game.id) ? `Remove ${game.title} from favorites` : `Add ${game.title} to favorites`}
                      aria-pressed={favorites.includes(game.id)}
                      className={`favorite-button${favorites.includes(game.id) ? ' is-favorite' : ''}`}
                      onClick={() => toggleFavorite(game)}
                      type="button"
                    >
                      <Icon name="heart" size={17} />
                    </button>
                    <button className={`game-cover tone-${game.tone}`} onClick={() => playDemo(game)} type="button">
                      <img alt={game.imageAlt} loading="lazy" src={imageUrl(game.image, 700)} />
                      <span className="cover-overlay" />
                      <span className="game-badge">{game.badge}</span>
                      <span className="cover-play"><Icon name="play" size={18} /> Preview</span>
                    </button>
                    <div className="game-info">
                      <div className="game-title-row">
                        <div>
                          <span className="game-category">{game.category}</span>
                          <h3>{game.title}</h3>
                        </div>
                        <span className="rating"><Icon name="star" size={14} /> {game.rating}</span>
                      </div>
                      <div className="game-card-footer">
                        <span className="player-mode"><Icon name="people" size={14} /> {game.players}</span>
                        <button aria-label={`Preview ${game.title}`} className="card-play-button" onClick={() => playDemo(game)} type="button">
                          <Icon name="play" size={12} /> Play
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-state-icon"><Icon name={showFavorites ? 'heart' : 'search'} size={24} /></span>
                <h3>{showFavorites ? 'Your list is waiting' : 'No games found just yet'}</h3>
                <p>{showFavorites ? 'Tap the heart on a game to keep it close.' : 'Try another title or category to find your next favorite.'}</p>
                <button
                  className="button button-outline"
                  onClick={() => {
                    setQuery('')
                    setActiveCategory('All games')
                    setShowFavorites(false)
                  }}
                  type="button"
                >
                  Show all games
                </button>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="categories-title" className="section categories-section" id="categories">
          <div className="page-width">
            <div className="section-heading centered-heading">
              <span className="section-kicker">A WORLD OF WAYS TO PLAY</span>
              <h2 id="categories-title">Explore games by <span>category.</span></h2>
              <p>From quick little puzzles to all-out adventures, there&apos;s a mood for that.</p>
            </div>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  aria-label={`Browse ${category.name} games`}
                  className="category-card"
                  key={category.name}
                  onClick={() => chooseCategory(category.name)}
                  type="button"
                >
                  <span className={`category-icon category-${category.color}`}><Icon name={category.icon} size={22} /></span>
                  <span className="category-copy"><strong>{category.name}</strong><small>{category.count}</small></span>
                  <Icon className="category-arrow" name="arrowUpRight" size={16} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="about-title" className="section benefits-section" id="about">
          <div className="page-width benefits-layout">
            <div className="benefits-intro">
              <span className="section-kicker">WHY CHOOSE GAMEVERSE</span>
              <h2 id="about-title">All the fun.<br /><span>None of the fuss.</span></h2>
              <p>We think great games should be easy to find, easy to play, and always a joy to come back to.</p>
              <button className="text-link" onClick={startExploring} type="button">
                Come see for yourself <Icon name="arrow" size={16} />
              </button>
            </div>
            <div className="benefit-grid">
              {benefits.map((benefit, index) => (
                <article className="benefit-card" key={benefit.title}>
                  <span className={`benefit-icon benefit-icon-${index}`}><Icon name={benefit.icon} size={20} /></span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="trending-title" className="section trending-section" id="trending">
          <div className="page-width">
            <div className="section-heading trending-heading">
              <div>
                <span className="section-kicker">GOOD GAMES, GREAT BUZZ</span>
                <h2 id="trending-title">On everyone&apos;s <span>playlist.</span></h2>
                <p>The crowd is loving these right now.</p>
              </div>
              <span className="live-tag"><span /> TRENDING NOW</span>
            </div>
            <div className="trending-grid">
              <article className="trending-feature">
                <img alt="A galaxy of stars stretching into deep space" loading="lazy" src={imageUrl('photo-1462331940025-496dfbfc7564', 1000)} />
                <div className="trending-feature-shade" />
                <span className="trending-label"><Icon name="bolt" size={13} /> MOST PLAYED</span>
                <div className="trending-feature-copy">
                  <span className="game-category">ARCADE · JUST FOR YOU</span>
                  <h3>Space is calling.</h3>
                  <p>One more round? Always one more round.</p>
                  <div className="trending-feature-meta">
                    <span className="rating"><Icon name="star" size={14} /> 4.9</span>
                    <span><Icon name="people" size={15} /> 12.4k players</span>
                    <button className="button button-primary" onClick={() => playDemo(games[2])} type="button">
                      Play preview <Icon name="arrow" size={16} />
                    </button>
                  </div>
                </div>
              </article>
              <div className="trending-side">
                <article className="trending-mini-card mini-wine">
                  <div className="mini-art">
                    <img alt="A striking mountain landscape" loading="lazy" src={imageUrl('photo-1464822759023-fed622ff2c3b', 500)} />
                    <span className="mini-game-icon"><Icon name="compass" size={22} /></span>
                  </div>
                  <div className="mini-copy">
                    <span className="mini-kicker">ADVENTURE · 4.8 <Icon name="star" size={12} /></span>
                    <h3>Wild Horizon</h3>
                    <p>Your next great escape awaits.</p>
                    <button className="mini-link" onClick={() => setSelectedGame({ title: 'Wild Horizon', category: 'Adventure' })} type="button">
                      Explore game <Icon name="arrow" size={14} />
                    </button>
                  </div>
                </article>
                <article className="trending-mini-card mini-green">
                  <div className="mini-art">
                    <img alt="Warm glowing abstract lights" loading="lazy" src={imageUrl('photo-1519608487953-e999c86e7455', 500)} />
                    <span className="mini-game-icon"><Icon name="bolt" size={22} /></span>
                  </div>
                  <div className="mini-copy">
                    <span className="mini-kicker">RACING · 4.7 <Icon name="star" size={12} /></span>
                    <h3>Midnight Rush</h3>
                    <p>Fast turns. Big night energy.</p>
                    <button className="mini-link" onClick={() => setSelectedGame({ title: 'Midnight Rush', category: 'Racing' })} type="button">
                      Explore game <Icon name="arrow" size={14} />
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="community-title" className="community-section">
          <div aria-hidden="true" className="community-orbit community-orbit-one" />
          <div aria-hidden="true" className="community-orbit community-orbit-two" />
          <div className="page-width community-content">
            <span className="community-icon"><Icon name="sparkles" size={22} /></span>
            <span className="section-kicker">YOUR NEXT GREAT BREAK</span>
            <h2 id="community-title">Ready to level up <span>your fun?</span></h2>
            <p>Join the GameVerse community and discover your next favorite game today.</p>
            <button className="button button-beige button-large" onClick={startExploring} type="button">
              Start playing <Icon name="arrow" size={18} />
            </button>
            <span className="community-footnote"><Icon name="shield" size={14} /> Free to play · No account needed</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <div className="footer-brand-column">
              <a aria-label="GameVerse home" className="brand footer-brand" href="#home">
                <span className="brand-mark"><Icon name="controller" size={22} /></span>
                <span>GAME<span className="brand-accent">VERSE</span></span>
              </a>
              <p>Your destination for free online gaming.</p>
              <div className="social-links">
                <a aria-label="GameVerse on Instagram" href="https://www.instagram.com/" rel="noreferrer" target="_blank">ig</a>
                <a aria-label="GameVerse on TikTok" href="https://www.tiktok.com/" rel="noreferrer" target="_blank">tk</a>
                <a aria-label="GameVerse on Discord" href="https://discord.com/" rel="noreferrer" target="_blank">dc</a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Explore</h3>
              <a href="#home">Home</a>
              <a href="#games">Explore Games</a>
              <a href="#categories">Categories</a>
              <a href="#trending">What&apos;s trending</a>
            </div>
            <div className="footer-column">
              <h3>Play your way</h3>
              <a href="#games" onClick={() => chooseCategory('Action')}>Action</a>
              <a href="#games" onClick={() => chooseCategory('Racing')}>Racing</a>
              <a href="#games" onClick={() => chooseCategory('Puzzle')}>Puzzle</a>
              <a href="#games" onClick={() => chooseCategory('Sports')}>Sports</a>
            </div>
            <div className="footer-column footer-support">
              <h3>Good to know</h3>
              <button onClick={() => setNotice('Questions? Our support inbox is coming soon.')} type="button">Contact Us</button>
              <button onClick={() => setNotice('Our FAQ page is coming soon.')} type="button">FAQs</button>
              <button onClick={() => setNotice('Privacy information will be available soon.')} type="button">Privacy Policy</button>
              <button onClick={() => setNotice('Terms will be available soon.')} type="button">Terms & Conditions</button>
            </div>
            <div className="footer-note">
              <span className="footer-note-icon"><Icon name="sparkles" size={20} /></span>
              <p>Good games.<br /><strong>Good company.</strong></p>
              <span>PLAY MORE. EXPLORE MORE. HAVE FUN.</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 GameVerse. Made for your next little escape.</span>
            <span><i /> Free to play, always</span>
          </div>
        </div>
      </footer>

      {(selectedGame || authMode) && (
        <div
          className="modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedGame(null)
              setAuthMode('')
            }
          }}
          role="presentation"
        >
          <section aria-labelledby="dialog-title" aria-modal="true" className="dialog-card" role="dialog">
            <button
              aria-label="Close dialog"
              className="icon-button dialog-close"
              onClick={() => {
                setSelectedGame(null)
                setAuthMode('')
              }}
              type="button"
            >
              <Icon name="close" size={20} />
            </button>
            {selectedGame ? (
              <>
                <span className="dialog-icon"><Icon name="controller" size={25} /></span>
                <span className="section-kicker">A LITTLE HEADS-UP</span>
                <h2 id="dialog-title">{selectedGame.title}</h2>
                <p>This is a preview card, not a playable game yet. We&apos;re working on bringing real browser games to GameVerse.</p>
                <div className="dialog-game-note"><span>{selectedGame.category}</span><span><Icon name="shield" size={14} /> No downloads required</span></div>
                <button className="button button-primary dialog-action" onClick={() => {
                  setSelectedGame(null)
                  startExploring()
                }} type="button">
                  Browse more games <Icon name="arrow" size={16} />
                </button>
              </>
            ) : (
              <>
                <span className="dialog-icon"><Icon name="user" size={25} /></span>
                <span className="section-kicker">WELCOME TO THE PLAYGROUND</span>
                <h2 id="dialog-title">{authMode}</h2>
                <p>This demo account form is for preview only; account features are not connected yet.</p>
                <form className="auth-form" onSubmit={handleAuthSubmit}>
                  {authMode !== 'Sign in' && (
                    <label>
                      Your name
                      <input autoComplete="name" name="name" placeholder="How should we call you?" required />
                    </label>
                  )}
                  <label>
                    Email address
                    <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
                  </label>
                  <label>
                    Password
                    <input autoComplete={authMode === 'Sign in' ? 'current-password' : 'new-password'} minLength="6" name="password" placeholder="At least 6 characters" required type="password" />
                  </label>
                  <button className="button button-primary dialog-action" type="submit">
                    {authMode === 'Sign in' ? 'Sign in' : 'Create account'} <Icon name="arrow" size={16} />
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}

      {notice && <div aria-live="polite" className="toast"><Icon name="check" size={16} /> {notice}</div>}
    </div>
  )
}

export default App
