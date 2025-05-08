import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { auth, googleProvider } from "../firebase";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // 👈 New state for forgot password
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const resetFields = () => {
    setEmail("");
    setPass("");
    setName("");
    setProfilePic("");
  };

  const isPasswordValid = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUpperCase && hasLowerCase && isLongEnough;
  };

  const signInWithEmail = async () => {
    if (!isPasswordValid(pass)) {
      toast.error("Password must include uppercase, lowercase, and be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async () => {
    if (!isPasswordValid(pass)) {
      toast.error("Password must include uppercase, lowercase, and be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profilePic,
      });
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      window.location.href = "https://mail.google.com"; // Redirect to Gmail
    } catch (err) {
      toast.error("Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* Forgot Password Section */}
        {isForgotPassword ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn btn-warning w-full mb-4"
              onClick={handleResetPassword}
              disabled={loading}
            >
              Reset Password
            </button>
            <p className="text-center">
              Back to{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => setIsForgotPassword(false)}
              >
                Login
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              {isNewUser ? "Register" : "Login"}
            </h2>

            {isNewUser && (
              <>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">Photo URL</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Photo URL"
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 relative">
              <label className="block font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <span
                className="absolute top-10 right-3 text-xl text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {/* Forgot Password Link */}
            {!isNewUser && (
              <div className="text-right mb-2">
                <span
                  className="text-blue-600 cursor-pointer underline text-sm"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot password?
                </span>
              </div>
            )}

            <button
              className={`btn w-full mb-4 ${isNewUser ? "btn-info" : "btn-success"}`}
              onClick={isNewUser ? signUpWithEmail : signInWithEmail}
              disabled={loading}
            >
              {isNewUser ? "Register" : "Login"}
            </button>

            <div className="divider">OR</div>

            <button
              className="btn btn-outline w-full mb-4 flex items-center justify-center gap-2"
              onClick={signInWithGoogle}
              disabled={loading}
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            <p className="text-center">
              {isNewUser ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => {
                  setIsNewUser(!isNewUser);
                  resetFields();
                }}
              >
                {isNewUser ? "Login here" : "Register here"}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
