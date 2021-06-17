import React, { useState } from "react";
import { Link } from "react-router-dom";
import imageDefault from "../../resources/modules/no_data.svg"
import ToggleButton from "../buttons/toggle";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BiDetail } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';

export default function PlantItem({ nombre, imagen, descripcion, id_planta, id_proveedor, id_categoría, precio_compra, precio_venta, cantidad, estado, onOpenModal, setSelected, isActivate, setisActivate, onOpenDeleteModal }) {
  let capNombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
  let status = estado === undefined || estado === 1;
  const [isShown, setIsShown] = useState(false);

  const Menu = () => {
    return (
      <div className={`bg-white shadow-lg max-h-60 w-48 ml-4 -mt-2
                         rounded-lg border border-icon_gray border-opacity-60
                         ${isShown ? "block" : "hidden"}`} >
        <div className="mx-3 mt-3 opacity-100">

          <div
            className=" button-action flex cursor-pointer hover:bg-gray py-2 rounded-lg gap-2">
            <BiDetail size="20" className="ml-2 opacity-70" />
            <span className="text-sm">Detalles</span>
          </div>

          <Link
            className=" button-action flex cursor-pointer hover:bg-gray py-2 rounded-lg gap-2"
            to={`/plant/edit/${id_planta}`}>
            <HiOutlinePencilAlt size="20" className="ml-2 opacity-70" />
            <span className="text-sm">Editar</span>
          </Link>

          <hr className="my-2 text-gray" />
          <div
            onClick={() => {
              setSelected();
              onOpenDeleteModal(true);
            }}
            className="button-action flex cursor-pointer mb-3 py-2 rounded-lg gap-2 hover:bg-ligthred text-darkred">
            <FaTrashAlt size="20" className="ml-2 opacity-70" />
            <span className="text-sm ">Eliminar</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative shadow bg-white rounded-lg mx-2 grid justify-center cursor-default">
      <div className="cursor-pointer w-10 h-8 ml-1 absolute"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <HiOutlineDotsHorizontal size={25} className="text-lg mx-2" />
        <Menu />
      </div>
      <div className="max-h-80 mt-5 pt-3 mb-4 w-48 rounded-lg ">
        {imagen !== null ? <div className="h-32 rounded-lg bg-gray flex items-center justify-center bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${imagen})` }}>
        </div> :
          <div className="h-32 rounded-lg bg-gray flex items-center justify-center bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${imageDefault})` }}>
          </div>
        }
        {/* <div className="h-28 rounded-lg bg-gray flex items-center justify-center bg-center bg-no-repeat bg-cover">
          <img
            loading="lazy"
            className="rounded-lg max-h-32"
            src={imageDefault}
            alt={descripcion}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = imageDefault;
            }}
          />
        </div> */}
        <div className="pt-4 max-h-36">
          <p className="font-bold mb-1 truncate">{capNombre}</p>
          <p className="overflow-ellipsis overflow-hidden h-11 text-sm">{descripcion} </p>
          <div className="flex justify-between text-sm">
            <span>compra:</span>
            <span>{precio_compra.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}</span>
          </div>
          <div className=" flex justify-between text-sm">
            <span>Venta:</span>
            <span>{precio_venta.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}</span>
          </div>
          {cantidad > 0 && <div className=" flex justify-between text-sm">
            <span>Cantidad:</span>
            <span>{cantidad}</span>
          </div>}
        </div>
        <div className="flex justify-between items-center text-sm mt-4">
          {status ? <span className="font-semibold">Activo</span> : <span className="font-semibold">Inactivo</span>}
          <ToggleButton
            activate={status}
            click={setisActivate}
            changeState={setisActivate}
            selected={() => {
              setSelected()
              onOpenModal(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}