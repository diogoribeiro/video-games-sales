import { BrowserRouter as Router, Route } from 'react-router-dom';
import SalesByPlataform from './components/SalesByPlataform';
import PlatformSalesOverview from './PlatformSalesOverview';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={SalesByPlataform} />
        <Route path="/platform/:platformName" component={PlatformSalesOverview} />
      </Router>
    </div>
  );
}

export default App;
