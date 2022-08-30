<template>
  <div class="lb-universe-element-list">
    <div class="lb-universe-element-list__body" :style="isContentVisible">
      <div class="lb-universe-element-list__header">
        <h3 class="lb-universe-element-list__title">{{ title }}</h3>
        <span class="lb-universe-element-list__vertical-line"></span>
        <span class="lb-universe-element-list__count">{{ elementCountText }}</span>
      </div>
      <div class="util__horizontal-line--white"></div>
      <div class="lb-universe-element-list__element" v-for="el in elements" :key="el.id">
        <div class="lb-universe-element-list__element-header">
          <h4 class="lb-universe-element-list__element-name">{{ el.name }}</h4>
          <span class="lb-universe-element-list__element-date"> {{ formatDate(el.last_modified) }}</span>
        </div>
        <p class="lb-universe-element-list__description" :class="!el.description.length ? 'lb-universe-element-list__description--empty' : ''">
          {{ el.description.length ? el.description : 'No description' }}
        </p>
        <div class="util__horizontal-line--white"></div>
      </div>
      <div class="lb-universe-element-list__footer" v-if="footerLink">
        <span class="lb-universe-element-list__link">see more elements...</span>
      </div>
    </div>
    <lb-spinner v-if="loading"></lb-spinner>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
    name: 'LbUniverseElementList',
    props: {
      title: {
        type: String,
        required: true,
      },
      elements: {
        type: Array,
        default: []
      },
      footerLink: {
        type: Boolean,
        default: true,
      },
      loading: {
        type: Boolean,
        default: false
      },
      elementCount: {
        type: Number,
      }
    },
    computed: {
      elementCountText() {
        return this.elementCount == 1 ? `${this.elementCount} element` : `${this.elementCount} elements`;
      },
      isContentVisible() {
        return this.loading ? 'visibility: hidden;' : 'visibility: visible;';
      }
    },
    methods: {
      formatDate(date) {
        const isoDate = new Date(date);
        const formattedDate = format(isoDate, 'dd.MM.yyyy hh:mm');
        return `Last modified: ${formattedDate}`;
      }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-universe-element-list {
  display: flex;
  flex-direction: column;
  background-color: @secondary-color;
  padding: 0.5em;
  border-radius: 10px;
  gap: 5px;
  position: relative;

  .lb-universe-element-list__body {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .lb-universe-element-list__header {
    display: flex;
    align-items: center;
    gap: 5px;

    .lb-universe-element-list__vertical-line {
      height: 1.5rem;
      border-right: 1px solid @light-text-color;
    }

    .lb-universe-element-list__title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
      color: @green-light-color;
      cursor: pointer;

      &:hover {
        color: @green-shrek-color;
      }
    }

    .lb-universe-element-list__count {
      color: @neutral-color;
    }
  }

  .lb-universe-element-list__element {
    display: flex;
    flex-direction: column;
    padding: 0.3em 0em;

    .lb-universe-element-list__element-header {
      display: flex;
      align-items: flex-end;
      gap: 15px;

      .lb-universe-element-list__element-name {
        margin: 0;
        font-size: 1.3rem;
        font-weight: 500;
        color: @light-text-color;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      .lb-universe-element-list__element-date {
        color: @neutral-color;
      }
    }

    .lb-universe-element-list__description {
      color: @light-text-color;
      margin: 0;
      font-weight: 400;
      padding: 0.5em 0.2em;

      &--empty {
        font-style: italic;
        font-weight: 300;
      }
    }
  }

  .lb-universe-element-list__footer {
    display: flex;
    justify-content: flex-end;
    padding: 0.4em 0em 0.2em;

    .lb-universe-element-list__link {
      font-style: italic;
      color: @light-text-color;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

</style>