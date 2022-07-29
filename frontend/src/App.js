import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplyAgent from './components/Agent/ApplyAgent';
import DailyWorks from './components/dashboard/DailyWorks';
import DailyWorkView from './components/dashboard/DailyWorkView';
import Deposit from './components/dashboard/Deposit';
import DepositList from './components/dashboard/DepositList';
import FirstGeneration from './components/dashboard/Gen/FistGen';
import Generation from './components/dashboard/Gen/Generation';
import SecondGeneration from './components/dashboard/Gen/SecondGen';

// import Lottery from './components/dashboard/Lottery';
import SendMoney from './components/dashboard/SendMOney';
import Support from './components/dashboard/Support';
import Tnx from './components/dashboard/Tnx';
import Upgrade from './components/dashboard/Upgrade/Upgrade';
import AgentWithdraws from './components/dashboard/Withdraw/AgentWithdraws';
import Approved from './components/dashboard/Withdraw/Approved';
import Withdraw from './components/dashboard/Withdraw/Withdraw';
import Withdraws from './components/dashboard/Withdraw/Withdraws';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Profile from './components/Users/Profile/Profile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Referral from './pages/Referral';
import Register from './pages/Register';
import Suspend from './pages/Suspend';
import { loadUser } from './redux/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <RingLoader color={'#36D7B7'} size={100} />
      </div>
    );
  }
  return (
    <>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/suspend' component={Suspend} />

        <ProtectedRoute exact path='/dashboard' component={Dashboard} />
        <ProtectedRoute exact path='/user/profile' component={Profile} />
        <ProtectedRoute exact path='/referral' component={Referral} />
        <ProtectedRoute exact path='/deposit' component={Deposit} />
        <ProtectedRoute exact path='/upgrade' component={Upgrade} />
        <ProtectedRoute exact path='/deposit/history' component={DepositList} />
        <ProtectedRoute exact path='/deposit/history' component={DepositList} />

        <ProtectedRoute exact path='/transactions' component={Tnx} />
        <ProtectedRoute exact path='/support' component={Support} />

        <ProtectedRoute exact path='/withdraw' component={Withdraw} />
        <ProtectedRoute exact path='/withdraws/history' component={Withdraws} />
        <ProtectedRoute exact path='/send' component={SendMoney} />
        <ProtectedRoute exact path='/works' component={DailyWorks} />
        <ProtectedRoute exact path='/apply-agent' component={ApplyAgent} />

        {/* <ProtectedRoute exact path='/user/members' component={Members} /> */}
        <ProtectedRoute exact path='/works/view' component={DailyWorkView} />
        <ProtectedRoute exact path='/user/members' component={Generation} />
        <ProtectedRoute exact path='/first-gen' component={FirstGeneration} />
        <ProtectedRoute exact path='/second-gen' component={SecondGeneration} />

        <ProtectedRoute
          exact
          path='/agent/withdraws'
          component={AgentWithdraws}
        />
        <ProtectedRoute exact path='/withdraw/edit/:id' component={Approved} />

        {/* Not Found */}
        <Route component={NotFound} />
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
