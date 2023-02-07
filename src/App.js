import Palette from './components/Palette/Palette';
import { generatePalette } from './helpers/colorHelpers';
import seedColors from './models/seedColors';

function App() {
  return (
    <div className='App'>
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
