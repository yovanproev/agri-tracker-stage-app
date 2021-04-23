import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer navbar-fixed-bottom">
     Your Company Name &#169; {new Date().getFullYear()}
    </footer>
  )
}

export default Footer;