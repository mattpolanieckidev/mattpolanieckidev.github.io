const toggleThemeButton = document.getElementById("toggle-theme");
toggleThemeButton.addEventListener("click", () => {
    const h1 = document.querySelector("h1");
    const flashcard = document.getElementById("flashcard");
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.classList.toggle("dark-mode"));
    document.body.classList.toggle("dark-mode");
    h1.classList.toggle("dark-mode");
    flashcard.classList.toggle("dark-mode");
    const currentTheme = document.body.classList.contains("dark-mode") ? "Dark" : "Light";
    toggleThemeButton.textContent = `${currentTheme === "Dark" ? "☀️" : "🌙"} Mode`;
    localStorage.setItem("theme", currentTheme);
    
});




const flashcards = 
[
{"phrase": "אדרבה", "translation": "On the contrary", "description": "Used to present a perspective or conclusion opposite to what was previously assumed or stated."},
{"phrase": "אטו", "translation": "Is it so?/Do you think?", "description": "Often rhetorical, challenging a premise or assumption in the discussion."},
{"phrase": "אי אפשר", "translation": "It is impossible", "description": "Indicates that a certain scenario or explanation cannot logically occur."},
{"phrase": "אי נמי", "translation": "Alternatively", "description": "Introduces an additional explanation, possibility, or line of reasoning."},
{"phrase": "אין הכי נמי", "translation": "Yes, indeed!", "description": "Confirms the validity of a statement or argument."},
{"phrase": "אלא מאי", "translation": "But what [then]?", "description": "Poses a rhetorical question to challenge or refine a previous point."},
{"phrase": "אימא", "translation": "I would say", "description": "Introduces a clarification or reinterpretation of a statement."},
{"phrase": "איתמר", "translation": "It was stated", "description": "Introduces an authoritative teaching or statement, often by Amoraim."},
{"phrase": "אין ספק מוציא מידי ודאי", "translation": "A doubt cannot override a certainty", "description": "A principle asserting that a definite reality is not displaced by uncertainty."},
{"phrase": "בשלמא", "translation": "It is well [understood]", "description": "Used to introduce a point that aligns logically with the discussion."},
{"phrase": "בעי", "translation": "[He] asks/requests", "description": "Introduces a question, inquiry, or need for clarification."},
{"phrase": "גופא", "translation": "Returning to the earlier statement", "description": "Used to refocus the discussion on a previously mentioned topic."},
{"phrase": "האי מאי", "translation": "What is this?", "description": "Challenges or seeks clarification on a specific point or term."},
{"phrase": "הכי קאמר", "translation": "This is what [it] means", "description": "Clarifies the intended meaning of a statement or teaching."},
{"phrase": "הוה אמינא", "translation": "I would have thought", "description": "Describes an initial assumption that is later rejected."},
{"phrase": "הכא במאי עסקינן", "translation": "Here, what are we dealing with?", "description": "Clarifies the context or specific case under discussion."},
{"phrase": "ולא עוד אלא", "translation": "Not only that, but", "description": "Introduces an additional or stronger argument."},
{"phrase": "והתנן", "translation": "But didn’t we learn in the Mishnah?", "description": "Raises a challenge based on a previously taught Mishnah."},
{"phrase": "והא", "translation": "But behold!", "description": "Introduces a difficulty or contradiction in the discussion."},
{"phrase": "ורמינהו", "translation": "They posed a contradiction", "description": "Highlights a contradiction between two sources, often Mishnah or Baraita."},
{"phrase": "זיל", "translation": "Go", "description": "Instructs someone to take action, often in a legal or practical context."},
{"phrase": "טעמא ד...", "translation": "The reason is [because of]", "description": "Introduces the rationale behind a law or ruling."},
{"phrase": "ייתיב", "translation": "[He] was sitting", "description": "Describes a sage's position while teaching or discussing."},
{"phrase": "כמה דלא", "translation": "As long as not", "description": "Sets a condition for a situation or ruling."},
{"phrase": "לא צריכא אלא", "translation": "It is needed only", "description": "Clarifies the necessity or exclusivity of a ruling."},
{"phrase": "מאי טעמא", "translation": "What is the reason?", "description": "Seeks to understand the reasoning behind a statement or law."},
{"phrase": "מאי בינייהו", "translation": "What is the difference between them?", "description": "Explores practical differences between two views or rulings."},
{"phrase": "מיתיבי", "translation": "They raised an objection", "description": "Introduces a challenge from a higher source, such as a Mishnah or Baraita."},
{"phrase": "מנלן", "translation": "From where do we know this?", "description": "Seeks the scriptural source for a statement or law."},
{"phrase": "נפקא מינה", "translation": "A practical difference arises", "description": "Explores the implications or consequences of a distinction."},
{"phrase": "סברא היא", "translation": "It is logical", "description": "Supports a statement with reasoning rather than textual proof."},
{"phrase": "קא סלקא דעתך", "translation": "You might have thought", "description": "Introduces a mistaken assumption that is later corrected."},
{"phrase": "קל וחומר", "translation": "A fortiori argument", "description": "Uses logic to argue from a lenient case to a stricter one, or vice versa."},
{"phrase": "קשיא", "translation": "It is difficult", "description": "Acknowledges an unresolved difficulty or contradiction."},
{"phrase": "רבי פלוני אומר", "translation": "Rabbi [so-and-so] says", "description": "Introduces a teaching or opinion from a specific rabbi."},
{"phrase": "רישא", "translation": "The beginning of a statement", "description": "Refers to the first part of a Mishnah or Baraita."},
{"phrase": "סיפא", "translation": "The end of a statement", "description": "Refers to the latter part of a Mishnah or Baraita."},
{"phrase": "שמע מינה", "translation": "Learn from this", "description": "Draws a conclusion from the discussion or text."},
{"phrase": "תיקו", "translation": "Let it remain unresolved", "description": "Leaves a question unresolved, awaiting future clarification."},
{"phrase": "תניא", "translation": "It was taught in a Baraita", "description": "Introduces a teaching from a Baraita."},
{"phrase": "תנינא", "translation": "We learned in a Mishnah", "description": "Introduces a teaching from the Mishnah."},
{"phrase": "תנו רבנן", "translation": "The sages taught", "description": "Introduces a teaching from the sages, often in a Baraita."},
{"phrase": "הכי נמי מסתברא", "translation": "This is also logical", "description": "Supports a point by appealing to logic or common sense."},
{"phrase": "כי האי גוונא", "translation": "In such a case", "description": "Refers to a specific or similar situation."},
{"phrase": "לא שנא", "translation": "It makes no difference", "description": "Indicates equivalence between two scenarios."},
{"phrase": "לכתחילה", "translation": "Ideally", "description": "Describes the preferred way to fulfill a mitzvah or ruling."},
{"phrase": "בדיעבד", "translation": "After the fact", "description": "Describes a situation where a less-than-ideal action is nonetheless valid."},
{"phrase": "וכי תימא", "translation": "And if you say", "description": "Introduces a hypothetical objection or question."},
{"phrase": "היינו דאמרי אינשי", "translation": "This is what people say", "description": "Connects a point to a common saying or proverb."},
{"phrase": "מהו דתימא", "translation": "What might you have said?", "description": "Explores an assumption that could have been made but is corrected."}
]


