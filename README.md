# Microservice


以微服務架構實現CRUD功能並部屬至AWS，使用 Node.js(Typescript)、Next.js、Docker、Kubernetes、MongoDB、Redis 和單元測試(Jest)，部屬使用 ECS、ELB、DocumentDB和MemoryDB。

## Services

![infrastructure](https://github.com/fan0223/todo-list-microservice/blob/main/drawIo/infra.png)

### Auth service
Signin、Signup、Signout，使用JWT(Json Web Token)進行身分驗證並儲存至Cookie。

| Method | Path                   | Description                                   |
|--------|------------------------|-----------------------------------------------|
| POST   | /api/users/signup      | signup and get new access token               |
| POST   | /api/users/signin      | signin and refresh access token               |
| POST   | /api/users/signout     | Logout to revoke access token                 |
| GET    | /api/users/currentuser | get current access token user                 |
