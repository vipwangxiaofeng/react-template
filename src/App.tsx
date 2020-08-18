import React, { useEffect } from 'react';
import http from './http/http';
import routes from './router';
function App() {
  useEffect(() => {
    http.get("https://www.runoob.com/try/ajax/json_demo.json")
    
  }, [])
  return (
    <>
    {routes}
    </>
  );
}

export default App;
