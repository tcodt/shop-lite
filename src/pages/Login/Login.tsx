import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LoginRequest } from "@/types/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { authValidations } from "@/utils/auth-validations";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useLogin } from "@/hooks/useLogin/useLogin";
import { Spinner } from "@/components/ui/spinner";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLoginForm = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-4 min-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">Welcom Back!</h3>
          <p className="text-base font-normal text-gray-500">
            Please login to your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleLoginForm)}
          className="flex flex-col gap-4"
        >
          <div>
            <Input
              type="text"
              placeholder="Username"
              className="text-sm font-medium text-gray-700"
              {...register("username", {
                required: "Username is required",
                // pattern: {
                //   value: authValidations.username,
                //   message: "Username must only contain letters",
                // },
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                // maxLength: {
                //   value: 20,
                //   message: "Username must be less than 20 characters",
                // },
              })}
            />
            {errors.username && (
              <span className="text-sm font-normal text-red-500 mt-2 block">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="text-sm font-medium text-gray-700"
                {...register("password", {
                  required: "Password is required",
                  // pattern: {
                  //   value: authValidations.password,
                  //   message: "",
                  // },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  // validate: (value) => {
                  //   if (value && !authValidations.password.test(value)) {
                  //     return "For stronger security, include letters, numbers, and symbols";
                  //   }
                  //   return true;
                  // },
                })}
              />
              <Button
                type="button"
                variant={"outline"}
                className="cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <LuEyeClosed /> : <LuEye />}
              </Button>
            </div>
            {errors.password && (
              <span className="text-sm font-normal text-red-500 mt-2 block">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button type="submit" size={"lg"} className="cursor-pointer">
            {loginMutation.isPending ? (
              <Spinner className="size-4 text-white" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
