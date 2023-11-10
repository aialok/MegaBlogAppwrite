import variables from './config/config'
export default function App() {
  console.log(variables.VITE_APPWRITE_URL);
  return (
    <h1 className="text-3xl font-bold underline">A blog with app write</h1>
  );
}
