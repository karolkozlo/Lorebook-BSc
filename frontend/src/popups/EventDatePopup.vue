<template>
  <lb-popup-box :isOpen="isOpen" title="Change event date" @close="close">
    <div class="event-date-popup">
      <div class="event-date-popup__inputs">
        <lb-input name="Year" type="number" v-model:value="eventDate.year"/>
        <lb-input name="Month" type="number"  @change:value="setEventMonth" v-model:value="eventDate.month"/>
        <lb-input name="Day" type="number" @change:value="setEventDay" v-model:value="eventDate.day"/>
      </div>
      <div class="event-date-popup__buttons">
        <lb-button variant="outline" :size="1.4" @click="close">Cancel</lb-button>
        <lb-button variant="positive" :size="1.4" @click="changeDate" :loading="loading">Save date</lb-button>
      </div>
    </div>
  </lb-popup-box>
</template>

<script>
import LbInput from '@/components/LbInput.vue';
import { mapMutations } from 'vuex';
import { updateEvent } from '@/httpLayers/event.http.js';

export default {
  name: 'EventDatePopup',
  components: {
    LbInput
  },
  emits: ['close', 'onResult'],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    year: {
      type: Number
    },
    month: {
      type: Number,
    },
    day: {
      type: Number
    },
    eventID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      eventDate: {
        year: this.year,
        month: this.month,
        day: this.day
      },
      loading: false
    };
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    close() {
      this.$emit('close');
    },
    setEventMonth(newValue) {
      if (newValue > 12) {
        this.eventDate.month = 12;
      } else if (newValue < 1) {
        this.eventDate.month = 1;
      } else {
        this.eventDate.month = newValue;
      }
    },
    setEventDay(newValue) {
      if (newValue > 31) {
        this.eventDate.day = 31;
      } else if (newValue < 1) {
        this.eventDate.day = 1;
      } else {
        this.eventDate.day = newValue;
      }
    },
    async changeDate() {
      try {
        this.loading = true;
        await updateEvent(this.eventID, this.eventDate);
        this.$emit('onResult', this.eventDate);
        this.close();
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="less">
@import '../common.less';

.event-date-popup {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;

  .event-date-popup__inputs {
    display: flex;
    flex-direction: column;
  }

  .event-date-popup__buttons {
    display: flex;
    justify-content: space-between;
  }
}

</style>