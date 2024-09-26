// eslint-disable-next-line import/no-extraneous-dependencies
import Mailjet from 'node-mailjet';
import { ScheduleNotificationSender } from '@/domain/clients/scheduleNotificationSender';
import { Schedule } from '@/entities/schedule.entity';

export class MailJetClient implements ScheduleNotificationSender {
  constructor() { }

  notify = async (schedule: Schedule): Promise<void> => {
    const mailjet = new Mailjet({
      apiKey: process.env.MJ_APIKEY_PUBLIC,
      apiSecret: process.env.MJ_APIKEY_PRIVATE,
    });

    const sender = process.env.MJ_MAIL_SENDER;

    const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });
    const response = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: sender,
              Name: 'Health&Med',
            },
            To: [
              {
                Email: schedule.doctor.email,
                Name: schedule.doctor.name,
              },
            ],
            Subject: 'Health&Med - Nova consulta agendada',
            TextPart: `Olá, Dr. ${schedule.doctor.name}!
                      Você tem uma nova consulta marcada!
                      Paciente: ${schedule.patient?.name}
                      Data e horário: ${dateTimeFormat.format(schedule.startAt)} às ${dateTimeFormat.format(schedule.endAt)}`,
          },
        ],
      });
    console.log(response.body);
  };
}
