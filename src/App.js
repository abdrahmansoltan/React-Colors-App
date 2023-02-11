import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm';
import Palette from './components/Palette/Palette';
import PaletteList from './components/PaletteList/PaletteList';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';
import { generatePalette } from './helpers/colorHelpers';
import seedColors from './models/seedColors';

function App() {
  const [palettes, setPalettes] = useState(seedColors);

  const findPalette = id => {
    return palettes.find(palette => palette.id === id);
  };
  const savePalette = newPalette => {
    console.log(newPalette);
    setPalettes([...palettes, newPalette]);
  };

  return (
    <Switch>
      {/* Must be before "/palette/" with dynamic child route */}
      <Route
        exact
        path='/palette/new'
        render={routeProps => (
          <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
        )}
      />
      <Route
        exact
        path='/palette/:paletteId/:colorId'
        render={routeProps => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
          />
        )}
      />
      <Route
        exact
        path='/'
        render={routeProps => <PaletteList palettes={palettes} {...routeProps} />}
      />
      <Route
        exact
        path='/palette/:id'
        render={routeProps => (
          <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
        )}
      />
    </Switch>
  );
}

export default App;
