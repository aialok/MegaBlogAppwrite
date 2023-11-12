import React from "react";
import { Link } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import authServices from "../appwrite/auth-service";
import { Button, Input, Logo } from "../components";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    try {
      setError("");
      const session = await authServices.login(data);

      if (session) {
        const userData = await authServices.getUserData();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8" >

            <div className="space-y-5">
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    {...register("email",{required:true,
                            validate : {
                                matchPattern: (value) => {
                                    return value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) || "Invalid email address";
                                }   
                            }    
                    })}
                    
                /> 
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    {...register("password",{required:true})}  />  
                   <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">Login</Button>   
                   </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
