export const getGreeting = () => {
  const date = new Date();
  const hour = date.getHours();

  if (hour < 5) {
    return 'night';
  } else if (hour < 12) {
    return 'morning';
  } else if (hour < 17) {
    return 'afternoon';
  } else if (hour < 21) {
    return 'evening';
  } else {
    return 'night';
  }
};

export const greeting = getGreeting();

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const dataURItoBlob = (dataURI: string, type: string) => {
  const binary = atob(dataURI.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: type });
};

const compressImage = (file: File, quality: number): Promise<Blob> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      const width = image.width * quality;
      const height = image.height * quality;
      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      const dataUrl = canvas.toDataURL(file.type);
      const blobData = dataURItoBlob(dataUrl, file.type);
      resolve(blobData);
    };

    reader.onload = (e: ProgressEvent<FileReader>) => {
      image.src = e?.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};

export const getCompressedImageFile = async (file: File, quality?: number) => {
  if (!quality) {
    if (file.size < 1024 * 50) {
      quality = 0.95;
    } else if (file.size < 1024 * 100) {
      quality = 0.9;
    } else if (file.size < 1024 * 500) {
      quality = 0.85;
    } else if (file.size < 1024 * 1024) {
      quality = 0.8;
    } else if (file.size < 1024 * 1024 * 5) {
      quality = 0.7;
    } else if (file.size < 1024 * 1024 * 10) {
      quality = 0.6;
    } else {
      quality = 0.5;
    }
  }

  const compressedBlob: Blob = await compressImage(file, quality);
  const compressedBlobFile = new window.File([compressedBlob], file.name, { type: file.type });

  console.log('压缩前：', `${file.size / 1024 / 1024}mb  ｜｜ ${file.size / 1024}kb`);
  console.log('压缩后：', `${compressedBlobFile.size / 1024 / 1024}mb  ｜｜ ${compressedBlobFile.size / 1024}kb`);

  return compressedBlobFile;
};
