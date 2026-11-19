import { Link, useLocation } from 'react-router'

function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <section>
      <h2>Страница не найдена</h2>
      <p>Адреса {pathname} в приложении нет.</p>
      <Link to="/" className="back">← Все сайты</Link>
    </section>
  )
}

export default NotFoundPage
