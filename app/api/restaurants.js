const ACCESS_KEY1 = "aad509307b9ba2c4f837075b7d89b489";
const ACCESS_KEY2 = "a0e7f227408acebaa5640bb2b9d21e7e";
const ACCESS_KEY4 = "df2d7478089d3035757f32a6d879ef6f";
const ACCESS_KEY3 = "c66668b62f0977d6166ff48520a5c8d3";

export const getCategoriesApi = () => {
  const url = `https://api.gnavi.co.jp/master/CategoryLargeSearchAPI/v3/?keyid=${ACCESS_KEY3}`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getLocationRestaurantsApi = (location) => {
  const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${ACCESS_KEY3}&latitude=${location.latitude}&longitude=${location.longitude}&range=3&hit_per_page=20`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getCategoryRestaurantsApi = (categoryCode, page = 1) => {
  const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${ACCESS_KEY3}&category_l=${categoryCode}&offset=${page}&hit_per_page=20`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getConditionsRestaurantsApi = (type, page = 1) => {
  const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${ACCESS_KEY3}&${type}=1&offset=${page}&hit_per_page=20`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getAreaRestaurantsApi = (areacode, page = 1) => {
  const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${ACCESS_KEY3}&areacode_l=${areacode}&offset=${page}&hit_per_page=20`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getAreaSearchApi = () => {
  const url = `https://api.gnavi.co.jp/master/AreaSearchAPI/v3/?keyid=${ACCESS_KEY3}`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getPrefSearchApi = () => {
  const url = `https://api.gnavi.co.jp/master/PrefSearchAPI/v3/?keyid=${ACCESS_KEY3}`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getAreaLargeSearchApi = () => {
  const url = `https://api.gnavi.co.jp/master/GAreaLargeSearchAPI/v3/?keyid=${ACCESS_KEY3}`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getRestaurantApi = (id) => {
  const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${ACCESS_KEY3}&id=${id}`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};

export const getSearchRestaurantsApi = (freeword, page = 1, per_page = 20) => {
  const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${ACCESS_KEY3}&freeword=${freeword}&offset=${page}&hit_per_page=${per_page}`;

  return fetch(url).then(async (response) => {
    return response.json();
  });
};
