import React, { useState } from 'react'
import SubmitButton from '../../buttons/submit';
import Select from 'react-dropdown-select';
import DynamicInputs from '../../dynamicInput';
import { usePlants, useProviders } from '../../../hooks/query';
import { useCreateShopping } from '../../../hooks/mutation/mutation';
import shoppingImg from '../../../resources/stock.svg';

export default function ShoppingForm(props) {
    const [data, setData] = useState({ id_proveedor: undefined, inputs: undefined });
    const plantQuery = usePlants();
    const providerQuery = useProviders();
    
    let { total, current_page, last_page } = props.location.state
    console.log(total, current_page)
    const registerShopping = useCreateShopping(data, total % 10 === 0, current_page, last_page);
    let dataPlant = [];
    let dataProv = [];

    if (plantQuery.data !== undefined) {
        if (data.id_proveedor) {
            const plants = plantQuery.data.data;
            dataPlant = plants.filter((plant) => plant.id_proveedor === data.id_proveedor);
            console.log(dataPlant, " -- plants filter")
        }
    }

    if (providerQuery.data !== undefined) {
        dataProv = providerQuery.data.data
    }

    const send = (event) => {
        event.preventDefault();
        registerShopping.mutate();
    }

    const styleSelect = {
        borderRadius: "0.25rem",
        borderWidth: "2px",
        borderColor: "rgba(244, 207, 224, var(--tw-border-opacity));",
        padding: "0.5rem 1rem 0.5rem 1rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
    }

    return (
        <div className="flex w-full justify-center">
            <div className="h-full flex grid-cols-6 shadow-2xl">
                <div className=" bg-mediumgreen col-span-2 rounded-l-xl">
                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Módulo compra</h3>
                    <div className="my-6 relative w-full h-64" style={{ textAlign: "-webkit-center" }}>
                        <img
                            className=""
                            width={200}
                            src={shoppingImg}
                            alt="Nuevos proveedores"
                        />
                        <p className="w-60 my-5 text-sm text-white">Antes de selccionar las plantas, primero selecciona el proveedor.</p>
                    </div>
                    {/* <div className="w-full text-center flex justify-center">
                        <p className="text-white text-sm font-semibold text-center tracking-wider w-64 mt-4">
                            Antes de selccionar las plantas, primero selecciona el proveedor.
                        </p>

                    </div> */}
                </div>
                <div className="col-span-4 bg-white rounded-r-xl overflow-y-auto overflow-x-auto" style={{ height: "26em", maxHeight: "32em" }}>
                    <form className="m-auto my-7 mx-20" onSubmit={send} >
                        <div style={{ marginTop: 22, marginBottom: 22 }}>
                            <label className="block mb-2 font-semibold">
                                Proveedor<span className={`ml-1 text-mediumred`}>*</span>
                            </label>
                            <Select
                                name="id_proveedor"
                                multi={false}
                                placeholder="Selecionar Proveedor"
                                searchable={true}
                                Style={styleSelect}
                                color="#00A976"
                                options={dataProv}
                                labelField="nombre"
                                valueField="nombre"
                                disabled={providerQuery.isLoading}
                                onChange={(value) => {
                                    setData({ ...data, id_proveedor: value[0].id_proveedor });
                                }}
                                values={
                                    dataProv.filter((opt) => opt.nombre === data.nombre)
                                }
                            />
                        </div>
                        <DynamicInputs
                            plantas={dataPlant}
                            isLoading={plantQuery.isLoading}
                            data={data}
                            setData={setData}
                        />
                        <SubmitButton
                            isLoading={registerShopping.isLoading}
                            mode={"create"}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
