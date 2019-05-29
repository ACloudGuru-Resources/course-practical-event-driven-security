const index = {
  "chapter-2": require("./chapter-2.json"),
  "chapter-3": require("./chapter-3.json"),
  "chapter-4": require("./chapter-4.json"),
  "chapter-5": require("./chapter-5.json"),
  "chapter-6": require("./chapter-6.json"),
  "chapter-7": require("./chapter-7.json"),
  "chapter-8": require("./chapter-8.json")
};

Object.keys(index).forEach(key => {
  const val = index[key];
  console.log(`${key}: ${val.length} questions`);
});
