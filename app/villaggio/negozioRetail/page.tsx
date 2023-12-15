"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type IFormInput = {
  confirmPurchase?: boolean;
  shoeModelPurchased?: string;
};
const schema = yup.object().shape({
  confirmPurchase: yup.bool().required(),
  shoeModelPurchased: yup.string().required(),
});
export default function negozioRetail() {
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
              Conferma acquisto
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("confirmPurchase")}
              type="checkbox"
              className=" checkbox "
            />
            {errors.confirmPurchase && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPurchase.message}
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
              Modello scarpa acquistata
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("shoeModelPurchased")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
            />
            {errors.shoeModelPurchased && (
              <p className="text-red-500 text-xs italic">
                {errors.shoeModelPurchased.message}
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
