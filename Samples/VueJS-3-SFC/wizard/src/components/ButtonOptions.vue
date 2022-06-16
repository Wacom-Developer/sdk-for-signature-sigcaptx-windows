/*********************************************************************
  ButtonOptions.vue

  This file contains the VUE template for the 3 radio buttons which allow
  the user to choose what form the buttons on the wizard screens will have

  Copyright 2022 Wacom Ltd.

  v1.0

*********************************************************************/
<script>
export default
{
  data ()
  {
    return {
      standard: true,
      utf8: false,
      remote: false
    };
  }
};
</script>

<template>
 Button options:
    <p style="margin-left: 20px">
      <input type="radio" name="buttontype" id="standard" value="standard" checked="checked" v-model="standard"/>Use standard buttons<br />
      <input type="radio" name="buttontype" id="utf8" value="utf8" v-model="utf8"/>Display UTF-8 text (e.g. for languages using logograms)<br />
      <input type="radio" name="buttontype" id="remote" value="remote" v-model="remote"/>Use remote (URL) images
      <br />
    </p>
</template>
