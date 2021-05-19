<template>
  <section class="publish-panel">
    <div class="share-btn" @click="openNewPublishCard">Hi, {{ userName }}! What do you want to share?</div>

    <van-overlay :show="showPublishCardRef">
      <div class="submit-post-wrapper">
        <div class="choose-type-card" v-show="isChooseType">
          <img class="close-icon" src="http://lxy520.top/images/icon-close.png" @click="showPublishCardRef = false" />
          <div class="card-title">Choose Type to Publish</div>
          <div class="type-wrapper">
            <div class="type-item" v-for="item in postTypeList" :key="item.id" @click="goToEditStep(item)">
              <img class="type-icon" :src="item.typeIcon" />
              <div class="right">
                <div class="title">{{ item.typeName }}</div>
                <div class="desc">{{ item.typeDetail }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="edit-text-card" v-show="isEditText">
          <img class="close-icon" src="http://lxy520.top/images/icon-close.png" @click="showPublishCardRef = false" />
          <div class="card-title">Publish Post > {{ currentTypeRef && currentTypeRef.typeName }}</div>
          <textarea class="textarea" placeholder="Write something to record..." v-model="postInputRef" />
          <van-uploader
            class="img-upload"
            v-model="uploadImgListRef"
            multiple
            :before-read="beforeRead"
            :after-read="afterRead"
            :max-count="9"
            v-show="showImgUploaderRef"
          ></van-uploader>
          <div class="add-image" @click="showImgUploaderRef = true"></div>
          <div class="submit-btn" @click="submitPublishPost">Publish</div>
        </div>
      </div>
    </van-overlay>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, Ref, watch } from 'vue';
import { Toast } from 'vant';
import { sleep } from '@/utils';
import { useUserInfo } from '@/context';
import { postCreatePostApi, putUploadPostImageApi } from '@/constants';
import { useAxios } from '@/hooks';
import { getCompressedImageFile } from '@/utils';
import { PostTypeItem } from '@/views/post/Post.page.vue';

enum PublishStep {
  chooseType = 1,
  editText = 2,
}

