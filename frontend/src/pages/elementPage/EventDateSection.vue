<template>
  <div class="event-date-section">
    <h3 class="event-date-section__header">
      Date
      <lb-button icon="lb-edit" :size="0.8" @click="openPopup"></lb-button>
    </h3>
    <div class="util__horizontal-line--white"></div>
    <div class="event-date-section__date">
      <div class="event-date-section__date-part">
        <span class="event-date-section__date-part-name">Year: </span>
        <span class="event-date-section__date-part-value">{{ year }}</span>
      </div>
      <div class="event-date-section__date-part">
        <span class="event-date-section__date-part-name">Month: </span>
        <span class="event-date-section__date-part-value">{{ month }}</span>
      </div>
      <div class="event-date-section__date-part">
        <span class="event-date-section__date-part-name">Day: </span>
        <span class="event-date-section__date-part-value">{{ day }}</span>
      </div>
    </div>
    <event-date-popup :isOpen="isPopupOpen"
                      @close="closePopup"
                      :year="year"
                      :month="month"
                      :day="day"
                      :eventID="eventID"
                      @onResult="changeDate">
    </event-date-popup>
  </div>
</template>

<script>
import EventDatePopup from '@/popups/EventDatePopup.vue';

export default {
  name: 'EventDateSection',
  components: {
    EventDatePopup
  },
  props: {
    element: {
      type: Object,
      required: true,
      validator: (value) => {
        if (value.year === null || value.year === undefined) return false;
        if (value.month === null || value.month === undefined) return false;
        if (value.day === null || value.day === undefined) return false;
        return true;
      }
    }
  },
  data() {
    return {
      year: this.element.year,
      month: this.element.month,
      day: this.element.day,
      eventID: this.element.id,
      isPopupOpen: false
    };
  },
  methods: {
    closePopup() {
      this.isPopupOpen = false;
    },
    openPopup() {
      this.isPopupOpen = true;
    },
    changeDate(newDate) {
      this.year = newDate.year;
      this.month = newDate.month;
      this.day = newDate.day;
    }
  }
};
</script>

<style lang="less">
@import "../../common.less";

.event-date-section {
  display: flex;
  flex-direction: column;
  color: @light-text-color;
  width: 100%;
  margin-bottom: 1em;

  .event-date-section__header {
    display: flex;
    gap: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .event-date-section__date {
    display: flex;
    flex-direction: column;
    padding: 0.2em;

    .event-date-section__date-part {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 0.5em;

      .event-date-section__date-part-name {
        font-weight: 500;
      }
    }
  }
}

</style>