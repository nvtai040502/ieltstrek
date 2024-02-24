import { testBackend } from '@/actions/backend';

async function App() {
  const data = await testBackend()
  return (
    <div>
      {data ? (
        <p>Data received from server: {data.message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;