<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label>Название</label>
          <input v-model="localMeetup.title" class="form-control" />
        </div>
        <div class="form-group">
          <label>Дата</label>
          <input v-model="localMeetup.date" class="form-control" type="date" />
        </div>
        <div class="form-group">
          <label>Место</label>
          <input v-model="localMeetup.place" class="form-control" />
        </div>
        <div class="form-group">
          <label>Описание</label>
          <textarea v-model="localMeetup.description" class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Изображение</label>
          <image-uploader v-model="localMeetup.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in localMeetup.agenda"
        :key="agendaItem.id"
        :agenda-item="agendaItem"
        class="mb-3"
        @update:agendaItem="updateAgendaItem(index, $event)"
        @remove="removeAgendaItem(index)"
      />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">+ Добавить этап программы</button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <button class="button button_secondary button_block" type="button" data-test="cancel" @click="$emit('cancel')">
          Отмена
        </button>
        <button class="button button_primary button_block" type="submit" data-test="submit" @click="handleSubmit">
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

let lastId = -1;
function createAgendaItem() {
  return {
    id: lastId--,
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
    },
  },

  data() {
    return {
      localMeetup: null,
    };
  },

  watch: {
    meetup: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (!deepEqual(newValue, this.localMeetup)) {
          this.localMeetup = deepClone(this.meetup);
        }
      },
    },

    localMeetup: {
      deep: true,
      handler(newValue) {
        this.$emit('update:meetup', deepClone(newValue));
      },
    },
  },

  methods: {
    addAgendaItem() {
      const newItem = createAgendaItem();
      newItem.startsAt = this.getAgendaItemStartsAt();
      this.localMeetup.agenda.push(newItem);
    },

    updateAgendaItem(index, newItem) {
      this.localMeetup.agenda.splice(index, 1, newItem);
    },

    removeAgendaItem(index) {
      this.localMeetup.agenda.splice(index, 1);
    },

    getAgendaItemStartsAt() {
      const agenda = [...this.localMeetup.agenda];
      const agLength = agenda.length;
      if (agLength) {
        return agenda[agLength - 1].endsAt;
      } else {
        return '00:00';
      }
    },

    handleSubmit() {
      this.$emit('submit', deepClone(this.localMeetup));
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
