<template>
  <div style="background: black; padding: 2px;">
    <div id="placeholder" style="height: 700px;"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const config = {
      height: '700',
      document: {
        fileType: "docx",
        key: "Khirz6zTPdfd7",
        title: "Example Document Title.docx",
        url:
          "https://example-files.online-convert.com/document/docx/example.docx"
      },
      documentType: "text",
      editorConfig: {
        // "callbackUrl": "https://example.com/url-to-callback.ashx"
      }
    };

    const docEditor = new DocsAPI.DocEditor("placeholder", config);
  }
};
</script>
