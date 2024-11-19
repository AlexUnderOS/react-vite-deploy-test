import './Login.scss'

function LoginPage() {
    return (
        <div className="login-page">
            <div className="container ">
                <div className="content box-shadow-1">
                    <h2>Log In</h2>
                    <p className="tel-p">Please enter your phone number</p>
                    <form action="#">
                        <div className="tel-input-container">
                            <span className="country-code">+371</span>
                            <input type="tel" autoFocus="autofocus" maxLength={8} minLength={8}/>
                        </div>
                        <pre className="or-hr"> or </pre>
                        <div className="social-icons">
                            <img
                                className="facebook"
                                src="/src/images/social/facebook.svg"
                                alt="facebook icon"
                            />
                            <img
                                className="google"
                                src="/src/images/social/google.svg"
                                alt="google icon"
                            />
                        </div>
                        <button className='submit-button'>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
