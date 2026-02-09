const display = document.getElementById('display');
let currentMode = 'normal';

const hindiMap = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };
const englishToHindiMap = { '0': '०', '1': '१', '2': '२', '3': '३', '4': '४', '5': '५', '6': '६', '7': '७', '8': '८', '9': '९' };

// Advanced Hindi Word Mapping
const ones = ["", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ"];
const teens = ["दस", "ग्यारह", "बारह", "तेरह", "चौदह", "पंद्रह", "सोलह", "सत्रह", "अठारह", "उन्नीस"];
const tens = ["", "", "बीस", "तीस", "चालीस", "पचास", "साठ", "सत्तर", "अस्सी", "नब्बे"];

function openTab(evt, tabName) {
    currentMode = tabName;
    
    // Hide all tab content
    let tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Handle button classes
    let tabLinks = document.getElementsByClassName("btn1");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the English layout for both 'normal' and 'english' modes
    if (tabName === 'normal' || tabName === 'english') {
        document.getElementById('english').style.display = "grid";
    } else {
        document.getElementById(tabName).style.display = "grid";
    }

    if (evt) evt.currentTarget.classList.add("active");
}

function appendToDisplay(input) { display.value += input; }
function clearDisplay() { display.value = ""; }
function deleteLast() { display.value = display.value.slice(0, -1); }

function calculate() {
    try {
        let inputVal = display.value;
        
        // Convert Hindi digits back to English for calculation
        for (let key in hindiMap) {
            inputVal = inputVal.split(key).join(hindiMap[key]);
        }

        let result = eval(inputVal);
        let resultStr = result.toString();

        if (currentMode === 'hindi') {
            let hindiResult = "";
            for (let char of resultStr) {
                hindiResult += englishToHindiMap[char] || char;
            }
            display.value = hindiResult;
        } 
        else if (currentMode === 'english') {
            display.value = numberToHindiWords(Math.floor(result));
        } 
        else {
            // Normal mode
            display.value = result;
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Proper Hindi Number System (Handles up to 99,999)
function numberToHindiWords(n) {
    if (n === 0) return "शून्य";
    if (n < 0) return "ऋण " + numberToHindiWords(Math.abs(n));

    let words = "";

    if (Math.floor(n / 1000) > 0) {
        words += numberToHindiWords(Math.floor(n / 1000)) + " हजार ";
        n %= 1000;
    }

    if (Math.floor(n / 100) > 0) {
        words += ones[Math.floor(n / 100)] + " सौ ";
        n %= 100;
    }

    if (n > 0) {
        if (n < 10) words += ones[n];
        else if (n < 20) words += teens[n - 10];
        else {
            words += tens[Math.floor(n / 10)];
            if (n % 10 > 0) words += " " + ones[n % 10];
        }
    }

    return words.trim();
}

// Set initial state
window.onload = function() {
    openTab(null, 'normal');
};