import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NewPaletteForm from './components/NewPaletteForm/NewPaletteForm';
import Palette from './components/Palette/Palette';
import PaletteList from './components/PaletteList/PaletteList';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';
import { generatePalette } from './helpers/colorHelpers';
import seedColors from './models/seedColors';
import Page from './Page';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const findPalette = id => {
    return palettes.find(palette => palette.id === id);
  };

  const deletePalette = id => {
    setPalettes(palettes.filter(palette => palette.id !== id));
  };

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

  const syncLocalStorage = () => {
    if (palettes.length === 0) {
      window.localStorage.removeItem('palettes');
    } else {
      //save palettes to local storage
      window.localStorage.setItem('palettes', JSON.stringify(palettes));
    }
  };

  useEffect(() => {
    syncLocalStorage();
  }, [palettes]);

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={400}>
            <Switch location={location}>
              {/* Must be before "/palette/" with dynamic child route */}
              <Route
                exact
                path='/palette/new'
                render={routeProps => (
                  <Page>
                    <NewPaletteForm savePalette={savePalette} palettes={palettes} {...routeProps} />
                  </Page>
                )}
              />
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={routeProps => (
                  <Page>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path='/'
                render={routeProps => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      {...routeProps}
                      deletePalette={deletePalette}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path='/palette/:id'
                render={routeProps => (
                  <Page>
                    <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
