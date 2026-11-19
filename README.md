# Мониторинг сайтов группы

Моё второе приложение модуля 3. Оно не зависит от PocketBase: читает
`public/data/sites.json` и `public/data/results.json`, поэтому его можно
опубликовать на GitHub Pages.

## Страницы

| Адрес | Что показывает |
| --- | --- |
| `/` | сводку «Не открываются: N из M» и карточки сайтов |
| `/site/:id` | сайт, сколько раз он открывался, таблицу истории проверок |
| `/about` | как устроена ночная проверка |
| `*` | «Страница не найдена» |

Меню в шапке — на `NavLink`, данные страницы получают хуком
`useMonitoring()` из `MonitoringProvider`, без props. `BrowserRouter`
подключён с `basename={import.meta.env.BASE_URL}`, потому что сайт на Pages
лежит в подпапке `/monitoring/`.

## Запуск

```powershell
npm install
npm run dev          # http://localhost:5173/monitoring/
npm run build
npm run lint
npm run preview      # http://localhost:4173/monitoring/
node scripts/check.mjs
```

`npm run build` складывает готовые файлы в `dist`. Файлы из `public`
попадают туда как есть, их можно обновлять без пересборки — этим пользуется
ночная проверка.

## Ночная проверка

`scripts/check.mjs` запрашивает каждый сайт из списка с ограничением
15 секунд, записывает код ответа и время в `results.json` и хранит
30 последних проверок. В конце сравнивает новую проверку с прошлой
(`history[1]`) и отправляет в Telegram сообщение только если сайт перестал
открываться или снова заработал. Токен и номер чата читаются из
`process.env`; на моём компьютере их нет, скрипт пишет об этом и не падает.

```
.github/workflows/check.yml    cron '0 21 * * *' = 00:00 по Москве,
                               Run workflow, коммит бота, задание publish
.github/workflows/deploy.yml   push в main, workflow_call, сборка, 404.html, Pages
```

`publish` вызывает `deploy.yml` через `workflow_call`, потому что коммит
от `GITHUB_TOKEN` сам по себе не запускает другие конвейеры. В `deploy.yml`
у checkout стоит `ref: main`, чтобы сборка взяла уже обновлённый
`results.json`, и есть шаг `cp dist/index.html dist/404.html` — так прямые
ссылки на страницы открываются на Pages.

## Публикация

1. Создать публичный репозиторий `monitoring`, отправить в него код:
   `git init`, `git add .`, `git commit`, `git branch -M main`,
   `git remote add origin …`, `git push -u origin main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Settings → Secrets and variables → Actions → два секрета:
   `TELEGRAM_TOKEN` и `TELEGRAM_CHAT_ID`.
4. Actions → «Ночная проверка сайтов» → **Run workflow**. После зелёной
   галочки открыть адрес из задания `deploy`.

Секреты в коде и в истории Git не встречаются, в журнале запуска GitHub
показывает их как `***`.

## Что заменить перед сдачей

В `public/data/sites.json` сейчас справочники из примера и тестовый
неработающий адрес `monitoring-test`. Заменю их на адреса сайтов моей группы,
когда соберу у однокурсников. Тестовый адрес нужен, чтобы увидеть сообщение
бота и красную полосу на карточке.

Подробнее по модулю — в `..\modul-3\README.md`.
