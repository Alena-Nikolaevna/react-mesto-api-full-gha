//Login — компонент авторизации пользователя с необходимыми стейт-переменными
import React from "react";

function Login(props) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    /*React.useEffect(() => {
        setEmail("");
        setPassword("");
    }, [isOpen]);*/

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        props.handleLogin({ email, password });

        // Передаём значения управляемых компонентов во внешний обработчик
        /* onAddPlace({
             name: email,
             link: link,
         });*/
    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    return (
        <section className="auth">
            <h2 className="auth__form-heading">Вход</h2>
            <div className="auth__container">

                <form className="auth__form" name="auth-form-login" onSubmit={handleSubmit}>

                    <input className="auth__form-input" type="email" placeholder="Email" name="email" minLength="2" maxLength="35" value={email || ''} onChange={handleChangeEmail} />
                    <input className="auth__form-input" type="password" placeholder="Пароль" name="password" minLength="6" maxLength="16" value={password || ''} onChange={handleChangePassword} />

                    <button className="auth__form-button-enter" type="submit">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default Login;
