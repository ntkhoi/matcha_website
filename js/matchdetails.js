// Match Details Page JavaScript

// Match data based on match ID
const matchDetailsData = {
    'myanmar-bhutan': {
        matchNumber: '1st Match',
        title: 'Myanmar vs Bhutan',
        team1: { name: 'Myanmar', abbrev: 'MYA', score: '145/3', overs: '18.3' },
        team2: { name: 'Bhutan', abbrev: 'BHU', score: '98/5', overs: '15.2' },
        series: 'International T20 Series 2025',
        venue: 'Singapore Cricket Club',
        time: '26th Dec 2025, 2:30 PM',
        wormData: [0, 8, 18, 32, 48, 65, 82, 98, 115, 132, 145],
        runRate: [8, 9, 9, 8, 9.6, 10.83, 11.71, 12.25, 12.78, 14.5]
    },
    'sylhet-rajshahi': {
        matchNumber: '1st Match',
        title: 'Sylhet Titans vs Rajshahi Warriors',
        team1: { name: 'Sylhet Titans', abbrev: 'SLT', score: '45/1', overs: '5.6' },
        team2: { name: 'Rajshahi Warriors', abbrev: 'RW', score: '0/0', overs: '0.0' },
        series: 'Bangladesh Premier League 2025-26',
        venue: 'Sylhet International Cricket Stadium',
        time: '26th Dec 2025, 9:00 AM',
        // Graph data - cumulative runs (worm graph)
        wormData: [0, 5, 11, 23, 35, 38, 45],
        // Run rate per over
        runRate: [5, 5.5, 7.67, 9, 7, 7.5]
    },
    'gulfgiants-dubai': {
        matchNumber: '2nd Match',
        title: 'Gulf Giants vs Dubai',
        team1: { name: 'Gulf Giants', abbrev: 'GG', score: '201/4', overs: '15.2' },
        team2: { name: 'Dubai', abbrev: 'DU', score: '156/2', overs: '12.5' },
        series: 'T20 League 2025',
        venue: 'Dubai International Stadium',
        time: '26th Dec 2025, 3:00 PM',
        wormData: [0, 8, 18, 35, 52, 68, 85, 102, 118, 135, 150, 165, 180, 195, 201],
        runRate: [8, 9, 9, 8.75, 10.4, 11.33, 12.14, 12.75, 13.11, 13.5, 13.64, 13.75, 13.85, 13.93, 13.4]
    },
    'mumbai-delhi': {
        matchNumber: '3rd Match',
        title: 'Mumbai Indians vs Delhi',
        team1: { name: 'Mumbai Indians', abbrev: 'MI', score: '178/6', overs: '19.1' },
        team2: { name: 'Delhi', abbrev: 'DL', score: '142/8', overs: '18.0' },
        series: 'IPL 2025',
        venue: 'Wankhede Stadium',
        time: '26th Dec 2025, 1:00 PM',
        wormData: [0, 12, 25, 38, 52, 65, 78, 92, 105, 118, 132, 145, 158, 170, 178],
        runRate: [12, 12.5, 12.67, 12.75, 13, 13.17, 13.29, 13.13, 13.11, 13.2, 13.18, 13.25, 13.08, 12.86, 12.67]
    }
};

