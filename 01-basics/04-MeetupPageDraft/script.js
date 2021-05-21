import Vue from './vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/** ID митапа для примера; используйте его при получении митапа */
const DEFAULT_TYPE = 'other';

/**
 * Возвращает ссылку на изображение по идентификатору, например, изображение митапа
 * @param imageId {number} - идентификатор изображения
 * @return {string} - ссылка на изображение
 */
function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

// Требуется создать Vue приложение
const app = new Vue({
  data() {
    return {
      rawMeetup: null,
    }
  },

  computed: {
    meetup() {
      if (!this.rawMeetup) {
        return null;
      }

      return Object.assign({}, this.rawMeetup, {
        dateOnlyString: new Date(this.rawMeetup.date).toISOString().split('T')[0],
        localDate: new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        cover: this.rawMeetup.imageId && getImageUrlByImageId(this.rawMeetup.imageId),
        coverStyle: this.rawMeetup.imageId && { '--bg-url': `url(${getImageUrlByImageId(this.rawMeetup.imageId)})` },
        agenda: this.rawMeetup.agenda.map((item) => ({
          ...item,
          iconSrc: this.getAgendaIcon(item.type),
          titleText: this.getAgendaTitle(item.type)
        })),
      });
    }
  },

  methods: {
    async setMeetup(id) {
      await fetch(`https://course-vue.javascript.ru/api/meetups/${id}`)
      .then(res => res.json())
      .then(data => this.rawMeetup = data);
    },
    getAgendaIcon(type) {
      return agendaItemIcons[type] 
        ? `/assets/icons/icon-${agendaItemIcons[type]}.svg`
        : `/assets/icons/icon-${DEFAULT_TYPE}.svg`
    },
    getAgendaTitle(title) {
      return agendaItemDefaultTitles[title] ?? agendaItemDefaultTitles[DEFAULT_TYPE];
    }
  },

  mounted() {
    this.setMeetup(MEETUP_ID);
  },

  template: `#app`,
});

app.$mount('#app');