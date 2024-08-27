<div align="center">
  <h2>Next-tRPC boilerplate</h2></hr>
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js badge">
    <img src="https://img.shields.io/badge/-tRPC-2596BE?style=flat&logo=trpc&logoColor=white" alt="tRPC badge">
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma badge">
    <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white" alt="TanStack Query badge">
  </p>
  <p>tRPC를 이용한 Next.js(App router) 보일러플레이트</p>
</div>

## 사용 방법

### 환경 변수 설정

루트 디렉터리에 `.env` 파일 생성 후 DB에 해당하는 정보 입력

```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:6543/mydb?schema=public?pgbouncer=true"
DIRECT_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

### 클라이언트 컴포넌트

`react-query`를 이용하여 사용

```tsx
const usesQuery = trpc.test.getUsers.useQuery();
```

### 서버 컴포넌트

`caller`를 이용하여 사용

```tsx
const trpc = await createAsyncCaller();
const users = await trpc.test.getUsers();
```
