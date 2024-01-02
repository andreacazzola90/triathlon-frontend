"use client";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import QRCode from "react-qr-code";
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
  const refQRCode: any = useRef(null);
  const onSubmit = (data: IFormInput) => {
    console.log(data);
    refQRCode.current.showModal();
  };

  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-3xl font-bold underline">Registrazione</h1>

      <dialog id="my_modal_1" className="modal" ref={refQRCode}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 1024,
              width: "100%",
            }}
          >
            <QRCode
              size={1024}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"ciao"}
              viewBox={`0 0 1024 1024`}
            />
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="registration-name"
            >
              Nome
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("name")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="registration-name"
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
              htmlFor="registration-surname"
            >
              Cognome
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("surname")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="registration-surname"
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
              htmlFor="registration-email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("email")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="registration-email"
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
              htmlFor="registration-phone"
            >
              Telefono
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("phone")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="registration-phone"
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
                id="registration-privacyAccept"
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
