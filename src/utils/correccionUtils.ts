import { EstadoCorreccion } from '../types'

// Función para normalizar texto (eliminar acentos y convertir a minúsculas)
const normalizarTexto = (texto: string): string => {
  return texto
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// Distancia de Levenshtein para detectar errores tipográficos
const calcularDistanciaLevenshtein = (str1: string, str2: string): number => {
  const m = str1.length
  const n = str2.length
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // eliminación
          dp[i][j - 1] + 1, // inserción
          dp[i - 1][j - 1] + 1 // sustitución
        )
      }
    }
  }

  return dp[m][n]
}

// Función mejorada para verificar si dos strings son similares
const sonSimilares = (texto1: string, texto2: string): boolean => {
  if (texto1 === texto2) return true

  const maxLen = Math.max(texto1.length, texto2.length)

  // Si la diferencia de longitud es muy grande, no son similares
  if (Math.abs(texto1.length - texto2.length) > 3) return false

  // Usar distancia de Levenshtein
  const distancia = calcularDistanciaLevenshtein(texto1, texto2)

  // Permitir errores basados en la longitud de la palabra
  // Palabras cortas (<=5): máximo 1 error
  // Palabras medianas (6-10): máximo 2 errores
  // Palabras largas (>10): máximo 3 errores
  const umbralError = maxLen <= 5 ? 1 : maxLen <= 10 ? 2 : 3

  return distancia <= umbralError
}

// Verificar si solo difieren en espacios o guiones
const soloEspaciosOGuiones = (texto1: string, texto2: string): boolean => {
  const normalizado1 = texto1.replace(/[\s-]/g, '')
  const normalizado2 = texto2.replace(/[\s-]/g, '')
  return normalizado1 === normalizado2
}

export const compararRespuesta = (
  respuestaUsuario: string,
  respuestaCorrecta: string
): EstadoCorreccion => {
  // Manejar respuesta vacía
  if (!respuestaUsuario || respuestaUsuario.trim() === '') {
    return 'incorrecto'
  }

  const usuario = respuestaUsuario.trim().toLowerCase()
  const correcta = respuestaCorrecta.trim().toLowerCase()

  // Respuesta exacta (correcta)
  if (usuario === correcta) {
    return 'correcto'
  }

  // Verificar si solo difieren en espacios o guiones (ej: "me he levantado" vs "me he levantado")
  if (soloEspaciosOGuiones(usuario, correcta)) {
    return 'correcto'
  }

  // Verificar si solo falta el acento
  const usuarioNormalizado = normalizarTexto(usuario)
  const correctaNormalizada = normalizarTexto(correcta)

  // Si sin acentos son iguales, es semi-correcto (error de acentuación)
  if (usuarioNormalizado === correctaNormalizada) {
    return 'semi-correcto'
  }

  // Verificar espacios/guiones sin acentos
  if (soloEspaciosOGuiones(usuarioNormalizado, correctaNormalizada)) {
    return 'semi-correcto'
  }

  // Si son similares (error tipográfico), es semi-correcto
  if (sonSimilares(usuarioNormalizado, correctaNormalizada)) {
    return 'semi-correcto'
  }

  // En cualquier otro caso, es incorrecto
  return 'incorrecto'
}
