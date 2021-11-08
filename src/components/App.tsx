import AddAppointments from "./AddAppointments";
import AppointmentsList from "./AppointmentsList";
import Footer from "./Footer";
import Header from "./Header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container mt-3" data-test="app-component">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointments />
              <AppointmentsList />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
