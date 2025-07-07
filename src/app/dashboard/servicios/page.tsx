// my-client-app/src/app/dashboard/mis-servicios/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {Service} from "@/types";
import serviceService from "@/services/serviceService";

const ServiciosPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Función para cargar todos los servicios
    const fetchServices = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await serviceService.getAllServices();
            setServices(data);
        } catch (err: any) {
            console.error('Error al obtener servicios:', err);
            setError(err.response?.data?.message || 'Error al cargar los servicios disponibles.');
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar los servicios al montar el componente
    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Servicios Disponibles</h1>
            <p className="text-lg text-gray-600 mb-8">
                Explora la lista de todos los servicios que puedes adquirir.
            </p>

            {loading && (
                <div className="flex justify-center items-center py-10">
                    <p className="text-lg text-gray-600">Cargando servicios...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}

            {!loading && !error && services.length === 0 && (
                <div className="text-center py-10 text-gray-500 text-lg">
                    No hay servicios disponibles en este momento.
                </div>
            )}

            {!loading && !error && services.length > 0 && (
                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio (Monedas)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Requiere Entrega
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tiempo Espera
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones (e.g., Comprar)
                </th> */}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.nombre}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs overflow-hidden text-ellipsis">{service.descripcion}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{service.precioMonedas}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.requiereEntrega ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {service.requiereEntrega ? 'Sí' : 'No'}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.tiempoEsperaMinutos}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {service.activo ? 'Activo' : 'Inactivo'}
                    </span>
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      // onClick={() => handleBuyService(service.id)} // Lógica para comprar servicio
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition duration-150 ease-in-out"
                    >
                      Comprar
                    </button>
                  </td> */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ServiciosPage;