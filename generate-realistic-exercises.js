import fs from 'fs';

// Plantillas realistas con contexto natural y pronombres explícitos
const plantillasRealistas = [
  {
    texto: "El verano pasado {viajar} a Italia con mi familia. {Visitar} Roma, Florencia y Venecia. {Ser} increíble ver el Coliseo en persona. Todos los días {comer} pasta y helado, y por las noches {pasear} por las calles antiguas.",
    verbos: [
      { infinitivo: "viajar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "visitar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "ser", pronombre: "", tiempo: "indefinido" },
      { infinitivo: "comer", pronombre: "nosotros", tiempo: "imperfecto" },
      { infinitivo: "pasear", pronombre: "nosotros", tiempo: "imperfecto" }
    ]
  },
  {
    texto: "Ayer {ir} al médico porque {tener} mucho dolor de cabeza. El doctor me {decir} que {estar} estresado y que {necesitar} descansar más. Me {recetar} unas pastillas y me {recomendar} hacer ejercicio.",
    verbos: [
      { infinitivo: "ir", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "tener", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "decir", pronombre: "él", tiempo: "indefinido" },
      { infinitivo: "estar", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "necesitar", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "recetar", pronombre: "él", tiempo: "indefinido" },
      { infinitivo: "recomendar", pronombre: "él", tiempo: "indefinido" }
    ]
  },
  {
    texto: "Esta mañana {levantarse} tarde porque anoche {acostarse} a las tres. {Tener} una reunión importante pero {llegar} justo a tiempo. Mi jefe no {decir} nada, pero {notar} que {estar} cansado.",
    verbos: [
      { infinitivo: "levantarse", pronombre: "yo", tiempo: "perfecto" },
      { infinitivo: "acostarse", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "tener", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "llegar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "decir", pronombre: "él", tiempo: "indefinido" },
      { infinitivo: "notar", pronombre: "él", tiempo: "indefinido" },
      { infinitivo: "estar", pronombre: "yo", tiempo: "imperfecto" }
    ]
  },
  {
    texto: "Cuando {ser} pequeño, {vivir} en un pueblo cerca de la playa. Todos los veranos mis hermanos y yo {ir} a nadar después del desayuno. Mi madre siempre nos {preparar} bocadillos para llevar.",
    verbos: [
      { infinitivo: "ser", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "vivir", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "ir", pronombre: "nosotros", tiempo: "imperfecto" },
      { infinitivo: "preparar", pronombre: "ella", tiempo: "imperfecto" }
    ]
  },
  {
    texto: "El lunes pasado {empezar} un nuevo trabajo. Los primeros días {estar} muy nervioso, pero mis compañeros {ser} muy amables y me {ayudar} mucho. Ahora ya {aprender} casi todo y me siento más cómodo.",
    verbos: [
      { infinitivo: "empezar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "estar", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "ser", pronombre: "ellos", tiempo: "indefinido" },
      { infinitivo: "ayudar", pronombre: "ellos", tiempo: "indefinido" },
      { infinitivo: "aprender", pronombre: "yo", tiempo: "perfecto" }
    ]
  },
  {
    texto: "Esta semana {estudiar} muchísimo para el examen de matemáticas. {Hacer} todos los ejercicios del libro y {repasar} mis apuntes varias veces. Espero que todo ese esfuerzo valga la pena.",
    verbos: [
      { infinitivo: "estudiar", pronombre: "yo", tiempo: "perfecto" },
      { infinitivo: "hacer", pronombre: "yo", tiempo: "perfecto" },
      { infinitivo: "repasar", pronombre: "yo", tiempo: "perfecto" }
    ]
  },
  {
    texto: "Mis abuelos {conocerse} en una fiesta en los años 60. Mi abuela me {contar} que cuando {ver} a mi abuelo por primera vez, {saber} inmediatamente que {ser} especial. {Casarse} un año después.",
    verbos: [
      { infinitivo: "conocerse", pronombre: "ellos", tiempo: "indefinido" },
      { infinitivo: "contar", pronombre: "ella", tiempo: "indefinido" },
      { infinitivo: "ver", pronombre: "ella", tiempo: "indefinido" },
      { infinitivo: "saber", pronombre: "ella", tiempo: "indefinido" },
      { infinitivo: "ser", pronombre: "él", tiempo: "imperfecto" },
      { infinitivo: "casarse", pronombre: "ellos", tiempo: "indefinido" }
    ]
  },
  {
    texto: "Ayer por la tarde {quedar} con Ana para tomar un café. {Hablar} durante horas sobre nuestros planes para el futuro. Ella me {explicar} que {querer} cambiar de carrera porque no {sentirse} feliz en su trabajo actual.",
    verbos: [
      { infinitivo: "quedar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "hablar", pronombre: "nosotros", tiempo: "indefinido" },
      { infinitivo: "explicar", pronombre: "ella", tiempo: "indefinido" },
      { infinitivo: "querer", pronombre: "ella", tiempo: "imperfecto" },
      { infinitivo: "sentirse", pronombre: "ella", tiempo: "imperfecto" }
    ]
  },
  {
    texto: "El fin de semana pasado {decidir} limpiar todo el apartamento. {Empezar} el sábado por la mañana y {terminar} el domingo por la noche. {Encontrar} cosas que {buscar} desde hacía meses.",
    verbos: [
      { infinitivo: "decidir", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "empezar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "terminar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "encontrar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "buscar", pronombre: "yo", tiempo: "imperfecto" }
    ]
  },
  {
    texto: "Durante la pandemia {pasar} mucho tiempo en casa. Al principio {hacer} videollamadas con amigos todos los días, pero después {acostumbrarse} a la soledad. {Aprender} a cocinar y {leer} muchos libros que {tener} pendientes.",
    verbos: [
      { infinitivo: "pasar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "hacer", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "acostumbrarse", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "aprender", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "leer", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "tener", pronombre: "yo", tiempo: "imperfecto" }
    ]
  },
  {
    texto: "Hoy {ir} al supermercado y {comprar} todo para la cena de esta noche. {Encontrarse} con mi vecina en la sección de frutas y {charlar} un rato. Ella me {recomendar} una receta nueva que tengo que probar.",
    verbos: [
      { infinitivo: "ir", pronombre: "yo", tiempo: "perfecto" },
      { infinitivo: "comprar", pronombre: "yo", tiempo: "perfecto" },
      { infinitivo: "encontrarse", pronombre: "yo", tiempo: "perfecto" },
      { infinitivo: "charlar", pronombre: "nosotros", tiempo: "perfecto" },
      { infinitivo: "recomendar", pronombre: "ella", tiempo: "indefinido" }
    ]
  },
  {
    texto: "Mi hermano {mudarse} a Barcelona el año pasado por trabajo. Al principio {llamarse} cada semana porque {extrañar} a la familia. Ahora {hacer} nuevos amigos y {estar} mucho más contento allí.",
    verbos: [
      { infinitivo: "mudarse", pronombre: "él", tiempo: "indefinido" },
      { infinitivo: "llamarse", pronombre: "nosotros", tiempo: "imperfecto" },
      { infinitivo: "extrañar", pronombre: "él", tiempo: "imperfecto" },
      { infinitivo: "hacer", pronombre: "él", tiempo: "perfecto" },
      { infinitivo: "estar", pronombre: "él", tiempo: "perfecto" }
    ]
  },
  {
    texto: "Anoche {ver} una película que me {recomendar} un amigo. {Ser} un thriller muy interesante, aunque el final no me {convencer} mucho. De todas formas, {pasar} un buen rato.",
    verbos: [
      { infinitivo: "ver", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "recomendar", pronombre: "él", tiempo: "indefinido" },
      { infinitivo: "ser", pronombre: "", tiempo: "indefinido" },
      { infinitivo: "convencer", pronombre: "", tiempo: "indefinido" },
      { infinitivo: "pasar", pronombre: "yo", tiempo: "indefinido" }
    ]
  },
  {
    texto: "Esta tarde {recibir} una noticia muy buena: me {aceptar} en el programa de intercambio que {solicitar} hace dos meses. {Llamar} inmediatamente a mis padres para contarles. Están muy orgullosos.",
    verbos: [
      { infinitivo: "recibir", pronombre: "yo", tiempo: "perfecto" },
      { infinitivo: "aceptar", pronombre: "ellos", tiempo: "indefinido" },
      { infinitivo: "solicitar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "llamar", pronombre: "yo", tiempo: "indefinido" }
    ]
  },
  {
    texto: "En mi anterior trabajo {tener} un jefe muy exigente. Siempre nos {pedir} que {trabajar} hasta tarde y nunca {valorar} nuestro esfuerzo. Por eso {decidir} buscar algo mejor.",
    verbos: [
      { infinitivo: "tener", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "pedir", pronombre: "él", tiempo: "imperfecto" },
      { infinitivo: "trabajar", pronombre: "nosotros", tiempo: "imperfecto" },
      { infinitivo: "valorar", pronombre: "él", tiempo: "imperfecto" },
      { infinitivo: "decidir", pronombre: "yo", tiempo: "indefinido" }
    ]
  },
  {
    texto: "El otro día {encontrar} unas fotos viejas de cuando {tener} diez años. En esas fotos {aparecer} mi mejor amigo del colegio, con quien {perder} el contacto hace años. Le {escribir} un mensaje y {quedar} para vernos pronto.",
    verbos: [
      { infinitivo: "encontrar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "tener", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "aparecer", pronombre: "él", tiempo: "imperfecto" },
      { infinitivo: "perder", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "escribir", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "quedar", pronombre: "nosotros", tiempo: "indefinido" }
    ]
  },
  {
    texto: "Durante mi adolescencia {practicar} baloncesto en un equipo local. {Entrenar} tres veces por semana y los sábados {jugar} partidos. {Ser} una época muy bonita en la que {hacer} muchos amigos.",
    verbos: [
      { infinitivo: "practicar", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "entrenar", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "jugar", pronombre: "nosotros", tiempo: "imperfecto" },
      { infinitivo: "ser", pronombre: "", tiempo: "indefinido" },
      { infinitivo: "hacer", pronombre: "yo", tiempo: "indefinido" }
    ]
  },
  {
    texto: "Esta mañana {despertarse} con un dolor terrible en la espalda. {Tomar} una pastilla pero no me {ayudar} mucho. {Tener} que cancelar mis planes del día y {quedarse} en cama descansando.",
    verbos: [
      { infinitivo: "despertarse", pronombre: "yo", tiempo: "perfecto" },
      { infinitivo: "tomar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "ayudar", pronombre: "", tiempo: "indefinido" },
      { infinitivo: "tener", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "quedarse", pronombre: "yo", tiempo: "indefinido" }
    ]
  },
  {
    texto: "Mis padres {celebrar} su aniversario el mes pasado. Les {organizar} una fiesta sorpresa con ayuda de mis hermanos. Cuando {llegar} y {ver} a todos los invitados, {ponerse} muy emocionados. {Ser} una noche inolvidable.",
    verbos: [
      { infinitivo: "celebrar", pronombre: "ellos", tiempo: "indefinido" },
      { infinitivo: "organizar", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "llegar", pronombre: "ellos", tiempo: "indefinido" },
      { infinitivo: "ver", pronombre: "ellos", tiempo: "indefinido" },
      { infinitivo: "ponerse", pronombre: "ellos", tiempo: "indefinido" },
      { infinitivo: "ser", pronombre: "", tiempo: "indefinido" }
    ]
  },
  {
    texto: "La semana pasada {perder} mi cartera en el metro. {Estar} muy preocupado porque {llevar} todas mis tarjetas y documentos. Por suerte, alguien la {encontrar} y la {llevar} a la oficina de objetos perdidos.",
    verbos: [
      { infinitivo: "perder", pronombre: "yo", tiempo: "indefinido" },
      { infinitivo: "estar", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "llevar", pronombre: "yo", tiempo: "imperfecto" },
      { infinitivo: "encontrar", pronombre: "", tiempo: "indefinido" },
      { infinitivo: "llevar", pronombre: "", tiempo: "indefinido" }
    ]
  }
];

// Conjugaciones completas
function conjugarVerbo(infinitivo, pronombre, tiempo) {
  const irregulares = {
    ser: {
      yo: { perfecto: 'he sido', indefinido: 'fui', imperfecto: 'era' },
      tú: { perfecto: 'has sido', indefinido: 'fuiste', imperfecto: 'eras' },
      él: { perfecto: 'ha sido', indefinido: 'fue', imperfecto: 'era' },
      ella: { perfecto: 'ha sido', indefinido: 'fue', imperfecto: 'era' },
      nosotros: { perfecto: 'hemos sido', indefinido: 'fuimos', imperfecto: 'éramos' },
      ellos: { perfecto: 'han sido', indefinido: 'fueron', imperfecto: 'eran' },
      '': { perfecto: 'ha sido', indefinido: 'fue', imperfecto: 'era' }
    },
    estar: {
      yo: { perfecto: 'he estado', indefinido: 'estuve', imperfecto: 'estaba' },
      él: { perfecto: 'ha estado', indefinido: 'estuvo', imperfecto: 'estaba' },
      ella: { perfecto: 'ha estado', indefinido: 'estuvo', imperfecto: 'estaba' },
      nosotros: { perfecto: 'hemos estado', indefinido: 'estuvimos', imperfecto: 'estábamos' },
      ellos: { perfecto: 'han estado', indefinido: 'estuvieron', imperfecto: 'estaban' }
    },
    ir: {
      yo: { perfecto: 'he ido', indefinido: 'fui', imperfecto: 'iba' },
      él: { perfecto: 'ha ido', indefinido: 'fue', imperfecto: 'iba' },
      nosotros: { perfecto: 'hemos ido', indefinido: 'fuimos', imperfecto: 'íbamos' },
      ellos: { perfecto: 'han ido', indefinido: 'fueron', imperfecto: 'iban' }
    },
    hacer: {
      yo: { perfecto: 'he hecho', indefinido: 'hice', imperfecto: 'hacía' },
      él: { perfecto: 'ha hecho', indefinido: 'hizo', imperfecto: 'hacía' },
      ella: { perfecto: 'ha hecho', indefinido: 'hizo', imperfecto: 'hacía' },
      nosotros: { perfecto: 'hemos hecho', indefinido: 'hicimos', imperfecto: 'hacíamos' },
      ellos: { perfecto: 'han hecho', indefinido: 'hicieron', imperfecto: 'hacían' }
    },
    tener: {
      yo: { perfecto: 'he tenido', indefinido: 'tuve', imperfecto: 'tenía' },
      él: { perfecto: 'ha tenido', indefinido: 'tuvo', imperfecto: 'tenía' },
      nosotros: { perfecto: 'hemos tenido', indefinido: 'tuvimos', imperfecto: 'teníamos' },
      ellos: { perfecto: 'han tenido', indefinido: 'tuvieron', imperfecto: 'tenían' }
    },
    decir: {
      yo: { perfecto: 'he dicho', indefinido: 'dije', imperfecto: 'decía' },
      él: { perfecto: 'ha dicho', indefinido: 'dijo', imperfecto: 'decía' },
      ella: { perfecto: 'ha dicho', indefinido: 'dijo', imperfecto: 'decía' },
      nosotros: { perfecto: 'hemos dicho', indefinido: 'dijimos', imperfecto: 'decíamos' },
      ellos: { perfecto: 'han dicho', indefinido: 'dijeron', imperfecto: 'decían' }
    },
    poder: {
      yo: { perfecto: 'he podido', indefinido: 'pude', imperfecto: 'podía' },
      él: { perfecto: 'ha podido', indefinido: 'pudo', imperfecto: 'podía' }
    },
    poner: {
      yo: { perfecto: 'he puesto', indefinido: 'puse', imperfecto: 'ponía' },
      él: { perfecto: 'ha puesto', indefinido: 'puso', imperfecto: 'ponía' }
    },
    saber: {
      yo: { perfecto: 'he sabido', indefinido: 'supe', imperfecto: 'sabía' },
      él: { perfecto: 'ha sabido', indefinido: 'supo', imperfecto: 'sabía' },
      ella: { perfecto: 'ha sabido', indefinido: 'supo', imperfecto: 'sabía' }
    },
    querer: {
      yo: { perfecto: 'he querido', indefinido: 'quise', imperfecto: 'quería' },
      él: { perfecto: 'ha querido', indefinido: 'quiso', imperfecto: 'quería' },
      ella: { perfecto: 'ha querido', indefinido: 'quiso', imperfecto: 'quería' }
    },
    dar: {
      yo: { perfecto: 'he dado', indefinido: 'di', imperfecto: 'daba' },
      él: { perfecto: 'ha dado', indefinido: 'dio', imperfecto: 'daba' }
    },
    ver: {
      yo: { perfecto: 'he visto', indefinido: 'vi', imperfecto: 'veía' },
      él: { perfecto: 'ha visto', indefinido: 'vio', imperfecto: 'veía' },
      ella: { perfecto: 'ha visto', indefinido: 'vio', imperfecto: 'veía' },
      nosotros: { perfecto: 'hemos visto', indefinido: 'vimos', imperfecto: 'veíamos' },
      ellos: { perfecto: 'han visto', indefinido: 'vieron', imperfecto: 'veían' }
    },
    venir: {
      yo: { perfecto: 'he venido', indefinido: 'vine', imperfecto: 'venía' },
      él: { perfecto: 'ha venido', indefinido: 'vino', imperfecto: 'venía' }
    },
    salir: {
      yo: { perfecto: 'he salido', indefinido: 'salí', imperfecto: 'salía' },
      él: { perfecto: 'ha salido', indefinido: 'salió', imperfecto: 'salía' }
    },
    empezar: {
      yo: { perfecto: 'he empezado', indefinido: 'empecé', imperfecto: 'empezaba' },
      él: { perfecto: 'ha empezado', indefinido: 'empezó', imperfecto: 'empezaba' }
    },
    llegar: {
      yo: { perfecto: 'he llegado', indefinido: 'llegué', imperfecto: 'llegaba' },
      él: { perfecto: 'ha llegado', indefinido: 'llegó', imperfecto: 'llegaba' },
      ellos: { perfecto: 'han llegado', indefinido: 'llegaron', imperfecto: 'llegaban' }
    },
    buscar: {
      yo: { perfecto: 'he buscado', indefinido: 'busqué', imperfecto: 'buscaba' }
    },
    explicar: {
      yo: { perfecto: 'he explicado', indefinido: 'expliqué', imperfecto: 'explicaba' },
      él: { perfecto: 'ha explicado', indefinido: 'explicó', imperfecto: 'explicaba' },
      ella: { perfecto: 'ha explicado', indefinido: 'explicó', imperfecto: 'explicaba' }
    },
    sacar: {
      yo: { perfecto: 'he sacado', indefinido: 'saqué', imperfecto: 'sacaba' }
    },
    jugar: {
      yo: { perfecto: 'he jugado', indefinido: 'jugué', imperfecto: 'jugaba' },
      nosotros: { perfecto: 'hemos jugado', indefinido: 'jugamos', imperfecto: 'jugábamos' }
    }
  };

  // Manejar reflexivos
  let baseVerbo = infinitivo;
  let pronReflexivo = '';

  if (infinitivo.endsWith('se')) {
    baseVerbo = infinitivo.slice(0, -2);
    if (pronombre === 'yo') pronReflexivo = 'me ';
    else if (pronombre === 'tú') pronReflexivo = 'te ';
    else if (pronombre === 'él' || pronombre === 'ella') pronReflexivo = 'se ';
    else if (pronombre === 'nosotros') pronReflexivo = 'nos ';
    else if (pronombre === 'ellos') pronReflexivo = 'se ';
  }

  // Buscar en irregulares
  if (irregulares[baseVerbo] && irregulares[baseVerbo][pronombre]) {
    const conj = irregulares[baseVerbo][pronombre][tiempo];
    // Si ya tiene pronombre reflexivo en la conjugación, no duplicar
    if (conj && conj.includes(' ')) return conj;
    return pronReflexivo + conj;
  }

  // Conjugación regular
  const terminaciones = {
    ar: {
      yo: { perfecto: 'he ', indefinido: 'é', imperfecto: 'aba' },
      él: { perfecto: 'ha ', indefinido: 'ó', imperfecto: 'aba' },
      ella: { perfecto: 'ha ', indefinido: 'ó', imperfecto: 'aba' },
      nosotros: { perfecto: 'hemos ', indefinido: 'amos', imperfecto: 'ábamos' },
      ellos: { perfecto: 'han ', indefinido: 'aron', imperfecto: 'aban' },
      '': { perfecto: 'ha ', indefinido: 'ó', imperfecto: 'aba' }
    },
    er: {
      yo: { perfecto: 'he ', indefinido: 'í', imperfecto: 'ía' },
      él: { perfecto: 'ha ', indefinido: 'ió', imperfecto: 'ía' },
      ella: { perfecto: 'ha ', indefinido: 'ió', imperfecto: 'ía' },
      nosotros: { perfecto: 'hemos ', indefinido: 'imos', imperfecto: 'íamos' },
      ellos: { perfecto: 'han ', indefinido: 'ieron', imperfecto: 'ían' },
      '': { perfecto: 'ha ', indefinido: 'ió', imperfecto: 'ía' }
    },
    ir: {
      yo: { perfecto: 'he ', indefinido: 'í', imperfecto: 'ía' },
      él: { perfecto: 'ha ', indefinido: 'ió', imperfecto: 'ía' },
      ella: { perfecto: 'ha ', indefinido: 'ió', imperfecto: 'ía' },
      nosotros: { perfecto: 'hemos ', indefinido: 'imos', imperfecto: 'íamos' },
      ellos: { perfecto: 'han ', indefinido: 'ieron', imperfecto: 'ían' },
      '': { perfecto: 'ha ', indefinido: 'ió', imperfecto: 'ía' }
    }
  };

  let tipo = '';
  let raiz = '';

  if (baseVerbo.endsWith('ar')) {
    tipo = 'ar';
    raiz = baseVerbo.slice(0, -2);
  } else if (baseVerbo.endsWith('er')) {
    tipo = 'er';
    raiz = baseVerbo.slice(0, -2);
  } else if (baseVerbo.endsWith('ir')) {
    tipo = 'ir';
    raiz = baseVerbo.slice(0, -2);
  }

  if (!tipo || !terminaciones[tipo][pronombre || '']) return infinitivo;

  const term = terminaciones[tipo][pronombre || ''][tiempo];

  if (tiempo === 'perfecto') {
    return pronReflexivo + term + raiz + (tipo === 'ar' ? 'ado' : 'ido');
  } else if (tiempo === 'indefinido' || tiempo === 'imperfecto') {
    return pronReflexivo + raiz + term;
  }

  return infinitivo;
}

// Generar ejercicios
const ejercicios = [];
let id = 1;

while (ejercicios.length < 500) {
  for (const plantilla of plantillasRealistas) {
    if (ejercicios.length >= 500) break;

    const ejercicio = {
      id: id++,
      texto: plantilla.texto,
      verbos: plantilla.verbos.map(v => ({
        infinitivo: v.infinitivo,
        pronombre: v.pronombre,
        formacion: conjugarVerbo(v.infinitivo, v.pronombre, v.tiempo),
        tiempo: v.tiempo
      }))
    };

    ejercicios.push(ejercicio);
  }
}

// Guardar
fs.writeFileSync(
  './src/data/ejercicios.json',
  JSON.stringify(ejercicios, null, 2),
  'utf-8'
);

console.log(`✅ ${ejercicios.length} ejercicios realistas generados con pronombres`);
