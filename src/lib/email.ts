import { Resend } from 'resend';
import type { ContactInput } from '@/lib/contact-schema';

interface EmailConfig {
  apiKey: string;
  to: string;
  from: string;
}

/**
 * Lee la configuracion del proveedor de correo desde el entorno. Solo servidor:
 * estas variables nunca llegan al cliente. Devuelve null si falta alguna.
 */
export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/**
 * Envia el mensaje del formulario via Resend. El destino real (CONTACT_TO_EMAIL)
 * nunca se expone al cliente. Devuelve true si Resend acepto el envio.
 */
export async function sendContactEmail(
  config: EmailConfig,
  data: Pick<ContactInput, 'name' | 'email' | 'message'>,
): Promise<boolean> {
  const resend = new Resend(config.apiKey);
  // El asunto se limpia de saltos de linea; el contenido va en el cuerpo en texto plano.
  const cleanName = data.name.replace(/[\r\n]+/g, ' ').slice(0, 100);
  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: `Portafolio - mensaje de ${cleanName}`,
    text: `Nombre: ${data.name}\nCorreo: ${data.email}\n\n${data.message}`,
  });
  return !error;
}
