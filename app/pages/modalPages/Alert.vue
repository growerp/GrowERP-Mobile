<template>
  <page backgroundColor="#A0000000"><ModalStack dismissEnabled="true" class="modal-container">
    <StackLayout backgroundColor="white" width="70%" padding="20">
      <label :text="message" class="h3" horizontalAlignment="center"
            padding="20" color="green" textWrap="true"/>
      <Button :text="$t('ok')" @tap="$modal.close()"
            width="50%" horizontalAlignment="center"/>
    </StackLayout></ModalStack>
  </page>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    message: String
  },
}

</script>

<style>
</style>
