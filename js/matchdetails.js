// Match Details Page JavaScript

// Match data based on match ID
const matchDetailsData = {
    'myanmar-bhutan': {
        title: 'Myanmar vs Bhutan',
        tournament: 'International T20 Series',
        venue: 'Singapore Cricket Club',
        date: 'Today, Dec 14, 2024',
        time: '2:30 PM',
        team1: { name: 'Myanmar', score: '145/3', overs: '18.3 Overs', logo: 'MY' },
        team2: { name: 'Bhutan', score: '98/5', overs: '15.2 Overs', logo: 'BH' },
        winProbability: 'Myanmar 78%',
        runRate: '7.89',
        momentum: '↗ Favoring Myanmar',
        target: '146 runs'
    },
    'gulf-dubai': {
        title: 'Gulf Giants vs Dubai',
        tournament: 'T20 League',
        venue: 'Dubai International Stadium',
        date: 'Today, Dec 14, 2024',
        time: '3:00 PM',
        team1: { name: 'Gulf Giants', score: '201/4', overs: '15.2 Overs', logo: 'GG' },
        team2: { name: 'Dubai', score: '156/2', overs: '12.5 Overs', logo: 'DU' },
        winProbability: 'Gulf Giants 65%',
        runRate: '8.45',
        momentum: '↗ Favoring Gulf Giants',
        target: '202 runs'
    },
    'mumbai-delhi': {
        title: 'Mumbai Indians vs Delhi',
        tournament: 'IPL 2024',
        venue: 'Wankhede Stadium',
        date: 'Today, Dec 14, 2024',
        time: '1:00 PM',
        team1: { name: 'Mumbai Indians', score: '178/6', overs: '19.1 Overs', logo: 'MI' },
        team2: { name: 'Delhi', score: '142/8', overs: '18.0 Overs', logo: 'DL' },
        winProbability: 'Mumbai 85%',
        runRate: '9.28',
        momentum: '↗ Favoring Mumbai',
        target: '179 runs'
    }
};

// Initialize match details page
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const matchId = urlParams.get('match') || 'myanmar-bhutan';
    const match = matchDetailsData[matchId] || matchDetailsData['myanmar-bhutan'];

    // Update page content
    document.getElementById('match-title').textContent = match.title;
    document.getElementById('match-tournament').textContent = match.tournament;
    document.getElementById('match-venue').textContent = match.venue;
    document.getElementById('match-date').textContent = match.date;
    document.getElementById('match-time').textContent = match.time;

    // Update scores
    document.getElementById('team1-score').textContent = match.team1.score;
    document.getElementById('team1-overs').textContent = match.team1.overs;
    document.querySelector('.team-score-card:first-child .team-logo-circle').textContent = match.team1.logo;
    document.querySelector('.team-score-card:first-child h2').textContent = match.team1.name;

    document.getElementById('team2-score').textContent = match.team2.score;
    document.getElementById('team2-overs').textContent = match.team2.overs;
    document.querySelector('.team-score-card:last-child .team-logo-circle').textContent = match.team2.logo;
    document.querySelector('.team-score-card:last-child h2').textContent = match.team2.name;

    // Update stats
    document.getElementById('win-probability').textContent = match.winProbability;
    document.getElementById('run-rate').textContent = match.runRate;
    document.querySelector('.momentum-text').textContent = match.momentum;
    document.getElementById('target').textContent = match.target;

    // Update progress bar
    const winPercent = parseInt(match.winProbability.match(/\d+/)[0]);
    document.querySelector('.progress-fill').style.width = winPercent + '%';
});

