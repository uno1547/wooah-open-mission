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

// 회원가입 API 호출
document.getElementById('register-section').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('register-id').value;
  const password = document.getElementById('register-password').value;
  console.log(id, password);
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password })
    });
    
    const data = await response.json();
    
    if(!response.ok){
      alert(data.error || '회원가입 실패');
      return;
    }
  
    alert('회원가입 성공! 로그인 해주세요.');
    document.getElementById('register-id').value = '';
    document.getElementById('register-password').value = '';
    showPage('auth');

  } catch (error) {
    console.error('회원가입 에러:', error);
    alert('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
    return;
  }
})

// 검색 입력 이벤트
document.getElementById('search-section').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value;
  if(!query) return;
  try {
    const response = await fetch(`http://localhost:3000/api/openAI/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    if(!response.ok) {
      alert(data.error || '검색 실패');
      return
    }

    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';
    
    data.forEach(song => {
      console.log(song.name, song.singer);
    })

    // const listHtml = data.map(song => `
    //   <div class="song-item">
    //     <img src="${song.youtubeTumbnail}" alt="썸네일">
    //     <div class="song-info">
    //       <strong>${song.name}</strong> / ${song.singer} / ${song.genre}<br>
    //       <a href="${song.youtubeLink}" target="_blank">YouTube</a>
    //     </div>
    //     <button class="save-btn">저장하기</button>
    //   </div>  
    // `)
    // resultsDiv.innerHTML = listHtml.join('');
    data.forEach(song => {
      const div = document.createElement('div');
      div.className = 'song-item';
      div.dataset.song = JSON.stringify(song); // ⭐ 여기 추가 (song 정보 저장)
      div.innerHTML = `
        <img src="${song.youtubeTumbnail}" alt="썸네일">
        <div class="song-info">
          <strong><a href="${song.youtubeLink}" target="_blank">${song.name}</a></strong> / ${song.singer} / ${song.genre}
        </div>
        <button type="button" class="save-btn">저장하기</button>
      `;
    resultsDiv.appendChild(div);
  });
    



  } catch(error) {
    console.error('검색 에러:', error);
    alert('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
    return;
  }
});

document.getElementById('search-results').addEventListener('click', async (e) => {
  if(e.target.classList.contains('save-btn')){
    const song = JSON.parse(e.target.closest('.song-item').dataset.song);
    console.log(song);
    const token = localStorage.getItem('accessToken');
    if(!token){ alert('로그인 필요'); return; }

    try {
      const res = await fetch('http://localhost:3000/api/user/list', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(song)
      });
      const resData = await res.json();
      if(!res.ok) {
        alert(resData.error || '저장 실패');
        return;
      }
      alert('플레이리스트에 저장 완료!');
    } catch(err) {
      console.error('저장 에러:', err);
      alert('서버 연결 실패');
    }
  }
});