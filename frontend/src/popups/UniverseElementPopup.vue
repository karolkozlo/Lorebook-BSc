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
            <lb-button variant="positive" :size="1.4" @click="createElement" :disabled="isCreateButtonDisabled" :loading="createLoading">Create Element</lb-button>
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
import { getUniverseCategories } from '../httpLayers/category.http.js';
import { getUniverseLocations, createLocation } from '../httpLayers/location.http.js';
import { createCharacter } from '../httpLayers/character.http.js';
import { createEvent } from '../httpLayers/event.http.js';
import { createEntry } from '../httpLayers/entry.http.js';


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
            categories: [],
            createLoading: false,
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
        ...mapGetters('universe', ['universeID']),
        isCreateButtonDisabled() {
            if(this.selectedCategory == null || this.name.length < 1) {
                return true;
            }
            return false;
        }
    },
    methods: {
        ...mapMutations('popups', ['closeUniverseElementPopup']),
        ...mapMutations('notifications', ['notify']),
        resetForm() {
            this.name = '';
            this.description = '';
            this.selectedCategory = null;
            this.eventDate = {
                year: 0,
                month: 1,
                day: 1
            };
            this.parentLocation = null;
        },
        async selectCategory(selection) {
            this.selectedCategory = selection.length ? selection[0].id : null;
            if (this.selectedCategory == 'Locations') {
                this.parentLocation = null;
                if (!this.fetchLocationsFlag) {
                    await this.fetchLocations();
                    this.fetchLocationsFlag = true;
                }
            } else if(this.selectedCategory == 'Events') {
                this.eventDate = {
                    year: 0,
                    month: 1,
                    day: 1
                };
            }
        },
        async createElement() {
            this.createLoading = true;
            try {
                let result = null;
                if (this.selectedCategory == 'Events') {
                    result = await createEvent(this.name, this.description, this.eventDate, this.universeID);
                } else if (this.selectedCategory == 'Locations') {
                    result = await createLocation(this.name, this.description, this.universeID, this.parentLocation);
                } else if (this.selectedCategory == 'Characters') {
                    result = await createCharacter(this.name, this.description, this.universeID);
                } else {
                    result = await createEntry(this.name, this.description, this.selectedCategory);
                }
                if (result) {
                    this.notify({ type: 'positive', message: `Successfully created ${result.name}` });
                    this.$emit('onResult', { result, type: this.selectedCategory });
                    this.$router.push({
                        name: 'ElementPage',
                        params: {
                        universeID: this.universeID,
                        categoryID: this.selectedCategory,
                        elementID: result.id
                        }
                    });
                    this.closeUniverseElementPopup();
                }
            } catch(error) {
                this.notify({ type: 'negative', message: error.message });
            } finally {
                this.createLoading = false;
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
            try {
                this.locations = await getUniverseLocations(this.universeID);
            } catch(error) {
                this.notify({ type: 'negative', message: error.message });
            } finally {
                this.areLocationsLoading = false;
            }
        },
        selectLocation(selection) {
            this.parentLocation = selection;
        }
    },
    async mounted() {
      try {
        const basicCategories = [
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
        ];
        const customCategories = await getUniverseCategories(this.universeID);
        this.categories.push(...basicCategories, ...customCategories);
      } catch(error) {
        this.notify({ type: 'negative', message: error.message });
      }
    },
    unmounted() {
        this.closeUniverseElementPopup();
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