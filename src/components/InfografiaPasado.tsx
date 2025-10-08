import { memo, useState } from 'react'
import '../styles/InfografiaPasado.css'

interface SeccionTiempoProps {
  titulo: string
  color: string
  descripcion: string
  cuando: string[]
  marcadores: string[]
  ejemplos: string[]
  tipoLinea: 'perfecto' | 'indefinido' | 'imperfecto'
}

const SeccionTiempo = memo(({ titulo, color, descripcion, cuando, marcadores, ejemplos, tipoLinea }: SeccionTiempoProps) => {
  const [mostrarCuando, setMostrarCuando] = useState(false)
  const [mostrarEjemplos, setMostrarEjemplos] = useState(false)
  const renderLineaTiempo = () => {
    switch (tipoLinea) {
      case 'perfecto':
        // Pasado reciente conectado con el presente
        return (
          <div className="linea-tiempo perfecto">
            <span className="emoji-tiempo">📅</span>
            <span className="texto-tiempo" style={{ color }}>pasado reciente</span>
            <span className="flecha-tiempo" style={{ color }}>→</span>
            <span className="emoji-tiempo">🎯</span>
            <span className="texto-tiempo texto-ahora" style={{ color, fontWeight: 'bold' }}>AHORA</span>
          </div>
        )
      case 'indefinido':
        // Acción completa en el pasado
        return (
          <div className="linea-tiempo indefinido">
            <span className="emoji-tiempo">✅</span>
            <span className="texto-tiempo" style={{ color }}>acción completa en el pasado</span>
          </div>
        )
      case 'imperfecto':
        // Acción habitual/continua
        return (
          <div className="linea-tiempo imperfecto">
            <span className="emoji-tiempo">🔄</span>
            <span className="texto-tiempo" style={{ color }}>acción habitual/continua</span>
          </div>
        )
    }
  }
  return (
    <div className="seccion-tiempo" style={{ borderLeftColor: color }}>
      <h3 className="seccion-titulo" style={{ color }}>{titulo}</h3>

      <div className="seccion-contenido">
        <div className="descripcion">
          <h4>Descripción</h4>
          <p>{descripcion}</p>
        </div>

        <div className="cuando-usar">
          <h4
            className="cuando-toggle"
            onClick={() => setMostrarCuando(!mostrarCuando)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Cuándo usar {mostrarCuando ? '▼' : '▶'}
          </h4>
          {mostrarCuando && (
            <ul>
              {cuando.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="marcadores">
          <h4>Marcadores temporales</h4>
          <div className="marcadores-lista">
            {marcadores.map((marcador, index) => (
              <span key={index} className="marcador" style={{ backgroundColor: `${color}20`, color }}>
                {marcador}
              </span>
            ))}
          </div>
        </div>

        <div className="ejemplos">
          <h4
            className="ejemplos-toggle"
            onClick={() => setMostrarEjemplos(!mostrarEjemplos)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Ejemplos {mostrarEjemplos ? '▼' : '▶'}
          </h4>
          {mostrarEjemplos && (
            <ul>
              {ejemplos.map((ejemplo, index) => (
                <li key={index}>{ejemplo}</li>
              ))}
            </ul>
          )}
        </div>

        {renderLineaTiempo()}
      </div>
    </div>
  )
})

SeccionTiempo.displayName = 'SeccionTiempo'

const InfografiaPasado = () => {
  const tiemposPasado: SeccionTiempoProps[] = [
    {
      titulo: 'Pretérito Perfecto',
      color: '#4CAF50',
      tipoLinea: 'perfecto' as const,
      descripcion: 'Se usa para acciones pasadas relacionadas con el presente o que ocurrieron en un periodo de tiempo no terminado.',
      cuando: [
        'Acciones recientes en el presente',
        'Experiencias de vida (sin tiempo específico)',
        'Periodos de tiempo no terminados'
      ],
      marcadores: ['hoy', 'esta semana', 'este mes', 'este año', 'ya', 'todavía no', 'nunca', 'alguna vez'],
      ejemplos: [
        'Hoy he comido paella.',
        'Esta semana he estudiado mucho.',
        'Nunca he estado en Japón.'
      ]
    },
    {
      titulo: 'Pretérito Indefinido',
      color: '#2196F3',
      tipoLinea: 'indefinido' as const,
      descripcion: 'Se usa para acciones pasadas completadas en un momento específico del pasado.',
      cuando: [
        'Acciones terminadas en el pasado',
        'Con fecha o momento específico',
        'Periodos de tiempo terminados'
      ],
      marcadores: ['ayer', 'anteayer', 'la semana pasada', 'el año pasado', 'en 2020', 'hace dos días'],
      ejemplos: [
        'Ayer fui al cine.',
        'El año pasado visité España.',
        'En 2020 terminé la universidad.'
      ]
    },
    {
      titulo: 'Pretérito Imperfecto',
      color: '#FF9800',
      tipoLinea: 'imperfecto' as const,
      descripcion: 'Se usa para descripciones en el pasado, acciones habituales o acciones en progreso.',
      cuando: [
        'Descripciones en el pasado',
        'Acciones habituales o repetidas',
        'Acciones en progreso en el pasado',
        'Edad, hora, tiempo atmosférico en el pasado'
      ],
      marcadores: ['antes', 'siempre', 'normalmente', 'todos los días', 'cada año', 'mientras', 'cuando era niño'],
      ejemplos: [
        'Cuando era niño, jugaba en el parque.',
        'Todos los días iba a la escuela.',
        'La casa era grande y bonita.'
      ]
    }
  ]

  return (
    <div className="infografia-pasado">
      <div className="secciones-container">
        {tiemposPasado.map((tiempo, index) => (
          <SeccionTiempo key={index} {...tiempo} />
        ))}
      </div>
    </div>
  )
}

export default InfografiaPasado
