## API 서버 예제 코드
어떻게 하면 TDD 를 적용한 API 서버를 만들 수 있는지 공부해보고, 적용해본 입니다. (저는 이렇게 만듭니다)  
유저 이메일/비밀번호를 이용하여 JWT 토큰을 발급하는 예제 서버입니다.
커밋 기록을 쭉 따라가며 보셔도 좋습니다. (커밋 메세지가 제대로 적혀있진 않아요)  

## 간단 설명
MariaDB 를 DB로 사용하며, express를 라우팅 라이브러리로 사용합니다.  
인증은 JWT 토큰을 반환하는 것으로 이루어집니다.  

## 폴더 구조
```
src
├── middlewares
│   ├── auth.ts
│   └── jwt.ts
├── models
│   ├── interfaces // Service 에서 필요한 인터페이스 정의
│   │   └── IUserModel.ts
│   ├── db.ts
│   └── user.ts // IUserModel 구현
├── routes
│   └── users
│       └── index.ts
├── services
│   └── user.ts
├── tests
│   ├── typedi.test.ts
│   └── users.test.ts
├── app.ts // express App
└── index.ts // main entry
 ```

## 사용한 주요 라이브러리들
`express`: 라우팅 라이브러리  
`jsonwebtoken`: JWT 토큰 발급  
`apidoc`: API 문서화  
`supertest`: HTTP API를 시뮬레이션하고, 테스트 하기 위함  
`jest`: 테스팅 라이브러리  
`mariadb`: DB 라이브러리  
`tsyringe`: IoC DI 컨테이너 (테스트를 위한 설계 때문)  
`winston`: 로그 라이브러리  