let currentIndex = 0;
const flashcard = document.getElementById('flashcard');
const showTranslationButton = document.getElementById('show-translation');
const nextCardButton = document.getElementById('next-card');
const progressBar = document.getElementById('progress-bar');

// Function to shuffle the flashcards array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(flashcards); // Shuffle the flashcards array

function updateFlashcard() {
    const currentFlashcard = flashcards[currentIndex];
    flashcard.innerHTML = `<span class="phraseInitial">Phrase: ${currentFlashcard.phrase}</span><br>`
    showTranslationButton.disabled = false;
    nextCardButton.disabled = false;
}

function showTranslation() {
    const currentFlashcard = flashcards[currentIndex];
    flashcard.innerHTML = 
        `<span class="phrase">Phrase: ${currentFlashcard.phrase}</span><br>` +
        `<span class="translation">Translation: ${currentFlashcard.translation}</span><br>` +
        `<span class="description">Description: ${currentFlashcard.description}</span>`;
    showTranslationButton.disabled = true;
}

function nextFlashcard() {
    currentIndex++;
    if (currentIndex < flashcards.length) {
        updateFlashcard();
        const progress = ((currentIndex) / flashcards.length) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        flashcard.textContent = "✓"; // Checkmark symbol
        progressBar.style.width = `100%`;
        alert('You have completed all the flashcards!');
        showTranslationButton.disabled = true;
      
    }
}

showTranslationButton.addEventListener('click', showTranslation);
nextCardButton.addEventListener('click', nextFlashcard);

// Initialize the first flashcard
updateFlashcard();
