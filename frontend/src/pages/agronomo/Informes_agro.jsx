import React, { useState, useEffect } from "react";
import { IconFileDownload } from "@tabler/icons-react";
import LayoutAgronomo from "../../layouts/LayoutAgronomo";
import { fincasApi, lotesApi, produccionApi, variablesClimaApi } from "../../services/apiClient";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Select from "react-select";

const MESES = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const VARIABLES_CLIMA = [
  { value: "precipitacion", label: "Precipitación" },
  { value: "temp_min", label: "Temperatura Mínima" },
  { value: "temp_max", label: "Temperatura Máxima" },
  { value: "humedad", label: "Humedad" },
];

const Informes_agro = () => {
  const [filtros, setFiltros] = useState({
    tipo: "produccion", // "produccion" o "clima"
    fechaInicio: "",
    fechaFin: "",
    meses: [],
    fincas: [],
    lote: "",
    variables: ["precipitacion", "temp_min", "temp_max", "humedad"], // por defecto todas
  });

  const [fincas, setFincas] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [resultados, setResultados] = useState([]);

  // Cargar todas las fincas
  useEffect(() => {
    const fetchFincas = async () => {
      try {
        const res = await fincasApi.list();
        setFincas(res.data);
      } catch (err) {
        console.error("❌ Error cargando fincas:", err);
      }
    };
    fetchFincas();
  }, []);

  // Cargar lotes si hay solo una finca seleccionada
  useEffect(() => {
    if (filtros.fincas.length === 1) {
      const fetchLotes = async () => {
        try {
          const res = await lotesApi.listByFinca(filtros.fincas[0]);
          setLotes(res.data);
        } catch (err) {
          console.error("❌ Error cargando lotes:", err);
        }
      };
      fetchLotes();
    } else {
      setLotes([]);
      setFiltros((prev) => ({ ...prev, lote: "" }));
    }
  }, [filtros.fincas]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleChangeMeses = (selected) => {
    setFiltros({ ...filtros, meses: selected.map((m) => m.value) });
  };

  const handleChangeFincas = (selected) => {
    setFiltros({ ...filtros, fincas: selected.map((f) => f.value) });
  };

  // Consultar informe
  const generarInforme = async () => {
    try {
      let params = {
        fecha_inicio: filtros.fechaInicio || null,
        fecha_fin: filtros.fechaFin || null,
      };

      if (filtros.meses.length > 0) {
        params.meses = filtros.meses.map((m) => parseInt(m, 10));
      }
      if (filtros.fincas.length > 0) {
        params.fincas = filtros.fincas.map((f) => parseInt(f, 10));
      }
      if (filtros.fincas.length === 1 && filtros.lote) {
        params.lote = parseInt(filtros.lote, 10);
      }

      let res;
      if (filtros.tipo === "produccion") {
        res =
          filtros.fincas.length > 1
            ? await produccionApi.resumenFinca(params)
            : await produccionApi.resumenMensual(params);
      } else {
        // Variables Climáticas
        params.variables = filtros.variables;
        res = await variablesClimaApi.resumen(params);
      }

      console.log("📊 Datos recibidos del API:", res.data);
      setResultados(res.data);
    } catch (err) {
      console.error("❌ Error al generar informe:", err);
    }
  };

  // Exportar Excel
  const exportarExcel = () => {
    if (resultados.length === 0) return alert("No hay datos para exportar");
    const ws = XLSX.utils.json_to_sheet(resultados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Informe");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "informe.xlsx");
  };

  // Exportar PDF
  const exportarPDF = () => {
    if (resultados.length === 0) return alert("No hay datos para exportar");

    const doc = new jsPDF();
    doc.setFontSize(16);

    if (filtros.tipo === "produccion") {
      doc.text("Informe de Producción", 14, 20);
      if (filtros.fincas.length > 1) {
        autoTable(doc, {
          startY: 30,
          head: [["Finca", "Total Producción (Kg)"]],
          body: resultados.map((r) => [r.finca, r.total]),
        });
      } else {
        autoTable(doc, {
          startY: 30,
          head: [["Periodo", "Total Producción (Kg)"]],
          body: resultados.map((r) => [r.periodo, r.total]),
        });
      }
    } else {
      doc.text("Informe de Variables Climáticas", 14, 20);
      const head = ["Periodo"];
      if (filtros.variables.includes("precipitacion")) head.push("Precipitación (mm)");
      if (filtros.variables.includes("temp_min")) head.push("Temp Min (°C)");
      if (filtros.variables.includes("temp_max")) head.push("Temp Max (°C)");
      if (filtros.variables.includes("humedad")) head.push("Humedad (%)");

      const body = resultados.map((r) => {
        const row = [r.periodo];
        if (filtros.variables.includes("precipitacion")) row.push(r.precipitacion_total);
        if (filtros.variables.includes("temp_min")) row.push(r.temp_min_avg);
        if (filtros.variables.includes("temp_max")) row.push(r.temp_max_avg);
        if (filtros.variables.includes("humedad")) row.push(r.humedad_avg);
        return row;
      });

      autoTable(doc, { startY: 30, head: [head], body });
    }

    doc.save("informe.pdf");
  };

  return (
    <LayoutAgronomo>
      <div className="bg-white border border-gray-200 shadow-md p-10 rounded-xl w-full max-w-4xl mx-auto space-y-6 text-black">
        <h1 className="text-3xl font-bold text-green-700">Informes</h1>

        {/* Tipo de Informe */}
        <div>
          <p className="font-bold text-lg mb-2">Tipo de informe</p>
          <select
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="w-full border p-4 rounded text-lg"
          >
            <option value="produccion">Producción</option>
            <option value="clima">Variables Climáticas</option>
          </select>
        </div>

        {/* Fecha */}
        <div>
          <p className="font-bold text-lg mb-2">Rango de fechas</p>
          <div className="flex items-center gap-3">
            <input
              type="date"
              name="fechaInicio"
              value={filtros.fechaInicio}
              onChange={handleChange}
              className="border p-3 rounded w-full text-lg"
            />
            <span className="font-semibold text-xl">a</span>
            <input
              type="date"
              name="fechaFin"
              value={filtros.fechaFin}
              onChange={handleChange}
              className="border p-3 rounded w-full text-lg"
            />
          </div>
        </div>

        {/* Meses */}
        <div>
          <p className="font-bold text-lg mb-2">Meses</p>
          <Select
            isMulti
            options={MESES}
            value={MESES.filter((m) => filtros.meses.includes(m.value))}
            onChange={handleChangeMeses}
            placeholder="Selecciona meses"
            className="text-lg"
          />
        </div>

        {/* Fincas */}
        <div>
          <p className="font-bold text-lg mb-2">Finca(s)</p>
          <Select
            isMulti
            options={fincas.map((f) => ({ value: f.id.toString(), label: f.nombre }))}
            value={fincas
              .filter((f) => filtros.fincas.includes(f.id.toString()))
              .map((f) => ({ value: f.id.toString(), label: f.nombre }))}
            onChange={handleChangeFincas}
            placeholder="Selecciona fincas"
            className="text-lg"
          />
        </div>

        {/* Lote (solo producción con 1 finca) */}
        {filtros.tipo === "produccion" && (
          <div>
            <p className="font-bold text-lg mb-2">Lote</p>
            <select
              name="lote"
              value={filtros.lote}
              onChange={handleChange}
              className="w-full border p-4 rounded text-lg"
              disabled={filtros.fincas.length !== 1}
            >
              <option value="">Todos</option>
              {lotes.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.lote}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Variables Climáticas */}
        {filtros.tipo === "clima" && (
          <div>
            <p className="font-bold text-lg mb-2">Variables Climáticas</p>
            <Select
              isMulti
              options={VARIABLES_CLIMA}
              value={VARIABLES_CLIMA.filter((v) => filtros.variables.includes(v.value))}
              onChange={(selected) =>
                setFiltros({ ...filtros, variables: selected.map((v) => v.value) })
              }
              placeholder="Selecciona variables"
              className="text-lg"
            />
          </div>
        )}

        {/* Botón generar */}
        <div className="flex justify-center">
          <button
            onClick={generarInforme}
            className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 text-lg"
          >
            Generar
          </button>
        </div>

        {/* Resultados */}
        {resultados.length > 0 ? (
          <div>
            <h2 className="font-bold text-xl mt-6 mb-2 text-center">📊 Resultados</h2>
            <table className="w-full border border-gray-300 text-lg text-center">
              <thead>
                {filtros.tipo === "produccion" ? (
                  <tr>
                    {filtros.fincas.length > 1 ? (
                      <>
                        <th className="p-2 border bg-green-700 text-white">
                          Finca
                        </th>
                        <th className="p-2 border bg-green-700 text-white">
                          Total Producción (Kg)
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="p-2 border bg-green-700 text-white">
                          Periodo
                        </th>
                        <th className="p-2 border bg-green-700 text-white">
                          Total Producción (Kg)
                        </th>
                      </>
                    )}
                  </tr>
                ) : (
                  <tr>
                    <th className="p-2 border bg-green-700 text-white">Periodo</th>
                    {filtros.variables.includes("precipitacion") && (
                      <th className="p-2 border bg-green-700 text-white">
                        Precipitación (mm)
                      </th>
                    )}
                    {filtros.variables.includes("temp_min") && (
                      <th className="p-2 border bg-green-700 text-white">
                        Temp Min (°C)
                      </th>
                    )}
                    {filtros.variables.includes("temp_max") && (
                      <th className="p-2 border bg-green-700 text-white">
                        Temp Max (°C)
                      </th>
                    )}
                    {filtros.variables.includes("humedad") && (
                      <th className="p-2 border bg-green-700 text-white">
                        Humedad (%)
                      </th>
                    )}
                  </tr>
                )}
              </thead>
              <tbody>
                {resultados.map((r, i) => (
                  <tr key={i}>
                    {filtros.tipo === "produccion" ? (
                      filtros.fincas.length > 1 ? (
                        <>
                          <td className="p-2 border">{r.finca}</td>
                          <td className="p-2 border">{r.total}</td>
                        </>
                      ) : (
                        <>
                          <td className="p-2 border">{r.periodo}</td>
                          <td className="p-2 border">{r.total}</td>
                        </>
                      )
                    ) : (
                      <>
                        <td className="p-2 border">{r.periodo}</td>
                        {filtros.variables.includes("precipitacion") && (
                          <td className="p-2 border">{r.precipitacion_total}</td>
                        )}
                        {filtros.variables.includes("temp_min") && (
                          <td className="p-2 border">{r.temp_min_avg}</td>
                        )}
                        {filtros.variables.includes("temp_max") && (
                          <td className="p-2 border">{r.temp_max_avg}</td>
                        )}
                        {filtros.variables.includes("humedad") && (
                          <td className="p-2 border">{r.humedad_avg}</td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">⚠️ No hay datos para mostrar</p>
        )}


        {/* Exportar */}
        {resultados.length > 0 && (
          <div className="flex justify-center space-x-6 text-base mt-4">
            <button
              onClick={exportarPDF}
              className="text-green-600 hover:underline flex items-center gap-1"
            >
              <IconFileDownload className="w-5 h-5" />
              Exportar PDF
            </button>
            <button
              onClick={exportarExcel}
              className="text-green-600 hover:underline flex items-center gap-1"
            >
              <IconFileDownload className="w-5 h-5" />
              Exportar Excel
            </button>
          </div>
        )}
      </div>
    </LayoutAgronomo>
  );
};

export default Informes_agro;
