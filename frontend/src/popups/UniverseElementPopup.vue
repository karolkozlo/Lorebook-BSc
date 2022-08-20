<template>
  <lb-popup-box :isOpen="isUniverseElementPopupOpen" title="Create new element in Universe" @close="closeUniverseElementPopup">
    <div class="universe-element-popup">
        <lb-input name="Title" v-model:value="name" :maxLength="60"/>
        <div>
            <h2 class="universe-element-popup__field-title">Type of element</h2>
            <lb-select :items="categories" width="100%" placeholder="Select type of new element" @handleSelection="selectCategory"/>
        </div>
        <div class="universe-element-popup__specific-row universe-element-popup__specific-row--events" v-if="selectedCategory == 'Events'">
            <lb-input name="Year" type="number" v-model:value="eventDate.year"/>
            <lb-input name="Month" type="number"  @change:value="setEventMonth" v-model:value="eventDate.month"/>
            <lb-input name="Day" type="number" @change:value="setEventDay" v-model:value="eventDate.day"/>
        </div>
        <div class="universe-element-popup__specific-row" v-if="selectedCategory == 'Locations'">
            <h2 class="universe-element-popup__field-title">Parent Location</h2>
            <lb-search-select
                placeholder="Select parent locations..."
                :items="locations" :loading="areLocationsLoading"
                @onSelection="selectLocation"></lb-search-select>
        </div>
        <lb-input name="Description" type="textarea" v-model:value="description" :maxLength="250"/>
        <div class="universe-element-popup__buttons">
            <lb-button variant="outline" :size="1.4" @click="closeUniverseElementPopup">Cancel</lb-button>
            <lb-button variant="positive" :size="1.4" @click="createElement">Create Element</lb-button>
        </div>
    </div>
  </lb-popup-box>
</template>

<script>
import LbPopupBox from '../components/LbPopupBox.vue';
import { mapGetters, mapMutations } from 'vuex';
import LbInput from '../components/LbInput.vue';
import LbSelect from '../components/LbSelect.vue';
import LbSearchSelect from '../components/LbSearchSelect.vue';

export default {
    name: 'UniverseElementPopup',
    components: {
        LbPopupBox,
        LbInput,
        LbSelect,
        LbSearchSelect
    },
    emits: ["onResult"],
    data() {
        return {
            name: '',
            description: '',
            selectedCategory: null,
            categories: [
                {
                    id: 'Characters',
                    name: 'Characters'
                },
                {
                    id: 'Locations',
                    name: 'Locations'
                },
                {
                    id: 'Events',
                    name: 'Events'
                }
            ],
            //Data for Events
            eventDate: {
                year: 0,
                month: 1,
                day: 1
            },
            //Data for Locations
            locations: [],
            parentLocation: null,
            areLocationsLoading: false,
            fetchLocationsFlag: false
        };
    },
    computed: {
        ...mapGetters('popups', ['isUniverseElementPopupOpen']),
    },
    methods: {
        ...mapMutations('popups', ['closeUniverseElementPopup']),
        async selectCategory(selection) {
            this.selectedCategory = selection.length ? selection[0].id : null;
            if ( this.selectedCategory == 'Locations' && !this.fetchLocationsFlag) {
                await this.fetchLocations();
                this.fetchLocationsFlag = true;
            }
        },
        createElement() {
            console.log('name: ', this.name);
            console.log('description: ', this.name);
            console.log('type: ', this.selectedCategory);
            if (this.selectedCategory == 'Events') {
                console.log('eventDate: ', this.eventDate)
            }
            if (this.selectedCategory == 'Locations') {
                console.log('parentLocation: ', this.parentLocation);
            }
        },
        // Methods for Events
        setEventMonth(newValue) {
            if ( newValue > 12 ) {
                this.eventDate.month = 12;
            } else if ( newValue < 1 ) {
                this.eventDate.month = 1;
            } else {
                this.eventDate.month = newValue;
            }
        },
        setEventDay(newValue) {
            if ( newValue > 31 ) {
                this.eventDate.day = 31;
            } else if ( newValue < 1 ) {
                this.eventDate.day = 1;
            } else {
                this.eventDate.day = newValue;
            }
        },
        //Methods for Locations
        async fetchLocations() {
            this.areLocationsLoading = true;
            setTimeout(() => {
                this.locations = [
                    {
                        id: 1,
                        name: 'Some Location'
                    },
                    {
                        id: 2,
                        name: 'Locatio'
                    },
                    {
                        id: 3,
                        name: 'Another Some Location'
                    }
                ];
                this.areLocationsLoading = false;
            }, 3000)
        },
        selectLocation(selection) {
            this.parentLocation = selection;
        }
    }
}
</script>

<style lang="less">
@import '../common.less';

.universe-element-popup {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 800px;

    .universe-element-popup__specific-row {
        border: 1px solid @accent-color;
        border-radius: 5px;
        padding: 0.2em;

        &--events {
            display: flex;
            width: 100%;
            justify-content: space-between;
            flex-basis: 100%;

            .lb-input {
                    width: 25%;
            }
        }
    }

    .universe-element-popup__field-title {
      margin: 0;
      margin-right: 0.5em;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 1.4rem;
      color: @light-text-color;
    }

    .universe-element-popup__buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
}

</style>