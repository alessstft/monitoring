import { Link } from 'react-router'
import { useMonitoring } from '../monitoring'

function AboutPage() {
  const { sites, history } = useMonitoring()

  return (
    <section>
      <Link to="/" className="back">← Все сайты</Link>
      <h2>О проверке</h2>
      <p>Каждую ночь в 00:00 по Москве GitHub Actions запрашивает {sites.length} сайтов из списка.</p>
      <p>
        Сайт считается работающим, если сервер ответил кодом от 200 до 299. На запрос даётся
        15 секунд: если ответа нет, проверка считается неудачной.
      </p>
      <p>
        Результаты записываются в <code>results.json</code> коммитом бота, после чего сайт
        публикуется заново. В истории хранится {Math.min(history.length, 30)} последних проверок.
      </p>
      <p>
        Сообщение в Telegram приходит только когда сайт перестал открываться или снова заработал.
        Токен бота и номер чата хранятся в секретах репозитория.
      </p>
    </section>
  )
}

export default AboutPage
