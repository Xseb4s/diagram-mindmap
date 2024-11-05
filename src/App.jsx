import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ChatbotContext, ChatbotProvider } from './context';
import Navbar from '@/components/navbar.component';
import Modal from '@/components/modal.component';
import Home from '@/app/home';
import Login from '@/app/login';
import { useContext } from 'react';
import PlantUMLMindmap from './app/home/[id]';


const AppRoutes = () => {

    const {login} = useContext(ChatbotContext)

    let routes = [
      { path: '/login', element: <Login /> },
      { path: '/home/:id', element:<PlantUMLMindmap />},
      login ? { path: '/', element: <Home /> } : { path: '/', element: <Login /> },
    ];
  

  const navigate = useRoutes(routes);

  return navigate;
};

const App = () => {
  return (
    <ChatbotProvider>
      <BrowserRouter>
        <div className='relative'>
            <Navbar />
            <AppRoutes />
            <Modal />
        </div>
      </BrowserRouter>
    </ChatbotProvider>
  );
};

export default App;