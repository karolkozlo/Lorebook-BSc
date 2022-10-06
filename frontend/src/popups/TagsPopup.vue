<template>
  <lb-popup-box :isOpen="isTagsPopupOpen" title="Tags in current universe" @close="close">
    <div class="tags-popup">
      <div class="tags-popup__content" :style="tagsLoadingVisibility">
        <div class="tags-popup__row" v-if="tagList.length !== 0">
          <div class="tags-popup__edit-form" v-if="selectedTag">
            <lb-input name="Tag Name" :value="tagName" @update:value="setTagName" :error="tagNameError" :maxLength="60"></lb-input>
            <div class="tags-popup__form-buttons">
              <lb-button
                :size="1.2"
                variant="outline"
                @click="cancelEdit">Cancel</lb-button>
              <lb-button
                  :size="1.2"
                  icon="lb-edit"
                  @click="renameTag"
                  :loading="renameLoading"
                  :disabled="disableRenameButton">Rename Tag</lb-button>
            </div>
          </div>
          <lb-search-bar placeholder="Search tag by name..." @search="search" :text="searchText" v-if="!selectedTag"></lb-search-bar>
        </div>
        <div class="tags-popup__row" v-if="tagList.length !== 0">
          <div class="tags-popup__tag_table">
            <table class="tag_table">
              <thead>
                <tr class="tag_table__row tag_table__row--header">
                  <th class="tag_table__cell tag_table__cell--header">Tag Name</th>
                  <th class="tag_table__cell tag_table__cell--header">Tagged Elements</th>
                  <th class="tag_table__cell tag_table__cell--header"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="tag_table__row" :class="isRowEdited(tag.id)" v-for="tag in tagList" :key="tag.id">
                  <td class="tag_table__cell">
                    <span class="tag_table__tag-name">{{ tag.name }}</span>
                  </td>
                  <td class="tag_table__cell">{{ tag.elementCount }}</td>
                  <td class="tag_table__cell">
                    <div class="tag_table__buttons">
                      <lb-button :size="1.2" icon="lb-edit" @click="editTag(tag.id)"></lb-button>
                      <lb-button
                          :size="1.2"
                          icon="lb-trash"
                          variant="negative"
                          @click="deleteTag(tag.id)"
                          :disabled="selectedTag == tag.id"></lb-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tags-popup__row" v-if="totalPages !== 1 && selectedTag === null">
          <lb-page-nav :currentPage="currentPage"
                     :totalPages="totalPages"
                     @go="changePage"
                     class="tags-popup__page-nav"></lb-page-nav>
        </div>
        <div class="tags-popup__no-content" v-if="tagList.length == 0">
          <h3 class="tags-popup__no-content-header">No tags in this universe</h3>
          <span>If you want to see tags here, you should add them to universe elements</span>
        </div>
      </div>
      <lb-spinner v-if="tagsLoading"></lb-spinner>
    </div>
  </lb-popup-box>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import LbSearchBar from '@/components/LbSearchBar.vue';
import LbInput from '@/components/LbInput.vue';
import LbPageNav from '@/components/LbPageNav.vue';

export default {
  name: 'TagsPopup',
  components: {
    LbSearchBar,
    LbInput,
    LbPageNav
  },
  data() {
    return {
      tagList: [
        {
          id: 1,
          name: 'Taag',
          elementCount: 12
        },
        {
          id: 2,
          name: 'Some other tag',
          elementCount: 8
        },
        {
          id: 3,
          name: 'Another',
          elementCount: 7
        },
        {
          id: 4,
          name: 'Jeszcze inny tag',
          elementCount: 6
        },
        {
          id: 6,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
        {
          id: 7,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
        {
          id: 8,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
        {
          id: 9,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
        {
          id: 10,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
        {
          id: 11,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
        {
          id: 12,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
        {
          id: 13,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
        {
          id: 14,
          name: 'Wincyj Tagów',
          elementCount: 6
        },
      ],
      tagsLoading: false,
      renameLoading: false,
      searchText: '',
      tagName: '',
      tagNameError: '',
      selectedTag: null,
      currentPage: 1,
      totalPages: 2
    };
  },
  computed: {
    ...mapGetters('popups', ['isTagsPopupOpen']),
    ...mapGetters('universe', ['universeID']),
    tagsLoadingVisibility() {
      return this.tagsLoading ? 'visibility: hidden;': 'visibility: visible';
    },
    disableRenameButton() {
      if (this.tagName.length < 1 || this.tagNameError.length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapMutations('popups', ['closeTagsPopup']),
    ...mapMutations('notifications', ['notify']),
    close() {
      this.closeTagsPopup();
    },
    isRowEdited(id) {
      if (this.selectedTag == id) {
        return 'tag-table__row--edited';
      } else {
        return '';
      }
    },
    editTag(id) {
      if (this.selectedTag == id) {
        this.selectedTag = null;
        this.tagName = '';
      } else {
        this.selectedTag = id;
        this.tagName = this.tagList.find(tag => tag.id == id).name;
      }
    },
    async search(queryText) {
      this.searchText = queryText;
      console.log(this.searchText);
    },
    async changePage(newPageNumber) {
      this.currentPage = newPageNumber;
      await this.search(this.searchText);
    },
    setTagName(newName) {
      this.tagNameError = '';
      this.tagName = newName;
    },
    cancelEdit() {
      this.tagName = '';
      this.tagNameError = '';
      this.selectedTag = null;
    },
    async renameTag() {
      try {
        this.renameLoading = true;
        this.tagList.find(t => t.id == this.selectedTag).name = this.tagName;
        this.selectedTag = null;
        this.tagName = '';
      } catch (erorr) {
        this.notify({ type: 'negative', message: error.message });
      } finally {
        this.renameLoading = false;
      }
    },
    async deleteTag(id) {
      try {
        this.tagList = this.tagList.filter(t => (t.id !== id));
      } catch (erorr) {
        this.notify({ type: 'negative', message: error.message });
      }
    }
  },
}
</script>

<style lang="less">
@import '../common.less';

.tags-popup {
  display: flex;
  flex-direction: column;
  width: 800px;
  position: relative;

  .tags-popup__content {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .tags-popup__row {
    display: flex;
    flex-direction: column;

    .tags-popup__page-nav {
      align-self: center;
      width: auto;
    }

    .tags-popup__edit-form {
      display: flex;
      flex-direction: column;
      gap: 1em;

      .tags-popup__form-buttons {
        display: flex;
        justify-content: space-between;
      }
    }

    .tags-popup__tag_table {
      display: flex;
      flex-direction: column;
      max-height: 60vh;
      overflow-y: auto;

      .tag_table {
        border-spacing: 0;

        .tag_table__row {
          background-color: @element-color;
          padding: 0.5em;

          &--header {
            background-color: @secondary-color;
            font-size: 1.2rem;
          }

          &--edited {
            box-shadow: inset 0px 3px 15px rgba(0, 0, 0, 0.3);
          }

          .tag_table__cell {
            border-bottom: 1px solid @dark-text-color;
            padding: 0.5em;
            font-weight: 600;
            color: @dark-text-color;

            &--header {
              text-align: start;
                color: @light-text-color;
                font-weight: 700;
            }

            .tag_table__buttons {
              display: flex;
              justify-content: flex-end;
              gap: 5px;
            }
          }
        }
      }
    }
  }

  .tags-popup__no-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: @secondary-color;
    padding: 2em 1em;
    border-radius: 1em;
    gap: 0.8em;
    font-size: 1.3rem;

    .tags-popup__no-content-header {
      margin: 0;
      font-size: 1.5rem;
    }
  }
}

</style>