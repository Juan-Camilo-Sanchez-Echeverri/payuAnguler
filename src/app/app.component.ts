import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'payu-angular';

  constructor(private api: ApiService) {}

  buyProduct() {
    this.api.payUBuy('payu-payment').subscribe((arg) => {
      const info = arg.info;

      let paymentString = `
      <html>
      <body>
      <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
      <input name="merchantId"      type="hidden"  value="${info.merchantId}" />
      <input name="accountId"       type="hidden"  value="${info.accountId}" />
      <input name="description"     type="hidden"  value="${info.description}"  />
      <input name="referenceCode"   type="hidden"  value="${info.referenceCode}" />
      <input name="amount"          type="hidden"  value="${info.amount}" />
      <input name="tax"             type="hidden"  value="${info.tax}" />
      <input name="taxReturnBase"   type="hidden"  value="${info.taxReturnBase}" />
      <input name="currency"        type="hidden"  value="${info.currency}" />
      <input name="signature"       type="hidden"  value="${info.signature}" />
      <input name="test"            type="hidden"  value="${info.test}" />
      <input name="buyerEmail"      type="hidden"  value="${info.buyerEmail}" />
      <input name="responseUrl"     type="hidden"  value="${info.responseUrl}" />
      <input name="confirmationUrl" type="hidden"  value="${info.confirmationUrl}" />
      <input name="Submit"          type="submit"  value="Enviar" />
      </form>
      <script type="text/javascript">document.getElementById("payu_form").submit();</script>
      </body>
      </html>`;

      const winUrl = URL.createObjectURL(
        new Blob([paymentString], { type: 'text/html' })
      );

      window.location.href = winUrl;
    });
  }
}
