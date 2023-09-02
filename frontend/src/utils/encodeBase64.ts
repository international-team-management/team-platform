const getBase64 = (file: Blob) => {
  return new Promise((resolve) => {
    let baseUrl = '';

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        baseUrl = reader.result;
        resolve(baseUrl);
      }
    };
  });
};

const checkResolution = (file: Blob) => {
  const url = window.URL || window.webkitURL;
  const img = new Image();

  img.onload = () => {
    console.log(`width: ${img.width}, height: ${img.height}`);
  };
  img.src = url.createObjectURL(file);
};

export const encodeBase64 = async (
  event: React.FormEvent<HTMLInputElement>,
) => {
  if (!event.currentTarget.files?.length) return;

  const file = event.currentTarget.files[0];

  checkResolution(file);

  const result = await getBase64(file);

  return result;
};
