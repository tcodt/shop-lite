import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import type { RegisterRequest } from "@/shared/types/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { authValidations } from "@/utils/auth-validations";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Spinner } from "@/shared/components/ui/spinner";
import { Link } from "react-router";
import { useRegister } from "@/features/auth/hooks/useRegister";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const handleLoginForm = (data: RegisterRequest) => {
    registerMutation.mutate(data);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-4 min-w-[250px] sm:min-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            Welcom to Shop Lite
          </h3>
          <p className="text-base font-normal text-gray-500">
            Please fill the form to create an account
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
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <span className="text-sm font-normal text-red-500 mt-2 block">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="text-sm font-medium text-gray-700"
              {...register("email", {
                minLength: {
                  value: 3,
                  message: "Email must be at least 3 characters",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm font-normal text-red-500 mt-2 block">
                {errors.email.message}
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
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

          <span className="text-sm font-medium text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-800">
              Login
            </Link>
          </span>

          <Button type="submit" size={"lg"} className="cursor-pointer">
            {registerMutation.isPending ? (
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

export default Register;
