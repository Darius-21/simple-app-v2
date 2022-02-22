import React from "react";

import { CardElement } from "@stripe/react-stripe-js";

function CardSection(props) {
  return (
    <div>
      <div>
        <label htmlFor="card-element">Enter your card (Credit or debit)</label>

        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element">
                <CardElement />
              </div>
              <br />
              <div className="order-button-wrapper">
                <button onClick={props.submitTransaction}>Confirm order</button>
              </div>
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
                {`
                .order-button-wrapper {
                    display: flex;
                    width: 100%;
                    align-items: flex-end;
                    justify-content: flex-end;
                }
                .form-half {
                    flex: 0.5;
                }
                * {
                    box-sizing: border-box;
                }
                h1 {
                    color: #32325d;
                    font-weight: 400;
                    line-height: 50px;
                    font-size: 40px;
                    margin: 20px 0;
                    padding: 0;
                }
                .Checkout {
                    margin: 0 auto;
                    max-width: 800px;
                    box-sizing: border-box;
                    padding: 0 5px;
                }
                label {
                    color: #6b7c93;
                    font-weight: 300;
                    letter-spacing: 0.025em;
                }
                button {
                    white-space: nowrap;
                    border: 0;
                    outline: 0;
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 14px;
                    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
                    0 1px 3px rgba(0, 0, 0, 0.08);
                    color: #fff;
                    border-radius: 4px;
                    font-size: 15px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                    background-color: #6772e5;
                    text-decoration: none;
                    -webkit-transition: all 150ms ease;
                    transition: all 150ms ease;
                    margin-top: 10px;
                }
                form {
                    margin-bottom: 40px;
                    padding-bottom: 40px;
                    border-bottom: 3px solid #e6ebf1;
                }
                button:hover {
                    color: #fff;
                    cursor: pointer;
                    background-color: #7795f8;
                    transform: translateY(-1px);
                    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                    0 3px 6px rgba(0, 0, 0, 0.08);
                }
                input,
                .StripeElement {
                    display: block;
                    background-color: #f8f9fa !important;
                    margin: 10px 0 20px 0;
                    max-width: 500px;
                    padding: 10px 14px;
                    font-size: 1em;
                    font-family: "Source Code Pro", monospace;
                    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
                    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
                    border: 0;
                    outline: 0;
                    border-radius: 4px;
                    background: white;
                }
                input::placeholder {
                    color: #aab7c4;
                }
                input:focus,
                .StripeElement--focus {
                    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
                    rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
                    -webkit-transition: all 150ms ease;
                    transition: all 150ms ease;
                }
                .StripeElement.IdealBankElement,
                .StripeElement.PaymentRequestButton {
                    padding: 0;
                }
                `}
            </style>
      
    </div>
  );
}
export default CardSection;