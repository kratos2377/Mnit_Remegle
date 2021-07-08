heroku container:push --app=immense-crag-18237 web
heroku container:release --app=immense-crag-18237 web
heroku logs --app=immense-crag-18237 --tail
heroku pg:credentials --app=immense-crag-18237 DATABASE
heroku config:set --app=immense-crag-18237 PGSSLMODE=require
