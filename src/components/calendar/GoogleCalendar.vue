<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { gapi } from 'gapi-script';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const events = ref<any[]>([]);

const calendarOptions = reactive({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  events: [] as any[],
  height: 'auto',
  headerToolbar: {
    left: 'title',
    center: '',
    right: 'prev,next today'
  }
});

let tokenClient: any;

onMounted(() => {
  // 1. Load GAPI only for Calendar operations. Do not use auth2.
  gapi.load('client', async () => {
    await gapi.client.init({
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    });
  });

  // 2. Initialize GIS, the newer authentication library.
  // If TypeScript does not recognize window.google, add a type definition or suppress that specific type error.
  tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: async (tokenResponse: any) => {
      if (tokenResponse.error !== undefined) {
        console.error('Login error:', tokenResponse);
        return;
      }
      // Fetch events after login succeeds.
      await listEvents();
    },
  });
});

const handleAuth = () => {
  // Open a popup and request login.
  tokenClient.requestAccessToken();
};

const listEvents = async () => {
  try {
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), // Fetch from one month ago.
      showDeleted: false,
      singleEvents: true,
      maxResults: 100, // Increase the number of fetched events.
      orderBy: 'startTime',
    });
    
    // Shape events for FullCalendar.
    calendarOptions.events = response.result.items.map((event: any) => ({
      id: event.id,
      title: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end?.dateTime || event.end?.date,
      backgroundColor: '#1f6f63', // Custom color.
      borderColor: '#1f6f63'
    }));
  } catch (err) {
    console.error('Calendar fetch error:', err);
  }
};
</script>

<template>
  <div class="calendar-container">
    <div class="header-actions">
      <h2>Google Calendar integration</h2>
      <button class="auth-button" @click="handleAuth">Access calendar</button>
    </div>
    
    <div class="calendar-wrapper">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  padding: 1rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-actions h2 {
  margin: 0;
  color: #18212f;
}

.auth-button {
  background-color: #1f6f63;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.auth-button:hover {
  background-color: #185a50;
}

.calendar-wrapper {
  /* Tune FullCalendar text and button colors for readability. */
  --fc-button-bg-color: #1f6f63;
  --fc-button-border-color: #1f6f63;
  --fc-button-hover-bg-color: #185a50;
  --fc-button-hover-border-color: #185a50;
  --fc-button-active-bg-color: #185a50;
  --fc-button-active-border-color: #185a50;
  font-family: inherit;
}
</style>
