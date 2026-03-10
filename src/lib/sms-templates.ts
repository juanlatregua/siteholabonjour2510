// lib/sms-templates.ts — Plantillas SMS HolaBonjour (max ~160 chars)

export function smsReservaConfirmada(data: {
  nombre: string;
  nivel: string;
  fecha: string;
  hora: string;
}): string {
  return `HolaBonjour: Reserva confirmada. ${data.nombre}, tu clase ${data.nivel} es el ${data.fecha} a las ${data.hora}h por Zoom. Hasta pronto!`;
}

export function smsPagoConfirmado(data: {
  nombre: string;
  nivel: string;
  importe: string;
}): string {
  return `HolaBonjour: Pago de ${data.importe}EUR confirmado. Pack 4 clases ${data.nivel} activado. Te enviamos los datos de acceso por email.`;
}

export function smsRecordatorioClase(data: {
  nombre: string;
  fecha: string;
  hora: string;
}): string {
  return `HolaBonjour: Recordatorio: tu clase de frances es manana ${data.fecha} a las ${data.hora}h. Anulacion: 48h antes. A demain!`;
}

export function smsClaseConfirmada(data: {
  nombre: string;
  fecha: string;
  hora: string;
  profesor: string;
}): string {
  return `HolaBonjour: Clase confirmada el ${data.fecha} a las ${data.hora}h con ${data.profesor}. Detalles en tu email. A bientot!`;
}

export function smsAnulacionTardia(data: {
  nombre: string;
  fecha: string;
}): string {
  return `HolaBonjour: La clase del ${data.fecha} fue anulada con menos de 48h. Se descontara del bono salvo justificante medico (24h).`;
}

export function smsResenaRequest(data: {
  nombre: string;
  linkOpinion: string;
}): string {
  return `HolaBonjour: Gracias por tu clase, ${data.nombre}! Nos encantaria conocer tu opinion: ${data.linkOpinion}`;
}

export function smsPostClase(data: {
  nombre: string;
}): string {
  return `HolaBonjour: Merci ${data.nombre}! Gracias por tu clase de hoy. La grabacion estara disponible pronto en tu zona de alumno. A bientot!`;
}
