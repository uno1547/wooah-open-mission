# 🎧 AI 기반 플리(Playlist) 추천 & 저장 웹앱

## 📌 프로젝트 개요

낯선 기술 탐구를 목표로 **Node.js + Express 기반 웹 API 서버**,  
**Firestore DB**, 그리고 **OpenAI API를 활용한 추천 기능**을 결합하여  
사용자가 키워드를 입력하면 노래를 추천받고, 원하는 노래를 저장하여  
나만의 플레이리스트(플리)를 만들 수 있는 간단한 웹앱을 개발하였다.

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
| 🔍 AI 기반 노래 추천 | 검색어 입력 시 OpenAI API를 통해 관련 노래 추천 |
| 📄 JSON 응답 파싱 | AI 응답을 제목, 가수, 썸네일, 유튜브 링크 형태로 정리 |
| 💾 플레이리스트 저장 | 로그인된 사용자가 원하는 노래 저장 가능 |
| 🔐 JWT 인증 | 회원가입 및 로그인, 토큰 기반 인증 |
| 📂 내 플리 조회 | 사용자별 플리 리스트 Firestore에서 조회 |

---

## 🗂 구현 구조

### 🔙 Backend

- **Routes**: API endpoint 정의 (`/api/openai/search`, `/api/playlist`, `/api/auth/login`, `/api/auth/register`)
- **Controllers**: 요청 처리 및 응답 JSON 생성
- **Services**: OpenAI 호출, Firestore 접근, Auth 로직
- **Models (선택)**: Playlist, User 데이터 구조 정의

### 🎨 Frontend

- `index.html`: 검색 및 결과 UI
- `script.js`: API 호출 및 DOM 렌더링, JWT 관리
- `style.css`: UI 스타일링 (선택)
- (선택) 로그인 / 회원가입 페이지

### 🗂 Database (Firestore)

| 컬렉션 | 내용 |
|--------|------|
| `users` | userId, username, hashedPassword, createdAt |
| `playlists` | title, artist, thumbnail, youtubeLink, userId, savedAt |

---
## 📌 기능별 요구사항

---

### 🔙 BACKEND

- [ ] 클라이언트 검색 요청 → OpenAI API 호출 및 응답 중계  
- [ ] AI 응답 데이터를 JSON 형태로 파싱하여 반환  
- [X] 회원가입 API (아이디/비밀번호, Firestore 저장)  
- [X] 로그인 API (JWT 토큰 발급)  
- [ ] 내 플리 목록 불러오기 (JWT 기반 인증)  
- [ ] 노래 저장 API (인증된 사용자만 가능)  

---

### 🎨 FRONTEND

- [ ] 검색어 입력 후 `/api/recommend` 호출  
- [ ] 응답받은 노래 리스트를 DOM 기반 UI로 렌더링  
- [ ] **제목 / 가수 / 썸네일 / 유튜브 링크** 형태로 리스트 표시  
- [ ] 각 리스트 우측에 **"저장" 버튼** 추가  
- [ ] 저장 버튼 클릭 시 JWT 포함하여 `/api/save` 요청  
- [ ] 로그인 / 회원가입 UI (선택 구현)  

---
