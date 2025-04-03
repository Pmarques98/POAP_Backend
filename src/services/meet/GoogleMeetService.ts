import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

class GoogleMeetService {
    private oAuth2Client;

    constructor() {
        this.oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URL
        );

        this.oAuth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
    }

    async createEvent(summary: string, description: string, startDateTime: string, endDateTime: string, timeZone: string = 'America/Sao_Paulo') {
        const calendar = google.calendar({ version: 'v3', auth: this.oAuth2Client });

        const event = {
            summary: summary,
            description: description,
            start: {
                dateTime: startDateTime,
                timeZone: timeZone,
            },
            end: {
                dateTime: endDateTime,
                timeZone: timeZone,
            },
            conferenceData: {
                createRequest: {
                    requestId: 'some-random-string', // ID único para a solicitação
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet'
                    }
                }
            },
            attendees: [
                { email: 'public@example.com' } // Adicione um email fictício para tornar o evento público
            ],
            visibility: 'public' // Torne o evento público
        };

        const createdEvent = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1
        });

        return createdEvent.data.hangoutLink;
    }
}

export { GoogleMeetService };