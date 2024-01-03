"use client";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import * as yup from "yup";
import HeaderTitle from "../components/HeaderTitle";
import { v4 } from "uuid";

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
  const [initSku, setInitSku] = useState("");
  const refQRCode: any = useRef(null);

  useEffect(() => {
    setInitSku(v4());
  }, []);

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    console.log(initSku);

    const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "users";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        createdAt: new Date(),
        name: data.name,
        surname: data.surname,
        sku: initSku,
        email: data.email,
        phone: data.phone,
        privacyAccept: data.privacyAccept,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        refQRCode.current.showModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="flex flex-col items-center ">
      <HeaderTitle title="Registrazione" />
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
              className="input input-primary"
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
              className="input input-primary"
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
              className="input input-primary"
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
              className="input input-primary"
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
            <button className="button btn btn-accent" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
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
              value={initSku}
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
    </main>
  );
}
