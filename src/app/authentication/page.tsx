import LoginDescktop from "./components/login-desktop";
import LoginMobile from "./components/login-mobile";

const Authentication = async () => {
  return (
    <div>
      {/* Mobile */}
      <div className="block lg:hidden">
        <LoginMobile />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <LoginDescktop />
      </div>
    </div>
  );
};

export default Authentication;
