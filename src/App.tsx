import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Checkers } from './Components/Checkers/Checkers';
import { Layout } from './Components/Layout';
import { PendingApprovals } from './Components/PendingApprovals';
import { StationMasters } from './Components/StationMasters/StationMasters';
import { Stations } from './Components/Stations/Stations';
import TicketDetails from './Components/Tickets/TicketDetails';
import TrainProfiles from './Components/TrainProfiles';
import { AdminProfile } from './Components/AdminProfile';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">                    
            <Routes>
            <Route path='/' element={<LoginPage />} />
              <Route path='/profile' element={<Layout><AdminProfile /></Layout>} />
              <Route path='/station-masters' element={<Layout><StationMasters /></Layout>} />
              <Route path='stations' element={<Layout><Stations /></Layout>} />
              <Route path='checkers' element={<Layout><Checkers /></Layout>} />
              <Route path='pending-approvals' element={<Layout><PendingApprovals /></Layout>} />
              <Route path='ticket-details' element={<Layout><TicketDetails /></Layout>} />
              <Route path='train-profiles' element={<Layout><TrainProfiles /></Layout>} />
            </Routes>
        </header>
      </div>
    </>
  );
}

export default App;
