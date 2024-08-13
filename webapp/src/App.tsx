import Menu from './components/Menu';
import Layout from './layout';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { toggleMenu } from './store/slices/navigation';
import { Buttons, useKeyDown } from './utils/ButtonHelper';

export default function App() {
  const showMenu = useAppSelector((state) => state.navigation.showMenu);
  const dispatch = useAppDispatch();

  useKeyDown({
    [Buttons.Button5]: () => {
      dispatch(toggleMenu());
    },
  });

  return (
    <>
      <Layout showBorder={true} buttonLabel1={{ label: 'Test label 1' }}>
        <Menu />
        {!showMenu && (
          <div className="w-full h-full border border-green-500">
            <div>This is the application</div>
          </div>
        )}
      </Layout>
    </>
  );
}
