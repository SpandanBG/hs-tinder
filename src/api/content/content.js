async function getInitialContent() {
  return new Promise((resolve) =>
    resolve([
      { title: "5" },
      { title: "4" },
      { title: "3" },
      { title: "2" },
      { title: "1" },
    ])
  );
}

async function getNextContent() {
  return new Promise((resolve) =>
    resolve({ title: `${parseInt((Math.random() * 100) % 100)}` })
  );
}

export { getInitialContent, getNextContent };
