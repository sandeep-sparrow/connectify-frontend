import {login} from "../../util/api/userapi.js";
window.addEventListener("load", function() {

    const page = document.querySelector('.page');
    page.classList.remove('hidden');

    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        function setCookie(name, value, days, sameSite = 'Lax') {
            let expires = '';
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=' + sameSite + '; Secure; HttpOnly';
        }

        (async () => {
            const sessionId = await login(username, password).catch(error => console.error(error));
            if (sessionId) {
                console.log(sessionId);
                setCookie('JSESSIONID', sessionId, 7);
                if (localStorage.getItem('destination')){
                    window.location.href = localStorage.getItem('destination');
                }
                else window.location.href = '../dashboard/dashboard.html';
            }
        })();
    });
});

