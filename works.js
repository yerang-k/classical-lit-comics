// 작품 목록은 구글 시트에서 불러온다. 새 작품 등록:
// 1) PDF 파일을 GitHub 저장소의 works 폴더에 올린다
// 2) 시트에 "제목 + 파일명" 한 줄을 추가한다
const WORKS_API_URL = 'https://script.google.com/macros/s/AKfycbySht7ttgztYAocAIG-_djogOAdWeVfktoebs0Y7eaAu-J04doU-3u4N4CY2mmo24euhg/exec';

async function getWorks() {
  const res = await fetch(WORKS_API_URL);
  if (!res.ok) throw new Error('작품 목록을 불러오지 못했습니다');
  return res.json();
}

function pdfUrlFor(file) {
  return 'works/' + file;
}
