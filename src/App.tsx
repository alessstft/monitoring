import { NavLink, Route, Routes } from 'react-router'
import { useMonitoring } from './monitoring'
import SitesPage from './pages/SitesPage'
import SitePage from './pages/SitePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const { history, loading, error } = useMonitoring()
  const last = history[0]

  return (
    <>
      <header className="header">
        <h1>Мониторинг сайтов группы</h1>
        <p>
          {last === undefined
            ? 'Проверок ещё не было'
            : `Последняя проверка: ${new Date(last.time).toLocaleString('ru')}`}
        </p>
        <nav className="nav">
          <NavLink to="/">Сайты</NavLink>
          <NavLink to="/about">О проверке</NavLink>
        </nav>
      </header>
      <main className="main">
        {error !== '' && <p className="load-error">{error}</p>}
        {loading && <p className="empty">Загрузка данных…</p>}
        {!loading && error === '' && (
          <Routes>
            <Route path="/" element={<SitesPage />} />
            <Route path="/site/:id" element={<SitePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </main>
    </>
  )
}

export default App
