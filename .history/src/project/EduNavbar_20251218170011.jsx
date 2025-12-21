import React, { useState, useEffect } from "react";
<input
type={showPwd ? "text" : "password"}
placeholder="Enter password"
{...loginRegister("password", {
required: "Please fill this field",
})}
/>
<span onClick={() => setShowPwd(!showPwd)}>
{showPwd ? <FaEyeSlash /> : <FaEye />}
</span>
</div>
<p>{loginErrors.password?.message}</p>


<button className="auth-btn">Login</button>


<div className="footer-text">
Don’t have an account?{" "}
<span onClick={() => {
setShowLogin(false);
setShowSignup(true);
}}>Sign Up</span>
</div>
</form>
</Modal.Body>
</Modal>


{/* ================= SIGNUP MODAL ================= */}
<Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
<Modal.Header closeButton>
<Modal.Title>Sign Up</Modal.Title>
</Modal.Header>
<Modal.Body>
{signupMsg && <div className="msg error">{signupMsg}</div>}


<form onSubmit={handleSubmit(onSignup)}>
<div className="name-row">
<input placeholder="Enter first name" {...register("firstName", { required: true })} />
<input placeholder="Enter last name" {...register("lastName", { required: true })} />
</div>


<label>Email</label>
<input
placeholder="Enter email"
{...register("email", { required: true })}
/>


<label>Password</label>
<input
type="password"
placeholder="Enter password"
{...register("password", { required: true, minLength: 6 })}
/>


<button className="auth-btn">Create Account</button>


<div className="footer-text">
Already have an account?{" "}
<span onClick={() => {
setShowSignup(false);
setShowLogin(true);
}}>Login</span>
</div>
</form>
</Modal.Body>
</Modal>
</>
);
}