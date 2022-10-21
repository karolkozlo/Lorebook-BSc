<template>
    <div class="main-page">
        <div class="main-page__content">
            <div class="main-page__section">
                <h2 class="main-page__section-title">
                    What is Lorebook?
                </h2>
                <div class="util__horizontal-line--black"></div>
                <div class="main-page__section-content">
                    <p class="main-page__paragraph">
                        Lorebook is an application designed to help writers create their own universes for books, movies, games etc.
                        Creating an entire world can be a very difficult task that requires the collection of a lot of different information. Each universe can consist of many different elements belonging to different categories. These elements are often strongly connected with each other (e.g. locations with events or characters). Keeping all this information in plain text files and documents would be very inefficient for larger projects. It would be hard to maintain relationships between items.
                    </p>
                    <p class="main-page__paragraph">
                        Lorebook is an application that will allow users to save all relevant items in a well-organized database. It allows you to create any elements, describe them, put them in appropriate categories and create connections between them. With Lorebook, you can also create your own stories in your universes.
                    </p>
                </div>
            </div>
            <div class="main-page__section">
                <h2 class="main-page__section-title">
                    What features does Lorebook offer?
                </h2>
                <div class="util__horizontal-line--black"></div>
                <div class="main-page__section-content">
                    <ul class="main-page__ulist">
                        <li class="main-page__ulist-item">
                            Create your own universes
                        </li>
                        <li class="main-page__ulist-item">
                            Create characters
                        </li>
                        <li class="main-page__ulist-item">
                            Create locations in hierarchy (city in country, country on a continent... etc.)
                        </li>
                        <li class="main-page__ulist-item">
                            Create events with dates
                        </li>
                        <li class="main-page__ulist-item">
                            Create your own element categories (eg: creatures, religions, items, magic systems)
                        </li>
                        <li class="main-page__ulist-item">
                            Describe elements with texts, lists, links etc. on their pages
                        </li>
                        <li class="main-page__ulist-item">
                            Tagging elements in a universe
                        </li>
                        <li class="main-page__ulist-item">
                            Searching all elements created in universe
                        </li>
                        <li class="main-page__ulist-item">
                            Write your stories with use of rich text editor
                        </li>
                        <li class="main-page__ulist-item">
                            Use links to maintain relations between elements
                        </li>
                    </ul>
                </div>
            </div>
             <div class="main-page__section">
                <h2 class="main-page__section-title">
                    What new features will come in the future?
                </h2>
                <div class="util__horizontal-line--black"></div>
                <div class="main-page__section-content">
                    <ul class="main-page__ulist">
                        <li class="main-page__ulist-item">
                            Interactive maps with layers for locations
                        </li>
                        <li class="main-page__ulist-item">
                            Images in content of universe elements
                        </li>
                        <li class="main-page__ulist-item">
                            Character relations page (relations will be displayed as lists and graphs)
                        </li>
                        <li class="main-page__ulist-item">
                            Timelines for events
                        </li>
                        <li class="main-page__ulist-item">
                            Information about all links connected to a specific universe element
                        </li>
                        <li class="main-page__ulist-item">
                            Tree view for hierarchy of locations
                        </li>
                        <li class="main-page__ulist-item">
                            Support for other languages
                        </li>
                        <li class="main-page__ulist-item">
                            Upgrade for rich text editor
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main-page__section">
                <h2 class="main-page__section-title">
                    Instructions
                </h2>
                <div class="util__horizontal-line--black"></div>
                <div class="main-page__section-content main-page__section-content--instructions">
                    <lb-accordion title="How to create universe?">
                        <div class="answer">
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Log In to your account
                                </li>
                                <li class="answer__olist-item">
                                    Go to user page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Create New Universe" button
                                </li>
                                <li class="answer__olist-item">
                                    Enter title to input (description is optional)
                                </li>
                                <li class="answer__olist-item">
                                    Click "Create" button
                                </li>
                                <li class="answer__olist-item">
                                    You should see newly created universe on list of Your Universes on User Page
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>

                    <lb-accordion title="How to edit titles and descriptions of universe, stories, chapters and universe elements?">
                        <div class="answer">
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Move your cursor over the title or description
                                </li>
                                <li class="answer__olist-item">
                                    If you see this half-transparent, blurred background, it means, that this text is editable.
                                    <img src="../assets/screenshots/edit-universe-title-1.jpg">
                                </li>
                                <li class="answer__olist-item">
                                    <strong>Double Click on this text.</strong> You will enter in edit mode for this text. You can change the text.
                                    <img src="../assets/screenshots/edit-universe-title-2.jpg">
                                </li>
                                <li class="answer__olist-item">
                                    If you want to save the text, click on green button or use Ctrl+S shortcut.
                                </li>
                                <li class="answer__olist-item">
                                    If you want to cancel changes, click on red button.
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>

                    <lb-accordion title="How to create and manage new categories?">
                        <div class="answer">
                            <h4 class="answer__subtitle">
                                Creating new category
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the universe page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Manage Categories" button on top navigation
                                </li>
                                <li class="answer__olist-item">
                                    Enter the name into input (Name should be unique to the universe)
                                </li>
                                <li class="answer__olist-item">
                                    Click "Add new category" button. Now you should be able to use new category
                                </li>
                            </ol>
                            <h4 class="answer__subtitle">
                                Changing category name
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the universe page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Manage Categories" button on top navigation
                                </li>
                                <li class="answer__olist-item">
                                    Click edit button next to category name. You will enter in edit mode for this category.
                                </li>
                                <li class="answer__olist-item">
                                    Change text in "Name" field, then click "Rename" button
                                </li>
                            </ol>
                            <h4 class="answer__subtitle">
                                Deleting category
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the universe page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Manage Categories" button on top navigation
                                </li>
                                <li class="answer__olist-item">
                                    Click red remove button next to category name, then confirm action.
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>

                    <lb-accordion title="How to create new elements?">
                        <div class="answer">
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the universe page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Create Element" button on top navigation
                                </li>
                                <li class="answer__olist-item">
                                    Enter title for new element (description is optional)
                                </li>
                                <li class="answer__olist-item">
                                    Select type (category) of new element
                                    <ul class="answer__sublist">
                                        <li class="answer__sublist-item">
                                            If type is "Locations", you can choose parent location.
                                        </li>
                                        <li class="answer__sublist-item">
                                            If type is "Events", you should set date.
                                        </li>
                                    </ul>
                                </li>
                                <li class="answer__olist-item">
                                    Click "Create Element" button
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>

                    <lb-accordion title="How to manage content items of Universe Elements?">
                        <div class="answer">
                            <h4 class="answer__subtitle">
                                How to create new content element
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the Universe Element Page
                                </li>
                                <li class="answer__olist-item">
                                    <div class="answer__olist-item-content">
                                        <span>Click button for adding new content elements</span>
                                        <img src="../assets/screenshots/manage-content-element-1.jpg">
                                    </div>
                                </li>
                                <li class="answer__olist-item">
                                    Click on type of content element you want to create
                                </li>
                            </ol>
                            <h4 class="answer__subtitle">
                                How to move content element
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the Universe Element Page
                                </li>
                                <li class="answer__olist-item">
                                    <div class="answer__olist-item-content">
                                        <span>Move cursor over the content element. You will see new buttons on the right</span>
                                        <img src="../assets/screenshots/manage-content-element-2.jpg">
                                    </div>
                                </li>
                                <li class="answer__olist-item">
                                    Click on available chosen button
                                </li>
                            </ol>
                            <h4 class="answer__subtitle">
                                How to delete content element
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Move cursor over the content element
                                </li>
                                <li class="answer__olist-item">
                                    Click on red delete button with trash icon
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>

                    <lb-accordion title="How to search universe elements?">
                        <div class="answer">
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the universe page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Search" button in top navigation
                                </li>
                                <li class="answer__olist-item">
                                    Write text to search bar (optional)
                                </li>
                                <li class="answer__olist-item">
                                    Choose one or more categories in select (optional)
                                </li>
                                 <li class="answer__olist-item">
                                    Add some tags (optional)
                                </li>
                                <li class="answer__olist-item">
                                    <div class="answer__olist-item-content">
                                        <span>Click search button with magnifier icon (next to search bar)</span>
                                        <img src="../assets/screenshots/search-elements-1.jpg">
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>

                    <lb-accordion title="How to create links to universe elements?">
                        <div class="answer">
                            <h4 class="answer__subtitle">
                                Create link in content of universe element
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the universe element page
                                </li>
                                <li class="answer__olist-item">
                                    Create "Link Group" in content, if you don't have one
                                </li>
                                <li class="answer__olist-item">
                                    Click "Add new link" button in link group. It will open popup
                                </li>
                                <li class="answer__olist-item">
                                    Follow next steps in "How to use popup to create link?"
                                </li>
                            </ol>
                            <h4 class="answer__subtitle">
                                Create link in story chapter
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Enter the chapter page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Add new link" button on left side panel. It will open popup.
                                </li>
                                <li class="answer__olist-item">
                                    Follow next steps in "How to use popup to create link?"
                                </li>
                            </ol>
                            <h4 class="answer__subtitle">
                                How to use popup to create link?
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Select type (category) of the element to be linked
                                </li>
                                <li class="answer__olist-item">
                                    You will see search bar and list of elements belonging to selected category
                                </li>
                                <li class="answer__olist-item">
                                    Click on list item to select it.
                                </li>
                                <li class="answer__olist-item">
                                    Write description (optional)
                                </li>
                                <li class="answer__olist-item">
                                    Click "Create link" button
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>

                    <lb-accordion title="How to manage tags in universe?">
                        <div class="answer">
                            <h4 class="answer__subtitle">
                                Adding new tags
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Go to universe element page
                                </li>
                                <li class="answer__olist-item">
                                    You can see tag section in left side panel. Enter text to bottom input, next to green plus button
                                </li>
                                <li class="answer__olist-item">
                                    Click green plus button to add tag
                                </li>
                            </ol>
                            <h4 class="answer__subtitle">
                                Managing used tags in universe
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Go to universe page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Tags" button in top navigation. It will open popup
                                </li>
                                <li class="answer__olist-item">
                                    You can see list of all tags used in Universe. You can search them with use of search bar.
                                </li>
                                <li class="answer__olist-item">
                                    If you want to delete existing tag, click red button with trash icon next to tag name
                                </li>
                                <li class="answer__olist-item">
                                    If you want to edit extisting tag, click blue edit button. You will enter edit mode.
                                </li>
                                <li class="answer__olist-item">
                                    Change name in the input, then click "Rename Tag" button
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>

                    <lb-accordion title="How to create stories and chapters?">
                        <div class="answer">
                            <h4 class="answer__subtitle">
                                Create Story
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Go to universe main page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Stories" button (next to "Elements" button)
                                </li>
                                <li class="answer__olist-item">
                                    Click "Create new Story" button. It will open popup for you
                                </li>
                                <li class="answer__olist-item">
                                    Enter the title and descripton, then click "Create" button
                                </li>
                                <li class="answer__olist-item">
                                    Popup will close. You will see your story in the list. Click on name to enter the story page
                                </li>
                            </ol>
                            <h4 class="answer__subtitle">
                                Create Chapter
                            </h4>
                            <ol class="answer__olist">
                                <li class="answer__olist-item">
                                    Go to story page
                                </li>
                                <li class="answer__olist-item">
                                    Click "Create new Chapter" button. It will open popup for you
                                </li>
                                <li class="answer__olist-item">
                                    Enter the title and descripton, then click "Create" button
                                </li>
                                <li class="answer__olist-item">
                                    Popup will close. You will see your chapter in the list. Click on name to enter the story page.
                                    You can change order of chapter with arrow buttons.
                                </li>
                            </ol>
                        </div>
                    </lb-accordion>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LbAccordion from '../components/LbAccordion.vue';

