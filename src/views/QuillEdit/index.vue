<template>
  <div class="three">
  <!--
    <quill-editor
      :options="editorOption"
    ></quill-editor>
     -->
  </div>
</template>

<script>
// import { quillEditor } from "vue-quill-editor"; //调用编辑器
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';
// import Quill from 'quill'
// import imageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', imageResize)
// export default {
//   components: { quillEditor },
//   data() {
//     return {
//         editorOption:{
//             modules:{
//                 toolbar: {
//                     container: [[{ header: 1 }, { header: 2 }], // custom button values
//             [{ list: 'ordered' }, { list: 'bullet' }],
//             [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
//             [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
//             [{ direction: 'rtl' }], // text direction
//             [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
//             [{ header: [1, 2, 3, 4, 5, 6, false] }],
//                         ['link', 'image']
//                     ]
//                 },
//                 imageResize: {
//                     displayStyles: {
//                     backgroundColor: 'black',
//                     border: 'none',
//                     color: 'white'
//                     },
//                     modules: ['Resize', 'DisplaySize', 'Toolbar']
//                 }
//             }
//         }
//     }
//   }
// }
</script>

<style scoped>
  .three{
     width: 100vh;
    height: 100vh;
    overflow: hidden;
  }
</style>
