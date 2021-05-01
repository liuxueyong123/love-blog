<template>
  <section class="publish-panel">
    <div class="share-btn" @click="openNewPublishCard">Hi, {{ userName }}! What do you want to share?</div>

    <van-overlay :show="showPublishCardRef">
      <div class="submit-post-wrapper">
        <div class="choose-type-card" v-show="isChooseType">
          <div>isChooseType</div>
          <button @click="goToEditStep">goToEditStep</button>
        </div>
        <div class="edit-text-card" v-show="isEditText" @click="setShowPublishCard(false)">
          <div>isEditText</div>
        </div>
      </div>
    </van-overlay>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useUserInfo } from '@/context';

enum PublishStep {
  chooseType = 1,
  editText = 2,
}

export default defineComponent({
  name: 'PublishPanel',
  setup() {
    const { userName } = useUserInfo();

    const showPublishCardRef = ref(false);
    const publishStepRef = ref(PublishStep.chooseType);
    const isChooseType = computed(() => publishStepRef.value === PublishStep.chooseType);
    const isEditText = computed(() => publishStepRef.value === PublishStep.editText);

    const setShowPublishCard = (show: boolean) => {
      showPublishCardRef.value = show;
    };

    const goToEditStep = () => {
      publishStepRef.value = PublishStep.editText;
    };

    const openNewPublishCard = () => {
      publishStepRef.value = PublishStep.chooseType;
      showPublishCardRef.value = true;
    };

    return {
      userName,
      showPublishCardRef,
      publishStepRef,
      isChooseType,
      isEditText,
      setShowPublishCard,
      goToEditStep,
      openNewPublishCard,
    };
  },
});
</script>
<style scoped lang="scss">
@mixin mobile($fn, $padding) {
  .publish-panel {
    .share-btn {
      margin-top: call($fn, 15);
      width: 100%;
      height: call($fn, 40);
      background: rgba(255, 255, 255, 0.7);
      border-radius: call($fn, 15);
      border: 1px solid #e1e1e2;
      box-shadow: 0 1px 2px #e1e1e2;
      text-align: center;
      line-height: call($fn, 40);
      font-size: call($fn, 14);
      font-weight: 500;
    }

    .submit-post-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .choose-type-card {
        width: 80%;
        height: 80%;
        border-radius: call($fn, 10);
        background-color: #fff;
      }

      .edit-text-card {
        width: 80%;
        height: 50%;
        border-radius: call($fn, 10);
        background-color: #fff;
      }
    }
  }
}

@include mediaMixin;
</style>
