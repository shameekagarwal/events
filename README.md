# events

<b>[link to the apk](https://drive.google.com/file/d/1d3Krsl2pfSGL18ffoCd5pgebe1D5BeCh/view?usp=sharing)</b>

miscellaneous links -

1. [attend service link](https://events-attend11.herokuapp.com/)
2. [auth service link](https://events-auth11.herokuapp.com/)
3. [event service link](https://events-event11.herokuapp.com/)
4. [query service link](https://events-query11.herokuapp.com/)
5. [link to npm library for services](https://www.npmjs.com/package/@shameek-events/common)
6. [reverse proxy link](https://events11.herokuapp.com/)

<hr />

## features

1. create / view / delete events
2. attend / backoff from events
3. signin / signup

[view demo images here](./demo-images)

<hr />

## components

1. attend service - toggle the status of a user i.e. change status to attending if the user wasnt attending the event initially and vice versa
2. auth service - signin and signup using jwt tokens
3. event service - create and delete events
4. query service - query the list of events with its attendees and organiser
5. an npm library - to provide common functionality like auth middleware, error handling, typed event subjects and event-payloads for rabbitmq

<hr />

## api calls

| method | name          | endpoint               | service |
| ------ | ------------- | ---------------------- | ------- |
| GET    | ping-attend   | /api/attend/           | attend  |
| GET    | ping-auth     | /api/auth/             | auth    |
| GET    | ping-event    | /api/event/            | event   |
| GET    | ping-query    | /api/query/            | query   |
| POST   | signup        | /api/auth/signup/      | auth    |
| POST   | signin        | /api/auth/signin/      | auth    |
| GET    | current-user  | /api/auth/currentuser/ | auth    |
| POST   | create-event  | /api/event/            | event   |
| GET    | get-events    | /api/query/events/     | query   |
| DEL    | delete-event  | /api/event/eventId/    | event   |
| POST   | toggle-attend | /api/attend/eventId/   | attend  |

<hr />

## how services cooperate

| event subjects | publisher | subscribers   |
| -------------- | --------- | ------------- |
| create:event   | event     | query, attend |
| delete:event   | event     | query, attend |
| toggle:attend  | attend    | query         |

<hr />

## stack used

1. docker
2. nestjs
3. nginx
4. postgres
5. rabbitmq
6. react-native
7. redux and context
8. typeorm
9. typescript

<hr />
