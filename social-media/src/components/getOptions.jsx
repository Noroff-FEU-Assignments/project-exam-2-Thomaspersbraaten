export function getOptions(auth, method = "GET", array) {
  //   const data = array && array;

  if (array) {
    return {
      method: method,
      headers: {
        Authorization: `bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(array),
    };
  } else {
    return {
      method: method,
      headers: {
        Authorization: `bearer ${auth}`,
        "Content-Type": "application/json",
      },
    };
  }
}
