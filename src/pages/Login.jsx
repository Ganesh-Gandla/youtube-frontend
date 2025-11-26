function Login(){
    return (
        <>
        <div>
            {/* google logo */}
            <img src="" alt="Google Logo" />
            {/* large text */}
            <p>Login to your Google Account</p>
            {/* small text */}
            <p>Enter your details</p>
        </div>
        <form action="">
            {/* add fieldset and legend input */}
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            {/* Button on right corner */}
            <button>Log In</button>
        </form>
        </>
    )
}

export default Login