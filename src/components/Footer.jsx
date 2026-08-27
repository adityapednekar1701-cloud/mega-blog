import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'


function Footer() {
  return (
    <section className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-content">
              <div className="footer-logo-wrap">
                <Logo width="100px" />
              </div>
              <div>
                <p className="footer-copyright">
                  &copy; Copyright 2026. All Rights Reserved by BlogUI.
                </p>
              </div>
            </div>
          </div>

          <div className="footer-col footer-col-small">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link className="footer-link" to="/">Features</Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/">Pricing</Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/">Affiliate Program</Link>
              </li>
              <li>
                <Link className="footer-link" to="/">Press Kit</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col-small">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link className="footer-link" to="/">Account</Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/">Help</Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/">Contact Us</Link>
              </li>
              <li>
                <Link className="footer-link" to="/">Customer Support</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col-medium">
            <h3 className="footer-heading">Legals</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link className="footer-link" to="/">Terms &amp; Conditions</Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link className="footer-link" to="/">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer