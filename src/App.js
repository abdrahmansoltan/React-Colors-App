import Palette from './components/Palette/Palette';
import seedColors from './models/seedColors';

function App() {
  return (
    <div className='App'>
      <Palette {...seedColors[4]} />
    </div>
  );
}

export default App;
