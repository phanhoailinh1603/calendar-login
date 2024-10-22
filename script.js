const users = {
    'abc': '123',
    'user2': 'password2'
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'index/calendar.html'; // Chuyển hướng đến trang lịch
    } else {
        document.getElementById('loginError').innerText = "Tên người dùng hoặc mật khẩu không đúng!";
    }
}
