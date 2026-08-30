// 고전문학 만화 작품 목록 (c) 2026 KIMYERANG.
// 스프레드시트 1번째 시트, A열=제목, B열=구글 드라이브 PDF 링크(2행부터)

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const rows = sheet.getDataRange().getValues();
  const works = [];
  for (let i = 1; i < rows.length; i++) {
    const title = String(rows[i][0] || '').trim();
    const link = String(rows[i][1] || '').trim();
    if (!title || !link) continue;
    const m = link.match(/[-\w]{25,}/);
    if (!m) continue;
    works.push({ title: title, fileId: m[0] });
  }
  return ContentService.createTextOutput(JSON.stringify(works))
    .setMimeType(ContentService.MimeType.JSON);
}

// 시트를 열 때 "만화 등록" 메뉴를 달아준다
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('만화 등록')
    .addItem('PDF 공유 설정 고치기', 'fixSharing')
    .addToUi();
}

// B열의 PDF들을 전부 "링크가 있는 모든 사용자 - 뷰어"로 맞춰준다
function fixSharing() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const rows = sheet.getDataRange().getValues();
  let fixed = 0;
  for (let i = 1; i < rows.length; i++) {
    const link = String(rows[i][1] || '').trim();
    const m = link.match(/[-\w]{25,}/);
    if (!m) continue;
    try {
      DriveApp.getFileById(m[0]).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fixed++;
    } catch (err) {
      // 링크가 잘못됐거나 접근 권한이 없는 파일은 건너뜀
    }
  }
  SpreadsheetApp.getUi().alert(fixed + '개 파일의 공유 설정을 확인했어요.');
}
