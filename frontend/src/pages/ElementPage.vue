<template>
  <div class="element-page">
    <div class="element-page__side-panel">
       <div class="side-panel__info">
        <div class="side-panel__info-content" :style="sideInfoVisibility">
            <lb-editable-text :value="name"
                          :maxLength="60"
                          width="100%"
                          @onSave="saveName"
                          customClass="side-panel__title">
            </lb-editable-text>
            <div class="util__horizontal-line--white"></div>
            <lb-editable-text :value="description"
                            :maxLength="250"
                            width="100%"
                            type="textarea"
                            @onSave="saveDescription"
                            customClass="side-panel__description"
                            noContent="No description">
            </lb-editable-text>
        </div>
        <lb-spinner v-if="elementLoading"></lb-spinner>
       </div>
    </div>
    <div class="element-page__content">
        Content {{ `Element ${elementID} in category ${categoryID} ` }}
    </div>
  </div>
</template>

<script>
import LbEditableText from '@/components/LbEditableText.vue';
import { mapMutations, mapGetters } from 'vuex';
import { getElement, updateElement } from '@/httpLayers/interface.js'
import { NotFoundException } from '@/domain/errors.js';

export default {
    name: 'ElementPage',
    components: {
        LbEditableText
    },
    props: {
        elementID: {
            type: String,
            required: true,
        },
        categoryID: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            name: '',
            description: '',
            elementLoading: false,
        };
    },
    computed: {
        ...mapGetters('universe', ['universeID']),
        sideInfoVisibility() {
            return this.elementLoading ? 'visibility: hidden;' : 'visibility: visible;';
        }
    },
    methods: {
        ...mapMutations('notifications', ['notify']),
        async fetchElement() {
            this.elementLoading = true;
            try {
                const element = await getElement(this.elementID, this.categoryID);
                if (element) {
                  if (element.Universe_id != null && element.Universe_id != this.universeID) {
                    throw new NotFoundException("This element does not belong to this universe!");
                  }
                  this.name = element.name;
                  this.description = element.description;
                }
            } catch (error) {
                this.notify({type: 'negative', message: `Error: ${error.message}`});
                if (error instanceof NotFoundException) {
                    this.$router.replace({ name: 'ElementNotFoundPage', params: { universeID: this.universeID }});
                }
            } finally {
                this.elementLoading = false;
            }
        },
        async saveName(newName) {
            try {
                if (newName.length < 1) {
                    throw new Error(`Cannot save Name: It should have at least 1 character`)
                }
                await updateElement(this.elementID, {name: newName}, this.categoryID);
                this.name = newName;
            } catch (error) {
                this.notify({type: 'negative', message: `Error: ${error.message}`});
            }
        },
        async saveDescription(newDescription) {
            try {
                await updateElement(this.elementID, {description: newDescription}, this.categoryID);
                this.description = newDescription;
            } catch (error) {
                this.notify({type: 'negative', message: `Error: ${error.message}`});
            }
        },
    },
    async mounted() {
        await this.fetchElement();
    }
};
</script>

<style lang="less">
@import "../common.less";

.element-page {
    display: flex;
    width: 100%;
    height: 95vh;

    .element-page__side-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: ~"max(15%, 200px)";
        background-color: @primary-side-color;
        padding: 0.5em 0em;

        .side-panel__info {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0px 5px;
            color: @light-text-color;
            gap: 0.4em;
            position: relative;

            .side-panel__info-content {
                display: flex;
                flex-direction: column;
                gap: 0.4em;
            }

            input, textarea {
                color: @dark-text-color;
            }

            .side-panel__title {
                .lb-editable-text__text, .lb-editable-text__input {
                    text-align: center;
                    font-size: 1.1rem;
                    font-weight: 500;
                }

            }

            .side-panel__description {
                .lb-editable-text__text, .lb-editable-text__input {
                    font-size: 1rem;
                }
            }
        }
    }

    .element-page__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        padding: 1em;
    }
}

</style>