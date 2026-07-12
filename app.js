// Celerity OS Website Interactive Script

document.addEventListener("DOMContentLoaded", () => {
    // Simulator Popup Controls
    const dockNova = document.getElementById("dock-nova");
    const dockSettings = document.getElementById("dock-settings");
    const avatarControl = document.getElementById("trigger-control-center");
    
    const panelNova = document.getElementById("nova-ai-panel");
    const panelControl = document.getElementById("control-center-panel");
    
    const closeNova = document.getElementById("close-nova");
    const closeControl = document.getElementById("close-control");

    // Toggle panels
    if (dockNova) {
        dockNova.addEventListener("click", () => {
            panelNova.classList.toggle("active");
            panelControl.classList.remove("active");
        });
    }

    if (dockSettings || avatarControl) {
        const toggleControl = () => {
            panelControl.classList.toggle("active");
            panelNova.classList.remove("active");
        };
        if (dockSettings) dockSettings.addEventListener("click", toggleControl);
        if (avatarControl) avatarControl.addEventListener("click", toggleControl);
    }

    // Close panels
    if (closeNova) {
        closeNova.addEventListener("click", () => panelNova.classList.remove("active"));
    }
    if (closeControl) {
        closeControl.addEventListener("click", () => panelControl.classList.remove("active"));
    }

    // Control Center Slider adjustments (Blur radius simulation)
    const blurSlider = document.getElementById("blur-slider");
    const mockupImg = document.getElementById("desktop-mockup-img");
    if (blurSlider && mockupImg) {
        blurSlider.addEventListener("input", (e) => {
            const val = e.target.value;
            // Simulate changing desktop glass plate properties
            const op = 1 - (val / 100);
            mockupImg.style.opacity = op;
        });
    }

    // Control Center Toggle switches
    const toggles = document.querySelectorAll(".toggle-switch");
    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
            if (toggle.classList.contains("active")) {
                toggle.textContent = "ON";
                toggle.style.background = "rgba(16, 185, 129, 0.2)";
                toggle.style.color = "#10b981";
            } else {
                toggle.textContent = "OFF";
                toggle.style.background = "rgba(239, 68, 68, 0.2)";
                toggle.style.color = "#ef4444";
            }
        });
    });
});

// Nova AI simulator panel responses
function sendPrompt(action) {
    const history = document.getElementById("nova-chat-output");
    if (!history) return;

    // Add user message
    const userDiv = document.createElement("div");
    userDiv.className = "chat-msg user-msg";
    userDiv.textContent = `User: ${action}`;
    history.appendChild(userDiv);
    history.scrollTop = history.scrollHeight;

    // Simulate AI thinking and outputting response script
    setTimeout(() => {
        const aiDiv = document.createElement("div");
        aiDiv.className = "chat-msg system-msg";
        
        let responseText = "";
        if (action === 'toggle dark mode') {
            responseText = "Nova Daemon: Applying setting modification. Executed GSettings color-scheme preferences successfully. Desktop active backdrop is now in deep space dark mode.";
        } else if (action === 'explain rm -rf') {
            responseText = "Nova Daemon: Threat detected. Command 'rm -rf /' was analyzed. It attempts force removal of root files. Safe-guard policies blocked execution.";
        } else if (action === 'check hardware privacy') {
            responseText = "Nova Daemon: Running device audit... \nMicrophone: inactive.\nWebcam: inactive.\nClipboard: secure (no API key matches).";
        } else {
            responseText = `Nova Daemon: Received action request '${action}'. Processing locally on local Phi3 model. Done.`;
        }

        aiDiv.textContent = responseText;
        history.appendChild(aiDiv);
        history.scrollTop = history.scrollHeight;
    }, 850);
}

// Terminal CLI emulator typing animation
let isTyping = false;
function typeCmd(commandText) {
    if (isTyping) return;
    isTyping = true;

    const termInput = document.getElementById("terminal-input-text");
    const termOutput = document.getElementById("terminal-output-content");
    if (!termInput || !termOutput) return;

    termInput.textContent = "";
    termOutput.innerHTML = "<span style='color: var(--text-secondary); opacity: 0.5;'>Analyzing...</span>";
    
    let index = 0;
    const interval = setInterval(() => {
        termInput.textContent += commandText[index];
        index++;
        if (index >= commandText.length) {
            clearInterval(interval);
            isTyping = false;
            
            // Render terminal response
            setTimeout(() => {
                renderTerminalOutput(commandText, termOutput);
            }, 500);
        }
    }, 40);
}

function renderTerminalOutput(cmd, outputElement) {
    if (cmd.includes("explain 'curl")) {
        outputElement.innerHTML = `
            <span class="output-danger">WARNING: Execution of unverified scripts piped directly to shell is high risk.</span><br>
            <strong>Nova Explanation:</strong> This command downloads a script from "telemetry.com" and pipes it directly into the bash interpreter. Telemetry domains are automatically blocked by the Celerity UFW hosts firewall.
        `;
    } else if (cmd.includes("control")) {
        outputElement.innerHTML = `
            <span style="color: #10b981;">SUCCESS: Settings configuration mapped.</span><br>
            <strong>Command Executed:</strong> <code>gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'</code><br>
            <strong>Nova Action:</strong> Desktop user interface toggled to Liquid Glass Dark Theme.
        `;
    } else if (cmd.includes("summarize")) {
        outputElement.innerHTML = `
            <span style="color: var(--accent-purple);">SUCCESS: File read locally.</span><br>
            <strong>File Analyzed:</strong> <code>branding_guide.md</code><br>
            <strong>Nova Summary:</strong><br>
            - Visual standard relies on Apple Liquid Glass design language (Electric Blue accents).<br>
            - Interface specifies frosted glass layers with 32px saturating backdrops.<br>
            - Baseline colors use Deep Space HSL dark values for optimal energy efficiency.
        `;
    } else {
        outputElement.innerHTML = `
            <span>Nova Output: Query executed successfully on local backend.</span>
        `;
    }
}
