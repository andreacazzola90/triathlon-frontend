"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type IFormInput = {
  name?: string | undefined;
  surname?: string | undefined;
  email?: string;
  phone?: number | undefined;
  privacyAccept?: boolean | undefined;
};
const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().required(),
  privacyAccept: yup
    .boolean()
    .required("La privacy deve essere accettata per proseguire.")
    .oneOf([true], "La privacy deve essere accettata per proseguire."),
});
export default function Registrazione() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Registrazione</h1>

      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Nome
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("name")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Cognome
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("surname")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
            />
            {errors.surname && (
              <p className="text-red-500 text-xs italic">
                {errors.surname.message}
              </p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("email")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="email"
            />
            {errors?.surname && (
              <p className="text-red-500 text-xs italic">
                {errors?.email?.message}
              </p>
            )}
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Telefono
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("phone")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="phone"
            />
            {errors.surname && (
              <p className="text-red-500 text-xs italic">
                {errors?.surname?.message}
              </p>
            )}
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3 " />
          <div className="md:w-2/3  d-flex direction-column">
            <label className="block text-gray-500 font-bold ">
              <input
                {...register("privacyAccept", { required: true })}
                className="mr-2 leading-tight"
                type="checkbox"
              />
              <span className="text-sm">Accetta la privacy</span>
            </label>
            {errors.privacyAccept && (
              <p className="text-red-500 text-xs italic">
                {errors?.privacyAccept?.message}
              </p>
            )}
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3" />
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
