import { useState } from 'react'
import { Link } from 'react-router'
import { useMonitoring } from '../monitoring'
import { statusText } from '../status'

function SitesPage() {
  const { sites, history } = useMonitoring()
  const [onlyBad, setOnlyBad] = useState(false)
  const last = history[0]
  const bad = sites.filter((site) => last?.checks.find((c) => c.id === site.id)?.ok !== true).length
  const shown = onlyBad ? sites.filter((site) => last?.checks.find((c) => c.id === site.id)?.ok !== true) : sites

  return (
    <section>
      <h2>Сайты группы</h2>
      <p className="summary">
        {bad === 0
          ? `Все ${sites.length} сайтов открываются`
          : `Не открываются: ${bad} из ${sites.length}`}
      </p>
      <button className="filter-button" onClick={() => setOnlyBad(!onlyBad)}>
        {onlyBad ? 'Показать все сайты' : 'Только неработающие'}
      </button>
      <ul className="sites">
        {shown.map((site) => {
          const check = last?.checks.find((c) => c.id === site.id)
          const rates = history.map((run) => run.checks.find((c) => c.id === site.id))
          const okCount = rates.filter((c) => c?.ok === true).length
          const percent = rates.length === 0 ? 0 : Math.round((okCount / rates.length) * 100)
          return (
            <li key={site.id} className={check?.ok ? 'site' : 'site site--bad'}>
              <span className="site__status">{statusText(check)}</span>
              <h3>
                <Link to={`/site/${site.id}`}>{site.name}</Link>
              </h3>
              <a href={site.url} target="_blank" rel="noreferrer">
                {site.url}
              </a>
              <span className="site__rate">открывался в {percent}% проверок</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SitesPage
