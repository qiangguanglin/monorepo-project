import { ComponentPublicInstance } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: {
      info: (message: string) => void;
    };
  }
}