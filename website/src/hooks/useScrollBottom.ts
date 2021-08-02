import { onMounted, onUnmounted, ref } from 'vue';
import { debounce } from 'lodash';

const useScrollBottom = (callback: Function) => {
  const isScroll2BottomRef = ref(false);
  const muteRef = ref(false);

  const handleScroll = async () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    // 数据拉取时，暂时禁止设置 isScroll2BottomRef
    if (muteRef.value) {
      return;
    }

    if (windowHeight + scrollTop + 20 >= scrollHeight) {
      isScroll2BottomRef.value = true;
      muteRef.value = true;

      await callback();

      muteRef.value = false;
      isScroll2BottomRef.value = false;
    } else {
      isScroll2BottomRef.value = false;
    }
  };

  const debouncedScroll = debounce(handleScroll, 300);

  onMounted(() => {
    window.addEventListener('scroll', debouncedScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', debouncedScroll);
  });

  return { isScroll2BottomRef, muteRef };
};

export default useScrollBottom;
