import Header from "../components/Header";
import Footer from "../components/footer";
function SEC() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-auto bg-white">
        <h1 className="text-xl font-semibold text-center mb-4"> This patient needs an SEC</h1>
      </div>
      <Footer />
    </>
  );
}

export default SEC;
