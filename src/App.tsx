import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Checkers } from './Components/Checkers/Checkers';
import { Layout } from './Components/Layout';
import { PendingApprovals } from './Components/PendingApprovals';
import { StationMasters } from './Components/StationMasters/StationMasters';
import { Stations } from './Components/Stations/Stations';
import TicketDetails from './Components/Tickets/TicketDetails';
import TrainProfiles from './Components/Trains/TrainProfiles';
import { AdminProfile } from './Components/AdminProfile';
import Reports from './Components/Reports/Reports';
import PassengerRegistration from './Components/Reports/PassengerRegistration';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FinancialActivity from './Components/Reports/FinancialActivity';
import CheckerPerformance from './Components/Reports/CheckerPerformance';
import StationActivity from './Components/Reports/StationActivity';
import { LoginPage } from './Components/LoginPage';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <header className="App-header">                    
            <Routes>
            <Route path='/' element={<LoginPage />} />'
              <Route path='/profile' element={<Layout><AdminProfile /></Layout>} /> 
              <Route path='/station-masters' element={<Layout><StationMasters /></Layout>} />
              <Route path='stations' element={<Layout><Stations /></Layout>} />
              <Route path='checkers' element={<Layout><Checkers /></Layout>} />
              <Route path='pending-approvals' element={<Layout><PendingApprovals /></Layout>} />
              <Route path='ticket-details' element={<Layout><TicketDetails /></Layout>} />
              <Route path='reports' element={<Layout><Reports/></Layout>} />
              <Route path='/reports/passenger-registration' element={<Layout><PassengerRegistration /></Layout>} />
              <Route path='/reports/checker-performance' element={<Layout><CheckerPerformance /></Layout>} />
              <Route path='/reports/station-activity' element={<Layout><StationActivity /></Layout>} />
              <Route path='/reports/financial-activity' element={<Layout><FinancialActivity /></Layout>}/>
              <Route path='train-profiles' element={<Layout><TrainProfiles /></Layout>} />
            </Routes>
        </header>
      </div>
      </LocalizationProvider>
  );
}

export default App;
