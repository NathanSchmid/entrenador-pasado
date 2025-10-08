export type TiempoPasado = 'perfecto' | 'indefinido' | 'imperfecto'

export interface Verbo {
  infinitivo: string
  pronombre: string
  formacion: string
  tiempo: TiempoPasado
}

export interface Ejercicio {
  id: number
  texto: string
  verbos: Verbo[]
}

export interface RespuestaUsuario {
  indice: number
  valor: string
}

export type EstadoCorreccion = 'sin-corregir' | 'correcto' | 'incorrecto' | 'semi-correcto'

export interface ResultadoCorreccion {
  indice: number
  estado: EstadoCorreccion
  respuestaUsuario: string
  respuestaCorrecta: string
}