// Draw Worm Graph
function drawWormGraph(canvas, data) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Draw grid lines (dashed)
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    const maxRuns = Math.max(...data, 250);
    const ySteps = 5;
    const yStep = maxRuns / ySteps;

    // Horizontal grid lines
    for (let i = 0; i <= ySteps; i++) {
        const y = padding + (graphHeight / ySteps) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Vertical grid lines at major over marks
    const xSteps = data.length - 1;
    const majorOvers = [1, 4, 7, 10, 13, 16, 19].filter(ov => ov <= xSteps);
    for (let i = 0; i < majorOvers.length; i++) {
        const x = padding + (graphWidth / xSteps) * majorOvers[i];
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }

    ctx.setLineDash([]);

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Y-axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= ySteps; i++) {
        const value = Math.round((maxRuns / ySteps) * (ySteps - i));
        const y = padding + (graphHeight / ySteps) * i;
        ctx.fillText(value.toString(), padding - 15, y);
    }

    // Draw X-axis labels (only at major over marks)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < majorOvers.length; i++) {
        const x = padding + (graphWidth / xSteps) * majorOvers[i];
        ctx.fillText(`Ov ${majorOvers[i]}`, x, height - padding + 10);
    }

    // Draw line
    ctx.strokeStyle = '#02B272';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < data.length; i++) {
        const x = padding + (graphWidth / (data.length - 1)) * i;
        const y = height - padding - (data[i] / maxRuns) * graphHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#02B272';
    for (let i = 0; i < data.length; i++) {
        const x = padding + (graphWidth / (data.length - 1)) * i;
        const y = height - padding - (data[i] / maxRuns) * graphHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Draw Run Rate Graph
function drawRunRateGraph(canvas, data) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Draw grid lines (dashed)
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    const maxRate = Math.max(...data, 12);
    const ySteps = 6;
    const yStep = maxRate / ySteps;

    // Horizontal grid lines
    for (let i = 0; i <= ySteps; i++) {
        const y = padding + (graphHeight / ySteps) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Vertical grid lines at major over marks
    const xSteps = data.length - 1;
    const majorOvers = [1, 4, 7, 10, 13, 16, 19].filter(ov => ov <= xSteps);
    for (let i = 0; i < majorOvers.length; i++) {
        const x = padding + (graphWidth / xSteps) * majorOvers[i];
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }

    ctx.setLineDash([]);

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Y-axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= ySteps; i++) {
        const value = Math.round((maxRate / ySteps) * (ySteps - i));
        const y = padding + (graphHeight / ySteps) * i;
        ctx.fillText(value.toString(), padding - 15, y);
    }

    // Draw X-axis labels (only at major over marks)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < majorOvers.length; i++) {
        const x = padding + (graphWidth / xSteps) * majorOvers[i];
        ctx.fillText(`Ov ${majorOvers[i]}`, x, height - padding + 10);
    }

    // Draw line
    ctx.strokeStyle = '#02B272';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < data.length; i++) {
        const x = padding + (graphWidth / (data.length - 1)) * i;
        const y = height - padding - (data[i] / maxRate) * graphHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#02B272';
    for (let i = 0; i < data.length; i++) {
        const x = padding + (graphWidth / (data.length - 1)) * i;
        const y = height - padding - (data[i] / maxRate) * graphHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize match details page
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const matchId = urlParams.get('match') || 'myanmar-bhutan';
    const match = matchDetailsData[matchId] || matchDetailsData['myanmar-bhutan'];

    // Update page content
    document.getElementById('match-number').textContent = match.matchNumber;
    document.getElementById('match-title').textContent = match.title;
    document.getElementById('match-series').textContent = match.series;
    document.getElementById('match-venue').textContent = match.venue;
    document.getElementById('match-time').textContent = match.time;

    // Update score summary
    document.getElementById('team-abbrev').textContent = match.team1.abbrev;
    document.getElementById('current-score').textContent = match.team1.score;
    document.getElementById('current-overs').textContent = `(${match.team1.overs} ov)`;

    // Update teams
    document.getElementById('team1-name').textContent = match.team1.name;
    document.getElementById('team2-name').textContent = match.team2.name;

    // Update legends
    document.getElementById('legend-team').textContent = match.team1.name + ' 1st';
    document.getElementById('legend-team-3').textContent = match.team1.name + ' 1st';

    // Draw graphs
    const wormCanvas = document.getElementById('worm-graph-canvas');
    const runRateCanvas = document.getElementById('run-rate-canvas');

    // Set canvas dimensions
    function setCanvasSize(canvas) {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    setCanvasSize(wormCanvas);
    setCanvasSize(runRateCanvas);

    // Draw graphs
    drawWormGraph(wormCanvas, match.wormData);
    drawRunRateGraph(runRateCanvas, match.runRate);

    // Redraw on resize
    window.addEventListener('resize', function() {
        setCanvasSize(wormCanvas);
        setCanvasSize(runRateCanvas);
        drawWormGraph(wormCanvas, match.wormData);
        drawRunRateGraph(runRateCanvas, match.runRate);
    });
});
