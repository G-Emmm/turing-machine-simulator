class Cell {
  constructor(symbol) {
    this.symbol = symbol;
    // Make div
    let tag = document.createElement("p");
    let text = document.createTextNode(this.symbol);
    tag.appendChild(text);
    let tape = document.getElementById("tmTape");
    tape.appendChild(tag);
  }
  // ubah symbol
  changeTo(newSymbol) {
    this.symbol = newSymbol;
  }
}
