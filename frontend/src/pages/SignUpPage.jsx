import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  mobileNo: z.string().min(11, { message: "Mobile number is required" }).max(11, { message: "Mobile number is required" }),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const { username, email, password, mobileNo } = data;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/register`, { username, email, password, mobileNo });
      console.log(res.data);
      if (res) {
        toast.success("Account created successfully", {
          position: "bottom-left",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to create account", {
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to create your account</          h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input id="username" name="username" type="text" autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" {...register("username")} />
                {errors.username && <span className="text-red-500">{errors.username.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" {...register("email")} />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" {...register("password")} />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="mobileNo" className="block text-sm font-medium leading-6 text-gray-900">Mobile Number</label>
              <div className="mt-2">
                <input id="mobileNo" name="mobileNo" type="text" autoComplete="tel" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" {...register("mobileNo")} />
                {errors.mobileNo && <span className="text-red-500">{errors.mobileNo.message}</span>}
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={loading || isSubmitting}>
                {loading || isSubmitting ? "Signing up..." : "Sign up"}
              </button>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a href="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
