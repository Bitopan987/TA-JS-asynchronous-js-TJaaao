let promise = new Promise((resolve, reject) =>
  setTimeout(() => reject('Rejected Promise!'), 1000)
).catch((error) => console.error(error));
