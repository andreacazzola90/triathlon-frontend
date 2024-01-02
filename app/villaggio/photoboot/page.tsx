"use client";
import ScanQrCode from "@/app/components/scan-qr-code";
import { useUser } from "@/app/context/userContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type IFormInput = {
  shoeBrand?: string;
  shoeModelTested?: string;
  shoeSizeTested?: string;
};
const schema = yup.object().shape({
  shoeBrand: yup.string().required(),
  shoeModelTested: yup.string().required(),
  shoeSizeTested: yup.string().required(),
});
export default function Photoboot() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const { user } = useUser();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-3xl font-bold underline">Try-on</h1>
      {user ? (
        <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Brand scarpa atleta
              </label>
            </div>
            <div className="md:w-2/3 d-block">
              <input
                {...register("shoeBrand")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
              {errors.shoeBrand && (
                <p className="text-red-500 text-xs italic">
                  {errors.shoeBrand.message}
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
                Modella scarpa provata
              </label>
            </div>
            <div className="md:w-2/3 d-block">
              <input
                {...register("shoeModelTested")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
              {errors.shoeModelTested && (
                <p className="text-red-500 text-xs italic">
                  {errors.shoeModelTested.message}
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
                Taglia scarpa provata
              </label>
            </div>
            <div className="md:w-2/3 d-block">
              <input
                {...register("shoeSizeTested")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
              {errors?.shoeSizeTested && (
                <p className="text-red-500 text-xs italic">
                  {errors?.shoeSizeTested?.message}
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
      ) : (
        <ScanQrCode />
      )}
    </main>
  );
}
