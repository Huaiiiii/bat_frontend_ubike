const prizePool = [1, 2, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

let box = prizePool.slice();

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

while (box.length > 0) {
  const idx = getRandomIndex(box.length);
  const prize = box[idx];

  box.splice(idx, 1);
  console.log(`抽到 ${prize} 號獎 目前尚未抽取的獎勵為 [ ${box.join(", ")} ]`);
}
