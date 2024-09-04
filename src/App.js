import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { TextField, ThemeProvider, createTheme, InputLabel, Select, MenuItem, Box, CssBaseline, CircularProgress, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const servers = [
    { value: 'na', label: 'North America' },
    { value: 'eu', label: 'Europe' },
    { value: 'ap', label: 'Asia Pacific' },
    { value: 'kr', label: 'Korea' },
    { value: 'latam', label: 'Latin America' },
    { value: 'br', label: 'Brazil' },
];

function App() {
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [server, setServer] = useState('');
    const [dataset, setDataset] = useState([]);
    const [winRate, setWinRate] = useState(0); // State to hold the win rate
    const [gameData, setGameData] = useState([]); // State to hold the fetched game data
    const [totalGames, setTotalGames] = useState(0); // State to hold the total number of games
    const [totalWins, setTotalWins] = useState(0); // State to hold the total number of wins
    const [totalLosses, setTotalLosses] = useState(0); // State to hold the total number of losses
    const [gamesInGraph, setGamesInGraph] = useState(0); // State to hold the number of games in the graph
    const apiKey = process.env.REACT_APP_API_KEY;

    const fetchData = useCallback(async () => {
        if (name && tag && server) {
            try {
                const response = await fetch(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${server}/${name}/${tag}?api_key=${apiKey}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log('Fetched Data:', result.data); // Log the fetched data for debugging
                setGameData(result.data); // Store the fetched game data

                const transformedData = result.data.map(match => {
                    const date = new Date(match.date);
                    const hour = date.getHours();
                    return {
                        hour, result: match.mmr_change_to_last_game > 0 ? 'Win' : 'Loss'
                    };
                });

                console.log('Transformed Data:', transformedData); // Log transformed data for debugging

                const counts = transformedData.reduce((acc, match) => {
                    const hour = match.hour;
                    if (!acc[hour]) {
                        acc[hour] = { x: hour, wins: 0, losses: 0 };
                    }
                    if (match.result === 'Win') {
                        acc[hour].wins += 1;
                    } else {
                        acc[hour].losses += 1;
                    }
                    return acc;
                }, {});

                console.log('Counts:', counts); // Log counts for debugging

                const datasetArray = Object.values(counts);
                setDataset(datasetArray);

                // Calculate the total number of wins and losses
                const totalWins = datasetArray.reduce((acc, item) => acc + item.wins, 0);
                const totalLosses = datasetArray.reduce((acc, item) => acc + item.losses, 0);
                const totalGames = totalWins + totalLosses;
                const winRate = totalGames > 0 ? (totalWins / totalGames) * 100 : 0;

                setWinRate(winRate.toFixed(2)); // Store win rate as a percentage with 2 decimals
                setTotalGames(totalGames); // Store total number of games
                setTotalWins(totalWins); // Store total number of wins
                setTotalLosses(totalLosses); // Store total number of losses
                setGamesInGraph(transformedData.length); // Store the number of games in the graph
            } catch (error) {
                setError(error.message);
            }
        }
    }, [name, tag, server, apiKey]);

    useEffect(() => {
        const getData = async () => {
            await fetchData();
        };

        getData();
    }, [name, tag, server, fetchData]);

    const handleChange = (event) => {
        setServer(event.target.value);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {/* Centered H1 */}
            <Typography
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}
                variant="h1"
                color="text.primary"
            >
                Valorant Stats Tracker
            </Typography>

            {/* Input section for Name, Tag, and Server */}
            <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                    Enter your Valorant Name and Tag
                </Typography>

                {/* Input Fields */}
                <Box component="div" sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
                    <TextField
                        id="name-field"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="tag-field"
                        label="#Tag"
                        variant="outlined"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                    <Box>
                        <InputLabel id="server-select-label">Server</InputLabel>
                        <Select
                            labelId="server-select-label"
                            id="server-select"
                            value={server}
                            onChange={handleChange}
                            sx={{ minWidth: 120 }}
                        >
                            {servers.map((server) => (<MenuItem key={server.value} value={server.value}>
                                {server.label}
                            </MenuItem>))}
                        </Select>
                    </Box>
                </Box>
            </Box>

            {/* Win / Loss Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="h6"
                            color="text.primary">
                    Win / Loose per hour of the day
                </Typography>
                {error && <p>Error: {error}</p>}
                <Box sx={{ width: '100%', maxWidth: 1000 }}>
                    <LineChart
                        dataset={dataset}
                        xAxis={[
                            {
                                id: 'Hours',
                                dataKey: 'x',
                                label: 'Hour of the Day'
                            }
                        ]}
                        yAxis={[
                            {
                                id: 'Count',
                                label: 'Number of Wins/Losses'
                            }
                        ]}
                        series={[
                            { dataKey: 'wins', label: 'Wins', color: '#1E90FF' },
                            { dataKey: 'losses', label: 'Losses', color: '#ED0A3F' }
                        ]}
                        height={300}
                        grid={{ vertical: true, horizontal: true }}
                    />
                </Box>
            </Box>

            {/* Win Rate Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 4 }}>
                <Typography variant="h6" color="text.primary">Win Rate</Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                        variant="determinate"
                        value={winRate}
                        size={100}
                        thickness={5}
                        sx={{
                            color: winRate >= 50 ? '#1E90FF' : '#ED0A3F' // Blue for >= 50%, Red for < 50%
                        }}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" component="div" color="text.primary">
                            {`${winRate}%`}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.primary">
                        Total Games: {totalGames}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        Wins: {totalWins}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        Losses: {totalLosses}
                    </Typography>
                </Box>
            </Box>

            {/* Fetched Game Data Section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                    Fetched Game Data
                </Typography>
                {gameData.length > 0 ? (
                    <Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
                        {gameData.map((game, index) => (
                            <Box component="li" key={index} sx={{ mb: 2 }}>
                                {/* Display game data */}
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body1" color="text.primary">
                        No game data available.
                    </Typography>
                )}
            </Box>

        </ThemeProvider>
    );
}

export default App;