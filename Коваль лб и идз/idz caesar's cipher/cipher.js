const languages = [
    { name: "en", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { name: "ua", alphabet: "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ" }
];

let currentLanguage = "en";

function cipher(text, key) {
    const language = languages.find(lang => lang.name === currentLanguage);
    const alphabet = language.alphabet;

    return text
        .split("")
        .map(char => {
            const charIndex = alphabet.indexOf(char.toUpperCase());
            if (charIndex !== -1) {
                const newIndex =
                    (charIndex + key + alphabet.length) % alphabet.length;
                return char === char.toUpperCase()
                    ? alphabet[newIndex]
                    : alphabet[newIndex].toLowerCase();
            }
            return char;
        })
        .join("");
}

function changeLanguage() {
    currentLanguage = document.getElementById("language").value;

    const language = languages.find(lang => lang.name === currentLanguage);
    const keyInput = document.getElementById("key");
    keyInput.placeholder = `Введіть ключ (1-${language.alphabet.length - 1})`;

    keyInput.setAttribute("max", language.alphabet.length - 1);

    document.getElementById(
        "inputText"
    ).placeholder = `Введіть текст (${currentLanguage.toUpperCase()})`;
    document.getElementById(
        "outputText"
    ).placeholder = `Результат (${currentLanguage.toUpperCase()})`;
}

function validateKey() {
    const language = languages.find(lang => lang.name === currentLanguage);
    const keyInput = document.getElementById("key");
    const key = parseInt(keyInput.value);

    if (isNaN(key) || key < 1 || key > language.alphabet.length - 1) {
        alert(
            `Ключ повинен бути цілим числом від 1 до ${
                language.alphabet.length - 1
            }`
        );
        keyInput.value = "";
    }
}

function encrypt() {
    validateKey();
    const inputText = document.getElementById("inputText").value;
    const key = parseInt(document.getElementById("key").value);
    const encryptedText = cipher(inputText, key);
    document.getElementById("outputText").value = encryptedText;
}

function decrypt() {
    validateKey();
    const inputText = document.getElementById("inputText").value;
    const key = parseInt(document.getElementById("key").value);
    const decryptedText = cipher(inputText, -key);
    document.getElementById("outputText").value = decryptedText;
}

changeLanguage();
