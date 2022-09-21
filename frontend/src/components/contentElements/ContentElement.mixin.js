const LbContentElementMixin = {
  emits: ['moveElement', 'deleteElement'],
  props: {
    id: {
      type: Number,
      required: true
    },
    contentID: {
      type: Number,
      required: true
    },
    position: {
        type: Number,
        required: true,
    },
    isLast: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: 'Title'
    },
    buttonsLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    moveContentElement(newPosition) {
        this.$emit('moveElement', { oldPosition: this.position, newPosition });
    },
    /*changeTitle(newTitle) {
        this.$emit('changeTitle', newTitle);
    },*/
  }
};

export default LbContentElementMixin;