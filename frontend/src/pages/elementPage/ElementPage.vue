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
            <component v-if="element !== null" :is="specificElement" :element="element"></component>
            <h3 class="side-panel__header-text">
                <icon icon="lb-tags"></icon>
                Tags
            </h3>
            <lb-tag-container :tags="tags"
                              @addTag="addTag"
                              @removeTag="removeTag"
                              :loading="contentLoading"
                              :buttonLoading="tagLoading">
            </lb-tag-container>
        </div>
        <lb-spinner v-if="elementLoading"></lb-spinner>
       </div>
       <div class="side-panel__bottom-button">
         <lb-button variant="negative" icon="lb-trash" :size="1.2" @click="deleteCurrentElement" :loading="deleteLoading">Delete Element</lb-button>
       </div>
    </div>
    <div class="element-page__content">
        <lb-content v-if="!contentLoading" :elementID="parseInt(elementID)" :categoryID="categoryID"></lb-content>
        <lb-spinner v-if="contentLoading"></lb-spinner>
    </div>
  </div>
</template>

<script>
import LbEditableText from '@/components/LbEditableText.vue';
import LbContent from '@/components/contentElements/LbContent.vue';
import { mapMutations, mapGetters } from 'vuex';
import { getElement, updateElement, deleteElement } from '@/httpLayers/universeElement.interface.js'
import { NotFoundException } from '@/domain/errors.js';
import { getFullContent } from '@/httpLayers/content.http.js'
import { createTagInContent, deleteTagFromContent } from '@/httpLayers/tag.http.js';
import contentElementType from '@/domain/contentElementTypes.js';
import LbTagContainer from '@/components/LbTagContainer.vue';
import EventDateSection from './EventDateSection.vue';
import LocationParentSection from './LocationParentSection.vue';
import DummyComponent from './DummyComponent.vue';

export default {
    name: 'ElementPage',
    components: {
        LbEditableText,
        LbContent,
        LbTagContainer,
        EventDateSection,
        DummyComponent,
        LocationParentSection
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
            element: null,
            elementLoading: false,
            contentLoading: true,
            deleteLoading: false,
            tags: [],
            tagLoading: false
        };
    },
    computed: {
        ...mapGetters('universe', ['universeID']),
        ...mapGetters('element', ['contentID']),
        sideInfoVisibility() {
            return this.elementLoading ? 'visibility: hidden;' : 'visibility: visible;';
        },
        specificElement() {
            if (this.categoryID == 'Events') return 'EventDateSection';
            if (this.categoryID == 'Locations') return 'LocationParentSection';
            return 'DummyComponent';
        }
    },
    methods: {
        ...mapMutations('notifications', ['notify']),
        ...mapMutations('element', ['setContent', 'setContentID', 'clearContent']),
        async fetchElement(categoryID, elementID) {
            this.element = null;
            const catID = categoryID ? categoryID : this.categoryID;
            const elID = elementID ? elementID : this.elementID;
            this.elementLoading = true;
            try {
                const element = await getElement(elID, catID);
                if (element) {
                  if (element.Universe_id != null && element.Universe_id != this.universeID) {
                    throw new NotFoundException("This element does not belong to this universe!");
                  }
                  this.name = element.name;
                  this.description = element.description;
                  this.element = element;
                  return true;
                }
            } catch (error) {
                this.notify({type: 'negative', message: `Error: ${error.message}`});
                if (error instanceof NotFoundException) {
                    this.$router.replace({ name: 'ElementNotFoundPage', params: { universeID: this.universeID }});
                }
                return false;
            } finally {
                this.elementLoading = false;
            }
        },
        async fetchFullContent() {
            this.contentLoading = true;
            try {
                this.clearContent();
                const content = await getFullContent(this.elementID, this.categoryID);
                this.setContentID(content.contentID);
                const elements = content.configuration.map(el => {
                    if (el.type == contentElementType.text) {
                        return content.texts.find(t => (t.id == el.id));
                    } else if (el.type == contentElementType.list) {
                        return content.lists.find(t => (t.id == el.id));
                    } else if (el.type == contentElementType.linkGroup) {
                        return content.linkGroups.find(t => (t.id == el.id));
                    } else if (el.type == contentElementType.imageGroup) {
                        return content.imageGroups.find(t => (t.id == el.id));
                    }
                });
                this.tags = content.tags;
                this.setContent(elements);
            } catch (error) {
                this.notify({type: 'negative', message: `Error: ${error.message}`});
            } finally {
                this.contentLoading = false;
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
        async addTag(tagName) {
            try {
              this.tagLoading = true;
              const newTag = await createTagInContent(tagName, this.contentID, this.universeID);
              this.tags.push({id: newTag.id, name: tagName});
            } catch (error) {
              this.notify({type: 'negative', message: `Error: ${error.message}`});
            } finally {
                this.tagLoading = false;
            }
        },
        async removeTag(id) {
            try {
                this.tagLoading = true;
                await deleteTagFromContent(id, this.contentID);
                this.tags = this.tags.filter(t => (t.id !== id));
            } catch (error) {
                this.notify({type: 'negative', message: `Error: ${error.message}`});
            } finally {
                this.tagLoading = false;
            }
        },
        async deleteCurrentElement() {
            try {
                this.deleteLoading = true;
                if (confirm('Do you want delete this element? It cannot be undone!')) {
                    await deleteElement(this.elementID, this.categoryID);
                    this.$router.replace({
                        name: 'UniverseMainPage',
                        params: {
                            universeID: this.universeID
                        }
                    });
                    this.clearContent();
                }
            } catch (error) {
                this.notify({type: 'negative', message: `Error: ${error.message}`});
            } finally {
                this.deleteLoading = false;
            }
        },
        async init(categoryID, elementID) {
            const success = await this.fetchElement(categoryID, elementID);
            if (success) {
                await this.fetchFullContent(categoryID, elementID);
            }
        }
    },
    watch: {
        async $route(newRoute) {
          if (newRoute.name === 'ElementPage') {
            await this.init(newRoute.params.categoryID, newRoute.params.elementID);
          }
        }
    },
    async mounted() {
       await this.init();
    },
    beforeRouteLeave(to, from) {
        this.clearContent();
    }
};
</script>

<style lang="less">
@import "../../common.less";

.element-page {
    display: flex;
    width: 100%;
    min-height: 95vh;

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

            .side-panel__header-text {
                display: flex;
                align-items: center;
                gap: 5px;
                margin: 0;
                width: 100%;
                font-size: 1.1rem;
                font-weight: 600;
            }

            .side-panel__title {
                .lb-editable-text__text, .lb-editable-text__input {
                    text-align: center;
                    font-size: 1.1rem;
                    font-weight: 500;
                }

            }

            .side-panel__description {
                padding-bottom: 2em;
                .lb-editable-text__text, .lb-editable-text__input {
                    font-size: 1rem;
                }
            }
        }

        .side-panel__bottom-button {
            position: fixed;
            bottom: 1em;
        }
    }

    .element-page__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        padding: 1em;
        position: relative;
    }
}

</style>