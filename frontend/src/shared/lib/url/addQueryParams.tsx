export const getQueryParams = (params: OptionalRecord<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([param, value]) => {
    if (value != undefined) {
      searchParams.set(param, value);
    }
  });

  return `?${searchParams.toString()}`;
};

export const addQueryParams = (params: OptionalRecord<string, string>) => {
  history.pushState({}, "", getQueryParams(params));
};
