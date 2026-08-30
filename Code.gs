// 고전문학 만화 작품 목록 (c) 2026 KIMYERANG.
// 스프레드시트 1번째 시트, A열=제목, B열=works 폴더 안 PDF 파일명(2행부터)
// 예) 춘향전 | chunhyangjeon.pdf

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const rows = sheet.getDataRange().getValues();
  const works = [];
  for (let i = 1; i < rows.length; i++) {
    const title = String(rows[i][0] || '').trim();
    const file = String(rows[i][1] || '').trim();
    if (!title || !file) continue;
    works.push({ title: title, file: file });
  }
  return ContentService.createTextOutput(JSON.stringify(works))
    .setMimeType(ContentService.MimeType.JSON);
}
