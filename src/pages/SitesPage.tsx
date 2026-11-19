import { Link } from 'react-router'
import { useMonitoring } from '../monitoring'
import { statusText } from '../status'

function SitesPage() {
  const { sites, history } = useMonitoring()
  const last = history[0]
  const bad = sites.filter((site) => last?.checks.find((c) => c.id === site.id)?.ok !== true).length

  return (
    <section>
      <h2>Сайты группы</h2>
      <p className="summary">
        {bad === 0
          ? `Все ${sites.length} сайтов открываются`
          : `Не открываются: ${bad} из ${sites.length}`}
      </p>
      <ul className="sites">
        {sites.map((site) => {
          const check = last?.checks.find((c) => c.id === site.id)
          return (
            <li key={site.id} className={check?.ok ? 'site' : 'site site--bad'}>
              <span className="site__status">{statusText(check)}</span>
              <h3>
                <Link to={`/site/${site.id}`}>{site.name}</Link>
              </h3>
              <a href={site.url} target="_blank" rel="noreferrer">
                {site.url}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SitesPage
