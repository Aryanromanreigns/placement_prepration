
// --- State ---
const state = {
    currentUser: null,
    selectedCompany: 'Amazon', // Default
    questions: [],
    isRecording: false
};

// --- Mock Data ---
// const questionDB = [
//     {
//         id: 1,
//         title: "Two Sum",
//         difficulty: "Easy",
//         companies: ["Amazon", "Google", "Microsoft", "Apple"],
//         mostAsked: true,
//         desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//         starter: "def twoSum(nums, target):\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        # Your logic here\n        pass"
//     },
//     {
//         id: 2,
//         title: "Longest Substring Without Repeating Characters",
//         difficulty: "Medium",
//         companies: ["Amazon", "Facebook", "Adobe"],
//         mostAsked: true,
//         desc: "Given a string s, find the length of the longest substring without repeating characters.",
//         starter: "def lengthOfLongestSubstring(s):\n    # Sliding window approach\n    pass"
//     },
//     {
//         id: 3,
//         title: "Merge K Sorted Lists",
//         difficulty: "Hard",
//         companies: ["Microsoft", "Google", "Uber"],
//         mostAsked: false,
//         desc: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.",
//         starter: "def mergeKLists(lists):\n    import heapq\n    # Min heap approach\n    pass"
//     },
//     {
//         id: 4,
//         title: "Valid Parentheses",
//         difficulty: "Easy",
//         companies: ["Amazon", "Oracle", "Samsung"],
//         mostAsked: true,
//         desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
//         starter: "def isValid(s):\n    stack = []\n    pass"
//     },
//     {
//         id: 5,
//         title: "LRU Cache",
//         difficulty: "Medium",
//         companies: ["Amazon", "Twitter", "Snapchat"],
//         mostAsked: true,
//         desc: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
//         starter: "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass"
//     }
// ];

// --- Login Logic ---
// function performLogin() {
//     const user = document.getElementById('usernameInput').value;
//     if(user) {
//         state.currentUser = user;
//         document.getElementById('login-screen').style.display = 'none';
//         document.getElementById('app-container').style.display = 'flex';
//         document.getElementById('dashboardTargetCompany').innerText = state.selectedCompany;
//         showToast(`Welcome back, ${user}!`);
//     }
// }


function performLogin() {
    const username = document.getElementById('usernameInput').value;
    const password = document.querySelector('input[type="password"]').value;

    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => {
            if (!res.ok) throw new Error('Invalid credentials');
            return res.json();
        })
        .then(data => {
            state.currentUser = data.user.name;

            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-container').style.display = 'flex';
            document.getElementById('dashboardTargetCompany').innerText = state.selectedCompany;

            showToast(`Welcome back, ${state.currentUser}!`);
        })
        .catch(() => {
            showToast('Login failed');
        });
}


