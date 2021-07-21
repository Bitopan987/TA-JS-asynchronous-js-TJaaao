let PromiseOne = fetch(`https://random.dog/woof.json`).then((res) =>
  res.json()
);
let PromiseTwo = fetch(`https://aws.random.cat/meow`).then((res) => res.json());

Promise.race([PromiseOne, PromiseTwo]).then(console.log);