export default {
  name: "MainPage",
  components: {
    LbAccordion
  },
};
</script>

<style lang="less">
@import '../common.less';

.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0em;

  .main-page__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    gap: 1em;
    padding-bottom: 30vh;

    .main-page__section {
      display: flex;
      flex-direction: column;
      width: 100%;
      font-size: 1.2rem;

      .main-page__section-title {
        margin: 0;
        font-size: 1.6rem;
      }

      .main-page__section-content {
        display: flex;
        width: 100%;
        flex-direction: column;
        padding: 0.5em 0.2em 0.2em 0.2em;

        &--instructions {
            gap: 0.5em;
        }

        .main-page__paragraph {
          margin: 0;
          margin-block-end: 0.5em;
        }

        .main-page__ulist {
            margin: 0;
            padding: 0px 0px 0px 30px;
        }
      }

      .answer {
        display: flex;
        flex-direction: column;

        .answer__olist {
            margin: 0;
            padding: 0.3em 0px 0.3em 30px;

            .answer__olist-item {
                .answer__olist-item-content {
                    display: flex;
                    flex-direction: column;

                    img {
                        width: fit-content;
                        border: 1px solid black;
                    }
                }
            }
        }

        .answer__subtitle {
            margin: 0;
        }
      }
    }
  }
}
</style>