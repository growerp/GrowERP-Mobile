<template>
  <Page>
    <ActionBar><NavigationButton visibility="collapsed"/>
      <myActionBar :onHeaderTap="onHeaderTapHome" :back="true"
          
          :header="this.$t('table') + this.orderHeader.description + '-' +
             ' ' + this.orderHeader.spotNumber"
          :text="$t('totalAmount') + ': ' + getOrderTotal" />
    </ActionBar>
    <StackLayout>
      <GridLayout rows="*,auto">
        <RadListView ref="listView" for="item in orderItems"
              row="0" colSpan="3"
              @itemTap="onItemDeleteTap" height="80%"
              :visibility="orderItems.length? 'visible':'collapse'">
          <v-template>
            <GridLayout columns="50, *, auto, auto, auto" rows="*" class="item">
              <Image :src="item.image"  col="0" class="thumbnail" height="30"/>
              <label :text="item.name" class="h2"
                  col="1" paddingLeft="10"/>
              <label :text="item.quantity" class="h3" col="2"
                  paddingRight="10"/>
              <label :text="item.price" class="h3" col="3"
                  paddingRight="10"/>
              <label :text="Number(item.price) * Number(item.quantity)"
                  class="h3" col="4" paddingRight="10"/>
            </GridLayout>
          </v-template>
        </RadListView>
        <GridLayout columns="*" rows="*" height="80%" row="0" colSpan="3"
            :visibility="orderItems.length? 'collapse':'visible'">
          <Label class="message" col="0" row="0" padding="20"
              :text="$t('noItemsOnOrderAddSome')"/>
        </GridLayout>
        <GridLayout columns="*,*" rows="auto" row="1" colSpan="3">
          <Button :text="$t('cancel')" 
            @tap="$navigateTo($routes.Home)" col="0"/>
          <Button :text="$t('saveOrder')" 
              @tap="saveOrder" col="1"
              :visibility="orderItems.length? 'visible':'hidden'"/>
          <Button :text="$t('goBack')" 
              @tap="$navigateBack" col="1"
              :visibility="orderItems.length? 'hidden':'visible'"/>
        </GridLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>

import general from '~/mixins/general'
export default {
  name: 'OrderItems',
  props: {
    orderHeader: {},
    orderItems: ''
  },
  mixins: [ general ],
  computed: {
    getOrderTotal: function () {
      let items = this.orderItems.length; let quantities = 0; let totalPrice = 0.00
      for (let i = 0; i < items; i++) {
          quantities += this.orderItems[i].quantity
          totalPrice += (this.orderItems[i].quantity * this.orderItems[i].price)}
      return(totalPrice.toFixed(2))
    }
  },
  methods: {
    saveOrder() {
      this.$store.dispatch('createSalesOrder', {
          header: this.orderHeader,
          items: this.orderItems })
      .then( result => {
        console.log("==============Return from backend")
        console.log("result from printer: " + result.printer)
        if (this.orderHeader.orderId) {
          this.note(this.$t('orderUpdated') + result.data.orderId + ' ' +
          this.orderHeader.description + '-' + this.orderHeader.spotNumber,
            this.$t('appearPrepArea'))
        } else {
          this.note(this.$t('orderReceived') + result.data.orderId + ' ' +
          this.orderHeader.description + '-' + this.orderHeader.spotNumber,
              this.$t('appearPrepArea'))
        }

      })
      this.$navigateTo(this.$routes.Home, {
        props: { accommodationAreaId: this.orderHeader.accommodationAreaId}})
    },
    onItemDeleteTap(args) {
      this.orderItems.splice(args.index,1)
    },
  }
}
</script>

<style lang="css">

</style>