// --- Navigation ---
function navigate(viewId, btnElement) {
    // Update Sidebar
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    // Switch View
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

// --- Company Search Logic ---
// function selectCompany() {
//     const input = document.getElementById('companyInput').value.trim();
//     if (!input) return;

//     // Logic: Check if real, or Generate Fake Data
//     const isReal = ["Amazon", "Google", "Microsoft", "Apple", "Netflix", "Uber", "Meta", "Tesla"].includes(input);

//     state.selectedCompany = input;
//     document.getElementById('selectedCompanyDisplay').innerText = input;
//     document.getElementById('currentCompanyLabel').innerHTML = `<i class="fa-solid fa-bullseye"></i> ${input}`;
//     document.getElementById('dashboardTargetCompany').innerText = input;

//     // Generate Mock Data for the "Analysis"
//     const topicsUl = document.getElementById('companyTopics');
//     const processDiv = document.getElementById('companyProcess');

//     if (isReal) {
//         topicsUl.innerHTML = "<li>Arrays & Hashing</li><li>System Design</li><li>Behavioral (Leadership Principles)</li>";
//         processDiv.innerHTML = "1. Online Assessment<br>2. Technical Screen (Video)<br>3. Onsite (4-5 Rounds)";
//         showToast(`Loaded official data for ${input}`);
//     } else {
//         // Simulation for unknown company
//         topicsUl.innerHTML = `<li>Custom Algorithms (Detected)</li><li>${input} Stack Specific</li><li>General CS Fundamentals</li>`;
//         processDiv.innerHTML = "1. HR Screening<br>2. Technical Take-Home<br>3. Panel Interview";
//         showToast(`AI generated preparation kit for ${input}`);
//     }

//     document.getElementById('companyResultArea').style.display = 'block';

//     // Filter questions to match (Simulation)
//     renderQuestionList();
// }
// --- Company Search Logic (Backend Connected) ---
function selectCompany() {
    const input = document.getElementById('companyInput').value.trim();
    if (!input) return;

    // Update state & UI (SAME AS BEFORE)
    state.selectedCompany = input;
    document.getElementById('selectedCompanyDisplay').innerText = input;
    document.getElementById('currentCompanyLabel').innerHTML =
        `<i class="fa-solid fa-bullseye"></i> ${input}`;
    document.getElementById('dashboardTargetCompany').innerText = input;

    const topicsUl = document.getElementById('companyTopics');
    const processDiv = document.getElementById('companyProcess');

    // Loading state
    topicsUl.innerHTML = `<li>Loading...</li>`;
    processDiv.innerHTML = `Loading...`;

    // 🔗 FETCH FROM BACKEND
    fetch(`http://localhost:5000/api/company/${input}`)
        .then(res => res.json())
        .then(data => {
            // Render topics
            topicsUl.innerHTML = data.topics
                .map(topic => `<li>${topic}</li>`)
                .join('');

            // Render process
            processDiv.innerHTML = data.process.join('<br>');

            showToast(`Loaded data for ${input}`);
        })
        .catch(() => {
            topicsUl.innerHTML = `<li>Error loading data</li>`;
            processDiv.innerHTML = `Please try again`;
            showToast('Failed to load company data');
        });

    // Show result area
    document.getElementById('companyResultArea').style.display = 'block';

    // Load questions from backend
    renderQuestionList();
}


// --- Coding Logic ---
// function renderQuestionList() {
//     const container = document.getElementById('questionsContainer');
//     const difficulty = document.getElementById('difficultyFilter').value;

//     container.innerHTML = '';

//     // Filter Logic
//     const filtered = questionDB.filter(q => {
//         const matchesDiff = difficulty === 'All' || q.difficulty === difficulty;
//         // Smart Match: If company is in the question's company array OR it's a generic list
//         const matchesCompany = q.companies.includes(state.selectedCompany) || Math.random() > 0.5;
//         return matchesDiff && matchesCompany;
//     });

//     if (filtered.length === 0) {
//         container.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--text-muted);">No questions found for ${state.selectedCompany} at ${difficulty} level. Try changing difficulty.</div>`;
//         return;
//     }

//     filtered.forEach(q => {
//         // Generate Cross Company Tags
//         const otherCompanies = q.companies.filter(c => c !== state.selectedCompany).slice(0, 2);
//         let tagsHtml = `<span class="tag tag-${q.difficulty.toLowerCase()}">${q.difficulty}</span>`;

//         if (q.mostAsked) tagsHtml += ` <span class="tag tag-company"><i class="fa-solid fa-fire"></i> Most Asked</span>`;

//         if (otherCompanies.length > 0) {
//             tagsHtml += ` <span class="tag tag-company">Also: ${otherCompanies.join(', ')}</span>`;
//         }

//         const el = document.createElement('div');
//         el.className = 'question-item';
//         el.innerHTML = `
//                     <div>
//                         <div style="font-weight: 600; font-size: 1.1rem; color: white;">${q.id}. ${q.title}</div>
//                         <div class="tags">${tagsHtml}</div>
//                     </div>
//                     <i class="fa-solid fa-chevron-right" style="color: var(--text-muted);"></i>
//                 `;
//         el.onclick = () => loadQuestion(q);
//         container.appendChild(el);
//     });
// }

function renderQuestionList() {
    const container = document.getElementById('questionsContainer');
    const difficulty = document.getElementById('difficultyFilter').value;

    container.innerHTML = '<div style="color:var(--text-muted)">Loading...</div>';

    fetch(
        `http://localhost:5000/api/questions?company=${state.selectedCompany}&difficulty=${difficulty}`
    )
    .then(res => res.json())
    .then(questions => {
        container.innerHTML = '';

        if (questions.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:2rem; color:var(--text-muted)">
                    No questions found.
                </div>`;
            return;
        }

        questions.forEach(q => {
            const otherCompanies = q.companies.filter(c => c !== state.selectedCompany).slice(0, 2);

            let tagsHtml = `<span class="tag tag-${q.difficulty.toLowerCase()}">${q.difficulty}</span>`;
            if (q.mostAsked) tagsHtml += ` <span class="tag tag-company">Most Asked</span>`;
            if (otherCompanies.length)
                tagsHtml += ` <span class="tag tag-company">Also: ${otherCompanies.join(', ')}</span>`;

            const el = document.createElement('div');
            el.className = 'question-item';
            el.innerHTML = `
                <div>
                    <div style="font-weight:600">${q.id}. ${q.title}</div>
                    <div class="tags">${tagsHtml}</div>
                </div>
                <i class="fa-solid fa-chevron-right"></i>
            `;
            el.onclick = () => loadQuestion(q);
            container.appendChild(el);
        });
    });
}






function loadQuestion(q) {
    document.getElementById('questionListMode').style.display = 'none';
    document.getElementById('editorMode').style.display = 'flex';

    document.getElementById('problemTitle').innerText = q.title;
    document.getElementById('problemDesc').innerText = q.desc;
    document.getElementById('codeArea').value = q.starter;

    // Generate Tags for Editor View
    const crossTags = q.companies.filter(c => c !== state.selectedCompany).join(', ') || "None";
    document.getElementById('crossCompanyTags').innerText = crossTags;

    document.getElementById('consoleOutput').innerHTML = '> Ready...';
}

function closeEditor() {
    document.getElementById('questionListMode').style.display = 'block';
    document.getElementById('editorMode').style.display = 'none';
}

function runCode() {
    const consoleOut = document.getElementById('consoleOutput');
    consoleOut.innerHTML = '> Compiling...<br>> Running Test Case 1... <span style="color:var(--success)">PASSED</span><br>> Running Test Case 2... <span style="color:var(--success)">PASSED</span><br><br>> <strong>Result: Accepted (Runtime: 64ms)</strong>';
    showToast("Code Accepted!");
}

// --- Analysis & Voice (Web Speech API) ---
function toggleRecord() {
    const btn = document.getElementById('recordBtn');
    const status = document.getElementById('recordStatus');

    if (!state.isRecording) {
        // Start
        state.isRecording = true;
        btn.innerHTML = '<i class="fa-solid fa-stop"></i>';
        btn.style.backgroundColor = 'var(--danger)';
        status.innerText = "Listening...";

        // Simulate processing
        setTimeout(() => {
            if (state.isRecording) finishAnalysis();
        }, 5000); // Auto stop after 5s for demo
    } else {
        finishAnalysis();
    }
}

function finishAnalysis() {
    state.isRecording = false;
    const btn = document.getElementById('recordBtn');
    btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    btn.style.backgroundColor = 'var(--primary)';
    document.getElementById('recordStatus').innerText = "Processing...";

    setTimeout(() => {
        document.getElementById('analysisResults').style.display = 'block';
        document.getElementById('pauseCount').innerText = Math.floor(Math.random() * 3);
        document.getElementById('fillerCount').innerText = Math.floor(Math.random() * 5) + 1; // Always show some fillers for demo
        document.getElementById('speechSpeed').innerText = "145";
        document.getElementById('recordStatus').innerText = "Analysis Complete";
    }, 1000);
}

// --- Turbo Interview ---
let turboInterval;
const turboQuestions = [
    "Tell me about a time you failed.",
    "Explain the Internet to a 5 year old.",
    "Implement a Queue using Stacks.",
    "Why do you want to work here?",
    "Difference between Process and Thread."
];

function startTurboInterview() {
    document.getElementById('turboModal').style.display = 'flex';
    pickRandomQuestion();
}

function endTurbo() {
    clearInterval(turboInterval);
    document.getElementById('turboModal').style.display = 'none';
}

function pickRandomQuestion() {
    const q = turboQuestions[Math.floor(Math.random() * turboQuestions.length)];
    document.getElementById('turboQuestion').innerText = q;
    resetTimer();
}

function handleTurboAction() {
    // Toggle speaking state simulation
    const wave = document.getElementById('turboWave');
    if (wave.style.display === 'none') {
        wave.style.display = 'flex';
        document.getElementById('turboBtn').innerText = "Finish Answer";
        document.getElementById('turboBtn').classList.add('btn-danger');
    } else {
        wave.style.display = 'none';
        document.getElementById('turboBtn').innerText = "Next Question";
        document.getElementById('turboBtn').classList.remove('btn-danger');
        // Show feedback toast
        showToast("Good pacing! Clear structure.");
    }
}

function resetTimer() {
    let timeLeft = 60;
    document.getElementById('turboTimer').innerText = `01:00`;
    clearInterval(turboInterval);
    turboInterval = setInterval(() => {
        timeLeft--;
        const secs = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
        document.getElementById('turboTimer').innerText = `00:${secs}`;
        if (timeLeft <= 0) {
            clearInterval(turboInterval);
            showToast("Time's up! Moving on...");
            setTimeout(pickRandomQuestion, 1500);
        }
    }, 1000);
}

// --- Utilities ---
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Initialize
document.onload = () => {
    // Render initial list
    renderQuestionList();
};
renderQuestionList(); // Force run

