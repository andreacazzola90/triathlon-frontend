"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { v4 } from "uuid";
import * as yup from "yup";
import HeaderTitle from "../components/HeaderTitle";
import Logo from "../components/Logo";
import { QRCode } from "react-qrcode-logo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";

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
        dateOfBirth: "",
        weight: null,
        athleteLevel: "",
        goal: "",
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

  const imgQrCode = (
    <div className="d-flex justify-center max-w-full">
      <QRCode
        id="qrCodeimage"
        value={initSku}
        style={{ aspectRatio: "1/1", maxWidth: "100%", height: "auto" }}
        size={500}
      />
    </div>
  );

  const downloadQrCode = () => {
    var canvas: any = document.getElementById("qrCodeimage");
    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = url;
    link.click();
  };
  const gallery = [
    "https://placehold.co/600x400/000000/FFFFFF/png",
    "https://placehold.co/600x400/000000/FFFFFF/png",
    "https://placehold.co/600x400/000000/FFFFFF/png",
    "https://placehold.co/600x400/000000/FFFFFF/png",
  ];

  return (
    <main className="flex flex-col items-center ">
      <Logo />
      <HeaderTitle
        title="Welcome runner!"
        description="ciao <span class='text-red'>come stai</span><br /> io molto bene"
      />
      <form
        id="registrationForm"
        className="w-full max-w-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="md:flex md:items-center mb-6 form-group">
          <div className="md:w-1/3 ">
            <label htmlFor="registration-name" className="required">
              Nome
            </label>
          </div>
          <div className="md:w-2/3 d-block">
            <input
              {...register("name")}
              className="input input-primary"
              id="registration-name"
              type="text"
              placeholder="Mario"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 form-group">
          <div className="md:w-1/3">
            <label htmlFor="registration-surname" className="required">
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
        <div className="md:flex md:items-center mb-6 form-group">
          <div className="md:w-1/3">
            <label htmlFor="registration-email" className="required">
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

        <div className="md:flex md:items-center mb-6 form-group">
          <div className="md:w-1/3">
            <label htmlFor="registration-phone" className="required">
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

        <div className="md:flex md:items-center mb-6 form-group">
          <div className="md:w-1/3 " />
          <div className="md:w-2/3  d-flex direction-column">
            <label>
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

        <div className="md:flex md:items-center form-group">
          <div className="md:w-1/3" />
          <div className="md:w-2/3 flex md:block">
            <button
              className="button btn btn-accent mx-auto btn-footer"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="h-96 w-full rounded-lg"
      >
        {gallery.map((image: any, i: number) => (
          <SwiperSlide key={i}>
            <div className="flex w-full h-full items-center justify-center">
              <Image
                src={image}
                width={300}
                height="300"
                alt="img"
                className="block h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <dialog id="my_modal_1" className="modal" ref={refQRCode}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          {imgQrCode}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
            <button
              onClick={() => downloadQrCode()}
              className="btn btn-success"
            >
              Download QR-code
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}
