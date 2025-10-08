import { useState, useEffect, useMemo, useCallback } from 'react'
import { Ejercicio, ResultadoCorreccion } from '../types'
import { obtenerEjercicioAleatorio } from '../utils/ejercicioUtils'
import { compararRespuesta } from '../utils/correccionUtils'
import '../styles/EntrenadorInteractivo.css'

const EntrenadorInteractivo = () => {
  const [ejercicio, setEjercicio] = useState<Ejercicio | null>(null)
  const [respuestas, setRespuestas] = useState<string[]>([])
  const [resultados, setResultados] = useState<ResultadoCorreccion[]>([])
  const [mostrarCorreccion, setMostrarCorreccion] = useState(false)

  useEffect(() => {
    cargarNuevoEjercicio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cargarNuevoEjercicio = useCallback(() => {
    const nuevoEjercicio = obtenerEjercicioAleatorio()
    setEjercicio(nuevoEjercicio)
    setRespuestas(new Array(nuevoEjercicio.verbos.length).fill(''))
    setResultados([])
    setMostrarCorreccion(false)
  }, [])

  const handleRespuestaChange = useCallback((indice: number, valor: string) => {
    setRespuestas(prev => {
      const nuevasRespuestas = [...prev]
      nuevasRespuestas[indice] = valor
      return nuevasRespuestas
    })
  }, [])

  const corregirEjercicio = useCallback(() => {
    if (!ejercicio) return

    const nuevosResultados: ResultadoCorreccion[] = ejercicio.verbos.map((verbo, indice) => {
      const estado = compararRespuesta(respuestas[indice] || '', verbo.formacion)
      return {
        indice,
        estado,
        respuestaUsuario: respuestas[indice] || '',
        respuestaCorrecta: verbo.formacion
      }
    })

    setResultados(nuevosResultados)
    setMostrarCorreccion(true)
  }, [ejercicio, respuestas])

  const renderTextoConHuecos = () => {
    if (!ejercicio) return null

    const partes = ejercicio.texto.split(/\{([^}]+)\}/)
    let indiceVerbo = 0

    return (
      <div className="texto-ejercicio">
        {partes.map((parte, indice) => {
          if (indice % 2 === 0) {
            // Texto normal
            return <span key={indice}>{parte}</span>
          } else {
            // Hueco para verbo
            const indiceActual = indiceVerbo
            const verbo = ejercicio.verbos[indiceVerbo]
            const resultado = resultados[indiceVerbo]
            indiceVerbo++

            // Usar pronombre desde los datos
            const placeholderTexto = verbo.pronombre
              ? `(${verbo.pronombre}: ${verbo.infinitivo})`
              : `(${verbo.infinitivo})`

            const textoParaMedir = respuestas[indiceActual] || placeholderTexto

            return (
              <span key={indice} className="hueco-container">
                <span className="hueco-sizer" aria-hidden="true">{textoParaMedir}</span>
                <input
                  type="text"
                  className={`hueco-input ${mostrarCorreccion ? `estado-${resultado?.estado}` : ''}`}
                  value={respuestas[indiceActual] || ''}
                  onChange={(e) => handleRespuestaChange(indiceActual, e.target.value)}
                  placeholder={placeholderTexto}
                  disabled={mostrarCorreccion}
                />
                {mostrarCorreccion && resultado && resultado.estado !== 'correcto' && (
                  <span className={`correccion correccion-${resultado.estado}`}>
                    {resultado.respuestaUsuario && (
                      <span className="respuesta-usuario tachado">{resultado.respuestaUsuario}</span>
                    )}
                    <span className="respuesta-correcta"> → {resultado.respuestaCorrecta}</span>
                  </span>
                )}
              </span>
            )
          }
        })}
      </div>
    )
  }

  const resumenStats = useMemo(() => {
    if (!mostrarCorreccion || resultados.length === 0) return null

    return {
      correctas: resultados.filter(r => r.estado === 'correcto').length,
      semiCorrectas: resultados.filter(r => r.estado === 'semi-correcto').length,
      incorrectas: resultados.filter(r => r.estado === 'incorrecto').length
    }
  }, [mostrarCorreccion, resultados])

  if (!ejercicio) {
    return <div>Cargando...</div>
  }

  return (
    <div className="entrenador-interactivo">
      <h2>✍️ Entrenador Interactivo</h2>

      <div className="instrucciones">
        <p>Completa los espacios con la forma correcta del verbo en pasado.</p>
      </div>

      <div className="ejercicio-contenedor">
        {renderTextoConHuecos()}
      </div>

      <div className="botones-container">
        {!mostrarCorreccion ? (
          <button className="btn btn-corregir" onClick={corregirEjercicio}>
            Corregir y mostrar solución
          </button>
        ) : (
          <button className="btn btn-siguiente" onClick={cargarNuevoEjercicio}>
            Siguiente ejemplo
          </button>
        )}
      </div>

      {mostrarCorreccion && resumenStats && (
        <div className="resumen-resultados">
          <div className="resumen-item">
            <span className="badge badge-correcto">
              Correctas: {resumenStats.correctas}
            </span>
          </div>
          <div className="resumen-item">
            <span className="badge badge-semi-correcto">
              Semi-correctas: {resumenStats.semiCorrectas}
            </span>
          </div>
          <div className="resumen-item">
            <span className="badge badge-incorrecto">
              Incorrectas: {resumenStats.incorrectas}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default EntrenadorInteractivo
