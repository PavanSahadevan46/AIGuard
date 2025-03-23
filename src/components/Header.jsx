import logo from "../assets/temp1.png";

function Header() {
  return (
    <header className="bg-sapphire shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-14 w-auto border-1" />
            <h1 className="ml-3 text-xl font-medium text-white hidden sm:block">
              AI Guard
            </h1> 
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
