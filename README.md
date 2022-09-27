# Microservice


以微服務架構實現CRUD功能並部屬至AWS，使用 Node.js(Typescript)、Next.js、Docker、Kubernetes、MongoDB、Redis(Pub/Sub) 和單元測試(Jest)，部屬使用 ECS、ELB、DocumentDB和MemoryDB。

## Services

![infrastructure](https://github.com/fan0223/todo-list-microservice/blob/main/drawIo/infra.png)

### Common module
上傳重複性高及指定規範。
* Error
  * 身分驗證錯誤、api body驗證錯誤、404 notFound。
* Middleware
  * current user、user authorize、error handler。
* Event
  * redis (sub/pub)、channel、data interface

### Auth service
負責用戶Signin、Signup、Signout，使用JWT(Json Web Token)進行身分驗證並儲存至Cookie。

| Method | Path                   | Description                          |
|--------|------------------------|--------------------------------------|
| POST   | /api/users/signup      | signup and get new access token      |
| POST   | /api/users/signin      | signin and refresh access token      |
| POST   | /api/users/signout     | Logout to revoke access token        |
| GET    | /api/users/currentuser | get current access token user        |


### Todo service
負責處理新增、修改、刪除，todo相片則上傳 AWS S3儲存。
| Method | Path                   | Description               |
|--------|------------------------|---------------------------|
| GET    | /api/todo              | Get all todo              |
| GET    | /api/todo/:todoId      | Get the specific id todo  |
| POST   | /api/todo              | Create new todo           |
| PUT    | /api/todo/:todoId      | Update the specific todo  |
| DELETE | /api/todo/:todoId      | Delete the specific todo  |

### Comment service
負責處理留言的新增和刪除。
| Method | Path                                 | Description                                   |
|--------|--------------------------------------|-----------------------------------------------|
| GET    | /api/todo/:todoId/comment            | Get the specify todo                          |
| POST   | /api/todo/:todoId/comment            | Get comment for the specific todo             |
| DELETE | /api/todo/:todoId/comment/:commentId | Delete specific comment for the specific todo |

### Query service
負責接收Redis(Sub/Pub)事件，儲存所有資料。
| Method | Path        | Description           |
|--------|-------------|-----------------------|
| GET    | /api/query  | Get the specify todo  |

















