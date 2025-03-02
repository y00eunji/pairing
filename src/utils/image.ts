export const convertWebcamImageToFile = (base64Image: string): File => {
  // base64 데이터에서 실제 데이터 부분만 추출
  const base64Data = base64Image.split(',')[1];
  // base64를 바이너리로 디코딩
  const binaryData = atob(base64Data);

  // 바이너리 데이터를 Uint8Array로 변환
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }

  // Blob 생성
  const blob = new Blob([bytes], { type: 'image/jpeg' });

  // 현재 시간을 파일명에 포함하여 유니크한 파일명 생성
  const fileName = `webcam-image-${Date.now()}.jpg`;

  // File 객체 생성 및 반환
  return new File([blob], fileName, { type: 'image/jpeg' });
};
