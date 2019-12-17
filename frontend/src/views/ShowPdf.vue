<template>
  <div>
    <p>
      <!-- <a href="http://localhost:3000/download-pdf" download="file.pdf">Download PDF</!-->
    </p>
    <p>
      <!-- <a href="http://localhost:3000/preview-pdf">Preview PDF</a> -->
    </p>

    <div>
      <h3>Image</h3>
      <input type="file" @change="previewPdf" />
      <object :data="blob" type="image/jpeg"></object>
    </div>

    <div>
      <h3>PDF</h3>
      <input type="file" @change="imagePreview" />
      <div>
        <object :data="image"  style="width: 100%; height: 700px;"></object>
      </div>
    </div>

    <!-- <embed src="http://localhost:3000/preview-pdf" width="600" height="500" alt="pdf"> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    blob: null,
    image: null
  }),

  methods: {
    imagePreview(event) {
      const file = event.target.files[0];
      this.image = URL.createObjectURL(file);
    },

    previewPdf(event) {
      const file = event.target.files[0];
      this.blob = URL.createObjectURL(file);
    }
  }
};
</script>
