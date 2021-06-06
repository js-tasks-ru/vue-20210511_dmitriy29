import MeetupAgendaItem from './MeetupAgendaItem.js';

const MeetupAgenda = {
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  template: `
    <div class="meetup-agenda">
      <MeetupAgendaItem v-for="item in agenda" :agenda-item="item" :key="item.id" />
    </div>`,
};

export default MeetupAgenda;
