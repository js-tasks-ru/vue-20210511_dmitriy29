<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': loading }" :style="bgImage">
      <span>{{ imageText }}</span>
      <input
        ref="input_image"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="form-control-file"
        v-on="listeners"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../ImageService';

export default {
  name: 'ImageUploader',

  inheritAttrs: false,

  model: {
    prop: 'imageId',
    event: 'change',
  },

  props: {
    imageId: {
      default: null,
    },
  },

  data() {
    return {
      loading: false,
      selectedFile: null,
    };
  },

  computed: {
    bgImage() {
      if (this.selectedFile) {
        const link = ImageService.getImageURL(this.selectedFile);
        return `--bg-image: url('${link}')`;
      }
      return '';
    },

    listeners() {
      return {
        ...this.$listeners,
        click: (event) => {
          if (this.imageId) {
            event.preventDefault();
            this.clearImage();
            this.$emit('change', null);
          } else {
            this.$emit('click', event);
          }
        },

        change: (event) => {
          this.loading = true;
          ImageService.uploadImage(event.target.files[0]).then((data) => {
            this.selectedFile = data.id ?? null;
            this.loading = false;
            this.$emit('change', this.selectedFile);
          });
        },
      };
    },

    imageText() {
      if (this.loading) {
        return 'Загрузка...';
      } else {
        return this.imageId ? 'Удалить изображение' : 'Загрузить изображение';
      }
    },
  },

  watch: {
    imageId(newVal) {
      this.selectedFile = newVal;
    },
  },

  created() {
    this.selectedFile = this.imageId;
  },

  methods: {
    clearImage() {
      this.selectedFile = null;
      this.$refs['input_image'].value = '';
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
