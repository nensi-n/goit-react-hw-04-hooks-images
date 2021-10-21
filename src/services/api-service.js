import axios from "axios";

const apiService = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=20826404-6f4526022880cc6e23fc40539&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
};

export default apiService;
