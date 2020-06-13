function updateURLParameter(url, param, paramVal) {
  const [extraUrl, fragment] = url.split('#');
  const [baseUrl, query] = extraUrl.split('?');

  let filteredQuery = '';
  if (query) {
    filteredQuery = query.split('&')
      .filter((paramStr) => paramStr.split('=')[0] !== param)
      .join('&');
  }

  let newUrl = `${baseUrl}?${param}=${paramVal}`;
  if (filteredQuery) newUrl += `&${filteredQuery}`;
  if (fragment) newUrl += `#${fragment}`;

  return newUrl;
}


export { updateURLParameter };
