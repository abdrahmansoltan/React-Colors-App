import { Route, Switch } from 'react-router-dom';
import Palette from './components/Palette/Palette';
import PaletteList from './components/PaletteList/PaletteList';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';
import { generatePalette } from './helpers/colorHelpers';
import seedColors from './models/seedColors';

function App() {
  const findPalette = id => {
    return seedColors.find(palette => palette.id === id);
  };
  return (
    <Switch>
      <Route exact path='/palette/:paletteId/:colorId' render={() => <SingleColorPalette />} />
      <Route
        exact
        path='/'
        render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />}
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
