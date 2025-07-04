import React from 'react';
import './GalacticFooter.css';


// --- The Footer Component ---
const GalacticFooter = () => {
    return (
        <>
            <footer className="galactic-footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        
                        {/* Column 1: Branding & Social */}
                        <div className="footer-column">
                            <div className="footer-logo">
                                <span className="footer-logo-text">D<span className="highlight">/</span>V</span>
                            </div>
                            <p className="footer-description">
                                A commitment to innovation and exploration. Personal Division / / Passion Project.
                            </p>
                            <div className="social-links">
                                <a href="#"><i className="fab fa-twitter fa-lg"></i></a>
                                <a href="#"><i className="fab fa-github fa-lg"></i></a>
                                <a href="#"><i className="fab fa-linkedin-in fa-lg"></i></a>
                                <a href="#"><i className="fab fa-figma fa-lg"></i></a>
                            </div>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="footer-column">
                            <h3 className="footer-section-title">// Navigation</h3>
                            <ul className="footer-links-list">
                                <li className="footer-link"><a href="#CountdownPanel"><span className="arrow">&gt;</span>Home</a></li>
                                <li className="footer-link"><a href="#wave"><span className="arrow">&gt;</span>Skill Matrix</a></li>
                                <li className="footer-link"><a href="#DigitalFootprint"><span className="arrow">&gt;</span>Project Log</a></li>
                                <li className="footer-link"><a href="#ContactUs"><span className="arrow">&gt;</span>Contact</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Resources */}
                        <div className="footer-column">
                            <h3 className="footer-section-title">// Solution</h3>
                            <ul className="footer-links-list">
                                <li className="footer-link"><a href="#"><span className="arrow">&gt;</span>Locked</a></li>
            
                            </ul>
                        </div>

                        {/* Column 4: Authorized Clearances */}
                        <div className="footer-column">
                            <h3 className="footer-section-title">// Resources</h3>
                            <ul className="footer-links-list">
                                <li className="footer-link"><a href="#"><span className="arrow">&gt;</span>Locked</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3 className="footer-section-title">// Legal</h3>
                            <ul className="footer-links-list">
                                <li className="footer-link"><a href="https://docs.google.com/document/d/1QwnX8FxukKH1_e9IdJ-92Y6rMhYuAsyLE5sRFjXAqgA/edit?usp=sharing"><span className="arrow">&gt;</span>Claim</a></li>
                                <li className="footer-link"><a href="https://docs.google.com/document/d/1lhitZ1LjoJoBjaY37Cm_mkHrryhh56OLdDO_JsV5_no/edit?usp=sharing"><span className="arrow">&gt;</span>Privacy</a></li>
                                <li className="footer-link"><a href="https://docs.google.com/document/d/1oqw_FS7dFT7vggbPpjl5Y9QiJTX38Wrg6T2L2-szxos/edit?usp=sharing"><span className="arrow">&gt;</span>Terms</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} PROJECT NORTH-STAR. ALL RIGHTS RESERVED.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default GalacticFooter;
