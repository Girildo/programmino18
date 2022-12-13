import { Grid, TextField, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useStore } from '../store';

export default function UrlForm() {
    const url = useStore((state) => state.url);
    const loading = useStore((state) => state.fetchingFromFlickr);
    const go = useStore((state) => state.fetchData);
    const setUrl = useStore((state) => state.setUrl);

    return (
        <Grid
            container
            justifyContent="center"
            columnSpacing={3}
            rowSpacing={2}
        >
            <Grid item xs={12} md={10}>
                <TextField
                    fullWidth
                    variant="filled"
                    label="URL del contest"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onSubmit={(_) => go()}
                ></TextField>
            </Grid>
            <Grid item container xs={'auto'} alignContent={'center'}>
                <LoadingButton
                    loading={loading}
                    onClick={go}
                    variant="outlined"
                    sx={{ minWidth: 80 }}
                >
                    Vai!
                </LoadingButton>
            </Grid>
        </Grid>
    );
}