export default defineComponent({
  name: 'PublishPanel',
  props: {
    postTypeList: {
      type: Array as PropType<PostTypeItem[]>,
      required: true,
    },
  },
  emits: ['handleAfterPublish'],
  setup(props, context) {
    const { userName } = useUserInfo();
    const axios = useAxios();

    const currentTypeRef: Ref<PostTypeItem | null> = ref(null);
    const postInputRef = ref('');
    const showPublishCardRef = ref(false);
    const publishStepRef = ref(PublishStep.chooseType);
    const isChooseType = computed(() => publishStepRef.value === PublishStep.chooseType);
    const isEditText = computed(() => publishStepRef.value === PublishStep.editText);

    const openNewPublishCard = () => {
      publishStepRef.value = PublishStep.chooseType;
      showPublishCardRef.value = true;
    };

    const goToEditStep = (postType: PostTypeItem) => {
      currentTypeRef.value = postType;
      publishStepRef.value = PublishStep.editText;
    };

    const showImgUploaderRef = ref(false);
    const uploadImgListRef = ref<{ url: string }[]>([]);

    watch(showPublishCardRef, (newValue: boolean) => {
      if (!newValue) {
        showImgUploaderRef.value = false;
        uploadImgListRef.value = [];
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const beforeRead = async (file: File | File[]): Promise<File[]> => {
      if (!Array.isArray(file)) {
        file = [file];
      }

      const compressedFileList: File[] = [];
      for (const item of file) {
        const compressedFile = await getCompressedImageFile(item, { minCompressedSize: 100 });
        compressedFileList.push(compressedFile);
      }

      return new Promise(resolve => {
        resolve(compressedFileList);
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const afterRead = async (file: any, detail: any) => {
      if (!Array.isArray(file)) {
        file = [file];
      }

      const fileNameList: string[] = [];
      for (const item of file) {
        const formData = new FormData();
        formData.append('file', item.file);
        const res = await axios.request({
          ...putUploadPostImageApi,
          data: formData,
          timeout: 30000,
        });
        fileNameList.push(res.data.filename);
      }

      uploadImgListRef.value.splice(
        detail.index,
        file.length,
        ...fileNameList.map(filename => ({ url: `http://lxy520.top/images/post/${filename}` })),
      );
    };

    const submitPublishPost = async () => {
      await axios.request({
        ...postCreatePostApi,
        data: {
          typeId: currentTypeRef.value?.id,
          content: postInputRef.value,
          imgList: uploadImgListRef.value.map(x => x.url),
        },
      });

      postInputRef.value = '';
      showPublishCardRef.value = false;

      Toast({
        type: 'success',
        message: 'Publish successfully',
        duration: 500,
        className: 'my-toast',
      });

      await sleep(800);

      context.emit('handleAfterPublish');
    };

    return {
      userName,
      showPublishCardRef,
      publishStepRef,
      isChooseType,
      isEditText,
      goToEditStep,
      openNewPublishCard,
      currentTypeRef,
      postInputRef,
      submitPublishPost,
      uploadImgListRef,
      beforeRead,
      afterRead,
      showImgUploaderRef,
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
        border-radius: call($fn, 10);
        background-color: #fff;
        position: relative;

        .close-icon {
          position: absolute;
          right: call($fn, 10);
          top: call($fn, 10);
          width: call($fn, 25);
          height: call($fn, 25);
        }

        .card-title {
          height: call($fn, 45);
          line-height: call($fn, 45);
          font-size: call($fn, 16);
          text-align: center;
          font-weight: bold;
          color: $textColor;
          border-bottom: call($fn, 1) solid #e1e1e2;
        }

        .type-wrapper {
          margin-top: call($fn, 20);
          padding: 0 call($fn, 20);

          .type-item {
            display: flex;
            margin-bottom: call($fn, 15);

            .type-icon {
              flex: 0 0 call($fn, 30);
              width: call($fn, 30);
              height: call($fn, 30);
            }

            .right {
              margin-left: call($fn, 20);

              .title {
                font-size: call($fn, 14);
                color: $textColor;
                margin-bottom: call($fn, 2);
                font-weight: bold;
              }

              .desc {
                font-size: call($fn, 12);
              }
            }
          }
        }
      }

      .edit-text-card {
        width: 80%;
        border-radius: call($fn, 10);
        background-color: #fff;
        position: relative;
        padding-bottom: call($fn, 40);

        .close-icon {
          position: absolute;
          right: call($fn, 10);
          top: call($fn, 10);
          width: call($fn, 25);
          height: call($fn, 25);
        }

        .card-title {
          height: call($fn, 45);
          line-height: call($fn, 45);
          font-size: call($fn, 16);
          text-align: center;
          font-weight: bold;
          color: $textColor;
          border-bottom: call($fn, 1) solid #e1e1e2;
        }

        .textarea {
          width: 100%;
          border: none;
          outline: none;
          margin-top: call($fn, 10);
          padding: 0 call($fn, 10);
          height: call($fn, 250);

          &::placeholder {
            font-size: call($fn, 14);
            color: $lightTextColor;
            opacity: 0.5;
          }
        }

        &::v-deep(.van-uploader) {
          width: 100%;
          padding: 0 call($fn, 10);

          .van-uploader__preview {
            margin: 0 call($fn, 8) call($fn, 8) 0;
            width: call($fn, 88);
            height: call($fn, 88);

            &:nth-child(3n) {
              margin: 0 0 call($fn, 8) 0;
            }

            .van-uploader__preview-image {
              width: call($fn, 88);
              height: call($fn, 88);
              border-radius: call($fn, 3);
            }
          }

          .van-uploader__upload {
            margin: 0 call($fn, 8) call($fn, 8) 0;
            width: call($fn, 88);
            height: call($fn, 88);
            border-radius: call($fn, 3);

            &:nth-child(3n) {
              margin: 0 0 call($fn, 8) 0;
            }
          }
        }

        .add-image {
          background-image: url('http://lxy520.top/images/icon-add-image.png');
          background-size: 100% 100%;
          height: call($fn, 20);
          width: call($fn, 20);
          position: absolute;
          left: call($fn, 10);
          bottom: call($fn, 15);
        }

        .submit-btn {
          position: absolute;
          bottom: call($fn, 10);
          right: call($fn, 10);
          width: fit-content;
          height: call($fn, 30);
          padding: 0 call($fn, 15);
          background-color: $primaryColor;
          border-radius: call($fn, 6);
          font-size: call($fn, 14);
          line-height: call($fn, 30);
          color: #fff;
        }
      }
    }
  }
}

@include mediaMixin;
</style>
