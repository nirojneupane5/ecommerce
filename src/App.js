import { useContext } from 'react';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import AddFood from './pages/Product/AddFood';
import UpdateFood from './pages/Product/UpdateFood';
import Logout from './pages/Logout';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'; 
import GuestNav from './components/NavBar/GuestNav';
import AdminNav from './components/NavBar/AdminNav';
import UserNav from './components/NavBar/UserNav';
import AuthContext from './context/AuthContext';
import AuthContextProvider from './context/AuthState';
import DisplayFood from './pages/Product/DisplayFood';
import DisplayCart from './pages/Cart/DisplayCart';
import KhaltiPayment from './pages/payment/KhaltiPayment';
import SearchFood from './pages/SearchFood/SearchFood';
import PaymentPage from './pages/payment/PaymentPage';
import EsewaPayment from './pages/payment/EsewaPayment';
import DisplayAllUser from './pages/User/DisplayAllUser';
import UpdateUser from './pages/User/UpdateUser';
import EsewaPay from './pages/payment/EsewaPay';
import SuccessPage from './pages/payment/SuccessPage';
import { Provider } from 'react-redux';
import store from './pages/Redux/Store';

import ProductDetails from './pages/ProductDetails/ProductDetails';
import VerifySignUp from './pages/Auth/VerifySignUp';
import ProductData from './pages/ProductDetails/ProductData';
import AdminDashboard from './components/Dashboard/Dashboard';
import { DisplayReview } from './pages/Rating/DisplayReview';
const NavElement=()=>{
  const{authenticated,role}=useContext(AuthContext);
  let navbar;
  if(!authenticated){
    navbar=<GuestNav/>
  }
  else{
    switch(role){
      case 'admin':
        navbar=<AdminNav/>
        break;
      case 'customer':
        navbar=<UserNav/>
        break;
      default:
        navbar=<GuestNav/>
        break;
    }
  }
  return navbar;
}
const DashboardElement= () => {
  const {authenticated, role} = useContext(AuthContext);
  let dashboard;
  if(!authenticated){
    dashboard= <Home/>;
  }
  else{
    switch(role){
      case 'admin':
        dashboard= <AdminDashboard/>
        break;
      case 'customer':
        dashboard= <Home/>
        break;

      default:
        dashboard= <Home/>
        break;
    }
  }
  return dashboard;
} 
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavElement/>}> 
     <Route index element={<DashboardElement/>} />
     <Route path="/about" element={<About/>}/> 
     <Route path="/signUp" element={<SignUp/>}/> 
     <Route path="/login" element={<Login/>}/>
     <Route path="/addFood" element={<AddFood/>}/>
     <Route path="/updateFood/:id" element={<UpdateFood/>}/>
     <Route path="/logout" element={<Logout/>}/>
     <Route path="/displayFood" element={<DisplayFood/>}/>
     <Route path="/displayCart" element={<DisplayCart/>}/>
     <Route path="/payment" element={<KhaltiPayment/>}/>
     <Route path="/searchProduct" element={<SearchFood/>}/>
     <Route path="/paymentPage/:id" element={<PaymentPage/>}/>
     <Route path="/eSewaPayment" element={<EsewaPayment/>}/>
     <Route path="/displayAllUser" element={<DisplayAllUser/>}/>
     <Route path="/updateUser/:id" element={<UpdateUser/>}/>
     <Route path="/success" element={<SuccessPage/>}/>
     <Route path="/esewaPay" element={<EsewaPay/>}/>
     <Route path="/productDetails/:id" element={<ProductDetails/>}/>
     <Route path="/verifySignUp/:id" element={<VerifySignUp/>}/>
     <Route path="/productDetail/:id" element={<ProductData/>}/>
     <Route path="/displayReview" element={<DisplayReview/>}/>
    </Route>
    )
)

function App() {
  return (
    <>
    <Provider store={store}>
    <AuthContextProvider > 
    <RouterProvider router={router}/>
    </AuthContextProvider>
    </Provider>
    </>
          
  );
}

export default App;
