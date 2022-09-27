# Microservice


以微服務架構實現CRUD功能並部屬至AWS，使用 Node.js(Typescript)、Next.js、Docker、Kubernetes、MongoDB、Redis(Pub/Sub) 和單元測試(Jest)，部屬使用 ECS、ELB、DocumentDB和MemoryDB。

## Services

![infrastructure](https://github.com/fan0223/todo-list-microservice/blob/main/drawIo/infra.png)

### Auth service
負責用戶Signin、Signup、Signout，使用JWT(Json Web Token)進行身分驗證並儲存至Cookie。

| Method | Path                   | Description                                   |
|--------|------------------------|-----------------------------------------------|
| POST   | /api/users/signup      | signup and get new access token               |
| POST   | /api/users/signin      | signin and refresh access token               |
| POST   | /api/users/signout     | Logout to revoke access token                 |
| GET    | /api/users/currentuser | get current access token user                 |


### Todo service

| Method | Path                   | Description                                   |
|--------|------------------------|-----------------------------------------------|
| GET    | /api/todo              | Get all todo                                  |
| GET    | /api/todo/:todoId      | Get specify id todo                           |
| POST   | /api/todo              | Create new todo                               |
| PUT    | /api/todo/:todoId      | Update specify todo                           |
| DELETE | /api/todo/:todoId      | Delete specify todo                           |
