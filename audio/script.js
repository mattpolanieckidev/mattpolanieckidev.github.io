    const nameInput = document.getElementById('name');
    const subjectInput = document.getElementById('subject');
    const conversationTypeInput = document.getElementById('conversationType');
    const recordButton = document.getElementById('record-button');
    const stopButton = document.getElementById('stop-button');
    const recordingStatus = document.getElementById('recording-status');
    const recordingsList = document.getElementById('recordings-list');
    const audioPlayer = document.getElementById('audio-player');
    const audioPlayerContainer = document.getElementById('audio-player-container');
    const messageBox = document.getElementById('message-box');

    let mediaRecorder;
    let audioChunks = [];
    let recordings = [];
    let recognition;
    let finalTranscript = '';

    function showMessage(message, type = 'success') {
        messageBox.textContent = message;
        messageBox.className = `fixed top-4 left-1/2 transform -translate-x-1/2 bg-${type === 'success' ? 'green' : 'red'}-100 text-${type === 'success' ? 'green' : 'red'}-700 border border-${type === 'success' ? 'green' : 'red'}-400 px-4 py-2 rounded shadow-md`;
        messageBox.classList.add('show');
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 3000);
    }

    async function getMedia() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const recording = {
                    name: nameInput.value,
                    subject: subjectInput.value,
                    conversationType: conversationTypeInput.value,
                    audioUrl: audioUrl,
                    audioBlob: audioBlob,
                    timestamp: new Date().toISOString(),
                    transcription: finalTranscript
                };
                recordings.push(recording);
                localStorage.setItem('recordings', JSON.stringify(recordings));
                audioChunks = [];
                finalTranscript = '';
                updateRecordingsList();
                recordingStatus.textContent = 'Recording stopped. Click play to listen.';
                recordButton.classList.remove('hidden');
                stopButton.classList.add('hidden');
            };

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognition = new SpeechRecognition();
                recognition.lang = 'en-US';
                recognition.continuous = true;
                recognition.interimResults = false;

                recognition.onresult = (event) => {
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript + ' ';
                        }
                    }
                };

                recognition.onerror = (event) => {
                    console.warn('Speech recognition error', event.error);
                };
            } else {
                console.warn("SpeechRecognition API not supported in this browser.");
            }

        } catch (err) {
            console.error('Error accessing microphone:', err);
            showMessage('Please allow microphone access to record.', 'error');
        }
    }

    function startRecording() {
        if (!nameInput.value || !subjectInput.value || !conversationTypeInput.value) {
            showMessage('Please fill in all the fields before recording.', 'error');
            return;
        }
        recordButton.classList.add('hidden');
        stopButton.classList.remove('hidden');
        recordingStatus.textContent = 'Recording...';
        recordingStatus.classList.add('recording-animation');
        audioChunks = [];
        mediaRecorder.start();

        if (recognition) {
            finalTranscript = '';
            recognition.start();
        }
    }

    function stopRecording() {
        recordingStatus.classList.remove('recording-animation');
        mediaRecorder.stop();

        if (recognition) {
            recognition.stop();
        }
    }

    function playRecording(audioUrl) {
        audioPlayer.src = audioUrl;
        audioPlayerContainer.classList.remove('hidden');
        audioPlayer.play();
    }

    function updateRecordingsList() {
        if (!recordings || recordings.length === 0) {
            recordingsList.innerHTML = '<li class="text-gray-500">No recordings yet.</li>';
            return;
        }

        recordingsList.innerHTML = '';
        recordings.forEach((recording, index) => {
            const listItem = document.createElement('li');
            listItem.className = "bg-white p-4 rounded-md shadow-sm flex justify-between items-start";

            const recordingInfo = document.createElement('div');
            recordingInfo.innerHTML = `
                <h4 class="text-md font-semibold text-gray-800">${recording.name} - ${recording.subject} - ${recording.conversationType}</h4>
                <p class="text-sm text-gray-500">Recorded: ${new Date(recording.timestamp).toLocaleString()}</p>
                ${recording.transcription ? `<p class="text-sm text-gray-700 mt-1 italic">Transcript: ${recording.transcription}</p>` : ''}
            `;

            const playButton = document.createElement('button');
            playButton.textContent = 'Play';
            playButton.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm";
            playButton.addEventListener('click', () => playRecording(recording.audioUrl));

            const downloadButton = document.createElement('a');
            downloadButton.textContent = 'Download';
            downloadButton.href = recording.audioUrl;
            downloadButton.download = `${recording.name}-${recording.subject}-${recording.conversationType}-${new Date(recording.timestamp).toISOString()}.webm`;
            downloadButton.className = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm ml-2";

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'flex space-x-2';
            buttonContainer.appendChild(playButton);
            buttonContainer.appendChild(downloadButton);

            listItem.appendChild(recordingInfo);
            listItem.appendChild(buttonContainer);
            recordingsList.appendChild(listItem);
        });
    }

    const transcriptButton = document.createElement('button');
transcriptButton.textContent = 'Download Transcript';
transcriptButton.className = "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm";
transcriptButton.addEventListener('click', () => {
    const blob = new Blob([recording.transcription || 'No transcript available.'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recording.name}-${recording.subject}-${recording.conversationType}-${new Date(recording.timestamp).toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
});


    window.onload = () => {
        const savedRecordings = localStorage.getItem('recordings');
        if (savedRecordings) {
            try {
                recordings = JSON.parse(savedRecordings);
                updateRecordingsList();
            } catch (error) {
                console.error("Error parsing saved recordings:", error);
                recordings = [];
                localStorage.removeItem('recordings');
                updateRecordingsList();
            }
        }

        getMedia();
        recordButton.addEventListener('click', startRecording);
        stopButton.addEventListener('click', stopRecording);
    };



