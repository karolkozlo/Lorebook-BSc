<template>
<div class="lb-small-error" v-if="haveText">
    <div class="lb-small-error__container">
        <div class="lb-small-error__icon">
            <icon icon="lb-warning-circle-fill" :size="this.size"/>
        </div>
        <div class="lb-small-error__wrap-text" :style="`left: ${size}rem; min-width: ${size*10}rem;`">
            <div class="lb-small-error__content" :style="`font-size: ${size*0.5}rem;`">
                {{ text }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "LbSmallError",
  props: {
      size: {
          type: Number,
          default: 1
      },
      text:{
          type: String,
          default: '',
      }
  },
  computed: {
      haveText(){
        return this.text != '';
      }
  },
}
</script>

<style lang="less">
@import '../common.less';

.lb-small-error{
    .lb-small-error__container{
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;

        .lb-small-error__icon{
            color: @negative-color;
            order: 1;
        }
        .lb-small-error__icon:hover ~ .lb-small-error__wrap-text .lb-small-error__content{
                    display: flex;
        }

        .lb-small-error__wrap-text{
            position:absolute;
            order:3;

            .lb-small-error__content{
                border-radius: 1em;
                padding: 0.35em;
                color: @light-text-color;
                background-color: @negative-color;
                order: 2;
                flex-basis: auto;
                align-content: center;
                width: fit-content;
                display: none;
            }
        }
    }
}

</style>
