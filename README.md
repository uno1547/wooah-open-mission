# 🎧 AI 기반 플리(Playlist) 추천 & 저장 웹앱

## 📌 프로젝트 개요

낯선 기술 탐구를 목표로 **Node.js + Express 기반 웹 API 서버**,  
**Firestore DB**, 그리고 **OpenAI API를 활용한 추천 기능**을 결합하여  
사용자가 키워드를 입력하면 노래를 추천받고, 원하는 노래를 저장하여  
나만의 플레이리스트(플리)를 만들 수 있는 간단한 웹앱을 개발하였다.

## 🌐 배포 링크

**👉 [https://wooah-open-mission.onrender.com](https://wooah-open-mission.onrender.com)**

- 회원가입 후 로그인하여 AI 기반 노래 추천을 받아보세요!
- 검색어 입력 시 OpenAI가 관련 노래를 추천하고, 마음에 드는 곡을 저장할 수 있습니다.
- 첫 접속 시 서버 웜업에 약 30초~1분 정도 소요될 수 있습니다. (Render 무료 플랜 특성)


---

## 🔧 기술 스택 & 아키텍처

| 영역 | 기술 |
|------|------|
| Backend | Node.js, Express |
| AI API | OpenAI API (ChatGPT) |
| Database | Firestore (Firebase) |
| Auth | JWT (JSON Web Token) |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Deployment (예정) | Render / Firebase Hosting |

---

## 🏗 시스템 구성
```yaml
[ Client (index.html + JS) ]
        ↓ (fetch API)
[ Express Server ]
 ┣ Routes
 ┣ Controllers
 ┣ Services
 ┃ ┣ OpenAI 통신
 ┃ ┣ Firestore DB 처리
 ┃ ┗ JWT 인증
 ┗ Models (optional)

[ Firestore DB ]
 ┗ users
 ┗ playlists

[ OpenAI API ]
 ┗ 검색어 기반 노래 추천 JSON 응답
```
## ✨ 주요 기능 소개

| 기능 | 설명 |
|------|------|
| 🔍 AI 기반 노래 추천 | 검색어 입력 시 OpenAI API를 통해 관련 노래 추천 (name, singer, genre, youtubeLink, youtubeTumbnail) |
| 📄 JSON 응답 파싱 | AI 응답을 구조화된 JSON 형태로 파싱 |
| 💾 플레이리스트 저장 | 로그인된 사용자의 서브컬렉션에 노래 저장 |
| 🔐 JWT 인증 | 회원가입 및 로그인, 토큰 기반 인증 (bcrypt 비밀번호 해싱) |
| 📂 내 플리 조회 | 사용자별 플레이리스트 Firestore 서브컬렉션에서 조회 |

---

## 🗂 구현 구조

### 🔙 Backend

- **Routes**: API endpoint 정의 (`/api/openAI/recommend`, `/api/user/list`, `/api/auth/login`, `/api/auth/register`)
- **Controllers**: 요청 처리 및 응답 JSON 생성 (authController, openAIController, userController)
- **Services**: OpenAI 호출, Firestore 접근, Auth 로직 (authService, openAIService, userService)
- **Middlewares**: JWT 인증 미들웨어 (authMiddleware)
- **Firebase**: Firestore DB 연결 설정

### 🎨 Frontend

- `index.html`: 검색 및 결과 UI
- `script.js`: API 호출 및 DOM 렌더링, JWT 관리
- `style.css`: UI 스타일링 (선택)
- (선택) 로그인 / 회원가입 페이지

### 🗂 Database (Firestore)

| 컬렉션 | 구조 | 내용 |
|--------|------|------|
| `users` | 문서 ID: userId | id, hashedPassword, createdAt |
| `users/{userId}/playlists` | 서브컬렉션 | name, singer, genre, youtubeLink, youtubeTumbnail, createdAt |

---
## 📌 기능별 요구사항

---

### 🔙 BACKEND

- [X] 클라이언트 검색 요청 → OpenAI API 호출 및 응답 중계  
- [X] AI 응답 데이터를 JSON 형태로 파싱하여 반환  
- [X] 회원가입 API (아이디/비밀번호, bcrypt 해싱, Firestore 저장)  
- [X] 로그인 API (JWT 토큰 발급)  
- [X] 내 플레이리스트 목록 불러오기 (JWT 인증 미들웨어)  
- [X] 노래 저장 API (JWT 인증, 사용자별 서브컬렉션에 저장)  

---

### 🎨 FRONTEND

- [X] 검색어 입력 후 `/api/openAI/recommend` 호출  
- [X] 응답받은 노래 리스트를 DOM으로 렌더링  
- [X] **제목(링크) / 가수 / 장르 / 썸네일** 형태로 리스트 표시  
- [X] 각 리스트에 **"저장하기" 버튼** 추가  
- [X] 저장 버튼 클릭 시 JWT 포함하여 `/api/user/list` POST 요청  
- [X] 로그인 / 회원가입 UI 구현 (SPA 방식)  
- [X] 내 플레이리스트 페이지 구현 (GET `/api/user/list`)  
- [X] 로그아웃 기능 (localStorage 토큰 제거)  

---
