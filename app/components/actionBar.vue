<template>
  <GridLayout width="100%" columns="auto, 10, *, 10, auto, 10" rows="auto">
    <Image src="~/assets/images/go-back-arrow.png" height="25"
        @tap="$navigateBack" col="0" :visibility="back?'visible':'hidden'"/>
    <StackLayout orientation="horizontal" @tap="onHeaderTap" 
        horizontalAlignment="center" col="2">
      <Image src="~/assets/images/go-up-arrow.png" height="25" width="35" 
          :visibility="onHeaderTap?'visible':'hidden'"/>
      <Label class="h2" :text="$t(header)"
          :visibility="header? 'visible': 'hidden'"/>
      <Label class="h2" :text="headerNoI18n"
          :visibility="headerNoI18n? 'visible': 'hidden'"/>
    </StackLayout>
    <Image src="~/assets/images/plus.png" height="25" @tap="onActionTap" 
      col="4" :visibility="plus? 'visible': 'hidden'"/>
    <Image src="~/assets/images/save.png" height="25" @tap="onActionTap" 
      col="4" :visibility="save? 'visible': 'hidden'"/>
    <Image src="~/assets/images/reload.png" height="25" @tap="onActionTap" 
      col="4" :visibility="reload? 'visible': 'hidden'"/>
    <Label :text="text" col=4 class="h2"
        :visibility="text? 'visible': 'hidden'"/>
  </GridLayout>
</template>

<script>
  export default {
    name: 'myActionBar',
    props: {
      back: {type: Boolean, default: false},
      onHeaderTap: {type: Function, default: function(){}},
      onActionTap: {type: Function, default: function(){}},
      save: {type: Boolean, default: false},
      plus: {type: Boolean, default: false},
      reload: {type: Boolean, default: false},
      header: String,
      headerNoI18n: String,
      text: String, // topright corner
    },
}
</script>
