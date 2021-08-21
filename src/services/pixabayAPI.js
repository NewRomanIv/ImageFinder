const baseURL =
  "https://pixabay.com/api/?key=22629513-0416b1734fff54844a0105211";
// "https://pixabay.com/ap/?key=22629513-0416b1734fff54844a01052";

const fetchGalleryImages = (queryString) => {
  let assembly = Object.keys(queryString)
    .map((key) => {
      return "&" + key + "=" + queryString[key];
    })
    .join("");
  return fetch(`${baseURL}${assembly}`).then((res) => res.json());
};

export default { fetchGalleryImages };
