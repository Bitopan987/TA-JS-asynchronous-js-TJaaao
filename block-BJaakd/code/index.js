let first = new Promise((resolve, reject) => {
  resolve('John');
})
  .then((value) => {
    return Promise.resolve('Arya');
  })
  .then((value) => {
    console.log(value);
    return new Promise((res, rej) => {
      setTimeout(() => res('Bran'), 2000);
    });
  })
  .then(console.log);
