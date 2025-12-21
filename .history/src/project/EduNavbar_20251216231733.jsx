/* ================= NAVBAR ================= */
.navbar {
  background: #111;
  padding: 12px 0;
  transition: all 0.3s ease;
}

.navbar-scrolled {
  background: #0d0d0d;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.navbar .navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff !important;
}

.nav-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* ================= NAV LINKS ================= */
.navbar-nav .nav-link {
  color: #fff !important;
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 12px;
  position: relative;
}

.navbar-nav .nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 0%;
  height: 2px;
  background: #0d6efd;
  transition: width 0.3s ease;
}

.navbar-nav .nav-link:hover::after,
.navbar-nav .nav-link.active::after {
  width: 100%;
}

/* ================= SEARCH ================= */
.custom-search {
  background: #fff;
  padding: 6px 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 210px;
}

.custom-search input {
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: transparent;
}

.search-left-icon {
  font-size: 1.1rem;
  opacity: 0.7;
}

/* ================= USER ================= */
.user-icon {
  cursor: pointer;
  color: #fff;
  transition: 0.3s ease;
}

.user-icon:hover {
  color: #0d6efd;
  transform: scale(1.15);
}

.username {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

/* ================= TOGGLER ================= */
.navbar-toggler {
  border: none !important;
}

.navbar-toggler-icon {
  filter: invert(1);
}

/* ================= MODAL ================= */
.modal-content {
  border-radius: 18px;
  padding: 10px;
  background: #fff;
  border: none;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  animation: popupShow 0.25s ease;
}

@keyframes popupShow {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-header {
  border-bottom: none;
  justify-content: center;
}

.modal-title {
  font-weight: bold;
  font-size: 1.4rem;
  color: #0d6efd;
}

.modal-body input {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #d0d0d0;
  transition: 0.2s;
}

.modal-body input:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 7px rgba(13, 110, 253, 0.4);
}

.modal-body button {
  padding: 10px;
  border-radius: 10px;
}

/* ================= NAME ROW ================= */
.name-row {
  display: flex;
  gap: 15px;
}

.name-row .form-group {
  flex: 1;
}

/* ================= ALERT MESSAGES ================= */
.auth-message {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  z-index: 1050;
  animation: slideDown 0.4s ease;
}

/* Success */
.auth-success {
  background: #e6f7ee;
  color: #1e7e34;
  box-shadow: 0 6px 20px rgba(30, 126, 52, 0.2);
}

/* Error */
.auth-error {
  background: #fdecea;
  color: #c82333;
  box-shadow: 0 6px 20px rgba(200, 35, 51, 0.2);
}

/* Info */
.auth-info {
  background: #e7f1ff;
  color: #0d6efd;
  box-shadow: 0 6px 20px rgba(13, 110, 253, 0.2);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* ================= RESPONSIVE ================= */
@media (max-width: 768px) {
  .navbar-collapse {
    background: #111;
    padding: 15px 20px;
    border-radius: 8px;
  }

  .custom-search {
    width: 100%;
    margin-top: 12px;
  }
}

@media (max-width: 480px) {
  .navbar-brand {
    font-size: 1.3rem;
  }

  .nav-icon {
    width: 32px;
    height: 32px;
  }
}
