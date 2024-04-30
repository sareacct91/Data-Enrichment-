export default async function(params) {
  const response = await fetch(`/externalapi/photos${params}`);

  if (!response.ok) {
    throw {
      error: {
        code: response.status,
        message: response.statusText
      }
    };
  }

  return await response.json();
}
