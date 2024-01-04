"use client";
import Modal from "@/app/components/Modal";
import ScanQrCode from "@/app/components/scan-qr-code";
import { IFormTecnogym, useUser } from "@/app/context/userContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  cadence: yup.string().required(),
  supportTime: yup.string().required(),
  verticalOscillation: yup.string().required(),
  symmetry: yup.string().required(),
});
export default function Tecnogym() {
  const { user, updateUser, logout } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [modalToogle, setModalToogle] = useState(false);

  const onSubmit = (data: IFormTecnogym) => {
    console.log(data);
    updateUser(data);
    setModalToogle(true);
  };
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-bold underline">Coach</h1>
      {user ? (
        <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Cadenza
              </label>
            </div>
            <div className="md:w-2/3 d-block">
              <input
                {...register("cadence")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="string"
              />
              {errors.cadence && (
                <p className="text-red-500 text-xs italic">
                  {errors.cadence.message}
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
                {`Tempo appoggio(ms)`}
              </label>
            </div>
            <div className="md:w-2/3 d-block">
              <input
                {...register("supportTime")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
              {errors.supportTime && (
                <p className="text-red-500 text-xs italic">
                  {errors.supportTime.message}
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
                Oscillazione verticale
              </label>
            </div>
            <div className="md:w-2/3 d-block">
              <input
                {...register("verticalOscillation")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
              {errors?.verticalOscillation && (
                <p className="text-red-500 text-xs italic">
                  {errors?.verticalOscillation?.message}
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
                Simmatria
              </label>
            </div>
            <div className="md:w-2/3 d-block">
              <textarea
                {...register("symmetry")}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
              />
              {errors.symmetry && (
                <p className="text-red-500 text-xs italic">
                  {errors?.symmetry?.message}
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
      <Modal
        title="Dati aggiornati"
        open={modalToogle}
        onClose={() => {
          logout();
          setModalToogle(false);
        }}
      ></Modal>
    </main>
  );
}
