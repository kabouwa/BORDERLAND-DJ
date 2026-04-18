// Toggle password visibility
document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.target);
        const icon = btn.querySelector('i');
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        icon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        btn.style.color = isPassword ? 'var(--primary)' : 'var(--text-3)';
    });
});
// Password match indicator
const p1 = document.getElementById('password1');
const p2 = document.getElementById('password2');
const msg = document.getElementById('match-msg');

function matchPw(){
    if (p1.value === p2.value) {
        msg.textContent = '✓ Passwords match';
        msg.style.color = 'var(--success)';
    } else {
        msg.textContent = '✗ Passwords do not match';
        msg.style.color = 'var(--danger)';
    }
}