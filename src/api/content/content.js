async function getInitialContent() {
  return new Promise((resolve) =>
    resolve([
      { title: "5-5" },
      { title: "4-4" },
      { title: "3-3" },
      { title: "2-2" },
      { title: "1-1" },
    ])
  );
}

async function getNextContent() {
  return new Promise((resolve) => {
    const firstNumebr = parseInt((Math.random() * 100) % 100)
    const secondNumber = parseInt((Math.random() * 100) % 100)
    resolve({ title: `${firstNumebr}-${secondNumber}` })
  }
  );
}

export { getInitialContent, getNextContent };
