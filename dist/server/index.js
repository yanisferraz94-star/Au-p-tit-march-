export default { async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    return fetch(new URL(path, url.origin));
  } };
