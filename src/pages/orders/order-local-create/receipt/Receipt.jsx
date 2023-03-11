/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unstable-nested-components */
import "./receipt.css";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import MDButton from "components/MDButton";
import { useSelector } from "react-redux";
import { formatPrice } from "utils/formaPrice";
import { dateToLocalDate } from "utils/dateFormat";
import Barcode from "react-barcode";

function Receipt() {
  let componentRef = useRef();
  const cart = useSelector((store) => store.cart);
  return (
    <div>
      {/* button to trigger printing of target component */}
      <ReactToPrint
        trigger={() => (
          <MDButton
            variant="outlined"
            color="info"
            sx={{
              mt: 1,
              width: "100%",
            }}
          >
            Imprimir ticket
          </MDButton>
        )}
        content={() => componentRef}
      />

      {/* component to be printed */}
      <div style={{ display: "none" }}>
        <Ticket
          ref={(el) => (componentRef = el)}
          products={cart?.products}
          subTotal={cart?.subTotal}
          client={cart?.client.user}
          receiptId={cart?.receiptId}
        />
      </div>
    </div>
  );
}

export default Receipt;

class Ticket extends React.Component {
  render() {
    return (
      <div className="container-ticket">
        <div className="ticket">
          <div className="head-ticket">
            <p className="x-bold">Avícola Martina</p>
            <p className="bold">San Miguel</p>
            <p className="bold">Av.Balbin 4872</p>

            <br />
            <p className="bold">Ticket interno</p>
            <p>Fecha: {dateToLocalDate(new Date())}hs</p>
            <p>Cliente: {`${this.props.client.name} ${this.props.client.lastName}`}</p>
          </div>
          <div className="ticket-barcode">
            <Barcode value={this.props.receiptId} height={80} fontSize={20} width={3} />
          </div>

          <div className="body-ticket">
            <div className="products">
              {this.props.products.map((product) => (
                <div className="products__item">
                  <div>
                    <p>
                      {`${product.description}. (${product.finalQuantity} unid. x ${formatPrice(
                        product.basePrice
                      )})`}
                    </p>
                  </div>
                  <p className="prix">{formatPrice(product.finalPrice)}</p>
                </div>
              ))}
            </div>
            <div className="hr-lg" />
            <div className="products__item">
              <p className="ticket__total">Total</p>
              <p className="ticket__total">{formatPrice(this.props.subTotal)}</p>
            </div>
            <div className="hr-lg" />
          </div>
          <div className="footer-ticket">
            <p className="title-footer">
              Muchas gracias
              <br />
              por su compra
            </p>
          </div>
        </div>
      </div>
    );
  }
}
