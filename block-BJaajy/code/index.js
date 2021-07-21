const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

let all = Promise.allSettled([one, two, three])
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

let all = Promise.all([one, two, three])
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
