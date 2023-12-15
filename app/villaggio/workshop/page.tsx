"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type IFormInput = {
  confirmParticipation?: boolean;
};
const schema = yup.object().shape({
  confirmParticipation: yup.bool().required(),
});
export default function Workshop() {
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
      <h1 className="text-3xl font-bold underline">Coach</h1>

      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Conferma partecipazione
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("confirmParticipation")}
              type="checkbox"
              className=" checkbox "
            />
            {errors.confirmParticipation && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmParticipation.message}
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
              Invia
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
