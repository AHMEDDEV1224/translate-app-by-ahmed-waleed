const textArea = document.getElementById('text');
const charCount = document.getElementById('charCount');

textArea.addEventListener('input', function () {
    const textLength = textArea.value.length;
    if (textLength > 500) {
        textArea.value = textArea.value.substring(0, 500);
    }
    charCount.textContent = `${textArea.value.length}/500`;
})
document.getElementById('translateButton').addEventListener('click', async function () {
    const query = document.getElementById('text').value;
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=${sourceLang}|${targetLang}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('translatedText').value = data.responseData.translatedText;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('translatedText').value = 'Error occurred while translating.';
    }
});

document.getElementById('copySource').addEventListener('click', function () {
    const text = document.getElementById('text').value;
    if (text) {
        navigator.clipboard.writeText(text).then(function () {
            alert('Source text copied to clipboard');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    } else {
        alert('No text to copy');
    }
});

document.getElementById('copyTarget').addEventListener('click', function () {
    const text = document.getElementById('translatedText').value;
    if (text) {
        navigator.clipboard.writeText(text).then(function () {
            alert('Translated text copied to clipboard');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    } else {
        alert('No text to copy');
    }
});

document.getElementById('speakSource').addEventListener('click', function () {
    const text = document.getElementById('text').value;
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const sourceLang = document.getElementById('sourceLang').value;
        if (sourceLang === 'fr') {
            utterance.lang = 'fr-FR';
        } else if (sourceLang === 'es') {
            utterance.lang = 'es-ES';
        } else {
            utterance.lang = 'en-US';
        }
        speechSynthesis.speak(utterance);
    } else {
        alert('No text to speak');
    }
});

// Speech Synthesis for Translated Text
document.getElementById('speakTarget').addEventListener('click', function () {
    const text = document.getElementById('translatedText').value;
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const targetLang = document.getElementById('targetLang').value;
        if (targetLang === 'fr') {
            utterance.lang = 'fr-FR';
        } else if (targetLang === 'es') {
            utterance.lang = 'es-ES';
        } else {
            utterance.lang = 'en-US';
        }
        speechSynthesis.speak(utterance);
    } else {
        alert('No text to speak');
    }
});