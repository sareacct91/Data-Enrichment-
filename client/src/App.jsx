import Home from './pages/Home'
import { PaginationProvider } from './utils/GlobalState'

function App() {
  return (
    <PaginationProvider>
      <Home />
    </PaginationProvider>
  );
}

export default App
