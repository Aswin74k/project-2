
        <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {loginMsg && (
              <div
                className={`modal-message ${
                  loginMsg.includes("Welcome") ? "success" : "error"
                }`}
              >
                {loginMsg}
              </div>
            )}

            <Form onSubmit={handleLoginSubmit(onLoginSubmit)}>
              <input
                className="auth-input"
                placeholder="Email"
                {...loginRegister("email", { required: true })}
              />

              <div className="password-wrapper">
                <input
                  className="auth-input"
                  type={showLoginPwd ? "text" : "password"}
                  placeholder="Password" autoComplete="off"
                  {...loginRegister("password", { required: true })}
                />
                <span onClick={() => setShowLoginPwd(!showLoginPwd)}>
                  {showLoginPwd ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button className="auth-btn">Login</button>

              <div className="auth-footer">
                Don’t have an account?{" "}
                <span
                  onClick={() => {
                    setShowLogin(false);
                    setShowSignup(true);
                    setLoginMsg("");
                  }}
                >
                  Sign Up
                </span>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {formError && (
              <div className="modal-message error">{formError}</div>
            )}

            {signupMsg && (
              <div
                className={`modal-message ${
                  signupMsg.includes("exists") ? "error" : "success"
                }`}
              >
                {signupMsg}
              </div>
            )}

            <Form onSubmit={handleSignupSubmit(onSignupSubmit)}>
              <div className="name-row">
                <input
                  className="auth-input"
                  placeholder="First name"
                  {...signupRegister("firstName")}
                />
                <input
                  className="auth-input"
                  placeholder="Last name"
                  {...signupRegister("lastName")}
                />
              </div>

              <input
                className="auth-input mt-2"
                placeholder="Email"
                {...signupRegister("email")}
              />

              <div className="password-wrapper">
                <input
                  className="auth-input"
                  type={showSignupPwd ? "text" : "password"}
                  placeholder="Password" autoComplete="off"
                  {...signupRegister("password")}
                />
                <span onClick={() => setShowSignupPwd(!showSignupPwd)}>
                  {showSignupPwd ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="password-wrapper mt-2">
                <input
                  className="auth-input"
                  type={showConfirmPwd ? "text" : "password"}
                  placeholder="Confirm password" autoComplete="off"
                  {...signupRegister("confirmPassword", {
                    validate: (v) =>
                      v === password || "Passwords do not match",
                  })}
                />
                <span onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
                  {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.confirmPassword && (
                <small className="text-danger">
                  {errors.confirmPassword.message}
                </small>
              )}

              <button className="auth-btn mt-3">
                Create Account
              </button>

              <div className="auth-footer">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setShowSignup(false);
                    setShowLogin(true);
                  }}
                >
                  Login
                </span>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          show={showLogout}
          onHide={() => setShowLogout(false)}
          centered
        >
          <Modal.Body className="text-center">
            <BiLogOut style={{ fontSize: "40px", color: "#090909ff" }} />

            <h4 className="mt-3">Logout</h4>
            <p>Are you sure you want to logout of your account?</p>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                className="logout-cancel"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>

              <button
                className="logout-confirm"
                onClick={() => {
                  logout();
                  setShowLogout(false);
                }}
              >
                Logout
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
