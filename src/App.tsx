import './App.css';
import { Container } from '@mui/material';
import UrlForm from './components/UrlForm';
import create from 'zustand';
import Comments from './components/Comments';

function App() {
    return (
        <Container maxWidth="lg" sx={{ marginTop: 8 }}>
            <UrlForm></UrlForm>
            <Comments></Comments>
        </Container>
    );
}

export default App;
