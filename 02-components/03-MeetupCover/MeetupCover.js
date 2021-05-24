const MeetupCover = {
  name: 'MeetupCover',

  props: {
    link: {
      type: String,
      default: 'https://course-vue.javascript.ru/api/images/2',
    },
    title: {
      type: String,
    },
  },

  template: `
    <div class="meetup-cover" :style="'--bg-url: url(' + link + ')'">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
};

export default MeetupCover;
