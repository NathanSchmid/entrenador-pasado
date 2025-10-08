import { Ejercicio } from '../types'
import ejerciciosData from '../data/ejercicios.json'

export const obtenerEjercicioAleatorio = (): Ejercicio => {
  const indiceAleatorio = Math.floor(Math.random() * ejerciciosData.length)
  return ejerciciosData[indiceAleatorio] as Ejercicio
}

export const obtenerTodosLosEjercicios = (): Ejercicio[] => {
  return ejerciciosData as Ejercicio[]
}
