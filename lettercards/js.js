const letters = {
    "א": ["אַ", "אָ", "אֶ", "אִ", "אוּ"],
    "ב": ["בַּ", "בָּ", "בֶּ", "בִּ", "בּוּ"],
    "בּ": ["בַּ", "בָּ", "בֶּ", "בִּ", "בּוּ"],
    "ג": ["גַ", "גָ", "גֶ", "גִ", "גוּ"],
    "ד": ["דַ", "דָ", "דֶ", "דִ", "דוּ"],
    "ה": ["הַ", "הָ", "הֶ", "הִ", "הוּ"],
    "ו": ["וַ", "וָ", "וֶ", "וִ", "ווּ"],
    "ז": ["זַ", "זָ", "זֶ", "זִ", "זוּ"],
    "ח": ["חַ", "חָ", "חֶ", "חִ", "חוּ"],
    "ט": ["טַ", "טָ", "טֶ", "טִ", "טוּ"],
    "י": ["יַ", "יָ", "יֶ", "יִ", "יוּ"],
    "כ": ["כַּ", "כָּ", "כֶּ", "כִּ", "כּוּ"],
    "ך": ["כַּ", "כָּ", "כֶּ", "כִּ", "כּוּ"],
    "ל": ["לַ", "לָ", "לֶ", "לִ", "לוּ"],
    "מ": ["מַ", "מָ", "מֶ", "מִ", "מוּ"],
    "ם": ["מַ", "מָ", "מֶ", "מִ", "מוּ"],
    "נ": ["נַ", "נָ", "נֶ", "נִ", "נוּ"],
    "ן": ["נַ", "נָ", "נֶ", "נִ", "נוּ"],
    "ס": ["סַ", "סָ", "סֶ", "סִ", "סוּ"],
    "ע": ["עַ", "עָ", "עֶ", "עִ", "עוּ"],
    "פ": ["פַּ", "פָּ", "פֶּ", "פִּ", "פּוּ"],
    "ף": ["פַּ", "פָּ", "פֶּ", "פִּ", "פּוּ"],
    "צ": ["צַ", "צָ", "צֶ", "צִ", "צוּ"],
    "ץ": ["צַ", "צָ", "צֶ", "צִ", "צוּ"],
    "ק": ["קַ", "קָ", "קֶ", "קִ", "קוּ"],
    "ר": ["רַ", "רָ", "רֶ", "רִ", "רוּ"],
    "ש": ["שַׁ", "שָׁ", "שֶׁ", "שִׁ", "שׁוּ"],
    "ת": ["תַּ", "תָּ", "תֶּ", "תִּ", "תּוּ"]
};

    const flashcard = document.getElementById("flashcard");
    const nextButton = document.getElementById("next-button");
    const nekudotToggle = document.getElementById("toggle-nekudot");
    const letterCheckboxes = document.querySelectorAll(".letter-checkbox");

    let selectedLetters = [];
    let includeNekudot = false;

    

    // Update selected letters
    letterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const value = checkbox.value;
            if (checkbox.checked) {
                selectedLetters.push(value);
            } else {
                selectedLetters = selectedLetters.filter(letter => letter !== value);
            }
            resetFlashcard();
        });
    });

    // Toggle nekudot visibility
    nekudotToggle.addEventListener("change", () => {
        includeNekudot = nekudotToggle.checked;
        resetFlashcard();
    });

    // Show a random flashcard
    nextButton.addEventListener("click", () => {
        if (selectedLetters.length === 0) {
            flashcard.textContent = "Try Again";
           
            return;
        }

        const randomLetter = selectedLetters[Math.floor(Math.random() * selectedLetters.length)];
        const display = includeNekudot ? letters[randomLetter][Math.floor(Math.random() * letters[randomLetter].length)] : randomLetter;
        flashcard.style.fontSize="30vw"
        flashcard.textContent = display;
    });

    // Reset flashcard when settings change
    function resetFlashcard() {
        flashcard.textContent = "Select letters to begin";

        
    }