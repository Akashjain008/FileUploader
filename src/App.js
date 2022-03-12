// import logo from './logo.svg';
import './App.css';
import { Helmet } from "react-helmet";
import Fileuploader from "./component/fileuploader/Fileuploader.component";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Portable Executable File Uploader</title>
        <meta name="description" content="File Uploader" />
      </Helmet>
      <Fileuploader />
    </div>
  );
}

export default App;
