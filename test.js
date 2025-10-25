let scores = [
  { name: "Wasan", duration: 93 },
  { name: "Muntaser", duration: 122 },
  { name: "Noura", duration: 235 },
  { name: "Maitha", duration: 927 },
];

function ultimateScoreBoard(arr, count) {
  let final = "";
  for (let i = 0; i < count; i++) {
    let min = `${Math.floor(arr[i].duration / 60)}`;
    let rem = `${arr[i].duration % 60}`;
    let fin = `${min}:${rem}`;
    final += `#0${i + 1} - ${min.length == 1 ? "0" : ""}${min}:${
      rem.length == 1 ? "0" : ""
    }${rem}, ${arr[i].name}\n`;
  }
  return final;
}

let Score = ultimateScoreBoard(scores, 3);
console.log(Score);
