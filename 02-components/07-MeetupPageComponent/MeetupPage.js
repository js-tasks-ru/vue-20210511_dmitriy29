import MeetupView from '../06-MeetupView/MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

const MeetupPage = {
  name: 'MeetupPage',

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: null,
    };
  },

  async mounted() {
    this.meetup = await fetchMeetup(MEETUP_ID);
  },

  template: `<div>
    <MeetupView v-if="meetup" :meetup="meetup" />
  </div>`,
};

export default MeetupPage;
