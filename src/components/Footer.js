// Assets
import "../assets/css/footer.css";

function Footer() {
    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className="footer">
            <div className="profile-links">
                <a href="https://www.linkedin.com/in/karan-manikani/">
                    <ion-icon name="logo-linkedin"></ion-icon>
                </a>

                <a href="https://github.com/Karan-Manikani">
                    <ion-icon name="logo-github"></ion-icon>
                </a>
            </div>
            <div className="back-to-top-btn" onClick={scrollToTop}>
                <span class="material-symbols-rounded back-to-top">expand_less</span>
            </div>
        </div>
    );
}

export default Footer;
