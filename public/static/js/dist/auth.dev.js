"use strict";

// Toggle password visibility
document.querySelectorAll('.toggle-pass').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var input = document.getElementById(btn.dataset.target);
    var icon = btn.querySelector('i');
    var isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    icon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    btn.style.color = isPassword ? 'var(--primary)' : 'var(--text-3)';
  });
}); // Password match indicator

var p1 = document.getElementById('password1');
var p2 = document.getElementById('password2');
var msg = document.getElementById('match-msg');

function matchPw() {
  if (p1.value === p2.value) {
    msg.textContent = '✓ Passwords match';
    msg.style.color = 'var(--success)';
  } else {
    msg.textContent = '✗ Passwords do not match';
    msg.style.color = 'var(--danger)';
  }
}