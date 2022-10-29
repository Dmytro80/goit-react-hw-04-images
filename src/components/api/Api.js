import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getPictures = async ({ page, query, controller }) => {
  const response = await axios.get(`?q=${query}&page=${page}`, {
    params: {
      key: '29755041-61309e7f07fd00c6b0d56abc7',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    },
    signal: controller.signal,
  });
  return response.data;
};
