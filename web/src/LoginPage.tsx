import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Mail, Lock, HelpCircle } from "lucide-react";
import { Checkbox } from "./components/ui/checkbox";
import logo from "./assets/a70faf53f547712d42e2a0cde3497048312d50e4.png";

export default function LoginPage() {
  // ✅ Hooks at the top-level
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);

  // ✅ no useNavigate() inside this function anymore
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setShowRocket(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      // On success, go to HR dashboard route
      navigate("/hr");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-gradient-to-r from-[#0a1f1f] via-[#0d0d1f] to-[#1f0d2e] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Rocket Animation */}
      <AnimatePresence>
        {showRocket && (
          <motion.div
            initial={{
              bottom: "50%",
              left: "50%",
              x: "-50%",
              scale: 1,
            }}
            animate={{
              bottom: "150%",
              scale: [1, 1.5, 2],
              rotate: [0, -10, 0, 10, 0],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="absolute text-6xl z-50 pointer-events-none filter drop-shadow-[0_0_15px_rgba(255,107,53,0.5)]"
          >
            🚀
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 z-20"
      >
        <p className="text-gray-500 text-xs">For Introlligent Solutions</p>
      </motion.div>

      {/* Help Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 right-8 z-20"
      >
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHelpMenu(!showHelpMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all backdrop-blur-sm"
          >
            <HelpCircle className="w-4 h-4 text-gray-300" />
            <span className="text-gray-300 text-sm">Help</span>
          </motion.button>

          {/* Help Dropdown */}
          <AnimatePresence>
            {showHelpMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden"
              >
                <div className="p-3 border-b border-white/10">
                  <p className="text-white text-sm">Need Assistance?</p>
                  <p className="text-gray-400 text-xs mt-1">
                    We're here to help
                  </p>
                </div>

                <div className="p-2">
                  <a
                    href="mailto:support@introlligent.com"
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-[#FF6B35]" />
                    <div>
                      <p className="text-gray-300 text-sm">Email Support</p>
                      <p className="text-gray-500 text-xs">
                        support@introlligent.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <div className="text-gray-400 group-hover:text-[#FF6B35]">
                      📞
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Phone Support</p>
                      <p className="text-gray-500 text-xs">
                        +1 (234) 567-890
                      </p>
                    </div>
                  </a>

                  <button
                    onClick={() => console.log("Documentation clicked")}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors group w-full text-left"
                  >
                    <div className="text-gray-400 group-hover:text-[#FF6B35]">
                      📚
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Documentation</p>
                      <p className="text-gray-500 text-xs">
                        View help articles
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => console.log("FAQ clicked")}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors group w-full text-left"
                  >
                    <div className="text-gray-400 group-hover:text-[#FF6B35]">
                      ❓
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">FAQ</p>
                      <p className="text-gray-500 text-xs">
                        Common questions
                      </p>
                    </div>
                  </button>
                </div>

                <div className="p-3 border-t border-white/10 bg-white/5">
                  <p className="text-gray-500 text-xs text-center">
                    Available 24/7
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Subtle gradient glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 via-violet-500/10 to-purple-600/20 rounded-2xl blur opacity-30" />

          <div className="relative">
            {/* Header */}
            <div className="mb-8">
              <p className="text-[rgb(251,253,255)] text-sm mb-3 tracking-wide text-[30px] text-center">
                Welcome Back
              </p>
              <h2 className="mb-2 text-3xl bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent text-[28px]">
                Sign In
              </h2>
              <p className="text-gray-400 text-sm">Access your dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-[#0f0f1e]/50 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 h-11"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-[#0f0f1e]/50 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 h-11"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="border-white/20 data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35]"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-gray-400 text-sm cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 hover:from-purple-800 hover:via-purple-700 hover:to-purple-800 text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30 relative overflow-hidden"
              >
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={
                    isLoading
                      ? {
                          x: ["-200%", "200%"],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block"
                      >
                        ⏳
                      </motion.span>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </span>
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Tasks Simplified Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 w-full max-w-md relative z-10"
      >
        <div className="bg-gradient-to-br from-[#1a1a2e]/60 via-[#1a1a2e]/50 to-[#1a1a2e]/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden">
          {/* Subtle animated gradient glow */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B35]/20 via-purple-500/20 to-[#FF6B35]/20 rounded-xl blur opacity-30"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative text-center">
            <motion.h3
              className="text-white text-2xl tracking-wide"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,107,53,0.3)",
                  "0 0 20px rgba(147,51,234,0.3)",
                  "0 0 10px rgba(255,107,53,0.3)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="bg-gradient-to-r from-[#FF6B35] via-purple-400 to-[#FF6B35] bg-clip-text text-transparent">
                Tasks Simplified
              </span>
            </motion.h3>
            <p className="text-gray-400 text-sm mt-2">
              Intelligent automation for modern teams
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
