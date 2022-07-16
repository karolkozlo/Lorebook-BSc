<template>
    <div class="lb-page-nav">
        <lb-button icon="lb-left"
                    :size="1.4"
                    :disabled="prevButtonState"
                    @click="this.$emit('go', this.currentPage-1)">
        </lb-button>
        <div class="lb-page-nav__pages">
            <input class="lb-page-nav__input" type="number" :min="1" :max="totalPages" v-model="pageNumber" @keydown="submitOnKey">
            <span>of</span>
            <span class="lb-page-nav__total-pages">{{ totalPages }}</span>
        </div>
        <lb-button icon="lb-right"
                    :size="1.4"
                    :disabled="nextButtonState"
                    @click="this.$emit('go', this.currentPage+1)">
        </lb-button>
        <lb-button :size="1.1" @click="submitPageNumber" class="lb-page-nav__go-button">
            Go
        </lb-button>
    </div>
</template>

<script>
export default {
    name: 'LbPageNav',
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    emits: ['go'],
    data() {
        return {
            pageNumber: this.currentPage
        };
    },
    computed: {
        prevButtonState() {
            if(this.currentPage-1 < 1) {
                return true;
            }
            return false;
        },
        nextButtonState() {
             if(this.currentPage+1 > this.totalPages) {
                return true;
            }
            return false;
        }
    },
    methods: {
        submitPageNumber() {
            if(this.pageNumber < 1) {
                this.$emit('go', 1);
            } else if(this.pageNumber > this.totalPages) {
                this.$emit('go', this.totalPages);
            } else {
                this.$emit('go', this.pageNumber);
            }
        },
        submitOnKey(event) {
             event.preventDefault();
            if (event.keyCode === 13) {
                this.submitPageNumber();
            }
        }
    },
    watch: {
        currentPage(value) {
            this.pageNumber = value;
        }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-page-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 1em;
    background-color: @secondary-color;
    border-radius: 20px;
    width: min-content;
    height: min-content;

    .lb-page-nav__pages {
        display: flex;
        color: @light-text-color;
        padding: 0em 1em;

        .lb-page-nav__input {
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            border: none;
            border-radius: 15px;
            box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.2);
            -moz-appearance: textfield;

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            &:focus {
                box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.2);
                outline: none;
            }
        }

        .lb-page-nav__total-pages {
            font-weight: 700;
            margin: 0px 0px;
        }

        span {
            font-family: 'Roboto';
            margin: 0px 5px;
        }
    }

    .lb-page-nav__go-button {
        margin-left: 0.3em;
    }
}

</style>