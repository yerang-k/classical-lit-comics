// 작품 목록은 구글 시트에서 불러온다. 새 작품 등록은 시트에 "제목 + PDF 링크"를 한 줄 추가하면 된다.
// 배포한 앱스스크립트 웹앱 주소(.../exec)를 여기에 붙여넣는다.
const WORKS_API_URL = 'https://script.google.com/macros/s/AKfycbySht7ttgztYAocAIG-_djogOAdWeVfktoebs0Y7eaAu-J04doU-3u4N4CY2mmo24euhg/exec';

async function getWorks() {
  const res = await fetch(WORKS_API_URL);
  if (!res.ok) throw new Error('작품 목록을 불러오지 못했습니다');
  return res.json();
}

function pdfUrlFor(fileId) {
  return 'https://drive.google.com/uc?export=download&id=' + encodeURIComponent(fileId);
}
