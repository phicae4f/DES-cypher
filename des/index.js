// Функция для преобразования строки в массив байтов

function stringToBytes(str) {
  return Array.from(str).map((char) => char.charCodeAt(0));
}

// Функция для преобразования массива байтов в строку
function bytesToString(bytes) {
  return String.fromCharCode(...bytes);
}

// DES шифрование и дешифрование (простой пример)
class DES {
  constructor(key) {
    this.key = key;
    // Здесь могут быть другие необходимые параметры DES
  }

  // Простой пример функции шифрования
  encrypt(plaintext) {
    let bytes = stringToBytes(plaintext);
    // Ваша логика шифрования будет здесь
    // Для примера просто инвертируем байты (не настоящий DES)
    let encrypted = bytes.map((byte) => 255 - byte);
    return bytesToString(encrypted);
  }

  // Простой пример функции дешифрования
  decrypt(ciphertext) {
    let bytes = stringToBytes(ciphertext);
    // Ваша логика дешифрования будет здесь
    // Инвертируем байты обратно
    let decrypted = bytes.map((byte) => 255 - byte);
    return bytesToString(decrypted);
  }
}

let des = new DES("mysecretkey");

const plaintextInput = document.querySelector("#plainText");
const buttonPlainText = document.querySelector(".buttonEnc");
const resultPlainText = document.querySelector(".resultPlainText");
const desypherPlainText = document.querySelector(".desypherPlainText");

buttonPlainText.addEventListener("click", () => {
  const plainWords = JSON.parse(localStorage.getItem("plainWords")) || [];
  plainWords.push(plaintextInput.value);
  localStorage.setItem("plainWords", JSON.stringify(plainWords));

  let encryptedMessage = des.encrypt(plaintextInput.value);
  let decryptedMessage = des.decrypt(encryptedMessage);

  resultPlainText.textContent = `Зашифрованный вариант: ${encryptedMessage}`;
  desypherPlainText.textContent = `Первоначальный вид: ${decryptedMessage}`;

  plaintextInput.value = "";
  renderTable();
});

const decTextInput = document.querySelector("#decText");
const buttonDecText = document.querySelector(".buttonDec");
const resultEncryptedText = document.querySelector(".resultEncryptedText");
const desypherEncryptedText = document.querySelector(".desypherEncryptedText");

buttonDecText.addEventListener("click", () => {
  const encryptWords = JSON.parse(localStorage.getItem("encryptWords")) || [];
  encryptWords.push(decTextInput.value);
  localStorage.setItem("encryptWords", JSON.stringify(encryptWords));

  let encryptedMessage = des.encrypt(decTextInput.value);
  let decryptedMessage = des.decrypt(encryptedMessage);

  resultEncryptedText.textContent = `Первоначальный вид: ${decryptedMessage}`;
  desypherEncryptedText.textContent = `Расшифрованный вариант: ${encryptedMessage}`;
  decTextInput.value = "";
  renderTable();
});

function renderTable() {
  const plainWords = JSON.parse(localStorage.getItem("plainWords")) || [];
  const tbodyElForPLain = document.querySelector(".tbodyElForPLain");
  const encryptWords = JSON.parse(localStorage.getItem("encryptWords")) || [];
  const tbodyElForEnc = document.querySelector(".tbodyElForEnc");

  tbodyElForPLain.innerHTML = "";
  plainWords.forEach((word, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${word}</td>
    `;
    tbodyElForPLain.append(row);
  });

  tbodyElForEnc.innerHTML = "";
  encryptWords.forEach((word, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${word}</td>
    `;
    tbodyElForEnc.append(row);
  });
}

renderTable();
