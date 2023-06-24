export const handleFetchEvents = () => {
  return new Promise((resolve, reject) => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
