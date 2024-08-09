import { useState } from 'react';
import Menu from './components/Menu';
import Layout from './layout';
import { Buttons, useKeyDown } from './utils/ButtonHelper';

export default function App() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useKeyDown({
    [Buttons.Button5]: () => setShowMenu(!showMenu),
  });

  return (
    <>
      <Layout showBorder={true} buttonLabel1={{ label: 'Test label 1' }}>
        {showMenu && <Menu />}
        {!showMenu && (
          <div className="w-full h-full border border-green-500">
            <div>This is the application</div>
          </div>
        )}
      </Layout>
    </>
  );
}
