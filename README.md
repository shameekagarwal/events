# events

1. create / read / delete events
2. attend / backoff from events

<hr />

## stack used

1. aws
2. docker-compose (for production)
3. kubernetes (for development)
4. nats streaming server
5. nestjs
6. nginx
7. postgres
8. react native
9. redux
10. typecript
11. typeorm

<hr />

## api

| method | name          | endpoint               | service  |
| ------ | ------------- | ---------------------- | -------- |
| GET    | ping-attend   | /api/attend/           | attend   |
| GET    | ping-auth     | /api/auth/             | auth     |
| GET    | ping-event    | /api/event/            | event    |
| GET    | ping-query    | /api/query/            | query    |
| POST   | signup        | /api/auth/signup/      | auth     |
| POST   | signin        | /api/auth/signin/      | auth     |
| GET    | current-user  | /api/auth/currentuser/ | auth     |
| POST   | create-event  | /api/event/            | event    |
| GET    | get-events    | /api/query/events/     | query    |
| DEL    | delete-event  | /api/event/eventId/    | event    |
| POST   | toggle-attend | /api/attend/eventId/   | attend   |

<hr />

## frontend

1. an android app made using react-native *should work fine on ios too after a few ui fixes upon inspection*
2. uses redux for mantaining state
3. the multi step form for creating events uses react context
4. upon successful login, the jwt is stored in async storage, which is verified once the app boots up
5. the app overall uses bottom-tab-navigation, each individual tab uses stack-navigation and the create event form uses top-tab-navigation
6. uses react-native-paper for styling and font used is oswald

<hr />


