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

export const getCompressedImageFile = async (
  file: File,
  options: {
    quality?: number; // 传递一个恒定质量
    minCompressedSize?: number; // 最小压缩大小，小于此大小的文件将不被压缩，单位 Kb
  } = {},
) => {
  if (options.minCompressedSize && file.size < options.minCompressedSize * 1024) {
    console.log(`未进行压缩，文件大小为：${file.size / 1024 / 1024}mb  ｜｜ ${file.size / 1024}kb`);
    return file;
  }

  let quality = options.quality;
  if (!quality) {
    if (file.size < 1024 * 100) {
      quality = 1;
    } else if (file.size < 1024 * 500) {
      quality = 0.8;
    } else if (file.size < 1024 * 1024) {
      quality = 0.75;
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
