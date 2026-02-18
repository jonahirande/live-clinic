import axios from 'axios';

function App() {
  const login = async () => {
    const res = await axios.post('http://backend:5000/login', {
      email: 'admin@live-clinic.com',
      password: 'p@ssw0rd'
    });
    alert(res.data.role);
  };

  return (
    <div style={{ background: '#f0f8ff', height: '100vh', padding: 40 }}>
      <h1 style={{ color: '#0057b7' }}>Live-Clinic</h1>
      <button onClick={login}>Login (Test)</button>
    </div>
  );
}

export default App;
