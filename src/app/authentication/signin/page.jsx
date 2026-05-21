"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { IoIosLock, IoIosUnlock, IoMdEyeOff, IoMdMail } from "react-icons/io";

const LogInPage = () => {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

   

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: callbackURL || "/",
      },
      {
        onSuccess: () => {
          // toast.success("Login successful!!");
        },
        onError: () => {
          // toast.error("Something went wrong!");
        },
      },
    );
  };

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackURL || "/",
    });
  }

  return (
    <div className=" bg-[#F5EDD8] flex items-center justify-center p-6">
      <div className="w-[560px] max-w-full my-10 bg-white rounded-3xl border border-[#e8dece] shadow-xl overflow-hidden">
        
        <div className="bg-[#2C1F0E] px-12 py-9">
          <span className="block w-8 h-[3px] bg-[#C9A96E] rounded-full mb-3" />
          <h1 className="text-[28px] font-bold text-[#F5EDD8] font-serif leading-tight">
            Log In Now
          </h1>
          <p className="text-[#C9A96E] text-sm mt-1">
            Login to your StudyNook account
          </p>
        </div>

        
        <div className="px-12 py-9">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) =>
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? "Please enter a valid email address"
                  : null
              }
            >
              <Label className="text-[13px] font-semibold text-[#3B2F1E] mb-1 block">
                Email Address
              </Label>
              <div className="relative">
                <IoMdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C7E57] w-4 h-4" />
                <Input
                  placeholder="your_mail@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD5C4] bg-[#FDFAF5] text-[#2C1F0E] placeholder:text-[#BDB5A8] text-sm outline-none focus:border-[#C9A96E] transition-colors"
                />
              </div>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full"
              validate={(value) => {
                if (value.length < 8)
                  return "Password must be at least 8 characters";
                if (!/[A-Z]/.test(value))
                  return "Must contain at least one uppercase letter";
                if (!/[0-9]/.test(value))
                  return "Must contain at least one number";
                return null;
              }}
            >
              <Label className="text-[13px] font-semibold text-[#3B2F1E] mb-1 block">
                Password
              </Label>
              <div className="relative">
                {/* Lock icon */}
                <IoIosLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C7E57] w-4 h-4" />
                <Input
                  placeholder="Your Password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#DDD5C4] bg-[#FDFAF5] text-[#2C1F0E] placeholder:text-[#BDB5A8] text-sm outline-none focus:border-[#C9A96E] transition-colors"
                />
                {/* Eye toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A96E] hover:text-[#9C7E57] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoMdEyeOff /> : <FaEye />}
                </button>
              </div>
              <Description className="text-xs text-[#B0A898] mt-1">
                Min 8 characters, 1 uppercase, 1 number
              </Description>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Buttons */}
            <div className="flex gap-3 mt-1">
              <Button
                type="submit"
                className="flex-1 bg-[#2C1F0E] text-[#F5EDD8] font-semibold rounded-xl py-3 hover:bg-[#3D2B13] transition-colors"
              >
                Login
              </Button>
              <Button
                type="reset"
                className="px-6 border border-[#2C1F0E] text-[#2C1F0E] bg-transparent font-semibold rounded-xl hover:bg-[#F5EDD8] transition-colors"
              >
                Clear
              </Button>
            </div>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E8E0D0]" />
            <span className="text-xs text-[#B0A898] font-medium tracking-wide">
              OR
            </span>
            <div className="flex-1 h-px bg-[#E8E0D0]" />
          </div>

          {/* Google */}
          <Button
            onPress={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2 border border-[#DDD5C4] bg-white text-[#2C1F0E] font-semibold rounded-xl py-3 hover:bg-[#F5EDD8] transition-colors"
          >
            <FaGoogle />
            Continue with Google
          </Button>

          {/* Sign Up */}
          <p className="text-center text-sm text-[#7A5C38] mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/authentication/signup"
              className="text-[#2C1F0E] font-bold underline underline-offset-2 hover:text-[#C9A96E] transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
