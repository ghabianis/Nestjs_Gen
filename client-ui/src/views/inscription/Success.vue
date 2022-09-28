<template>
  <div class="success d-flex align-items-center justify-content-center flex-column mw-375px w-100">
    <div class="d-flex img">
      <img src="/svg/inscription/success.svg" />
      <img class="img2" src="/svg/inscription/done.svg" />
    </div>

    <h5 class="w-100 mb-4 mt-8">Successfully subscribed to Retchee platform</h5>
    <p>Merci pour ton inscription, retchee arrive bientôt <br/>
    See you soon . </p>
  </div>
</template>
<script lang="ts">

</script>
<style lang="scss" scoped>
.success {
  height: 100vh;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}
.img {
  position: relative;
}
.img2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
p {
  width: 75%;
  color: #bcbec2;
}
</style>

