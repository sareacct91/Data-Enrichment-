module.exports = {
  async queryInteralEndpoint(URL) {
    const response = await fetch(URL);

    if (!response.ok) {
      throw {
        code: response.status,
        message: response.statusText
      } 
    }

    return await response.json();
  },
};
