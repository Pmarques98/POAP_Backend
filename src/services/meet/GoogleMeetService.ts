import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

class GoogleMeetService {
  private oAuth2Client;

  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID_NEW,
      process.env.CLIENT_SECRET_NEW,
      process.env.REDIRECT_URL
    );

    console.info('Client id:', process.env.CLIENT_ID_NEW);

    this.oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN_NEW,
    });
  }

  async createEvent(
    summary: string,
    description: string,
    startDateTime: string,
    endDateTime: string,
    participantEmail: string, // E-mail do participante que terá acesso direto
    timeZone: string = 'America/Sao_Paulo'
  ) {
    const calendar = google.calendar({ version: 'v3', auth: this.oAuth2Client });

    const event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone,
      },
      end: {
        dateTime: endDateTime,
        timeZone,
      },
      attendees: [
        { email: participantEmail, responseStatus: 'accepted' }, // Adiciona o participante com status "aceito"
     ],
      conferenceData: {
        createRequest: {
          requestId: new Date().getTime().toString(), // ID único para o evento
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      visibility: 'default',
      guestsCanModify: true,
      guestsCanInviteOthers: true,
      guestsCanSeeOtherGuests: true,
    };

    const createdEvent = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });

    return createdEvent.data.hangoutLink;
  }
}

export { GoogleMeetService };