
export default class User {

    constructor(username = "", password = "", email = "") {
        this.username = username;
        this.password = password;
        this.email = email;
    };

    URL = 'https://60c8ea647dafc90017ffbcea.mockapi.io/users';
    users = [];

    // Mi prendo i dati dal server, li rendo oggetto javscript e me li faccio restituire
    fetchUsers = async () => {
        const usersFromServer = await fetch(this.URL);
        const response = await usersFromServer.json();

        return response;
    };

    // Gestione della ui/ux attraverso classi css a seconda se l'utente deve registrasi o loggarsi
    handleForm = () => {
        const signinBtn = document.querySelector('.signin_btn');
        const signupBtn = document.querySelector('.signup_btn');
        const formBox = document.querySelector('.form_box');
        const body = document.querySelector('body');

        signupBtn.onclick = () => {
            formBox.classList.add('active')
            body.classList.add('active')
        };

        signinBtn.onclick = () => {
            formBox.classList.remove('active')
            body.classList.remove('active')
        };

    };

    /*  
     -------- AREA REGISTRAZIONE -------
     
         Gestione validazione, 
         chiamata al server(post request) una volta inseriti tutti i campi,  
         Salvataggio in memoria degli utenti
                                      */
    handleSignup = () => {
        const formBox = document.querySelector('.form_box');
        const formSignup = document.querySelector('#form_signup');
        const submitSignup = document.querySelector('#submit_signup');
        const usernameSignup = document.querySelector('#username_signup');
        const emailSignup = document.querySelector('#email_signup');
        const pswSignup = document.querySelector('#psw_signup');
        const confirmPswSignup = document.querySelector('#confirm_psw_signup');

        submitSignup.onclick = async (e) => {
            e.preventDefault();
            let userIn;
            (usernameSignup.value === '') || (emailSignup.value === '') || (pswSignup.value === '') || (confirmPswSignup.value === '')
                ? alert('I Campi Sono Tutti Obbligatori')
                : (pswSignup.value !== confirmPswSignup.value)
                    ? alert('Inserisci Correttamente La Password In Entrambi I campi')
                    : (userIn = new User(usernameSignup.value, pswSignup.value, emailSignup.value),
                        formSignup.reset(),
                        alert('Ora Puoi Effettuare il login'),
                        setTimeout(() => formBox.classList.remove('active'), 1000)
                    );


            const userObj = { // Destructuring dell'oggetto
                username: userIn.username,
                password: userIn.password,
                email: userIn.email
            };

            const res = await fetch(this.URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userObj)
            })

            const data = await res.json();
            this.users.push(data)
        };
    };

    /* 
        ------AREA ACCESSO-----
    
          Gestione validazione,
          chiamata al server(get request) per controllare l'utente è registrato oppure no,
          se la validazione è andata a buon fine cambio di pagina al main altrimenti area registrazione
                                   */
    handleSignin = () => {
        const formBox = document.querySelector('.form_box');
        const usernameSignin = document.getElementById('username_signin');
        const pswSignin = document.getElementById('psw_signin');
        const submitSignin = document.getElementById('submit_signin');

        submitSignin.onclick = async (e) => {
            e.preventDefault();

            const usersFromServer = await this.fetchUsers(this.URL);
            console.log(usersFromServer);

            const userObj = {
                username: usernameSignin.value,
                password: pswSignin.value
            };

            const { username, password } = userObj;
            let flagUserIspresent = false;

            usersFromServer.forEach(user => {
                if ((username === user.username) && (password === user.password)) {
                    flagUserIspresent = true;
                    return
                }
            });

            setTimeout(() => formBox.classList.add('active'), 1000);

            flagUserIspresent
                ? window.location.href = '../main.html'
                : alert('Utente Non Presente, Inserisci Correttamente Tutti I Campi Oppure Registrati');
        };

    };

};














