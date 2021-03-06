import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import store from '~/store'
import BackendService from "~/services/backend-service"
import PrintService from "~/services/print-service"
import routes from '~/router'
import RadListView from 'nativescript-ui-listview/vue'
import RadDataForm from 'nativescript-ui-dataform/vue'
import RadChart from 'nativescript-ui-chart/vue'
import App from '~/pages/Login'
import VueI18n from 'vue-i18n'
import messages from '~/lang/messages'
import dateTimeFormats from './lang/dateTimeFormats'
import numberFormats from './lang/numberFormats'
import Pager from 'nativescript-accordion/vue'
import { ModalStack, overrideModalViewMethod, VueWindowedModal } from "nativescript-windowed-modal"
overrideModalViewMethod()
Vue.registerElement("ModalStack", () => ModalStack)
Vue.use(VueWindowedModal)

Vue.use(RadListView)
Vue.use(RadChart)
Vue.use(RadDataForm)
Vue.use(Pager)

Vue.use(Vuex)
Vue.use(VueI18n)

Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown)
const backendService = new BackendService()
Vue.prototype.$backendService = backendService
const printService = new PrintService()
Vue.prototype.$printService = printService
Vue.prototype.$routes = routes

var purchase = require("nativescript-purchase");
global.initPurchase = purchase.init(["10010","10011","10003"])
global.subscriptions = [
  { func: "noAdds", productIdentifyer: "10010"},
  { func: "users03", productIdentifyer: "10011"},
  { func: "users10", productIdentifyer: "10003"}]

const platformModule = require("tns-core-modules/platform")
let locale;
if (platformModule.isAndroid) locale = java.util.Locale.getDefault().getLanguage();
if (platformModule.isIOS) locale = NSLocale.preferredLanguages.firstObject;


// global variables
global.noImage = '~/assets/images/addImage.png'
global.locale = locale

export const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: locale,
  silentTranslationWarn: process.env.NODE_ENV === 'production',
  messages,
  dateTimeFormats,
  numberFormats
})
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

var application = require("tns-core-modules/application");
application.on(application.discardedErrorEvent, function (args) {
  console.log('====discarded error args: ' + JSON.stringify(args.error))
  const error = args.error;
//    console.log("===Received discarded exception: ");
  console.log('===message:' + error.message);
//    console.log('===Stack trace:' + error.stackTrace);
//    console.log('===nativeException:' + error.nativeException);
  let start = error.stackTrace.indexOf("ReferenceError: ") + 16
  if (start == 15) start = error.stackTrace.indexOf("java.lang.Exception: ") + 21
  let end = error.stackTrace.indexOf("\n",start)
  global.exceptionErrorMessage = error.stackTrace.substring(start,end)
  console.log('==discarded ErrorEvent message: ' + global.exceptionErrorMessage)
});

new Vue({
  i18n,
  store,
  render: h => h('frame', [h(App)]) 
}).$start()
