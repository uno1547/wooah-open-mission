function showPage(pageId) {
  document.querySelectorAll('main section').forEach(sec => sec.style.display = 'none');
  document.getElementById(`${pageId}-page`).style.display = 'block';

  // header 메뉴 표시
  const token = localStorage.getItem('accessToken');
  if(token){
    document.getElementById('nav-login').style.display = 'none';
    document.getElementById('nav-register').style.display = 'none';
    document.getElementById('nav-search').style.display = 'inline';
    document.getElementById('nav-playlist').style.display = 'inline';
    document.getElementById('nav-logout').style.display = 'inline';
  } else {
    document.getElementById('nav-login').style.display = 'inline';
    document.getElementById('nav-register').style.display = 'inline';
    document.getElementById('nav-search').style.display = 'none';
    document.getElementById('nav-playlist').style.display = 'none';
    document.getElementById('nav-logout').style.display = 'none';
  }
}

// 초기 로딩 시 JWT 확인
const token = localStorage.getItem('accessToken');
if (token) showPage('search');
else showPage('auth');

// header 메뉴 클릭 이벤트
document.getElementById('nav-login').addEventListener('click', () => showPage('auth'));
document.getElementById('nav-register').addEventListener('click', () => showPage('auth'));
document.getElementById('nav-search').addEventListener('click', () => showPage('search'));
document.getElementById('nav-playlist').addEventListener('click', () => showPage('playlist'));
document.getElementById('nav-logout').addEventListener('click', () => {
  localStorage.removeItem('accessToken');
  showPage('auth');
});

// 로그인 API 호출
document.getElementById('login-section').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('login-id').value;
  const password = document.getElementById('login-password').value;
  console.log(id, password);
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password })
    });
    
    const data = await response.json();
    
    if(!response.ok){
      alert(data.error || '로그인 실패');
      return;
    }
  
    localStorage.setItem('accessToken', data.token);
    alert('로그인 성공');
    showPage('search');

  } catch (error) {
    console.error('로그인 에러:', error);
    alert('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
    return;
  }
})

// 검색 입력 이벤트
document.getElementById('search-input').addEventListener('keypress', async (e) => {
  if(e.key === 'Enter'){
    const query = e.target.value;
    if(!query) return;
    const res = await fetch(`/api/openai/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';
    data.forEach(song => {
      const div = document.createElement('div');
      div.className = 'song-item';
      div.innerHTML = `
        <img src="${song.thumbnail}" alt="썸네일">
        <div class="song-info">
          <strong>${song.title}</strong> / ${song.artist} / ${song.genre}<br>
          <a href="${song.youtubeLink}" target="_blank">YouTube</a>
        </div>
        <button class="save-btn">저장하기</button>
      `;
      // 저장 버튼 클릭 이벤트
      div.querySelector('.save-btn').addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        if(!token){ alert('로그인 필요'); return; }
        await fetch('/api/user/addlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(song)
        });
        alert('저장 완료!');
      });
      resultsDiv.appendChild(div);
    });
  }
});