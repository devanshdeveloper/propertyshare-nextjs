export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function updateSearchParam(searchParams, key, value) {
  const url = new URLSearchParams(searchParams.toString());
  url.set(key, value);
  return url.toString();
}

export function getCities(cities) {
  let city = ["All Cities"];
  for (let i = 0; i < cities.length; i++) {
    if (city.includes(cities[i].city)) continue;
    city.push(cities[i].city);
  }
  return city;
}

export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
