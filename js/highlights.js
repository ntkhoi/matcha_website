// Highlights Page JavaScript

// Match data based on match ID
const highlightsMatchData = {
    'sydney-brisbane': {
        group: 'Group C',
        result: 'Maharashtra won by 8 wickets',
        series: 'Vijay Hazare Trophy Elite 2025-26',
        venue: 'KL Saini Ground',
        date: '26th Dec 2025, 3:30 AM',
        team1: { name: 'Maharashtra', abbrev: 'Mah' },
        team2: { name: 'SIKKIM', abbrev: 'SK' },
        // Graph data - cumulative runs (worm graph)
        wormData: [0, 5, 35, 60, 105, 125, 150, 200],
        // Run rate per over
        runRate: [3, 7.25, 8.75, 9.75, 8.75, 10.25, 9.25, 9.25, 10]
    },
    'melbourne-hobart': {
        group: 'Group A',
        result: 'Hobart won by 5 wickets',
        series: 'Big Bash League 2025-26',
        venue: 'Melbourne Cricket Ground',
        date: '26th Dec 2025, 2:00 PM',
        team1: { name: 'Melbourne', abbrev: 'MEL' },
        team2: { name: 'Hobart', abbrev: 'HOB' },
        wormData: [0, 12, 28, 45, 62, 80, 98, 115, 132, 150, 170, 189],
        runRate: [6, 6, 7, 7.5, 7.75, 8, 8.17, 8.25, 8.33, 8.5, 8.64, 8.68]
    },
    'gulfgiants-dubai': {
        group: 'Group B',
        result: 'Gulf Giants won by 17 runs',
        series: 'T20 League 2025',
        venue: 'Dubai International Stadium',
        date: '26th Dec 2025, 7:30 PM',
        team1: { name: 'Gulf Giants', abbrev: 'GG' },
        team2: { name: 'Dubai', abbrev: 'DU' },
        wormData: [0, 8, 18, 35, 52, 68, 85, 102, 118, 135, 150, 165, 180, 195, 201, 218],
        runRate: [8, 9, 9, 8.75, 10.4, 11.33, 12.14, 12.75, 13.11, 13.5, 13.64, 13.75, 13.85, 13.93, 13.4, 10.9]
    }
};

// Draw Worm Graph (Improved styling)
function drawWormGraphHighlights(canvas, data) {
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

// Draw Run Rate Graph (Improved styling)
function drawRunRateGraphHighlights(canvas, data) {
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

// Initialize highlights page
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const matchId = urlParams.get('match') || 'sydney-brisbane';
    const match = highlightsMatchData[matchId] || highlightsMatchData['sydney-brisbane'];

    // Update page content
    document.getElementById('match-group').textContent = match.group;
    document.getElementById('match-result').textContent = match.result;
    document.getElementById('match-series').textContent = match.series;
    document.getElementById('match-venue').textContent = match.venue;
    document.getElementById('match-date').textContent = match.date;

    // Update teams
    document.getElementById('team1-abbrev').textContent = match.team1.abbrev;
    document.getElementById('team1-name-full').textContent = match.team1.name;
    document.getElementById('team2-abbrev').textContent = match.team2.abbrev;
    document.getElementById('team2-name-full').textContent = match.team2.name;

    // Update legends (using first team name)
    document.getElementById('legend-team-name').textContent = match.team1.name + ' 1st';
    document.getElementById('legend-team-name-2').textContent = match.team1.name + ' 1st';

    // Draw graphs
    const wormCanvas = document.getElementById('worm-graph-highlights');
    const runRateCanvas = document.getElementById('run-rate-graph-highlights');

    // Set canvas dimensions
    function setCanvasSize(canvas) {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    setCanvasSize(wormCanvas);
    setCanvasSize(runRateCanvas);

    // Draw graphs
    drawWormGraphHighlights(wormCanvas, match.wormData);
    drawRunRateGraphHighlights(runRateCanvas, match.runRate);

    // Redraw on resize
    window.addEventListener('resize', function() {
        setCanvasSize(wormCanvas);
        setCanvasSize(runRateCanvas);
        drawWormGraphHighlights(wormCanvas, match.wormData);
        drawRunRateGraphHighlights(runRateCanvas, match.runRate);
    });
});

